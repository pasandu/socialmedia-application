package com.example.gymapi.service.impl;

import com.example.gymapi.DTO.PostDto;
import com.example.gymapi.model.Post;
import com.example.gymapi.repository.PostRepository;
import com.example.gymapi.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@AllArgsConstructor
public class PostServiceImpl implements PostService {

    private PostRepository postRepository;

    @Override
    public Post create(PostDto postDto) throws IOException {
        Post post1 = new Post();

        post1.setDescription(postDto.getPostDescription());
        byte[] imageContent = postDto.getImage().getBytes();
        post1.setImage1(imageContent);

       return postRepository.save(post1);
//        return postRepository.save(post);
    }
}
