package com.hope.bean;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "hope")
public class ConfigBean {
    //	@Value("${test.JdbcDriverName}")
    private String JdbcDriverName;
    //	@Value("${test.DBUrl}")
    private String DBUrl;
    //	@Value("${test.DBUserName}")
    private String DBUserName;
    //	@Value("${test.DBPassword}")
    private String DBPassword;

    public String getJdbcDriverName() {
        return JdbcDriverName;
    }

    public void setJdbcDriverName(String DriverName) {
        JdbcDriverName = DriverName;
    }

    public String getDBUrl() {
        return DBUrl;
    }

    public void setDBUrl(String Url) {
        DBUrl = Url;
    }

    public String getDBUserName() {
        return DBUserName;
    }

    public void setDBUserName(String UserName) {
        DBUserName = UserName;
    }

    public String getDBPassword() {
        return DBPassword;
    }

    public void setDBPassword(String Password) {
        DBPassword = Password;
    }
}
