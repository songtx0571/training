package com.hope.mapper;


import com.hope.domain.Assessment;
import com.hope.domain.Behavior;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
public interface Behaviormapper extends Commonmapper {
    Behavior findAll(@Param("behavior") Behavior behavior);

    List<String> selectBeCycle(@Param("employeeId") Integer employeeId);

    void updateCycle(@Param("behavior") Behavior behavior);

    List<String> selectAllCycle();

    List<Assessment> getAssessment(@Param("cycle") String cycle);

    List<Assessment> getAssessmentBy(@Param("cycle") String cycle, @Param("manager") String manager);


    Assessment getAssessmentByUserName(@Param("cycle") String cycle, @Param("userName") String userName);

    Assessment getAssessmentByEmployeeId(@Param("cycle") String cycle, @Param("employeeId") String employeeId);

    Behavior selscore(@Param("cycle") String cycle, @Param("week") String week);

    void updateWeek(Behavior behavior);
}
