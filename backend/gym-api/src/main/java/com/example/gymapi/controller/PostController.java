package com.example.gymapi.controller;

import com.example.gymapi.DTO.PostDto;
import com.example.gymapi.model.Post;
import com.example.gymapi.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@AllArgsConstructor
@CrossOrigin("http://localhost:3000")
public class PostController {

    private PostService postService;

//    @PostMapping("/posts")
//    public Post createPost(@RequestBody Post post){
//        return postService.create(post);
//    }

    @PostMapping("/posts")
 public Post createPost(@ModelAttribute PostDto postDto) throws IOException {
        return postService.create(postDto);
    }



}
