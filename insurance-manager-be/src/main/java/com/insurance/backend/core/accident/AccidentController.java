package com.insurance.backend.core.accident;

import com.google.common.base.Strings;
import com.insurance.backend.common.CommonService;
import com.insurance.backend.core.auth.ApplicationUser;
import com.insurance.backend.core.auth.ApplicationUserService;
import com.insurance.backend.core.etat.Etat;
import com.insurance.backend.core.etat.EtatService;
import com.insurance.backend.core.etat.Workflow;
import com.insurance.backend.core.exception.NotAllowedOperationException;
import com.insurance.backend.core.exception.ResourceAlreadyExistsException;
import com.insurance.backend.core.exception.ResourceNotFoundException;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/accident")
public class AccidentController {
    private final AccidentService accidentService;
    private final EtatService etatService;
    private final ApplicationUserService applicationUserService;
    private final CommonService commonService;

    @Autowired
    public AccidentController(AccidentService accidentService, EtatService etatService, ApplicationUserService applicationUserService, CommonService commonService) {
        this.accidentService = accidentService;
        this.etatService = etatService;
        this.applicationUserService = applicationUserService;
        this.commonService = commonService;
    }

    @GetMapping(path = "")
    @PreAuthorize("hasAuthority('accident:list')")
    public ResponseEntity<List<Accident>> findAll() throws ResourceNotFoundException {
        ApplicationUser currentUser = applicationUserService.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        List<Accident> accidents = accidentService.findByApplicationUser(currentUser);
        return ResponseEntity
                .ok(accidents);
    }

    @GetMapping(path = "latest/attente-validation")
    @PreAuthorize("hasAuthority('accident:list')")
    public ResponseEntity<List<Accident>> findAllLatestAwaitingValidation() {
        Etat awaitingValidationState = etatService.findByCode(Workflow.AWAITING_VALIDATION.getStateCode());
        List<Accident> accidents = accidentService.findAllLatestByEtat(awaitingValidationState);
        return ResponseEntity
                .ok(accidents);
    }

    @GetMapping(path = "by-etat/{id}")
    @PreAuthorize("hasAuthority('accident:list')")
    public ResponseEntity<List<Accident>> findByEtat(@PathVariable("id") Long idEtat) throws ResourceNotFoundException {
        List<Accident> accidents = accidentService.findAllLatestByEtat(etatService.find(idEtat));
        return ResponseEntity
                .ok(accidents);
    }

    @GetMapping(path = "{id}")
    @PreAuthorize("hasAuthority('accident:view')")
    public ResponseEntity<Accident> find(@PathVariable("id") Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(
                accidentService
                        .find(id)
        );
    }

    @GetMapping(path = "{id}/fence")
    @PreAuthorize("hasAuthority('accident:write')")
    public ResponseEntity<Accident> fenceAndNotify(@PathVariable("id") Long id) throws ResourceNotFoundException, NotAllowedOperationException, MessagingException {
        Accident accident = accidentService
                .find(id);

        if (!accident.getEtat().getCode().equals(Workflow.AWAITING_EXPERTISE.getStateCode())  || accident.getMontantRemboursement().isNaN())
            throw new NotAllowedOperationException("Impossible de cloturer ce dossier.");

        accident.setEtat(accident.getEtat().getEtatSuivant());
        String message = String.format(
                "<p>Bonjour %s,</p>\n" +
                        "<p>Nous vous informons que nous avons fini de traiter votre dossier.</p>\n" +
                        "<p>Vous pouvez donc venir &agrave; l'agence afin de r&eacute;cup&eacute;rer votre ch&eacute;que de remboursement.</p>\n" +
                        "<p>Vous pouvez &eacute;ventuellement consulter les diff&eacute;rents montant depuis votre espace personnel.</p>\n" +
                        "<p>Nous vous remercions pour la confiance.</p>\n" +
                        "<p>Cordialement.</p>",
                accident.getApplicationUser().getPrenom() + ' ' + accident.getApplicationUser().getNom()
        );

        commonService.sendMail(accident.getApplicationUser().getUsername(), "CIA: Retrait de chéque", message);
        accident.setChanged(false);
        return ResponseEntity.ok(
                accidentService.update(accident.getId(), accident)
        );
    }

    @GetMapping(path = "awaiting-exp")
    @PreAuthorize("hasAuthority('accident:list')")
    public ResponseEntity<List<Accident>> findAllAwaitingExpertise() throws ResourceNotFoundException {
        List<Accident> accidents = accidentService.findAllLatestByEtat(etatService.findByCode(Workflow.AWAITING_EXPERTISE.getStateCode()));
        return ResponseEntity.ok(
                accidents
        );
    }

    @PostMapping(path = "")
    @PreAuthorize("hasAuthority('accident:write')")
    public ResponseEntity<Accident> store(@RequestBody Accident accident) throws ResourceAlreadyExistsException {
        Etat firstEtat = etatService.findByCode(Workflow.AWAITING_VALIDATION.getStateCode());
        accident.setEtat(firstEtat);
        accident.setChanged(false);
        accident.setCode(io.jsonwebtoken.lang.Strings.capitalize(RandomStringUtils.randomAlphanumeric(10)));
        return ResponseEntity.ok(accidentService.store(accident));
    }


    @PutMapping(path = "{id}")
    @PreAuthorize("hasAuthority('accident:write')")
    public ResponseEntity<Accident> updated(@PathVariable("id") Long id, @RequestBody Accident accident) throws ResourceNotFoundException {
        return ResponseEntity.ok(
                accidentService.update(id, accident)
        );
    }

    @GetMapping(path = "{id}/validate")
    @PreAuthorize("hasAuthority('accident:write')")
    public ResponseEntity<Accident> validate(@PathVariable("id") Long id) throws ResourceNotFoundException, NotAllowedOperationException {
        Accident accident = accidentService.find(id);
        if (!accident.getEtat().getCode().equals(Workflow.AWAITING_VALIDATION.getStateCode()))
            throw new NotAllowedOperationException("Ce dossier est déjà valide");
        accident.setEtat(accident.getEtat().getEtatSuivant());
        accident.setChanged(true);
        return ResponseEntity.ok(
                accidentService.update(id, accident)
        );
    }

    @GetMapping(path = "{id}/switch-attente-expertise")
    @PreAuthorize("hasAuthority('accident:write')")
    public ResponseEntity<Accident> swithToAttenteExpertise(@PathVariable("id") Long id) throws ResourceNotFoundException, NotAllowedOperationException {
        Accident accident = accidentService.find(id);
        if (accident.getEtat().getCode().equals(Workflow.AWAITING_EXPERTISE.getStateCode()))
            throw new NotAllowedOperationException("Ce dossier est déjà en attente d'expertise");
        accident.setEtat(accident.getEtat().getEtatSuivant());
        accident.setChanged(true);
        return ResponseEntity.ok(
                accidentService.update(id, accident)
        );
    }

    @DeleteMapping(path = "{id}")
    @PreAuthorize("hasAuthority('accident:delete')")
    public Map<String, Boolean> destroy(@PathVariable("id") Long id) throws ResourceNotFoundException {
        accidentService.destroy(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
