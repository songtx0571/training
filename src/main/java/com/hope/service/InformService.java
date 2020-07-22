package com.hope.service;

import com.github.pagehelper.PageHelper;
import com.hope.domain.Inform;
import com.hope.domain.PageBean;
import com.hope.mapper.Informmapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class InformService extends CommonCrudservice {
    Informmapper informmapper;

    @Autowired
    public InformService(Informmapper informmapper) {
        super(informmapper);
        this.informmapper = informmapper;
    }

    public int getCount() {
        return informmapper.count();
    }

    public List<Inform> findBy(String dim, String userName, String type2) {
        return informmapper.findBy(dim, userName, type2);
    }

    public List<Object> findByPage(int currentPage, int pageSize, String dim, String userName, String type2) {
        PageHelper.startPage(currentPage, pageSize);
        List<Object> allItems = (List) informmapper.findBy(dim, userName, type2);        //全部商品
        int countNums = informmapper.count();            //总记录数
        PageBean<Object> pageData = new PageBean<>(currentPage, pageSize, countNums);
        pageData.setItems(allItems);
        return pageData.getItems();
    }
}
