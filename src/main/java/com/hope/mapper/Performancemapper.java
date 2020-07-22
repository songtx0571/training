package com.hope.mapper;

import com.hope.domain.Performance;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface Performancemapper extends Commonmapper {
    List<Performance> findAll(@Param("performance") Performance performance);

    List<Performance> findPeAccByM(@Param("performance") Performance performance);

    Integer setCanbu(@Param("canbuxishu") Double canbuxishu, @Param("cycle") String cycle, @Param("jiabanxishu") Double jiabanxishu);

    Integer setCanbuCopy(@Param("canbuxishu") Double canbuxishu, @Param("jiabanxishu") Double jiabanxishu);

    Integer setJbxs(@Param("jiabanxishu") Double jiabanxishu, @Param("cycle") String cycle, @Param("canbuxishu") Double canbuxishu);

    Integer setJbxsCopy(@Param("jiabanxishu") Double jiabanxishu, @Param("canbuxishu") Double canbuxishu);


    List<String> selectCycle(@Param("employeeId") Integer employeeId);

}
