package com.insurance.backend.core.detailadversaire;

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
@RequestMapping("/api/detail-adversaire")
public class DetailAdversaireController {
    private final DetailAdversaireService detailAdversaireService;

    @Autowired
    public DetailAdversaireController(DetailAdversaireService detailAdversaireService) {
        this.detailAdversaireService = detailAdversaireService;
    }

    @GetMapping(path = "")
    @PreAuthorize("hasAuthority('detail-adversaire:list')")
    public ResponseEntity<List<DetailAdversaire>> findAll() {
        List<DetailAdversaire> detailAdversaires = detailAdversaireService.findAll();
        return ResponseEntity
                .ok(detailAdversaires);
    }

    @GetMapping(path = "{id}")
    @PreAuthorize("hasAuthority('detail-adversaire:view')")
    public ResponseEntity<DetailAdversaire> find(@PathVariable("id") Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(
            detailAdversaireService
                        .find(id)
        );
    }

    @PostMapping(path = "")
    @PreAuthorize("hasAuthority('detail-adversaire:write')")
    public ResponseEntity<DetailAdversaire> store(@RequestBody DetailAdversaire detailAdversaire) throws ResourceAlreadyExistsException {
        return ResponseEntity.ok(detailAdversaireService.store(detailAdversaire));
    }


    @PutMapping(path = "{id}")
    @PreAuthorize("hasAuthority('detail-adversaire:write')")
    public ResponseEntity<DetailAdversaire> updated(@PathVariable("id") Long id, @RequestBody DetailAdversaire detailAdversaire) throws ResourceNotFoundException {
        return ResponseEntity.ok(
                    detailAdversaireService.update(id, detailAdversaire)
        );
    }

    @DeleteMapping(path = "{id}")
    @PreAuthorize("hasAuthority('detail-adversaire:delete')")
    public Map<String, Boolean> destroy(@PathVariable("id") Long id) throws ResourceNotFoundException {
        detailAdversaireService.destroy(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
