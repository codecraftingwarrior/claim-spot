package com.insurance.backend.core.photo;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.insurance.backend.core.accident.Accident;
import com.insurance.backend.core.audit.Auditable;

import javax.persistence.*;

@Entity
@Table(name = "photo")
//@JsonIdentityInfo(
//        generator = ObjectIdGenerators.PropertyGenerator.class,
//        property = "id",
//        scope = Photo.class
//)
public class Photo extends Auditable<String> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String filename;
    private String url;
    private Boolean isDetail;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "accident", nullable = false)
    @JsonBackReference
    private Accident accident;

    public Photo() {
    }

    public Photo(String filename, String url, Boolean isDetail, Accident accident) {
        this.filename = filename;
        this.url = url;
        this.isDetail = isDetail;
        this.accident = accident;
    }

    public Long getId() {
        return id;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Boolean getIsDetail() {
        return isDetail;
    }

    public void setIsDetail(Boolean detail) {
        isDetail = detail;
    }

    public Accident getAccident() {
        return accident;
    }

    public void setAccident(Accident accident) {
        this.accident = accident;
    }
}
