package com.hope.service;

import com.hope.domain.*;
import com.hope.mapper.Employeemapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService extends CommonCrudservice {

    Employeemapper employeemapper;

    @Autowired
    public EmployeeService(Employeemapper employeemapper) {
        super(employeemapper);
        this.employeemapper = employeemapper;
    }

    public List<Employee> findBy(Employee employee) {
        return employeemapper.findBy(employee);
    }

    public List<Employee> findAllinform() {
        return employeemapper.findAllinform();
    }

    public List<Employee> findAll2By(String manager) {
        return employeemapper.findAll2By(manager);
    }

    public List<Employee> findAllinformByUsername(String userName) {
        return employeemapper.findAllinformByUsername(userName);
    }

    public List<Employee> findAllinformBy(String UserName, String Name, String Department) {
        return employeemapper.findAllinformBy(UserName, Name, Department);
    }

    public List<Employee> findAllinformByM(String UserName, String Name, String Department, String Manager) {
        return employeemapper.findAllinformByM(UserName, Name, Department, Manager);
    }


    public int selectByUserName(String UserName) {
        return employeemapper.selectByUserName(UserName);
    }

    public void insertlearning(String UserName, String Name) {
        employeemapper.insertlearning(UserName, Name);
    }

    public void deletelearning(String UserName) {
        employeemapper.deletelearning(UserName);
    }


    public int selectByIdnumber(String Idnumber) {
        return employeemapper.selectByIdnumber(Idnumber);
    }

    public int findIdByUserName(String UserName) {
        return employeemapper.findIdByUserName(UserName);
    }

    public void reset(int Id) {
        employeemapper.reset(Id);
    }

    public int selectUserName(String UserName) {
        return employeemapper.selectUserName(UserName);
    }

    public List<String> findEmUserName() {
        return employeemapper.findEmUserName();
    }

    public List<String> findEmUserName1() {
        return employeemapper.findEmUserName1();
    }

    public List<String> findappraiseUserName(String Manager) {
        return employeemapper.findappraiseUserName(Manager);
    }


    public int getCount() {
        return employeemapper.count();
    }

    public void updateUser(Users users) {
        employeemapper.updateUser(users);
    }

    public void insertUser(Users users) {
        employeemapper.insertUser(users);
    }

    public void deleteUser(int id) {
        employeemapper.deleteUser(id);
    }

    public int addRole(Role role) {
        return employeemapper.addRole(role);
    }

    public int updateRole(Role role) {
        return employeemapper.updateRole(role);
    }

    public int deleteRole(int id) {
        return employeemapper.deleteRole(id);
    }

    public List<Role> selectRole() {
        return employeemapper.selectRole();
    }

    public Role selectRoleById(int id) {
        return employeemapper.selectRoleById(id);
    }

    public List<Permission> getPermissionByparentId(int parentId) {
        return employeemapper.getPermissionByparentId(parentId);
    }


    public int updateRolePermission(int roleId, String PermissionIds) {
        employeemapper.changRolePermissionTypeByRoleId(roleId);
        String[] PermissionId = PermissionIds.split(",");
        for (String permissionId : PermissionId) {
            int num = employeemapper.getCountRolePermission(roleId, permissionId);
            if (num == 0) {
                employeemapper.addRolePermission(roleId, permissionId);
            } else {
                employeemapper.changRolePermissionTypeByPermissionId(roleId, permissionId);
            }
        }
        return 1;
    }

    public List<RolePermission> getRolePermissionByRoleId(int roleId) {
        return employeemapper.getRolePermissionByRoleId(roleId);
    }


    public Permission getPermissionByPermissionId(String userName, int permissionId) {
        return employeemapper.getPermissionByPermissionId(userName, permissionId);
    }

    public List<Permission> getPermissionByUserId(String userName) {
        return employeemapper.getPermissionByUserId(userName);
    }

    public List<Permission> getRoleAndProjectByUserName(String userName) {
        return employeemapper.getRoleAndProjectByUserName(userName);
    }


    public List<Permission> getPermissionByAdmin() {
        List<Permission> permissions = employeemapper.getPermissionByAdmin();
        for (Permission permission : permissions) {
            permission.setType(1);
        }
        return permissions;
    }

    public List<Department> getDepartment() {
        return employeemapper.getDepartment();
    }

    public List<Department> getDepartmentByUsername(String userName) {
        return employeemapper.getDepartmentByUsername(userName);
    }


}
