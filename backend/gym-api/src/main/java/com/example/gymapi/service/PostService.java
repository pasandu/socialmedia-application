package com.example.gymapi.service;

import com.example.gymapi.DTO.PostDto;
import com.example.gymapi.model.Post;

import java.util.List;

public interface PostService {
    String create(PostDto postDto);
    List<Post> getAllPosts();
    Post getPostById(Long postId);
    void deletePost(Long postId);
    void updatePost(Long postId, PostDto postDto);
}