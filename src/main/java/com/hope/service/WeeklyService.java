package com.hope.service;


import com.hope.domain.Project;
import com.hope.domain.Week;
import com.hope.domain.Weekly;

public interface WeeklyService {

    Weekly[] getWeeklys(int year, int week, int type, int project);

    Weekly[] getWeeklysByWeekId(int weekId);

    Weekly getWeekly(int id);

    Week getWeek(int year, int week, int type, int project);

    Week getWeekById(int id);

    Week[] getWeeks(int project);

    int insertWeekly(Weekly weekly);

    int updateWeekly(Weekly weekly);

    int delWeek(int id);

    int changeWeek(Week week);

    Project[] getProject();

    Project[] getProject2(String userName);

    Project[] getProject1(String userName);


    int addFillIn(Week week);

    int delFillIn(int id, String userName);

    int addAuditor(Week week);

    int delAuditor(int id, String userName);
}
