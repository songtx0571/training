package com.hope.mapper;


import com.hope.domain.Inform;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface Informmapper extends Commonmapper {
    List<Inform> findBy(@Param("dim") String dim, @Param("userName") String userName, @Param("type2") String type2);
}
