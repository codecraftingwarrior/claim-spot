package com.insurance.backend.core.vehicule;

import com.google.common.base.Strings;
import com.insurance.backend.core.auth.ApplicationUser;
import com.insurance.backend.core.auth.ApplicationUserService;
import com.insurance.backend.core.exception.NotAllowedOperationException;
import com.insurance.backend.core.exception.OperationFailedException;
import com.insurance.backend.core.exception.ResourceAlreadyExistsException;
import com.insurance.backend.core.exception.ResourceNotFoundException;
import com.insurance.backend.core.role.Role;
import com.insurance.backend.core.role.RoleService;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

@RestController
@RequestMapping("/api/vehicule")
public class VehiculeController {
    private final String IMAGE_UPLOAD_DIRECTORY = "src/main/resources/uploads/images/vehicules";
    private final String REAL_IMAGE_PATH = "static/images/vehicules";
    private final VehiculeService vehiculeService;
    private final ApplicationUserService applicationUserService;
    public final RoleService roleService;

    @Autowired
    public VehiculeController(VehiculeService vehiculeService, ApplicationUserService applicationUserService, RoleService roleService) {
        this.vehiculeService = vehiculeService;
        this.applicationUserService = applicationUserService;
        this.roleService = roleService;
    }

    @GetMapping(path = "")
    @PreAuthorize("hasAuthority('vehicule:list')")
    public ResponseEntity<List<Vehicule>> findAll() throws ResourceNotFoundException {
        ApplicationUser currentUser = applicationUserService.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        Role superAdminRole = roleService.findByCode("SA");
        List<Vehicule> vehicules = new ArrayList<>();
        if(currentUser.getRoles().contains(superAdminRole)) {
            vehicules = vehiculeService.findAll();
        } else {
            vehicules = vehiculeService.findByApplicationUser(currentUser);
        }
        return ResponseEntity
                .ok(vehicules);
    }

    @GetMapping(path = "{id}")
    @PreAuthorize("hasAuthority('vehicule:view')")
    public ResponseEntity<Vehicule> find(@PathVariable("id") Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(
            vehiculeService
                        .find(id)
        );
    }

    @PostMapping(path = "")
    @PreAuthorize("hasAuthority('vehicule:write')")
    public ResponseEntity<Vehicule> store(@RequestBody Vehicule vehicule, HttpServletRequest request) throws ResourceAlreadyExistsException, NotAllowedOperationException, IOException, OperationFailedException {
        String base64EncodedImage = vehicule.getImgUrl();

        StringBuffer newFilename = new StringBuffer();
        newFilename.append(UUID.randomUUID().toString().replaceAll("-", ""));
        if (Strings.isNullOrEmpty(base64EncodedImage))
            throw new NotAllowedOperationException("Vous devez obligatoirement selectionner une image");
        if (base64EncodedImage.contains("data:image/png;")) {
            base64EncodedImage = base64EncodedImage.replace("data:image/png;base64,", "");
            newFilename.append(".png");
        } else if (base64EncodedImage.contains("data:image/jpeg;")) {
            base64EncodedImage = base64EncodedImage.replace("data:image/jpeg;base64,", "");
            newFilename.append(".jpeg");
        } else if (base64EncodedImage.contains("data:image/jpg;")) {
            base64EncodedImage = base64EncodedImage.replace("data:image/jpg;base64,", "");
            newFilename.append(".jpg");
        } else {
            throw new NotAllowedOperationException("Veuillez choisir une image de type jpeg ou png");
        }

        if (!Strings.isNullOrEmpty(vehicule.getImgFilename())) {
            String path = System.getProperty("user.dir") + File.separator + IMAGE_UPLOAD_DIRECTORY + File.separator + vehicule.getImgFilename();
            Files.delete(Paths.get(path));
        }

        String targetPath = System.getProperty("user.dir") + File.separator + IMAGE_UPLOAD_DIRECTORY;
        File file = new File(targetPath, newFilename.toString());
        byte[] fileBytes = Base64.getDecoder().decode(base64EncodedImage);
        try {
            FileUtils.writeByteArrayToFile(file, fileBytes);
        } catch (IOException e) {
            throw new OperationFailedException("Une erreur est survenu lors de la sauvegarde du fichier");
        }
        vehicule.setImgFilename(newFilename.toString());
        vehicule.setImgUrl(String.format(
                "%s://%s/%s/%s",
                request.getScheme(),
                request.getHeader("host"),
                REAL_IMAGE_PATH,
                newFilename.toString()
        ));
        return ResponseEntity.ok(vehiculeService.store(vehicule));
    }


    @PutMapping(path = "{id}")
    @PreAuthorize("hasAuthority('vehicule:write')")
    public ResponseEntity<Vehicule> updated(@PathVariable("id") Long id, @RequestBody Vehicule vehicule, HttpServletRequest request, @RequestParam("image") Boolean changeImage) throws ResourceNotFoundException, NotAllowedOperationException, OperationFailedException, IOException {

        if(changeImage) {
            String base64EncodedImage = vehicule.getImgUrl();
            StringBuffer newFilename = new StringBuffer();
            newFilename.append(UUID.randomUUID().toString().replaceAll("-", ""));
            if (Strings.isNullOrEmpty(base64EncodedImage))
                throw new NotAllowedOperationException("Vous devez obligatoirement selectionner une image");
            if (base64EncodedImage.contains("data:image/png;")) {
                base64EncodedImage = base64EncodedImage.replace("data:image/png;base64,", "");
                newFilename.append(".png");
            } else if (base64EncodedImage.contains("data:image/jpeg;")) {
                base64EncodedImage = base64EncodedImage.replace("data:image/jpeg;base64,", "");
                newFilename.append(".jpeg");
            } else if (base64EncodedImage.contains("data:image/jpg;")) {
                base64EncodedImage = base64EncodedImage.replace("data:image/jpg;base64,", "");
                newFilename.append(".jpg");
            } else {
                throw new NotAllowedOperationException("Veuillez choisir une image de type jpeg ou png");
            }

            if (!Strings.isNullOrEmpty(vehicule.getImgFilename())) {
                String path = System.getProperty("user.dir") + File.separator + IMAGE_UPLOAD_DIRECTORY + File.separator + vehicule.getImgFilename();
                Files.delete(Paths.get(path));
            }

            String targetPath = System.getProperty("user.dir") + File.separator + IMAGE_UPLOAD_DIRECTORY;
            File file = new File(targetPath, newFilename.toString());
            byte[] fileBytes = Base64.getDecoder().decode(base64EncodedImage);
            try {
                FileUtils.writeByteArrayToFile(file, fileBytes);
            } catch (IOException e) {
                throw new OperationFailedException("Une erreur est survenu lors de la sauvegarde du fichier");
            }
            vehicule.setImgFilename(newFilename.toString());
            vehicule.setImgUrl(String.format(
                    "%s://%s/%s/%s",
                    request.getScheme(),
                    request.getHeader("host"),
                    REAL_IMAGE_PATH,
                    newFilename.toString()
            ));
        }

        return ResponseEntity.ok(
                    vehiculeService.update(id, vehicule)
        );
    }

    @DeleteMapping(path = "{id}")
    @PreAuthorize("hasAuthority('vehicule:delete')")
    public Map<String, Boolean> destroy(@PathVariable("id") Long id) throws Exception {
        vehiculeService.destroyWithImage(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
