package com.hope.web;

import com.alibaba.fastjson.JSONObject;
import com.hope.domain.Behavior;
import com.hope.domain.Examination;
import com.hope.domain.Questionbank;
import com.hope.domain.Users;
import com.hope.service.*;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
//import sun.invoke.empty.Empty;

//import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;


@Controller
public class Questioncontroller {

    @Autowired
    public UsersService usersservice;
    @Autowired
    QuestionsService questionsService;
    @Autowired
    SituationService situationService;
    @Autowired
    ExaminationService examinationServive;
    @Autowired
    BehaviorService behaviorService;


    @RequestMapping("/exercisemanage")

    public String exercisemanage(HttpServletRequest request) {
        return "exercisemanage";
    }

    @RequestMapping("/exammanage")
    public String exammanage(HttpServletRequest request) {
        return "exammanage";
    }

    @RequestMapping("/pollingSystem")
    public String pollingSystem(HttpServletRequest request) {
        return "pollingSystem";
    }

    @ResponseBody
    @RequestMapping("/PoisionAshow")
    public List<String> PoisionAshow() {
        return questionsService.findPoisionA();
    }

    @ResponseBody
    @RequestMapping("/PoisionB1show")
    public List<String> PoisionB1show(String option1) {
        return questionsService.findPoisionB1(option1);
    }

    @ResponseBody
    @RequestMapping(value = "/findExercise", produces = "text/json;charset=UTF-8")
    public String findExercise(Integer page, Integer limit, String PoisionA, String PoisionB1) {
        List<Questionbank> questionbanks = questionsService.findExercise(PoisionA, PoisionB1);
        Integer size = questionbanks.size();
        HashMap<String, Object> map = new HashMap<>();
        if (page == null && limit == null) {
            //informs = (List) informService.findAll();
        } else {

            List<Questionbank> questionbanks2 = new ArrayList<>();
            for (int i = (page - 1) * limit; i < page * (limit); i++) {
                if (i < questionbanks.size()) {

                    questionbanks2.add(questionbanks.get(i));
                }
            }
            questionbanks = questionbanks2;
        }
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", size);
        map.put("data", questionbanks);
        return JSONObject.toJSONString(map);
    }

    @ResponseBody
    @RequestMapping(value = "/findExam", produces = "text/json;charset=UTF-8")
    public String findExam(Integer page, Integer limit) {
        List<Questionbank> questionbanks = questionsService.findExam(-2);
        Integer size = questionbanks.size();
        HashMap<String, Object> map = new HashMap<>();
        if (page == null && limit == null) {
            //informs = (List) informService.findAll();
        } else {
            List<Questionbank> questionbanks2 = new ArrayList<>();
            for (int i = (page - 1) * limit; i < page * (limit); i++) {
                if (i < questionbanks.size()) {
                    questionbanks2.add(questionbanks.get(i));
                }
            }
            questionbanks = questionbanks2;
        }
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", size);
        map.put("data", questionbanks);
        return JSONObject.toJSONString(map);
    }


    @ResponseBody
    @PostMapping(value = "/insertpublishexam")
    public String insertpublishexam(Questionbank questionbank) throws ParseException {
        System.out.println(questionbank.getWeek());
        SimpleDateFormat sim = new SimpleDateFormat("yyyy-MM");
        String date = sim.format(sim.parse(questionbank.getStartdate()));
        System.out.println(date);
        List<Questionbank> questionbank1 = questionsService.findExam(questionbank.getWeek());
        for (int i = 0; i < questionbank1.size(); i++) {
            if (sim.format(sim.parse(questionbank1.get(i).getStartdate())).equals(date)) return "failweek";
        }
        questionsService.insertpublishexam(questionbank);
        return "success";
    }

    @ResponseBody
    @RequestMapping("/getExamTime")
    public Questionbank getExamTime() throws ParseException {
        List<Questionbank> questiontips = questionsService.findquestiontips();
        return questiontips.get(0);
    }


    @ResponseBody
    @RequestMapping("/getQuestion")
    public List<Questionbank> getQuestion() throws ParseException {
        List<Questionbank> questiontips = questionsService.findquestiontips();
        Date d = new Date();
        SimpleDateFormat sim = new SimpleDateFormat("yyyy-MM-dd");
        Date date = sim.parse(sim.format(d));
        for (int i = 0; i < questiontips.size(); i++) {
            if ((date.before(sim.parse(questiontips.get(i).getEnddate())) | date.equals(sim.parse(questiontips.get(i).getEnddate())))
                    && (date.after(sim.parse(questiontips.get(i).getStartdate()))) | date.equals(sim.parse(questiontips.get(i).getStartdate()))) {
                List<Questionbank> QuestionList = questionsService.findquestionpublish(questiontips.get(i));
                return QuestionList;
            }
        }
        return null;
    }

    //获取当前cycle-week的考试次数(写法参照getAssessmentByEmployeeId)
    @ResponseBody
    @RequestMapping("/getExamTimes")
    public Examination getExamTimes(String userName, String cycle, Integer week, Integer questionId, Integer times) {
        examinationServive.getExamTimes(userName, cycle, week, questionId, times);
        return examinationServive.getExamTimes(userName, cycle, week, questionId, times);

    }

    //获取所有员工的姓名(写法参照getAssessmentByEmployeeId)
    @ResponseBody
    @RequestMapping(value = "/getName", produces = "text/json;charset=UTF-8")
    public String getName(Integer page, Integer limit, String userName) {
        List<Users> users = null;
        users = examinationServive.getName(userName);

        Integer size = users.size();
        if (page == null && limit == null) {
            //informs = (List) informService.findAll();
        } else {
            List<Users> users2 = new ArrayList<>();
            for (int i = (page - 1) * limit; i < page * (limit); i++) {
                if (i < users.size()) {
                    users2.add(users.get(i));
                }
            }
            users = users2;
        }
        HashMap<String, Object> map = new HashMap<>();
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", size);
        map.put("data", users);
        System.out.println(JSONObject.toJSONString(map));
        return JSONObject.toJSONString(map);
    }


    //获取当前cycle-week的week数(写法参照getAssessmentByEmployeeId)
    @ResponseBody
    @RequestMapping("/getExamWeek")
    public Examination getWeek(Integer week) {
        examinationServive.getWeek(week);
        return examinationServive.getWeek(week);

    }


    @ResponseBody
    @RequestMapping("/addtimes") //每次考试完，考试次数加一
    public String addtimes(String UserName) {
        Integer times = situationService.selecttimes(UserName);
        if (times == null) {
            times = 1;
            situationService.updatetime(UserName, times);
            return "success";
        } else {
            times += 1;
            situationService.updatetime(UserName, times);
            return "success";
        }
    }

    @ResponseBody
    @RequestMapping("/selecttimes")//获取考试次数
    public Integer selecttimes(String UserName) {
        return situationService.selecttimes(UserName);
    }

    @ResponseBody
    @PostMapping(value = "/insertexam")
    public String insertexam(Questionbank questionbank) {
        questionsService.insert(questionbank);
        return "success";
    }

    @ResponseBody
    @RequestMapping(value = "/deleteexcise")
    public String deleteexcise(Integer QuestionID) {
        Questionbank questionbank = new Questionbank();
        questionbank.setQuestionID(QuestionID);
        questionsService.delete(questionbank);
        return "success";
    }

    @ResponseBody
    @RequestMapping(value = "/deleteexam")
    public String deleteexam(Integer id) {
        questionsService.deleteexam(id);
        return "success";
    }

    @ResponseBody
    @PostMapping(value = "/updateexam")
    public String updateexam(Questionbank questionbank) {
        questionsService.updateexam(questionbank);
        return "success";
    }

    @ResponseBody
    @RequestMapping(value = "/showByExam")
    public List<Questionbank> showByExam(String UserName, String Cycle, Integer Week, Integer times) {
        List<Questionbank> QuestionList = usersservice.showByExam(UserName, Cycle, Week, times);
        System.out.println(QuestionList);
        return QuestionList;
    }

    //考试开始
    @ResponseBody
    @PostMapping(value = "/startexam")
    public String startexam(Integer id) {
        Questionbank questionbank = questionsService.findAllfrompublish(id);
        int state = questionbank.getState();
        if (state == 0) {
            return "failstate";
        }
        int i = questionsService.countstart();
        if (i != 0) {
            return "fail";
        } else {
            if (id != null) {
                questionsService.startexam(id);
                return "success";
            } else {
                return "fail1";
            }
        }

    }

    //结束考试
    @ResponseBody
    @PostMapping(value = "/finishexam")
    public String finishexam(Integer id, int week) throws ParseException {
        if (id != null) {
            Questionbank questionbank = questionsService.findAllfrompublish(id);
            int state = questionbank.getState();
            if (state == 0) {
                return "failstate";
            } else if (state == 2) {
                return "failstate2";
            } else {
                try {
                    SimpleDateFormat sim = new SimpleDateFormat("yyyy-MM");
                    String cycle = sim.format(sim.parse(questionbank.getStartdate()));//获取开始考试日期
                    List<Integer> employeeId = questionsService.selectemployeeId(cycle);

                    for (int i = 0; i < employeeId.size(); i++) {
                        questionsService.insertcycle(cycle, employeeId.get(i));
                    }
                    questionsService.insertscore("week" + week, cycle);
                    questionsService.finishexam(id);
                    //将缺考人员的考试成绩修改为0
                    Behavior behavior = behaviorService.selscore(cycle,"week"+week);
                    if(behavior!=null){
                        for (int i = 0; i < employeeId.size(); i++) {
                            if(week==1){
                                behavior.setWeek1("0");
                            }else if(week==2){
                                behavior.setWeek2("0");
                            }else if(week==3){
                                behavior.setWeek3("0");
                            }else{
                                behavior.setWeek4("0");
                            }
                            behaviorService.updateWeek(behavior);
                        }
                    }
                }catch (Exception e){
                    return "error";
                }finally {
                    return "success";
                }
            }
        } else {
            return "no id";
        }

    }

    //插入考试历史数据
    @ResponseBody
    @PostMapping(value = "/insertExamHis")
    public String insertExamHis(Examination examination) {
        examinationServive.insertExamHis(examination);
        return "success";
    }


    @ResponseBody
    @PostMapping(value = "/updateexcise")
    public String updateexcise(Questionbank questionbank) {
        questionsService.update(questionbank);
        return "success";
    }

    //题库管理excel导入------------------------------------------------------------------
    @ResponseBody
    @RequestMapping("/impExcel")
    public void impExcel(@RequestParam("ufiles") MultipartFile file) throws IOException {
        // 构造 Workbook 对象，execelFile 是传入文件路径(获得Excel工作区)
        Questionbank questionbank = new Questionbank();
        Workbook book = null;
        InputStream inputStream = file.getInputStream();
        POIFSFileSystem poifsFileSystem = new POIFSFileSystem(inputStream);
        book = new HSSFWorkbook(poifsFileSystem);


        // 读取表格的第一个sheet页
        Sheet sheet = book.getSheetAt(0);
        // 定义 row、cell
        Row row;
        String cell;
        // 总共有多少行,从0开始
        int totalRows = sheet.getLastRowNum();
        //总共多少列
        int totalCells = sheet.getRow(0).getLastCellNum();
        // 循环输出表格中的内容,首先循环取出行,再根据行循环取出列
        for (int i = 1; i <= totalRows; i++) {
            row = sheet.getRow(i);
            // 处理空行
            if (row == null) {
                continue;
            }
            if (row.getCell(0) != null) questionbank.setCourseID((int) Double.parseDouble(row.getCell(0).toString()));
            if (row.getCell(1) != null) questionbank.setChapterID((int) Double.parseDouble(row.getCell(1).toString()));
            if (row.getCell(2) != null) questionbank.setPoisionA(row.getCell(2).toString());
            if (row.getCell(3) != null) questionbank.setPoisionB1(row.getCell(3).toString());
            if (row.getCell(4) != null) questionbank.setPoisionB2(row.getCell(4).toString());
            if (row.getCell(5) != null) questionbank.setPoisionB3(row.getCell(5).toString());
            if (row.getCell(6) != null) questionbank.setQuestion(row.getCell(6).toString());
            if (row.getCell(7) != null) questionbank.setAnswer(row.getCell(7).toString());
            if (row.getCell(8) != null) questionbank.setOptionA(row.getCell(8).toString());
            if (row.getCell(9) != null) questionbank.setOptionB(row.getCell(9).toString());
            if (row.getCell(10) != null) questionbank.setOptionC(row.getCell(10).toString());
            if (row.getCell(11) != null) questionbank.setOptionD(row.getCell(11).toString());
            if (row.getCell(12) != null) questionbank.setRemarks(row.getCell(12).toString());
            if (row.getCell(13) != null)
                questionbank.setQuestionTime((int) Double.parseDouble(row.getCell(13).toString()));
            if (row.getCell(14) != null) questionbank.setType((int) Double.parseDouble(row.getCell(14).toString()));
            questionsService.insert(questionbank);
        }
    }
}
