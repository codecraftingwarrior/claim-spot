package com.insurance.backend.core.auth;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.insurance.backend.core.formule.Formule;
import com.insurance.backend.core.role.Role;
import com.insurance.backend.core.audit.Auditable;
import com.insurance.backend.core.vehicule.Vehicule;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "application_user")
//@JsonIdentityInfo(
//        generator = ObjectIdGenerators.PropertyGenerator.class,
//        property = "id",
//        scope = ApplicationUser.class
//)
public class ApplicationUser extends Auditable<String> implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Transient
    private Set<GrantedAuthority> authorities;
    private String password;
    private String username;
    private String prenom;
    private String nom;
    private String telephone;
    private String adresse;
    private String fonction;
    private String genre;
    private String imageFilepath;
    private String imageFilename;
    @Basic
    private Boolean isAccountNonExpired;
    @Basic
    private Boolean isAccountNonLocked;
    @Basic
    private Boolean isCredentialsNonExpired;
    @Basic
    private Boolean isEnabled;
    @Transient
    private String plainPassword;
    @Transient
    private String newPassword;
    @Transient
    private Collection<? extends GrantedAuthority> grantedAuthorities;

    @ManyToOne
    @JoinColumn(name = "formule", nullable = true)
    private Formule formule;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "role_application_user",
            joinColumns = @JoinColumn(name = "application_user"),
            inverseJoinColumns = @JoinColumn(name = "role")
    )
    private Set<Role> roles = new HashSet<>();

    @JsonBackReference
    @OneToMany(mappedBy = "applicationUser", fetch = FetchType.EAGER)
    private Set<Vehicule> vehicules;


    public ApplicationUser(
            String username,
            String password,
            Set<GrantedAuthority> authorities,
            String prenom,
            String nom,
            String telephone,
            String adresse,
            String fonction,
            String genre,
            String imageFilepath, String imageFilename, Boolean isAccountNonExpired,
            Boolean isAccountNonLocked,
            Boolean isCredentialsNonExpired,
            Boolean isEnabled,
            String plainPassword,
            String newPassword,
            Set<GrantedAuthority> grantedAuthorities,
            Formule formule, Set<Vehicule> vehicules) {
        this.authorities = authorities;
        this.password = password;
        this.username = username;
        this.imageFilepath = imageFilepath;
        this.imageFilename = imageFilename;
        this.isAccountNonExpired = isAccountNonExpired;
        this.isAccountNonLocked = isAccountNonLocked;
        this.isCredentialsNonExpired = isCredentialsNonExpired;
        this.isEnabled = isEnabled;
        this.prenom = prenom;
        this.nom = nom;
        this.telephone = telephone;
        this.adresse = adresse;
        this.fonction = fonction;
        this.genre = genre;
        this.plainPassword = plainPassword;
        this.newPassword = newPassword;
        this.grantedAuthorities = grantedAuthorities;
        this.formule = formule;
        this.vehicules = vehicules;
    }

    public ApplicationUser() {
    }

    public Long getId() {
        return id;
    }

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        for (Role role : getRoles()) {
            grantedAuthorities.addAll(role.getGrantedAuthorities());
        }
        return grantedAuthorities;
    }

    public void setAuthorities(Set<GrantedAuthority> authorities) {
        this.authorities = authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Collection<? extends GrantedAuthority> getGrantedAuthorities() {
        return grantedAuthorities;
    }

    public void setGrantedAuthorities(Collection<? extends GrantedAuthority> grantedAuthorities) {
        this.grantedAuthorities = grantedAuthorities;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return isAccountNonExpired;
    }

    public Boolean getAccountNonExpired() {
        return isAccountNonExpired;
    }

    public void setAccountNonExpired(Boolean accountNonExpired) {
        isAccountNonExpired = accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return isAccountNonLocked;
    }

    public Boolean getAccountNonLocked() {
        return isAccountNonLocked;
    }

    public void setAccountNonLocked(Boolean accountNonLocked) {
        isAccountNonLocked = accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return isCredentialsNonExpired;
    }

    public Boolean getCredentialsNonExpired() {
        return isCredentialsNonExpired;
    }

    public void setCredentialsNonExpired(Boolean credentialsNonExpired) {
        isCredentialsNonExpired = credentialsNonExpired;
    }

    @Basic
    @Override
    public boolean isEnabled() {
        return isEnabled;
    }

    public void setEnabled(Boolean enabled) {
        isEnabled = enabled;
    }

    public Boolean getEnabled() {
        return isEnabled;
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

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getFonction() {
        return fonction;
    }

    public void setFonction(String fonction) {
        this.fonction = fonction;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Formule getFormule() {
        return formule;
    }

    public void setFormule(Formule formule) {
        this.formule = formule;
    }

    public String getPlainPassword() {
        return plainPassword;
    }

    public void setPlainPassword(String plainPassword) {
        this.plainPassword = plainPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getImageFilepath() {
        return imageFilepath;
    }

    public void setImageFilepath(String imageFilepath) {
        this.imageFilepath = imageFilepath;
    }

    public String getImageFilename() {
        return imageFilename;
    }

    public void setImageFilename(String imageFilename) {
        this.imageFilename = imageFilename;
    }

    public Set<Vehicule> getVehicules() {
        return vehicules;
    }

    public void setVehicules(Set<Vehicule> vehicules) {
        this.vehicules = vehicules;
    }
}
