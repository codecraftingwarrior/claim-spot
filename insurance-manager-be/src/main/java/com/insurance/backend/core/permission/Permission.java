package com.insurance.backend.core.permission;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.insurance.backend.core.role.Role;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "permission")
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom", nullable = false)
    private String nom;

    @ManyToMany(mappedBy = "permissions", fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<Role> roles;

    public Permission() {
    }

    public Permission(String nom) {
        this.nom = nom;
    }

    public Permission(Long id, String nom, Set<Role> roles) {
        this.id = id;
        this.nom = nom;
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}
