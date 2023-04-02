package com.insurance.backend.core.role;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.insurance.backend.core.permission.Permission;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.persistence.*;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "nom", nullable = false)
    private String nom;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "role_permission",
            joinColumns = @JoinColumn(name = "role"),
            inverseJoinColumns = @JoinColumn(name = "permission")
    )
    private Set<Permission> permissions;

    @Transient
    @JsonIgnore
    private Set<GrantedAuthority> grantedAuthorities;

    public Role() {
    }

    public Role(Long id, String code, String nom, Set<Permission> permissions) {
        this.id = id;
        this.code = code;
        this.nom = nom;
        this.permissions = permissions;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Set<Permission> getPermissions() {
        return permissions;
    }

    public Set<GrantedAuthority> getGrantedAuthorities() {
       grantedAuthorities = this
                .getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getNom()))
                .collect(Collectors.toSet());
        grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_" + this.getCode()));
        return grantedAuthorities;
    }

    public void setPermissions(Set<Permission> permissions) {
        this.permissions = permissions;
    }
}
