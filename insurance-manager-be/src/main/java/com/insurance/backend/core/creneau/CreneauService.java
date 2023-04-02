package com.insurance.backend.core.creneau;

import com.insurance.backend.core.exception.ResourceNotFoundException;
import com.insurance.backend.core.general.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Service
public class CreneauService extends BaseService<CreneauRepository, Creneau> {
    private final CreneauRepository repository;

    @Autowired
    protected CreneauService(CreneauRepository repository) {
        super(repository, "Creneau");
        this.repository = repository;
    }

    @Override
    public Creneau update(Long idForUpdate, Creneau entity) throws ResourceNotFoundException {
        Creneau creneauToUpdate = find(idForUpdate);
        creneauToUpdate.setDate(entity.getDate());
        creneauToUpdate.setHeure(entity.getHeure());
        creneauToUpdate.setChoosen(entity.getChoosen());
        return repository.save(creneauToUpdate);
    }

    public List<Creneau> findByDate(Date date) {
        return repository.findByDate(date);
    }

    public List<Creneau> storeMultiple(List<Creneau> creneaux) {
        return repository.saveAll(creneaux);
    }
}
