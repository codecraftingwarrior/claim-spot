package com.insurance.backend.core.categorievehicule;

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
@RequestMapping("/api/categorie-vehicule")
public class CategorieVehiculeController {
    private final CategorieVehiculeService categorieVehiculeService;

    @Autowired
    public CategorieVehiculeController(CategorieVehiculeService categorieVehiculeService) {
        this.categorieVehiculeService = categorieVehiculeService;
    }

    @GetMapping(path = "")
    @PreAuthorize("hasAuthority('categorie-vehicule:list')")
    public ResponseEntity<List<CategorieVehicule>> findAll() {
        List<CategorieVehicule> categorieVehicules = categorieVehiculeService.findAll();
        return ResponseEntity
                .ok(categorieVehicules);
    }

    @GetMapping(path = "{id}")
    @PreAuthorize("hasAuthority('categorie-vehicule:view')")
    public ResponseEntity<CategorieVehicule> find(@PathVariable("id") Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(
            categorieVehiculeService
                        .find(id)
        );
    }

    @PostMapping(path = "")
    @PreAuthorize("hasAuthority('categorie-vehicule:write')")
    public ResponseEntity<CategorieVehicule> store(@RequestBody CategorieVehicule categorieVehicule) throws ResourceAlreadyExistsException {
        return ResponseEntity.ok(categorieVehiculeService.store(categorieVehicule));
    }


    @PutMapping(path = "{id}")
    @PreAuthorize("hasAuthority('categorie-vehicule:write')")
    public ResponseEntity<CategorieVehicule> updated(@PathVariable("id") Long id, @RequestBody CategorieVehicule categorieVehicule) throws ResourceNotFoundException {
        return ResponseEntity.ok(
                    categorieVehiculeService.update(id, categorieVehicule)
        );
    }

    @DeleteMapping(path = "{id}")
    @PreAuthorize("hasAuthority('categorie-vehicule:delete')")
    public Map<String, Boolean> destroy(@PathVariable("id") Long id) throws ResourceNotFoundException {
        categorieVehiculeService.destroy(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
