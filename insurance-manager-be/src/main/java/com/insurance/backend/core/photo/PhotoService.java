package com.insurance.backend.core.photo;

import com.google.common.base.Strings;
import com.insurance.backend.core.exception.ResourceNotFoundException;
import com.insurance.backend.core.general.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Service
public class PhotoService extends BaseService<PhotoRepository, Photo> {
    private final String IMAGE_UPLOAD_DIRECTORY = "src/main/resources/uploads/images/photos";
    private final String REAL_IMAGE_PATH = "static/images/photos";
    private final PhotoRepository repository;

    @Autowired
    protected PhotoService(PhotoRepository repository) {
        super(repository, "Photo");
        this.repository = repository;
    }

    @Override
    public Photo update(Long idForUpdate, Photo entity) throws ResourceNotFoundException {
        Photo photoToUpdate = find(idForUpdate);
        photoToUpdate.setFilename(entity.getFilename());
        photoToUpdate.setUrl(entity.getUrl());
        photoToUpdate.setIsDetail(entity.getIsDetail());
        photoToUpdate.setAccident(entity.getAccident());
        return repository.save(photoToUpdate);
    }

    public List<Photo> storeMultiple(List<Photo> photos) {
        return repository.saveAll(photos);
    }

    public void destroyWithImage(Long id) throws ResourceNotFoundException, IOException {
        Photo photo = find(id);
        if (!Strings.isNullOrEmpty(photo.getFilename())) {
            String path = System.getProperty("user.dir") + File.separator + IMAGE_UPLOAD_DIRECTORY + File.separator + photo.getFilename();
            if (Files.exists(Paths.get(path)))
                Files.delete(Paths.get(path));
        }
        repository.delete(photo);
    }
}
