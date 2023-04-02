package com.insurance.backend.core.etat;

import com.insurance.backend.core.exception.ResourceAlreadyExistsException;
import com.insurance.backend.core.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/etat")
public class EtatController {
    private final EtatService etatService;

    @Autowired
    public EtatController(EtatService etatService) {
        this.etatService = etatService;
    }

    @GetMapping(path = "")
    @PreAuthorize("hasAuthority('etat:list')")
    public ResponseEntity<List<Etat>> findAll() {
        List<Etat> etats = etatService.findAll();
        return ResponseEntity
                .ok(etats);
    }

    @GetMapping(path = "{id}")
    @PreAuthorize("hasAuthority('etat:view')")
    public ResponseEntity<Etat> find(@PathVariable("id") Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(
                etatService
                        .find(id)
        );
    }

    @PostMapping(path = "")
    @PreAuthorize("hasAuthority('etat:write')")
    public ResponseEntity<Etat> store(@RequestBody Etat etat) throws ResourceAlreadyExistsException {
        return ResponseEntity.ok(etatService.store(etat));
    }


    @PutMapping(path = "{id}")
    @PreAuthorize("hasAuthority('etat:write')")
    public ResponseEntity<Etat> updated(@PathVariable("id") Long id, @RequestBody Etat etat) throws ResourceNotFoundException {
        return ResponseEntity.ok(
                etatService.update(id, etat)
        );
    }

    @DeleteMapping(path = "{id}")
    @PreAuthorize("hasAuthority('etat:delete')")
    public Map<String, Boolean> destroy(@PathVariable("id") Long id) throws ResourceNotFoundException {
        etatService.destroy(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
