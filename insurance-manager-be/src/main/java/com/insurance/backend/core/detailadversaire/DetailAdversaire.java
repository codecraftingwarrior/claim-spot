package com.insurance.backend.core.detailadversaire;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.insurance.backend.core.accident.Accident;
import com.insurance.backend.core.categorievehicule.CategorieVehicule;

import javax.persistence.*;

@Entity
@Table(name = "detail_adversaire")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id",
        scope = DetailAdversaire.class
)
public class DetailAdversaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = true)
    private String prenom;
    @Column(nullable = true)
    private String nom;
    @Column(nullable = true)
    private String genre;
    private String marqueVehicule;
    private String modeleVehicule;
    private String immatriculation;
    private String description;

    @OneToOne(mappedBy = "detailAdversaire", cascade = CascadeType.ALL, orphanRemoval = true)
    private Accident accident;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "categorie", nullable = false)
    private CategorieVehicule categorieVehicule;

    public DetailAdversaire() {}

    public DetailAdversaire(String prenom, String nom, String genre, String marqueVehicule, String modeleVehicule, String immatriculation, String description, Accident accident, CategorieVehicule categorieVehicule) {
        this.prenom = prenom;
        this.nom = nom;
        this.genre = genre;
        this.marqueVehicule = marqueVehicule;
        this.modeleVehicule = modeleVehicule;
        this.immatriculation = immatriculation;
        this.description = description;
        this.accident = accident;
        this.categorieVehicule = categorieVehicule;
    }

    public Long getId() {
        return id;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getMarqueVehicule() {
        return marqueVehicule;
    }

    public void setMarqueVehicule(String marqueVehicule) {
        this.marqueVehicule = marqueVehicule;
    }

    public String getModeleVehicule() {
        return modeleVehicule;
    }

    public void setModeleVehicule(String modeleVehicule) {
        this.modeleVehicule = modeleVehicule;
    }

    public String getImmatriculation() {
        return immatriculation;
    }

    public void setImmatriculation(String immatriculation) {
        this.immatriculation = immatriculation;
    }

    public Accident getAccident() {
        return accident;
    }

    public void setAccident(Accident accident) {
        this.accident = accident;
    }

    public CategorieVehicule getCategorieVehicule() {
        return categorieVehicule;
    }

    public void setCategorieVehicule(CategorieVehicule categorieVehicule) {
        this.categorieVehicule = categorieVehicule;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
