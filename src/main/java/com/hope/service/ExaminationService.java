package com.hope.service;

import com.hope.domain.Examination;
import com.hope.domain.MaintenanceRecord;
import com.hope.domain.Salary;
import com.hope.domain.Users;
import com.hope.mapper.Examinationmapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExaminationService extends CommonCrudservice {
    Examinationmapper examinationmapper;

    @Autowired
    public ExaminationService(Examinationmapper examinationmapper) {
        super(examinationmapper);
        this.examinationmapper = examinationmapper;
    }

    public Examination getExamTimes(String userName, String cycle, Integer week, Integer questionId, Integer times) {
        return examinationmapper.getExamTimes(userName, cycle, week, questionId, times);
    }

    public Examination getWeek(Integer week) {
        return examinationmapper.getWeek(week);
    }

    public List<Users> getName(String userName) {
        return examinationmapper.getName(userName);
    }


    public List<Examination> findExamHis(String userName) {
        return examinationmapper.findExamHis(userName);
    }

    public List<MaintenanceRecord> showLaborAll(String userName) {
        return examinationmapper.showLaborAll(userName);
    }

    public List<MaintenanceRecord> showLaborByMonth(String userName, String MonthDate) {
        return examinationmapper.showLaborByMonth(userName, MonthDate);
    }


    public List<MaintenanceRecord> showLaborByDay(String userName, String DayDateT) {
        return examinationmapper.showLaborByDay(userName, DayDateT);
    }

    public List<MaintenanceRecord> getWorkingHoursByProPeople(Integer projectId, String datetime) {
        return examinationmapper.getWorkingHoursByProPeople(projectId, datetime);
    }

    public List<Salary> getSalary1(String datetime) {
        return examinationmapper.getSalary1(datetime);
    }

    public List<Salary> getSalary2(String yearDate, String cycleMonth, String datetime) {
        return examinationmapper.getSalary2(yearDate, cycleMonth, datetime);
    }

    public List<Salary> getSalary1s(String datetime, String userName) {
        return examinationmapper.getSalary1s(datetime, userName);
    }

    public List<Salary> getSalary2s(String yearDate, String cycleMonth, String userName, String datetime) {
        return examinationmapper.getSalary2s(yearDate, cycleMonth, userName, datetime);
    }


//    public List<Salary> getCoe(String userName){
//        return examinationmapper.getCoe(userName);
//    }


    public List<MaintenanceRecord> getWorkingHoursByProPeople2(Integer projectId, String datetime, String name) {
        return examinationmapper.getWorkingHoursByProPeople2(projectId, datetime, name);
    }

    public List<MaintenanceRecord> getWorkingHoursByProPeople2D(Integer projectId, String datetime) {
        return examinationmapper.getWorkingHoursByProPeople2D(projectId, datetime);
    }

    public List<MaintenanceRecord> getMaintenanceByDate(Integer projectId, String datetime) {
        return examinationmapper.getMaintenanceByDate(projectId, datetime);
    }


    public void insertExamHis(Examination examination) {
        examinationmapper.insertExamHis(examination);
    }
}
