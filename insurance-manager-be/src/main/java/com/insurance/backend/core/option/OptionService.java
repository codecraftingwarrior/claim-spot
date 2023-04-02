package com.insurance.backend.core.option;

import com.insurance.backend.core.exception.ResourceNotFoundException;
import com.insurance.backend.core.general.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OptionService extends BaseService<OptionRepository, Option> {
    private final OptionRepository repository;

    @Autowired
    protected OptionService(OptionRepository repository) {
        super(repository, "Option");
        this.repository = repository;
    }

    @Override
    public Option update(Long idForUpdate, Option entity) throws ResourceNotFoundException {
        Option optionToUpdate = find(idForUpdate);
        optionToUpdate.setLibelle(entity.getLibelle());
        return repository.save(optionToUpdate);
    }
}
