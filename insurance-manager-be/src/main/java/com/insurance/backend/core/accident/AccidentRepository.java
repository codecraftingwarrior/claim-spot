package com.insurance.backend.core.accident;

import com.insurance.backend.core.auth.ApplicationUser;
import com.insurance.backend.core.etat.Etat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccidentRepository extends JpaRepository<Accident, Long> {
    List<Accident> findByApplicationUser(ApplicationUser user);
    List<Accident> findByEtatOrderByCreatedAtDesc(Etat etat);
}
