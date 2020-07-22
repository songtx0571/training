package com.hope.mapper;

import com.hope.domain.Behavior;
import com.hope.domain.Questionbank;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface Questionsmapper extends Commonmapper {
    List<Questionbank> findRand(@Param("CourseID") String CourseID, @Param("ChapterID") String ChapterID);

    List<String> findPoisionA();

    List<String> findPoisionB1(@Param("option1") String option1);

    List<Questionbank> findExercise(@Param("PoisionA") String PoisionA, @Param("PoisionB1") String PoisionB1);

    List<Questionbank> findExam(@Param("week") Integer week);

    Questionbank findAllfrompublish(@Param("id") Integer id);

    Questionbank findAllByState();

    void insertpublishexam(@Param("questionbank") Questionbank questionbank);

    void insertscore(@Param("week") String week, @Param("cycle") String cycle);

    void updateexam(@Param("questionbank") Questionbank questionbank);

    Integer countstart();

    List<Integer> selectemployeeId(@Param("cycle") String cycle);

    void insertcycle(@Param("cycle") String cycle, @Param("employeeId") Integer employeeId);

    void startexam(@Param("id") Integer id);

    void finishexam(@Param("id") Integer id);

    void clearScore();

    List<Questionbank> findquestiontips();


    void deleteexam(Integer id);

    List<Questionbank> findquestionpublish(@Param("questionbank") Questionbank questionbank);

}
