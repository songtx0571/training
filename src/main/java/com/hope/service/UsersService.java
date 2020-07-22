package com.hope.service;

import com.hope.domain.*;
import com.hope.mapper.Usersmapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

@Service
public class UsersService {
    @Autowired
    QuestionsService questionsService;
    @Autowired
    private Usersmapper usersmapper;

    public String login(String UserName, String Password) {
        return usersmapper.login(UserName, Password);
    }

    public Integer findIdByUserName(String UserName) {
        return usersmapper.findIdByUserName(UserName);
    }

    public int findStateByUserName(String UserName) {
        return usersmapper.findStateByUserName(UserName);
    }

    public int changepassword(String Password, String UserName, String password) {
        return usersmapper.changepassword(Password, UserName, password);
    }

    public int loginadmin(String UserName, String Password) {
        return usersmapper.loginadmin(UserName, Password);
    }

    public List<Questionbank> findRand(String CourseID, String ChapterID) {
        return usersmapper.findRand(CourseID, ChapterID);
    }

    public int updatescore(String testScore, String Username) {
        return usersmapper.updatescore(testScore, Username);
    }

    public List<Questionbank> findQueById(String ID) {
        return usersmapper.findQueById(ID);
    }

    public int updatePeriod(double Period, String Username) {
        return usersmapper.updatePeriod(Period, Username);
    }

    public List<Situation> findbyUsr(String Username) {
        return usersmapper.findbyUsr(Username);
    }

    public List<Poision> findbypoision(String PoisionA) {
        return usersmapper.findbypoision(PoisionA);
    }

    public List<Questionbank> showQ(String PoisionA, String PoisionB1, int ChapterID) {
        return usersmapper.showQ(PoisionA, PoisionB1, ChapterID);
    }

    public List<Questionbank> showByExam(String UserName, String Cycle, Integer Week, Integer times) {
        return usersmapper.showByExam(UserName, Cycle, Week, times);
    }


    public int addAchievement(int TestScore, String userName) throws ParseException {
        int num = 0;
        Questionbank questionbank = questionsService.findAllByState();
        SimpleDateFormat sim = new SimpleDateFormat("yyyy-MM");
        String cycle = sim.format(sim.parse(questionbank.getStartdate()));

        int week = questionbank.getWeek();
        Achievement achievement = usersmapper.findAchievement(userName, week, cycle);
        if (achievement == null) {
            num = usersmapper.addAchievement(userName, TestScore, week, cycle);
        } else {
            num = usersmapper.updAchievement(achievement.getId(), TestScore, achievement.getTimes());
        }
        return num;
    }

    public List<Achievement> findAchievementsByUserName(String userName, String cycle) {
        return usersmapper.findAchievementsByUserName(userName, cycle);
    }

    public int updateStatus(Integer informId, String userName, String rdStatus) {
        return usersmapper.updateReadStatus(informId, userName, rdStatus);
    }

    public List<AchievementRecord> findAchievementRecords(String cycle) {
        List<AchievementRecord> achievementRecords = usersmapper.findAchievementRecords();
        List<Achievement> achievements = usersmapper.findAchievementsByCycle(cycle);
        for (AchievementRecord achievementRecord : achievementRecords) {
            for (Achievement achievement : achievements) {
                if (achievementRecord.getUserName().equals(achievement.getUserName()) && achievement.getWeek() == 1) {
                    achievementRecord.setWeek1Result1(achievement.getResult1());
                    achievementRecord.setWeek1Result2(achievement.getResult2());
                    achievementRecord.setWeek1Result3(achievement.getResult3());
                    achievementRecord.setWeek1Result4(achievement.getResult4());
                }
                if (achievementRecord.getUserName().equals(achievement.getUserName()) && achievement.getWeek() == 2) {
                    achievementRecord.setWeek2Result1(achievement.getResult1());
                    achievementRecord.setWeek2Result2(achievement.getResult2());
                    achievementRecord.setWeek2Result3(achievement.getResult3());
                    achievementRecord.setWeek2Result4(achievement.getResult4());
                }
                if (achievementRecord.getUserName().equals(achievement.getUserName()) && achievement.getWeek() == 3) {
                    achievementRecord.setWeek3Result1(achievement.getResult1());
                    achievementRecord.setWeek3Result2(achievement.getResult2());
                    achievementRecord.setWeek3Result3(achievement.getResult3());
                    achievementRecord.setWeek3Result4(achievement.getResult4());
                }
                if (achievementRecord.getUserName().equals(achievement.getUserName()) && achievement.getWeek() == 4) {
                    achievementRecord.setWeek4Result1(achievement.getResult1());
                    achievementRecord.setWeek4Result2(achievement.getResult2());
                    achievementRecord.setWeek4Result3(achievement.getResult3());
                    achievementRecord.setWeek4Result4(achievement.getResult4());
                }
            }
        }
        return achievementRecords;
    }


    public Users getUserByUserName(String userName) {
        return usersmapper.getUserByUserName(userName);
    }

    public Users getName(Integer id) {
        return usersmapper.getName(id);
    }

    public List<Users> getProjectIdS(String userName) {
        return usersmapper.getProjectIdS(userName);
    }

    public List<Users> findUserNameByName(String Name) {
        return usersmapper.findUserNameByName(Name);
    }


    public List<Users> getNameByProjectId(Integer projectId) {
        return usersmapper.getNameByProjectId(projectId);
    }

    public List<Map> selSeen(String informId){
        return usersmapper.selSeen(informId);
    }
    public String selSeenUser(String userName){
        return usersmapper.selSeenUser(userName);
    }

    public Users findById(Integer userId) {
        return usersmapper.findUsersById(userId);
    }

    public Users findUserByName(String name) {
        return usersmapper.findUserByName(name);
    }

    public int selPermission(int id) {
        return usersmapper.selPermission(id);
    }
}
