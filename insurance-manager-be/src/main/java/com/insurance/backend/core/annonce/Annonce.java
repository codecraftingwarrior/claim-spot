package com.insurance.backend.core.annonce;

import com.fasterxml.jackson.annotation.*;
import com.insurance.backend.core.vehicule.Vehicule;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "annonce")
@EntityListeners(AuditingEntityListener.class)
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id",
        scope = Annonce.class
)
public class Annonce {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String libelle;
    private Float prix;
    private String type;
    private Boolean validated;
    private Boolean disabled;
    @CreatedDate
    @Column(name = "created_at")
    private Date createdAt;

    @OneToOne(mappedBy = "annonce")
    private Vehicule vehicule;


    public Annonce() {
    }

    public Annonce(String libelle, Float prix, String type, Boolean validated, Boolean disabled, Date createdAt, Vehicule vehicule) {
        this.libelle = libelle;
        this.prix = prix;
        this.type = type;
        this.validated = validated;
        this.disabled = disabled;
        this.createdAt = createdAt;
        this.vehicule = vehicule;
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

    public Float getPrix() {
        return prix;
    }

    public void setPrix(Float prix) {
        this.prix = prix;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Boolean getValidated() {
        return validated;
    }

    public void setValidated(Boolean validated) {
        this.validated = validated;
    }

    public Boolean getDisabled() {
        return disabled;
    }

    public void setDisabled(Boolean disabled) {
        this.disabled = disabled;
    }

    public Vehicule getVehicule() {
        return vehicule;
    }

    public void setVehicule(Vehicule vehicule) {
        this.vehicule = vehicule;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
