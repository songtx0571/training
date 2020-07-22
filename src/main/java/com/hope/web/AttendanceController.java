package com.hope.web;

import com.hope.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class AttendanceController {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private InformService informService;
    @Autowired
    private ProjectService projectService;
    @Autowired
    private PerformanceService performanceService;
    @Autowired
    private BehaviorService behaviorService;
    @Autowired
    private ExaminationService examinationServive;


//    @RequestMapping("/Attendance")
//    public String returnInfrom(HttpSession session) {
//        return "Attendance";
//    }
}
