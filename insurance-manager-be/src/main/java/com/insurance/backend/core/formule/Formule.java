package com.insurance.backend.core.formule;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.insurance.backend.core.auth.ApplicationUser;
import com.insurance.backend.core.option.Option;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "formule")
public class Formule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;
    private String libelle;
    private Float montant;
    private String description;
    private Boolean canPost;
    private Boolean visible;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "option_formule",
            joinColumns = @JoinColumn(name = "formule_id"),
            inverseJoinColumns = @JoinColumn(name = "option_id")
    )
    private Set<Option> options;

    @JsonIgnore
    @OneToMany(mappedBy="formule")
    private Set<ApplicationUser> users;

    public Formule(String code, String libelle, Float montant, String description, Boolean canPost, Boolean visible, Set<ApplicationUser> users, Set<Option> options) {
        this.code = code;
        this.libelle = libelle;
        this.montant = montant;
        this.description = description;
        this.canPost = canPost;
        this.visible = visible;
        this.users = users;
        this.options = options;
    }

    public Formule() {
    }

    public Long getId() {
        return id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public Float getMontant() {
        return montant;
    }

    public void setMontant(Float montant) {
        this.montant = montant;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getCanPost() {
        return canPost;
    }

    public void setCanPost(Boolean canPost) {
        this.canPost = canPost;
    }

    public Set<ApplicationUser> getUsers() {
        return users;
    }

    public void setUsers(Set<ApplicationUser> users) {
        this.users = users;
    }

    public Set<Option> getOptions() {
        return options;
    }
    public void setOptions(Set<Option> options) {
        this.options = options;
    }

    public Boolean getVisible() {
        return visible;
    }

    public void setVisible(Boolean visible) {
        this.visible = visible;
    }
}
