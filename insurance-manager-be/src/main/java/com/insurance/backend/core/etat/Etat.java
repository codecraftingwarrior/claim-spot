package com.insurance.backend.core.etat;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;

@Entity
@Table(name = "etat")
public class Etat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "code")
    private String code;
    private String libelle;

    @OneToOne
    @JoinColumn(name = "etat_suivant", referencedColumnName = "id")
    private Etat etatSuivant;

    public Etat() {}

    public Etat(String code, String libelle, Etat etatSuivant) {
        this.code = code;
        this.libelle = libelle;
        this.etatSuivant = etatSuivant;
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

    public Etat getEtatSuivant() {
        return etatSuivant;
    }

    public void setEtatSuivant(Etat etatSuivant) {
        this.etatSuivant = etatSuivant;
    }
}
