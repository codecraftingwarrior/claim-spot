package com.insurance.backend.core.role;

import com.insurance.backend.core.exception.ResourceNotFoundException;
import com.insurance.backend.core.general.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class RoleService extends BaseService<RoleRepository, Role> {
    private final RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        super(roleRepository, "Role");
        this.roleRepository = roleRepository;
    }

    public Role update(Long idForUpdate, Role role) throws ResourceNotFoundException {
        Role roleToUpdate = find(idForUpdate);
        roleToUpdate.setNom(role.getNom());
        roleToUpdate.setCode(role.getCode());
        roleToUpdate.setPermissions(role.getPermissions());
        return roleRepository
                .save(roleToUpdate);
    }

    public Role findByCode(String code) {
        return roleRepository
                .findByCode(code);
    }

    public List<Role> findAllById(Iterable<Long> ids) {
        return roleRepository.findAllById(ids);
    }
}
