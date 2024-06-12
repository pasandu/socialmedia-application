package com.example.gymapi.service;

import com.example.gymapi.DTO.PostDto;
import com.example.gymapi.model.Post;

import java.io.IOException;

public interface PostService {

    Post create(PostDto postDto) throws IOException;
}
