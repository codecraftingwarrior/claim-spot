package com.insurance.backend.core.categorievehicule;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.insurance.backend.core.auth.ApplicationUser;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "categorie_vehicule")
public class CategorieVehicule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;
    private String libelle;
    private String icon;

    public CategorieVehicule() {}

    public CategorieVehicule(Long id, String code, String libelle, String icon) {
        this.id = id;
        this.code = code;
        this.libelle = libelle;
        this.icon = icon;
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

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }
}
