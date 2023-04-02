package com.insurance.backend.core.annonce;

import com.insurance.backend.core.exception.ResourceAlreadyExistsException;
import com.insurance.backend.core.exception.ResourceNotFoundException;
import com.insurance.backend.core.vehicule.Vehicule;
import com.insurance.backend.core.vehicule.VehiculeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/annonce")
public class AnnonceController {
    private final AnnonceService annonceService;
    private final VehiculeService vehiculeService;

    @Autowired
    public AnnonceController(AnnonceService annonceService, VehiculeService vehiculeService) {
        this.annonceService = annonceService;
        this.vehiculeService = vehiculeService;
    }

    @GetMapping(path = "")
    //@PreAuthorize("hasAuthority('annonce:list')")
    public ResponseEntity<List<Annonce>> findAll() {
        List<Annonce> annonces = annonceService.findAll();
        return ResponseEntity
                .ok(annonces);
    }

    @GetMapping(path = "{id}")
    @PreAuthorize("hasAuthority('annonce:view')")
    public ResponseEntity<Annonce> find(@PathVariable("id") Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(
            annonceService
                        .find(id)
        );
    }

    @PostMapping(path = "")
    @PreAuthorize("hasAuthority('annonce:write')")
    public ResponseEntity<Annonce> store(@RequestBody Annonce annonce) throws ResourceAlreadyExistsException {
        return ResponseEntity.ok(annonceService.store(annonce));
    }


    @PutMapping(path = "{id}")
    @PreAuthorize("hasAuthority('annonce:write')")
    public ResponseEntity<Annonce> updated(@PathVariable("id") Long id, @RequestBody Annonce annonce) throws ResourceNotFoundException {
        return ResponseEntity.ok(
                    annonceService.update(id, annonce)
        );
    }

    @DeleteMapping(path = "{id}")
    @PreAuthorize("hasAuthority('annonce:delete')")
    public Map<String, Boolean> destroy(@PathVariable("id") Long id) throws ResourceNotFoundException {
        Vehicule vehicule = annonceService.find(id).getVehicule();
        vehicule.setAnnonce(null);
        vehiculeService.update(vehicule.getId(), vehicule);
        annonceService.destroy(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
