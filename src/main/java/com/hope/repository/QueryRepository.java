package com.hope.repository;

import com.hope.bean.ConfigBean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class QueryRepository {
    private JdbcTemplate db = null;

    public QueryRepository(ConfigBean configBean) {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(configBean.getJdbcDriverName());
        dataSource.setUrl(configBean.getDBUrl());
        dataSource.setUsername(configBean.getDBUserName());
        dataSource.setPassword(configBean.getDBPassword());
        db = new JdbcTemplate(dataSource);
    }

    public final List<String> ExecuteSql(String sql) {
        ArrayList<String> rltList = new ArrayList<String>();
        String sqlUpper = sql.toUpperCase();

        if (sqlUpper.contains("INSERT") || sqlUpper.contains("UPDATE") || sqlUpper.contains("DELETE")) {
            Integer count = db.update(sql);
            rltList.add(count.toString());
            return rltList;
        }

        List rows = db.queryForList(sql);
        Iterator it = rows.iterator();
        int k = 0;
        while (it.hasNext()) {
            Map map = (Map) it.next();
            String data = "";
            for (Object key : map.keySet()) {
                String val = map.get(key).toString();
                data += val + "||";
            }
            rltList.add(data);
        }

        return rltList;
    }
}
