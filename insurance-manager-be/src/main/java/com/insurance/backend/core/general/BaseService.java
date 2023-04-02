package com.insurance.backend.core.general;

import com.insurance.backend.core.exception.ResourceNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public abstract class BaseService<R extends JpaRepository<T, Long>, T> {
    private final R repository;
    private final String entityName;

    protected BaseService(R repository, String entityName) {
        this.repository = repository;
        this.entityName = entityName;
    }

    public List<T> findAll() {
        return repository.findAll();
    }

    public T store(T entity) {
        return repository.save(entity);
    }

    public T find(Long id) throws ResourceNotFoundException {
        return repository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(entityName + " introuvable"));
    }


    public abstract T update(Long idForUpdate, T entity) throws ResourceNotFoundException;

    public void destroy(Long id) throws ResourceNotFoundException {
        repository.delete(find(id));
    }

    public void flush() {
        repository.flush();
    }
}
