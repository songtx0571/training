package com.hope.service;

import com.hope.domain.Chapter;
import com.hope.mapper.Chaptermapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChapterService {
    @Autowired
    private Chaptermapper chaptermapper;

    public List<Chapter> chapterlist(String CourseID) {
        return chaptermapper.chapterlist(CourseID);
    }
}
