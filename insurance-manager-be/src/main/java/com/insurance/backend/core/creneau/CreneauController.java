package com.insurance.backend.core.creneau;

import com.insurance.backend.core.exception.ResourceAlreadyExistsException;
import com.insurance.backend.core.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/creneau")
public class CreneauController {
    private final CreneauService creneauService;

    @Autowired
    public CreneauController(CreneauService creneauService) {
        this.creneauService = creneauService;
    }

    @GetMapping(path = "")
    @PreAuthorize("hasAuthority('creneau:list')")
    public ResponseEntity<List<Creneau>> findAll() {
        List<Creneau> creneaus = creneauService.findAll();
        return ResponseEntity
                .ok(creneaus);
    }

    @GetMapping(path = "{id}")
    @PreAuthorize("hasAuthority('creneau:view')")
    public ResponseEntity<Creneau> find(@PathVariable("id") Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(
                creneauService
                        .find(id)
        );
    }

    @GetMapping(path = "by-date/{date}")
    @PreAuthorize("hasAuthority('creneau:view')")
    public ResponseEntity<List<Creneau>> findByDate(@PathVariable("date") String date) throws ParseException {
        Date searchedDate = new SimpleDateFormat("yyyy-MM-dd").parse(date);
        return ResponseEntity.ok(
                creneauService
                        .findByDate(searchedDate)
        );
    }

    @PostMapping(path = "")
    @PreAuthorize("hasAuthority('creneau:write')")
    public ResponseEntity<Creneau> store(@RequestBody Creneau creneau) {
        return ResponseEntity.ok(creneauService.store(creneau));
    }

    @PostMapping(path = "multiple")
    @PreAuthorize("hasAuthority('creneau:write')")
    public ResponseEntity<List<Creneau>> storeMultiple(@RequestBody List<Creneau> creneaux) {
        return ResponseEntity.ok(creneauService.storeMultiple(creneaux));
    }


    @PutMapping(path = "{id}")
    @PreAuthorize("hasAuthority('creneau:write')")
    public ResponseEntity<Creneau> updated(@PathVariable("id") Long id, @RequestBody Creneau creneau) throws ResourceNotFoundException {
        return ResponseEntity.ok(
                creneauService.update(id, creneau)
        );
    }

    @DeleteMapping(path = "{id}")
    @PreAuthorize("hasAuthority('creneau:delete')")
    public Map<String, Boolean> destroy(@PathVariable("id") Long id) throws ResourceNotFoundException {
        creneauService.destroy(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
