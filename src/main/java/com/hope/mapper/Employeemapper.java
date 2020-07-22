package com.hope.mapper;

import com.hope.domain.*;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
public interface Employeemapper extends Commonmapper {

    List<Employee> findBy(@Param("employee") Employee employee);

    List<Employee> findAllinform();

    List<Employee> findAll2By(@Param("manager") String manager);


    List<Object> findAllByM(@Param("manager") String manager);

    List<Employee> findAllinformByUsername(@Param("userName") String userName);

    List<Employee> findAllinformBy(@Param("UserName") String UserName, @Param("Name") String Name, @Param("Department") String Department);

    List<Employee> findAllinformByM(@Param("UserName") String UserName, @Param("Name") String Name, @Param("Department") String Department, @Param("Manager") String Manager);


    int countEmployee();

    int selectByUserName(@Param("UserName") String UserName);

    int selectByIdnumber(@Param("Idnumber") String Idnumber);

    int selectUserName(@Param("UserName") String UserName);

    int findIdByUserName(@Param("UserName") String UserName);

    void reset(@Param("Id") int Id);

    void updateUser(@Param("users") Users users);

    void insertUser(@Param("users") Users users);

    void deleteUser(@Param("id") int id);

    void insertlearning(@Param("UserName") String UserName, @Param("Name") String Name);

    void deletelearning(@Param("UserName") String UserName);

    List<String> findEmUserName();

    List<String> findEmUserName1();

    List<String> findappraiseUserName(@Param("Manager") String Manager);

    List<Role> selectRole();

    Role selectRoleById(@Param("id") int id);

    int addRole(@Param("role") Role role);

    int updateRole(@Param("role") Role role);

    int deleteRole(@Param("id") int id);

    List<Permission> getPermissionByparentId(@Param("parentId") int parentId);

    int getCountRolePermission(@Param("roleId") int roleId, @Param("permissionId") String permissionId);

    int changRolePermissionTypeByRoleId(@Param("roleId") int roleId);

    int changRolePermissionTypeByPermissionId(@Param("roleId") int roleId, @Param("permissionId") String permissionId);

    int addRolePermission(@Param("roleId") int roleId, @Param("permissionId") String permissionId);

    List<RolePermission> getRolePermissionByRoleId(@Param("roleId") int roleId);

    Permission getPermissionByPermissionId(@Param("userName") String userName, @Param("permissionId") int permissionId);

    List<Permission> getPermissionByUserId(@Param("userName") String userName);

    List<Permission> getRoleAndProjectByUserName(@Param("userName") String userName);

    List<Permission> getPermissionByAdmin();

    List<Department> getDepartment();

    List<Department> getDepartmentByUsername(@Param("userName") String userName);

}
