package com.insurance.backend.core.auth;

import com.insurance.backend.core.exception.ResourceAlreadyExistsException;
import com.insurance.backend.core.exception.ResourceNotFoundException;
import com.insurance.backend.core.general.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class ApplicationUserService extends BaseService<ApplicationUserRepository, ApplicationUser> implements UserDetailsService {

    private final ApplicationUserRepository applicationUserRepository;

    @Autowired
    public ApplicationUserService(ApplicationUserRepository applicationUserRepository) {
        super(applicationUserRepository, "User");
        this.applicationUserRepository = applicationUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return this
                .applicationUserRepository
                .findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("Utilisateur %s inexistant", username)));
    }

    @Override
    public ApplicationUser update(Long idForUpdate, ApplicationUser entity) throws ResourceNotFoundException {
        ApplicationUser userToUpdate = find(idForUpdate);
        userToUpdate.setPrenom(entity.getPrenom());
        userToUpdate.setNom(entity.getNom());
        userToUpdate.setFonction(entity.getFonction());
        userToUpdate.setTelephone(entity.getTelephone());
        userToUpdate.setAdresse(entity.getAdresse());
        userToUpdate.setGenre(entity.getGenre());
        userToUpdate.setImageFilename(entity.getImageFilename());
        userToUpdate.setImageFilepath(entity.getImageFilepath());
        userToUpdate.setAccountNonExpired(entity.isAccountNonExpired());
        userToUpdate.setAccountNonLocked(entity.isAccountNonLocked());
        userToUpdate.setCredentialsNonExpired(entity.isCredentialsNonExpired());
        userToUpdate.setEnabled(entity.isEnabled());
        userToUpdate.setPassword(entity.getPassword());
        return applicationUserRepository.save(userToUpdate);
    }

    public ApplicationUser findByUsername(String username) throws ResourceNotFoundException {
        return this
                .applicationUserRepository
                .selectByUsername(username);
    }
}
