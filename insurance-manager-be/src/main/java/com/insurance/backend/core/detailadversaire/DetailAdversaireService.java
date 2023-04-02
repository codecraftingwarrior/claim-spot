package com.insurance.backend.core.detailadversaire;

import com.insurance.backend.core.exception.ResourceNotFoundException;
import com.insurance.backend.core.general.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DetailAdversaireService extends BaseService<DetailAdversaireRepository, DetailAdversaire> {
    private final DetailAdversaireRepository repository;

    @Autowired
    protected DetailAdversaireService(DetailAdversaireRepository repository) {
        super(repository, "DetailAdversaire");
        this.repository = repository;
    }

    @Override
    public DetailAdversaire update(Long idForUpdate, DetailAdversaire entity) throws ResourceNotFoundException {
        DetailAdversaire detailAdversaireToUpdate = find(idForUpdate);
        detailAdversaireToUpdate.setPrenom(entity.getPrenom());
        detailAdversaireToUpdate.setNom(entity.getNom());
        detailAdversaireToUpdate.setGenre(entity.getGenre());
        detailAdversaireToUpdate.setMarqueVehicule(entity.getMarqueVehicule());
        detailAdversaireToUpdate.setModeleVehicule(entity.getModeleVehicule());
        detailAdversaireToUpdate.setImmatriculation(entity.getImmatriculation());
        detailAdversaireToUpdate.setAccident(entity.getAccident());
        detailAdversaireToUpdate.setCategorieVehicule(entity.getCategorieVehicule());
        return repository.save(detailAdversaireToUpdate);
    }
}
