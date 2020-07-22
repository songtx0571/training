var uinf = (function (jQuery) {
    var amount=0;
    var scoreamount=0;
    function selectEm() {
        $.ajax({
            url: "/findEmById",//请求地址
            datatype: "json",//数据格式
            type: "post",//请求方式
            success: function (data) {   //如何发送成功
                if (data != null) {
                    var userInform = data;
                    console.log(userInform);
                    sessionStorage.roleId = userInform.roleId;
                    console.log(sessionStorage.roleId);
                    $('#employeeId').val(data.id);
                    $('#sName').val(data.name);
                    $('#sUserName').val(data.userName);
                    $('#sPost').val(data.post);
                    $('#sxName').val(data.name);
                    $('#sxUserName').val(data.userName);
                    $('#sxPost').val(data.post);
                    $('#uName').val(data.name);
                    $('#uUserName').val(data.userName);
                    //document.getElementById("employeeName").innerHTML = data.name + "同学";
                    $('#uIdnumber').val(data.idnumber);
                    $('#uCard').val(data.card);
                    $('#uPhone').val(data.phone);
                    $('#uCloshe').val(data.closhe);
                    $('#uHat').val(data.hat);
                    $('#uEducation').val(data.education);
                    $('#uEmergency').val(data.emergency);
                    $('#uEmergencyTel').val(data.emergencyTel);
                    
                }
            },
        })
    }

    function showUserNameList() {
        window.document.getElementById('appraise').style.display = 'block';
        var Manager = $("#uUserName").val();
        var unitObj = document.getElementById("appraiseUserName");
        $.ajax({
            url: "/appraiseUserName",//请求地址
            datatype: "json",//数据格式
            data: {"Manager": Manager},
            type: "post",//请求方式
            success: function (data) {
                $("#appraiseUserName").find("option:not(:first)").remove();
                for (var i = 0; i < data.length; i++) {
                    unitObj.options.add(new Option(data[i]));
                }

            }
        })

    }

    function selectCycle(x) {
        var employeeId = $('#employeeId').val();
        var unitObj = document.getElementById(x);
        $.ajax({
            url: "/selectCycle",//请求地址
            datatype: "json",//数据格式
            data: {
                "employeeId": employeeId,
            },
            type: "post",//请求方式
            async: false,//是否异步请求
            success: function (data) {
                $("#"+x).find("option:not(:first)").remove();
                for (var i = 0; i < data.length; i++) {
                    unitObj.options.add(new Option(data[i]));
                }
            }
        })
    }
    function selectBeCycle(x) {
        var employeeId = $('#xemployeeId').val();
        var unitObj = document.getElementById(x);
        $.ajax({
            url: "/selectBeCycle",//请求地址
            datatype: "json",//数据格式
            data: {
                "employeeId": employeeId,
            },
            type: "post",//请求方式
            async: false,//是否异步请求
            success: function (data) {
                $("#"+x).find("option:not(:first)").remove();
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    unitObj.options.add(new Option(data[i]));
                }
            }
        })
    }
    function selectBeCycles(x) {
        var employeeId = $('#employeeId').val();
        var unitObj = document.getElementById(x);
        clearbeself();
        $("#peAccself").html("");
        $.ajax({
            url: "/selectBeCycle",//请求地址
            datatype: "json",//数据格式
            data: {
                "employeeId": employeeId,
            },
            type: "post",//请求方式
            async: false,//是否异步请求
            success: function (data) {
                $("#"+x).find("option:not(:first)").remove();
                for (var i = 0; i < data.length; i++) {
                    unitObj.options.add(new Option(data[i]));
                }
            }
        })
    }


    function findPeAcc() {
        var unitObj = document.getElementById("sSelect");
        var cycle;
        if (unitObj != null) {
            cycle = unitObj.value;
            $("#sSelect").css("color","black");
        }
        f(cycle);
    }

    function f(cycle) {
        var html = '';
        var employeeId = $("#employeeId").val();
        $.ajax({
            url: "/findPeAcc",//请求地址
            datatype: "json",//数据格式
            type: "post",//请求方式
            data: {
                "employeeId": employeeId,
                "cycle": cycle
            },
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var score;
                    amount+=(data[i].weights)*1
                    if (data[i].score != '' && data[i].score != null) {
                        score = data[i].score;
                    }
                    html += '<tr>' + '<td >' + (i + 1) + '</td>' +
                        '<td colspan="3" >' + data[i].workTasks + '</td>' +
                        '<td colspan="3">' + data[i].access + '</td>' +
                        '<td>' + data[i].weights + '</td>' +
                        '<td>' + score + '</td>' +
                        '</tr>'
                }
                $("#amount").val(amount);
                amount=0;
                $("#peAccself").html(html);
            }

        })

    }


    function updateEm() {
        var Emergency = $('#uEmergency').val();
        var EmergencyTel = $('#uEmergencyTel').val();
        var Id = $("#employeeId").val();
        var UserName = $("#uUserName").val();
        var Name = $("#uName").val();
        var Idnumber = $("#uIdnumber").val();
        var Card = $("#uCard").val();
        var Phone = $("#uPhone").val();
        var Closhe = $("#uCloshe").val();
        var Hat = $("#uHat").val();
        var Education = $("#uEducation").val();
        $.ajax({
            url: "/emUpdate",//请求地址
            datatype: "json",//数据格式
            type: "post",//请求方式
            data: {
                "Emergency": Emergency,
                "EmergencyTel": EmergencyTel,
                "Id": Id,
                "UserName": UserName,
                "Name": Name,
                "Idnumber": Idnumber,
                "Card": Card,
                "Phone": Phone,
                "Closhe": Closhe,
                "Hat": Hat,
                "Education": Education,

            },
            success: function (data) {   //如何发送成功
                if (data == "success") {
                    alert("修改成功");
                    uinf.selectEm();
                    document.getElementById('information').style.display = 'none';
                }
            },
        })
    }

    function BeAddCycle(){
        var cycle = $('#BeAddCycle').val();
        var employeeId = $("#xemployeeId").val();
        if(employeeId==null|employeeId==''){
            alert("请选择员工");
        }else {
            $.ajax({
                url: "/BeAddCycle",//请求地址
                datatype: "json",//数据格式
                data: {
                    "cycle": cycle,
                    "employeeId": employeeId,
                },
                type: "post",//请求方式
                async: false,//是否异步请求
                success: function (data) {
                    if(data=="success"){
                        alert("添加成功");
                        window.document.getElementById('addBeCycle').style.display='none';
                        window.document.getElementById('selectcycle').style.display='';
                        $('#BeAddCycle').val('');
                        uinf.selectBeCycle('cycleSelect');
                    }else alert("周期已存在");
                }
            })
        }
    }


    function findappraise() {
        var unitObj = document.getElementById("appraiseUserName");
        var UserName=unitObj.value;
        clearbe();
        $("#peAcc").html("");
        if(UserName!="请选择"){
            findyeji(UserName);
            findxingwei(UserName);
        }else {
            clearem();
        }
    }

    function clearbeself() {
        $('#sweek1').val('');
        $('#sweek2').val('');
        $('#sweek3').val('');
        $('#sweek4').val('');
        $('#speriod').val('');
        $('#stiaoxiu').val('0');
        $('#sqingjia').val('0');
        $('#skuanggong').val('0');
        $('#schidao').val('0');
        $('#slunxiu').val('0');
        $('#sjiaban').val('0');
        $('#schuchai').val('0');
        $('#sremark').val('');
        $('#ssum').val('');
        $('#sftiaoxiu').val("");
        $('#sfqingjia').val("");
        $('#sfkuanggong').val("");
        $('#sfchidao').val("");
        $('#sflunxiu').val("");
        $('#sfjiaban').val("");
        $('#sfchuchai').val("");
        $('#sfchuqing').val("");
    }
    function clearbe() {
        $('#week1').val('');
        $('#week2').val('');
        $('#week3').val('');
        $('#week4').val('');
        $('#period').val('');
        $('#tiaoxiu').val('0');
        $('#qingjia').val('0');
        $('#kuanggong').val('0');
        $('#chidao').val('0');
        $('#lunxiu').val('0');
        $('#jiaban').val('0');
        $('#chuchai').val('0');
        $('#remark').val('');
        $('#sum').val('');
        $('#ftiaoxiu').val("");
        $('#fqingjia').val("");
        $('#fkuanggong').val("");
        $('#fchidao').val("");
        $('#flunxiu').val("");
        $('#fjiaban').val("");
        $('#fchuchai').val("");
        $('#fchuqing').val("");
    }
    function clearem() {
        $("#yemployeeId").val("");
        $("#yName").val("");
        $("#yPost").val("");
        $("#yUserName").val("");
        $("#xemployeeId").val('');
        $("#xName").val('');
        $("#xPost").val('');
        $("#xUserName").val('');
        $('#sBeId').val('');
        $("#mySelect").find("option:not(:first)").remove();
        $("#cycleSelect").find("option:not(:first)").remove();
    }
    function findyeji(UserName) {
        var unitObj1 = document.getElementById("mySelect");
        $("#mySelect").find("option:not(:first)").remove();
        $.ajax({
            url:"/findUserNameByName",
            datatype:"json",
            data:{"Name":UserName},
            type:"post",
            success:function (data) {
                // console.log(data[0].userName);
                var userName=data[0].userName;
                $.ajax({
                    url: "/findPeByUserName",//请求地址
                    datatype: "json",//数据格式
                    data: {"UserName": userName},
                    type: "post",//请求方式
                    success: function (data) {
                        var cycle = data["cyclelist"];
                        var emlist = data["emlist"];
                        var employee=emlist[0];
                        $("#yemployeeId").val(employee.id);
                        $("#yName").val(employee.name);
                        $("#yPost").val(employee.post);
                        $("#yUserName").val(employee.userName);
                        for(var i=0;i<cycle.length;i++){
                            unitObj1.options.add(new Option(cycle[i]));
                        }
                    }
                })
            }
        })

    }
    function findxingwei(UserName) {
        var unitObj1 = document.getElementById("cycleSelect");
        $("#cycleSelect").find("option:not(:first)").remove();
        $.ajax({
            url:"/findUserNameByName",
            datatype:"json",
            data:{"Name":UserName},
            type:"post",
            success:function (data) {
                // console.log(data[0].userName);
                var userName=data[0].userName;
                $.ajax({
                    url: "/findBeByUserName",//请求地址
                    datatype: "json",//数据格式
                    data: {"UserName": userName},
                    type: "post",//请求方式
                    success: function (data) {
                        var cycle = data["cyclelist"];
                        var emlist = data["emlist"];
                        var employee=emlist[0];
                        $("#xemployeeId").val(employee.id);
                        $("#xName").val(employee.name);
                        $("#xPost").val(employee.post);
                        $("#xUserName").val(employee.userName);
                        for(var i=0;i<cycle.length;i++){
                            unitObj1.options.add(new Option(cycle[i]));
                        }
                    }
                })
            }
        })

    }

    function logout() {
        window.location.href = "/logout";
    }

    function ccc() {
        var tabList = document.getElementById("tab-list");
        var tDiv = document.getElementById("tDiv");
        var Username = sessionStorage.Username;

        $.ajax(
            {
                url: '/GetPeriod',
                type: "POST",
                datatype: 'json',
                data:
                    {
                        Username: Username
                    },
                success: function (result) {
                   
                    // data = result;
                    // sessionStorage.Score = data[0].testScore;
                    // var html = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp现您已完成" + data[0].actualCredit.toFixed(2) + "学分，已完成" + data[0].actualperiod.toFixed(2) + "学时，继续加油吧～";
                    // $('#position').html(html);
                }
            });
    }


    function dataisNull(x){
        if(x!=null&x!=''){
            return x;
        }else return 0
    }
    function selectBe() {
        var employeeId = $("#employeeId").val();
        var unitObj1 = document.getElementById("scycleSelect");
        var cycle;
        if (unitObj1 != null) {
            cycle = unitObj1.value;
            $("#cycleSelect").css("color","black");
        }
        if(cycle!=null&cycle!="请选择"){
            var data = {"employeeId":employeeId,
                "cycle":cycle};
            $.ajax({
                url: "/findBe",//请求地址
                datatype: "json",//数据格式
                data: data,
                type: "post",//请求方式
                success: function (data) {   //如何发送成功
                    $('#sBeId').val(data.id);
                    $('#sweek1').val(data.week1);
                    $('#sweek2').val(data.week2);
                    $('#sweek3').val(data.week3);
                    $('#sweek4').val(data.week4);
                    $('#speriod').val(data.period);
                    $('#stiaoxiu').val(dataisNull(data.tiaoxiu));
                    $('#sqingjia').val(dataisNull(data.qingjia));
                    $('#skuanggong').val(dataisNull(data.kuanggong));
                    $('#schidao').val(dataisNull(data.chidao));
                    $('#slunxiu').val(dataisNull(data.lunxiu));
                    $('#schuchai').val(dataisNull(data.chuchai));
                    $('#sremark').val(data.remark);
                    $('#ssum').val(data.sum);
                    if (data.sum != null) {
                        var ftiaoxiu = (-1) * data.tiaoxiu;
                        $('#sftiaoxiu').val(ftiaoxiu);
                        var fqingjia = (-6) * data.qingjia;
                        $('#sfqingjia').val(fqingjia);
                        var fkuanggong = (-20) * data.kuanggong;
                        $('#sfkuanggong').val(fkuanggong);
                        var fchidao = (-1) * data.chidao;
                        $('#sfchidao').val(fchidao);
                        var flunxiu = (-1) * data.lunxiu;
                        $('#sflunxiu').val(flunxiu);
                        var fchuchai = 2 * data.chuchai;
                        $('#sfchuchai').val(fchuchai);
                        var fchuqing = 50 - data.tiaoxiu * 2 - data.qingjia * 2 - data.kuanggong * 2 - data.chidao * 2 - data.lunxiu * 2;
                        $('#sfchuqing').val(fchuqing);
                    }else {
                        $('#sftiaoxiu').val("");
                        $('#sfqingjia').val("");
                        $('#sfkuanggong').val("");
                        $('#sfchidao').val("");
                        $('#sflunxiu').val("");
                        $('#sfchuchai').val("");
                        $('#sfchuqing').val("");
                    }
                }
            });
            $.ajax({
                url: "/getAssessmentByEmployeeId",//请求地址
                datatype: "json",//数据格式
                data: {"cycle":cycle,"employeeId":employeeId},
                type: "post",//请求方式
                success: function (data) { 
                	$('#sfjiaban').val(data.jiaban);
                	$('#sfzhiban').val(data.zhiban);
                	$('#sfkaoqin').val(data.kaoqin);
                	$('#sfnetPerformance').val(data.netPerformance);
                	$('#sfnetPerformance').val(data.netPerformance);
                	$('#sfnetPerformance').val(data.netPerformance);
                	$('#sfcomprehensivePerformance').val(data.comprehensivePerformance);
                }
        	});
        }
    }

    function additable() {
        layui.use('layer', function () { //独立版的layer无需执行这一句
            var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
            //触发事件
            var employeeId = $("#employeeId").val();
            var type = "auto";
            layer.open({
                type: 2
                , title: '员工考核'
                , offset: type //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
                , id: 'layerDemo' + type //防止重复弹出
                , area: ['100vw', '100vh']
                , content: '/appraise?employeeId=' + employeeId
            });


        });
    }

    return {
        ccc: ccc,
        selectEm: selectEm,
        updateEm: updateEm,
        logout: logout,
        additable: additable,
        showUserNameList: showUserNameList,
        findappraise:findappraise,
        findPeAcc:findPeAcc,
        additable:additable,
        selectCycle:selectCycle,
        selectBeCycle:selectBeCycle,
        selectBe:selectBe,
        BeAddCycle:BeAddCycle,
        selectBeCycles:selectBeCycles
    }
}(jQuery))

function x2(x) {
    $(x).removeClass("buttonme2");
    $(x).addClass("buttonme1");
    $(x).siblings().removeClass("buttonme1");
    $(x).siblings().addClass("buttonme2");
}
function x1(x){
    $(x).removeClass("buttonme2");
    $(x).addClass("buttonme1");
    $(x).siblings().removeClass("buttonme1");
    $(x).siblings().addClass("buttonme2");

}
function y(x,y){
    document.getElementById(x).style.display = ''
    document.getElementById(y).style.display = 'none'
}

$(function () {
    $("#buttonme1").click(function () {
        x1("#buttonme1");
        y('jibenxinxi','kuozhanxinxi');
    });
});
$(function () {
    $("#buttonme2").click(function () {
        x2("#buttonme2");
        y('kuozhanxinxi','jibenxinxi');
    });
});
$(function () {
    $("#buttonAp2").click(function () {
        x2("#buttonAp2");
        y("xingwei","yeji");
        y("xingweiButton","yejiButton");

    });
});
$(function () {
    $("#buttonAp1").click(function () {
        x1("#buttonAp1");
        y("yeji","xingwei");
        y("yejiButton","xingweiButton");
    });
});
$(function () {
    $("#buttonAp4").click(function () {
        x2("#buttonAp4");
        y("xingweiself","yejiself");
    });
});
$(function () {
    $("#buttonAp3").click(function () {
        x1("#buttonAp3");
        y("yejiself","xingweiself");
    });
});

function loodtable() {
    layui.use('table', function () {
        var table = layui.table;
        var dim = $("#dim").val();

        var userName = sessionStorage.Username;
        var projectType = "";
        // var day2 = new Date();  //测试一下显示时间
        // day2.setTime(day2.getTime());
        // var time = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
        // alert(time);
        $.ajax({
            //请求方式
            type : "POST",
            //请求的媒体类型
            // contentType: "application/json;charset=UTF-8",
            //请求地址
            url : "/getProjectIdS",
            //数据，json字符串
            data :  {
                "userName": userName
            },
            datatype:'json',
            //请求成功
            success : function(data) {
                console.log(data.data[0].projectId);
                projectType = data.data[0].projectId;

                table.render({
                    elem: '#test'
                    , url: '/findInf?dim=' + dim+'&userName=' + userName + '&type2=' + projectType
                    , cols: [[
                        {field: 'zizeng', width: 98, title: '排名', templet: '#zizeng'}
                        , {field: 'title', align: 'left', width: 150, title: '标题'}
                        , {field: 'type1', align: 'left', width: 100, title: '隐藏属性',hide:true}
                        , {field: 'type2', align: 'left', width: 170, title: '通知类型'}
                        , {field: 'content', align: 'left', width: 480, title: '内容'}
                        , {field: 'time', width: 144, title: '时间', sort: true}
                        , {field: 'rdStatus',align:'left',title:'状态',width:73}
                        , {fixed: 'right', title: '详情', toolbar: '#barDemo', width: 75}


                    ]],

                    done:function type (res,curr,count) {
                        $("[data-field='rdStatus']").children().each(function(){
                            if($(this).text()==='1'){
                                $(this).text("已读")
                            }else if($(this).text()==='状态'){
                                $(this).text("状态")
                            }else if($(this).text()==='已读'){
                                $(this).text("已读")
                            } else {
                                $(this).text("未读")
                            }
                        });

                        $("[data-field='type1']").children().each(function(){
                            if($(this).text()==='隐藏属性'){
                                // $(this).text("通知类型")
                                // $(this).next.text("通知类型")
                                $(this).parent().next().children().text("通知类型");
                            }else if($(this).text()==='1'){
                                $(this).text("项目部通知");
                                if($(this).parent().next().children().text()==="1"){
                                    $(this).parent().next().children().text("嘉爱斯运维")
                                }else if($(this).parent().next().children().text()==="2"){
                                    $(this).parent().next().children().text("泰爱斯运维")
                                }else if($(this).parent().next().children().text()==="3"){
                                    $(this).parent().next().children().text("浦江运维")
                                }else if($(this).parent().next().children().text()==="4"){
                                    $(this).parent().next().children().text("临江运维")
                                }
                            }else if($(this).text()==='2'){
                                $(this).text("类型通知");
                                if($(this).parent().next().children().text()==="1"){
                                    $(this).parent().next().children().text("公司制度")
                                }else if($(this).parent().next().children().text()==="2"){
                                    $(this).parent().next().children().text("运维规程")
                                }else if($(this).parent().next().children().text()==="3"){
                                    $(this).parent().next().children().text("公司制度+运维规程")
                                }
                            } else {
                                $(this).text("未知");
                                $(this).parent().next().children().text("未知");
                            }
                        });
                        pageCurr=curr;
                    }

                    , page: true
                });



                table.on('tool(demo)', function (obj) {
                    var data = obj.data;
                    if (obj.event === 'detail') {

                        var userName=sessionStorage.Username;
                        var informId=data.id;

                        obj.update({
                            rdStatus: '已读'
                        });
                        var rdStatusxx=1;

                        var readStatus = {informId:informId,userName:userName,rdStatus:rdStatusxx};

                        $.ajax({
                            //请求方式
                            type : "POST",
                            //请求的媒体类型
                            contentType: "application/json;charset=UTF-8",
                            //请求地址
                            url : "/updateStatus",
                            //数据，json字符串
                            data :  JSON.stringify(readStatus),

                            //请求成功
                            success : function(data) {

                                console.log(data);

                            },
                            //请求失败，包含具体的错误信息
                            error : function(e){
                                console.log(e.status);
                                console.log(e.responseText);
                                // window.location.reload();


                                //console.log(obj)

                                // var rows = $(this).prevAll().length+1; //点的这个东西压根就不是table里的！
                                // // alert($(this).prevAll());
                                // // console.log($(this).prevAll());
                                // // alert(rows);
                                // // layer.alert(JSON.stringify(data), {
                                // //     title: '当前行数据：'
                                // // });
                                // $("[data-field='rdStatus']").children().eq(rows).each(function(){
                                //
                                //         $(this).text("已读")
                                //
                                // });
                            }
                        });



                        if (data.filedir != null & data.filedir != '') {
                            var dir = data.filedir;
                            console.log(dir);
                            var index1 = dir.slice(dir.lastIndexOf(".") + 1);
                            console.log(index1);
                            if (index1 == "html") {
                                var fileName = data.filedir.slice(7);
                                window.open("/my/" + fileName);
                            } else {
                                window.location.href = "/download?id=" + data.id;
                            }
                        } else {
                            alert("无文件");
                        }

                    }
                });
                table.on('sort(demo)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
                    //尽管我们的 table 自带排序功能，但并没有请求服务端。
                    //有些时候，你可能需要根据当前排序的字段，重新向服务端发送请求，从而实现服务端排序，如：
                    table.reload('test', {
                        initSort: obj //记录初始排序，如果不设的话，将无法标记表头的排序状态。 layui 2.1.1 新增参数
                        // ,where: { //请求参数（注意：这里面的参数可任意定义，并非下面固定的格式）
                        //     field: obj.time //排序字段
                        //     ,order: obj.type //排序方式
                        // }
                    });
                    form.render();
                });
            },
            //请求失败，包含具体的错误信息
            error : function(e){
                console.log(e.status);
                console.log(e.responseText);
            }
        });


    });

}
function selectLaborProjectS(value){
    var userName = sessionStorage.Username;
    var projectId=[];
    console.log(userName);
    $.ajax({
        url: '/getProjectIdS',
        type: "POST",
        datatype: 'json',
        data:{
            "userName":userName,
        },
        success: function (data) {
            console.log(data);
            var pLength= data.data.projectId.length;
            if(pLength===1){
                projectId[0]=data.data.projectId.substr(0,1);
            }else if(pLength===3){
                projectId[0]=data.data.projectId.substr(0,1);
                projectId[1]=data.data.projectId.substr(2,1);
            }else if(pLength===5){
                projectId[0]=data.data.projectId.substr(0,1);
                projectId[1]=data.data.projectId.substr(2,1);
                projectId[2]=data.data.projectId.substr(4,1);

            }else if(pLength===7){
                projectId[0]=data.data.projectId.substr(0,1);
                projectId[1]=data.data.projectId.substr(2,1);
                projectId[2]=data.data.projectId.substr(4,1);
                projectId[3]=data.data.projectId.substr(6,1);
            }
            for(var i=0;i<projectId.length;i++)
            {
                $('#selectLaborProjectS').append("<option value='"+i+"'>"+name[i]+"</option>");
            }
        }
    });
}

function setColor(selectId) {
    var unitObj = document.getElementById(selectId);
    if (unitObj != null&selectId!=null) {
        var manager = unitObj.value;
        if(manager!='请选择'){
            $("#"+selectId).css("color","black");
        }else {
            $("#"+selectId).css("color","#9B9B9B");
        }
    }
}

$(function(){
	layui.use('laydate', function(){
		var laydate = layui.laydate;
		
		//执行一个laydate实例
		laydate.render({
			elem: '#achievementTime' //指定元素
			,type: 'month'
			,value: new Date()
			,btns: ['confirm']
			,done: function(value){
				fillAchievementRecord(value);
			}
		});
	});
});
function showAchievementRecord(value){
	document.getElementById("achievementRecord").style.display="block";
	document.getElementById("banner").style.display="block";
	console.log(sessionStorage);
	var Username=sessionStorage.Username;
	$("#achievementUserName").html(Username);
	var cycle = $('#achievementTime').val();
	fillAchievementRecord(cycle);
	
}

function showLaborRecord(value){
	document.getElementById("achievementRecord-labor").style.display="block";
	document.getElementById("banner").style.display="block";
	var Username=sessionStorage.Username;
	console.log(Username);

    var MonthDate = "";
    var DayDate = "";
    var DayDateT = "";
    var LaborTime = 0;

    layui.use('laydate', function(){
        var laydate = layui.laydate;

        layui.use('table', function(){
            var table = layui.table;

            //默认加载全部信息
            table.render({
                elem: '#labor'
                ,height: 470
                ,url: '/showLaborAll?userName='+ Username +'&MonthDate=' + MonthDate +'&DayDateT=' + DayDateT   //数据接口
                ,page: true //开启分页
                ,cols: [[ //表头
                    {field: 'zizeng-labor',align:'center', width: 90, title: '序号', templet: '#zizeng-labor'}
                    ,{field: 'defectNumber',align:'center', title: '故障号', width:150, sort:true}
                    ,{field: 'content',align:'center', title: '工作详情', width:200, sort: true}
                    ,{field: 'workingHours',align:'center', title: '工时详情', width:150, sort: true}
                    ,{field: 'datetime',align:'center', title: '创建时间', width: 200, sort: true}
                    // ,{field: 'title', align: 'left', width: 150, title: '标题'}
                    // ,{field: 'type1', align: 'left', width: 100, title: '通知类型'}
                    // ,{field: 'type2', align: 'left', width: 170, title: '详细划分'}
                ]],
                done:function type (res,curr,count) {

                    // console.log(res.data[1].workingHours);
                    // console.log(curr);
                    // console.log(count)
                    for(var i = 0;i<res.data.length;i++){
                        LaborTime+=res.data[i].workingHours;
                    }
                    // $("#laborTime").val(LaborTime);
                    console.log(LaborTime);
                    $('#laborTime').prop("placeholder",LaborTime);
                    pageCurr=curr;
                }
            });

        });


        //执行一个laydate实例
        laydate.render({
            elem: '#laborMonth' //指定元素
            ,type:'month'
            ,max:0
            ,done:function (value,date,endDate) {
                MonthDate=value;//真实年月


                DayDateT="";
                LaborTime = 0;

                var showMonth = MonthDate.substr(0,4)+"年"+MonthDate.substr(5,2)+"月";
                console.log(showMonth);
                $("#laborMonth").val("");//此处清空月份选择器,但是很奇怪，这里没清掉
                $('#laborMonth').prop("placeholder",showMonth);


                layui.use('table', function(){
                    var table = layui.table;

                    table.reload();

                    //第一个实例
                    table.render({
                        elem: '#labor'
                        ,height: 470
                        ,url: '/showLaborAll?userName='+ Username +'&MonthDate=' + MonthDate +'&DayDateT=' + DayDateT   //数据接口
                        ,page: true //开启分页
                        ,cols: [[ //表头
                            {field: 'zizeng-labor',align:'center', width: 90, title: '序号', templet: '#zizeng-labor'}
                            ,{field: 'defectNumber',align:'center', title: '故障号', width:150, sort:true}
                            ,{field: 'content',align:'center', title: '工作详情', width:200, sort: true}
                            ,{field: 'workingHours',align:'center', title: '工时详情', width:150, sort: true}
                            ,{field: 'datetime',align:'center', title: '创建时间', width: 200, sort: true}
                        ]],
                        done:function type (res,curr,count) {

                            for(var i = 0;i<res.data.length;i++){
                                LaborTime+=res.data[i].workingHours;
                            }
                            // $("#laborTime").val(LaborTime);
                            console.log(LaborTime);
                            $('#laborTime').prop("placeholder",LaborTime);
                            pageCurr=curr;
                        }
                    });

                });

                console.log(MonthDate);
                DayDate=MonthDate+"-01";//虚设初始化日期
                console.log(DayDate);
                $("#laborDay").remove();//移除后重新加载，因为LayDate不能二次渲染...
                $("#resetLaborDay").html('<input type="text" class="layui-input" placeholder="请选择日期" id="laborDay" style="height:36px;width:150px;display: none;">');
                document.getElementById("laborDay").style.display="block";
                $("#laborDay").val("");//此处清空日期选择器
                laydate.render({
                    elem: '#laborDay' //指定元素
                    ,type:'date'
                    ,min:MonthDate+'-1'
                    ,max:MonthDate+'-31'
                    ,isInitValue: false //是否允许填充初始值，默认为 true
                    ,value:DayDate
                    // ,mark:{
                    //     '0-09-12':'生日'
                    // }
                    ,done:function (value,date,endDate) {
                        DayDateT = value;
                        console.log(DayDateT);
                        LaborTime = 0;

                        var showDay = DayDateT.substr(8,2);

                        console.log(showDay)
                        $("#laborDay").val("");//此处清空日期选择器
                        $('#laborDay').prop("placeholder",showDay+"日");


                        layui.use('table', function(){
                            var table = layui.table;

                            //第一个实例
                            table.render({
                                elem: '#labor'
                                ,height: 470
                                ,url: '/showLaborAll?userName='+ Username +'&MonthDate=' + MonthDate +'&DayDateT=' + DayDateT   //数据接口
                                ,page: true //开启分页
                                ,cols: [[ //表头
                                    {field: 'zizeng-labor',align:'center', width: 90, title: '序号', templet: '#zizeng-labor'}
                                    ,{field: 'defectNumber',align:'center', title: '故障号', width:150, sort:true}
                                    ,{field: 'content',align:'center', title: '工作详情', width:200, sort: true}
                                    ,{field: 'workingHours',align:'center', title: '工时详情', width:150, sort: true}
                                    ,{field: 'datetime',align:'center', title: '创建时间', width: 200, sort: true}
                                    // ,{field: 'title', align: 'left', width: 150, title: '标题'}
                                    // ,{field: 'type1', align: 'left', width: 100, title: '通知类型'}
                                    // ,{field: 'type2', align: 'left', width: 170, title: '详细划分'}
                                ]],
                                done:function type (res,curr,count) {

                                    for(var i = 0;i<res.data.length;i++){
                                        LaborTime+=res.data[i].workingHours;
                                    }
                                    // $("#laborTime").val(LaborTime);
                                    console.log(LaborTime);
                                    $('#laborTime').prop("placeholder",LaborTime);
                                    pageCurr=curr;
                                }
                            });

                        });

                    }

                    // ,value:'01日'
                    // ,format:'dd日'
                });
            }
        });
        // laydate.render({
        //     elem: '#laborDay' //指定元素
        //     ,type:'date'
        //     ,max:0
        // });

    });
	// $("#achievementUserName").html(Username);
	// var cycle = $('#achievementTime').val();
	// fillAchievementRecord(cycle);





}
function showLaborRecord2(value){
	document.getElementById("achievementRecord-labor").style.display="block";
	document.getElementById("banner").style.display="block";

    var MonthDate = "";
    var DayDate = "";
    var DayDateT = "";
    var LaborTime = 0;

    var name=[];//name
    var Name=[];//username
    var Username;
    //获取全部员工名字

    layui.use('form', function(){
        var form = layui.form;
        form.render();

        $.ajax({
            url: '/getName',
            type: "POST",
            datatype: 'json',
            data:{
                userName:"G999",
            },
            success: function (data) {
                $("#department").empty();
                // console.log(data.data);
                for(var i=0;i<data.data.length;i++){
                    name[i]=data.data[i].name;
                    Name[i]=data.data[i].userName;
                    // console.log(Name[i]);
                    $('#department').append("<option value='"+i+"'>"+name[i]+"</option>");
                    $("#department").val("");


                }

                form.on('select(department)', function(data){
                    var val=data.value;

                    document.getElementById('laborMonth').style.display='';
                    document.getElementById('lTime1').style.display='';
                    document.getElementById('lTime2').style.display='';

                    // console.log(data.elem); //得到select原始DOM对象
                    // console.log(data.value); //得到被选中的值
                    for(var i=0;i<Name.length;i++){

                        if(i == data.value ){
                            Username=Name[i];
                            // console.log(Name[i]);
                            console.log(Username);
                        }else{
                            // console.log(i);
                            // console.log(name[i]);
                            // console.log(data.value);
                        }
                    }
                    console.log(Username);
                    layui.use('laydate', function(){
                        var laydate = layui.laydate;

                        layui.use('table', function(){
                            var table = layui.table;

                            //默认加载全部信息
                            table.render({
                                elem: '#labor'
                                ,height: 470
                                ,url: '/showLaborAll?userName='+ Username +'&MonthDate=' + MonthDate +'&DayDateT=' + DayDateT   //数据接口
                                ,page: true //开启分页
                                ,cols: [[ //表头
                                    {field: 'zizeng-labor',align:'center', width: 90, title: '序号', templet: '#zizeng-labor'}
                                    ,{field: 'defectNumber',align:'center', title: '故障号', width:150, sort:true}
                                    ,{field: 'content',align:'center', title: '工作详情', width:200, sort: true}
                                    ,{field: 'workingHours',align:'center', title: '工时详情', width:150, sort: true}
                                    ,{field: 'datetime',align:'center', title: '创建时间', width: 200, sort: true}
                                ]],
                                done:function type (res,curr,count) {

                                    // console.log(res.data[1].workingHours);
                                    // console.log(curr);
                                    // console.log(count)
                                    for(var i = 0;i<res.data.length;i++){
                                        LaborTime+=res.data[i].workingHours;
                                    }
                                    // $("#laborTime").val(LaborTime);
                                    console.log(LaborTime);
                                    $('#laborTime').prop("placeholder",LaborTime);
                                    pageCurr=curr;
                                }
                            });
                        });
                        //执行一个laydate实例
                        laydate.render({
                            elem: '#laborMonth' //指定元素
                            ,type:'month'
                            ,max:0
                            ,done:function (value,date,endDate) {
                                MonthDate=value;//真实年月


                                DayDateT="";
                                LaborTime = 0;

                                var showMonth = MonthDate.substr(0,4)+"年"+MonthDate.substr(5,2)+"月";
                                console.log(showMonth);
                                $("#laborMonth").val("");//此处清空月份选择器,但是很奇怪，这里没清掉
                                $('#laborMonth').prop("placeholder",showMonth);


                                layui.use('table', function(){
                                    var table = layui.table;

                                    table.reload();

                                    //第一个实例
                                    table.render({
                                        elem: '#labor'
                                        ,height: 470
                                        ,url: '/showLaborAll?userName='+ Username +'&MonthDate=' + MonthDate +'&DayDateT=' + DayDateT   //数据接口
                                        ,page: true //开启分页
                                        ,cols: [[ //表头
                                            {field: 'zizeng-labor',align:'center', width: 90, title: '序号', templet: '#zizeng-labor'}
                                            ,{field: 'defectNumber',align:'center', title: '故障号', width:150, sort:true}
                                            ,{field: 'content',align:'center', title: '工作详情', width:200, sort: true}
                                            ,{field: 'workingHours',align:'center', title: '工时详情', width:150, sort: true}
                                            ,{field: 'datetime',align:'center', title: '创建时间', width: 200, sort: true}
                                        ]],
                                        done:function type (res,curr,count) {

                                            for(var i = 0;i<res.data.length;i++){
                                                LaborTime+=res.data[i].workingHours;
                                            }
                                            // $("#laborTime").val(LaborTime);
                                            console.log(LaborTime);
                                            $('#laborTime').prop("placeholder",LaborTime);
                                            pageCurr=curr;
                                        }
                                    });

                                });

                                console.log(MonthDate);
                                DayDate=MonthDate+"-01";//虚设初始化日期
                                console.log(DayDate);
                                $("#laborDay").remove();//移除后重新加载，因为LayDate不能二次渲染...
                                $("#resetLaborDay").html('<input type="text" class="layui-input" placeholder="请选择日期" id="laborDay" style="height:36px;width:150px;display: none;">');
                                document.getElementById("laborDay").style.display="block";
                                $("#laborDay").val("");//此处清空日期选择器
                                laydate.render({
                                    elem: '#laborDay' //指定元素
                                    ,type:'date'
                                    ,min:MonthDate+'-1'
                                    ,max:MonthDate+'-31'
                                    ,isInitValue: false //是否允许填充初始值，默认为 true
                                    ,value:DayDate
                                    // ,mark:{
                                    //     '0-09-12':'生日'
                                    // }
                                    ,done:function (value,date,endDate) {
                                        DayDateT = value;
                                        console.log(DayDateT);
                                        LaborTime = 0;

                                        var showDay = DayDateT.substr(8,2);

                                        console.log(showDay)
                                        $("#laborDay").val("");//此处清空日期选择器
                                        $('#laborDay').prop("placeholder",showDay+"日");


                                        layui.use('table', function(){
                                            var table = layui.table;

                                            //第一个实例
                                            table.render({
                                                elem: '#labor'
                                                ,height: 470
                                                ,url: '/showLaborAll?userName='+ Username +'&MonthDate=' + MonthDate +'&DayDateT=' + DayDateT   //数据接口
                                                ,page: true //开启分页
                                                ,cols: [[ //表头
                                                    {field: 'zizeng-labor',align:'center', width: 90, title: '序号', templet: '#zizeng-labor'}
                                                    ,{field: 'defectNumber',align:'center', title: '故障号', width:150, sort:true}
                                                    ,{field: 'content',align:'center', title: '工作详情', width:200, sort: true}
                                                    ,{field: 'workingHours',align:'center', title: '工时详情', width:150, sort: true}
                                                    ,{field: 'datetime',align:'center', title: '创建时间', width: 200, sort: true}
                                                ]],
                                                done:function type (res,curr,count) {

                                                    for(var i = 0;i<res.data.length;i++){
                                                        LaborTime+=res.data[i].workingHours;
                                                    }
                                                    // $("#laborTime").val(LaborTime);
                                                    console.log(LaborTime);
                                                    $('#laborTime').prop("placeholder",LaborTime);
                                                    pageCurr=curr;
                                                }
                                            });
                                        });
                                    }
                                });
                            }
                        });
                    });
                });
                form.render();
            }
        });
        form.render();
    });
}
function showLaborRecord3(value){
    layui.use('form', function(){
        var form = layui.form;
        form.render();
        var userName = sessionStorage.Username;
        var projectId=[];
        var nameInf=[];//员工姓名序列
        var nameInfLength;//员工姓名序列长度
        var userNameInf=[];//员工编号序列
        console.log(userName);
        $.ajax({//获取项目部
            url: '/getProjectIdS',
            type: "POST",
            datatype: 'json',
            data:{
                "userName":userName,
            },
            success: function (data) {
                // console.log(data);
                // console.log(data.data);
                // console.log(data.data[0].projectId);
                var pLength= data.data[0].projectId.length;
                // console.log(pLength);
                if(pLength===1){
                    projectId[0]=data.data[0].projectId.substr(0,1);
                }else if(pLength===3){
                    projectId[0]=data.data[0].projectId.substr(0,1);
                    projectId[1]=data.data[0].projectId.substr(2,1);
                }else if(pLength===5){
                    projectId[0]=data.data[0].projectId.substr(0,1);
                    projectId[1]=data.data[0].projectId.substr(2,1);
                    projectId[2]=data.data[0].projectId.substr(4,1);

                }else if(pLength===7){
                    projectId[0]=data.data[0].projectId.substr(0,1);
                    projectId[1]=data.data[0].projectId.substr(2,1);
                    projectId[2]=data.data[0].projectId.substr(4,1);
                    projectId[3]=data.data[0].projectId.substr(6,1);
                }
                // console.log(projectId.length)
                var projectName=[];
                $("#selectLaborProjectS").empty();
                for(var i=0;i<projectId.length;i++) {
                    if(projectId[i]==1){
                        projectName[i]="嘉爱斯运维";
                    };
                    if(projectId[i]==2){
                        projectName[i]="泰爱斯运维";
                    };
                    if(projectId[i]==3){
                        projectName[i]="浦江运维";
                    };
                    if(projectId[i]==4){
                        projectName[i]="临江运维";
                    };
                    console.log(i);
                    console.log(projectName[i]);


                    $('#selectLaborProjectS').append("<option value='"+i+"'>"+projectName[i]+"</option>");
                }
                form.render();
                $("#selectLaborProjectS").val("");
                form.render();
            }
        });
        form.on('select(selectLaborProjectS)', function(data){
            var val=data.value;
            var proId=++val;
            console.log(val);
            console.log(proId);
            document.getElementById("laborMonthS").style.display="";
            document.getElementById("showTable").style.display="none";
            $.ajax({//通过项目部员工姓名
                url: '/getNameByProjectId',
                type: "POST",
                datatype: 'json',
                data:{
                    projectId: proId,
                },
                success: function (data) {
                    for(var i=0;i<data.data.length;i++) {
                        nameInf[i] = data.data[i].name;
                        userNameInf[i] = data.data[i].userName;//获取当前选择项目部的全部员工编号
                    }
                    console.log(userNameInf)
                    var nameInfLength=data.data.length;
                    var sumInf=new Array()//员工总工时
                    for (var i = 0; i <nameInfLength ; i++) {
                        sumInf[i]=0;
                    }
                    layui.use('laydate', function(){
                        var laydate = layui.laydate;
                        //年月选择器
                        $("#laborMonthS").remove();//移除后重新加载，因为LayDate不能二次渲染...
                        $("#selectMonthS").html('<input type="text" class="layui-input" placeholder="请选择月份" id="laborMonthS" style="height:36px;width:150px;display:none;float: left;">');
                        document.getElementById("laborMonthS").style.display="";
                        laydate.render({
                            elem: '#laborMonthS'
                            ,type: 'month'
                            ,done:function (value,date,endDate) {
                                var datetime=value;//真实年月
                                var showMonth = datetime.substr(0,4)+"年"+datetime.substr(5,2)+"月";
                                console.log(datetime);
                                var MonthDate = datetime.substr(5,2);
                                // console.log(showMonth);
                                $("#laborMonthS").val("");//此处打算清空月份选择器以便于使用自己定义的样式显示内容,但是很奇怪，这里没清掉。
                                $('#laborMonthS').prop("placeholder",showMonth);

                                $.ajax({//通过项目部、年月获取员工工时
                                    url: '/getWorkingHoursByProPeople',
                                    type: "POST",
                                    datatype: 'json',
                                    data:{
                                        projectId: proId,
                                        datetime:datetime
                                    },
                                    success: function (data) {
                                        console.log(data);
                                        console.log(nameInfLength);
                                        var dayAttend = new Array();//员工每日工时
                                        for(var k=0;k<31;k++){
                                            dayAttend[k]=new Array();
                                            for(var j=0;j<nameInfLength;j++){
                                                dayAttend[k][j]=0
                                            }
                                        }
                                        for(var i=0;i<nameInfLength;i++){//对每一名员工进行循环遍历，i为员工在table中的序号
                                            sumInf[i]=0;
                                            for(var j=0;j<data.data.length;j++){//对每一名员工对应的考勤信息进行循环遍历
                                                if(nameInf[i]===data.data[j].name){//确定对应当前选中员工的考勤信息，i为员工在table中的序号
                                                    // console.log(nameInf[i])

                                                    // // sunInf[i]+=data.data[j];
                                                    // // console.log(data.data[j]);
                                                    var datetem = data.data[j].datetime.substr(8,2);//确定日期序号
                                                    var dateTem = parseInt(datetem)//转为整形
                                                    // console.log(datetem);
                                                    --dateTem;//确定日期数组下标
                                                    // console.log(dateTem);
                                                    dayAttend[dateTem][i]+=data.data[j].workingHours;
                                                    // console.log(data.data[j].workingHours);
                                                    // console.log(dateTem)
                                                    // console.log(dayAttend[dateTem])
                                                    // console.log(sumInf[i]);
                                                    sumInf[i]+=data.data[j].workingHours;
                                                }
                                                // console.log(sumInf)
                                            }
                                        }
                                        document.getElementById("showTable").style.display="";
                                        layui.use('table', function () {
                                            var table = layui.table;
                                            var dataS=new Array();
                                            for(var i=0;i<nameInfLength;i++)
                                            {
                                                dataS.push({
                                                    "userName":userNameInf[i],
                                                    "name":nameInf[i],
                                                    "sumInf":sumInf[i],
                                                    "day1":dayAttend[0][i],
                                                    "day2":dayAttend[1][i],
                                                    "day3":dayAttend[2][i],
                                                    "day4":dayAttend[3][i],
                                                    "day5":dayAttend[4][i],
                                                    "day6":dayAttend[5][i],
                                                    "day7":dayAttend[6][i],
                                                    "day8":dayAttend[7][i],
                                                    "day9":dayAttend[8][i],
                                                    "day10":dayAttend[9][i],
                                                    "day11":dayAttend[10][i],
                                                    "day12":dayAttend[11][i],
                                                    "day13":dayAttend[12][i],
                                                    "day14":dayAttend[13][i],
                                                    "day15":dayAttend[14][i],
                                                    "day16":dayAttend[15][i],
                                                    "day17":dayAttend[16][i],
                                                    "day18":dayAttend[17][i],
                                                    "day19":dayAttend[18][i],
                                                    "day20":dayAttend[19][i],
                                                    "day21":dayAttend[20][i],
                                                    "day22":dayAttend[21][i],
                                                    "day23":dayAttend[22][i],
                                                    "day24":dayAttend[23][i],
                                                    "day25":dayAttend[24][i],
                                                    "day26":dayAttend[25][i],
                                                    "day27":dayAttend[26][i],
                                                    "day28":dayAttend[27][i],
                                                    "day29":dayAttend[28][i],
                                                    "day30":dayAttend[29][i],
                                                    "day31":dayAttend[30][i],
                                                })
                                            }
                                            console.log(dataS)
                                            // console.log(nameInf);
                                            // console.log(userNameInf);
                                            // console.log(sumInf);
                                            // console.log(dayAttend);

                                            var userName = sessionStorage.Username;
                                            if(MonthDate=="01"||MonthDate=="03"||MonthDate=="05"||MonthDate=="07"||MonthDate=="08"||MonthDate=="10"||MonthDate=="12"){
                                                table.render({
                                                    elem: '#laborTimeS'
                                                    // , url: '/getNameByProjectId?projectId=' + proId
                                                    ,data:dataS
                                                    ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
                                                    ,defaultToolbar: ['filter', 'exports', 'print'
                                                        //     , { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
                                                        //     title: '提示'
                                                        //     ,layEvent: 'LAYTABLE_TIPS'
                                                        //     ,icon: 'layui-icon-tips'
                                                        // }
                                                    ]
                                                    // name:nameInf,
                                                    ,id: 'testReload'
                                                    ,cols: [[
                                                        {field: 'zizengN', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengN'}
                                                        , {field: 'userName', align: 'left', width: 90, title: '员工编号'}
                                                        , {field: 'name', align: 'left', width: 90, title: '员工姓名'}
                                                        , {field: 'sumInf', align: 'left',width: 90,title: '月总工时'}
                                                        , {field: 'day1', align: 'left',  title: '1日'}
                                                        , {field: 'day2', align: 'left',  title: '2日'}
                                                        , {field: 'day3', align: 'left',  title: '3日'}
                                                        , {field: 'day4', align: 'left',  title: '4日'}
                                                        , {field: 'day5', align: 'left',  title: '5日'}
                                                        , {field: 'day6', align: 'left',  title: '6日'}
                                                        , {field: 'day7', align: 'left',  title: '7日'}
                                                        , {field: 'day8', align: 'left',  title: '8日'}
                                                        , {field: 'day9', align: 'left',  title: '9日'}
                                                        , {field: 'day10', align: 'left',  title: '10日'}
                                                        , {field: 'day11', align: 'left',  title: '11日'}
                                                        , {field: 'day12', align: 'left',  title: '12日'}
                                                        , {field: 'day13', align: 'left',  title: '13日'}
                                                        , {field: 'day14', align: 'left',  title: '14日'}
                                                        , {field: 'day15', align: 'left',  title: '15日'}
                                                        , {field: 'day16', align: 'left',  title: '16日'}
                                                        , {field: 'day17', align: 'left',  title: '17日'}
                                                        , {field: 'day18', align: 'left',  title: '18日'}
                                                        , {field: 'day19', align: 'left',  title: '19日'}
                                                        , {field: 'day20', align: 'left',  title: '20日'}
                                                        , {field: 'day21', align: 'left',  title: '21日'}
                                                        , {field: 'day22', align: 'left',  title: '22日'}
                                                        , {field: 'day23', align: 'left',  title: '23日'}
                                                        , {field: 'day24', align: 'left',  title: '24日'}
                                                        , {field: 'day25', align: 'left',  title: '25日'}
                                                        , {field: 'day26', align: 'left',  title: '26日'}
                                                        , {field: 'day27', align: 'left',  title: '27日'}
                                                        , {field: 'day28', align: 'left',  title: '28日'}
                                                        , {field: 'day29', align: 'left',  title: '29日'}
                                                        , {field: 'day30', align: 'left',  title: '30日'}
                                                        , {field: 'day31', align: 'left',  title: '31日'}
                                                        // , {field: 'type1', align: 'left', width: 100, title: '通知类型'}
                                                        // , {field: 'type2', align: 'left', width: 170, title: '详细划分'}
                                                        // , {field: 'content', align: 'left', width: 380, title: '内容'}
                                                        // , {field: 'time', width: 144, title: '时间', sort: true}
                                                        // , {field: 'rdStatus',align:'left',title:'状态',width:73}
                                                        // , {fixed: 'right', title: '详情', toolbar: '#barDemo', width: 75}
                                                    ]],
                                                    done:function type (res,curr,count) {
                                                        // 表头点击事件
                                                        jQuery(document).on("click","th",function() {
                                                            var field = jQuery(this).attr("data-field");// 获取表格标题的data-field属性
                                                            if ("day1" == field){
                                                                // alert(jQuery(this).text());
                                                                var putMonth=datetime+"-01"
                                                            }
                                                            else if("day2"==field){
                                                                var putMonth=datetime+"-02"
                                                            }
                                                            else if("day3"==field){
                                                                var putMonth=datetime+"-03"
                                                            }
                                                            else if("day4"==field){
                                                                var putMonth=datetime+"-04"
                                                            }
                                                            else if("day5"==field){
                                                                var putMonth=datetime+"-05"
                                                            }
                                                            else if("day6"==field){
                                                                var putMonth=datetime+"-06"
                                                            }
                                                            else if("day7"==field){
                                                                var putMonth=datetime+"-07"
                                                            }
                                                            else if("day8"==field){
                                                                var putMonth=datetime+"-08"
                                                            }
                                                            else if("day9"==field){
                                                                var putMonth=datetime+"-09"
                                                            }
                                                            else if("day10"==field){
                                                                var putMonth=datetime+"-10"
                                                            }
                                                            else if("day11"==field){
                                                                var putMonth=datetime+"-11"
                                                            }
                                                            else if("day12"==field){
                                                                var putMonth=datetime+"-12"
                                                            }
                                                            else if("day13"==field){
                                                                var putMonth=datetime+"-13"
                                                            }
                                                            else if("day14"==field){
                                                                var putMonth=datetime+"-14"
                                                            }
                                                            else if("day15"==field){
                                                                var putMonth=datetime+"-15"
                                                            }
                                                            else if("day16"==field){
                                                                var putMonth=datetime+"-16"
                                                            }
                                                            else if("day17"==field){
                                                                var putMonth=datetime+"-17"
                                                            }
                                                            else if("day18"==field){
                                                                var putMonth=datetime+"-18"
                                                            }
                                                            else if("day19"==field){
                                                                var putMonth=datetime+"-19"
                                                            }
                                                            else if("day20"==field){
                                                                var putMonth=datetime+"-20"
                                                            }
                                                            else if("day21"==field){
                                                                var putMonth=datetime+"-21"
                                                            }
                                                            else if("day22"==field){
                                                                var putMonth=datetime+"-22"
                                                            }
                                                            else if("day23"==field){
                                                                var putMonth=datetime+"-23"
                                                            }
                                                            else if("day24"==field){
                                                                var putMonth=datetime+"-24"
                                                            }
                                                            else if("day25"==field){
                                                                var putMonth=datetime+"-25"
                                                            }
                                                            else if("day26"==field){
                                                                var putMonth=datetime+"-26"
                                                            }
                                                            else if("day27"==field){
                                                                var putMonth=datetime+"-27"
                                                            }
                                                            else if("day28"==field){
                                                                var putMonth=datetime+"-28"
                                                            }
                                                            else if("day29"==field){
                                                                var putMonth=datetime+"-29"
                                                            }
                                                            else if("day30"==field){
                                                                var putMonth=datetime+"-30"
                                                            }
                                                            else if("day31"==field){
                                                                var putMonth=datetime+"-31"
                                                            }
                                                            if(field=="day1"||field=="day2"||field=="day3"||field=="day4"||field=="day5"||field=="day6"||field=="day7"||field=="day8"||field=="day9"||field=="day10"||field=="day11"||field=="day12"||field=="day13"||field=="day14"||field=="day15"||field=="day16"||field=="day17"||field=="day18"||field=="day19"||field=="day20"||field=="day21"||field=="day22"||field=="day23"||field=="day24"||field=="day25"||field=="day26"||field=="day27"||field=="day28"||field=="day29"||field=="day30"||field=="day31"){
                                                                document.getElementById("achievementRecord-select").style.display="block";
                                                                document.getElementById("banner").style.display="block";
                                                                layui.use('table', function () {
                                                                    var table = layui.table;
                                                                    // console.log(proId);
                                                                    // console.log(putMonth)
                                                                    table.render({
                                                                        elem:'#labor-day'
                                                                        ,url:'/getMaintenanceByDate?projectId='+ proId +'&datetime=' + putMonth
                                                                        // ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
                                                                        // ,defaultToolbar: ['filter', 'exports', 'print'
                                                                        //     //     , { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
                                                                        //     //     title: '提示'
                                                                        //     //     ,layEvent: 'LAYTABLE_TIPS'
                                                                        //     //     ,icon: 'layui-icon-tips'
                                                                        //     // }
                                                                        // ]
                                                                        , cols: [[
                                                                            {field: 'zizeng-labor-day', align:'left',width: 75,title: '序号',sort: true, templet: '#zizeng-labor-day'}
                                                                            , {field: 'people', align: 'left', width: 190, title: '员工姓名'}
                                                                            , {field: 'workingHours', align: 'left', width: 90, title: '工时数'}
                                                                            , {field: 'content', align: 'left',title: '工作详情'}
                                                                        ]]
                                                                        , page: true
                                                                    })
                                                                })
                                                            }
                                                        })
                                                            // // 在所有表格的事件操作后都对下列需要显示/隐藏的表头添加“小手”样式
                                                            // var ths = jQuery(document).find('th');
                                                            // for (var i = 0; i <ths.length ; i++) {
                                                            //     if (jQuery(ths[i]).attr("data-field") == 'day1'){
                                                            //         jQuery(ths[i]).find(".th-inner").attr('style','cursor:pointer');
                                                            //     }
                                                            // }
                                                        pageCurr=curr;
                                                    }
                                                    , page: true
                                                });
                                            }else if(MonthDate=="04"||MonthDate=="06"||MonthDate=="09"||MonthDate=="11"){
                                                table.render({
                                                    elem: '#laborTimeS'
                                                    // , url: '/getNameByProjectId?projectId=' + proId
                                                    , data:dataS
                                                    ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
                                                    ,defaultToolbar: ['filter', 'exports', 'print'
                                                        //     , { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
                                                        //     title: '提示'
                                                        //     ,layEvent: 'LAYTABLE_TIPS'
                                                        //     ,icon: 'layui-icon-tips'
                                                        // }
                                                    ]

                                                    // name:nameInf,
                                                    ,id: 'testReload'
                                                    , cols: [[
                                                        {field: 'zizengN', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengN'}
                                                        , {field: 'userName', align: 'left', width: 90, title: '员工编号'}
                                                        , {field: 'name', align: 'left', width: 90, title: '员工姓名'}
                                                        , {field: 'sumInf', align: 'left',width: 90,title: '月总工时'}
                                                        , {field: 'day1', align: 'left', title: '1日'}
                                                        , {field: 'day2', align: 'left',  title: '2日'}
                                                        , {field: 'day3', align: 'left',  title: '3日'}
                                                        , {field: 'day4', align: 'left',  title: '4日'}
                                                        , {field: 'day5', align: 'left',  title: '5日'}
                                                        , {field: 'day6', align: 'left',  title: '6日'}
                                                        , {field: 'day7', align: 'left',  title: '7日'}
                                                        , {field: 'day8', align: 'left',  title: '8日'}
                                                        , {field: 'day9', align: 'left',  title: '9日'}
                                                        , {field: 'day10', align: 'left',  title: '10日'}
                                                        , {field: 'day11', align: 'left',  title: '11日'}
                                                        , {field: 'day12', align: 'left',  title: '12日'}
                                                        , {field: 'day13', align: 'left',  title: '13日'}
                                                        , {field: 'day14', align: 'left',  title: '14日'}
                                                        , {field: 'day15', align: 'left',  title: '15日'}
                                                        , {field: 'day16', align: 'left',  title: '16日'}
                                                        , {field: 'day17', align: 'left',  title: '17日'}
                                                        , {field: 'day18', align: 'left',  title: '18日'}
                                                        , {field: 'day19', align: 'left',  title: '19日'}
                                                        , {field: 'day20', align: 'left',  title: '20日'}
                                                        , {field: 'day21', align: 'left',  title: '21日'}
                                                        , {field: 'day22', align: 'left',  title: '22日'}
                                                        , {field: 'day23', align: 'left',  title: '23日'}
                                                        , {field: 'day24', align: 'left',  title: '24日'}
                                                        , {field: 'day25', align: 'left',  title: '25日'}
                                                        , {field: 'day26', align: 'left',  title: '26日'}
                                                        , {field: 'day27', align: 'left',  title: '27日'}
                                                        , {field: 'day28', align: 'left',  title: '28日'}
                                                        , {field: 'day29', align: 'left',  title: '29日'}
                                                        , {field: 'day30', align: 'left',  title: '30日'}
                                                        // , {field: 'type1', align: 'left', width: 100, title: '通知类型'}
                                                        // , {field: 'type2', align: 'left', width: 170, title: '详细划分'}
                                                        // , {field: 'content', align: 'left', width: 380, title: '内容'}
                                                        // , {field: 'time', width: 144, title: '时间', sort: true}
                                                        // , {field: 'rdStatus',align:'left',title:'状态',width:73}
                                                        // , {fixed: 'right', title: '详情', toolbar: '#barDemo', width: 75}
                                                    ]],
                                                    done:function type (res,curr,count) {
                                                        jQuery(document).on("click","th",function() {
                                                            var field = jQuery(this).attr("data-field");// 获取表格标题的data-field属性
                                                            if ("day1" == field){
                                                                // alert(jQuery(this).text());
                                                                var putMonth=datetime+"-01"
                                                            }
                                                            else if("day2"==field){
                                                                var putMonth=datetime+"-02"
                                                            }
                                                            else if("day3"==field){
                                                                var putMonth=datetime+"-03"
                                                            }
                                                            else if("day4"==field){
                                                                var putMonth=datetime+"-04"
                                                            }
                                                            else if("day5"==field){
                                                                var putMonth=datetime+"-05"
                                                            }
                                                            else if("day6"==field){
                                                                var putMonth=datetime+"-06"
                                                            }
                                                            else if("day7"==field){
                                                                var putMonth=datetime+"-07"
                                                            }
                                                            else if("day8"==field){
                                                                var putMonth=datetime+"-08"
                                                            }
                                                            else if("day9"==field){
                                                                var putMonth=datetime+"-09"
                                                            }
                                                            else if("day10"==field){
                                                                var putMonth=datetime+"-10"
                                                            }
                                                            else if("day11"==field){
                                                                var putMonth=datetime+"-11"
                                                            }
                                                            else if("day12"==field){
                                                                var putMonth=datetime+"-12"
                                                            }
                                                            else if("day13"==field){
                                                                var putMonth=datetime+"-13"
                                                            }
                                                            else if("day14"==field){
                                                                var putMonth=datetime+"-14"
                                                            }
                                                            else if("day15"==field){
                                                                var putMonth=datetime+"-15"
                                                            }
                                                            else if("day16"==field){
                                                                var putMonth=datetime+"-16"
                                                            }
                                                            else if("day17"==field){
                                                                var putMonth=datetime+"-17"
                                                            }
                                                            else if("day18"==field){
                                                                var putMonth=datetime+"-18"
                                                            }
                                                            else if("day19"==field){
                                                                var putMonth=datetime+"-19"
                                                            }
                                                            else if("day20"==field){
                                                                var putMonth=datetime+"-20"
                                                            }
                                                            else if("day21"==field){
                                                                var putMonth=datetime+"-21"
                                                            }
                                                            else if("day22"==field){
                                                                var putMonth=datetime+"-22"
                                                            }
                                                            else if("day23"==field){
                                                                var putMonth=datetime+"-23"
                                                            }
                                                            else if("day24"==field){
                                                                var putMonth=datetime+"-24"
                                                            }
                                                            else if("day25"==field){
                                                                var putMonth=datetime+"-25"
                                                            }
                                                            else if("day26"==field){
                                                                var putMonth=datetime+"-26"
                                                            }
                                                            else if("day27"==field){
                                                                var putMonth=datetime+"-27"
                                                            }
                                                            else if("day28"==field){
                                                                var putMonth=datetime+"-28"
                                                            }
                                                            else if("day29"==field){
                                                                var putMonth=datetime+"-29"
                                                            }
                                                            else if("day30"==field){
                                                                var putMonth=datetime+"-30"
                                                            }
                                                            else if("day31"==field){
                                                                var putMonth=datetime+"-31"
                                                            }
                                                            if(field=="day1"||field=="day2"||field=="day3"||field=="day4"||field=="day5"||field=="day6"||field=="day7"||field=="day8"||field=="day9"||field=="day10"||field=="day11"||field=="day12"||field=="day13"||field=="day14"||field=="day15"||field=="day16"||field=="day17"||field=="day18"||field=="day19"||field=="day20"||field=="day21"||field=="day22"||field=="day23"||field=="day24"||field=="day25"||field=="day26"||field=="day27"||field=="day28"||field=="day29"||field=="day30"||field=="day31"){
                                                                document.getElementById("achievementRecord-select").style.display="block";
                                                                document.getElementById("banner").style.display="block";
                                                                layui.use('table', function () {
                                                                    var table = layui.table;
                                                                    // console.log(proId);
                                                                    // console.log(putMonth)
                                                                    table.render({
                                                                        elem:'#labor-day'
                                                                        ,url:'/getMaintenanceByDate?projectId='+ proId +'&datetime=' + putMonth
                                                                        // ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
                                                                        // ,defaultToolbar: ['filter', 'exports', 'print'
                                                                        //     //     , { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
                                                                        //     //     title: '提示'
                                                                        //     //     ,layEvent: 'LAYTABLE_TIPS'
                                                                        //     //     ,icon: 'layui-icon-tips'
                                                                        //     // }
                                                                        // ]
                                                                        , cols: [[
                                                                            {field: 'zizeng-labor-day', align:'left',width: 75,title: '序号',sort: true, templet: '#zizeng-labor-day'}
                                                                            , {field: 'people', align: 'left', width: 190, title: '员工姓名'}
                                                                            , {field: 'workingHours', align: 'left', width: 90, title: '工时数'}
                                                                            , {field: 'content', align: 'left',title: '工作详情'}
                                                                        ]]
                                                                        , page: true
                                                                    })
                                                                })
                                                            }
                                                        })
                                                        pageCurr=curr;
                                                    }
                                                    , page: true
                                                });
                                            }else if(MonthDate=="02"){
                                                table.render({
                                                    elem: '#laborTimeS'
                                                    // , url: '/getNameByProjectId?projectId=' + proId
                                                    , data:dataS
                                                    ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
                                                    ,defaultToolbar: ['filter', 'exports', 'print'
                                                        //     , { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
                                                        //     title: '提示'
                                                        //     ,layEvent: 'LAYTABLE_TIPS'
                                                        //     ,icon: 'layui-icon-tips'
                                                        // }
                                                    ]

                                                    // name:nameInf,
                                                    ,id: 'testReload'
                                                    , cols: [[
                                                        {field: 'zizengN', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengN'}
                                                        , {field: 'userName', align: 'left', width: 90, title: '员工编号'}
                                                        , {field: 'name', align: 'left', width: 90, title: '员工姓名'}
                                                        , {field: 'sumInf', align: 'left',width: 90,title: '月总工时'}
                                                        , {field: 'day1', align: 'left', title: '1日'}
                                                        , {field: 'day2', align: 'left',  title: '2日'}
                                                        , {field: 'day3', align: 'left',  title: '3日'}
                                                        , {field: 'day4', align: 'left',  title: '4日'}
                                                        , {field: 'day5', align: 'left',  title: '5日'}
                                                        , {field: 'day6', align: 'left',  title: '6日'}
                                                        , {field: 'day7', align: 'left',  title: '7日'}
                                                        , {field: 'day8', align: 'left',  title: '8日'}
                                                        , {field: 'day9', align: 'left',  title: '9日'}
                                                        , {field: 'day10', align: 'left',  title: '10日'}
                                                        , {field: 'day11', align: 'left',  title: '11日'}
                                                        , {field: 'day12', align: 'left',  title: '12日'}
                                                        , {field: 'day13', align: 'left',  title: '13日'}
                                                        , {field: 'day14', align: 'left',  title: '14日'}
                                                        , {field: 'day15', align: 'left',  title: '15日'}
                                                        , {field: 'day16', align: 'left',  title: '16日'}
                                                        , {field: 'day17', align: 'left',  title: '17日'}
                                                        , {field: 'day18', align: 'left',  title: '18日'}
                                                        , {field: 'day19', align: 'left',  title: '19日'}
                                                        , {field: 'day20', align: 'left',  title: '20日'}
                                                        , {field: 'day21', align: 'left',  title: '21日'}
                                                        , {field: 'day22', align: 'left',  title: '22日'}
                                                        , {field: 'day23', align: 'left',  title: '23日'}
                                                        , {field: 'day24', align: 'left',  title: '24日'}
                                                        , {field: 'day25', align: 'left',  title: '25日'}
                                                        , {field: 'day26', align: 'left',  title: '26日'}
                                                        , {field: 'day27', align: 'left',  title: '27日'}
                                                        , {field: 'day28', align: 'left',  title: '28日'}
                                                    ]],
                                                    done:function type (res,curr,count) {
                                                        jQuery(document).on("click","th",function() {
                                                            var field = jQuery(this).attr("data-field");// 获取表格标题的data-field属性
                                                            if ("day1" == field){
                                                                // alert(jQuery(this).text());
                                                                var putMonth=datetime+"-01"
                                                            }
                                                            else if("day2"==field){
                                                                var putMonth=datetime+"-02"
                                                            }
                                                            else if("day3"==field){
                                                                var putMonth=datetime+"-03"
                                                            }
                                                            else if("day4"==field){
                                                                var putMonth=datetime+"-04"
                                                            }
                                                            else if("day5"==field){
                                                                var putMonth=datetime+"-05"
                                                            }
                                                            else if("day6"==field){
                                                                var putMonth=datetime+"-06"
                                                            }
                                                            else if("day7"==field){
                                                                var putMonth=datetime+"-07"
                                                            }
                                                            else if("day8"==field){
                                                                var putMonth=datetime+"-08"
                                                            }
                                                            else if("day9"==field){
                                                                var putMonth=datetime+"-09"
                                                            }
                                                            else if("day10"==field){
                                                                var putMonth=datetime+"-10"
                                                            }
                                                            else if("day11"==field){
                                                                var putMonth=datetime+"-11"
                                                            }
                                                            else if("day12"==field){
                                                                var putMonth=datetime+"-12"
                                                            }
                                                            else if("day13"==field){
                                                                var putMonth=datetime+"-13"
                                                            }
                                                            else if("day14"==field){
                                                                var putMonth=datetime+"-14"
                                                            }
                                                            else if("day15"==field){
                                                                var putMonth=datetime+"-15"
                                                            }
                                                            else if("day16"==field){
                                                                var putMonth=datetime+"-16"
                                                            }
                                                            else if("day17"==field){
                                                                var putMonth=datetime+"-17"
                                                            }
                                                            else if("day18"==field){
                                                                var putMonth=datetime+"-18"
                                                            }
                                                            else if("day19"==field){
                                                                var putMonth=datetime+"-19"
                                                            }
                                                            else if("day20"==field){
                                                                var putMonth=datetime+"-20"
                                                            }
                                                            else if("day21"==field){
                                                                var putMonth=datetime+"-21"
                                                            }
                                                            else if("day22"==field){
                                                                var putMonth=datetime+"-22"
                                                            }
                                                            else if("day23"==field){
                                                                var putMonth=datetime+"-23"
                                                            }
                                                            else if("day24"==field){
                                                                var putMonth=datetime+"-24"
                                                            }
                                                            else if("day25"==field){
                                                                var putMonth=datetime+"-25"
                                                            }
                                                            else if("day26"==field){
                                                                var putMonth=datetime+"-26"
                                                            }
                                                            else if("day27"==field){
                                                                var putMonth=datetime+"-27"
                                                            }
                                                            else if("day28"==field){
                                                                var putMonth=datetime+"-28"
                                                            }
                                                            else if("day29"==field){
                                                                var putMonth=datetime+"-29"
                                                            }
                                                            else if("day30"==field){
                                                                var putMonth=datetime+"-30"
                                                            }
                                                            else if("day31"==field){
                                                                var putMonth=datetime+"-31"
                                                            }
                                                            if(field=="day1"||field=="day2"||field=="day3"||field=="day4"||field=="day5"||field=="day6"||field=="day7"||field=="day8"||field=="day9"||field=="day10"||field=="day11"||field=="day12"||field=="day13"||field=="day14"||field=="day15"||field=="day16"||field=="day17"||field=="day18"||field=="day19"||field=="day20"||field=="day21"||field=="day22"||field=="day23"||field=="day24"||field=="day25"||field=="day26"||field=="day27"||field=="day28"||field=="day29"||field=="day30"||field=="day31"){
                                                                document.getElementById("achievementRecord-select").style.display="block";
                                                                document.getElementById("banner").style.display="block";
                                                                layui.use('table', function () {
                                                                    var table = layui.table;
                                                                    // console.log(proId);
                                                                    // console.log(putMonth)
                                                                    table.render({
                                                                        elem:'#labor-day'
                                                                        ,url:'/getMaintenanceByDate?projectId='+ proId +'&datetime=' + putMonth
                                                                        // ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
                                                                        // ,defaultToolbar: ['filter', 'exports', 'print'
                                                                        //     //     , { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
                                                                        //     //     title: '提示'
                                                                        //     //     ,layEvent: 'LAYTABLE_TIPS'
                                                                        //     //     ,icon: 'layui-icon-tips'
                                                                        //     // }
                                                                        // ]
                                                                        , cols: [[
                                                                            {field: 'zizeng-labor-day', align:'left',width: 75,title: '序号',sort: true, templet: '#zizeng-labor-day'}
                                                                            , {field: 'people', align: 'left', width: 190, title: '员工姓名'}
                                                                            , {field: 'workingHours', align: 'left', width: 90, title: '工时数'}
                                                                            , {field: 'content', align: 'left',title: '工作详情'}
                                                                        ]]
                                                                        , page: true
                                                                    })
                                                                })
                                                            }
                                                        })
                                                        pageCurr=curr;
                                                    }
                                                    , page: true
                                                });
                                            }
                                            var $ = layui.$, active = {
                                                reload: function(){
                                                    var demoReload = $('#laborTimeS');

                                                    //执行重载
                                                    table.reload('testReload', {
                                                        page: {
                                                            curr: 1 //重新从第 1 页开始
                                                        }
                                                        ,where: {
                                                            key: {
                                                                id: demoReload.val()
                                                            }
                                                        }
                                                    }, 'data');
                                                }
                                            };

                                            table.on('sort(demo)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
                                                //尽管我们的 table 自带排序功能，但并没有请求服务端。
                                                //有些时候，你可能需要根据当前排序的字段，重新向服务端发送请求，从而实现服务端排序，如：
                                            table.reload('test', {
                                                    initSort: obj //记录初始排序，如果不设的话，将无法标记表头的排序状态。 layui 2.1.1 新增参数
                                                    // ,where: { //请求参数（注意：这里面的参数可任意定义，并非下面固定的格式）
                                                    //     field: obj.time //排序字段
                                                    //     ,order: obj.type //排序方式
                                                    // }
                                                });
                                            form.render();


                                            // //监听单元格事件
                                                table.on('tool(demoEvent)', function(obj){
                                                    var data = obj.data;
                                                    if(obj.event === 'setSign'){
                                                        // layer.prompt({
                                                        //     formType: 2
                                                        //     ,title: '修改 ID 为 ['+ data.id +'] 的用户签名'
                                                        //     ,value: data.sign
                                                        // }, function(value, index){
                                                        //     layer.close(index);
                                                        //
                                                        //     //这里一般是发送修改的Ajax请求
                                                        //
                                                        //     //同步更新表格和缓存对应的值
                                                        //     obj.update({
                                                        //         sign: value
                                                        //     });
                                                        // });
                                                        alert("success!")
                                                    }
                                                });
                                            });
                                        });
                                    }
                                });
                            }
                        });
                    });
                }
            });
        });
        form.render();
    });
}
function showLaborRecord4(value){

}


function fillAchievementRecord(cycle){
	$("#achievementTbody tr").remove("tr[id=123]");
	
	var userName=sessionStorage.Username;
	$.ajax({
    	url: '/findAchievementsByUserName',
    	type: "POST",
    	datatype: 'json',
    	data:{
    		userName: userName,cycle:cycle
    	},
    	success: function (data) {
    		var tbody = document.getElementById("achievementTbody");
    		var type = true;
    		for(var i=0;i<data.length;i++){
    			if(data[i].week==1){
    				var tr = document.createElement("tr");
        			tr.setAttribute("id", "123");
        			var td = "<th>第一周</th><td>"+data[i].result1+"</td><td>"+data[i].result2+"</td>" +
        					"<td>"+data[i].result3+"</td><td>"+data[i].result4+"</td>"
        			tr.innerHTML = td;
        			tbody.appendChild(tr);
        			type = false;
    			}
    		}
    		if(type){
    			var tr = document.createElement("tr");
    			tr.setAttribute("id", "123");
    			var td = "<th>第一周</th><td></td><td></td><td></td><td></td>"
    			tr.innerHTML = td;
    			tbody.appendChild(tr);
    		}
    		type = true;
    		for(var i=0;i<data.length;i++){
    			if(data[i].week==2){
    				var tr = document.createElement("tr");
        			tr.setAttribute("id", "123");
        			var td = "<th>第二周</th><td>"+data[i].result1+"</td><td>"+data[i].result2+"</td>" +
        					"<td>"+data[i].result3+"</td><td>"+data[i].result4+"</td>"
        			tr.innerHTML = td;
        			tbody.appendChild(tr);
        			type = false;
    			}
    		}
    		if(type){
    			var tr = document.createElement("tr");
    			tr.setAttribute("id", "123");
    			var td = "<th>第二周</th><td></td><td></td><td></td><td></td>"
    			tr.innerHTML = td;
    			tbody.appendChild(tr);
    		}
    		type = true;
    		for(var i=0;i<data.length;i++){
    			if(data[i].week==3){
    				var tr = document.createElement("tr");
        			tr.setAttribute("id", "123");
        			var td = "<th>第三周</th><td>"+data[i].result1+"</td><td>"+data[i].result2+"</td>" +
        					"<td>"+data[i].result3+"</td><td>"+data[i].result4+"</td>"
        			tr.innerHTML = td;
        			tbody.appendChild(tr);
        			type = false;
    			}
    		}
    		if(type){
    			var tr = document.createElement("tr");
    			tr.setAttribute("id", "123");
    			var td = "<th>第三周</th><td></td><td></td><td></td><td></td>"
    			tr.innerHTML = td;
    			tbody.appendChild(tr);
    		}
    		type = true;
    		for(var i=0;i<data.length;i++){
    			if(data[i].week==4){
    				var tr = document.createElement("tr");
        			tr.setAttribute("id", "123");
        			var td = "<th>第四周</th><td>"+data[i].result1+"</td><td>"+data[i].result2+"</td>" +
        					"<td>"+data[i].result3+"</td><td>"+data[i].result4+"</td>"
        			tr.innerHTML = td;
        			tbody.appendChild(tr);
        			type = false;
    			}
    		}
    		if(type){
    			var tr = document.createElement("tr");
    			tr.setAttribute("id", "123");
    			var td = "<th>第四周</th><td></td><td></td><td></td><td></td>"
    			tr.innerHTML = td;
    			tbody.appendChild(tr);
    		}
    		
    	}
    });
}

function closeBanner(){
	document.getElementById("achievementRecord").style.display="none";
	document.getElementById("achievementRecord-labor").style.display="none";
    document.getElementById("banner").style.display="none";
}

function closeBanner2(){
	document.getElementById("achievementRecord-labor").style.display="none";
	document.getElementById("achievementRecord-select").style.display="none";
    document.getElementById("banner").style.display="none";
}




$(function(){
	var userName = $("#UserName").val();
	var Name = $("#Name").val();
    sessionStorage.Name = Name;
	sessionStorage.Username = userName;
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


