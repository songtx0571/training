package com.hope;

import com.github.pagehelper.PageHelper;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Properties;

//@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
//@EnableConfigurationProperties({ConfigBean.class})
@SpringBootApplication(scanBasePackages = "com.hope")
@MapperScan("com.hope.mapper")
public class Training1Application {

    public static void main(String[] args) {
        SpringApplication.run(Training1Application.class, args);

    }

    @Bean
    public PageHelper pageHelper() {
        PageHelper pageHelper = new PageHelper();
        Properties properties = new Properties();
        properties.setProperty("offsetAsPageNum", "true");
        properties.setProperty("rowBoundsWithCount", "true");
        properties.setProperty("reasonable", "true");
        properties.setProperty("dialect", "mysql");    //配置mysql数据库的方言
        pageHelper.setProperties(properties);
        return pageHelper;
    }
}
