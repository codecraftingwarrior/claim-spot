package com.insurance.backend.core.option;

import com.insurance.backend.core.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/option")
public class OptionController {
    private final OptionService optionService;

    @Autowired
    public OptionController(OptionService optionService) {
        this.optionService = optionService;
    }

    @GetMapping(path = "")
    @PreAuthorize("hasAuthority('option:list')")
    public ResponseEntity<List<Option>> findAll() {
        List<Option> options = optionService.findAll();
        return ResponseEntity
                .ok(options);
    }

    @GetMapping(path = "{id}")
    @PreAuthorize("hasAuthority('option:view')")
    public ResponseEntity<Option> find(@PathVariable("id") Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(
            optionService
                        .find(id)
        );
    }

    @PostMapping(path = "")
    @PreAuthorize("hasAuthority('option:write')")
    public ResponseEntity<Option> store(@RequestBody Option option) {
        return ResponseEntity.ok(optionService.store(option));
    }


    @PutMapping(path = "{id}")
    @PreAuthorize("hasAuthority('option:write')")
    public ResponseEntity<Option> updated(@PathVariable("id") Long id, @RequestBody Option option) throws ResourceNotFoundException {
        return ResponseEntity.ok(
                    optionService.update(id, option)
        );
    }

    @DeleteMapping(path = "{id}")
    @PreAuthorize("hasAuthority('option:delete')")
    public Map<String, Boolean> destroy(@PathVariable("id") Long id) throws ResourceNotFoundException {
        optionService.destroy(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
