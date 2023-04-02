package com.insurance.backend.core.formule;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FormuleRepository extends JpaRepository<Formule, Long> {
    Formule findByCode(String code);
}
