package com.insurance.backend.core.auth;

import com.google.common.base.Strings;
import com.google.common.collect.Maps;
import com.insurance.backend.common.CommonController;
import com.insurance.backend.core.exception.NotAllowedOperationException;
import com.insurance.backend.core.exception.OperationFailedException;
import com.insurance.backend.core.exception.ResourceAlreadyExistsException;
import com.insurance.backend.core.exception.ResourceNotFoundException;
import com.insurance.backend.core.role.RoleService;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.context.IContext;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

@RestController
@RequestMapping(path = "/api/user")
public class ApplicationUserController {
    private final String IMAGE_UPLOAD_DIRECTORY = "src/main/resources/uploads/images/profiles";
    private final String REAL_IMAGE_PATH = "static/images/profiles";
    private final ApplicationUserService applicationUserService;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;


    @Autowired
    public ApplicationUserController(ApplicationUserService applicationUserService, RoleService roleService, PasswordEncoder passwordEncoder, JavaMailSender javaMailSender, TemplateEngine templateEngine) {
        this.applicationUserService = applicationUserService;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
    }

    @GetMapping(path = "")
    public ResponseEntity<List<ApplicationUser>> findAll() {
        List<ApplicationUser> users = applicationUserService.findAll();
        return ResponseEntity
                .ok(users);
    }

    @GetMapping(path = "{id}")
    public ResponseEntity<ApplicationUser> find(@PathVariable("id") Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(
                applicationUserService
                        .find(id)
        );
    }

    @PostMapping(path = "")
    public ResponseEntity<ApplicationUser> store(@RequestBody ApplicationUser user) throws ResourceNotFoundException, ResourceAlreadyExistsException, MessagingException {
        ApplicationUser applicationUser = applicationUserService.findByUsername(user.getUsername());
        if (applicationUser != null)
            throw new ResourceAlreadyExistsException(String.format("Le nom d'utilisateur %s est déjà utilisé", user.getUsername()));

        String plainPassword = user.getPassword();
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setEnabled(true);
        user.setAccountNonExpired(true);
        user.setAccountNonLocked(true);
        user.setCredentialsNonExpired(true);

        ApplicationUser createdUser = applicationUserService.store(user);

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom("elahmadou.gueye@univ-thies.sn");
        helper.setTo(createdUser.getUsername());
        helper.setSubject("CIA: Identifiants de connexion");

        Context context = new Context();
        context.setVariable("username", createdUser.getUsername());
        context.setVariable("password", plainPassword);
        context.setVariable("prenom", createdUser.getPrenom());
        context.setVariable("nom", createdUser.getNom());
        context.setVariable("websiteLoginUrl", CommonController.websiteLoginUrl);
        String html = templateEngine.process("register-mail", context);
        helper.setText(html, true);

//        message.setContent(String.format("<p>Bonjour&nbsp;<strong>%S</strong>, vous poss&eacute;dez d&eacute;sormais un compte sur notre plateforme vos identifiants de connexion sont les suivant :</p>\n" +
//                "<ul>\n" +
//                "<li>nom d'utilisateur : <strong>%s</strong></li>\n" +
//                "<li>mot de passe : <strong>%s</strong></li>\n" +
//                "</ul>\n" +
//                " <p>\n" +
//                "Vous pouvez vous connecter depuis : http://localhost:4200/auth/login.\n" +
//                "</p>", createdUser.getPrenom() + " " + createdUser.getNom(), createdUser.getUsername(), plainPassword), "text/html"
//        );
        javaMailSender.send(message);

        return ResponseEntity
                .ok(createdUser);
    }

    @PutMapping(path = "{id}")
    public ResponseEntity<ApplicationUser> update(@PathVariable("id") Long id, @RequestBody ApplicationUser applicationUser) throws ResourceNotFoundException {
        return ResponseEntity.ok(
                applicationUserService.update(id, applicationUser)
        );
    }

    @PutMapping(path = "{id}/update-password")
    public ResponseEntity<ApplicationUser> updatePassword(@PathVariable("id") Long id, @RequestBody ApplicationUser applicationUser) throws ResourceNotFoundException, NotAllowedOperationException {
        if (!passwordEncoder.matches(applicationUser.getPlainPassword(), applicationUser.getPassword()))
            throw new NotAllowedOperationException("Le mot de passe courant indiqué est invalide.");
        applicationUser.setPassword(passwordEncoder.encode(applicationUser.getNewPassword()));
        return ResponseEntity.ok(
                applicationUserService.update(id, applicationUser)
        );
    }

    @PutMapping(path = "{id}/change-image")
    public ResponseEntity<ApplicationUser> changeImage(@PathVariable("id") Long id, @RequestBody ApplicationUser applicationUser, HttpServletRequest request) throws Exception {
        String base64EncodedImage = applicationUser.getImageFilepath();

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

        if (!Strings.isNullOrEmpty(applicationUser.getImageFilename())) {
            String path = System.getProperty("user.dir") + File.separator + IMAGE_UPLOAD_DIRECTORY + File.separator + applicationUser.getImageFilename();
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
        applicationUser.setImageFilename(newFilename.toString());
        applicationUser.setImageFilepath(String.format(
                "%s://%s/%s/%s",
                request.getScheme(),
                request.getHeader("host"),
                REAL_IMAGE_PATH,
                newFilename.toString()
        ));

        return ResponseEntity.ok(applicationUserService.update(id, applicationUser));

    }


    @DeleteMapping(path = "{id}")
    public Map<String, Boolean> destroy(@PathVariable("id") Long id) throws ResourceNotFoundException, NotAllowedOperationException {
        if (applicationUserService.find(id).getUsername().equals(SecurityContextHolder.getContext().getAuthentication().getName())) {
            throw new NotAllowedOperationException("Impossible de supprimer ce compte car vous êtes en ligne");
        }
        applicationUserService.destroy(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    @GetMapping(path = "current")
    public ResponseEntity<Object> getCurrentUser() throws ResourceNotFoundException {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        ApplicationUser currentUser = applicationUserService.findByUsername(username);
        currentUser.setGrantedAuthorities(currentUser.getAuthorities());
        return ResponseEntity.ok(currentUser);
    }

}
