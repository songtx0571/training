package com.hope.web;

import com.hope.domain.Maintenance;
import com.hope.domain.MaintenanceRecord;
import com.hope.service.MaintenanceService;
import com.hope.util.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;


@RestController
@RequestMapping("MaintenanceController")
public class MaintenanceController {

    @Autowired
    MaintenanceService maintenanceService;

    @RequestMapping("Maintenance")
    public ModelAndView Maintenance(HttpServletRequest request, HttpServletResponse response) throws IOException, ParseException {
        ModelAndView view = new ModelAndView();
        view.setViewName("Maintenance");
        return view;
    }

    @RequestMapping("addLeader")
    public JsonResult addSuccessor(int id, int projectId, String datetime, String userName) {
        Maintenance maintenance = new Maintenance();
        maintenance.setProjectId(projectId);
        maintenance.setId(id);
        maintenance.setDatetime(datetime);
        maintenance.setLeader(userName);
        int num = maintenanceService.addLeader(maintenance);
        return new JsonResult(num);
    }

    @RequestMapping("delLeader")
    public JsonResult delSuccessor(int id, String userName) {
        int num = maintenanceService.delLeader(id, userName);
        return new JsonResult(num);
    }


    @RequestMapping("find")
    public JsonResult find(HttpServletRequest request, HttpServletResponse response, String datetime, int project) throws IOException {
        Maintenance maintenance = maintenanceService.getMaintenanceByProject(datetime, project);
        return new JsonResult(maintenance);

    }

    @RequestMapping("findRecord")
    public JsonResult findRecord(HttpServletRequest request, HttpServletResponse response, String datetime, int project) throws IOException {
        MaintenanceRecord[] maintenanceRecords = maintenanceService.getMaintenanceRecords(datetime, project);
        return new JsonResult(maintenanceRecords);
    }

    @RequestMapping("getMaintenances")
    public JsonResult getMaintenances(HttpServletRequest request, HttpServletResponse response, int project) throws IOException {
        Maintenance[] maintenances = maintenanceService.getMaintenances(project);
        return new JsonResult(maintenances);

    }

    @RequestMapping("addMaintenanceRecord")
    public ModelAndView addMaintenanceRecord(HttpServletRequest request, HttpServletResponse response, int type, int maintenanceId) throws IOException, ParseException {
        ModelAndView view = new ModelAndView();
        view.addObject("maintenanceId", maintenanceId);
        view.addObject("type", type);
        if (type == 1) {
            view.setViewName("MaintenanceRecordAdd2");
        } else {
            view.setViewName("MaintenanceRecordAdd");
        }
        return view;
    }

    @RequestMapping("updMaintenanceRecord")
    public ModelAndView updMaintenanceRecord(HttpServletRequest request, HttpServletResponse response, int id) throws IOException, ParseException {
        ModelAndView view = new ModelAndView();
        MaintenanceRecord maintenanceRecord = maintenanceService.getMaintenanceRecord(id);
        view.addObject("maintenanceRecord", maintenanceRecord);
        if (maintenanceRecord.getType() == 1) {
            view.setViewName("MaintenanceRecordUpd2");
        } else {
            view.setViewName("MaintenanceRecordUpd");
        }

        return view;
    }


    @RequestMapping("updMaintenanceRecord1")
    public ModelAndView updMaintenanceRecord1(HttpServletRequest request, HttpServletResponse response, int id) throws IOException, ParseException {
        ModelAndView view = new ModelAndView();
        MaintenanceRecord maintenanceRecord = maintenanceService.getMaintenanceRecord(id);
        view.addObject("maintenanceRecord", maintenanceRecord);
        view.setViewName("MaintenanceRecordUpd3");
        return view;
    }

    @RequestMapping("delMaintenanceRecord")
    public JsonResult delMaintenanceRecord(HttpServletRequest request, HttpServletResponse response, int id) throws IOException {
        int num = maintenanceService.delMaintenanceRecord(id);
        return new JsonResult(num);
    }

    @RequestMapping("delMaintenance")
    public JsonResult delMaintenance(HttpServletRequest request, HttpServletResponse response, int id) throws IOException {
        int num = maintenanceService.delMaintenance(id);
        return new JsonResult(num);
    }


    @RequestMapping("changeMaintenance")
    public ModelAndView changeMaintenance(HttpServletRequest request, HttpServletResponse response, String datetime, int project) throws IOException, ParseException {
        ModelAndView view = new ModelAndView();
        Maintenance maintenance = maintenanceService.getMaintenanceByProject(datetime, project);
        view.addObject("Maintenance", maintenance);
        view.setViewName("MaintenanceChange");
        return view;
    }

    @RequestMapping("maintenanceChange")
    public JsonResult maintenanceChange(HttpServletRequest request, HttpServletResponse response, Maintenance maintenance) throws IOException {
        int num = maintenanceService.change(maintenance);
        return new JsonResult(num);
    }


    @RequestMapping("insertMaintenanceRecord")
    public JsonResult insertMaintenanceRecord(HttpServletRequest request, HttpServletResponse response, MaintenanceRecord MaintenanceRecord) throws IOException {
        int num = maintenanceService.insertMaintenanceRecord(MaintenanceRecord);
        return new JsonResult(num);
    }

    @RequestMapping("updateMaintenanceRecord")
    public JsonResult updateMaintenanceRecord(HttpServletRequest request, HttpServletResponse response, MaintenanceRecord MaintenanceRecord) throws IOException {
        System.out.println(MaintenanceRecord);
        int num = maintenanceService.updateMaintenanceRecord(MaintenanceRecord);
        return new JsonResult(num);
    }

    @RequestMapping("updateMaintenanceRecord1")
    public JsonResult updateMaintenanceRecord1(HttpServletRequest request, HttpServletResponse response, MaintenanceRecord MaintenanceRecord) throws IOException {
        System.out.println(MaintenanceRecord);
        int num = maintenanceService.updateMaintenanceRecord1(MaintenanceRecord);
        return new JsonResult(num);
    }


    @RequestMapping("Maintenances")
    public ModelAndView Maintenances(HttpServletRequest request, HttpServletResponse response) throws IOException, ParseException {
        ModelAndView view = new ModelAndView();
        view.setViewName("Maintenances");
        return view;
    }


    @RequestMapping("MaintenanceRecord")
    public ModelAndView MaintenanceRecord(HttpServletRequest request, HttpServletResponse response, int id) throws IOException, ParseException {
        ModelAndView view = new ModelAndView();
        view.addObject("id", id);
        view.setViewName("MaintenanceRecord");
        return view;
    }

    @RequestMapping("find1")
    public JsonResult find1(HttpServletRequest request, HttpServletResponse response, int id) throws IOException {
        Maintenance maintenance = maintenanceService.getMaintenanceById(id);
        return new JsonResult(maintenance);
    }

    @RequestMapping("findRecord1")
    public JsonResult findRecord1(HttpServletRequest request, HttpServletResponse response, int maintenanceId) throws IOException {
        MaintenanceRecord[] maintenanceRecords = maintenanceService.getMaintenanceRecordsByMaintenanceId(maintenanceId);
        return new JsonResult(maintenanceRecords);
    }

    @RequestMapping("next")
    public JsonResult next(HttpServletRequest request, HttpServletResponse response, String datetime, int project) throws IOException, ParseException {
        System.out.println("aa");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-M-d");
        Date date = sdf.parse(datetime);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(calendar.DATE, 1);
        date = calendar.getTime();
        datetime = sdf.format(date);
        Maintenance Maintenance = maintenanceService.getMaintenanceByProject(datetime, project);
        if (Maintenance.getId() == 0) {
            Maintenance.setDatetime(sdf.format(date));
        }
        return new JsonResult(Maintenance);
    }

    @RequestMapping("last")
    public JsonResult last(HttpServletRequest request, HttpServletResponse response, String datetime, int project) throws IOException, ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-M-d");
        Date date = sdf.parse(datetime);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(calendar.DATE, -1);
        date = calendar.getTime();
        datetime = sdf.format(date);

        Maintenance Maintenance = maintenanceService.getMaintenanceByProject(datetime, project);
        if (Maintenance.getId() == 0) {
            Maintenance.setDatetime(sdf.format(date));
        }
        return new JsonResult(Maintenance);
    }
}
