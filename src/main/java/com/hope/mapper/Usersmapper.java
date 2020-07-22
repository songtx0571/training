package com.hope.mapper;

import com.hope.domain.*;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface Usersmapper extends Commonmapper {

    Integer findIdByUserName(@Param("UserName") String UserName);

    int findStateByUserName(@Param("UserName") String UserName);

    String login(@Param("UserName") String UserName, @Param("Password") String Password);

    int changepassword(@Param("Password") String Password, @Param("Username") String Username,
                       @Param("password") String password);

    int loginadmin(@Param("UserName") String UserName, @Param("Password") String Password);

    List<Users> findByID(@Param("UserName") String UserName, @Param("Password") String Password);

    List<Questionbank> findRand(@Param("CourseID") String CourseID, @Param("ChapterID") String ChapterID);

    int updatescore(@Param("TestScore") String TestScore, @Param("Username") String Username);

    List<Questionbank> findQueById(@Param("ID") String ID);

    int updatePeriod(@Param("Period") double Period, @Param("Username") String Username);

    List<Situation> findbyUsr(@Param("Username") String Username);

    List<Poision> findbypoision(@Param("PoisionA") String PoisionA);

    List<Questionbank> showQ(@Param("PoisionA") String PoisionA, @Param("PoisionB1") String PoisionB1, @Param("ChapterID") int ChapterID);

    List<Questionbank> showByExam(@Param("UserName") String UserName, @Param("Cycle") String Cycle, @Param("Week") Integer Week, @Param("times") Integer times);

    Achievement findAchievement(@Param("userName") String userName, @Param("week") int week, @Param("cycle") String cycle);

    int addAchievement(@Param("userName") String userName, @Param("TestScore") int TestScore, @Param("week") int week, @Param("cycle") String cycle);

    int updAchievement(@Param("id") int id, @Param("TestScore") int TestScore, @Param("times") int times);

    List<Achievement> findAchievementsByUserName(@Param("userName") String userName, @Param("cycle") String cycle);

    List<Achievement> findAchievementsByUserName1(@Param("behavior") Behavior behavior);

    List<Achievement> findAchievementsByCycle(@Param("cycle") String cycle);

    List<AchievementRecord> findAchievementRecords();


    Users getUserByUserName(@Param("userName") String userName);

    Users getName(@Param("id") Integer id);

    List<Users> getProjectIdS(@Param("userName") String userName);

    List<Users> findUserNameByName(@Param("Name") String Name);

    List<Users> getNameByProjectId(@Param("projectId") Integer projectId);


    String getNameByUserName(@Param("userName") String userName);

    int updateReadStatus(@Param("informId") Integer informId, @Param("userName") String userName, @Param("rdStatus") String rdStatus);

     List<Map> selSeen(@Param("informId") String informId);

    String selSeenUser(@Param("userName") String userName);

    Users findUsersById(Integer userId);

    Users findUserByName(@Param("Name") String name);

    int selPermission(int id);
}
