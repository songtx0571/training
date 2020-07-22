package com.hope.service;

import com.hope.domain.Achievement;
import com.hope.domain.Assessment;
import com.hope.domain.Behavior;
import com.hope.mapper.Behaviormapper;
import com.hope.mapper.Usersmapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class BehaviorService extends CommonCrudservice {

    Behaviormapper behaviormapper;

    @Autowired
    Usersmapper usersmapper;

    @Autowired
    public BehaviorService(Behaviormapper behaviormapper) {
        super(behaviormapper);
        this.behaviormapper = behaviormapper;
    }

    public Behavior findAllBe(Behavior behavior) {
        Behavior Behavior = behaviormapper.findAll(behavior);
        List<Achievement> achievements = usersmapper.findAchievementsByUserName1(behavior);
        System.out.println(achievements.size());
        for (Achievement achievement : achievements) {
            if (achievement.getWeek() == 1 && Behavior.getWeek1() != "") {
                Behavior.setWeek1("" + ((double) achievement.getMaxValue()) / 10);
            }
            if (achievement.getWeek() == 2 && Behavior.getWeek2() != "") {
                Behavior.setWeek2("" + ((double) achievement.getMaxValue()) / 10);
            }
            if (achievement.getWeek() == 3 && Behavior.getWeek3() != "") {
                Behavior.setWeek3("" + ((double) achievement.getMaxValue()) / 10);
            }
            if (achievement.getWeek() == 4 && Behavior.getWeek4() != "") {
                Behavior.setWeek4("" + ((double) achievement.getMaxValue()) / 10);
            }
        }
        return Behavior;

    }

    public List<String> selectBeCycle(int employeeId) {
        return behaviormapper.selectBeCycle(employeeId);
    }

    public void updateCycle(Behavior behavior) {
        behaviormapper.updateCycle(behavior);
    }

    public List<String> selectAllCycle() {
        return behaviormapper.selectAllCycle();
    }


    public List<Assessment> getAssessment(String cycle) {
        return behaviormapper.getAssessment(cycle);
    }

    public List<Assessment> getAssessmentBy(String cycle, String manager) {
        return behaviormapper.getAssessmentBy(cycle, manager);
    }

    public Assessment getAssessmentByUserName(String cycle, String userName) {
        return behaviormapper.getAssessmentByUserName(cycle, userName);
    }


    public Assessment getAssessmentByEmployeeId(String cycle, String employeeId) {
        return behaviormapper.getAssessmentByEmployeeId(cycle, employeeId);
    }
    //根据用户id月份查询成绩为空的记录
    public Behavior selscore(@Param("cycle") String cycle, @Param("week") String week){
        return behaviormapper.selscore(cycle,week);
    }
    //修改周考成绩
    public void updateWeek(Behavior behavior){
        behaviormapper.updateWeek(behavior);
    }
}
