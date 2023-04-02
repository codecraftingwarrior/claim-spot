package com.insurance.backend.core.role;

import com.insurance.backend.core.exception.ResourceAlreadyExistsException;
import com.insurance.backend.core.exception.ResourceNotFoundException;
import com.insurance.backend.core.permission.Permission;
import com.insurance.backend.core.permission.PermissionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(path = "/api/role")
public class RoleController {
    private final RoleService roleService;
    private final PermissionService permissionService;

    public RoleController(RoleService roleService, PermissionService permissionService) {
        this.roleService = roleService;
        this.permissionService = permissionService;
    }

    @GetMapping(path = "")
    @PreAuthorize("hasAuthority('role:list')")
    public ResponseEntity<List<Role>> findAll() {
        List<Role> roles = roleService.findAll();
        return ResponseEntity
                .ok(roles);
    }

    @GetMapping(path = "{id}")
    @PreAuthorize("hasAuthority('role:view')")
    public ResponseEntity<RoleView> find(@PathVariable("id") Long id) throws ResourceNotFoundException {
        Role role = roleService.find(id);
        Set<EntityGroup> entityGroups = EntityGroup.getEntityAccessGroup();
        for (EntityGroup entityGroup : entityGroups) {
            for (EntityPermission entityPermission : entityGroup.getEntityPermissions()) {
                String viewAllPermissionName = String.format("%s:list", entityPermission.getEntityCode());
                String viewOnePermissionName = String.format("%s:view", entityPermission.getEntityCode());
                String deletePermissionName = String.format("%s:delete", entityPermission.getEntityCode());
                String writePermissionName = String.format("%s:write", entityPermission.getEntityCode());

                try {
                    Permission viewAllPermission = permissionService.findByNom(viewAllPermissionName);
                    if (role.getPermissions().contains(viewAllPermission)) {
                        entityPermission.setIsViewAllPermitted(true);
                    }
                } catch (ResourceNotFoundException e) {
                    entityPermission.setIsViewAllPermitted(false);
                }

                try {
                    Permission viewOnePermission = permissionService.findByNom(viewOnePermissionName);
                    if (role.getPermissions().contains(viewOnePermission)) {
                        entityPermission.setIsViewOnePermitted(true);
                    }
                } catch (ResourceNotFoundException e) {
                    entityPermission.setIsViewOnePermitted(false);
                }

                try {
                    Permission deletePermission = permissionService.findByNom(deletePermissionName);
                    if (role.getPermissions().contains(deletePermission)) {
                        entityPermission.setIsDeletePermitted(true);
                    }
                } catch (ResourceNotFoundException e) {
                    entityPermission.setIsDeletePermitted(false);
                }

                try {
                    Permission writePermission = permissionService.findByNom(writePermissionName);
                    if (role.getPermissions().contains(writePermission)) {
                        entityPermission.setIsWritePermitted(true);
                    }
                } catch (ResourceNotFoundException e) {
                    entityPermission.setIsWritePermitted(false);
                }
            }
        }
        return ResponseEntity.ok(new RoleView(role, entityGroups));
    }

    @GetMapping(path = "entity-groups")
    public ResponseEntity<Set<EntityGroup>> getAccessGroups() {
        return ResponseEntity.ok(EntityGroup.getEntityAccessGroup());
    }

    @PostMapping(path = "")
    @PreAuthorize("hasAuthority('role:write')")
    public ResponseEntity<Role> store(@RequestBody Role role) throws  ResourceAlreadyExistsException {
        Role byCode = roleService.findByCode(role.getCode());
        if (byCode != null) {
            throw new ResourceAlreadyExistsException("Un role avec le même code existe déjà.");
        }
        return ResponseEntity
                .ok(roleService.store(role));
    }

    @PostMapping(path = "manage-permission/{id}")
    @PreAuthorize("hasAnyAuthority('role:write','permission:write')")
    public ResponseEntity<Role> managePermission(@PathVariable("id") Long id, @RequestBody Set<EntityGroup> entityGroups) throws ResourceNotFoundException {
        Set<Permission> grantedPermissions = new HashSet<>();
        Set<Permission> deniedPermissions = new HashSet<>();
        Role role = roleService.find(id);
        for (EntityGroup entityGroup : entityGroups) {
            for (EntityPermission entityPermission : entityGroup.getEntityPermissions()) {
                String viewAllPermission = String.format("%s:list", entityPermission.getEntityCode());
                String viewOnePermission = String.format("%s:view", entityPermission.getEntityCode());
                String deletePermission = String.format("%s:delete", entityPermission.getEntityCode());
                String writePermission = String.format("%s:write", entityPermission.getEntityCode());

                if (entityPermission.getIsViewAllPermitted()) {
                    try {
                        grantedPermissions.add(permissionService.findByNom(viewAllPermission));
                    } catch (ResourceNotFoundException e) {
                        grantedPermissions.add(new Permission(viewAllPermission));
                    }
                } else {
                    try {
                        Permission permission = permissionService.findByNom(viewAllPermission);
                        if (role.getPermissions().contains(permission)) {
                            deniedPermissions.add(permission);
                        }
                    } catch (ResourceNotFoundException e) {
                        e.printStackTrace();
                    }
                }

                if (entityPermission.getIsViewOnePermitted()) {
                    try {
                        grantedPermissions.add(permissionService.findByNom(viewOnePermission));
                    } catch (ResourceNotFoundException e) {
                        grantedPermissions.add(new Permission(viewOnePermission));
                    }
                } else {
                    try {
                        Permission permission = permissionService.findByNom(viewOnePermission);
                        if (role.getPermissions().contains(permission)) {
                            deniedPermissions.add(permission);
                        }
                    } catch (ResourceNotFoundException e) {
                        e.printStackTrace();
                    }
                }

                if (entityPermission.getIsDeletePermitted()) {
                    try {
                        grantedPermissions.add(permissionService.findByNom(deletePermission));
                    } catch (ResourceNotFoundException e) {
                        grantedPermissions.add(new Permission(deletePermission));
                    }
                } else {
                    try {
                        Permission permission = permissionService.findByNom(deletePermission);
                        if (role.getPermissions().contains(permission)) {
                            deniedPermissions.add(permission);
                        }
                    } catch (ResourceNotFoundException e) {
                        e.printStackTrace();
                    }
                }

                if (entityPermission.getIsWritePermitted()) {
                    try {
                        grantedPermissions.add(permissionService.findByNom(writePermission));
                    } catch (ResourceNotFoundException e) {
                        grantedPermissions.add(new Permission(writePermission));
                    }
                } else {
                    try {
                        Permission permission = permissionService.findByNom(writePermission);
                        if (role.getPermissions().contains(permission)) {
                            deniedPermissions.add(permission);
                        }
                    } catch (ResourceNotFoundException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
        permissionService.saveAll(grantedPermissions);
        role.getPermissions().addAll(grantedPermissions);
        role.getPermissions().removeAll(deniedPermissions);
        return ResponseEntity
                .ok(roleService.store(role));
    }

    @PutMapping(path = "{id}")
    @PreAuthorize("hasAnyAuthority('role:write')")
    public ResponseEntity<Role> update(@PathVariable("id") Long id, @RequestBody Role role) throws ResourceNotFoundException {
        return ResponseEntity
                .ok(roleService.update(id, role));
    }

    @DeleteMapping(path = "{id}")
    @PreAuthorize("hasAnyAuthority('role:delete')")
    public Map<String, Boolean> destroy(@PathVariable("id") Long id) throws ResourceNotFoundException {
        roleService.destroy(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
