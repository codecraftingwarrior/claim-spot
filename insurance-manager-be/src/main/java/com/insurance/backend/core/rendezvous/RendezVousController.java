package com.insurance.backend.core.rendezvous;

import com.insurance.backend.common.CommonController;
import com.insurance.backend.core.accident.Accident;
import com.insurance.backend.core.accident.AccidentService;
import com.insurance.backend.core.auth.ApplicationUser;
import com.insurance.backend.core.creneau.Creneau;
import com.insurance.backend.core.creneau.CreneauService;
import com.insurance.backend.core.etat.EtatService;
import com.insurance.backend.core.exception.ResourceAlreadyExistsException;
import com.insurance.backend.core.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rendez-vou")
public class RendezVousController {
    private final RendezVousService rendezVouService;
    private final AccidentService accidentService;
    private final EtatService etatService;
    private final CreneauService creneauService;
    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;

    @Autowired
    public RendezVousController(
            RendezVousService rendezVouService,
            AccidentService accidentService,
            EtatService etatService,
            CreneauService creneauService,
            JavaMailSender javaMailSender,
            TemplateEngine templateEngine
    ) {
        this.rendezVouService = rendezVouService;
        this.accidentService = accidentService;
        this.etatService = etatService;
        this.creneauService = creneauService;
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
    }

    @GetMapping(path = "")
    @PreAuthorize("hasAuthority('rendez-vous:list')")
    public ResponseEntity<List<RendezVous>> findAll() {
        List<RendezVous> rendezVouses = rendezVouService.findAll();
        return ResponseEntity
                .ok(rendezVouses);
    }

    @GetMapping(path = "{id}")
    @PreAuthorize("hasAuthority('rendez-vous:view')")
    public ResponseEntity<RendezVous> find(@PathVariable("id") Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(
                rendezVouService
                        .find(id)
        );
    }

    @PostMapping(path = "")
    @PreAuthorize("hasAuthority('rendez-vous:write')")
    public ResponseEntity<RendezVous> store(@RequestBody RendezVous rendezVou) throws ResourceAlreadyExistsException, ResourceNotFoundException, MessagingException {
        RendezVous storedRendezVous = rendezVouService.store(rendezVou);
        Accident accident = accidentService.find(storedRendezVous.getAccident().getId());
        ApplicationUser author = accident.getApplicationUser();
        Creneau selectedCreneau = creneauService.find(storedRendezVous.getCreneau().getId());
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
//        Etat etat = etatService.findByCode(Workflow.AWAITING_EXPERTISE.getStateCode()) ;
//        accident.setEtat(etat);
//        accidentService.update(accident.getId(), accident);

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom("elahmadou.gueye@univ-thies.sn");
        helper.setTo(author.getUsername());
        helper.setSubject("CIA: Rendez - vous de prise de photo");

        Context context = new Context();
        context.setVariable("author", author);
        context.setVariable("date", formatter.format(selectedCreneau.getDate()));
        context.setVariable("heure", selectedCreneau.getHeure());
        context.setVariable("description", storedRendezVous.getDescription());
        String html = templateEngine.process("new-rendez-vous-mail", context);
        helper.setText(html, true);
//        message.setContent(String.format(
//                "<p>Bonjour <strong>%s</strong>,</p>\n" +
//                        "<p>Votre rendez vous de prise de photo est pr&eacute;vu le : <strong>%s</strong> &agrave; <strong>%s</strong>.</p>\n" +
//                        "<p>Nous allons venir chez vous, prendre des photo, et soumettre ces derniers &agrave; nos expert afin qu'ils puissent &eacute;valuer le co&ucirc;t du remboursement</p>\n" +
//                        "<p>Nous vous contacterons ult&eacute;rieurement pour que vous puissiez r&eacute;cup&eacute;rer votre ch&eacute;que.</p>\n" +
//                        "<p>%s<p>" +
//                        "<p>Cordialement.</p>",
//                author.getPrenom() + ' ' + author.getNom(),
//                formatter.format(selectedCreneau.getDate()) ,
//                selectedCreneau.getHeure(),
//                storedRendezVous.getDescription()
//                ),
//                "text/html");
        javaMailSender.send(message);

        selectedCreneau.setChoosen(true);
        creneauService.update(selectedCreneau.getId(), selectedCreneau);
        return ResponseEntity.ok(storedRendezVous);
    }


    @PutMapping(path = "{id}")
    @PreAuthorize("hasAuthority('rendez-vous:write')")
    public ResponseEntity<RendezVous> updated(@PathVariable("id") Long id, @RequestBody RendezVous rendezVou) throws ResourceNotFoundException {
        return ResponseEntity.ok(
                rendezVouService.update(id, rendezVou)
        );
    }

    @DeleteMapping(path = "{id}")
    @PreAuthorize("hasAuthority('rendez-vous:delete')")
    public Map<String, Boolean> destroy(@PathVariable("id") Long id) throws ResourceNotFoundException {
        rendezVouService.destroy(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
