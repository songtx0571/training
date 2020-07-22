package com.hope.mapper;

import com.hope.domain.Chapter;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface Chaptermapper {

    List<Chapter> chapterlist(String CourseID);
}
