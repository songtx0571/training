package com.hope.web;

import com.hope.util.JudgeRequestDeviceUtil;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@RestController
@RequestMapping("HomeController")
public class HomeController {


    @RequestMapping("home")
    public ModelAndView task(HttpServletRequest request, HttpServletResponse response) throws IOException {
        ModelAndView view = new ModelAndView();
        String requestHeader = request.getHeader("user-agent");
        if (JudgeRequestDeviceUtil.isMobileDevice(requestHeader)) {
            view.setViewName("homePhone");
        } else {
            view.setViewName("home");
        }
        return view;
    }


    @RequestMapping("unprivileged")
    public ModelAndView unprivileged(HttpServletRequest request, HttpServletResponse response) throws IOException {
        ModelAndView view = new ModelAndView();
        view.setViewName("Unprivileged");
        return view;
    }
}
