package com.insurance.backend.core.role;

import com.google.common.collect.Sets;

import java.util.Set;

public class EntityGroup {

    private  String groupName;
    private Set<EntityPermission> entityPermissions;

    public EntityGroup() {}

    public EntityGroup(String groupName, Set<EntityPermission> entityPermissions) {
        this.groupName = groupName;
        this.entityPermissions = entityPermissions;
    }

    public String getGroupName() {
        return groupName;
    }

    public Set<EntityPermission> getEntityPermissions() {
        return entityPermissions;
    }

    public static Set<EntityGroup> getEntityAccessGroup() {
        return Sets
                .newHashSet(
                        new EntityGroup("Administration Globale",
                                Sets.newHashSet(
                                        new EntityPermission("role", "Role"),
                                        new EntityPermission("permission", "Permission"),
                                        new EntityPermission("user", "Utilisateurs"),
                                        new EntityPermission("formule", "Formule"),
                                        new EntityPermission("option", "Option"),
                                        new EntityPermission("creneau", "Creneau horaire"),
                                        new EntityPermission("etat", "Etat d'un accident"),
                                        new EntityPermission("categorie-vehicule", "Catégorie Vehicule")
                                )
                        ),

                        new EntityGroup("Sinistre",
                                Sets.newHashSet(
                                        new EntityPermission("vehicule", "Vehicule"),
                                        new EntityPermission("accident", "Accident"),
                                        new EntityPermission("rendez-vous", "Rendez - vous"),
                                        new EntityPermission("photo", "Photo"),
                                        new EntityPermission("details-adversaire", "Details adversaire")
                                )
                        ),

                        new EntityGroup("Divers",
                                    Sets.newHashSet(
                                            new EntityPermission("annonce", "Annonce")
                                    )
                                )
                );
    }
}
