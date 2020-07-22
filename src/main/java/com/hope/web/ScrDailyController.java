package com.hope.web;

import com.hope.domain.ScrDaily;
import com.hope.domain.ScrDailyRecord;
import com.hope.service.ScrDailyService;
import com.hope.util.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

@RestController
@RequestMapping("ScrDailyController")
public class ScrDailyController {


    @Autowired
    ScrDailyService ScrDailyService;


    @RequestMapping("ScrDaily")
    public ModelAndView ScrDaily() {
        ModelAndView view = new ModelAndView();
        view.setViewName("ScrDaily");
        return view;
    }


    @RequestMapping("WfgdDaily")
    public ModelAndView WfgdDaily() {
        ModelAndView view = new ModelAndView();
        view.setViewName("WfgdDaily2");
        return view;
    }

    @RequestMapping("WfgdDailyP")
    public ModelAndView WfgdDailyP() {
        ModelAndView view = new ModelAndView();
        view.setViewName("WfgdDaily2P");
        return view;
    }


    @RequestMapping("ScrDailys")
    public ModelAndView ScrDailys() {
        ModelAndView view = new ModelAndView();
        view.setViewName("ScrDailys");
        return view;
    }

    @RequestMapping("ScrDailys2")
    public ModelAndView ScrDailys2() {
        ModelAndView view = new ModelAndView();
        view.setViewName("ScrDailys2");
        return view;
    }


    @RequestMapping("ScrDailyRecord")
    public ModelAndView ScrDailyRecord(int id, int other) {

        ModelAndView view = new ModelAndView();
        if (other == 1) {
            view.setViewName("ScrDailyRecord");
        } else {
            view.setViewName("WfgdDailyRecord");
        }
        view.addObject("id", id);
        return view;
    }


    @RequestMapping("addSuccessor")
    public JsonResult addSuccessor(int id, int type, int projectId, String datetime, String userName, String name) {
        ScrDaily ScrDaily = new ScrDaily();
        ScrDaily.setProjectId(projectId);
        ScrDaily.setId(id);
        ScrDaily.setType(type);
        ScrDaily.setDatetime(datetime);
        ScrDaily.setSuccessor(userName);
        ScrDaily.setRecorder(name);
        int num = ScrDailyService.addSuccessor(ScrDaily);
        return new JsonResult(num);
    }

    @RequestMapping("addSuccessor2")
    public JsonResult addSuccessor2(int id, String datetime, String name) {
        ScrDaily ScrDaily = new ScrDaily();
        ScrDaily.setId(id);
        ScrDaily.setDatetime(datetime);
        ScrDaily.setRecorder(name);
        int num = ScrDailyService.addSuccessor2(ScrDaily);
        return new JsonResult(num);
    }


    @RequestMapping("delSuccessor")
    public JsonResult delSuccessor(int id, String userName, String name) {
        int num = ScrDailyService.delSuccessor(id, userName, name);
        return new JsonResult(num);
    }


    @RequestMapping("addTrader")
    public JsonResult addTrader(int id, int type, int projectId, String datetime, String userName, String Name) {
        ScrDaily ScrDaily = new ScrDaily();
        ScrDaily.setProjectId(projectId);
        ScrDaily.setId(id);
        ScrDaily.setType(type);
        ScrDaily.setDatetime(datetime);
        ScrDaily.setTraders(userName);
        ScrDaily.setRecorder(Name);
        int num = ScrDailyService.addTrader(ScrDaily);
        return new JsonResult(num);
    }

    @RequestMapping("delTrader")
    public JsonResult delTrader(int id, String userName, String name) {
        int num = ScrDailyService.delTrader(id, userName, name);
        return new JsonResult(num);
    }


    @RequestMapping("find")
    public JsonResult find(String datetime, int type, int project, int other) {
        ScrDailyRecord[] ScrDailyRecord = ScrDailyService.getScrDailyRecords(datetime, type, project, other);
        return new JsonResult(ScrDailyRecord);
    }

    @RequestMapping("find1")
    public JsonResult find1(int scrDailyId) {
        ScrDailyRecord[] ScrDailyRecord = ScrDailyService.getScrDailyRecordsByScrDailyId(scrDailyId);
        return new JsonResult(ScrDailyRecord);
    }

    @RequestMapping("getscrDailys")
    public JsonResult getscrDailys(int project, int other) throws ParseException {
        ScrDaily[] scrDailys = ScrDailyService.getScrDailys(project, other);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
        for (int i = 0; i < scrDailys.length; i++) {
            scrDailys[i].setDatetime(sdf1.format(sdf.parse(scrDailys[i].getDatetime())));
        }
        return new JsonResult(scrDailys);
    }

    @RequestMapping("findscrDaily")
    public JsonResult findscrDaily(String datetime, int type, int project, int other) {
        ScrDaily scrDaily = ScrDailyService.getScrDaily(datetime, type, project, other);
        return new JsonResult(scrDaily);
    }

    @RequestMapping("findscrDaily1")
    public JsonResult findscrDaily1(int id) throws ParseException {
        ScrDaily scrDaily = ScrDailyService.getScrDailyById(id);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy年M月d日");
        scrDaily.setDatetime(sdf1.format(sdf.parse(scrDaily.getDatetime())));
        return new JsonResult(scrDaily);
    }

    @RequestMapping("add")
    public ModelAndView add(HttpServletRequest request, int type, int scrDailyId) {
        ModelAndView view = new ModelAndView();
        if (type == 2) {
            String content1 = request.getParameter("content1");
            view.addObject("content1", content1);
        }
        view.addObject("type", type);
        view.addObject("scrDailyId", scrDailyId);
        if (type == 2) {

            view.setViewName("ScrDailyadd2");
        } else if (type == 3) {
            view.setViewName("ScrDailyadd3");
        } else if (type == 4) {
            view.setViewName("ScrDailyadd4");
        } else {
            view.setViewName("ScrDailyadd1");
        }
        return view;
    }


    @RequestMapping("add1")
    public ModelAndView add1(HttpServletRequest request, int type, int scrDailyId) {
        ModelAndView view = new ModelAndView();
        if (type == 2) {
            String content1 = request.getParameter("content1");
            view.addObject("content1", content1);
        }
        view.addObject("type", type);
        view.addObject("scrDailyId", scrDailyId);
        if (type == 2) {
            int content1 = Integer.valueOf(request.getParameter("content1"));
            if (content1 == 1) {
                view.setViewName("WfgdDailyadd1");
            } else {
                view.setViewName("WfgdDailyadd2");
            }
        } else if (type == 3) {
            view.setViewName("ScrDailyadd1");
        } else if (type == 4) {
            view.setViewName("ScrDailyadd1");
        } else {
            view.setViewName("ScrDailyadd3");
        }
        return view;
    }

    @RequestMapping("upd1")
    public ModelAndView upd1(int id, int type) {
        ModelAndView view = new ModelAndView();
        ScrDailyRecord ScrDailyRecord = ScrDailyService.getScrDailyRecord(id);
        view.addObject("ScrDailyRecord", ScrDailyRecord);
        if (type == 2) {
            if ("1".equals(ScrDailyRecord.getContent1())) {
                view.setViewName("WfgdDailyupd1");
            } else {
                view.setViewName("WfgdDailyupd2");
            }
        } else if (type == 3) {
            view.setViewName("ScrDailyupd1");
        } else if (type == 4) {
            view.setViewName("ScrDailyupd1");
        } else {
            view.setViewName("ScrDailyupd3");
        }
        return view;
    }


    @RequestMapping("upd")
    public ModelAndView upd(int id, int type) {
        ModelAndView view = new ModelAndView();
        ScrDailyRecord ScrDailyRecord = ScrDailyService.getScrDailyRecord(id);
        view.addObject("ScrDailyRecord", ScrDailyRecord);
        if (type == 2) {
            view.setViewName("ScrDailyupd2");
        } else if (type == 3) {
            view.setViewName("ScrDailyupd3");
        } else if (type == 4) {
            view.setViewName("ScrDailyupd4");
        } else {
            view.setViewName("ScrDailyupd1");
        }
        return view;
    }

    @RequestMapping("del")
    public JsonResult del(int id) {
        int num = ScrDailyService.delScrDailyRecord(id);
        return new JsonResult(num);
    }

    @RequestMapping("delScrDailys")
    public JsonResult delScrDailys(int id) {
        int num = ScrDailyService.delScrDailys(id);
        return new JsonResult(num);
    }

    @RequestMapping("insert")
    public JsonResult insert(ScrDailyRecord ScrDailyRecord) {
        int num = ScrDailyService.insertScrDailyRecord(ScrDailyRecord);
        return new JsonResult(num);
    }

    @RequestMapping("update")
    public JsonResult update(ScrDailyRecord ScrDailyRecord) {
        System.out.println(ScrDailyRecord);
        int num = ScrDailyService.updateScrDailyRecord(ScrDailyRecord);
        return new JsonResult(num);
    }


    @RequestMapping("updScrDaily")
    public ModelAndView updScrDaily(String datetime, int type, int project, int other) {
        ModelAndView view = new ModelAndView();
        ScrDaily scrDaily = ScrDailyService.getScrDaily(datetime, type, project, other);
        view.addObject("scrDaily", scrDaily);
        view.setViewName("scrDailyupd");
        return view;
    }

    @RequestMapping("changeScrDaily")
    public JsonResult changeWeek(int projectId, int id, int type, int group, String datetime, String traders, String successor, int other) {
        ScrDaily scrDaily = new ScrDaily(id, datetime, projectId, group, type, traders, successor, other);
        int num = ScrDailyService.changeScrDaily(scrDaily);
        return new JsonResult(num);
    }

    @RequestMapping("next")
    public JsonResult next(int type, String datetime, int project, int other) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy年M月d日");
        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-M-d");
        Date date = sdf.parse(datetime);
        if (type == 3) {
            type = 1;
        } else {

            if (type == 2) {
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(date);
                calendar.add(calendar.DATE, 1);
                date = calendar.getTime();
            }
            type++;
        }
        datetime = sdf1.format(date);
        ScrDaily scrDaily = ScrDailyService.getScrDaily(datetime, type, project, other);
        if (scrDaily.getId() == 0) {
            scrDaily.setDatetime(sdf.format(date));
        }
        return new JsonResult(scrDaily);
    }

    @RequestMapping("last")
    public JsonResult last(int type, String datetime, int project, int other) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy年M月d日");
        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-M-d");
        Date date = sdf.parse(datetime);
        if (type == 1) {
            type = 3;

        } else {

            if (type == 3) {
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(date);
                calendar.add(calendar.DATE, -1);
                date = calendar.getTime();
            }
            type--;
        }
        datetime = sdf1.format(date);

        ScrDaily scrDaily = ScrDailyService.getScrDaily(datetime, type, project, other);
        if (scrDaily.getId() == 0) {
            scrDaily.setDatetime(sdf.format(date));
        }
        return new JsonResult(scrDaily);
    }
}
