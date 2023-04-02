package com.insurance.backend.core.accident;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.insurance.backend.core.auth.ApplicationUser;
import com.insurance.backend.core.detailadversaire.DetailAdversaire;
import com.insurance.backend.core.etat.Etat;
import com.insurance.backend.core.photo.Photo;
import com.insurance.backend.core.rendezvous.RendezVous;
import com.insurance.backend.core.vehicule.Vehicule;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "accident")
@EntityListeners(AuditingEntityListener.class)
//@JsonIdentityInfo(
//        generator = ObjectIdGenerators.PropertyGenerator.class,
//        property = "id",
//        scope = Accident.class
//)
public class Accident {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;
    private Date date;
    private String heure;
    private String lieu;
    private String details;
    private Boolean changed;
    @CreatedDate
    private Date createdAt;
    private Float montantRemboursement;
    private Float motantReparartion;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user", nullable = false)
    private ApplicationUser applicationUser;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "vehicule", nullable = false)
    private Vehicule vehicule;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "etat", nullable = false)
    private Etat etat;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "detail_adversaire", referencedColumnName = "id")
    private DetailAdversaire detailAdversaire;

    @OneToOne(mappedBy = "accident")
    private RendezVous rendezVous;

    @OneToMany(mappedBy = "accident", fetch = FetchType.EAGER)
    private Set<Photo> photos;

    public Accident() {
    }

    public Accident(
            String code,
            Date date,
            String heure,
            String lieu,
            String details,
            Boolean changed,
            Date createdAt,
            Float montantRemboursement,
            Float motantReparartion,
            ApplicationUser applicationUser,
            Vehicule vehicule,
            Etat etat,
            DetailAdversaire detailAdversaire,
            RendezVous rendezVous,
            Set<Photo> photos) {
        this.code = code;
        this.date = date;
        this.heure = heure;
        this.lieu = lieu;
        this.details = details;
        this.changed = changed;
        this.createdAt = createdAt;
        this.montantRemboursement = montantRemboursement;
        this.motantReparartion = motantReparartion;
        this.applicationUser = applicationUser;
        this.vehicule = vehicule;
        this.etat = etat;
        this.detailAdversaire = detailAdversaire;
        this.rendezVous = rendezVous;
        this.photos = photos;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getHeure() {
        return heure;
    }

    public void setHeure(String heure) {
        this.heure = heure;
    }

    public String getLieu() {
        return lieu;
    }

    public void setLieu(String lieu) {
        this.lieu = lieu;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public Boolean getChanged() {
        return changed;
    }

    public void setChanged(Boolean changed) {
        this.changed = changed;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Float getMontantRemboursement() {
        return montantRemboursement;
    }

    public void setMontantRemboursement(Float montantRemboursement) {
        this.montantRemboursement = montantRemboursement;
    }

    public Float getMotantReparartion() {
        return motantReparartion;
    }

    public void setMotantReparartion(Float motantReparartion) {
        this.motantReparartion = motantReparartion;
    }

    public ApplicationUser getApplicationUser() {
        return applicationUser;
    }

    public void setApplicationUser(ApplicationUser applicationUser) {
        this.applicationUser = applicationUser;
    }

    public Vehicule getVehicule() {
        return vehicule;
    }

    public void setVehicule(Vehicule vehicule) {
        this.vehicule = vehicule;
    }

    public Etat getEtat() {
        return etat;
    }

    public void setEtat(Etat etat) {
        this.etat = etat;
    }

    public DetailAdversaire getDetailAdversaire() {
        return detailAdversaire;
    }

    public void setDetailAdversaire(DetailAdversaire detailAdversaire) {
        this.detailAdversaire = detailAdversaire;
    }

    public RendezVous getRendezVous() {
        return rendezVous;
    }

    public void setRendezVous(RendezVous rendezVous) {
        this.rendezVous = rendezVous;
    }

    public Set<Photo> getPhotos() {
        return photos;
    }

    public void setPhotos(Set<Photo> photos) {
        this.photos = photos;
    }
}
