package com.insurance.backend.core.role;

import java.util.Set;

public class RoleView {
    private Role role;
    private Set<EntityGroup> entityGroups;

    public RoleView(Role role, Set<EntityGroup> entityGroups) {
        this.role = role;
        this.entityGroups = entityGroups;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Set<EntityGroup> getEntityGroups() {
        return entityGroups;
    }

    public void setEntityGroups(Set<EntityGroup> entityGroups) {
        this.entityGroups = entityGroups;
    }
}
