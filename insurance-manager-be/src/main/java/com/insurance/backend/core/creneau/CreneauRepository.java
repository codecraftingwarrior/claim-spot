package com.insurance.backend.core.creneau;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface CreneauRepository extends JpaRepository<Creneau, Long> {
    List<Creneau> findByDate(Date date);
}
