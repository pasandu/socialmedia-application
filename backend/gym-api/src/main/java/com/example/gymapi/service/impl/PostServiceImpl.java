package com.example.gymapi.service.impl;

import com.example.gymapi.DTO.PostDto;
import com.example.gymapi.model.Post;
import com.example.gymapi.repository.PostRepository;
import com.example.gymapi.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    @Override
    public String create(PostDto postDto) {
        Post post = new Post();
        post.setDescription(postDto.getPostDescription());

        MultipartFile image = postDto.getImage();
        if (image != null && !image.isEmpty()) {
            try {
                post.setImageData(image.getBytes());
            } catch (IOException e) {
                // Handle the exception
            }
        }

        postRepository.save(post);
        return "Post created";
    }

    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public Post getPostById(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        return optionalPost.orElse(null);
    }

    @Override
    public void deletePost(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isPresent()) {
            postRepository.delete(optionalPost.get());
        } else {
            throw new IllegalArgumentException("Post not found with id: " + postId);
        }
    }

    @Override
    public void updatePost(Long postId, PostDto postDto) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            post.setDescription(postDto.getPostDescription());
            postRepository.save(post);
        } else {
            throw new IllegalArgumentException("Post not found with id: " + postId);
        }
    }
}