package com.hope.service;

import com.hope.mapper.Situationmapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SituationService {
    @Autowired
    private Situationmapper situationmapper;

    public Integer selecttimes(String UserName) {
        return situationmapper.selecttimes(UserName);
    }

    public void updatetime(String UserName, Integer times) {
        situationmapper.updatetime(UserName, times);
    }

}
