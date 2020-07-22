$(function(){
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
            console.log(data);
            for(var i=0;i<data.length;i++){
                if(data[i].id!=6&&data[i].type==1){
                    document.getElementById('li'+data[i].id).style.display='';
                }
            }
        }
    });
})
function checkLogin(){
    var userName = sessionStorage.Username;
    console.log(userName);
    if(userName==null){
        window.location="../";
    }
    $.ajax({
        "type" : 'post',
        "url": "/getPermissionByUserIdAndPermissionId",
        "data":{userName:userName,permissionId:2},
        "success":function(data){
            if(!data){
                layer.alert('该账号没有查看考勤系统的权限，请换账号重试!', {icon : 2});
                window.location="../";
            }

        }
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
function selectLaborProjectS2(value){
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
                $('#selectLaborProjectS2').append("<option value='"+i+"'>"+name[i]+"</option>");
            }
        }
    });
}
function selectLaborProjectS2D(value){
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
                $('#selectLaborProjectS2D').append("<option value='"+i+"'>"+name[i]+"</option>");
            }
        }
    });
}

function selectLaborProjectS3(value){
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
                $('#selectLaborProjectS3').append("<option value='"+i+"'>"+name[i]+"</option>");
            }
        }
    });
}
function showLaborRecord2(value){
    document.getElementById("achievementRecord-labor").style.display="block";
    document.getElementById("banner").style.display="block";

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
                $("#selectLaborProjectS3").empty();
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


                    $('#selectLaborProjectS3').append("<option value='"+i+"'>"+projectName[i]+"</option>");
                }
                form.render();
                $("#selectLaborProjectS3").val("");
                form.render();
            }
        });
        form.on('select(selectLaborProjectS3)', function(data){
            var val=data.value;
            var proId=++val;
            console.log(val);
            console.log(proId);
            document.getElementById("chooseP").style.display="";

            var usersName=sessionStorage.Username;
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
                    url: '/getNameByProjectId',
                    type: "POST",
                    datatype: 'json',
                    data:{
                        projectId: proId,
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
                            // document.getElementById('lTime1').style.display='';
                            // document.getElementById('lTime2').style.display='';

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
                                        ,height: 370
                                        ,url: '/showLaborAll?userName='+ Username +'&MonthDate=' + MonthDate +'&DayDateT=' + DayDateT   //数据接口
                                        // ,page: true //开启分页
                                        // ,totalRow:true
                                        ,limit:1000
                                        ,cols: [[ //表头
                                            {field: 'zizeng-labor',align:'center', width: 90, title: '序号', templet: '#zizeng-labor',totalRowText:'总工时数'}
                                            ,{field: 'defectNumber',align:'center', title: '故障号', width:150, sort:true}
                                            ,{field: 'content',align:'center', title: '工作详情', width:200, sort: true}
                                            ,{field: 'workingHours',align:'center', title: '工时详情', width:130, sort: true,totalRow:true}
                                            ,{field: 'datetime',align:'center', title: '创建时间', width: 200, sort: true}
                                        ]],
                                        done:function type (res,curr,count) {


                                            console.log(res)
                                            LaborTime = 0;
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
                                                ,height: 370
                                                ,url: '/showLaborAll?userName='+ Username +'&MonthDate=' + MonthDate +'&DayDateT=' + DayDateT   //数据接口
                                                // ,page: true //开启分页
                                                ,limit:1000
                                                // ,totalRow:true
                                                ,cols: [[ //表头
                                                    {field: 'zizeng-labor',align:'center', width: 90, title: '序号', templet: '#zizeng-labor',totalRowText:'总工时数'}
                                                    ,{field: 'defectNumber',align:'center', title: '故障号', width:150, sort:true}
                                                    ,{field: 'content',align:'center', title: '工作详情', width:200, sort: true}
                                                    ,{field: 'workingHours',align:'center', title: '工时详情', width:130, sort: true,totalRow:true}
                                                    ,{field: 'datetime',align:'center', title: '创建时间', width: 200, sort: true}
                                                ]],
                                                done:function type (res,curr,count) {

                                                    document.getElementById('lTime1').style.display='';
                                                    document.getElementById('lTime2').style.display='';
                                                    console.log(res)
                                                    LaborTime = 0;
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


                                                var showDay = DayDateT.substr(8,2);

                                                console.log(showDay)
                                                $("#laborDay").val("");//此处清空日期选择器
                                                $('#laborDay').prop("placeholder",showDay+"日");


                                                layui.use('table', function(){
                                                    var table = layui.table;

                                                    //第一个实例
                                                    table.render({
                                                        elem: '#labor'
                                                        ,height: 370
                                                        ,url: '/showLaborAll?userName='+ Username +'&MonthDate=' + MonthDate +'&DayDateT=' + DayDateT   //数据接口
                                                        // ,page: true //开启分页
                                                        ,limit:1000
                                                        // ,totalRow:true
                                                        ,cols: [[ //表头
                                                            {field: 'zizeng-labor',align:'center', width: 90, title: '序号', templet: '#zizeng-labor',totalRowText:'总工时数'}
                                                            ,{field: 'defectNumber',align:'center', title: '故障号', width:150, sort:true}
                                                            ,{field: 'content',align:'center', title: '工作详情', width:200, sort: true}
                                                            ,{field: 'workingHours',align:'center', title: '工时详情', width:130, sort: true,totalRow:true}
                                                            ,{field: 'datetime',align:'center', title: '创建时间', width: 200, sort: true}
                                                        ]],
                                                        done:function type (res,curr,count) {

                                                            console.log(res)
                                                            LaborTime = 0;
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
                            ,max:0
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
                                                var nameStr=data.data[j].people.toUpperCase();
                                                var namestr=nameInf[i].toUpperCase();
                                                var usernamestr=userNameInf[i].toUpperCase();
                                                // console.log(nameStr)
                                                // console.log(namestr)
                                                // console.log(usernamestr)
                                                // console.log(nameStr.includes(namestr))
                                                // console.log(nameStr.includes(usernamestr))
                                                if(nameStr.includes(namestr)==true||nameStr.includes(usernamestr)==true){//确定对应当前选中员工的考勤信息，i为员工在table中的序号
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
                                            var dataS = new Array();
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
                                                    ,defaultToolbar: [ 'exports', 'print'
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
                                                    ,defaultToolbar: [ 'exports', 'print'
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
                                                    ,defaultToolbar: [ 'exports', 'print'
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
    document.getElementById('sum').style.display='none';
    document.getElementById('details').style.display='none';
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

function showDetails(){
    document.getElementById('sum').style.display='none';
    document.getElementById('details').style.display='';
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
                $("#selectLaborProjectS2").empty();
                // $("#selectLaborProjectS2D").empty();

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


                    $('#selectLaborProjectS2').append("<option value='"+i+"'>"+projectName[i]+"</option>");
                    // $('#selectLaborProjectS2D').append("<option value='"+i+"'>"+projectName[i]+"</option>");

                }
                form.render();
                $("#selectLaborProjectS2").val("");
                // $("#selectLaborProjectS2D").val("");

                form.render();
            }
        });
        form.on('select(selectLaborProjectS2)', function(data){
            var val=data.value;
            var proId=++val;
            console.log(val);
            console.log(proId);
            document.getElementById("selectPeople").style.display="";
            document.getElementById("showTable2").style.display="none";
            $.ajax({//通过项目部员工姓名
                url: '/getNameByProjectId',
                type: "POST",
                datatype: 'json',
                data:{
                    projectId: proId,
                },
                success: function (data) {
                    $("#selectPeopleByPro").empty();
                    for(var i=0;i<data.data.length;i++) {
                        nameInf[i] = data.data[i].name;
                        userNameInf[i] = data.data[i].userName;//获取当前选择项目部的全部员工编号
                        // console.log(nameInf[i]);
                        $('#selectPeopleByPro').append("<option value='"+i+"'>"+nameInf[i]+"</option>");
                    }
                    form.render();

                    var nameInfLength=data.data.length;
                    form.on('select(selectPeopleByPro)', function(data){
                        var val=data.value;
                        var peopleName=nameInf[val];
                        var peopleuserName=userNameInf[val];
                        console.log(peopleName);
                        console.log(peopleuserName);
                        var pp=peopleuserName.substr(0,1).toUpperCase();
                        if(pp!="J"&&pp!="Y"){
                            alert("考勤表仅显示检修人员和运行人员，请重新选择")
                        }else{
                            document.getElementById("laborMonthS2").style.display="";
                            console.log(userNameInf);
                            var sumInf=new Array()//员工总工时
                            for (var i = 0; i <nameInfLength ; i++) {
                                sumInf[i]=0;
                            }
                            layui.use('laydate', function(){
                                var laydate = layui.laydate;
                                //年月选择器
                                $("#laborMonthS2").remove();//移除后重新加载，因为LayDate不能二次渲染...
                                $("#selectMonthS2").html('<input type="text" class="layui-input" placeholder="请选择月份" id="laborMonthS2" style="height:36px;width:150px;display:none;float: left;">');
                                document.getElementById("laborMonthS2").style.display="";
                                laydate.render({
                                    elem: '#laborMonthS2'
                                    ,type: 'month'
                                    ,max:0
                                    ,done:function (value,date,endDate) {
                                        var datetime=value;//真实年月
                                        var showMonth = datetime.substr(0,4)+"年"+datetime.substr(5,2)+"月";
                                        console.log(datetime);
                                        var MonthDate = datetime.substr(5,2);
                                        // console.log(showMonth);
                                        $("#laborMonthS2").val("");//此处打算清空月份选择器以便于使用自己定义的样式显示内容,但是很奇怪，这里没清掉。
                                        $('#laborMonthS2').prop("placeholder",showMonth);

                                        $.ajax({//通过项目部、年月、员工姓名获取员工工时
                                            url: '/getWorkingHoursByProPeople2',
                                            type: "POST",
                                            datatype: 'json',
                                            data:{
                                                projectId: proId,
                                                datetime:datetime,
                                                name:peopleuserName
                                            },
                                            success: function (data) {
                                                var peopleNameLength=data.data.length;

                                                var dayAttend = new Array();//员工每日工时
                                                for(var k=0;k<31;k++){
                                                    dayAttend[k]=new Array();
                                                    for(var j=0;j<4;j++){
                                                        dayAttend[k][j]=0
                                                    }
                                                }
                                                console.log(dayAttend);
                                                for(var i=0;i<peopleNameLength;i++){
                                                    var datetem = data.data[i].datetime.substr(8,2);//确定日期序号
                                                    var dateTem = parseInt(datetem)//转为整形
                                                    // console.log(dateTem)

                                                    var hourstem = data.data[i].datetime.substr(11,2)+data.data[i].datetime.substr(14,2)
                                                    var hoursTem = parseInt(hourstem)
                                                    if(dateTem==1){
                                                        dayAttend[0][3]+=data.data[i].workingHours;
                                                        if(hoursTem<=1200){
                                                            dayAttend[0][0]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1200&&hoursTem<=1800){
                                                            dayAttend[0][1]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1800){
                                                            dayAttend[0][2]+=data.data[i].workingHours;
                                                        }
                                                    }
                                                    if(dateTem==2){
                                                        dayAttend[1][3]+=data.data[i].workingHours;
                                                        if(hoursTem<=1200){
                                                            dayAttend[1][0]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1200&&hoursTem<=1800){
                                                            dayAttend[1][1]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1800){
                                                            dayAttend[1][2]+=data.data[i].workingHours;
                                                        }
                                                    }
                                                    if(dateTem==3){
                                                        dayAttend[2][3]+=data.data[i].workingHours;
                                                        if(hoursTem<=1200){
                                                            dayAttend[2][0]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1200&&hoursTem<=1800){
                                                            dayAttend[2][1]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1800){
                                                            dayAttend[2][2]+=data.data[i].workingHours;
                                                        }
                                                    }
                                                    if(dateTem==4){
                                                        dayAttend[3][3]+=data.data[i].workingHours;
                                                        if(hoursTem<=1200){
                                                            dayAttend[3][0]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1200&&hoursTem<=1800){
                                                            dayAttend[3][1]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1800){
                                                            dayAttend[3][2]+=data.data[i].workingHours;
                                                        }
                                                    }
                                                    if(dateTem==5){
                                                        dayAttend[4][3]+=data.data[i].workingHours;
                                                        if(hoursTem<=1200){
                                                            dayAttend[4][0]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1200&&hoursTem<=1800){
                                                            dayAttend[4][1]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1800){
                                                            dayAttend[4][2]+=data.data[i].workingHours;
                                                        }
                                                    }
                                                    if(dateTem==6){
                                                        dayAttend[5][3]+=data.data[i].workingHours;
                                                        if(hoursTem<=1200){
                                                            dayAttend[5][0]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1200&&hoursTem<=1800){
                                                            dayAttend[5][1]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1800){
                                                            dayAttend[5][2]+=data.data[i].workingHours;
                                                        }
                                                    }
                                                    if(dateTem==7){
                                                        dayAttend[6][3]+=data.data[i].workingHours;
                                                        if(hoursTem<=1200){
                                                            dayAttend[6][0]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1200&&hoursTem<=1800){
                                                            dayAttend[6][1]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1800){
                                                            dayAttend[6][2]+=data.data[i].workingHours;
                                                        }
                                                    }
                                                    if(dateTem==8){
                                                        dayAttend[7][3]+=data.data[i].workingHours;
                                                        if(hoursTem<=1200){
                                                            dayAttend[7][0]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1200&&hoursTem<=1800){
                                                            dayAttend[7][1]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1800){
                                                            dayAttend[7][2]+=data.data[i].workingHours;
                                                        }
                                                    }
                                                    if(dateTem==9){
                                                        dayAttend[8][3]+=data.data[i].workingHours;
                                                        if(hoursTem<=1200){
                                                            dayAttend[8][0]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1200&&hoursTem<=1800){
                                                            dayAttend[8][1]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1800){
                                                            dayAttend[8][2]+=data.data[i].workingHours;
                                                        }
                                                    }
                                                    if(dateTem==10){
                                                        dayAttend[9][3]+=data.data[i].workingHours;
                                                        if(hoursTem<=1200){
                                                            dayAttend[9][0]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1200&&hoursTem<=1800){
                                                            dayAttend[9][1]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1800){
                                                            dayAttend[9][2]+=data.data[i].workingHours;
                                                        }
                                                    }
                                                    if(dateTem==11){
                                                        dayAttend[10][3]+=data.data[i].workingHours;
                                                        if(hoursTem<=1200){
                                                            dayAttend[10][0]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1200&&hoursTem<=1800){
                                                            dayAttend[10][1]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1800){
                                                            dayAttend[10][2]+=data.data[i].workingHours;
                                                        }
                                                    }
                                                    if(dateTem==12){
                                                        dayAttend[11][3]+=data.data[i].workingHours;
                                                        if(hoursTem<=1200){
                                                            dayAttend[11][0]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1200&&hoursTem<=1800){
                                                            dayAttend[11][1]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1800){
                                                            dayAttend[11][2]+=data.data[i].workingHours;
                                                        }
                                                    }
                                                    if(dateTem==13){
                                                        dayAttend[12][3]+=data.data[i].workingHours;
                                                        if(hoursTem<=1200){
                                                            dayAttend[12][0]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1200&&hoursTem<=1800){
                                                            dayAttend[12][1]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1800){
                                                            dayAttend[12][2]+=data.data[i].workingHours;
                                                        }
                                                    }
                                                    if(dateTem==14){
                                                        dayAttend[13][3]+=data.data[i].workingHours;
                                                        if(hoursTem<=1200){
                                                            dayAttend[13][0]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1200&&hoursTem<=1800){
                                                            dayAttend[13][1]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1800){
                                                            dayAttend[13][2]+=data.data[i].workingHours;
                                                        }
                                                    }
                                                    if(dateTem==15){
                                                        dayAttend[14][3]+=data.data[i].workingHours;
                                                        if(hoursTem<=1200){
                                                            dayAttend[14][0]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1200&&hoursTem<=1800){
                                                            dayAttend[14][1]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1800){
                                                            dayAttend[14][2]+=data.data[i].workingHours;
                                                        }
                                                    }
                                                    if(dateTem==16){
                                                        dayAttend[15][3]+=data.data[i].workingHours;
                                                        if(hoursTem<=1200){
                                                            dayAttend[15][0]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1200&&hoursTem<=1800){
                                                            dayAttend[15][1]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1800){
                                                            dayAttend[15][2]+=data.data[i].workingHours;
                                                        }
                                                    }
                                                    if(dateTem==17){
                                                        dayAttend[16][3]+=data.data[i].workingHours;
                                                        if(hoursTem<=1200){
                                                            dayAttend[16][0]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1200&&hoursTem<=1800){
                                                            dayAttend[16][1]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1800){
                                                            dayAttend[16][2]+=data.data[i].workingHours;
                                                        }
                                                    }
                                                    if(dateTem==18){
                                                        dayAttend[17][3]+=data.data[i].workingHours;
                                                        if(hoursTem<=1200){
                                                            dayAttend[17][0]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1200&&hoursTem<=1800){
                                                            dayAttend[17][1]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1800){
                                                            dayAttend[17][2]+=data.data[i].workingHours;
                                                        }
                                                    }
                                                    if(dateTem==19){
                                                        dayAttend[18][3]+=data.data[i].workingHours;
                                                        if(hoursTem<=1200){
                                                            dayAttend[18][0]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1200&&hoursTem<=1800){
                                                            dayAttend[18][1]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1800){
                                                            dayAttend[18][2]+=data.data[i].workingHours;
                                                        }
                                                    }
                                                    if(dateTem==20){
                                                        dayAttend[19][3]+=data.data[i].workingHours;
                                                        if(hoursTem<=1200){
                                                            dayAttend[19][0]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1200&&hoursTem<=1800){
                                                            dayAttend[19][1]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1800){
                                                            dayAttend[19][2]+=data.data[i].workingHours;
                                                        }
                                                    }
                                                    if(dateTem==21){
                                                        dayAttend[20][3]+=data.data[i].workingHours;
                                                        if(hoursTem<=1200){
                                                            dayAttend[20][0]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1200&&hoursTem<=1800){
                                                            dayAttend[20][1]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1800){
                                                            dayAttend[20][2]+=data.data[i].workingHours;
                                                        }
                                                    }
                                                    if(dateTem==22){
                                                        dayAttend[21][3]+=data.data[i].workingHours;
                                                        if(hoursTem<=1200){
                                                            dayAttend[21][0]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1200&&hoursTem<=1800){
                                                            dayAttend[21][1]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1800){
                                                            dayAttend[21][2]+=data.data[i].workingHours;
                                                        }
                                                    }
                                                    if(dateTem==23){
                                                        dayAttend[22][3]+=data.data[i].workingHours;
                                                        if(hoursTem<=1200){
                                                            dayAttend[22][0]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1200&&hoursTem<=1800){
                                                            dayAttend[22][1]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1800){
                                                            dayAttend[22][2]+=data.data[i].workingHours;
                                                        }
                                                    }
                                                    if(dateTem==24){
                                                        dayAttend[23][3]+=data.data[i].workingHours;
                                                        if(hoursTem<=1200){
                                                            dayAttend[23][0]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1200&&hoursTem<=1800){
                                                            dayAttend[23][1]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1800){
                                                            dayAttend[23][2]+=data.data[i].workingHours;
                                                        }
                                                    }
                                                    if(dateTem==25){
                                                        dayAttend[24][3]+=data.data[i].workingHours;
                                                        if(hoursTem<=1200){
                                                            dayAttend[24][0]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1200&&hoursTem<=1800){
                                                            dayAttend[24][1]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1800){
                                                            dayAttend[24][2]+=data.data[i].workingHours;
                                                        }
                                                    }
                                                    if(dateTem==26){
                                                        dayAttend[25][3]+=data.data[i].workingHours;
                                                        if(hoursTem<=1200){
                                                            dayAttend[25][0]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1200&&hoursTem<=1800){
                                                            dayAttend[25][1]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1800){
                                                            dayAttend[25][2]+=data.data[i].workingHours;
                                                        }
                                                    }
                                                    if(dateTem==27){
                                                        dayAttend[26][3]+=data.data[i].workingHours;
                                                        if(hoursTem<=1200){
                                                            dayAttend[26][0]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1200&&hoursTem<=1800){
                                                            dayAttend[26][1]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1800){
                                                            dayAttend[26][2]+=data.data[i].workingHours;
                                                        }
                                                    }
                                                    if(dateTem==28){
                                                        dayAttend[27][3]+=data.data[i].workingHours;
                                                        if(hoursTem<=1200){
                                                            dayAttend[27][0]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1200&&hoursTem<=1800){
                                                            dayAttend[27][1]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1800){
                                                            dayAttend[27][2]+=data.data[i].workingHours;
                                                        }
                                                    }
                                                    if(dateTem==29){
                                                        dayAttend[28][3]+=data.data[i].workingHours;
                                                        if(hoursTem<=1200){
                                                            dayAttend[28][0]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1200&&hoursTem<=1800){
                                                            dayAttend[28][1]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1800){
                                                            dayAttend[28][2]+=data.data[i].workingHours;
                                                        }
                                                    }
                                                    if(dateTem==30){
                                                        dayAttend[29][3]+=data.data[i].workingHours;
                                                        if(hoursTem<=1200){
                                                            dayAttend[29][0]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1200&&hoursTem<=1800){
                                                            dayAttend[29][1]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1800){
                                                            dayAttend[29][2]+=data.data[i].workingHours;
                                                        }
                                                    }
                                                    if(dateTem==31){
                                                        dayAttend[30][3]+=data.data[i].workingHours;
                                                        if(hoursTem<=1200){
                                                            dayAttend[30][0]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1200&&hoursTem<=1800){
                                                            dayAttend[30][1]+=data.data[i].workingHours;
                                                        }else if(hoursTem>1800){
                                                            dayAttend[30][2]+=data.data[i].workingHours;
                                                        }
                                                    }

                                                }

                                                // var pp=peopleuserName.substr(0,1).toUpperCase();
                                                if(pp=="J"){
                                                    document.getElementById("showTable2").style.display="";
                                                    for(var k=0;k<31;k++){
                                                        if(dayAttend[k][0]!=0){
                                                            dayAttend[k][0]=1;
                                                        };
                                                        if(dayAttend[k][1]!=0){
                                                            dayAttend[k][1]=1;
                                                        };
                                                        dayAttend[k][3]=dayAttend[k][0]+dayAttend[k][1];
                                                        if(dayAttend[k][0]==0){
                                                            dayAttend[k][0]=""
                                                        }else if(dayAttend[k][0]==1){
                                                            dayAttend[k][0]="半天"
                                                        };
                                                        if(dayAttend[k][1]==0){
                                                            dayAttend[k][1]=""
                                                        }else if(dayAttend[k][1]==1){
                                                            dayAttend[k][1]="半天"
                                                        };
                                                        if(dayAttend[k][3]==0){
                                                            dayAttend[k][3]="无"
                                                        }else if(dayAttend[k][3]==1){
                                                            dayAttend[k][3]="半天"
                                                        }else if(dayAttend[k][3]==2){
                                                            dayAttend[k][3]="一天"
                                                        }
                                                    }
                                                }
                                                else if(pp=="Y"){
                                                    document.getElementById("showTable2").style.display="";
                                                    for(var k=0;k<31;k++){
                                                        if(dayAttend[k][3]!=0){
                                                            dayAttend[k][0]="";
                                                            dayAttend[k][1]="";
                                                            dayAttend[k][3]="一天";
                                                        }else if(dayAttend[k][3]==0){
                                                            dayAttend[k][0]="";
                                                            dayAttend[k][1]="";
                                                            dayAttend[k][3]="无";
                                                        }
                                                    }
                                                }
                                                // else {
                                                //     alert("考勤表仅显示检修人员和运行人员，请重新选择")
                                                // }

                                                // document.getElementById("showTable2").style.display="";
                                                layui.use('table', function () {
                                                    var table = layui.table;


                                                    // console.log(nameInf);
                                                    // console.log(userNameInf);
                                                    // console.log(sumInf);
                                                    // console.log(dayAttend);

                                                    var userName = sessionStorage.Username;
                                                    if(MonthDate=="01"||MonthDate=="03"||MonthDate=="05"||MonthDate=="07"||MonthDate=="08"||MonthDate=="10"||MonthDate=="12"){
                                                        table.render({
                                                            elem: '#laborTimeS2'
                                                            // ,url: '/getNameByProjectId?projectId=' + proId

                                                            ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
                                                            ,defaultToolbar: [ 'exports', 'print']
                                                            ,id: 'testReload2'
                                                            ,cols: [[
                                                                {field:'type',title:'时间',width:110},
                                                                {field:'day1',title:'1日',},
                                                                {field:'day2',title:'2日',},
                                                                {field:'day3',title:'3日',},
                                                                {field:'day4',title:'4日',},
                                                                {field:'day5',title:'5日',},
                                                                {field:'day6',title:'6日',},
                                                                {field:'day7',title:'7日',},
                                                                {field:'day8',title:'8日',},
                                                                {field:'day9',title:'9日' },
                                                                {field:'day10',title:'10日'},
                                                                {field:'day11',title:'11日'},
                                                                {field:'day12',title:'12日'},
                                                                {field:'day13',title:'13日'},
                                                                {field:'day14',title:'14日'},
                                                                {field:'day15',title:'15日'},
                                                                {field:'day16',title:'16日'},
                                                                {field:'day17',title:'17日'},
                                                                {field:'day18',title:'18日'},
                                                                {field:'day19',title:'19日'},
                                                                {field:'day20',title:'20日'},
                                                                {field:'day21',title:'21日'},
                                                                {field:'day22',title:'22日'},
                                                                {field:'day23',title:'23日'},
                                                                {field:'day24',title:'24日'},
                                                                {field:'day25',title:'25日'},
                                                                {field:'day26',title:'26日'},
                                                                {field:'day27',title:'27日'},
                                                                {field:'day28',title:'28日'},
                                                                {field:'day29',title:'29日'},
                                                                {field:'day30',title:'30日'},
                                                                {field:'day31',title:'31日'},
                                                            ]]
                                                            ,data:[{
                                                                "type":"上午"
                                                                ,"day1":dayAttend[0][0]
                                                                ,"day2":dayAttend[1][0]
                                                                ,"day3":dayAttend[2][0]
                                                                ,"day4":dayAttend[3][0]
                                                                ,"day5":dayAttend[4][0]
                                                                ,"day6":dayAttend[5][0]
                                                                ,"day7":dayAttend[6][0]
                                                                ,"day8":dayAttend[7][0]
                                                                ,"day9":dayAttend[8][0]
                                                                ,"day10":dayAttend[9][0]
                                                                ,"day11":dayAttend[10][0]
                                                                ,"day12":dayAttend[11][0]
                                                                ,"day13":dayAttend[12][0]
                                                                ,"day14":dayAttend[13][0]
                                                                ,"day15":dayAttend[14][0]
                                                                ,"day16":dayAttend[15][0]
                                                                ,"day17":dayAttend[16][0]
                                                                ,"day18":dayAttend[17][0]
                                                                ,"day19":dayAttend[18][0]
                                                                ,"day20":dayAttend[19][0]
                                                                ,"day21":dayAttend[20][0]
                                                                ,"day22":dayAttend[21][0]
                                                                ,"day23":dayAttend[22][0]
                                                                ,"day24":dayAttend[23][0]
                                                                ,"day25":dayAttend[24][0]
                                                                ,"day26":dayAttend[25][0]
                                                                ,"day27":dayAttend[26][0]
                                                                ,"day28":dayAttend[27][0]
                                                                ,"day29":dayAttend[28][0]
                                                                ,"day30":dayAttend[29][0]
                                                                ,"day31":dayAttend[30][0]

                                                            },{
                                                                "type":"下午"
                                                                ,"day1":dayAttend[0][1]
                                                                ,"day2":dayAttend[1][1]
                                                                ,"day3":dayAttend[2][1]
                                                                ,"day4":dayAttend[3][1]
                                                                ,"day5":dayAttend[4][1]
                                                                ,"day6":dayAttend[5][1]
                                                                ,"day7":dayAttend[6][1]
                                                                ,"day8":dayAttend[7][1]
                                                                ,"day9":dayAttend[8][1]
                                                                ,"day10":dayAttend[9][1]
                                                                ,"day11":dayAttend[10][1]
                                                                ,"day12":dayAttend[11][1]
                                                                ,"day13":dayAttend[12][1]
                                                                ,"day14":dayAttend[13][1]
                                                                ,"day15":dayAttend[14][1]
                                                                ,"day16":dayAttend[15][1]
                                                                ,"day17":dayAttend[16][1]
                                                                ,"day18":dayAttend[17][1]
                                                                ,"day19":dayAttend[18][1]
                                                                ,"day20":dayAttend[19][1]
                                                                ,"day21":dayAttend[20][1]
                                                                ,"day22":dayAttend[21][1]
                                                                ,"day23":dayAttend[22][1]
                                                                ,"day24":dayAttend[23][1]
                                                                ,"day25":dayAttend[24][1]
                                                                ,"day26":dayAttend[25][1]
                                                                ,"day27":dayAttend[26][1]
                                                                ,"day28":dayAttend[27][1]
                                                                ,"day29":dayAttend[28][1]
                                                                ,"day30":dayAttend[29][1]
                                                                ,"day31":dayAttend[30][1]
                                                            },{
                                                                "type":"加班工时"
                                                                ,"day1":dayAttend[0][2]
                                                                ,"day2":dayAttend[1][2]
                                                                ,"day3":dayAttend[2][2]
                                                                ,"day4":dayAttend[3][2]
                                                                ,"day5":dayAttend[4][2]
                                                                ,"day6":dayAttend[5][2]
                                                                ,"day7":dayAttend[6][2]
                                                                ,"day8":dayAttend[7][2]
                                                                ,"day9":dayAttend[8][2]
                                                                ,"day10":dayAttend[9][2]
                                                                ,"day11":dayAttend[10][2]
                                                                ,"day12":dayAttend[11][2]
                                                                ,"day13":dayAttend[12][2]
                                                                ,"day14":dayAttend[13][2]
                                                                ,"day15":dayAttend[14][2]
                                                                ,"day16":dayAttend[15][2]
                                                                ,"day17":dayAttend[16][2]
                                                                ,"day18":dayAttend[17][2]
                                                                ,"day19":dayAttend[18][2]
                                                                ,"day20":dayAttend[19][2]
                                                                ,"day21":dayAttend[20][2]
                                                                ,"day22":dayAttend[21][2]
                                                                ,"day23":dayAttend[22][2]
                                                                ,"day24":dayAttend[23][2]
                                                                ,"day25":dayAttend[24][2]
                                                                ,"day26":dayAttend[25][2]
                                                                ,"day27":dayAttend[26][2]
                                                                ,"day28":dayAttend[27][2]
                                                                ,"day29":dayAttend[28][2]
                                                                ,"day30":dayAttend[29][2]
                                                                ,"day31":dayAttend[30][2]
                                                            },{
                                                                "type":"一天"
                                                                ,"day1":dayAttend[0][3]
                                                                ,"day2":dayAttend[1][3]
                                                                ,"day3":dayAttend[2][3]
                                                                ,"day4":dayAttend[3][3]
                                                                ,"day5":dayAttend[4][3]
                                                                ,"day6":dayAttend[5][3]
                                                                ,"day7":dayAttend[6][3]
                                                                ,"day8":dayAttend[7][3]
                                                                ,"day9":dayAttend[8][3]
                                                                ,"day10":dayAttend[9][3]
                                                                ,"day11":dayAttend[10][3]
                                                                ,"day12":dayAttend[11][3]
                                                                ,"day13":dayAttend[12][3]
                                                                ,"day14":dayAttend[13][3]
                                                                ,"day15":dayAttend[14][3]
                                                                ,"day16":dayAttend[15][3]
                                                                ,"day17":dayAttend[16][3]
                                                                ,"day18":dayAttend[17][3]
                                                                ,"day19":dayAttend[18][3]
                                                                ,"day20":dayAttend[19][3]
                                                                ,"day21":dayAttend[20][3]
                                                                ,"day22":dayAttend[21][3]
                                                                ,"day23":dayAttend[22][3]
                                                                ,"day24":dayAttend[23][3]
                                                                ,"day25":dayAttend[24][3]
                                                                ,"day26":dayAttend[25][3]
                                                                ,"day27":dayAttend[26][3]
                                                                ,"day28":dayAttend[27][3]
                                                                ,"day29":dayAttend[28][3]
                                                                ,"day30":dayAttend[29][3]
                                                                ,"day31":dayAttend[30][3]
                                                            }
                                                            ],
                                                            done:function type (res,curr,count) {
                                                                pageCurr=curr;
                                                            }
                                                            // , page: true
                                                        });
                                                    }
                                                    else if(MonthDate=="04"||MonthDate=="06"||MonthDate=="09"||MonthDate=="11"){
                                                        table.render({
                                                            elem: '#laborTimeS2'
                                                            // , url: '/getNameByProjectId?projectId=' + proId
                                                            ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
                                                            ,defaultToolbar: [ 'exports', 'print']
                                                            ,id: 'testReload2'
                                                            ,cols: [[
                                                                {field:'type',title:'时间',width:110},
                                                                {field:'day1',title:'1日',},
                                                                {field:'day2',title:'2日',},
                                                                {field:'day3',title:'3日',},
                                                                {field:'day4',title:'4日',},
                                                                {field:'day5',title:'5日',},
                                                                {field:'day6',title:'6日',},
                                                                {field:'day7',title:'7日',},
                                                                {field:'day8',title:'8日',},
                                                                {field:'day9',title:'9日' },
                                                                {field:'day10',title:'10日'},
                                                                {field:'day11',title:'11日'},
                                                                {field:'day12',title:'12日'},
                                                                {field:'day13',title:'13日'},
                                                                {field:'day14',title:'14日'},
                                                                {field:'day15',title:'15日'},
                                                                {field:'day16',title:'16日'},
                                                                {field:'day17',title:'17日'},
                                                                {field:'day18',title:'18日'},
                                                                {field:'day19',title:'19日'},
                                                                {field:'day20',title:'20日'},
                                                                {field:'day21',title:'21日'},
                                                                {field:'day22',title:'22日'},
                                                                {field:'day23',title:'23日'},
                                                                {field:'day24',title:'24日'},
                                                                {field:'day25',title:'25日'},
                                                                {field:'day26',title:'26日'},
                                                                {field:'day27',title:'27日'},
                                                                {field:'day28',title:'28日'},
                                                                {field:'day29',title:'29日'},
                                                                {field:'day30',title:'30日'},
                                                            ]]
                                                            ,data:[{
                                                                "type":"上午"
                                                                ,"day1":dayAttend[0][0]
                                                                ,"day2":dayAttend[1][0]
                                                                ,"day3":dayAttend[2][0]
                                                                ,"day4":dayAttend[3][0]
                                                                ,"day5":dayAttend[4][0]
                                                                ,"day6":dayAttend[5][0]
                                                                ,"day7":dayAttend[6][0]
                                                                ,"day8":dayAttend[7][0]
                                                                ,"day9":dayAttend[8][0]
                                                                ,"day10":dayAttend[9][0]
                                                                ,"day11":dayAttend[10][0]
                                                                ,"day12":dayAttend[11][0]
                                                                ,"day13":dayAttend[12][0]
                                                                ,"day14":dayAttend[13][0]
                                                                ,"day15":dayAttend[14][0]
                                                                ,"day16":dayAttend[15][0]
                                                                ,"day17":dayAttend[16][0]
                                                                ,"day18":dayAttend[17][0]
                                                                ,"day19":dayAttend[18][0]
                                                                ,"day20":dayAttend[19][0]
                                                                ,"day21":dayAttend[20][0]
                                                                ,"day22":dayAttend[21][0]
                                                                ,"day23":dayAttend[22][0]
                                                                ,"day24":dayAttend[23][0]
                                                                ,"day25":dayAttend[24][0]
                                                                ,"day26":dayAttend[25][0]
                                                                ,"day27":dayAttend[26][0]
                                                                ,"day28":dayAttend[27][0]
                                                                ,"day29":dayAttend[28][0]
                                                                ,"day30":dayAttend[29][0]


                                                            },{
                                                                "type":"下午"
                                                                ,"day1":dayAttend[0][1]
                                                                ,"day2":dayAttend[1][1]
                                                                ,"day3":dayAttend[2][1]
                                                                ,"day4":dayAttend[3][1]
                                                                ,"day5":dayAttend[4][1]
                                                                ,"day6":dayAttend[5][1]
                                                                ,"day7":dayAttend[6][1]
                                                                ,"day8":dayAttend[7][1]
                                                                ,"day9":dayAttend[8][1]
                                                                ,"day10":dayAttend[9][1]
                                                                ,"day11":dayAttend[10][1]
                                                                ,"day12":dayAttend[11][1]
                                                                ,"day13":dayAttend[12][1]
                                                                ,"day14":dayAttend[13][1]
                                                                ,"day15":dayAttend[14][1]
                                                                ,"day16":dayAttend[15][1]
                                                                ,"day17":dayAttend[16][1]
                                                                ,"day18":dayAttend[17][1]
                                                                ,"day19":dayAttend[18][1]
                                                                ,"day20":dayAttend[19][1]
                                                                ,"day21":dayAttend[20][1]
                                                                ,"day22":dayAttend[21][1]
                                                                ,"day23":dayAttend[22][1]
                                                                ,"day24":dayAttend[23][1]
                                                                ,"day25":dayAttend[24][1]
                                                                ,"day26":dayAttend[25][1]
                                                                ,"day27":dayAttend[26][1]
                                                                ,"day28":dayAttend[27][1]
                                                                ,"day29":dayAttend[28][1]
                                                                ,"day30":dayAttend[29][1]

                                                            },{
                                                                "type":"加班工时"
                                                                ,"day1":dayAttend[0][2]
                                                                ,"day2":dayAttend[1][2]
                                                                ,"day3":dayAttend[2][2]
                                                                ,"day4":dayAttend[3][2]
                                                                ,"day5":dayAttend[4][2]
                                                                ,"day6":dayAttend[5][2]
                                                                ,"day7":dayAttend[6][2]
                                                                ,"day8":dayAttend[7][2]
                                                                ,"day9":dayAttend[8][2]
                                                                ,"day10":dayAttend[9][2]
                                                                ,"day11":dayAttend[10][2]
                                                                ,"day12":dayAttend[11][2]
                                                                ,"day13":dayAttend[12][2]
                                                                ,"day14":dayAttend[13][2]
                                                                ,"day15":dayAttend[14][2]
                                                                ,"day16":dayAttend[15][2]
                                                                ,"day17":dayAttend[16][2]
                                                                ,"day18":dayAttend[17][2]
                                                                ,"day19":dayAttend[18][2]
                                                                ,"day20":dayAttend[19][2]
                                                                ,"day21":dayAttend[20][2]
                                                                ,"day22":dayAttend[21][2]
                                                                ,"day23":dayAttend[22][2]
                                                                ,"day24":dayAttend[23][2]
                                                                ,"day25":dayAttend[24][2]
                                                                ,"day26":dayAttend[25][2]
                                                                ,"day27":dayAttend[26][2]
                                                                ,"day28":dayAttend[27][2]
                                                                ,"day29":dayAttend[28][2]
                                                                ,"day30":dayAttend[29][2]

                                                            },{
                                                                "type":"一天"
                                                                ,"day1":dayAttend[0][3]
                                                                ,"day2":dayAttend[1][3]
                                                                ,"day3":dayAttend[2][3]
                                                                ,"day4":dayAttend[3][3]
                                                                ,"day5":dayAttend[4][3]
                                                                ,"day6":dayAttend[5][3]
                                                                ,"day7":dayAttend[6][3]
                                                                ,"day8":dayAttend[7][3]
                                                                ,"day9":dayAttend[8][3]
                                                                ,"day10":dayAttend[9][3]
                                                                ,"day11":dayAttend[10][3]
                                                                ,"day12":dayAttend[11][3]
                                                                ,"day13":dayAttend[12][3]
                                                                ,"day14":dayAttend[13][3]
                                                                ,"day15":dayAttend[14][3]
                                                                ,"day16":dayAttend[15][3]
                                                                ,"day17":dayAttend[16][3]
                                                                ,"day18":dayAttend[17][3]
                                                                ,"day19":dayAttend[18][3]
                                                                ,"day20":dayAttend[19][3]
                                                                ,"day21":dayAttend[20][3]
                                                                ,"day22":dayAttend[21][3]
                                                                ,"day23":dayAttend[22][3]
                                                                ,"day24":dayAttend[23][3]
                                                                ,"day25":dayAttend[24][3]
                                                                ,"day26":dayAttend[25][3]
                                                                ,"day27":dayAttend[26][3]
                                                                ,"day28":dayAttend[27][3]
                                                                ,"day29":dayAttend[28][3]
                                                                ,"day30":dayAttend[29][3]

                                                            }
                                                            ],
                                                            done:function type (res,curr,count) {
                                                                pageCurr=curr;
                                                            }
                                                            // , page: true
                                                        });
                                                    }
                                                    else if(MonthDate=="02"){
                                                        table.render({
                                                            elem: '#laborTimeS2'
                                                            // , url: '/getNameByProjectId?projectId=' + proId

                                                            ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
                                                            ,defaultToolbar: [ 'exports', 'print']
                                                            ,id: 'testReload2'
                                                            ,cols: [[
                                                                {field:'type',title:'时间',width:110},
                                                                {field:'day1',title:'1日',},
                                                                {field:'day2',title:'2日',},
                                                                {field:'day3',title:'3日',},
                                                                {field:'day4',title:'4日',},
                                                                {field:'day5',title:'5日',},
                                                                {field:'day6',title:'6日',},
                                                                {field:'day7',title:'7日',},
                                                                {field:'day8',title:'8日',},
                                                                {field:'day9',title:'9日' },
                                                                {field:'day10',title:'10日'},
                                                                {field:'day11',title:'11日'},
                                                                {field:'day12',title:'12日'},
                                                                {field:'day13',title:'13日'},
                                                                {field:'day14',title:'14日'},
                                                                {field:'day15',title:'15日'},
                                                                {field:'day16',title:'16日'},
                                                                {field:'day17',title:'17日'},
                                                                {field:'day18',title:'18日'},
                                                                {field:'day19',title:'19日'},
                                                                {field:'day20',title:'20日'},
                                                                {field:'day21',title:'21日'},
                                                                {field:'day22',title:'22日'},
                                                                {field:'day23',title:'23日'},
                                                                {field:'day24',title:'24日'},
                                                                {field:'day25',title:'25日'},
                                                                {field:'day26',title:'26日'},
                                                                {field:'day27',title:'27日'},
                                                                {field:'day28',title:'28日'},
                                                            ]]
                                                            ,data:[{
                                                                "type":"上午"
                                                                ,"day1":dayAttend[0][0]
                                                                ,"day2":dayAttend[1][0]
                                                                ,"day3":dayAttend[2][0]
                                                                ,"day4":dayAttend[3][0]
                                                                ,"day5":dayAttend[4][0]
                                                                ,"day6":dayAttend[5][0]
                                                                ,"day7":dayAttend[6][0]
                                                                ,"day8":dayAttend[7][0]
                                                                ,"day9":dayAttend[8][0]
                                                                ,"day10":dayAttend[9][0]
                                                                ,"day11":dayAttend[10][0]
                                                                ,"day12":dayAttend[11][0]
                                                                ,"day13":dayAttend[12][0]
                                                                ,"day14":dayAttend[13][0]
                                                                ,"day15":dayAttend[14][0]
                                                                ,"day16":dayAttend[15][0]
                                                                ,"day17":dayAttend[16][0]
                                                                ,"day18":dayAttend[17][0]
                                                                ,"day19":dayAttend[18][0]
                                                                ,"day20":dayAttend[19][0]
                                                                ,"day21":dayAttend[20][0]
                                                                ,"day22":dayAttend[21][0]
                                                                ,"day23":dayAttend[22][0]
                                                                ,"day24":dayAttend[23][0]
                                                                ,"day25":dayAttend[24][0]
                                                                ,"day26":dayAttend[25][0]
                                                                ,"day27":dayAttend[26][0]
                                                                ,"day28":dayAttend[27][0]


                                                            },{
                                                                "type":"下午"
                                                                ,"day1":dayAttend[0][1]
                                                                ,"day2":dayAttend[1][1]
                                                                ,"day3":dayAttend[2][1]
                                                                ,"day4":dayAttend[3][1]
                                                                ,"day5":dayAttend[4][1]
                                                                ,"day6":dayAttend[5][1]
                                                                ,"day7":dayAttend[6][1]
                                                                ,"day8":dayAttend[7][1]
                                                                ,"day9":dayAttend[8][1]
                                                                ,"day10":dayAttend[9][1]
                                                                ,"day11":dayAttend[10][1]
                                                                ,"day12":dayAttend[11][1]
                                                                ,"day13":dayAttend[12][1]
                                                                ,"day14":dayAttend[13][1]
                                                                ,"day15":dayAttend[14][1]
                                                                ,"day16":dayAttend[15][1]
                                                                ,"day17":dayAttend[16][1]
                                                                ,"day18":dayAttend[17][1]
                                                                ,"day19":dayAttend[18][1]
                                                                ,"day20":dayAttend[19][1]
                                                                ,"day21":dayAttend[20][1]
                                                                ,"day22":dayAttend[21][1]
                                                                ,"day23":dayAttend[22][1]
                                                                ,"day24":dayAttend[23][1]
                                                                ,"day25":dayAttend[24][1]
                                                                ,"day26":dayAttend[25][1]
                                                                ,"day27":dayAttend[26][1]
                                                                ,"day28":dayAttend[27][1]

                                                            },{
                                                                "type":"加班工时"
                                                                ,"day1":dayAttend[0][2]
                                                                ,"day2":dayAttend[1][2]
                                                                ,"day3":dayAttend[2][2]
                                                                ,"day4":dayAttend[3][2]
                                                                ,"day5":dayAttend[4][2]
                                                                ,"day6":dayAttend[5][2]
                                                                ,"day7":dayAttend[6][2]
                                                                ,"day8":dayAttend[7][2]
                                                                ,"day9":dayAttend[8][2]
                                                                ,"day10":dayAttend[9][2]
                                                                ,"day11":dayAttend[10][2]
                                                                ,"day12":dayAttend[11][2]
                                                                ,"day13":dayAttend[12][2]
                                                                ,"day14":dayAttend[13][2]
                                                                ,"day15":dayAttend[14][2]
                                                                ,"day16":dayAttend[15][2]
                                                                ,"day17":dayAttend[16][2]
                                                                ,"day18":dayAttend[17][2]
                                                                ,"day19":dayAttend[18][2]
                                                                ,"day20":dayAttend[19][2]
                                                                ,"day21":dayAttend[20][2]
                                                                ,"day22":dayAttend[21][2]
                                                                ,"day23":dayAttend[22][2]
                                                                ,"day24":dayAttend[23][2]
                                                                ,"day25":dayAttend[24][2]
                                                                ,"day26":dayAttend[25][2]
                                                                ,"day27":dayAttend[26][2]
                                                                ,"day28":dayAttend[27][2]
                                                            },{
                                                                "type":"一天"
                                                                ,"day1":dayAttend[0][3]
                                                                ,"day2":dayAttend[1][3]
                                                                ,"day3":dayAttend[2][3]
                                                                ,"day4":dayAttend[3][3]
                                                                ,"day5":dayAttend[4][3]
                                                                ,"day6":dayAttend[5][3]
                                                                ,"day7":dayAttend[6][3]
                                                                ,"day8":dayAttend[7][3]
                                                                ,"day9":dayAttend[8][3]
                                                                ,"day10":dayAttend[9][3]
                                                                ,"day11":dayAttend[10][3]
                                                                ,"day12":dayAttend[11][3]
                                                                ,"day13":dayAttend[12][3]
                                                                ,"day14":dayAttend[13][3]
                                                                ,"day15":dayAttend[14][3]
                                                                ,"day16":dayAttend[15][3]
                                                                ,"day17":dayAttend[16][3]
                                                                ,"day18":dayAttend[17][3]
                                                                ,"day19":dayAttend[18][3]
                                                                ,"day20":dayAttend[19][3]
                                                                ,"day21":dayAttend[20][3]
                                                                ,"day22":dayAttend[21][3]
                                                                ,"day23":dayAttend[22][3]
                                                                ,"day24":dayAttend[23][3]
                                                                ,"day25":dayAttend[24][3]
                                                                ,"day26":dayAttend[25][3]
                                                                ,"day27":dayAttend[26][3]
                                                                ,"day28":dayAttend[27][3]
                                                            }
                                                            ],
                                                            done:function type (res,curr,count) {
                                                                pageCurr=curr;
                                                            }
                                                            // , page: true
                                                        });
                                                    }
                                                    var $ = layui.$, active = {
                                                        reload: function(){
                                                            var demoReload = $('#laborTimeS2');

                                                            //执行重载
                                                            table.reload('testReload2', {
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
                                                                alert("success!")
                                                            }
                                                        });
                                                    });
                                                });
                                            },
                                            Error:function(data){
                                                alert("该员工本月无考勤记录，请选择其他员工或时间段")
                                            }

                                        });
                                    }
                                });
                            });
                        }
                    })
                }
            });
        });
        form.render();
    });
}
function showSum(){
    document.getElementById('details').style.display='none';
    document.getElementById('sum').style.display='';
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
                $("#selectLaborProjectS2D").empty();

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
                    // console.log(i);
                    // console.log(projectName[i]);

                    $('#selectLaborProjectS2D').append("<option value='"+i+"'>"+projectName[i]+"</option>");

                }
                form.render();
                $("#selectLaborProjectS2D").val("");

                form.render();
            }
        });
        form.on('select(selectLaborProjectS2D)', function(data){
            var val=data.value;
            var proId=++val;//记录所选项目部
            // console.log(val);
            console.log(proId);
            document.getElementById("selectMonthS2D").style.display="";
            document.getElementById("showTable2D").style.display="none";
            $.ajax({//通过项目部获取员工姓名
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
                    var nameInfLength=data.data.length;//当前项目部员工数

                    var sumInf = new Array();//汇总信息表格二维数组初始化
                    for(var k=0;k<31;k++){
                        sumInf[k]=new Array();
                        for(var j=0;j<nameInfLength;j++){
                            sumInf[k][j]=0
                        }
                    }
                    layui.use('laydate', function(){
                        var laydate = layui.laydate;
                        //年月选择器
                        $("#laborMonthS").remove();//移除后重新加载，因为LayDate不能二次渲染...
                        $("#selectMonthS").html('<input type="text" class="layui-input" placeholder="请选择月份" id="laborMonthS" style="height:36px;width:150px;display:none;float: left;">');
                        document.getElementById("laborMonthS").style.display="";
                        layui.use('laydate', function(){
                            var laydate = layui.laydate;
                            //年月选择器
                            $("#laborMonthS2D").remove();//移除后重新加载，因为LayDate不能二次渲染...
                            $("#selectMonthS2D").html('<input type="text" class="layui-input" placeholder="请选择月份" id="laborMonthS2D" style="height:36px;width:150px;display:none;float: left;">');
                            document.getElementById("laborMonthS2D").style.display="";
                            laydate.render({
                                elem: '#laborMonthS2D'
                                ,type: 'month'
                                ,max:0
                                ,done:function (value,date,endDate) {
                                    var datetime=value;//真实年月
                                    var showMonth = datetime.substr(0,4)+"年"+datetime.substr(5,2)+"月";
                                    console.log(datetime);
                                    var MonthDate = datetime.substr(5,2);
                                    // console.log(showMonth);
                                    $("#laborMonthS2D").val("");//此处打算清空月份选择器以便于使用自己定义的样式显示内容,但是很奇怪，这里没清掉。
                                    $('#laborMonthS2D').prop("placeholder",showMonth);
                                    console.log("nameInfLength"+nameInfLength)

                                    for(var iTwo=0;iTwo<nameInfLength;iTwo++) {
                                        var nameNow=userNameInf[iTwo];
                                        $.ajax({//通过项目部、年月、员工姓名获取员工工时
                                            url: '/getWorkingHoursByProPeople2',
                                            type: "POST",
                                            datatype: 'json',
                                            async: false,
                                            data:{
                                                projectId: proId,
                                                datetime:datetime,
                                                name:userNameInf[iTwo]
                                            },
                                            success: function (data) {
                                                console.log(data)
                                                // console.log(iTwo)
                                                // console.log(nameNow)
                                                var peopleNameLength=data.data.length;

                                                console.log(peopleNameLength)
                                                var dayAttend = new Array();//员工每日工时
                                                for(var k=0;k<31;k++){
                                                    dayAttend[k]=new Array();
                                                    for(var j=0;j<4;j++){
                                                        dayAttend[k][j]=0
                                                    }
                                                }
                                                var pp=nameNow.substr(0,1).toUpperCase();
                                                // console.log(dayAttend);
                                                for(var i=0;i<peopleNameLength;i++){

                                                    var datetem = data.data[i].datetime.substr(8,2);//确定日期序号
                                                    var dateTem = parseInt(datetem)//转为整形
                                                    // console.log(dateTem)

                                                    var hourstem = data.data[i].datetime.substr(11,2)+data.data[i].datetime.substr(14,2)
                                                    var hoursTem = parseInt(hourstem)
                                                    // console.log(hoursTem)
                                                    {
                                                        if(dateTem==1){
                                                            dayAttend[0][3]+=data.data[i].workingHours;
                                                            if(hoursTem<=1200){
                                                                dayAttend[0][0]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1200&&hoursTem<=1800){
                                                                dayAttend[0][1]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1800){
                                                                dayAttend[0][2]+=data.data[i].workingHours;
                                                            }
                                                        }
                                                        if(dateTem==2){
                                                            dayAttend[1][3]+=data.data[i].workingHours;
                                                            if(hoursTem<=1200){
                                                                dayAttend[1][0]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1200&&hoursTem<=1800){
                                                                dayAttend[1][1]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1800){
                                                                dayAttend[1][2]+=data.data[i].workingHours;
                                                            }
                                                        }
                                                        if(dateTem==3){
                                                            dayAttend[2][3]+=data.data[i].workingHours;
                                                            if(hoursTem<=1200){
                                                                dayAttend[2][0]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1200&&hoursTem<=1800){
                                                                dayAttend[2][1]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1800){
                                                                dayAttend[2][2]+=data.data[i].workingHours;
                                                            }
                                                        }
                                                        if(dateTem==4){
                                                            dayAttend[3][3]+=data.data[i].workingHours;
                                                            if(hoursTem<=1200){
                                                                dayAttend[3][0]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1200&&hoursTem<=1800){
                                                                dayAttend[3][1]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1800){
                                                                dayAttend[3][2]+=data.data[i].workingHours;
                                                            }
                                                        }
                                                        if(dateTem==5){
                                                            dayAttend[4][3]+=data.data[i].workingHours;
                                                            if(hoursTem<=1200){
                                                                dayAttend[4][0]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1200&&hoursTem<=1800){
                                                                dayAttend[4][1]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1800){
                                                                dayAttend[4][2]+=data.data[i].workingHours;
                                                            }
                                                        }
                                                        if(dateTem==6){
                                                            dayAttend[5][3]+=data.data[i].workingHours;
                                                            if(hoursTem<=1200){
                                                                dayAttend[5][0]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1200&&hoursTem<=1800){
                                                                dayAttend[5][1]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1800){
                                                                dayAttend[5][2]+=data.data[i].workingHours;
                                                            }
                                                        }
                                                        if(dateTem==7){
                                                            dayAttend[6][3]+=data.data[i].workingHours;
                                                            if(hoursTem<=1200){
                                                                dayAttend[6][0]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1200&&hoursTem<=1800){
                                                                dayAttend[6][1]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1800){
                                                                dayAttend[6][2]+=data.data[i].workingHours;
                                                            }
                                                        }
                                                        if(dateTem==8){
                                                            dayAttend[7][3]+=data.data[i].workingHours;
                                                            if(hoursTem<=1200){
                                                                dayAttend[7][0]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1200&&hoursTem<=1800){
                                                                dayAttend[7][1]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1800){
                                                                dayAttend[7][2]+=data.data[i].workingHours;
                                                            }
                                                        }
                                                        if(dateTem==9){
                                                            dayAttend[8][3]+=data.data[i].workingHours;
                                                            if(hoursTem<=1200){
                                                                dayAttend[8][0]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1200&&hoursTem<=1800){
                                                                dayAttend[8][1]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1800){
                                                                dayAttend[8][2]+=data.data[i].workingHours;
                                                            }
                                                        }
                                                        if(dateTem==10){
                                                            dayAttend[9][3]+=data.data[i].workingHours;
                                                            if(hoursTem<=1200){
                                                                dayAttend[9][0]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1200&&hoursTem<=1800){
                                                                dayAttend[9][1]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1800){
                                                                dayAttend[9][2]+=data.data[i].workingHours;
                                                            }
                                                        }
                                                        if(dateTem==11){
                                                            dayAttend[10][3]+=data.data[i].workingHours;
                                                            if(hoursTem<=1200){
                                                                dayAttend[10][0]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1200&&hoursTem<=1800){
                                                                dayAttend[10][1]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1800){
                                                                dayAttend[10][2]+=data.data[i].workingHours;
                                                            }
                                                        }
                                                        if(dateTem==12){
                                                            dayAttend[11][3]+=data.data[i].workingHours;
                                                            if(hoursTem<=1200){
                                                                dayAttend[11][0]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1200&&hoursTem<=1800){
                                                                dayAttend[11][1]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1800){
                                                                dayAttend[11][2]+=data.data[i].workingHours;
                                                            }
                                                        }
                                                        if(dateTem==13){
                                                            dayAttend[12][3]+=data.data[i].workingHours;
                                                            if(hoursTem<=1200){
                                                                dayAttend[12][0]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1200&&hoursTem<=1800){
                                                                dayAttend[12][1]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1800){
                                                                dayAttend[12][2]+=data.data[i].workingHours;
                                                            }
                                                        }
                                                        if(dateTem==14){
                                                            dayAttend[13][3]+=data.data[i].workingHours;
                                                            if(hoursTem<=1200){
                                                                dayAttend[13][0]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1200&&hoursTem<=1800){
                                                                dayAttend[13][1]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1800){
                                                                dayAttend[13][2]+=data.data[i].workingHours;
                                                            }
                                                        }
                                                        if(dateTem==15){
                                                            dayAttend[14][3]+=data.data[i].workingHours;
                                                            if(hoursTem<=1200){
                                                                dayAttend[14][0]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1200&&hoursTem<=1800){
                                                                dayAttend[14][1]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1800){
                                                                dayAttend[14][2]+=data.data[i].workingHours;
                                                            }
                                                        }
                                                        if(dateTem==16){
                                                            dayAttend[15][3]+=data.data[i].workingHours;
                                                            if(hoursTem<=1200){
                                                                dayAttend[15][0]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1200&&hoursTem<=1800){
                                                                dayAttend[15][1]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1800){
                                                                dayAttend[15][2]+=data.data[i].workingHours;
                                                            }
                                                        }
                                                        if(dateTem==17){
                                                            dayAttend[16][3]+=data.data[i].workingHours;
                                                            if(hoursTem<=1200){
                                                                dayAttend[16][0]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1200&&hoursTem<=1800){
                                                                dayAttend[16][1]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1800){
                                                                dayAttend[16][2]+=data.data[i].workingHours;
                                                            }
                                                        }
                                                        if(dateTem==18){
                                                            dayAttend[17][3]+=data.data[i].workingHours;
                                                            if(hoursTem<=1200){
                                                                dayAttend[17][0]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1200&&hoursTem<=1800){
                                                                dayAttend[17][1]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1800){
                                                                dayAttend[17][2]+=data.data[i].workingHours;
                                                            }
                                                        }
                                                        if(dateTem==19){
                                                            dayAttend[18][3]+=data.data[i].workingHours;
                                                            if(hoursTem<=1200){
                                                                dayAttend[18][0]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1200&&hoursTem<=1800){
                                                                dayAttend[18][1]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1800){
                                                                dayAttend[18][2]+=data.data[i].workingHours;
                                                            }
                                                        }
                                                        if(dateTem==20){
                                                            dayAttend[19][3]+=data.data[i].workingHours;
                                                            if(hoursTem<=1200){
                                                                dayAttend[19][0]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1200&&hoursTem<=1800){
                                                                dayAttend[19][1]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1800){
                                                                dayAttend[19][2]+=data.data[i].workingHours;
                                                            }
                                                        }
                                                        if(dateTem==21){
                                                            dayAttend[20][3]+=data.data[i].workingHours;
                                                            if(hoursTem<=1200){
                                                                dayAttend[20][0]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1200&&hoursTem<=1800){
                                                                dayAttend[20][1]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1800){
                                                                dayAttend[20][2]+=data.data[i].workingHours;
                                                            }
                                                        }
                                                        if(dateTem==22){
                                                            dayAttend[21][3]+=data.data[i].workingHours;
                                                            if(hoursTem<=1200){
                                                                dayAttend[21][0]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1200&&hoursTem<=1800){
                                                                dayAttend[21][1]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1800){
                                                                dayAttend[21][2]+=data.data[i].workingHours;
                                                            }
                                                        }
                                                        if(dateTem==23){
                                                            dayAttend[22][3]+=data.data[i].workingHours;
                                                            if(hoursTem<=1200){
                                                                dayAttend[22][0]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1200&&hoursTem<=1800){
                                                                dayAttend[22][1]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1800){
                                                                dayAttend[22][2]+=data.data[i].workingHours;
                                                            }
                                                        }
                                                        if(dateTem==24){
                                                            dayAttend[23][3]+=data.data[i].workingHours;
                                                            if(hoursTem<=1200){
                                                                dayAttend[23][0]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1200&&hoursTem<=1800){
                                                                dayAttend[23][1]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1800){
                                                                dayAttend[23][2]+=data.data[i].workingHours;
                                                            }
                                                        }
                                                        if(dateTem==25){
                                                            dayAttend[24][3]+=data.data[i].workingHours;
                                                            if(hoursTem<=1200){
                                                                dayAttend[24][0]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1200&&hoursTem<=1800){
                                                                dayAttend[24][1]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1800){
                                                                dayAttend[24][2]+=data.data[i].workingHours;
                                                            }
                                                        }
                                                        if(dateTem==26){
                                                            dayAttend[25][3]+=data.data[i].workingHours;
                                                            if(hoursTem<=1200){
                                                                dayAttend[25][0]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1200&&hoursTem<=1800){
                                                                dayAttend[25][1]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1800){
                                                                dayAttend[25][2]+=data.data[i].workingHours;
                                                            }
                                                        }
                                                        if(dateTem==27){
                                                            dayAttend[26][3]+=data.data[i].workingHours;
                                                            if(hoursTem<=1200){
                                                                dayAttend[26][0]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1200&&hoursTem<=1800){
                                                                dayAttend[26][1]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1800){
                                                                dayAttend[26][2]+=data.data[i].workingHours;
                                                            }
                                                        }
                                                        if(dateTem==28){
                                                            dayAttend[27][3]+=data.data[i].workingHours;
                                                            if(hoursTem<=1200){
                                                                dayAttend[27][0]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1200&&hoursTem<=1800){
                                                                dayAttend[27][1]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1800){
                                                                dayAttend[27][2]+=data.data[i].workingHours;
                                                            }
                                                        }
                                                        if(dateTem==29){
                                                            dayAttend[28][3]+=data.data[i].workingHours;
                                                            if(hoursTem<=1200){
                                                                dayAttend[28][0]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1200&&hoursTem<=1800){
                                                                dayAttend[28][1]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1800){
                                                                dayAttend[28][2]+=data.data[i].workingHours;
                                                            }
                                                        }
                                                        if(dateTem==30){
                                                            dayAttend[29][3]+=data.data[i].workingHours;
                                                            if(hoursTem<=1200){
                                                                dayAttend[29][0]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1200&&hoursTem<=1800){
                                                                dayAttend[29][1]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1800){
                                                                dayAttend[29][2]+=data.data[i].workingHours;
                                                            }
                                                        }
                                                        if(dateTem==31){
                                                            dayAttend[30][3]+=data.data[i].workingHours;
                                                            if(hoursTem<=1200){
                                                                dayAttend[30][0]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1200&&hoursTem<=1800){
                                                                dayAttend[30][1]+=data.data[i].workingHours;
                                                            }else if(hoursTem>1800){
                                                                dayAttend[30][2]+=data.data[i].workingHours;
                                                            }
                                                        }
                                                    }


                                                    if(pp=="J"){
                                                        for(var k=0;k<31;k++){
                                                            if(dayAttend[k][0]!=0){
                                                                dayAttend[k][0]=1;
                                                            };
                                                            if(dayAttend[k][1]!=0){
                                                                dayAttend[k][1]=1;
                                                            };
                                                            dayAttend[k][3]=dayAttend[k][0]+dayAttend[k][1];
                                                            if(dayAttend[k][0]==0){
                                                                dayAttend[k][0]=""
                                                            }else if(dayAttend[k][0]==1){
                                                                dayAttend[k][0]="半天"
                                                            };
                                                            if(dayAttend[k][1]==0){
                                                                dayAttend[k][1]=""
                                                            }else if(dayAttend[k][1]==1){
                                                                dayAttend[k][1]="半天"
                                                            };
                                                            if(dayAttend[k][3]==0){
                                                                dayAttend[k][3]="无"
                                                            }else if(dayAttend[k][3]==1){
                                                                dayAttend[k][3]="半天"
                                                            }else if(dayAttend[k][3]==2){
                                                                dayAttend[k][3]="一天"
                                                            }
                                                        }
                                                    }
                                                    else if(pp=="Y"){
                                                        for(var k=0;k<31;k++){
                                                            if(dayAttend[k][3]!=0){
                                                                dayAttend[k][0]="";
                                                                dayAttend[k][1]="";
                                                                dayAttend[k][3]="一天";
                                                            }else if(dayAttend[k][3]==0){
                                                                dayAttend[k][0]="";
                                                                dayAttend[k][1]="";
                                                                dayAttend[k][3]="无";
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        for(var k=0;k<31;k++){

                                                                dayAttend[k][0]="";
                                                                dayAttend[k][1]="";
                                                                dayAttend[k][3]="";

                                                        }
                                                    }
                                                }
                                                // console.log(dayAttend)
                                                // var peopleuserName=userNameInf[iTwo];
                                                // var pp=peopleuserName.substr(0,1).toUpperCase();
                                                //
                                                // if(pp=="J"){
                                                //     document.getElementById("showTable2").style.display="";
                                                //     for(var k=0;k<31;k++){
                                                //         if(dayAttend[k][0]!=0){
                                                //             dayAttend[k][0]=1;
                                                //         };
                                                //         if(dayAttend[k][1]!=0){
                                                //             dayAttend[k][1]=1;
                                                //         };
                                                //         dayAttend[k][3]=dayAttend[k][0]+dayAttend[k][1];
                                                //         if(dayAttend[k][0]==0){
                                                //             dayAttend[k][0]=""
                                                //         }else if(dayAttend[k][0]==1){
                                                //             dayAttend[k][0]="半天"
                                                //         };
                                                //         if(dayAttend[k][1]==0){
                                                //             dayAttend[k][1]=""
                                                //         }else if(dayAttend[k][1]==1){
                                                //             dayAttend[k][1]="半天"
                                                //         };
                                                //         if(dayAttend[k][3]==0){
                                                //             dayAttend[k][3]="无"
                                                //         }else if(dayAttend[k][3]==1){
                                                //             dayAttend[k][3]="半天"
                                                //         }else if(dayAttend[k][3]==2){
                                                //             dayAttend[k][3]="一天"
                                                //         }
                                                //     }
                                                // }
                                                // else if(pp=="Y"){
                                                //     document.getElementById("showTable2").style.display="";
                                                //     for(var k=0;k<31;k++){
                                                //         if(dayAttend[k][3]!=0){
                                                //             dayAttend[k][0]="";
                                                //             dayAttend[k][1]="";
                                                //             dayAttend[k][3]="一天";
                                                //         }else if(dayAttend[k][3]==0){
                                                //             dayAttend[k][0]="";
                                                //             dayAttend[k][1]="";
                                                //             dayAttend[k][3]="无";
                                                //         }
                                                //     }
                                                // }
                                                // // else {
                                                // //     alert("考勤表仅显示检修人员和运行人员，请重新选择")
                                                // // }
                                                // console.log(sumInf)
                                                console.log(iTwo);

                                                // console.log(sumInf[iTwo][0])


                                                    for(var j=0;j<31;j++){
                                                        sumInf[j][iTwo]=dayAttend[j][3];
                                                    };


                                                console.log(sumInf)
                                                document.getElementById("showTable2D").style.display="";


                                            }
                                        });
                                    }
                                    console.log(sumInf);
                                    var table = layui.table;
                                    var dataD = new Array();
                                    for(var i=0;i<nameInfLength;i++)
                                    {
                                        dataD.push({
                                            "type":userNameInf[i]
                                            ,"day1":sumInf[0][i]
                                            ,"day2":sumInf[1][i]
                                            ,"day3":sumInf[2][i]
                                            ,"day4":sumInf[3][i]
                                            ,"day5":sumInf[4][i]
                                            ,"day6":sumInf[5][i]
                                            ,"day7":sumInf[6][i]
                                            ,"day8":sumInf[7][i]
                                            ,"day9":sumInf[8][i]
                                            ,"day10":sumInf[9][i]
                                            ,"day11":sumInf[10][i]
                                            ,"day12":sumInf[11][i]
                                            ,"day13":sumInf[12][i]
                                            ,"day14":sumInf[13][i]
                                            ,"day15":sumInf[14][i]
                                            ,"day16":sumInf[15][i]
                                            ,"day17":sumInf[16][i]
                                            ,"day18":sumInf[17][i]
                                            ,"day19":sumInf[18][i]
                                            ,"day20":sumInf[19][i]
                                            ,"day21":sumInf[20][i]
                                            ,"day22":sumInf[21][i]
                                            ,"day23":sumInf[22][i]
                                            ,"day24":sumInf[23][i]
                                            ,"day25":sumInf[24][i]
                                            ,"day26":sumInf[25][i]
                                            ,"day27":sumInf[26][i]
                                            ,"day28":sumInf[27][i]
                                            ,"day29":sumInf[28][i]
                                            ,"day30":sumInf[29][i]
                                            ,"day31":sumInf[30][i]
                                        })
                                    }
                                    layui.use('table', function () {
                                        var table = layui.table;
                                        var userName = sessionStorage.Username;
                                        document.getElementById("showTable2D").style.display="";
                                        console.log(MonthDate)
                                        if(MonthDate=="01"||MonthDate=="03"||MonthDate=="05"||MonthDate=="07"||MonthDate=="08"||MonthDate=="10"||MonthDate=="12"){
                                            table.render({
                                                elem: '#laborTimeS2D'
                                                // ,url: '/getNameByProjectId?projectId=' + proId

                                                ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
                                                ,defaultToolbar: [ 'exports', 'print']
                                                ,id: 'testReload2D'
                                                ,cols: [[
                                                    {field:'type',title:'员工',width:110},
                                                    {field:'day1',title:'1日',},
                                                    {field:'day2',title:'2日',},
                                                    {field:'day3',title:'3日',},
                                                    {field:'day4',title:'4日',},
                                                    {field:'day5',title:'5日',},
                                                    {field:'day6',title:'6日',},
                                                    {field:'day7',title:'7日',},
                                                    {field:'day8',title:'8日',},
                                                    {field:'day9',title:'9日' },
                                                    {field:'day10',title:'10日'},
                                                    {field:'day11',title:'11日'},
                                                    {field:'day12',title:'12日'},
                                                    {field:'day13',title:'13日'},
                                                    {field:'day14',title:'14日'},
                                                    {field:'day15',title:'15日'},
                                                    {field:'day16',title:'16日'},
                                                    {field:'day17',title:'17日'},
                                                    {field:'day18',title:'18日'},
                                                    {field:'day19',title:'19日'},
                                                    {field:'day20',title:'20日'},
                                                    {field:'day21',title:'21日'},
                                                    {field:'day22',title:'22日'},
                                                    {field:'day23',title:'23日'},
                                                    {field:'day24',title:'24日'},
                                                    {field:'day25',title:'25日'},
                                                    {field:'day26',title:'26日'},
                                                    {field:'day27',title:'27日'},
                                                    {field:'day28',title:'28日'},
                                                    {field:'day29',title:'29日'},
                                                    {field:'day30',title:'30日'},
                                                    {field:'day31',title:'31日'},
                                                ]],
                                                data:dataD
                                                , done:function type (res,curr,count) {
                                                    pageCurr=curr;
                                                }
                                                // , page: true
                                            });
                                        }
                                        else if(MonthDate=="04"||MonthDate=="06"||MonthDate=="09"||MonthDate=="11"){
                                            table.render({
                                                elem: '#laborTimeS2D'
                                                // ,url: '/getNameByProjectId?projectId=' + proId

                                                ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
                                                ,defaultToolbar: ['exports', 'print']
                                                ,id: 'testReload2D'
                                                ,cols: [[
                                                    {field:'type',title:'员工',width:110},
                                                    {field:'day1',title:'1日',},
                                                    {field:'day2',title:'2日',},
                                                    {field:'day3',title:'3日',},
                                                    {field:'day4',title:'4日',},
                                                    {field:'day5',title:'5日',},
                                                    {field:'day6',title:'6日',},
                                                    {field:'day7',title:'7日',},
                                                    {field:'day8',title:'8日',},
                                                    {field:'day9',title:'9日' },
                                                    {field:'day10',title:'10日'},
                                                    {field:'day11',title:'11日'},
                                                    {field:'day12',title:'12日'},
                                                    {field:'day13',title:'13日'},
                                                    {field:'day14',title:'14日'},
                                                    {field:'day15',title:'15日'},
                                                    {field:'day16',title:'16日'},
                                                    {field:'day17',title:'17日'},
                                                    {field:'day18',title:'18日'},
                                                    {field:'day19',title:'19日'},
                                                    {field:'day20',title:'20日'},
                                                    {field:'day21',title:'21日'},
                                                    {field:'day22',title:'22日'},
                                                    {field:'day23',title:'23日'},
                                                    {field:'day24',title:'24日'},
                                                    {field:'day25',title:'25日'},
                                                    {field:'day26',title:'26日'},
                                                    {field:'day27',title:'27日'},
                                                    {field:'day28',title:'28日'},
                                                    {field:'day29',title:'29日'},
                                                    {field:'day30',title:'30日'},
                                                ]],
                                                data:dataD
                                                , done:function type (res,curr,count) {
                                                    pageCurr=curr;
                                                }
                                                // , page: true
                                            });
                                        }
                                        else if(MonthDate=="02"){
                                            table.render({
                                                elem: '#laborTimeS2D'
                                                // ,url: '/getNameByProjectId?projectId=' + proId

                                                ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
                                                ,defaultToolbar: ['exports', 'print']
                                                ,id: 'testReload2D'
                                                ,cols: [[
                                                    {field:'type',title:'员工',width:110},
                                                    {field:'day1',title:'1日',},
                                                    {field:'day2',title:'2日',},
                                                    {field:'day3',title:'3日',},
                                                    {field:'day4',title:'4日',},
                                                    {field:'day5',title:'5日',},
                                                    {field:'day6',title:'6日',},
                                                    {field:'day7',title:'7日',},
                                                    {field:'day8',title:'8日',},
                                                    {field:'day9',title:'9日' },
                                                    {field:'day10',title:'10日'},
                                                    {field:'day11',title:'11日'},
                                                    {field:'day12',title:'12日'},
                                                    {field:'day13',title:'13日'},
                                                    {field:'day14',title:'14日'},
                                                    {field:'day15',title:'15日'},
                                                    {field:'day16',title:'16日'},
                                                    {field:'day17',title:'17日'},
                                                    {field:'day18',title:'18日'},
                                                    {field:'day19',title:'19日'},
                                                    {field:'day20',title:'20日'},
                                                    {field:'day21',title:'21日'},
                                                    {field:'day22',title:'22日'},
                                                    {field:'day23',title:'23日'},
                                                    {field:'day24',title:'24日'},
                                                    {field:'day25',title:'25日'},
                                                    {field:'day26',title:'26日'},
                                                    {field:'day27',title:'27日'},
                                                    {field:'day28',title:'28日'},
                                                ]],
                                                data:dataD
                                                , done:function type (res,curr,count) {
                                                    pageCurr=curr;
                                                }
                                                // , page: true
                                            });
                                        }

                                        var $ = layui.$, active = {
                                            reload: function(){
                                                var demoReload = $('#laborTimeS2D');

                                                //执行重载
                                                table.reload('testReload2D', {
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
                                            table.on('tool(demoEventD)', function(obj){
                                                var data = obj.data;
                                                if(obj.event === 'setSign'){
                                                    alert("success!")
                                                }
                                            });
                                        });
                                    });



                                }
                            });
                        });
                    });
                }
            });
        });
        form.render();
    });
}
function selectPeopleByPro(value){
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
                $('#selectLaborProjectS-2').append("<option value='"+i+"'>"+name[i]+"</option>");
            }
        }
    });
}