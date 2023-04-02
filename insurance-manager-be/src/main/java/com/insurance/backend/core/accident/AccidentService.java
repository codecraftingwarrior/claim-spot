package com.insurance.backend.core.accident;

import com.insurance.backend.core.auth.ApplicationUser;
import com.insurance.backend.core.etat.Etat;
import com.insurance.backend.core.exception.ResourceNotFoundException;
import com.insurance.backend.core.general.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccidentService extends BaseService<AccidentRepository, Accident> {
    private final AccidentRepository repository;

    @Autowired
    protected AccidentService(AccidentRepository repository) {
        super(repository, "Accident");
        this.repository = repository;
    }

    @Override
    public Accident update(Long idForUpdate, Accident entity) throws ResourceNotFoundException {
        Accident accidentToUpdate = find(idForUpdate);
        accidentToUpdate.setCode(entity.getCode());
        accidentToUpdate.setDate(entity.getDate());
        accidentToUpdate.setHeure(entity.getHeure());
        accidentToUpdate.setLieu(entity.getLieu());
        accidentToUpdate.setDetails(entity.getDetails());
        accidentToUpdate.setChanged(entity.getChanged());
        accidentToUpdate.setCreatedAt(entity.getCreatedAt());
        accidentToUpdate.setMontantRemboursement(entity.getMontantRemboursement());
        accidentToUpdate.setMotantReparartion(entity.getMotantReparartion());
        accidentToUpdate.setEtat(entity.getEtat());
        accidentToUpdate.setApplicationUser(entity.getApplicationUser());
        accidentToUpdate.setVehicule(entity.getVehicule());
        accidentToUpdate.setDetailAdversaire(entity.getDetailAdversaire());
        accidentToUpdate.setPhotos(entity.getPhotos());
        return repository.save(accidentToUpdate);
    }

    public List<Accident> findByApplicationUser(ApplicationUser user) {
        return repository.findByApplicationUser(user);
    }

    public List<Accident> findAllLatestByEtat(Etat etat) {
        return repository.findByEtatOrderByCreatedAtDesc(etat);
    }

}
