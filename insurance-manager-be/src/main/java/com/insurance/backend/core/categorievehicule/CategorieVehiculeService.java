package com.insurance.backend.core.categorievehicule;

import com.insurance.backend.core.exception.ResourceNotFoundException;
import com.insurance.backend.core.general.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategorieVehiculeService extends BaseService<CategorieVehiculeRepository, CategorieVehicule> {
    private final CategorieVehiculeRepository repository;

    @Autowired
    protected CategorieVehiculeService(CategorieVehiculeRepository repository) {
        super(repository, "CategorieVehicule");
        this.repository = repository;
    }

    @Override
    public CategorieVehicule update(Long idForUpdate, CategorieVehicule entity) throws ResourceNotFoundException {
        CategorieVehicule categorieVehiculeToUpdate = find(idForUpdate);
        categorieVehiculeToUpdate.setCode(entity.getCode());
        categorieVehiculeToUpdate.setLibelle(entity.getLibelle());
        categorieVehiculeToUpdate.setIcon(entity.getIcon());
        return repository.save(categorieVehiculeToUpdate);
    }
}
