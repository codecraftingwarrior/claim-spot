package com.insurance.backend.core.annonce;

import com.insurance.backend.core.exception.ResourceNotFoundException;
import com.insurance.backend.core.general.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnnonceService extends BaseService<AnnonceRepository, Annonce> {
    private final AnnonceRepository repository;

    @Autowired
    protected AnnonceService(AnnonceRepository repository) {
        super(repository, "Annonce");
        this.repository = repository;
    }

    @Override
    public Annonce update(Long idForUpdate, Annonce entity) throws ResourceNotFoundException {
        Annonce annonceToUpdate = find(idForUpdate);
        annonceToUpdate.setLibelle(entity.getLibelle());
        annonceToUpdate.setPrix(entity.getPrix());
        annonceToUpdate.setType(entity.getType());
        annonceToUpdate.setValidated(entity.getValidated());
        annonceToUpdate.setDisabled(entity.getDisabled());
        annonceToUpdate.setVehicule(entity.getVehicule());
        return repository.save(annonceToUpdate);
    }
}
