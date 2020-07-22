package com.hope.domain;

public class ScrDaily {

    private int id;

    private String datetime;

    private int projectId;

    private int group;

    private int type;

    private String traders;
    private String tradersName;

    private String successor;
    private String successorName;

    private String recorder;
    private String recorderName;

    private int other;


    public ScrDaily(int id, String datetime, int projectId, int group, int type, String traders, String successor, int other) {
        super();
        this.id = id;
        this.datetime = datetime;
        this.projectId = projectId;
        this.group = group;
        this.type = type;
        this.traders = traders;
        this.successor = successor;
        this.other = other;
    }

    public ScrDaily() {
        super();

    }

    public String getRecorder() {
        return recorder;
    }

    public void setRecorder(String recorder) {
        this.recorder = recorder;
    }

    public String getRecorderName() {
        return recorderName;
    }

    public void setRecorderName(String recorderName) {
        this.recorderName = recorderName;
    }

    @Override
    public String toString() {
        return "ScrDaily{" +
                "id=" + id +
                ", datetime='" + datetime + '\'' +
                ", projectId=" + projectId +
                ", group=" + group +
                ", type=" + type +
                ", traders='" + traders + '\'' +
                ", tradersName='" + tradersName + '\'' +
                ", successor='" + successor + '\'' +
                ", successorName='" + successorName + '\'' +
                ", recorder='" + recorder + '\'' +
                ", recorderName='" + recorderName + '\'' +
                ", other=" + other +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDatetime() {
        return datetime;
    }

    public void setDatetime(String datetime) {
        this.datetime = datetime;
    }

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    public int getGroup() {
        return group;
    }

    public void setGroup(int group) {
        this.group = group;
    }

    public String getTraders() {
        return traders;
    }

    public void setTraders(String traders) {
        this.traders = traders;
    }

    public String getSuccessor() {
        return successor;
    }

    public void setSuccessor(String successor) {
        this.successor = successor;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public int getOther() {
        return other;
    }

    public void setOther(int other) {
        this.other = other;
    }

    public String getTradersName() {
        return tradersName;
    }

    public void setTradersName(String tradersName) {
        this.tradersName = tradersName;
    }

    public String getSuccessorName() {
        return successorName;
    }

    public void setSuccessorName(String successorName) {
        this.successorName = successorName;
    }


}
