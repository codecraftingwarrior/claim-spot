package com.insurance.backend.core.photo;

import com.insurance.backend.common.Uploader;
import com.insurance.backend.core.accident.Accident;
import com.insurance.backend.core.accident.AccidentService;
import com.insurance.backend.core.etat.Etat;
import com.insurance.backend.core.etat.EtatService;
import com.insurance.backend.core.etat.Workflow;
import com.insurance.backend.core.exception.NotAllowedOperationException;
import com.insurance.backend.core.exception.OperationFailedException;
import com.insurance.backend.core.exception.ResourceAlreadyExistsException;
import com.insurance.backend.core.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/photo")
public class PhotoController {
    private final String IMAGE_UPLOAD_DIRECTORY = "src/main/resources/uploads/images/photos";
    private final String REAL_IMAGE_PATH = "static/images/photos";
    private final PhotoService photoService;

    @Autowired
    public PhotoController(PhotoService photoService) {
        this.photoService = photoService;

    }

    @GetMapping(path = "")
    @PreAuthorize("hasAuthority('photo:list')")
    public ResponseEntity<List<Photo>> findAll() {
        List<Photo> photos = photoService.findAll();
        return ResponseEntity
                .ok(photos);
    }

    @GetMapping(path = "{id}")
    @PreAuthorize("hasAuthority('photo:view')")
    public ResponseEntity<Photo> find(@PathVariable("id") Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(
            photoService
                        .find(id)
        );
    }

    @PostMapping(path = "")
    @PreAuthorize("hasAuthority('photo:write')")
    public ResponseEntity<Photo> store(@RequestBody Photo photo) throws ResourceAlreadyExistsException {
        return ResponseEntity.ok(photoService.store(photo));
    }

    @PostMapping(path = "store-multiple")
    @PreAuthorize("hasAuthority('photo:write')")
    public ResponseEntity<List<Photo>> storeMultiple(@RequestBody List<Photo> photos, HttpServletRequest request, HttpServletResponse response) throws NotAllowedOperationException, OperationFailedException {
        for(Photo photo: photos) {
            Map<String, String> fileData = Uploader.upload(photo.getUrl(), IMAGE_UPLOAD_DIRECTORY, request.getScheme(), request.getHeader("host"), REAL_IMAGE_PATH);
            photo.setFilename(fileData.get("newFilename"));
            photo.setUrl(fileData.get("path"));
        }
        return ResponseEntity.ok(photoService.storeMultiple(photos));
    }


    @PutMapping(path = "{id}")
    @PreAuthorize("hasAuthority('photo:write')")
    public ResponseEntity<Photo> updated(@PathVariable("id") Long id, @RequestBody Photo photo) throws ResourceNotFoundException {
        return ResponseEntity.ok(
                    photoService.update(id, photo)
        );
    }

    @DeleteMapping(path = "{id}")
    @PreAuthorize("hasAuthority('photo:delete')")
    public Map<String, Boolean> destroy(@PathVariable("id") Long id) throws ResourceNotFoundException, IOException {
        photoService.destroyWithImage(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
