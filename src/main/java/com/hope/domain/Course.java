package com.hope.domain;

public class Course {
    private int CourseID;
    private String CourseName;
    private String CurriculumSystem;
    private String Introduction;
    private String CourseForm;
    private double RequiredPeriod;
    private double Credits;
    private int PassCriterion;
    private int TotalChapter;
    private int QuesetionNumbers;

    public int getCourseID() {
        return CourseID;
    }

    public void setCourseID(int CourseID) {
        this.CourseID = CourseID;
    }

    public String getCourseName() {
        return CourseName;
    }

    public void setCourseName(String CourseName) {
        this.CourseName = CourseName;
    }

    public String getCurriculumSystem() {
        return CurriculumSystem;
    }

    public void setCurriculumSystem(String CurriculumSystem) {
        this.CurriculumSystem = CurriculumSystem;
    }

    public String getIntroduction() {
        return Introduction;
    }

    public void setIntroduction(String Introduction) {
        this.Introduction = Introduction;
    }

    public String getCourseForm() {
        return CourseForm;
    }

    public void setCourseForm(String CourseForm) {
        this.CourseForm = CourseForm;
    }

    public double getCredits() {
        return Credits;
    }

    public void setCredits(double Credits) {
        this.Credits = Credits;
    }

    public double getRequiredPeriod() {
        return RequiredPeriod;
    }

    public void setRequiredPeriod(double RequiredPeriod) {
        this.RequiredPeriod = RequiredPeriod;
    }

    public int getPassCriterion() {
        return PassCriterion;
    }

    public void setPassCriterion(int PassCriterion) {
        this.PassCriterion = PassCriterion;
    }

    public int getTotalChapter() {
        return TotalChapter;
    }

    public void setTotalChapter(int TotalChapter) {
        this.TotalChapter = TotalChapter;
    }

    public int getQuesetionNumbers() {
        return QuesetionNumbers;
    }

    public void setQuesetionNumbers(int QuesetionNumbers) {
        this.QuesetionNumbers = QuesetionNumbers;
    }

    @Override
    public String toString() {
        return "Course{" + "CourseID='" + CourseID + '\'' + ", CourseName='" + CourseName + '\''
                + ", CurriculumSystem='" + CurriculumSystem + '\'' + ", Introduction='" + Introduction + '\''
                + ", CourseForm='" + CourseForm + '\'' + ", Credits='" + Credits + '\'' + ", RequiredPeriod='"
                + RequiredPeriod + '\'' + ", PassCriterion='" + PassCriterion + '\'' + ", TotalChapter='" + TotalChapter
                + '\'' + ", QuesetionNumbers='" + QuesetionNumbers + '\'' + '}';
    }
}
