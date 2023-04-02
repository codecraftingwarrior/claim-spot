package com.insurance.backend.core.formule;

import com.insurance.backend.core.auth.ApplicationUser;
import com.insurance.backend.core.exception.ResourceAlreadyExistsException;
import com.insurance.backend.core.exception.ResourceNotFoundException;
import com.insurance.backend.core.general.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/formule")
public class FormuleController {
    private final FormuleService formuleService;

    @Autowired
    public FormuleController(FormuleService formuleService) {
        this.formuleService = formuleService;
    }

    @GetMapping(path = "")
    @PreAuthorize("hasAuthority('role:list')")
    public ResponseEntity<List<Formule>> findAll() {
        List<Formule> formules = formuleService.findAll();
        return ResponseEntity
                .ok(formules);
    }

    @GetMapping(path = "{id}")
    @PreAuthorize("hasAuthority('role:view')")
    public ResponseEntity<Formule> find(@PathVariable("id") Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(
                formuleService
                        .find(id)
        );
    }

    @PostMapping(path = "")
    @PreAuthorize("hasAuthority('role:write')")
    public ResponseEntity<Formule> store(@RequestBody Formule formule) throws ResourceAlreadyExistsException {
        Formule byCode = formuleService.findByCode(formule.getCode());
        if (byCode != null) {
            throw new ResourceAlreadyExistsException("Un formule avec ce code existe déjà.");
        }
        return ResponseEntity.ok(formuleService.store(formule));
    }

    @PutMapping(path = "{id}")
    @PreAuthorize("hasAuthority('role:write')")
    public ResponseEntity<Formule> updated(@PathVariable("id") Long id, @RequestBody Formule formule) throws ResourceNotFoundException {
        return ResponseEntity.ok(
                formuleService.update(id, formule)
        );
    }

    @DeleteMapping(path = "{id}")
    @PreAuthorize("hasAuthority('role:delete')")
    public Map<String, Boolean> destroy(@PathVariable("id") Long id) throws ResourceNotFoundException {
        formuleService.destroy(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
