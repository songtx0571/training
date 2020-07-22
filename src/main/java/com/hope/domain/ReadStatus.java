package com.hope.domain;

import com.sun.org.apache.xpath.internal.operations.Bool;

public class ReadStatus {
    private Integer id;
    private String userName;
    private Integer informId;
    private Bool readStatus;
    private String rdStatus;

    public Integer getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Integer getInformId() {
        return informId;
    }

    public void setInformId(int informId) {
        this.informId = informId;
    }

    public Bool isReadStatus() {
        return readStatus;
    }

    public void setReadStatus(Bool readStatus) {
        this.readStatus = readStatus;
    }

    public String getRdStatus() {
        return rdStatus;
    }

    public void setRdStatus(String rdStatus) {
        this.rdStatus = rdStatus;
    }
}
