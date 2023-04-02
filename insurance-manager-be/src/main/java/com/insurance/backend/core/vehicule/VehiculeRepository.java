package com.insurance.backend.core.vehicule;

import com.insurance.backend.core.auth.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VehiculeRepository extends JpaRepository<Vehicule, Long> {
    List<Vehicule> findByApplicationUser(ApplicationUser user);
}
