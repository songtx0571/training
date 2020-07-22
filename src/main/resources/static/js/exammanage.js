$(function(){//检查用户权限
	checkLogin();
	var userName = sessionStorage.Username
	document.getElementById('li1').style.display='none';
	document.getElementById('li2').style.display='none';
	document.getElementById('li3').style.display='none';
	// document.getElementById('li4').style.display='none';
    document.getElementById('li5').style.display='none';
	$.ajax({
    	url: '/getPermissionByUserId',
    	type: "POST",
    	datatype: 'json',
    	data:{userName: userName},
    	success: function (data) {
    		for(var i=0;i<data.length;i++){
    			if(data[i].id!=6&&data[i].type==1){
        			document.getElementById('li'+data[i].id).style.display='';
    			}
    		}
    	}
	});
})

function checkLogin(){//验证登录信息与权限
	var userName = sessionStorage.Username;
	if(userName==null){
		window.location="../";  
	}
	$.ajax({ 
		"type" : 'post', 
		"url": "/getPermissionByUserIdAndPermissionId",  
		"data":{userName:userName,permissionId:3},
		"success":function(data){
			if(!data){
				layer.alert('该账号没有考试管理的权限，请换账号重试!', {icon : 2});
				window.location="../";  
			}
			
		}
	});
}
function tabPrev()
{
    otabLis = document.getElementById("title_tab").getElementsByTagName("li");
    index1--;
    if (index1 < 0)
    {
        index1 = otabLis.length - 1;
    }
    for (var i = 0; i < otabLis.length; i++)
    {
        otabLis.item(i).className = "";
        otabLis.item(index1).className = "current";

    }
    tab('candidates', index1);
}

function tabNext()
{
    otabLis = document.getElementById("title_tab").getElementsByTagName("li");
    index1++;
    // alert(index);
    // alert(otabLis.length);
    if (index1 >= otabLis.length)
    {
        index1 = 0;
    }
    for (var i = 0; i < otabLis.length; i++)
    {
        otabLis.item(i).className = "";
        otabLis.item(index1).className = "current";

    }
    tab('candidates', index1);
}

var exam=(function (jQuery) {
   function insertpublishexam() {
       if(checkdate()){
           var unitObj = document.getElementById("pPoisionA");
           var PoisionA=unitObj.value;
           var unitObj2 = document.getElementById("pPoisionB1");
           var PoisionB1=unitObj2.value;
           var unitObj3 = document.getElementById("week");
           var week=unitObj3.value;
           var CourseID=$("#pCourseID").val();
           var ChapterID=$("#pChapterID").val();
           var startdate=$("#startdate").val();
           var enddate=$("#enddate").val();
           var examTime =  $('#examTime').val();
           if(PoisionA!=''&&PoisionB1!=''&&CourseID!=''&&ChapterID!=''&&startdate!=''&&enddate!=''&&week!=''){
               $.ajax({
                   url: "/insertpublishexam",
                   type: "post",
                   data: {
                       "PoisionA": PoisionA,
                       "PoisionB1": PoisionB1,
                       "CourseID": CourseID,
                       "ChapterID": ChapterID,
                       "startdate": startdate,
                       "enddate": enddate,
                       "week":week,
                       "examTime":examTime
                   },
                   async: false,//是否异步请求
                   datatype: "json",
                   success: function (data) {
                       if(data=="success"){
                           $.messager.alert("提示","发布成功");
                           setnone('exampublish');
                           clearExampublish();
                           exam.loodtable();
                       }else if(data =="failweek"){
                           $.messager.alert("提示","周期已存在");
                       }
                   }
               })
           }else $.messager.alert("提示","参数不能为空");
       }

   }
    function loodtable() {
        layui.use('table', function () {
            var table = layui.table;
            table.render({
                elem: '#test'
                , url: '/findExam'
                , page:true
                , cols: [[
                    {field: 'id', width: 79, title: '序号',sort:true}
                    ,{field:'courseID',align:'center', width:100, title: '课程编号',sort:true}
                    ,{field:'chapterID',align:'center', width:100, title: '章节编号',sort:true}
                    ,{field:'poisionA',align:'center', width:100, title: '分类1'}
                    ,{field:'poisionB1',align:'center', width:100, title: '分类2'}
                    ,{field:'week',align:'center', width:100, title: '周',templet:function (row) {
                            return translateweek(row.week);
                    }}
                    ,{field:'state',align:'center', width:130, title: '状态',templet:function (row) {
                    	if(row.state==1){
                    		return "进行中";
                    	}else if(row.state==0){
                    		return "已结束";
                    	}else{
                    		return "未进行";
                    	}
                    }}
                    ,{field:'startdate',align:'center', width:150, title: '开始时间'}
                    ,{field:'enddate',align:'center', width:150, title: '结束时间'}
                    ,{field:'examTime',align:'center', width:150, title: '考试时长',templet:function (row) {
                    	return row.examTime+"分钟";
                    }}
                    ,{fixed: 'right', title: '详情', toolbar: '#barDemo', width: 270}
                ]]

            });
            table.on('tool(demo)', function (obj) {
                var data = obj.data;
                console.log(obj)
                console.log(data)
                if (obj.event === 'edit') {
                    setblock('exampublish');
                    setnone('ptitle');
                    setnone('addexambtn');
                    setblock('utitle')
                    setblock('updateexambtn');
                    excise.PoisionAshow('pPoisionA');
                    $("#pPoisionA").val(data.poisionA);
                    excise.PoisionB1show('pPoisionA','pPoisionB1');
                    $("#id").val(data.id);
                    $("#pCourseID").val(data.courseID);
                    $("#pChapterID").val(data.chapterID);
                    $("#pPoisionB1").val(data.poisionB1);
                    $("#startdate").val(data.startdate);
                    $("#enddate").val(data.enddate);
                    $("#week").val(data.week);
                    $("#examTime").val(data.examTime);
                    setColor('pPoisionA');setColor('pPoisionB1');setColor('week');setColor('examTime');
                } else if (obj.event === 'start') {
                    startexam(data.id);
                }else if (obj.event === 'del') {
                    $.messager.confirm("确认", "确定删除吗", function (r) {
                        if (r) {
                            exam.deleteexam(data.id);
                        }
                    });
                }else if (obj.event === 'finish') {
                    finishexam(data.id,data.week);
                }
            });
        });
    }

    function translateweek(x) {
       var cweeks =  new Array('第一周','第二周','第三周','第四周');
       return cweeks[x-1]; 
    }

    function startexam(id) {
        $.ajax({
            url: "/startexam",
            type: "post",
            async: false,//是否异步请求
            data:{"id":id},
            datatype: "json",
            success: function (data) {
                if(data=="success"){
                    $.messager.alert("提示","发布考试成功");
                    exam.loodtable();
                }else if(data=="fail"){
                    $.messager.alert("提示","有考试正在进行中");
                }else if(data=="failstate"){
                    $.messager.alert("提示","考试已结束，请勿再次发布");
                }else if(data=="failstate2"){
                    $.messager.alert("提示","考试未开始，请先开始考试");
                }
            }
        })
    }
    function finishexam(id,week) {
        $.ajax({
            url: "/finishexam",
            type: "post",
            data: {
                "id": id,
                "week": week
            },
            datatype: "json",
            success: function (data) {
                if (data == "success") {
                    $.messager.alert("提示","结束考试");
                    exam.loodtable();
                } else if (data == "failstate2") {
                    $.messager.alert("提示","考试未开始，请先开始考试");
                } else if (data == "failstate") {
                    $.messager.alert("提示","考试已结束");
                } else if (data == "no id") {
                    $.messager.alert("提示","身份过期,请重新登陆");
                } else if (data == "error") {
                    $.messager.alert("提示","程序出错,请联系技术部门!");
                }
            }
        })
    }


    function deleteexam(id) {
            $.ajax({
                url: "/deleteexam",
                type: "post",
                data: {
                    "id":id
                },
                async: false,//是否异步请求
                datatype: "json",
                success: function (data) {
                    if(data=="success"){
                        $.messager.alert("提示","删除成功");
                        exam.loodtable();
                    }
                }
            })
    }
    // function loodtableExam() {
    //     layui.use('table', function () {
    //         var table = layui.table;
    //         var userName = sessionStorage.Username;
    //         table.render({
    //             elem: '#test-exam'
    //             , url: '/findExamHis?userName=' + userName
    //             , page:true
    //             , cols: [[
    //                 {field: 'cycle', width: 79, title: '考试年月',sort:true}
    //                 ,{field:'week',align:'center', width:100, title: '考试周数',sort:true}
    //                 ,{field:'times',align:'center', width:100, title: '考试次数',sort:true}
    //                 // ,{field:'poisionA',align:'center', width:100, title: '分类1'}
    //                 // ,{field:'poisionB1',align:'center', width:100, title: '分类2'}
    //             ]]
    //
    //         });
    //         table.on('tool(demo-exam)', function (obj) {
    //             var data = obj.data;
    //             // if (obj.event === 'edit') {
    //             //     setblock('exampublish');
    //             //     setnone('ptitle');
    //             //     setnone('addexambtn');
    //             //     setblock('utitle')
    //             //     setblock('updateexambtn');
    //             //     excise.PoisionAshow('pPoisionA');
    //             //     $("#pPoisionA").val(data.poisionA);
    //             //     excise.PoisionB1show('pPoisionA','pPoisionB1');
    //             //     $("#id").val(data.id);
    //             //     $("#pCourseID").val(data.courseID);
    //             //     $("#pChapterID").val(data.chapterID);
    //             //     $("#pPoisionB1").val(data.poisionB1);
    //             //     $("#startdate").val(data.startdate);
    //             //     $("#enddate").val(data.enddate);
    //             //     $("#week").val(data.week);
    //             //     $("#examTime").val(data.examTime);
    //             //     setColor('pPoisionA');setColor('pPoisionB1');setColor('week');setColor('examTime');
    //             // } else if (obj.event === 'start') {
    //             //     startexam(data.id);
    //             // }else if (obj.event === 'del') {
    //             //     let r = confirm("确定要删除吗");
    //             //     if(r==true) exam.deleteexam(data.id);
    //             // }else if (obj.event === 'finish') {
    //             //     finishexam(data.id,data.week);
    //             // }
    //         });
    //     });
    // }
    function updateexam() {
       if(checkdate()){
           var id=$("#id").val();
           var CourseID=$("#pCourseID").val();
           var ChapterID=$("#pChapterID").val();
           var PoisionA=$("#pPoisionA").val();
           var PoisionB1=$("#pPoisionB1").val();
           var startdate= $("#startdate").val();
           var enddate=$("#enddate").val();
           var week = $('#week').val();
           var examTime =  $('#examTime').val();
           if(PoisionA!=''&&PoisionB1!=''&&CourseID!=''&&ChapterID!=''&&startdate!=''&&enddate!=''&&PoisionA!='请选择'&&PoisionB1!='请选择'){
               $.ajax({
                   url: "/updateexam",
                   type: "post",
                   data: {
                       "id":id,
                       "CourseID":CourseID,
                       "ChapterID":ChapterID,
                       "PoisionA":PoisionA,
                       "PoisionB1":PoisionB1,
                       "enddate":enddate,
                       "startdate":startdate,
                       "week":week,
                       "examTime":examTime
                   },
                   async: false,//是否异步请求
                   datatype: "json",
                   success: function (data) {
                       if(data=="success")$.messager.alert("提示","修改成功"),setnone('exampublish'),clearExampublish(),exam.loodtable();
                   }
               })
           }else {
               $.messager.alert("提示","请输入参数");
           }
       }

    }
    

    return {
        insertpublishexam:insertpublishexam,
        loodtable:loodtable,
        deleteexam:deleteexam,
        updateexam:updateexam,
        startexam:startexam,
        finishexam:finishexam
        // loodtableExam:loodtableExam,
    };
}(jQuery));

//显示考试内容列表
function clearExampublish() {
    $("#pChapterID").val('2');
    $("#pCourseID").val('1');
    $("#enddate").val('');
    $("#startdate").val('');
    $("#week").val('');
    $("#pPoisionA").find("option:not(:first)").remove();
    $("#pPoisionB1").find("option:not(:first)").remove();
}


function  checkdate(){
    var startdate=$("#startdate").val();
    var enddate=$("#enddate").val();
    if(startdate!=null&&startdate!=''){
        if(startdate>=enddate){
            $.messager.alert("提示","结束日期需要大于开始日期");
            $("#enddate").val('');
            return false;
        }else return true;
    }else {
        alert("请设置开始日期");
        $("#enddate").val('');
        return false;
    }
}
$(function(){
	layui.use('laydate', function () {
         var laydate = layui.laydate;
         laydate.render({
     		elem: '#achievementTime' //指定元素
     		,zIndex: 99999999
             ,trigger: 'click'
             ,type: 'month'
             ,value: new Date()
         });
     });
	var myDate = new Date();
	var year =  myDate.getFullYear();    
	var month = myDate.getMonth()+1;
	if(month<10){
		month = "0"+month
	}
	var data = year+"-"+month;
	findAchievementRecord(data);
})
var achievementOTable;
function showAchievementRecord(){
	document.getElementById("achievementRecord").style.display="block";
	document.getElementById("banner").style.display="block";
}
function showExamHistory() {
    document.getElementById("examHistory").style.display="block";
    document.getElementById("fadeExam").style.display="block";
    layui.use('table', function () {
        var table = layui.table;
        var userName = sessionStorage.Username;
        table.render({
            elem: '#testExam'
            , url: '/findExamHis?userName=' + userName
            , page:true
            , cols: [[
                {field: 'zizengExam',align:'center', width: 90, title: '序号', templet: '#zizengExam'}
                ,{field: 'name',align:'center', width: 200, title: '人员姓名',sort:true}
                ,{field: 'cycle',align:'center', width: 235, title: '考试年月',sort:true}
                ,{field:'week',align:'center', width:200, title: '考试周数',sort:true}
                ,{field:'times',align:'center', width:200, title: '考试次数',sort:true}
                , {fixed: 'right',align:'center', title: '详情', toolbar: '#barDemoExam', width: 200}
            ]]
        });
        table.on('tool(demoExam)', function (obj) {
            var data = obj.data;
            var layEvent = obj.event;
            if(layEvent === 'detail'){
                // layer.msg('查看操作');
                document.getElementById('examHistory').style.display='none';
                document.getElementById('fadeExam').style.display='none';
                document.getElementById('exerciseExam').style.display='block';
                document.getElementById('fade').style.display='block';
                var UserName = userName;
                var Cycle = data.cycle;
                var Week = data.week;
                var times = data.times;
                // showByExam();
                mt=0;
                console.log(UserName,Cycle,Week,times);
                $.ajax({
                        url : "/showByExam",
                        type : "POST",
                        datatype : 'json',
                        data :
                            {
                                UserName : UserName,
                                Cycle :Cycle,
                                Week :Week,
                                times:times
                            },
                        success : function(result)
                        {
                            data = result;
                            console.log(data);
                            var html = "<div class='title_tab' id='title_tab' style='overflow:auto'><ul class='clearfix'>";
                            for (var j = 0; j < data.length; j++)
                            {
                                var index = j + 1;
                                html += "<li onclick=\"tab('candidates'," + j
                                    + ")\" id='li" + j + "'>第" + index + "题</li>";
                            }
                            html += "</ul></div>";
                            for (var i = 0; i < data.length; i++)
                            {
                                if (data[i].type == 1)
                                {
                                    var index = i + 1;
                                    html += "<div id='candidates_"
                                        + i
                                        + "'class='tab_content' style='height: 400px;'>";
                                    html += "<div>"
                                        // + data[i].questionID + "."
                                        + data[i].question + "</div>";
                                    html += "<div><input type='radio' name='radio_"
                                        + index + "' value='A'>A."
                                        + data[i].optionA + "</input><br>";
                                    html += "<input type='radio' name='radio_" + index
                                        + "' value='B'>B." + data[i].optionB
                                        + "</input><br></div>";
                                    html += "<div><input type='button' class='button' value='查看答案' onclick='answershow("
                                        + i
                                        + ")'/></div><div id='answer"
                                        + i
                                        + "' style='display: none;'>答案和解析：<br>"
                                        + data[i].remarks
                                        + "<br>答案:"
                                        + data[i].answer + "</div></div>";
                                } else if (data[i].type == 2)
                                {
                                    var index = i + 1;
                                    html += "<div id='candidates_"
                                        + i
                                        + "'class='tab_content' style='height: 400px;'>";
                                    html += "<div>"
                                        // + data[i].questionID + "."
                                        + data[i].question + "</div>";
                                    html += "<div><input type='checkbox' name='radio_"
                                        + index + "' value='A'>A."
                                        + data[i].optionA + "</input><br>";
                                    html += "<input type='checkbox' name='radio_"
                                        + index + "' value='B'>B."
                                        + data[i].optionB + "</input><br>";
                                    html += "<input type='checkbox' name='radio_"
                                        + index + "' value='C'>C."
                                        + data[i].optionC + "</input><br>";
                                    html += "<input type='checkbox' name='radio_"
                                        + index + "' value='D'>D."
                                        + data[i].optionD + "</input><br></div>";
                                    html += "<div><input type='button' class='button' value='查看答案' onclick='answershow("
                                        + i
                                        + ")'/></div><div id='answer"
                                        + i
                                        + "' style='display: none;'>答案和解析：<br>"
                                        + data[i].remarks
                                        + "<br>答案:"
                                        + data[i].answer + "</div></div>";
                                } else
                                {
                                    var index = i + 1;
                                    html += "<div id='candidates_"
                                        + i
                                        + "'class='tab_content' style='height: 400px;'>";
                                    html += "<div>"
                                        // + data[i].questionID + "."
                                        + data[i].question + "</div>";
                                    html += "<div><input type='radio' name='radio_"
                                        + index + "' value='A'>A."
                                        + data[i].optionA + "</input><br>";
                                    html += "<input type='radio' name='radio_" + index
                                        + "' value='B'>B." + data[i].optionB
                                        + "</input><br>";
                                    html += "<input type='radio' name='radio_" + index
                                        + "' value='C'>C." + data[i].optionC
                                        + "</input><br>";
                                    html += "<input type='radio' name='radio_" + index
                                        + "' value='D'>D." + data[i].optionD
                                        + "</input><br></div>";
                                    html += "<div><input type='button' class='button' value='查看答案' onclick='answershow("
                                        + i
                                        + ")'/></div><div id='answer"
                                        + i
                                        + "' style='display: none;'>答案和解析：<br>"
                                        + data[i].remarks
                                        + "<br>答案:"
                                        + data[i].answer + "</div></div>";
                                }
                            }
                            $('#tab_candidates').html(html);
                            $('#li0').addClass("current");
                            $('#candidates_0').removeClass("tab_content");
                            $('#candidates_0').addClass("tab_content current");
                            index1 = 0;
                            // if(permission==1){
                            //     setTimeout("ExCount()",2000);
                            // }
                        }
                    });

            }
        });
    });
}
function tab(obj, id)
{
    // clearTimeout(p);
    // clearTimeout(x);
    mt = 0;
    // ExCount();
    otabLis = document.getElementById("title_tab").getElementsByTagName("li");
    var m = $("#tab_" + obj + " li");
    m.removeClass("current");
    m.eq(id).addClass("current");
    var c = $("#tab_" + obj + " .tab_content");
    c.removeClass("current");
    c.eq(id).addClass("current");
    for (var i = 0; i < otabLis.length; i++)
    {
        if (otabLis[i].className == "current")
        {
            index1 = i;
        }
    }
}
// function showByExam(){
//     mt=0;
//     $.ajax(
//         {
//             url : '/showByExam',
//             type : "POST",
//             datatype : 'json',
//             data :
//                 {
//                     UserName : UserName,
//                     Cycle :Cycle,
//                     Week :Week
//                 },
//             success : function(result)
//             {
//                 data = result;
//                 console.log(data);
//                 var html = "<div class='title_tab' id='title_tab' style='overflow:auto'><ul class='clearfix'>";
//                 for (var j = 0; j < data.length; j++)
//                 {
//                     var index = j + 1;
//                     html += "<li onclick=\"tab('candidates'," + j
//                         + ")\" id='li" + j + "'>第" + index + "题</li>";
//                 }
//                 html += "</ul></div>";
//                 for (var i = 0; i < data.length; i++)
//                 {
//                     if (data[i].type == 1)
//                     {
//                         var index = i + 1;
//                         html += "<div id='candidates_"
//                             + i
//                             + "'class='tab_content' style='height: 400px;'>";
//                         html += "<div>" + data[i].questionID + "."
//                             + data[i].question + "</div>";
//                         html += "<div><input type='radio' name='radio_"
//                             + index + "' value='A'>A."
//                             + data[i].optionA + "</input><br>";
//                         html += "<input type='radio' name='radio_" + index
//                             + "' value='B'>B." + data[i].optionB
//                             + "</input><br></div>";
//                         html += "<div><input type='button' class='button' value='查看答案' onclick='answershow("
//                             + i
//                             + ")'/></div><div id='answer"
//                             + i
//                             + "' style='display: none;'>答案和解析：<br>"
//                             + data[i].remarks
//                             + "<br>答案:"
//                             + data[i].answer + "</div></div>";
//                     } else if (data[i].type == 2)
//                     {
//                         var index = i + 1;
//                         html += "<div id='candidates_"
//                             + i
//                             + "'class='tab_content' style='height: 400px;'>";
//                         html += "<div>" + data[i].questionID + "."
//                             + data[i].question + "</div>";
//                         html += "<div><input type='checkbox' name='radio_"
//                             + index + "' value='A'>A."
//                             + data[i].optionA + "</input><br>";
//                         html += "<input type='checkbox' name='radio_"
//                             + index + "' value='B'>B."
//                             + data[i].optionB + "</input><br>";
//                         html += "<input type='checkbox' name='radio_"
//                             + index + "' value='C'>C."
//                             + data[i].optionC + "</input><br>";
//                         html += "<input type='checkbox' name='radio_"
//                             + index + "' value='D'>D."
//                             + data[i].optionD + "</input><br></div>";
//                         html += "<div><input type='button' class='button' value='查看答案' onclick='answershow("
//                             + i
//                             + ")'/></div><div id='answer"
//                             + i
//                             + "' style='display: none;'>答案和解析：<br>"
//                             + data[i].remarks
//                             + "<br>答案:"
//                             + data[i].answer + "</div></div>";
//                     } else
//                     {
//                         var index = i + 1;
//                         html += "<div id='candidates_"
//                             + i
//                             + "'class='tab_content' style='height: 400px;'>";
//                         html += "<div>" + data[i].questionID + "."
//                             + data[i].question + "</div>";
//                         html += "<div><input type='radio' name='radio_"
//                             + index + "' value='A'>A."
//                             + data[i].optionA + "</input><br>";
//                         html += "<input type='radio' name='radio_" + index
//                             + "' value='B'>B." + data[i].optionB
//                             + "</input><br>";
//                         html += "<input type='radio' name='radio_" + index
//                             + "' value='C'>C." + data[i].optionC
//                             + "</input><br>";
//                         html += "<input type='radio' name='radio_" + index
//                             + "' value='D'>D." + data[i].optionD
//                             + "</input><br></div>";
//                         html += "<div><input type='button' class='button' value='查看答案' onclick='answershow("
//                             + i
//                             + ")'/></div><div id='answer"
//                             + i
//                             + "' style='display: none;'>答案和解析：<br>"
//                             + data[i].remarks
//                             + "<br>答案:"
//                             + data[i].answer + "</div></div>";
//                     }
//                 }
//                 $('#tab_candidates').html(html);
//                 $('#li0').addClass("current");
//                 $('#candidates_0').removeClass("tab_content");
//                 $('#candidates_0').addClass("tab_content current");
//                 index1 = 0;
//                 // if(permission==1){
//                 //     setTimeout("ExCount()",2000);
//                 // }
//             }
//         });
// }
function closeAchievementRecord(){
	document.getElementById("achievementRecord").style.display="none";
	document.getElementById("banner").style.display="none";
}
// function closeExamHistory(){
//     document.getElementById("examHistory").style.display="none";
//     document.getElementById("fade").style.display="none";
// }
function changeAchievementRecord(){
    if(achievementOTable){
        achievementOTable.fnClearTable();
        achievementOTable.fnDestroy();
    }
	var cycle = $('#achievementTime').val();
	findAchievementRecord(cycle);
}
function findAchievementRecord(cycle){
    achievementOTable=$('#DataTable').dataTable({
    	"oLanguage": {  
    		"sProcessing": "正在抓取数据，请稍后...",  
    		"sLengthMenu": "显示_MENU_条 ",  
    		"sZeroRecords": "没有您要搜索的内容",  
    		"sInfo": "从_START_ 到 _END_ 条记录——总记录数为 _TOTAL_ 条", 
    		"sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",  
    		"sInfoFiltered": "(全部记录数 \_MAX\_ 条)",  
    		"sInfoPostFix": "",  
    		"sSearch": " ",  
    		"sUrl": "",  
    		"oPaginate": {  
    			"sFirst":    "第一页",  
    			"sPrevious": " 上一页",  
    			"sNext":     " 下一页",  
    			"sLast":     " 最后一页 "  
    			}  
    		},
    		"fnPreDrawCallback": function( oSettings ) {
    	        $('.dataTables_filter input').attr({'name':'search','placeholder': '模糊搜索'});//提示
    		},
    		"dom": "<'row'<'col-xs-2'l><'#mytool.col-xs-4'B><'col-xs-6'f>r>" +
            	"t" +
            	"<'row'<'col-my-1'i><'col-my-1'p>>",
            "autoWidth": false,
            "paging":true,
            "lengthMenu": [ 10 ],
            "sAjaxSource" : "../findAchievementRecords",//通过ajax实现分页的url路径。    
            "fnServerData": function(sSource, aoData, fnCallback){
            	$.ajax({ 
            		'type' : 'post', 
            		"url": sSource,  
            		"data": {"cycle":cycle},
            		"success":function(Json){
            			fnCallback(Json);
            		}
            	});
            }, 
            "columns":[
            	{ data: "userName" , "width": "10%" },
            	{ data: "name", "width": "10%" }, 
            	{ data: "week1Result1", "width": "5%" }, 
            	{ data: "week1Result2", "width": "5%" },
            	{ data: "week1Result3", "width": "5%" },
            	{ data: "week1Result4", "width": "5%" },
            	{ data: "week2Result1", "width": "5%" }, 
            	{ data: "week2Result2", "width": "5%" },
            	{ data: "week2Result3", "width": "5%" },
            	{ data: "week2Result4", "width": "5%" },
            	{ data: "week3Result1", "width": "5%" }, 
            	{ data: "week3Result2", "width": "5%" },
            	{ data: "week3Result3", "width": "5%" },
            	{ data: "week3Result4", "width": "5%" },
            	{ data: "week4Result1", "width": "5%" }, 
            	{ data: "week4Result2", "width": "5%" },
            	{ data: "week4Result3", "width": "5%" },
            	{ data: "week4Result4", "width": "5%" }
            	]
	});
}

function downAchievementRecord(){
	var cycle = $('#achievementTime').val();
	window.open("/downAchievementRecords?cycle="+cycle)
}
