package com.hope.mapper;


import com.hope.domain.Project;
import com.hope.domain.Week;
import com.hope.domain.Weekly;
import org.apache.ibatis.annotations.Param;

public interface Weeklymapper {

    Weekly[] getWeeklys(@Param("year") int year, @Param("week") int week, @Param("type") int type, @Param("project") int project);

    Weekly[] getWeeklysByWeekId(@Param("weekId") int weekId);

    Weekly getWeekly(@Param("id") int id);

    Week getWeek(@Param("year") int year, @Param("week") int week, @Param("type") int type, @Param("project") int project);

    Week getWeekById(@Param("id") int id);

    Week[] getWeeks(@Param("project") int project);

    int insertWeekly(@Param("weekly") Weekly weekly);

    int updateWeekly(@Param("weekly") Weekly weekly);

    int insertWeek(@Param("week") Week week);

    int updateWeek(@Param("week") Week week);

    int delWeek(@Param("id") int id);

    Project[] getProject();

    Project[] getProject2(@Param("userName") String userName);

    Project[] getProject1(@Param("projectId") String[] projectId);

    String getProjectId(@Param("userName") String userName);

    int addFillIn(@Param("week") Week week);

    int insertWeekByFillIn(@Param("week") Week week);

    int addAuditor(@Param("week") Week week);

    int insertWeekByAuditor(@Param("week") Week week);
}
