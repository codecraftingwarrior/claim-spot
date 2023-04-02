package com.insurance.backend.core.creneau;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.insurance.backend.core.auth.ApplicationUser;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "creneau")
public class Creneau {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date date;
    private String heure;
    private Boolean choosen;

    public Creneau() {}

    public Creneau(Date date, String heure, Boolean choosen) {
        this.date = date;
        this.heure = heure;
        this.choosen = choosen;
    }

    public Long getId() {
        return id;
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

    public Boolean getChoosen() {
        return choosen;
    }

    public void setChoosen(Boolean choosen) {
        this.choosen = choosen;
    }
}
