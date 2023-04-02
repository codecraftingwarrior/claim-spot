package com.insurance.backend.core.formule;

import com.insurance.backend.core.exception.ResourceNotFoundException;
import com.insurance.backend.core.general.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FormuleService extends BaseService<FormuleRepository, Formule> {
    private final FormuleRepository repository;

    @Autowired
    protected FormuleService(FormuleRepository repository) {
        super(repository, "Formule");
        this.repository = repository;
    }

    @Override
    public Formule update(Long idForUpdate, Formule entity) throws ResourceNotFoundException {
        Formule formuleToUpdate = find(idForUpdate);
        formuleToUpdate.setCode(entity.getCode());
        formuleToUpdate.setLibelle(entity.getLibelle());
        formuleToUpdate.setMontant(entity.getMontant());
        formuleToUpdate.setDescription(entity.getDescription());
        formuleToUpdate.setCanPost(entity.getCanPost());
        formuleToUpdate.setVisible(entity.getVisible());
        formuleToUpdate.setOptions(entity.getOptions());
        return repository.save(formuleToUpdate);
    }

    public Formule findByCode(String code) {
        return repository.findByCode(code);
    }
}
