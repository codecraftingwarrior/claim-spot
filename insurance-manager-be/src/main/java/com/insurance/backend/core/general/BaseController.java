package com.insurance.backend.core.general;

import com.insurance.backend.core.exception.ResourceNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public abstract class BaseController<R extends JpaRepository<T, Long>, S extends BaseService<R, T>, T> {
    private final S service;

    public BaseController(S service) {
        this.service = service;
    }

    @GetMapping(path = "")
    public ResponseEntity<List<T>> findAll() {
        List<T> entities = service.findAll();
        return ResponseEntity
                .ok(entities);
    }

    @GetMapping(path = "{id}")
    public ResponseEntity<T> find(@PathVariable("id") Long id) throws Exception {
        return ResponseEntity.ok(
                service
                        .find(id)
        );
    }

    @PostMapping(path = "")
    public ResponseEntity<T> store(@RequestBody T entity) throws Exception {
        return ResponseEntity.ok(service.store(entity));
    }  ;

    @PutMapping(path = "{id}")
    public ResponseEntity<T> updated(@PathVariable("id") Long id, @RequestBody T entity) throws Exception {
        return ResponseEntity.ok(
                service.update(id, entity)
        );
    }

    @DeleteMapping(path = "{id}")
    public Map<String, Boolean> destroy(@PathVariable("id") Long id) throws Exception {
        service.destroy(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
