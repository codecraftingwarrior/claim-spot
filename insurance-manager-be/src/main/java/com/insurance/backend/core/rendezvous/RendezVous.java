package com.insurance.backend.core.rendezvous;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.insurance.backend.core.accident.Accident;
import com.insurance.backend.core.audit.Auditable;
import com.insurance.backend.core.creneau.Creneau;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "rendez_vous")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id",
        scope = RendezVous.class
)
public class RendezVous extends Auditable<String> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;

    @OneToOne
    @JoinColumn(name = "accident", nullable = false, referencedColumnName = "id")
    private Accident accident;

    @ManyToOne
    @JoinColumn(name = "creneau", nullable = false)
    private Creneau creneau;

    public RendezVous() {
    }

    public RendezVous(String description, Accident accident, Creneau creneau) {

        this.description = description;
        this.accident = accident;
        this.creneau = creneau;
    }

    public Long getId() {
        return id;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Accident getAccident() {
        return accident;
    }

    public void setAccident(Accident accident) {
        this.accident = accident;
    }

    public Creneau getCreneau() {
        return creneau;
    }

    public void setCreneau(Creneau creneau) {
        this.creneau = creneau;
    }
}
