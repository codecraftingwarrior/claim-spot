package com.insurance.backend.core.vehicule;

import com.google.common.base.Strings;
import com.insurance.backend.core.auth.ApplicationUser;
import com.insurance.backend.core.exception.ResourceNotFoundException;
import com.insurance.backend.core.general.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Service
public class VehiculeService extends BaseService<VehiculeRepository, Vehicule> {
    private final String IMAGE_UPLOAD_DIRECTORY = "src/main/resources/uploads/images/vehicules";
    private final String REAL_IMAGE_PATH = "static/images/vehicules";
    private final VehiculeRepository repository;

    @Autowired
    protected VehiculeService(VehiculeRepository repository) {
        super(repository, "Vehicule");
        this.repository = repository;
    }

    @Override
    public Vehicule update(Long idForUpdate, Vehicule entity) throws ResourceNotFoundException {
        Vehicule vehiculeToUpdate = find(idForUpdate);
        vehiculeToUpdate.setImmatriculation(entity.getImmatriculation());
        vehiculeToUpdate.setMarque(entity.getMarque());
        vehiculeToUpdate.setModele(entity.getModele());
        vehiculeToUpdate.setImgFilename(entity.getImgFilename());
        vehiculeToUpdate.setImgUrl(entity.getImgUrl());
        vehiculeToUpdate.setCategorie(entity.getCategorie());
        vehiculeToUpdate.setApplicationUser(entity.getApplicationUser());
        vehiculeToUpdate.setAnnonce(entity.getAnnonce());
        return repository.save(vehiculeToUpdate);
    }

    public List<Vehicule> findByApplicationUser(ApplicationUser user) {
     return repository.findByApplicationUser(user);
    }


    public void destroyWithImage(Long id) throws ResourceNotFoundException, IOException {
        Vehicule vehicule = find(id);
        if (!Strings.isNullOrEmpty(vehicule.getImgFilename())) {
            String path = System.getProperty("user.dir") + File.separator + IMAGE_UPLOAD_DIRECTORY + File.separator + vehicule.getImgFilename();
            Files.delete(Paths.get(path));
        }
        super.destroy(id);
    }
}
