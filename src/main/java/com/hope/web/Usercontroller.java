package com.hope.web;

import com.alibaba.fastjson.JSONObject;
import com.hope.domain.*;
import com.hope.service.UsersService;
import com.hope.util.ExportExcelUtils;
import com.hope.util.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class Usercontroller {
    @Autowired
    public UsersService usersservice;
    // ConfigBean configBean;

    @RequestMapping("/index")
    public String Loginindex(HttpSession session) {
        if (session.getAttribute("Name") != null) {
            return "index";
        } else return "Loginindex";
    }


    @RequestMapping("/adminindex")
    public String adminindex(HttpSession session) {
        if (session.getAttribute("Name") != null) {
            return "index";
        } else return "Loginindex";
    }


    @RequestMapping("/Loginindex")
    public String login() {
        return "Loginindex";
    }

    @RequestMapping("/")
    public String login1() {
        return "Loginindex";
    }

    @RequestMapping("/logout")
    public String logout(HttpServletRequest request) {
        request.getSession().removeAttribute("Name");
        request.getSession().removeAttribute("permissions");
        return "Loginindex";
    }

    @RequestMapping(value = "/loginPage", method = {RequestMethod.POST, RequestMethod.GET})
    public String login(HttpServletRequest request, HttpSession session) {
        String UserName = request.getParameter("UserName");
        String Password = request.getParameter("Password");
        String Name = usersservice.login(UserName, Password);
        Integer userid = usersservice.findIdByUserName(UserName);
        session.setAttribute("UserName", UserName);
        session.setAttribute("Name", Name);
        session.setAttribute("userid", userid);
        if (Name == null) {
            return "redirect:/?error=true";
        } else {
            if ("admin".equals(UserName)) {
                session.setAttribute("permission", 1);
                return "redirect:/index";
            }
            int state = usersservice.findStateByUserName(UserName);
            if (state == 0) {
                return "redirect:/?error1=true";
            }
            session.setAttribute("permission", 1);
            return "redirect:/index";
        }
    }

    @RequestMapping("/getLoginInf")
    @ResponseBody
    public List<String> getLoginInf(HttpSession session){
        List<String> list=new ArrayList<>();
        String name= (String)session.getAttribute("Name");
        if(name!=null){
            Users users=usersservice.findUserByName(name);
            if(users!=null){
            String UserName=users.getUserName();
            String Password=users.getPassword();
            list.add(UserName);
            list.add(Password);
            int index=usersservice.selPermission(users.getId());
            list.add(index+"");
            }
        }

        return list;
    }

    @RequestMapping(value = "/loginPageadmin", method = {RequestMethod.POST, RequestMethod.GET})
    public String loginadmin(HttpServletRequest request, HttpSession session) {
        String UserName = request.getParameter("UserName");
        String Password = request.getParameter("Password");
        Integer permissions;
        // int permissions = usersservice.loginadmin(UserName, Password);
        String Name = usersservice.login(UserName, Password);
        // session.setAttribute("permissions",permissions);
        if (Name == null) {
            return "redirect:/?error=true";
        } else {
            permissions = usersservice.loginadmin(UserName, Password);
            session.setAttribute("permissions", permissions);
            session.setAttribute("Name", Name);
            if (permissions == 1) {
                return "adminindex";
            } else {
                return "redirect:/?error=true";
            }
        }
    }

    @RequestMapping(value = "/changePage", method = {RequestMethod.POST, RequestMethod.GET})
    public String changepassword(HttpServletRequest request) {
        String UserName = request.getParameter("UserName");
        String Password = request.getParameter("Password");
        String password = request.getParameter("password");
        int result = usersservice.changepassword(Password, UserName, password);
        request.setAttribute("result", result);
        if (result == 1) {
            return "index";
        } else {
            return "index";
        }
    }

    @RequestMapping("/Course")
    public String courselist(Model model) {
        // model.addAttribute("courses", courseservice.findAll());
        return "Course";
    }

    @RequestMapping("/Chapter")
    public String chapterlist() {
        return "Chapter";
    }

    @RequestMapping("/Chapter1")
    public String chapterlist1() {
        return "Chapter1";
    }

    @RequestMapping("/Chapter2")
    public String chapterlist2() {
        return "Chapter2";
    }

    @RequestMapping("/Chapter3")
    public String chapterlist3() {
        return "Chapter3";
    }

    @ResponseBody
    @RequestMapping(value = "/submitScore", method = {RequestMethod.POST, RequestMethod.GET})
    public int submitScore(String TestScore, String Username) {
        int result = usersservice.updatescore(TestScore, Username);
        return result;
    }

    @RequestMapping("/result")
    public String resultscore() {
        return "result";
    }


    @ResponseBody
    @RequestMapping("/GetExercise")
    public List<Questionbank> getExercise(String ID) {
        List<Questionbank> ExerciseList = usersservice.findQueById(ID);
        return ExerciseList;
    }

    @ResponseBody
    @RequestMapping("/addPeriod")
    public int submitPeriod(double Period, String Username) {
        int result = usersservice.updatePeriod(Period, Username);
        return result;
    }

    @ResponseBody
    @RequestMapping("/GetPeriod")
    public List<Situation> findbyUsr(String Username) {
        List<Situation> UsrPeriod = usersservice.findbyUsr(Username);
        return UsrPeriod;
    }

    @ResponseBody
    @RequestMapping("/GetPoisionB")
    public List<Poision> findbypoision(String PoisionA) {
        List<Poision> PoisionB = usersservice.findbypoision(PoisionA);
        return PoisionB;
    }

    @ResponseBody
    @RequestMapping("/ShowQ")
    public List<Questionbank> showQ(String PoisionA, String PoisionB1, int ChapterID) {
        List<Questionbank> QuestionList = usersservice.showQ(PoisionA, PoisionB1, ChapterID);
        return QuestionList;
    }


    @ResponseBody
    @RequestMapping("/addAchievement")
    public int addAchievement(int TestScore, String Username) throws ParseException {
        int num = usersservice.addAchievement(TestScore, Username);
        return num;
    }


    @ResponseBody
    @RequestMapping("/findAchievementsByUserName")
    public List<Achievement> findAchievementsByUserName(String cycle, String userName) {
        List<Achievement> achievements = usersservice.findAchievementsByUserName(userName, cycle);
        return achievements;
    }

    @ResponseBody
    @RequestMapping("/updateStatus")
    public int updateStatus(@RequestBody ReadStatus readStatus) {//前端用对象传值，所以后端要用对象接受。
        System.out.println("值:"+readStatus.getInformId()+" "+readStatus.getRdStatus()+" "+readStatus.getUserName());
        int readstatus = usersservice.updateStatus(readStatus.getInformId(), readStatus.getUserName(), readStatus.getRdStatus());
//		return readstatus;
//		JSONArray array = JSONArray.parseArray(list);
//		List<ReadStatus> readStatuses = new ArrayList<>();
        return readstatus;

    }

    @ResponseBody
    @RequestMapping("/findUserNameByName")
    public List<Users> findUserNameByName(String Name) {
        //System.out.println(usersservice.findUserNameByName(Name));
        return usersservice.findUserNameByName(Name);
    }

    @ResponseBody
    @RequestMapping("/findAchievementRecords")
    public JsonResult findAchievementRecords(String cycle) {
        List<AchievementRecord> achievementRecords = usersservice.findAchievementRecords(cycle);
        return new JsonResult(achievementRecords);
    }

    @ResponseBody
    @RequestMapping("/downAchievementRecords")
    public void downAchievementRecords(String cycle, HttpServletResponse response) {
        List<AchievementRecord> achievementRecords = usersservice.findAchievementRecords(cycle);
        String[] title = {"员工编号", "员工名称 ", "第一周考试成绩 ", "第二周考试成绩 ", "第三周考试成绩 ", "第四周考试成绩 "};
        String[] title2 = {"第一次", "第二次", "第三次", "第四次", "第一次", "第二次", "第三次", "第四次"
                , "第一次", "第二次", "第三次", "第四次", "第一次", "第二次", "第三次", "第四次"};
        // map中的key
        String keys[] = {"userName", "name", "week1Result1", "week1Result2", "week1Result3", "week1Result4",
                "week2Result1", "week2Result2", "week2Result3", "week2Result4",
                "week3Result1", "week3Result2", "week3Result3", "week3Result4",
                "week4Result1", "week4Result2", "week4Result3", "week4Result4"};
        String fileName = cycle + "员工考试成绩";
        try {
            ExportExcelUtils.start_download(response, fileName, achievementRecords, title, title2, keys, fileName);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @ResponseBody
    @RequestMapping("/getUserByUserName")
    public JsonResult getUserByUserName(String userName) {
        return new JsonResult(usersservice.getUserByUserName(userName));
    }

    // Layui数据表格的后端写法，获取员工所属项目部信息
    @ResponseBody
    @RequestMapping(value = "/getProjectIdS", produces = "text/json;charset=UTF-8")
    public String getProjectIdS(Integer page, Integer limit, String userName) {
        List<Users> users = null;
        users = usersservice.getProjectIdS(userName);

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
       //F System.out.println(JSONObject.toJSONString(map));
        return JSONObject.toJSONString(map);
    }

    // Layui数据表格的后端写法，获取员工所属项目部信息
    @ResponseBody
    @RequestMapping(value = "/getNameByProjectId", produces = "text/json;charset=UTF-8")
    public String getNameByProjectId(Integer page, Integer limit, Integer projectId) {
        List<Users> users = null;
        users = usersservice.getNameByProjectId(projectId);

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
        //System.out.println(JSONObject.toJSONString(map));
        return JSONObject.toJSONString(map);
    }

    /**
     * 查寻已查看通知人员清单
     * @return
     */
    @RequestMapping("/selSeen")
    @ResponseBody
    public List<String> selSeen(HttpServletRequest request){
        String informId=request.getParameter("informId");
        System.out.println("通知"+informId);
        List<String> list=new ArrayList<>();
        if(informId!=null){
            List<Map> map=usersservice.selSeen(informId);
            for (Map map1:map){
                String name=(String)map1.get("userName");
                String userName=usersservice.selSeenUser(name);
                if(userName==null||userName.equals("")){

                }else {
                    list.add(userName);
                }
            }
        }
        return list;
    }

    /*
     * @RequestMapping(value="/first.do") public String doFirst(MultipartFile
     * uploadFile,HttpServletRequest request)throws Exception{ String
     * filename=uploadFile.getOriginalFilename();//获取文件名 String
     * leftPath=request.getServletContext().getRealPath("/images");//
     * 将images文件夹转换成绝对路径 System.out.println(leftPath); File file= new
     * File(leftPath,filename);//进行路径对接=前半部分路径+文件名称 uploadFile.transferTo(file);
     * return "index1"; }
     *
     * @RequestMapping(value="/index1") public String touxiang(){ return "index1"; }
     * @RequestMapping("/query") public final List<String>
     * query(HttpServletRequest request)throws IOException { String sql =
     * request.getParameter("sqlquery"); System.out.println(sql); QueryRepository
     * repository = new QueryRepository(configBean); return
     * repository.ExecuteSql(sql); }
     */

}
