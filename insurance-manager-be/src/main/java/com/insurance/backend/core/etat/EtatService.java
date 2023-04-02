package com.insurance.backend.core.etat;

import com.insurance.backend.core.exception.ResourceNotFoundException;
import com.insurance.backend.core.general.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EtatService extends BaseService<EtatRepository, Etat> {
    private final EtatRepository repository;

    @Autowired
    protected EtatService(EtatRepository repository) {
        super(repository, "Etat");
        this.repository = repository;
    }

    @Override
    public Etat update(Long idForUpdate, Etat entity) throws ResourceNotFoundException {
        Etat etatToUpdate = find(idForUpdate);
        etatToUpdate.setCode(entity.getCode());
        etatToUpdate.setLibelle(entity.getLibelle());
        etatToUpdate.setEtatSuivant(entity.getEtatSuivant());
        return repository.save(etatToUpdate);
    }

    public Etat findByCode(String code) {
        return repository.findByCode(code);
    }
}
