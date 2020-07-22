package com.hope.mapper;

import com.hope.domain.Course;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
//@Mapper
public interface Coursemapper {
    List<Course> findAll();

}
