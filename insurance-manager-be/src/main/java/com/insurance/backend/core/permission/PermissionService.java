package com.insurance.backend.core.permission;

import com.insurance.backend.core.exception.ResourceNotFoundException;
import com.insurance.backend.core.general.BaseService;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class PermissionService extends BaseService<PermissionRepository, Permission> {
    private final PermissionRepository permissionRepository;

    public PermissionService(PermissionRepository permissionRepository) {
        super(permissionRepository, "Permission");
        this.permissionRepository = permissionRepository;
    }

    @Override
    public Permission update(Long idForUpdate, Permission entity) throws ResourceNotFoundException {
        Permission permissionBeforeUpdate = find(idForUpdate);
        permissionBeforeUpdate.setNom(entity.getNom());
        return permissionRepository
                .save(permissionBeforeUpdate);
    }

    public void saveAll(Set<Permission> permissions) {
        permissionRepository.saveAll(permissions);
    }

    public Permission findByNom(String nom) throws ResourceNotFoundException {
        return permissionRepository
                .findByNom(nom)
                .orElseThrow(() -> new ResourceNotFoundException("Permission introuvable"));
    }
}
