package com.hope.service;

import com.hope.domain.Performance;
import com.hope.mapper.Performancemapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class PerformanceService extends CommonCrudservice {
    Performancemapper performancemapper;

    @Autowired
    public PerformanceService(Performancemapper performancemapper) {
        super(performancemapper);
        this.performancemapper = performancemapper;
    }

    public List<Performance> findAllAcc(Performance performance) {
        return performancemapper.findAll(performance);
    }

    public List<Performance> findPeAccByM(Performance performance) {
        return performancemapper.findPeAccByM(performance);
    }


    public Integer setCanbu(Double canbuxishu, String cycle, Double jiabanxishu) {
        return performancemapper.setCanbu(canbuxishu, cycle, jiabanxishu);
    }

    public Integer setCanbuCopy(Double canbuxishu, Double jiabanxishu) {
        return performancemapper.setCanbuCopy(canbuxishu, jiabanxishu);
    }


    public Integer setJbxs(Double jiabanxishu, String cycle, Double canbuxishu) {
        return performancemapper.setJbxs(jiabanxishu, cycle, canbuxishu);
    }

    public Integer setJbxsCopy(Double jiabanxishu, Double canbuxishu) {
        return performancemapper.setJbxsCopy(jiabanxishu, canbuxishu);
    }


    public List<String> selectCycle(int employeeId) {
        return performancemapper.selectCycle(employeeId);
    }

}
