package com.insurance.backend.core.etat;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EtatRepository extends JpaRepository<Etat, Long> {
    Etat findByCode(String code);
}
