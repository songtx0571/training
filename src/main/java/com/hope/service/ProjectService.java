package com.hope.service;

import com.hope.domain.ProjectTeam;
import com.hope.domain.Salary;
import com.hope.mapper.Projectmapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService extends CommonCrudservice {

    Projectmapper projectmapper;

    @Autowired

    public ProjectService(Projectmapper projectmapper) {
        super(projectmapper);
        this.projectmapper = projectmapper;
    }

    public List<ProjectTeam> find() {
        return projectmapper.find();
    }

    public List<Salary> getCoe(String cycle) {
        return projectmapper.getCoe(cycle);
    }

    public List<Salary> getCoe2(String cycle) {
        return projectmapper.getCoe2(cycle);
    }

    public List<Salary> updateXishu(String cycle, String canbuxishu, String jiabanxishu) {
        return projectmapper.updateXishu(cycle, canbuxishu, jiabanxishu);
    }

    public List<Salary> setCanbu(Double canbuxishu) {
        return projectmapper.setCanbu(canbuxishu);
    }


}
