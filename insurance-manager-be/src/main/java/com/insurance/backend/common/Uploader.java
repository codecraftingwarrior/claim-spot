package com.insurance.backend.common;

import com.google.common.base.Strings;
import com.insurance.backend.core.exception.NotAllowedOperationException;
import com.insurance.backend.core.exception.OperationFailedException;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class Uploader {

    public static Map<String, String> upload(String base64EncodedImage, String imageUploadDirectory, String scheme, String host, String realImagePath) throws NotAllowedOperationException, OperationFailedException {

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

//        if (!Strings.isNullOrEmpty(vehicule.getImgFilename())) {
//            String path = System.getProperty("user.dir") + File.separator + IMAGE_UPLOAD_DIRECTORY + File.separator + vehicule.getImgFilename();
//            Files.delete(Paths.get(path));
//        }

        String targetPath = System.getProperty("user.dir") + File.separator + imageUploadDirectory;
        File file = new File(targetPath, newFilename.toString());
        byte[] fileBytes = Base64.getDecoder().decode(base64EncodedImage);
        try {
            FileUtils.writeByteArrayToFile(file, fileBytes);
        } catch (IOException e) {
            throw new OperationFailedException("Une erreur est survenu lors de la sauvegarde du fichier");
        }
        Map<String, String> fileData = new HashMap<>();
        fileData.put("newFilename", newFilename.toString());
        fileData.put("path", String.format(
                "%s://%s/%s/%s",
                scheme,
                host,
                realImagePath,
                newFilename.toString()
        ));

        return fileData;
    }
}
