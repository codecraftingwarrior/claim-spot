package com.insurance.backend.core.auth;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ApplicationUserRepository extends JpaRepository<ApplicationUser, Long> {
    Optional<ApplicationUser> findByUsername(String username);
    @Query(value = "SELECT u FROM ApplicationUser u WHERE u.username=:username")
    ApplicationUser selectByUsername(@Param(value = "username") String username);
}
