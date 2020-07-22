package com.hope.web;

import com.alibaba.fastjson.JSONObject;
import com.hope.domain.*;
import com.hope.service.*;
import com.hope.util.ExportExcelUtils;
import org.apache.commons.io.FileUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class Managecontroller {
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

    @RequestMapping("/Employeemanage")
    public String empmanage(HttpServletRequest request) {
        return "Employeemanage";
    }


    @RequestMapping("/addinfshow")
    public String addinf(HttpServletRequest request) {
        return "addinf";
    }


    @RequestMapping("/exportTable")
    public String exportTable(HttpServletRequest request) {
        return "export";
    }

    //----------------------------------------------
    @RequestMapping("/nametbShow")
    public ModelAndView nametbShow(HttpServletRequest request) {
        ModelAndView mv = new ModelAndView();
        Integer employeeId = Integer.parseInt(request.getParameter("employeeId"));
        mv.addObject("employeeId", employeeId);
        mv.setViewName("nametbShow");
        return mv;
    }

    @RequestMapping("/changeCoeShow")
    public String changeCoeShow(HttpServletRequest request) {


        return "changeCoeShow";
    }


    @RequestMapping("/appraise")
    public ModelAndView appraise(HttpServletRequest request) {
        ModelAndView mv = new ModelAndView();
        Integer employeeId = Integer.parseInt(request.getParameter("employeeId"));
        mv.addObject("employeeId", employeeId);
        mv.setViewName("appraise");
        return mv;
    }


    @RequestMapping("/addPeAcc")
    public ModelAndView addPeAcc(HttpServletRequest request, ModelAndView mv) {
        Integer employeeId = Integer.parseInt(request.getParameter("employeeId"));
        mv.addObject("employeeId", employeeId);
        mv.setViewName("addPeAcc");
        return mv;
    }


    @RequestMapping("/allinform")
    public String allinform(HttpServletRequest request) {
        return "Allinform";
    }

    @RequestMapping("/Inform")
    public String returnInfrom(HttpSession session) {
        return "Inform";
    }

    @RequestMapping("/Attendance")
    public String returnAttendabce(HttpSession session) {
        return "Attendance";
    }

    //按条件查询员工信息------------------------------------------------------
    @ResponseBody
    @RequestMapping("/findBy")
    public List<Employee> findBy(HttpServletRequest request) {
        Employee employee = new Employee();
        employee.setUserName(request.getParameter("UserName"));
        employee.setName(request.getParameter("Name"));
        employee.setDepartment(Integer.valueOf(request.getParameter("Department")));
        List<Employee> employeeList = employeeService.findBy(employee);
        return employeeList;
    }


    //管理员*员工信息修改-------------------------------------------
    @ResponseBody
    @RequestMapping("/emUpdate")
    public String emUpdate(HttpServletRequest request) {
        Employee employee = new Employee();
        System.out.println(employee.toString());
        Integer id = Integer.parseInt(request.getParameter("Id"));
        Employee employee1 = (Employee) employeeService.findById(id);
        String Idnumber = request.getParameter("Idnumber");
        if (Idnumber != null && Idnumber != "") {
            if (!employee1.getIdnumber().equals(Idnumber)) {
                if (employeeService.selectByIdnumber(Idnumber) != 0) {
                    return "身份证号已被使用";
                }
            }
        }
        employee1.setIdnumber(Idnumber);
        employee1.setUserName(request.getParameter("UserName"));
        employee1.setName(request.getParameter("Name"));
        employee1.setEmergency(request.getParameter("Emergency"));
        employee1.setEmergencyTel(request.getParameter("EmergencyTel"));
        employee1.setCard(request.getParameter("Card"));
        employee1.setCloshe(request.getParameter("Closhe"));
        employee1.setHat(request.getParameter("Hat"));
        employee1.setPhone(request.getParameter("Phone"));
        employee1.setEducation(request.getParameter("Education"));
        employee1.setBank(request.getParameter("bank"));
        employee1.setAddress(request.getParameter("address"));
        employeeService.update(employee1);
        return "success";
    }


    //根据Id查询员工信息------------------------------------------------------
    @ResponseBody
    @RequestMapping("/findEmById")
    public Employee findEmById(HttpSession session) {
        if (session.getAttribute("userid") != null) {
            int id = (int) session.getAttribute("userid");
            return (Employee) employeeService.findById(id);
        }
        return null;
    }

    // Layui数据表格的后端写法，获取工时信息
    @ResponseBody
    @RequestMapping(value = "/showLaborAll", produces = "text/json;charset=UTF-8")
    public String showLaborAll(Integer page, Integer limit, String userName, String MonthDate, String DayDateT) {
        List<MaintenanceRecord> maintenanceRecords = null;
        if (MonthDate != "" && DayDateT != "") {
            maintenanceRecords = examinationServive.showLaborByDay(userName, DayDateT);
        } else if (MonthDate != "" && DayDateT == "") {
            maintenanceRecords = examinationServive.showLaborByMonth(userName, MonthDate);
        } else if (MonthDate == "" && DayDateT == "") {
            maintenanceRecords = examinationServive.showLaborAll(userName);
        }


        Integer size = maintenanceRecords.size();
        if (page == null && limit == null) {
            //informs = (List) informService.findAll();
        } else {
            List<MaintenanceRecord> maintenanceRecords2 = new ArrayList<>();
            for (int i = (page - 1) * limit; i < page * (limit); i++) {
                if (i < maintenanceRecords.size()) {
                    maintenanceRecords2.add(maintenanceRecords.get(i));
                }
            }
            maintenanceRecords = maintenanceRecords2;
        }
        HashMap<String, Object> map = new HashMap<>();
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", size);
        map.put("data", maintenanceRecords);
        System.out.println(JSONObject.toJSONString(map));
        return JSONObject.toJSONString(map);
    }

    //查询员工管理人员----------------------------
    @ResponseBody
    @RequestMapping("/appraiseUserName")
    public List<String> appraiseUserName(String Manager) {
        System.out.println("查询结果为:"+Manager);
        return employeeService.findappraiseUserName(Manager);
    }

    @ResponseBody
    @RequestMapping("/findEmUserName")
    public List<String> findEmUserName(HttpSession session) {
        return employeeService.findEmUserName();
    }

    @ResponseBody
    @RequestMapping("/findEmUserName1")
    public List<String> findEmUserName1(HttpSession session) {
        return employeeService.findEmUserName1();
    }


    //查询所有员工-------------------------------------------------------
    @ResponseBody
    @RequestMapping("/findAll")
    public Map<String, Object> findAll(HttpServletRequest request) {
        Map<String, Object> map = new HashMap<String, Object>();
        int currentPage = Integer.parseInt(request.getParameter("currentPage"));
        PageBean pageBean = new PageBean();
        List<Employee> employees = (List) employeeService.findByPage(currentPage, pageBean.getPageSize());
        map.put("employee", employees);
        int count = employeeService.getCount() / 13 + 1;
        map.put("total", count);
        return map;
    }

    @ResponseBody
    @RequestMapping("/findAllBy")
    public Map<String, Object> findAllBy(HttpServletRequest request) {
        Map<String, Object> map = new HashMap<String, Object>();
        int currentPage = Integer.parseInt(request.getParameter("currentPage"));
        String manager = request.getParameter("manager");
        PageBean pageBean = new PageBean();
        List<Employee> employees = (List) employeeService.findByPage2(currentPage, pageBean.getPageSize(), manager);
        map.put("employee", employees);
        int count = employeeService.getCount() / 13 + 1;
        map.put("total", count);
        return map;
    }


    @ResponseBody
    @RequestMapping("/findAll2")
    public Map<String, Object> findAll2(HttpServletRequest request) {
        Map<String, Object> map = new HashMap<String, Object>();
        int currentPage = Integer.parseInt(request.getParameter("currentPage"));
        PageBean pageBean = new PageBean();
        List<Employee> employees = (List) employeeService.findByPage(currentPage, pageBean.getPageSize2());
        map.put("employee", employees);
        return map;
    }

    //    @ResponseBody
//    @RequestMapping("/findAll2By")
//    public Map<String, Object> findAll2By(HttpServletRequest request) {
//        Map<String, Object> map = new HashMap<String, Object>();
//        int currentPage = Integer.parseInt(request.getParameter("currentPage"));
//        String manager = request.getParameter("manager");
//        PageBean pageBean = new PageBean();
//        List<Employee> employees = (List) employeeService.findByPage2(currentPage, pageBean.getPageSize2(),manager);
//        map.put("employee", employees);
//        return map;
//    }
    @ResponseBody
    @RequestMapping(value = "/findAll2By", produces = "text/json;charset=UTF-8")
    public String findAll2By(Integer page, Integer limit, String manager) {
        List<Employee> employees = null;
        employees = employeeService.findAll2By(manager);

        Integer size = employees.size();
        if (page == null && limit == null) {
            //informs = (List) informService.findAll();
        } else {
            List<Employee> employees2 = new ArrayList<>();
            for (int i = (page - 1) * limit; i < page * (limit); i++) {
                if (i < employees.size()) {
                    employees2.add(employees.get(i));
                }
            }
            employees = employees2;
        }
        HashMap<String, Object> map = new HashMap<>();
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", size);
        map.put("data", employees);
        System.out.println(JSONObject.toJSONString(map));
        return JSONObject.toJSONString(map);
    }


    //业绩表插入-----------------------------------------------------
    @ResponseBody
    @RequestMapping("/insertPeAcc")
    public String insertPeAcc(String workTasks, String access, String weights, String cycle, Integer employeeId) {
        Performance performance = new Performance();
        performance.setAccess(access).setWeights(weights).setemployeeId(employeeId).setWorkTasks(workTasks).setCycle(cycle);
        performanceService.insert(performance);
        return "success";
    }


    //业绩表删除------------------------------------------------------
    @ResponseBody
    @RequestMapping("/deletePeAcc")
    public String deletePeAcc(int Id) {
        Performance performance = new Performance();
        performance.setId(Id);
        performanceService.delete(performance);
        return "success";
    }


    //业绩表查询-----------------------------------------------------
    @ResponseBody
    @RequestMapping(value = "/findPeAcc")
    public List<Performance> findPeAcc(Integer employeeId, String cycle) {
        Performance performance = new Performance();
        performance.setemployeeId(employeeId);
        if (cycle != null) {
            if (!cycle.equals("请选择")) {
                performance.setCycle(cycle);
            }
        }
        System.out.println(performanceService.findAllAcc(performance));
        return performanceService.findAllAcc(performance);
    }

    @ResponseBody
    @RequestMapping(value = "/findPeAccByM")
    public List<Performance> findPeAccByM(Integer employeeId, String cycle, String manager) {
        Performance performance = new Performance();
        performance.setemployeeId(employeeId);
        if (cycle != null) {
            if (!cycle.equals("请选择")) {
                performance.setCycle(cycle);
            }
        }
        System.out.println(performanceService.findPeAccByM(performance));
        return performanceService.findPeAccByM(performance);
    }


    @ResponseBody
    @RequestMapping("/setCanbu")
    public Integer setCanbu(Double canbuxishu, String cycle, Double jiabanxishu) {
        Integer salaries = performanceService.setCanbu(canbuxishu, cycle, jiabanxishu);
        return salaries;
    }

    @ResponseBody
    @RequestMapping("/setCanbuCopy")
    public Integer setCanbuCopy(Double canbuxishu, Double jiabanxishu) {
        Integer salaries = performanceService.setCanbuCopy(canbuxishu, jiabanxishu);
        return salaries;
    }


    @ResponseBody
    @RequestMapping("/setJbxs")
    public Integer setJbxs(Double jiabanxishu, String cycle, Double canbuxishu) {
        Integer salaries = performanceService.setJbxs(jiabanxishu, cycle, canbuxishu);
        return salaries;
    }

    @ResponseBody
    @RequestMapping("/setJbxsCopy")
    public Integer setJbxsCopy(Double jiabanxishu, Double canbuxishu) {
        Integer salaries = performanceService.setJbxsCopy(jiabanxishu, canbuxishu);
        return salaries;
    }


    @ResponseBody
    @PostMapping("/updatePeAcc")
    public String updatePeAcc(Performance performance) {
        List<String> cycleList = performanceService.selectCycle(performance.getemployeeId());
        if (!performance.getCycle().equals(cycleList.get(0))) {
            return "fail";
        }
        performanceService.update(performance);
        return "success";
    }

    @ResponseBody
    @RequestMapping("/selectCycle")
    public List<String> selectCycle(Integer employeeId) {
        return performanceService.selectCycle(employeeId);
    }

    @ResponseBody
    @RequestMapping("/selectAllCycle")
    public List<String> selectAllCycle() {
        return behaviorService.selectAllCycle();
    }

    @ResponseBody
    @RequestMapping("/selectBeCycle")
    public List<String> selectBeCycle(Integer employeeId) {
        return behaviorService.selectBeCycle(employeeId);
    }

    @ResponseBody
    @RequestMapping("/BeAddCycle")
    public String BeAddCycle(String cycle, Integer employeeId) {
        List<String> list = behaviorService.selectBeCycle(employeeId);
        for (int i = 0; i < list.size(); i++) {
            if (cycle.equals(list.get(i))) return "fail";
        }
        Behavior behavior = new Behavior();
        behavior.setCycle(cycle);
        behavior.setEmployeeId(employeeId);
        behaviorService.insert(behavior);
        return "success";
    }

    @ResponseBody
    @RequestMapping("/BeUpdateCycle")
    public String BeUpdateCycle(String cycle, Integer employeeId, Integer id) {
        List<String> list = behaviorService.selectBeCycle(employeeId);
        for (int i = 0; i < list.size(); i++) {
            if (cycle.equals(list.get(i))) return "fail";
        }
        Behavior behavior = new Behavior();
        behavior.setCycle(cycle);
        behavior.setId(id);
        behaviorService.updateCycle(behavior);
        return "success";
    }

    @ResponseBody
    @RequestMapping("/findBeByUserName")
    public Map<String, Object> findBeByUserName(String UserName) {
        Employee employee = new Employee();
        employee.setUserName(UserName);
        List<Employee> emlist = employeeService.findBy(employee);
        List<String> cyclelist = behaviorService.selectBeCycle(emlist.get(0).getId());
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("cyclelist", cyclelist);
        map.put("emlist", emlist);
        return map;
    }

    @ResponseBody
    @RequestMapping("/findPeByUserName")
    public Map<String, Object> findPeByUserName(String UserName) {
        Employee employee = new Employee();
        employee.setUserName(UserName);
        List<Employee> emlist = employeeService.findBy(employee);
        List<String> cyclelist = performanceService.selectCycle(emlist.get(0).getId());
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("cyclelist", cyclelist);
        map.put("emlist", emlist);
        return map;
    }

    @ResponseBody
    @RequestMapping("/copyPeAcc")
    public String copyPeAcc(Integer employeeId, String cycle, String lastcycle) {
        Performance performance = new Performance();
        performance.setemployeeId(employeeId);
        performance.setCycle(lastcycle);
        List<Performance> p = performanceService.findAllAcc(performance);
        for (int i = 0; i < p.size(); i++) {
            Performance performance1 = p.get(i);
            performance1.setCycle(cycle);
            performanceService.insert(performance1);
        }
        return "success";
    }


    @ResponseBody
    @PostMapping("/insetScore")
    public String insetScore(@RequestBody List<Performance> performanceList) {
        for (int i = 0; i < performanceList.size(); i++) {
            performanceService.update(performanceList.get(i));
        }
        return "success";
    }


    //行为表查询-----------------------------------------------------
    @ResponseBody
    @RequestMapping("/findBe")
    public Behavior findBe(String cycle, Integer employeeId) {
        Behavior behavior = new Behavior();
        behavior.setCycle(cycle);
        behavior.setEmployeeId(employeeId);
        Behavior re=behaviorService.findAllBe(behavior);
        System.out.println("结果"+re.getSum());
        return behaviorService.findAllBe(behavior);
    }

    //行为表插入/修改------------------------------------------------------
    @ResponseBody
    @RequestMapping("/updateBe")
    public String insertBe(Behavior behavior) {
        List<String> cycleList = behaviorService.selectBeCycle(behavior.getEmployeeId());
        /*
         * if(!behavior.getCycle().equals(cycleList.get(0))){
         * System.out.println(cycleList.get(0)); return "fail"; }
         */
        behaviorService.update(behavior);
        return "success";
    }

    @ResponseBody
    @RequestMapping("/updateSalary")
    public String updateSalary(Salary salary) {
        ;
        /*
         * if(!behavior.getCycle().equals(cycleList.get(0))){
         * System.out.println(cycleList.get(0)); return "fail"; }
         */
        behaviorService.updateSalary(salary);
        return "success";
    }

    @ResponseBody
    @RequestMapping("/updateSalaryCopy")
    public String updateSalaryCopy(Salary salary) {
        ;
        /*
         * if(!behavior.getCycle().equals(cycleList.get(0))){
         * System.out.println(cycleList.get(0)); return "fail"; }
         */
        behaviorService.updateSalaryCopy(salary);
        return "success";
    }


    //重置员工密码-------------------------------------------------------
    @ResponseBody
    @RequestMapping("/reset")
    public String reset(HttpServletRequest request) {
        int Id = Integer.parseInt(request.getParameter("Id"));
        employeeService.reset(Id);
        return "success";
    }

    //获取角色信息-----------------------------------------------------------
    @ResponseBody
    @RequestMapping("/getRole")
    public List<Role> getRole() {
        return employeeService.selectRole();
    }

    @ResponseBody
    @RequestMapping("/getRoleById")
    public Role getRoleById(int id) {
        return employeeService.selectRoleById(id);
    }

    //添加角色-----------------------------------------------------------
    @ResponseBody
    @RequestMapping("/addRole")
    public int addRole(Role role) {
        return employeeService.addRole(role);
    }

    //修改角色-----------------------------------------------------------
    @ResponseBody
    @RequestMapping("/updateRole")
    public int updateRole(Role role) {
        return employeeService.updateRole(role);
    }

    //删除角色-----------------------------------------------------------
    @ResponseBody
    @RequestMapping("/deleteRole")
    public int deleteRole(int id) {
        return employeeService.deleteRole(id);
    }

    //获取权限类型
    @ResponseBody
    @RequestMapping("/getPermissionByparentId")
    public List<Permission> getPermissionByparentId(int parentId) {
        return employeeService.getPermissionByparentId(parentId);
    }

    //删除员工-----------------------------------------------------------
    @ResponseBody
    @RequestMapping("/deleteByUserName")
    public String deleteByUserName(String userid, String userName) {
        int id = Integer.parseInt(userid);
        employeeService.deleteUser(id);
        employeeService.deletelearning(userName);
        return "success";
    }

    //添加员工-----------------------------------------------------------
    @ResponseBody
    @RequestMapping("/insertEm")
    public String insertEm(HttpServletRequest request) {
        Users users = new Users();
        String UserName = request.getParameter("UserName");
        String Name = request.getParameter("Name");
        if (employeeService.selectUserName(UserName) != 0) {
            return "fail";
        }
        users.setName(Name);
        users.setUserName(UserName);
        users.setPassword("123456");
        users.setPermissions("2");
        users.setRoleId(0);
        Employee employee = new Employee();
        employee.setUserName(UserName);
        employee.setName(Name);
        employeeService.insertUser(users);
        employeeService.insertlearning(UserName, Name);
        employee.setUserid(employeeService.selectByUserName(UserName));
        employeeService.insert(employee);
        return "success";
    }

    //员工管理，全部信息
    @ResponseBody
    @RequestMapping(value = "/findAllinform", produces = "text/json;charset=UTF-8")
    public String findAllinform(Integer page, Integer limit) {
        List<Employee> employees = null;
        employees = employeeService.findAllinform();

        Integer size = employees.size();
        if (page == null && limit == null) {
            //informs = (List) informService.findAll();
        } else {
            List<Employee> employees2 = new ArrayList<>();
            for (int i = (page - 1) * limit; i < page * (limit); i++) {
                if (i < employees.size()) {
                    employees2.add(employees.get(i));
                }
            }
            employees = employees2;
        }
        HashMap<String, Object> map = new HashMap<>();
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", size);
        map.put("data", employees);
        System.out.println(JSONObject.toJSONString(map));
        return JSONObject.toJSONString(map);
    }

    @ResponseBody
    @RequestMapping(value = "/findAllinformByUsername", produces = "text/json;charset=UTF-8")
    public String findAllinformByUsername(Integer page, Integer limit, String userName) {
        List<Employee> employees = null;
        employees = employeeService.findAllinformByUsername(userName);

        Integer size = employees.size();
        if (page == null && limit == null) {
            //informs = (List) informService.findAll();
        } else {
            List<Employee> employees2 = new ArrayList<>();
            for (int i = (page - 1) * limit; i < page * (limit); i++) {
                if (i < employees.size()) {
                    employees2.add(employees.get(i));
                }
            }
            employees = employees2;
        }
        HashMap<String, Object> map = new HashMap<>();
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", size);
        map.put("data", employees);
        System.out.println(JSONObject.toJSONString(map));
        return JSONObject.toJSONString(map);
    }


    //员工管理，筛选
    @ResponseBody
    @RequestMapping(value = "/findAllinformBy", produces = "text/json;charset=UTF-8")
    public String findAllinformBy(Integer page, Integer limit, String UserName, String Name, String Department) {
        List<Employee> employees = null;
        employees = employeeService.findAllinformBy(UserName, Name, Department);

        Integer size = employees.size();
        if (page == null && limit == null) {
            //informs = (List) informService.findAll();
        } else {
            List<Employee> employees2 = new ArrayList<>();
            for (int i = (page - 1) * limit; i < page * (limit); i++) {
                if (i < employees.size()) {
                    employees2.add(employees.get(i));
                }
            }
            employees = employees2;
        }
        HashMap<String, Object> map = new HashMap<>();
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", size);
        map.put("data", employees);
        System.out.println(JSONObject.toJSONString(map));
        return JSONObject.toJSONString(map);
    }

    @ResponseBody
    @RequestMapping(value = "/findAllinformByM", produces = "text/json;charset=UTF-8")
    public String findAllinformByM(Integer page, Integer limit, String UserName, String Name, String Department, String Manager) {
        List<Employee> employees = null;
        employees = employeeService.findAllinformByM(UserName, Name, Department, Manager);

        Integer size = employees.size();
        if (page == null && limit == null) {
            //informs = (List) informService.findAll();
        } else {
            List<Employee> employees2 = new ArrayList<>();
            for (int i = (page - 1) * limit; i < page * (limit); i++) {
                if (i < employees.size()) {
                    employees2.add(employees.get(i));
                }
            }
            employees = employees2;
        }
        HashMap<String, Object> map = new HashMap<>();
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", size);
        map.put("data", employees);
        System.out.println(JSONObject.toJSONString(map));
        return JSONObject.toJSONString(map);
    }


    //修改员工信息-------------------------------------------------------
    @ResponseBody
    @RequestMapping("/updateEm")
    public String updateEm(HttpServletRequest request) {
        String a = "success";
        Users users = new Users();
        Employee employee = (Employee) employeeService.findById(Integer.parseInt(request.getParameter("Id")));
        String UserName = request.getParameter("UserName");
        if (!employee.getUserName().equals(UserName)) {
            if (employeeService.selectUserName(UserName) != 0) {
                return "fail1";
            }
        }
        String Idnumber = request.getParameter("Idnumber");
        if (Idnumber != null && Idnumber != "") {
            if (!employee.getIdnumber().equals(Idnumber)) {
                if (employeeService.selectByIdnumber(Idnumber) != 0) {
                    return "fail2";
                }
            }
        }
        employee.setIdnumber(Idnumber);
        employee.setUserName(UserName);
        String Name = request.getParameter("Name");
        employee.setName(Name);
        employee.setManager(request.getParameter("Manager"));
        employee.setEmergency(request.getParameter("Emergency"));
        employee.setUserid(Integer.parseInt(request.getParameter("Userid")));
        employee.setEmergencyTel(request.getParameter("EmergencyTel"));
        employee.setRemark(request.getParameter("Remark"));
        employee.setWages(request.getParameter("Wages"));
        employee.setBasicwages(request.getParameter("Basicwages"));
        employee.setMeritpay(request.getParameter("Meritpay"));
        employee.setCard(request.getParameter("Card"));
        employee.setCloshe(request.getParameter("Closhe"));
        employee.setHat(request.getParameter("Hat"));
        employee.setDate(request.getParameter("Date"));
        employee.setPhone(request.getParameter("Phone"));
        employee.setEducation(request.getParameter("Education"));
        employee.setDepartment(Integer.valueOf(request.getParameter("Department")));
        employee.setPost(request.getParameter("Post"));
        employee.setDate(request.getParameter("date"));
        employee.setState(Integer.valueOf(request.getParameter("State")));
        employee.setLaowupaiqian(request.getParameter("Laowupaiqian"));
        employee.setCredentials1(request.getParameter("Credentials1"));
        employee.setCredentials2(request.getParameter("Credentials2"));
        employee.setCredentials3(request.getParameter("Credentials3"));
        employee.setBank(request.getParameter("bank"));
        employee.setAddress(request.getParameter("address"));
        employeeService.update(employee);
        users.setId(employee.getUserid());
        users.setUserName(UserName);
        users.setName(Name);
        users.setRoleId(Integer.valueOf(request.getParameter("roleId")));
        users.setProjectId(request.getParameter("projectId"));
        employeeService.updateUser(users);
        return a;
    }

    // Layui数据表格的后端写法，获取历史考试信息
    @ResponseBody
    @RequestMapping(value = "/findExamHis", produces = "text/json;charset=UTF-8")
    public String findExamHis(Integer page, Integer limit, String userName) {
        List<Examination> examinations = null;
        examinations = examinationServive.findExamHis(userName);

        Integer size = examinations.size();
        if (page == null && limit == null) {
            //informs = (List) informService.findAll();
        } else {
            List<Examination> examinations2 = new ArrayList<>();
            for (int i = (page - 1) * limit; i < page * (limit); i++) {
                if (i < examinations.size()) {
                    examinations2.add(examinations.get(i));
                }
            }
            examinations = examinations2;
        }
        HashMap<String, Object> map = new HashMap<>();
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", size);
        map.put("data", examinations);
        System.out.println(JSONObject.toJSONString(map));
        return JSONObject.toJSONString(map);
    }


    // Layui数据表格的后端写法，获取工时信息
    @ResponseBody
    @RequestMapping(value = "/getWorkingHoursByProPeople", produces = "text/json;charset=UTF-8")
    public String getWorkingHoursByProPeople(Integer page, Integer limit, Integer projectId, String datetime) {
        List<MaintenanceRecord> maintenanceRecords = null;
        maintenanceRecords = examinationServive.getWorkingHoursByProPeople(projectId, datetime);

        Integer size = maintenanceRecords.size();
        if (page == null && limit == null) {
            //informs = (List) informService.findAll();
        } else {
            List<MaintenanceRecord> maintenanceRecords2 = new ArrayList<>();
            for (int i = (page - 1) * limit; i < page * (limit); i++) {
                if (i < maintenanceRecords.size()) {
                    maintenanceRecords2.add(maintenanceRecords.get(i));
                }
            }
            maintenanceRecords = maintenanceRecords2;
        }
        HashMap<String, Object> map = new HashMap<>();
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", size);
        map.put("data", maintenanceRecords);
        System.out.println(JSONObject.toJSONString(map));
        return JSONObject.toJSONString(map);
    }

    //获取工资第一步
    @ResponseBody
    @RequestMapping(value = "/getSalary1", produces = "text/json;charset=UTF-8")
    public String getSalary1(Integer page, Integer limit, String datetime) {
        List<Salary> salaries = null;
        salaries = examinationServive.getSalary1(datetime);

        Integer size = salaries.size();
        if (page == null && limit == null) {
            //informs = (List) informService.findAll();
        } else {
            List<Salary> salaries2 = new ArrayList<>();
            for (int i = (page - 1) * limit; i < page * (limit); i++) {
                if (i < salaries.size()) {
                    salaries2.add(salaries.get(i));
                }
            }
            salaries = salaries2;
        }
        HashMap<String, Object> map = new HashMap<>();
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", size);
        map.put("data", salaries);
        System.out.println(JSONObject.toJSONString(map));
        return JSONObject.toJSONString(map);
    }

    @ResponseBody
    @RequestMapping(value = "/getSalary1all", produces = "text/json;charset=UTF-8")
    public String getSalary1all(Integer page, Integer limit, String datetime) {
        List<Salary> salaries = null;
        salaries = examinationServive.getSalary1(datetime);

        page = 1;
        limit = 10000;

        Integer size = salaries.size();
        if (page == null && limit == null) {
            //informs = (List) informService.findAll();
        } else {
            List<Salary> salaries2 = new ArrayList<>();
            for (int i = (page - 1) * limit; i < page * (limit); i++) {
                if (i < salaries.size()) {
                    salaries2.add(salaries.get(i));
                }
            }
            salaries = salaries2;
        }
        HashMap<String, Object> map = new HashMap<>();
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", size);
        map.put("data", salaries);
        System.out.println(JSONObject.toJSONString(map));
        return JSONObject.toJSONString(map);
    }


    @ResponseBody
    @RequestMapping(value = "/getSalary1s", produces = "text/json;charset=UTF-8")
    public String getSalary1s(Integer page, Integer limit, String datetime, String userName) {
        List<Salary> salaries = null;
        salaries = examinationServive.getSalary1s(datetime, userName);

        Integer size = salaries.size();
        if (page == null && limit == null) {
            //informs = (List) informService.findAll();
        } else {
            List<Salary> salaries2 = new ArrayList<>();
            for (int i = (page - 1) * limit; i < page * (limit); i++) {
                if (i < salaries.size()) {
                    salaries2.add(salaries.get(i));
                }
            }
            salaries = salaries2;
        }
        HashMap<String, Object> map = new HashMap<>();
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", size);
        map.put("data", salaries);
        System.out.println(JSONObject.toJSONString(map));
        return JSONObject.toJSONString(map);
    }


    //获取工资第二步
    @ResponseBody
    @RequestMapping(value = "/getSalary2", produces = "text/json;charset=UTF-8")
    public String getSalary2(Integer page, Integer limit, String yearDate, String cycleMonth, String datetime) {
        List<Salary> salaries = null;
        salaries = examinationServive.getSalary2(yearDate, cycleMonth, datetime);

        Integer size = salaries.size();
        if (page == null && limit == null) {
            //informs = (List) informService.findAll();
        } else {
            List<Salary> salaries2 = new ArrayList<>();
            for (int i = (page - 1) * limit; i < page * (limit); i++) {
                if (i < salaries.size()) {
                    salaries2.add(salaries.get(i));
                }
            }
            salaries = salaries2;
        }
        HashMap<String, Object> map = new HashMap<>();
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", size);
        map.put("data", salaries);
        System.out.println(JSONObject.toJSONString(map));
        return JSONObject.toJSONString(map);
    }

    @ResponseBody
    @RequestMapping(value = "/getSalary2s", produces = "text/json;charset=UTF-8")
    public String getSalary2s(Integer page, Integer limit, String yearDate, String cycleMonth, String userName, String datetime) {
        List<Salary> salaries = null;
        salaries = examinationServive.getSalary2s(yearDate, cycleMonth, userName, datetime);

        Integer size = salaries.size();
        if (page == null && limit == null) {
            //informs = (List) informService.findAll();
        } else {
            List<Salary> salaries2 = new ArrayList<>();
            for (int i = (page - 1) * limit; i < page * (limit); i++) {
                if (i < salaries.size()) {
                    salaries2.add(salaries.get(i));
                }
            }
            salaries = salaries2;
        }
        HashMap<String, Object> map = new HashMap<>();
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", size);
        map.put("data", salaries);
        System.out.println(JSONObject.toJSONString(map));
        return JSONObject.toJSONString(map);
    }


    //获取工资相关系数
//    @ResponseBody
//    @RequestMapping(value="/getCoe",produces = "text/json;charset=UTF-8")
//    public String getCoe(Integer page,Integer limit,String userName) {
//        List<Salary> salaries = null;
//        salaries =  examinationServive.getCoe(userName);
//
//        Integer size = salaries.size();
//        if (page == null && limit == null) {
//            //informs = (List) informService.findAll();
//        } else {
//            List<Salary> salaries2 = new ArrayList<>();
//            for (int i = (page - 1) * limit; i < page * (limit); i++) {
//                if (i < salaries.size()) {
//                    salaries2.add(salaries.get(i));
//                }
//            }
//            salaries = salaries2;
//        }
//        HashMap<String, Object> map = new HashMap<>();
//        map.put("code", 0);
//        map.put("msg", "");
//        map.put("count", size);
//        map.put("data", salaries);
//        System.out.println(JSONObject.toJSONString(map));
//        return JSONObject.toJSONString(map);
//    }


    // Layui数据表格的后端写法，获取所选员工工时信息
    @ResponseBody
    @RequestMapping(value = "/getWorkingHoursByProPeople2", produces = "text/json;charset=UTF-8")
    public String getWorkingHoursByProPeople2(Integer page, Integer limit, Integer projectId, String datetime, String name) {
        List<MaintenanceRecord> maintenanceRecords = null;
        maintenanceRecords = examinationServive.getWorkingHoursByProPeople2(projectId, datetime, name);

        Integer size = maintenanceRecords.size();
        if (page == null && limit == null) {
            //informs = (List) informService.findAll();
        } else {
            List<MaintenanceRecord> maintenanceRecords2 = new ArrayList<>();
            for (int i = (page - 1) * limit; i < page * (limit); i++) {
                if (i < maintenanceRecords.size()) {
                    maintenanceRecords2.add(maintenanceRecords.get(i));
                }
            }
            maintenanceRecords = maintenanceRecords2;
        }
        HashMap<String, Object> map = new HashMap<>();
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", size);
        map.put("data", maintenanceRecords);
        System.out.println(JSONObject.toJSONString(map));
        return JSONObject.toJSONString(map);
    }


    // Layui数据表格的后端写法，获取所选员工工时汇总信息
    @ResponseBody
    @RequestMapping(value = "/getWorkingHoursByProPeople2D", produces = "text/json;charset=UTF-8")
    public String getWorkingHoursByProPeople2D(Integer page, Integer limit, Integer projectId, String datetime) {
        List<MaintenanceRecord> maintenanceRecords = null;
        maintenanceRecords = examinationServive.getWorkingHoursByProPeople2D(projectId, datetime);

        Integer size = maintenanceRecords.size();
        if (page == null && limit == null) {
            //informs = (List) informService.findAll();
        } else {
            List<MaintenanceRecord> maintenanceRecords2 = new ArrayList<>();
            for (int i = (page - 1) * limit; i < page * (limit); i++) {
                if (i < maintenanceRecords.size()) {
                    maintenanceRecords2.add(maintenanceRecords.get(i));
                }
            }
            maintenanceRecords = maintenanceRecords2;
        }
        HashMap<String, Object> map = new HashMap<>();
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", size);
        map.put("data", maintenanceRecords);
        System.out.println(JSONObject.toJSONString(map));
        return JSONObject.toJSONString(map);
    }


    // Layui数据表格的后端写法，获取工作详情
    @ResponseBody
    @RequestMapping(value = "/getMaintenanceByDate", produces = "text/json;charset=UTF-8")
    public String getMaintenanceByDate(Integer page, Integer limit, Integer projectId, String datetime) {
        List<MaintenanceRecord> maintenanceRecords = null;
        maintenanceRecords = examinationServive.getMaintenanceByDate(projectId, datetime);

        Integer size = maintenanceRecords.size();
        if (page == null && limit == null) {
            //informs = (List) informService.findAll();
        } else {
            List<MaintenanceRecord> maintenanceRecords2 = new ArrayList<>();
            for (int i = (page - 1) * limit; i < page * (limit); i++) {
                if (i < maintenanceRecords.size()) {
                    maintenanceRecords2.add(maintenanceRecords.get(i));
                }
            }
            maintenanceRecords = maintenanceRecords2;
        }
        HashMap<String, Object> map = new HashMap<>();
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", size);
        map.put("data", maintenanceRecords);
        System.out.println(JSONObject.toJSONString(map));
        return JSONObject.toJSONString(map);
    }


    @ResponseBody
    @RequestMapping(value = "/findInf", produces = "text/json;charset=UTF-8")
    public String findInf(Integer page, Integer limit, String dim, String userName, String type2) {
        List<Inform> informs = null;
        if (dim != null) {
            informs = informService.findBy(dim, userName, type2);
        } else {
            informs = (List) informService.findAll();
        }
        Integer size = informs.size();
        if (page == null && limit == null) {
            //informs = (List) informService.findAll();
        } else {

            List<Inform> informs2 = new ArrayList<>();
            for (int i = (page - 1) * limit; i < page * (limit); i++) {
                if (i < informs.size()) {
                    if (informs.get(i).getFiledir() != null) {
                        String fileName = informs.get(i).getFiledir();
                        String fileNames[] = fileName.split("/");
                        informs.get(i).setFileName(fileNames[fileNames.length - 1]);
                    }
                    informs2.add(informs.get(i));
                }
            }
            informs = informs2;
        }
        HashMap<String, Object> map = new HashMap<>();
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", size);
        map.put("data", informs);
        System.out.println(JSONObject.toJSONString(map));
        return JSONObject.toJSONString(map);

    }


    //员工信息Excel导出------------------------------------------------------------------
    @ResponseBody
    @RequestMapping("/export")
    public void export(HttpServletResponse response, HttpServletRequest request) throws IOException {
        List<Employee> employees = (List) employeeService.findAll();

        String[] columnName = new String[]{"序号", "员工编号", "姓名", "项目部", "身份证号", "工资卡号"
                , "电话", "工作服尺寸", "安全帽编号", "应急联系人", "应急联系人电话", "是否劳务派遣"
                , "学历", "证书1", "证书2", "证书3", "岗位", "入职时间", "备注", "待遇标准", "基本工资", "绩效工资"};
        HSSFCell[][] cells = new HSSFCell[employees.size() + 1][columnName.length];
        HSSFRow[] rows = new HSSFRow[employees.size() + 1];
        //创建新工作簿
        HSSFWorkbook workbook = new HSSFWorkbook();
        //新建工作表
        HSSFSheet sheet = workbook.createSheet("sheet");
        //创建行,行号作为参数传递给createRow()方法,第一行从0开始计算
        rows[0] = sheet.createRow(0);
        //创建单元格,row已经确定了行号,列号作为参数传递给createCell(),第一列从0开始计算

        for (int i = 0; i < columnName.length; i++) {
            cells[i][0] = rows[0].createCell(i);
            cells[i][0].setCellValue(columnName[i]);
        }
        for (int i = 1; i < employees.size() + 1; i++) {
            rows[i] = sheet.createRow(i);
            String[] rowList = employees.get(i - 1).getExcelRow();
            for (int j = 0; j < columnName.length; j++) {
                if (j == 0) {
                    cells[i][j] = rows[i].createCell(j);
                    cells[i][j].setCellValue(i);
                } else {
                    cells[i][j] = rows[i].createCell(j);

                    cells[i][j].setCellValue(rowList[j - 1]);
                }

            }
        }
        try {
            String fileName = null;
            String agent = request.getHeader("USER-AGENT");
            if (null != agent && -1 != agent.indexOf("MSIE") || null != agent && -1 != agent.indexOf("Trident")) { //ie
                fileName = URLEncoder.encode("员工信息表", "UTF-8");
            } else if (null != agent && -1 != agent.indexOf("Mozilla")) { //火狐，chrome等
                fileName = new String("员工信息表".getBytes(), "ISO8859-1");
            }
            OutputStream out = response.getOutputStream();
            response.reset();
            response.setHeader("Content-disposition", "attachment; filename=" + fileName + ".xls");
            response.setContentType("application/ms-excel");
            workbook.write(out);
            out.flush();
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    //绩效考核Excel导出------------------------------------------------------------------
    @ResponseBody
    @RequestMapping("/appraiseexport")
    public void appraiseexport(HttpServletResponse response, HttpServletRequest request, String cycle) throws IOException {
        List<String> UserNames = (List) employeeService.findEmUserName();
        List<String[]> content = new ArrayList<>();
        Employee employee = null;
        Behavior behavior = null;
        Behavior b = new Behavior();
        Performance performance = new Performance();
        List<Performance> performanceList = null;
        String[] columnName = new String[]{"序号", "员工编号", "姓名", "部门", "岗位", "工作目标责任分数", "乘权重后分数",
                "工作行为分数", "乘权重后分数", "绩效考核总分", "考核系数"};
        for (int i = 0; i < UserNames.size(); i++) {
            double weights = 0;
            double score = 0;
            String[] list = new String[10];
            int id = employeeService.findIdByUserName(UserNames.get(i));
            employee = (Employee) employeeService.findById(id);
            list[0] = UserNames.get(i);
            list[1] = employee.getName();
            list[2] = employee.getDepartmentName();
            list[3] = employee.getPost();
            performance.setCycle(cycle).setemployeeId(id);
            performanceList = performanceService.findAllAcc(performance);
            if (performanceList.size() != 0) {
                for (int j = 0; j < performanceList.size(); j++) {
                    performance = performanceList.get(j);
                    if (performance.getScore() != null && !performance.getScore().equals("")) {
                        score += Double.parseDouble(performance.getScore());
                    }
                }
                list[4] = String.valueOf(score);
                list[5] = String.valueOf(score / 2);
            } else {
                list[4] = "0";
                list[5] = "0";
            }
            b.setCycle(cycle);
            b.setEmployeeId(id);
            behavior = behaviorService.findAllBe(b);
            if (behavior == null) {
                list[6] = "0";
                list[7] = "0";
            } else {
                if (behavior.getSum() == null) {
                    list[6] = "0";
                    list[7] = "0";
                } else {
                    list[6] = behavior.getSum();
                    double s = Double.parseDouble(behavior.getSum()) / 2;
                    list[7] = String.valueOf(s);
                }

            }


            list[8] = String.valueOf(Double.parseDouble(list[4]) + Double.parseDouble(list[6]));
            list[9] = String.valueOf((Double.parseDouble(list[4]) + Double.parseDouble(list[6])) / 80);
            content.add(list);
        }
        HSSFCell[][] cells = new HSSFCell[UserNames.size() + 1][columnName.length];
        HSSFRow[] rows = new HSSFRow[UserNames.size() + 1];
        //创建新工作簿
        HSSFWorkbook workbook = new HSSFWorkbook();
        //新建工作表
        HSSFSheet sheet = workbook.createSheet("sheet");
        //创建行,行号作为参数传递给createRow()方法,第一行从0开始计算
        rows[0] = sheet.createRow(0);
        //创建单元格,row已经确定了行号,列号作为参数传递给createCell(),第一列从0开始计算
        for (int i = 0; i < columnName.length; i++) {
            cells[i][0] = rows[0].createCell(i);
            cells[i][0].setCellValue(columnName[i]);
        }
        for (int i = 1; i < UserNames.size() + 1; i++) {
            rows[i] = sheet.createRow(i);
            String[] rowList = content.get(i - 1);
            for (int j = 0; j < columnName.length; j++) {
                if (j == 0) {
                    cells[i][j] = rows[i].createCell(j);
                    cells[i][j].setCellValue(i);
                } else {
                    cells[i][j] = rows[i].createCell(j);
                    cells[i][j].setCellValue(rowList[j - 1]);
                }
            }

        }
        try {
            String fileName = null;
            String agent = request.getHeader("USER-AGENT");
            if (null != agent && -1 != agent.indexOf("MSIE") || null != agent && -1 != agent.indexOf("Trident")) { //ie
                fileName = URLEncoder.encode("绩效考核表", "UTF-8");
            } else if (null != agent && -1 != agent.indexOf("Mozilla")) { //火狐，chrome等
                fileName = new String("绩效考核表".getBytes(), "ISO8859-1");
            }
            OutputStream out = response.getOutputStream();
            response.reset();
            response.setHeader("Content-disposition", "attachment; filename=" + fileName + ".xls");
            response.setContentType("application/ms-excel");
            workbook.write(out);
            out.flush();
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    //获取项目部---------------------------------------------------------
    @ResponseBody
    @RequestMapping("/getProjectTeam")
    public List<ProjectTeam> find(HttpServletRequest request) {
//        Map<String, Object> map = new HashMap<String, Object>();
//        int currentPage = Integer.parseInt(request.getParameter("currentPage"));
//        PageBean pageBean = new PageBean();
//        List<Employee> employees = (List) employeeService.findByPage(currentPage, pageBean.getPageSize());
//        map.put("employee", employees);
//        int count = employeeService.getCount() / 13 + 1;
//        map.put("total", count);
//        ProjectService.insert(inform);
        List<ProjectTeam> projectTeams = (List) projectService.find();
        return projectTeams;
    }

    @ResponseBody
    @RequestMapping("/getCoe")
    public List<Salary> getCoe(String cycle) {
        List<Salary> salaries = (List) projectService.getCoe(cycle);
        return salaries;
    }

    @ResponseBody
    @RequestMapping("/getCoe2")
    public List<Salary> getCoe2(String cycle) {
        List<Salary> salaries = (List) projectService.getCoe2(cycle);
        return salaries;
    }

    @ResponseBody
    @RequestMapping("/updateXishu")
    public List<Salary> updateXishu(String cycle, String canbuxishu, String jiabanxishu) {
        List<Salary> salaries = (List) projectService.updateXishu(cycle, canbuxishu, jiabanxishu);
        return salaries;
    }


    //通知删除-----------------------------------------------------------
    @ResponseBody
    @RequestMapping("/deleteInf")
    public String deleteInf(Integer Id, HttpServletRequest request) {
        Inform inform = (Inform) informService.findById(Id);
        informService.delete(inform);
        String fileName = inform.getFiledir();
        if (fileName != null & fileName != "") {
            File file = new File(fileName);
            if (!file.exists()) {
                //System.out.println("删除文件失败:" + fileName + "不存在！");
                return "删除文件失败:" + fileName + "不存在！";
            } else {
                if (file.isFile()) {
                    file.delete();
                    return "success";
                }
            }
        }
        return "success";
    }

    //通知修改-----------------------------------------------------------
    @ResponseBody
    @RequestMapping("/updateInf")
    public String updateInf(HttpServletRequest request, HttpSession session, @RequestParam("ufiles") MultipartFile file) throws IOException {
        String message = "";
        String filedir;
        int Id = Integer.parseInt(request.getParameter("id"));
        Inform inform = (Inform) informService.findById(Id);
        if (!file.isEmpty()) {
            String fileName = inform.getFiledir();
            if (fileName != null & fileName != "") {
                File files = new File(fileName);
                files.delete();
            }
            message = file.getOriginalFilename();//现在的文件名是时间戳加原文件名，出现图片相同时，读取不出来的bug
            String realPath = "D:/123/" + System.currentTimeMillis();//将文件保存在当前工程下的一个upload文件
            File file1 = new File(realPath);
            FileUtils.copyInputStreamToFile(file.getInputStream(), new File(realPath, message));//将文件的输入流输出到一个新的文件
            filedir = realPath + "/" + message;
            inform.setFiledir(filedir);
        }
        String Title = request.getParameter("title");
        String Content = request.getParameter("content");
        Integer Type1 = Integer.valueOf(request.getParameter("type1"));
        Integer Type2 = Integer.valueOf(request.getParameter("type2"));

        Date date = new Date();
        SimpleDateFormat sim = new SimpleDateFormat("yyyy-MM-dd");
        inform.setName((String) session.getAttribute("Name"));
        inform.setTitle(Title);
        inform.setTime(sim.format(date));
        inform.setContent(Content);
        inform.setType1(Type1);
        inform.setType2(Type2);
        informService.update(inform);
        return "success";
    }


    //添加通知------------------------------------------------------------
    @ResponseBody
    @RequestMapping(value = "/addInf", produces = "text/html;charset=utf-8")
    public String addInf(String title, String content, Integer type1, Integer type2, HttpSession session, @RequestParam("files") MultipartFile file) {
        String message = "";
        String filedir;
        Inform inform = new Inform();
        try {
            if (!file.isEmpty()) {
                message = file.getOriginalFilename();//现在的文件名是时间戳加原文件名，出现图片相同时，读取不出来的bug
                String realPath = "D:/123/" + System.currentTimeMillis();//将文件保存在当前工程下的一个upload文件
                File dir = new File(realPath);
                FileUtils.copyInputStreamToFile(file.getInputStream(), new File(realPath, message));//将文件的输入流输出到一个新的文件
                filedir = realPath + "/" + message;
                inform.setFiledir(filedir);
            }
        } catch (Exception e) {
            return "error";
        }
        Date date = new Date();
        SimpleDateFormat sim = new SimpleDateFormat("yyyy-MM-dd");
        String newdate = sim.format(date);
        inform.setName((String) session.getAttribute("Name"));
        inform.setContent(content);
        inform.setTime(newdate);
        inform.setTitle(title);
        inform.setType1(type1);
        inform.setType2(type2);
        informService.insert(inform);
        return "success";
    }

    @ResponseBody
    @RequestMapping("/download")
    public void download(Integer id, HttpServletRequest request, HttpServletResponse response) throws IOException {
        Inform inf = (Inform) informService.findById(id);
        String path = inf.getFiledir();
        String fileNames[] = path.split("/");
        String fileName = (fileNames[fileNames.length - 1]);
//        if(path!=null&path!=""){
        //要改成Linux下的绝对路径
        URL url = new URL("file://" + path);//设置下载本地文件的时候需要加file:// 否则报错
        URLConnection uc = url.openConnection();
        response.setContentType("application/octet-stream");//设置文件类型
        response.setHeader("content-disposition", "attachment;filename=" + URLEncoder.encode(fileName, "UTF-8"));
        response.setHeader("Content-Length", String.valueOf(uc.getContentLength()));
        //设置不会打开文件
        OutputStream outp = response.getOutputStream();
        BufferedInputStream in = new BufferedInputStream(new FileInputStream(path));
        byte[] b = new byte[1024];
        int i = 0;
        while ((i = in.read(b)) > 0) {
            outp.write(b, 0, i);
        }
        outp.flush();
        in.close();
        outp.close();
    }
//    }


    //添加角色权限-----------------------------------------------------------
    @ResponseBody
    @RequestMapping("/updateRolePermission")
    public int updateRolePermission(int roleId, String permissionIds) {
        employeeService.updateRolePermission(roleId, permissionIds);
        return 0;
    }

    //获取角色权限
    @ResponseBody
    @RequestMapping("/getRolePermissionByRoleId")
    public List<RolePermission> getRolePermissionByRoleId(int roleId) {
        return employeeService.getRolePermissionByRoleId(roleId);
    }


    /**
     * 获取操作的权限
     *
     * @param userId
     * @return
     */
    @ResponseBody
    @RequestMapping("/getPermissionByPermissionId")
    public boolean getPermissionByPermissionId(String userName, int permissionId, int projectId) {
        if ("admin".equals(userName)) {
            return true;
        }
        Permission permission = employeeService.getPermissionByPermissionId(userName, permissionId);
        if (permission == null) {
            return false;
        }
        if (permission.getType() == 0) {
            return false;
        }
        String[] perjectIds = permission.getProjectId().split(",");

        boolean bl = false;
        for (String perjectId1 : perjectIds) {
            if (projectId == Integer.valueOf(perjectId1)) {
                bl = true;
            }
        }
        return bl;
    }

    /**
     * 获取页面的权限
     *
     * @param userId
     * @return
     */
    @ResponseBody
    @RequestMapping("/getPermissionByUserId")
    public List<Permission> getPermissionByUserId(String userName) {
        if ("admin".equals(userName)) {
            return employeeService.getPermissionByAdmin();
        }
        return employeeService.getPermissionByUserId(userName);
    }

    /**
     * 获取页面的权限
     *
     * @param userId
     * @return
     */
    @ResponseBody
    @RequestMapping("/getPermissionByUserIdAndPermissionId")
    public boolean getPermissionByUserIdAndPermissionId(String userName, int permissionId) {
        Permission permission = employeeService.getPermissionByPermissionId(userName, permissionId);
        if (permission == null) {
            return false;
        }
        if (permission.getType() == 0) {
            return false;
        } else {
            return true;
        }

    }

    @ResponseBody
    @RequestMapping("/getRoleAndProjectByUserName")
    public List<Permission> getRoleAndProjectByUserName(String userName) {
        return employeeService.getRoleAndProjectByUserName(userName);
    }

    @ResponseBody
    @RequestMapping("/getDepartmentByUsername")
    public List<Department> getDepartmentByUsername(String userName) {
        return employeeService.getDepartmentByUsername(userName);
    }

    /**
     * 获取考核成绩
     *
     * @param userName
     * @return
     */
    @ResponseBody
    @RequestMapping("/getAssessment")
    public List<Assessment> getAssessment(String cycle) {
        return behaviorService.getAssessment(cycle);
    }

    @ResponseBody
    @RequestMapping("/getAssessmentBy")
    public List<Assessment> getAssessmentBy(String cycle, String manager) {
        return behaviorService.getAssessmentBy(cycle, manager);
    }


    /**
     * 获取个人考核成绩
     *
     * @param userName
     * @return
     */
    @ResponseBody
    @RequestMapping("/getAssessmentByUserName")
    public Assessment getAssessmentByUserName(String cycle, String userName) {
        return behaviorService.getAssessmentByUserName(cycle, userName);
    }


    /**
     * 获取个人考核成绩
     *
     * @param userName
     * @return
     */
    @ResponseBody
    @RequestMapping("/getAssessmentByEmployeeId")
    public Assessment getAssessmentByEmployeeId(String cycle, String employeeId) {
        return behaviorService.getAssessmentByEmployeeId(cycle, employeeId);
    }

    @ResponseBody
    @RequestMapping("/downAssessment")
    public void downAssessment(String cycle, HttpServletResponse response) {
        List<Assessment> assessments = behaviorService.getAssessment(cycle);
        String[] title = {"员工编号", "员工名称 ", "项目部", "劳务派遣", "值班天数 ", "考勤天数 ", "净绩效 ", "综合绩效 ", "基本工资", "绩效工资", "餐补", "通讯补助", "应付工资"};
        // map中的key
        String keys[] = {"userName", "name", "department", "laowupaiqian", "zhiban", "kaoqin", "netPerformance", "comprehensivePerformance", "basicwages", "meritpay", "mealSupplement", "phoneAllowance", "wagePayable"};
        String fileName = cycle + "员工绩效总览";
        try {
            ExportExcelUtils.start_download1(response, fileName, assessments, title, keys);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    /**
     * 获取项目部
     *
     * @return
     */
    @ResponseBody
    @RequestMapping("/getDepartment")
    public List<Department> getDepartment() {
        return employeeService.getDepartment();
    }


}

