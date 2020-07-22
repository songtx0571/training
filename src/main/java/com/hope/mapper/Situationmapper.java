package com.hope.mapper;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

@Component
//@Mapper
public interface Situationmapper {
    Integer selecttimes(@Param("UserName") String UserName);

    void updatetime(@Param("UserName") String UserName, @Param("times") Integer times);
}
