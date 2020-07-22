package com.hope.util;

/**
 * 判断是电脑登录还是手机登录
 *
 * @author 呵呵
 */
public class JudgeRequestDeviceUtil {
    /**
     * android : 所有android设备
     * mac os : iphone ipad
     * windows phone:Nokia等windows系统的手机
     *
     * @param requestHeader
     * @return
     */
    public static boolean isMobileDevice(String requestHeader) {

        String[] deviceArray = new String[]{"android", "iphone", "ipad", "windows phone"};
        if (requestHeader == null)
            return false;
        requestHeader = requestHeader.toLowerCase();
        for (int i = 0; i < deviceArray.length; i++) {
            if (requestHeader.indexOf(deviceArray[i]) > 0) {
                return true;
            }
        }
        return false;
    }
}
