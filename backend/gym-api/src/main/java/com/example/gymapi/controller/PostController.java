package com.example.gymapi.controller;

import com.example.gymapi.DTO.PostDto;
import com.example.gymapi.model.Post;
import com.example.gymapi.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin("http://localhost:3000")
public class PostController {

    private final PostService postService;

    @PostMapping("/posts")
    public ResponseEntity<String> createPost(
            @RequestPart("description") String description,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        try {
            PostDto postDto = new PostDto(description, image);
            String response = postService.create(postDto);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    @GetMapping("/posts")
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/posts/{postId}/image")
    public ResponseEntity<byte[]> getPostImage(@PathVariable Long postId) {
        Post post = postService.getPostById(postId);

        if (post == null || post.getImageData() == null) {
            return ResponseEntity.notFound().build();
        }

        byte[] imageData = post.getImageData();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);

        return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
    }

    @DeleteMapping("/posts/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable Long postId) {
        try {
            postService.deletePost(postId);
            return ResponseEntity.ok("Post deleted successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    @PutMapping("/posts/{postId}")
    public ResponseEntity<String> updatePost(
            @PathVariable Long postId,
            @RequestPart("description") String description
    ) {
        try {
            PostDto postDto = new PostDto(description, null);
            postService.updatePost(postId, postDto);
            return ResponseEntity.ok("Post updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }
}