package com.hope.domain;

public class Chapter {
    private int CourseID;
    private int ChapterID;
    private String ChapterName;
    private String ChapterIntroduction;
    private int ExerciseNumbers;
    private String LinkName;

    public int getCourseID() {
        return CourseID;
    }

    public void setCourseID(int CourseID) {
        this.CourseID = CourseID;
    }

    public int getChapterID() {
        return ChapterID;
    }

    public void setChapterID(int ChapterID) {
        this.ChapterID = ChapterID;
    }

    public String getChapterName() {
        return ChapterName;
    }

    public void setChapterName(String ChapterName) {
        this.ChapterName = ChapterName;
    }

    public String getChapterIntroduction() {
        return ChapterIntroduction;
    }

    public void setChapterIntroduction(String ChapterIntroduction) {
        this.ChapterIntroduction = ChapterIntroduction;
    }

    public int getExerciseNumbers() {
        return ExerciseNumbers;
    }

    public void setExerciseNumbers(int ExerciseNumbers) {
        this.ExerciseNumbers = ExerciseNumbers;
    }

    public String getLinkName() {
        return LinkName;
    }

    public void setLinkName(String LinkName) {
        this.LinkName = LinkName;
    }

    @Override
    public String toString() {
        return "Chapter{" + "CourseID='" + CourseID + '\'' + ", ChapterID='" + ChapterID + '\'' + ", ChapterName='"
                + ChapterName + '\'' + ", ChapterIntroduction='" + ChapterIntroduction + '\'' + ", ExerciseNumbers='"
                + ExerciseNumbers + '\'' + ", LinkName='" + LinkName + '\'' + '}';
    }
}
