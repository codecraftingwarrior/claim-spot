package com.insurance.backend.core.option;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.insurance.backend.core.formule.Formule;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "application_option")
public class Option {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String libelle;

    @ManyToMany(mappedBy = "options", fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<Formule> formules;

    public Option() {
    }

    public Option(String libelle, Set<Formule> formules) {
        this.libelle = libelle;
        this.formules = formules;
    }

    public Long getId() {
        return id;
    }

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public Set<Formule> getFormules() {
        return formules;
    }

    public void setFormules(Set<Formule> formules) {
        this.formules = formules;
    }
}
