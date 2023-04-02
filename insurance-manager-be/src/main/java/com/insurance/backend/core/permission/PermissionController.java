package com.insurance.backend.core.permission;

import com.insurance.backend.core.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/permission")
public class PermissionController {
    private final PermissionService permissionService;


    @Autowired
    public PermissionController(PermissionService permissionService) {
        this.permissionService = permissionService;
    }

    @GetMapping(path = "")
    public ResponseEntity<List<Permission>> findAll() {
        List<Permission> permissions = permissionService.findAll();
        return ResponseEntity
                .ok(permissions);
    }

    @GetMapping(path = "{id}")
    public ResponseEntity<Permission> find(@PathVariable("id") Long id) throws ResourceNotFoundException {
        return ResponseEntity
                .ok(permissionService.find(id));
    }

    @PostMapping(path = "")
    public ResponseEntity<Permission> store(@RequestBody Permission permission) {
        return ResponseEntity
                .ok(permissionService.store(permission));
    }

    @PutMapping(path = "{id}")
    public ResponseEntity<Permission> update(@PathVariable("id") Long id, @RequestBody Permission permission) throws ResourceNotFoundException {
        return ResponseEntity
                .ok(permissionService.update(id, permission));
    }

    @DeleteMapping(path = "{id}")
    public Map<String, Boolean> destroy(@PathVariable("id") Long id) throws ResourceNotFoundException {
        permissionService.destroy(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
