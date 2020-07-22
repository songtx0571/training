package com.hope.service;

import com.hope.domain.Questionbank;
import com.hope.mapper.Questionsmapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionsService extends CommonCrudservice {
    private Questionsmapper questionsmapper;

    @Autowired
    public QuestionsService(Questionsmapper questionsmapper) {
        super(questionsmapper);
        this.questionsmapper = questionsmapper;
    }

    public List<Questionbank> findRand(String CourseID, String ChapterID) {
        return questionsmapper.findRand(CourseID, ChapterID);
    }

    public List<String> findPoisionA() {
        return questionsmapper.findPoisionA();
    }

    public List<String> findPoisionB1(String option1) {
        return questionsmapper.findPoisionB1(option1);
    }

    public List<Questionbank> findExercise(String option1, String option2) {
        return questionsmapper.findExercise(option1, option2);
    }

    public List<Questionbank> findExam(int week) {
        return questionsmapper.findExam(week);
    }

    public void insertpublishexam(Questionbank questionbank) {
        questionsmapper.insertpublishexam(questionbank);
    }

    public List<Questionbank> findquestiontips() {
        return questionsmapper.findquestiontips();
    }

    public List<Questionbank> findquestionpublish(Questionbank questionbank) {
        return questionsmapper.findquestionpublish(questionbank);
    }

    public Integer countstart() {
        return questionsmapper.countstart();
    }

    public Questionbank findAllByState() {
        return questionsmapper.findAllByState();
    }

    public Questionbank findAllfrompublish(Integer id) {
        return questionsmapper.findAllfrompublish(id);
    }

    public void insertcycle(String cycle, Integer employeeId) {
        questionsmapper.insertcycle(cycle, employeeId);
    }

    public List<Integer> selectemployeeId(String cycle) {
        return questionsmapper.selectemployeeId(cycle);
    }

    public void startexam(Integer id) {
        questionsmapper.startexam(id);
    }
    //结束考试：修改考试状态及员工考试情况（分数调整为0）
    public void finishexam(Integer id) {
        questionsmapper.finishexam(id);
        questionsmapper.clearScore();
    }


    public void insertscore(String week, String cycle) {
        questionsmapper.insertscore(week, cycle);
    }

    public void updateexam(Questionbank questionbank) {
        questionsmapper.updateexam(questionbank);
    }

    public void deleteexam(Integer id) {
        questionsmapper.deleteexam(id);
    }

}
