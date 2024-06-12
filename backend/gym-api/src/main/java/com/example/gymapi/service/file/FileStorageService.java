package com.example.gymapi.service.file;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path rootLocation = Paths.get("src/main/resources/public/uploads");
    public String uploadFile(MultipartFile file) throws IOException {
        // Create the upload directory if it doesn't exist
        if (!Files.exists(rootLocation)) {
            Files.createDirectories(rootLocation);
        }

        // Generate a unique file name
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = rootLocation.resolve(fileName);

        // Save the file to the upload directory
        Files.copy(file.getInputStream(), filePath);

        // Return the relative path of the file
        return "/uploads/" + fileName;
    }
}