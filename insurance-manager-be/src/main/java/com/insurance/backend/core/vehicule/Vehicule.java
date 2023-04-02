package com.insurance.backend.core.vehicule;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.insurance.backend.core.annonce.Annonce;
import com.insurance.backend.core.auth.ApplicationUser;
import com.insurance.backend.core.categorievehicule.CategorieVehicule;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Table(name = "vehicule")

public class Vehicule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String immatriculation;
    private String marque;
    private String modele;
    private String imgFilename;
    private String imgUrl;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "application_user", nullable = false)
    private ApplicationUser applicationUser;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "categorie", nullable = false)
    private CategorieVehicule categorie;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "annonce", referencedColumnName = "id")
    private Annonce annonce;

    public Vehicule() {
    }

    public Vehicule(
            String immatriculation,
            String marque,
            String modele,
            String imgFilename,
            String imgUrl,
            ApplicationUser applicationUser,
            CategorieVehicule categorie,
            Annonce annonce) {
        this.immatriculation = immatriculation;
        this.marque = marque;
        this.modele = modele;
        this.imgFilename = imgFilename;
        this.imgUrl = imgUrl;
        this.applicationUser = applicationUser;
        this.categorie = categorie;
        this.annonce = annonce;
    }

    public Long getId() {
        return id;
    }

    public String getImmatriculation() {
        return immatriculation;
    }

    public void setImmatriculation(String immatriculation) {
        this.immatriculation = immatriculation;
    }

    public String getMarque() {
        return marque;
    }

    public void setMarque(String marque) {
        this.marque = marque;
    }

    public String getModele() {
        return modele;
    }

    public void setModele(String modele) {
        this.modele = modele;
    }

    public String getImgFilename() {
        return imgFilename;
    }

    public void setImgFilename(String imgFilename) {
        this.imgFilename = imgFilename;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public ApplicationUser getApplicationUser() {
        return applicationUser;
    }

    public void setApplicationUser(ApplicationUser applicationUser) {
        this.applicationUser = applicationUser;
    }

    public CategorieVehicule getCategorie() {
        return categorie;
    }

    public void setCategorie(CategorieVehicule categorie) {
        this.categorie = categorie;
    }

    public Annonce getAnnonce() {
        return annonce;
    }

    public void setAnnonce(Annonce annonce) {
        this.annonce = annonce;
    }
}
