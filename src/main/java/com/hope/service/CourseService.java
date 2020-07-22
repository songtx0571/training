package com.hope.service;

import com.hope.domain.Course;
import com.hope.mapper.Coursemapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    @Autowired
    private Coursemapper coursemapper;

    public List<Course> findAll() {
        return coursemapper.findAll();
    }
}
