package com.hope.domain;


public class Questionbank {
    private int CourseID;
    private int id;
    private int ChapterID;
    private int QuestionID;
    private String PoisionA;
    private String PoisionB1;
    private String PoisionB2;
    private String PoisionB3;
    private String Question;
    private String Answer;
    private String OptionA;
    private String OptionB;
    private String OptionC;
    private String OptionD;
    private String Remarks;
    private int QuestionTime;
    private int Type;
    private String startdate;
    private String enddate;
    private Integer times;
    private int state;
    private int week;
    private int examTime;
    private String UserName;
    private Integer Cycle;
//	private Integer Week;
//	private Integer QuestionId;

    public String getUserName() {
        return UserName;
    }

    public void setUserName(String userName) {
        UserName = userName;
    }

    public Integer getCycle() {
        return Cycle;
    }

    public void setCycle(Integer cycle) {
        Cycle = cycle;
    }

//	public void setWeek(Integer week) {
//		Week = week;
//	}

//	public Integer getQuestionId() {
//		return QuestionId;
//	}
//
//	public void setQuestionId(Integer questionId) {
//		QuestionId = questionId;
//	}

    public int getWeek() {
        return week;
    }

    public void setWeek(int week) {
        this.week = week;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public Integer getTimes() {
        return times;
    }

    public void setTimes(Integer times) {
        this.times = times;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStartdate() {
        return startdate;
    }

    public void setStartdate(String startdate) {
        this.startdate = startdate;
    }

    public String getEnddate() {
        return enddate;
    }

    public void setEnddate(String enddate) {
        this.enddate = enddate;
    }

    public int getCourseID() {
        return CourseID;
    }

    public void setCourseID(int courseID) {
        CourseID = courseID;
    }

    public int getChapterID() {
        return ChapterID;
    }

    public void setChapterID(int chapterID) {
        ChapterID = chapterID;
    }

    public int getQuestionID() {
        return QuestionID;
    }

    public void setQuestionID(int questionID) {
        QuestionID = questionID;
    }

    public String getPoisionA() {
        return PoisionA;
    }

    public void setPoisionA(String poisionA) {
        PoisionA = poisionA;
    }

    public String getPoisionB1() {
        return PoisionB1;
    }

    public void setPoisionB1(String poisionB1) {
        PoisionB1 = poisionB1;
    }

    public String getPoisionB2() {
        return PoisionB2;
    }

    public void setPoisionB2(String poisionB2) {
        PoisionB2 = poisionB2;
    }

    public String getPoisionB3() {
        return PoisionB3;
    }

    public void setPoisionB3(String poisionB3) {
        PoisionB3 = poisionB3;
    }

    public String getQuestion() {
        return Question;
    }

    public void setQuestion(String question) {
        Question = question;
    }

    public String getAnswer() {
        return Answer;
    }

    public void setAnswer(String answer) {
        Answer = answer;
    }

    public String getOptionA() {
        return OptionA;
    }

    public void setOptionA(String optionA) {
        OptionA = optionA;
    }

    public String getOptionB() {
        return OptionB;
    }

    public void setOptionB(String optionB) {
        OptionB = optionB;
    }

    public String getOptionC() {
        return OptionC;
    }

    public void setOptionC(String optionC) {
        OptionC = optionC;
    }

    public String getOptionD() {
        return OptionD;
    }

    public void setOptionD(String optionD) {
        OptionD = optionD;
    }

    public String getRemarks() {
        return Remarks;
    }

    public void setRemarks(String remarks) {
        Remarks = remarks;
    }

    public int getQuestionTime() {
        return QuestionTime;
    }

    public void setQuestionTime(int questionTime) {
        QuestionTime = questionTime;
    }

    public int getType() {
        return Type;
    }

    public void setType(int type) {
        Type = type;
    }

    public int getExamTime() {
        return examTime;
    }

    public void setExamTime(int examTime) {
        this.examTime = examTime;
    }

//	@Override
//	public String toString() {
//		return "Questionbank [CourseID=" + CourseID + ", ChapterID=" + ChapterID + ", QuestionID=" + QuestionID
//				+ ", PoisionA=" + PoisionA + ", PoisionB1=" + PoisionB1 + ", PoisionB2=" + PoisionB2 + ", PoisionB3="
//				+ PoisionB3 + ", Question=" + Question + ", Answer=" + Answer + ", OptionA=" + OptionA + ", OptionB="
//				+ OptionB + ", OptionC=" + OptionC + ", OptionD=" + OptionD + ", Remarks=" + Remarks + ", QuestionTime="
//				+ QuestionTime + ", Type=" + Type + "]";
//	}

    @Override
    public String toString() {
        return "Questionbank{" +
                "CourseID=" + CourseID +
                ", id=" + id +
                ", ChapterID=" + ChapterID +
                ", QuestionID=" + QuestionID +
                ", PoisionA='" + PoisionA + '\'' +
                ", PoisionB1='" + PoisionB1 + '\'' +
                ", PoisionB2='" + PoisionB2 + '\'' +
                ", PoisionB3='" + PoisionB3 + '\'' +
                ", Question='" + Question + '\'' +
                ", Answer='" + Answer + '\'' +
                ", OptionA='" + OptionA + '\'' +
                ", OptionB='" + OptionB + '\'' +
                ", OptionC='" + OptionC + '\'' +
                ", OptionD='" + OptionD + '\'' +
                ", Remarks='" + Remarks + '\'' +
                ", QuestionTime=" + QuestionTime +
                ", Type=" + Type +
                ", startdate='" + startdate + '\'' +
                ", enddate='" + enddate + '\'' +
                ", times=" + times +
                ", state=" + state +
                ", week=" + week +
                ", examTime=" + examTime +
                ", UserName='" + UserName + '\'' +
                ", Cycle=" + Cycle +
//				", Week=" + Week +
//				", QuestionId=" + QuestionId +
                '}';
    }

}
