package com.insurance.backend.core.rendezvous;

import com.insurance.backend.core.exception.ResourceNotFoundException;
import com.insurance.backend.core.general.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RendezVousService extends BaseService<RendezVousRepository, RendezVous> {
    private final RendezVousRepository repository;

    @Autowired
    protected RendezVousService(RendezVousRepository repository) {
        super(repository, "RendezVous");
        this.repository = repository;
    }

    @Override
    public RendezVous update(Long idForUpdate, RendezVous entity) throws ResourceNotFoundException {
        RendezVous rendezVouToUpdate = find(idForUpdate);
        rendezVouToUpdate.setDescription(entity.getDescription());
        rendezVouToUpdate.setAccident(entity.getAccident());
        rendezVouToUpdate.setCreneau(entity.getCreneau());

        return repository.save(rendezVouToUpdate);
    }
}
