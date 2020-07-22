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
function checkPro() {
    var userName = sessionStorage.Username;
    console.log(userName);
    $.ajax({
        "type" : 'post',
        "url": "/getPermissionByUserIdAndPermissionId",
        "data":{userName:userName,permissionId:66},
        "success":function(data){
            if(!data){
                console.log('无类型通知权限')
            }else{
                $('#leixing').attr("disabled",false);
                console.log('success')
            }
        }
    });
}
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
				layer.alert('该账号没有查看通知管理的权限，请换账号重试!', {icon : 2});
				window.location="../";  
			}
			
		}
	});
}

var infObj = (function (jQuery) {
    var temp;

    function deleteinf(id) {

        $.ajax({
            url: "/deleteInf",
            type: "post",
            data: {"Id": id},
            async: false,//是否异步请求
            datatype: "json",
            success: function (data) {
                var a = data;
                if (a == "success") {
                    alert("删除成功");
                    loodtable();
                } else {
                    alert("删除失败");
                }

            }
        })


    }

    function insertinf() {
        var title = $('#iTitle').val();
        var content = $('#iContent').val();
        var text = '';


        var radio= $('#iRadio input[name="iProperty"]:checked').val();
        var select= $('#iSelect select[name="department"]').val();
        var check1= $('#iCheck input[name="compSystem"]:checked').val();
        var check2= $('#iCheck input[name="runRule"]:checked').val();
        // var check3= $('#iCheck input[name="alInform"]:checked').val();
        var type1;
        var type2;
        // alert(radio);


        if(radio=="项目部通知"){
            type1 ="1";
        }
        else if(radio=="类型通知"){
            type1 ="2";
        }






        var check;
        if(check1 =="1"&&check2!="2"){
            check = "1";
        }
        else if(check1 !="1"&&check2=="2"){
            check = "2";
        }
        else if(check1 =="1"&&check2=="2"){
            check = "3";
        }
        // else if(check1 =="1"&&check2=="2"&&check3!="3"){
        //     check = "4";
        // }
        // else if(check1 !="1"&&check2=="2"&&check3=="3"){
        //     check = "5";
        // }
        // else if(check1 =="1"&&check2!="2"&&check3=="3"){
        //     check = "6";
        // }
        // else if(check1 =="1"&&check2=="2"&&check3=="3"){
        //     check = "7";
        // }
        else{
            check = "";
        }


        //
        if(check!=""){
            type2=check;
        }
        else {
            type2=select;
        }


        // alert(check);
        // alert(type1);
        // alert(type2);
        // alert(check1);
        // alert(check2);
        // alert(check3);


        // alert(select);


        if (title == "") {
            text += "标题不能为空;";
        }
        if (content == "") {
            text += "内容不能为空;";
        }

        if (radio != "项目部通知"&& radio !="类型通知") {
            text += "请选择通知属性;";
        }
        if (radio =="项目部通知"&& select!="4"&& select!="1"&& select!="2"&& select!="3"){
            text += "请选择所属项目部;"
        }
        if (radio =="类型通知"&& check1!="1" &&check2!="2"){
            text += "请选择所属类型;"
        }


        if (text == "") {
            $.ajaxFileUpload({
                url: "/addInf",//请求地址
                datatype: "json",//数据格式
                fileElementId: "files",
                data: {
                    "content": content,
                    "title": title,
                    "type1":type1,
                    "type2":type2,
                },
                type: "post",//请求方式
                async: false,//是否异步请求
                success: function (data, status) {
                    if (typeof (data.error) != 'undefined') {
                        if (data.error != '') {
                            alert(data.error);
                        } else {
                            alert(data.msg);
                        }
                    }
                    alert("添加成功");
                    parent.layer.closeAll();
                    parent.loodtable();
                },
                error: function (data, status, e) {
                    alert(e);
                }
            })
        } else {
            alert(text);
        }
    }


    function updateinf() {
        var id = $('#uid').val();
        var title = $('#uTitle').val();
        var content = $('#uContent').val();
        var text = '';

        var radio= $('#uRadio input[name="uProperty"]:checked').val();
        var select= $('#uSelect select[name="department"]').val();
        var check1= $('#uCheck input[name="compSystem"]:checked').val();
        var check2= $('#uCheck input[name="runRule"]:checked').val();
        // var check3= $('#iCheck input[name="alInform"]:checked').val();
        var type1;
        var type2;
        // alert(radio);


        if(radio=="项目部通知"){
            type1 ="1";
        }
        else if(radio=="类型通知"){
            type1 ="2";
        }






        var check;
        if(check1 =="1"&&check2!="2"){
            check = "1";
        }
        else if(check1 !="1"&&check2=="2"){
            check = "2";
        }
        else if(check1 =="1"&&check2=="2"){
            check = "3";
        }
        // else if(check1 =="1"&&check2=="2"&&check3!="3"){
        //     check = "4";
        // }
        // else if(check1 !="1"&&check2=="2"&&check3=="3"){
        //     check = "5";
        // }
        // else if(check1 =="1"&&check2!="2"&&check3=="3"){
        //     check = "6";
        // }
        // else if(check1 =="1"&&check2=="2"&&check3=="3"){
        //     check = "7";
        // }
        else{
            check = "";
        }


        //
        if(check!=""){
            type2=check;
        }
        else {
            type2=select;
        }



        if (title == "") {
            text += "标题不能为空";
        }
        if (content == "") {
            text += "内容不能为空";
        }
        if (radio != "项目部通知"&& radio !="类型通知") {
            text += "请选择通知属性;";
        }
        if (radio =="项目部通知"&& select!="4"&& select!="1"&& select!="2"&& select!="3"){
            text += "请选择所属项目部;"
        }
        if (radio =="类型通知"&& check1!="1" &&check2!="2"){
            text += "请选择所属类型;"
        }
        if (text == '') {
            $.ajaxFileUpload({
                url: "/updateInf",//请求地址
                datatype: "json",//数据格式
                fileElementId: "ufiles",
                data: {
                    "id": id,
                    "content": content,
                    "title": title,
                    "type1":type1,
                    "type2":type2
                },
                type: "post",//请求方式
                async: false,//是否异步请求
                success: function (data, status) {
                    if (typeof (data.error) != 'undefined') {
                        if (data.error != '') {
                            alert(data.error);
                        } else {
                            alert(data.msg);
                        }
                    }
                    alert("修改成功");
                    document.getElementById('updateinform').style.display = 'none';
                    loodtable();
                    $("#ufiles").val('');
                },
                error: function (data, status, e) {
                    alert(e);
                }
            })
        } else {
            alert(text);
        }
    }

//``````````````````````````````````````````ok

    return {
        deleteinf: deleteinf,
        updateinf: updateinf,
        insertinf: insertinf,
    }


}(jQuery))

function userDefinedType() {
    document.getElementById("white_content1-labor-2").style.display="block";
    document.getElementById("banner-2").style.display="block";

}

function closeBannerType() {
    document.getElementById("white_content1-labor-2").style.display="none";
    document.getElementById("banner-2").style.display="none";
}

//显示通知列表
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
                    , url: '/findInf?dim=' + dim +'&userName=' + userName + '&type2=' + projectType
                    , cols: [[
                        {field: 'zizeng', width: 95, title: '序号', templet: '#zizeng'}
                        ,{field: 'type1', align: 'left', width: 100, title: '通知类型'}
                        ,{field: 'type2', align: 'left', width: 100, title: '详细划分'}
                        ,{field:'title',align:'left', width:200, title: '标题'}
                        ,{field:'content',align:'left', width:400, title: '内容'}
                        , {field: 'time', width: 134, title: '时间', sort: true}
                        , {fixed: 'right', title: '详情', toolbar: '#barDemo', width: 250}
                    ]],
                    width: 1287,
                    done:function type (res,curr,count) {
                        // $("[data-field='rdStatus']").children().each(function(){
                        //     if($(this).text()==='1'){
                        //         $(this).text("已读")
                        //     }else if($(this).text()==='状态'){
                        //         $(this).text("状态")
                        //     }else if($(this).text()==='已读'){
                        //         $(this).text("已读")
                        //     } else {
                        //         $(this).text("未读")
                        //     }
                        // });

                        $("[data-field='type1']").children().each(function(){
                            if($(this).text()==='通知类型'){
                                $(this).text("通知类型")
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
                // form.on('sort(demo)',function(obj){
                //     table.reload('demo', {
                //         initSort: obj //记录初始排序，如果不设的话，将无法标记表头的排序状态。 layui 2.1.1 新增参数
                //         ,where: { //请求参数（注意：这里面的参数可任意定义，并非下面固定的格式）
                //             field: obj.time //排序字段
                //             // ,order: obj.type //排序方式
                //         }
                //     });
                //     demo.config.done();
                //     form.render();});

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

                table.on('tool(demo)', function (obj) {
                    var data = obj.data;
                    if (obj.event === 'detail') {
                        if (data.filedir != null & data.filedir != '') {
                            var dir = data.filedir;
                            console.log(dir);
                            var index1 = dir.slice(dir.lastIndexOf(".")+1) ;
                            console.log(index1);
                            if (index1 == "html") {
                                var fileName=data.filedir.slice(7);
                                window.open("/my/"+fileName)  ;
                            } else {
                                window.location.href = "/download?id=" + data.id;
                            }
                        } else {
                            $.messager.alert("提示","无文件");
                        }

                    } else if (obj.event === 'edit') {
                        $("#uid").val(data.id);
                        $("#uTitle").val(data.title);
                        $("#uContent").val(data.content);
                        $("#uRadio").val(data.type1);
                        // $("#uContent").val(data.content);
                        // $("#uContent").val(data.content);
                        var type1= data.type1;
                        var type2= data.type2;
                        if (type1 == "1") {
                            console.log($('#xmb'));
                            $('#xmb').prop("checked",true);
                            $(".uSelect").show();
                            $(".uCheck").hide();
                            if(type2 == "1"){
                                $('#1').prop("selected",true);
                            }
                            else if(type2 == "2"){
                                $('#2').prop("selected",true);
                            }else if(type2 == "3"){
                                $('#3').prop("selected",true);
                            }else if(type2 == "4"){
                                $('#4').prop("selected",true);
                            }
                            layui.form.render();
                        }else if(type1 == "2"){
                            $('#lx').prop("checked",true);
                            $(".uSelect").hide();
                            $(".uCheck").show();
                            if(type2 == "1"){
                                $("input:checkbox[name='compSystem']").prop("checked",true);
                            }
                            else if(type2 == "2"){
                                $("input:checkbox[name='runRule']").prop("checked",true);
                            }
                            else if(type2 == "3"){
                                $("input:checkbox[name='compSystem']").prop("checked",true);
                                $("input:checkbox[name='runRule']").prop("checked",true);
                            }
                            layui.form.render();
                        }

                        layui.use('form', function(){
                            var form = layui.form;

                            form.render();

                            form.on('radio(inf)',function(data){
                                    var val=data.value;
                                    if ($('#uRadio input[name="uProperty"]:checked ').val() == "项目部通知") {
                                        $(".uSelect").show();
                                        $(".uCheck").hide();
                                        $('#uCheck input[name="compSystem"]').prop("checked",false);
                                        $('#uCheck input[name="runRule"]').prop("checked",false);
                                        // $('#iCheck input[name="alInform"]').prop("checked",false);
                                        form.render();
                                        // var check1= $('#iCheck input[name="alInform"]:checked').val();
                                        // alert(check1);

                                    }
                                    else {
                                        $(".uSelect").hide();

                                        $('#uCheck input[name="compSystem"]').prop("checked",true);
                                        $('#uCheck input[name="runRule"]').prop("checked",true);
                                        // $('#iCheck input[name="alInform"]').prop("checked",true);

                                        $(".uCheck").show();

                                        form.render();
                                    }
                                }

                            );
                            form.on('select(required)',function(data){
                                var val=data.value;
                                form.render();
                            });
                            form.on('checkbox(check)',function(data){
                                var val=data.value;
                                form.render();
                            });
                            form.render();
                        });

                        if (data.fileName != null) $("#nfile").val(data.fileName);
                        document.getElementById('updateinform').style.display = 'block';
                    } else if (obj.event === 'del') {
                        let r = confirm("确定要删除吗");
                        if(r==true) infObj.deleteinf(data.id);
                    } else if (obj.event === 'selSeen') {//已查看人员清单
                        var _id=data.id;
                        $.ajax({
                            url: '/selSeen',
                            type: 'GET',
                            dataType: 'json',
                            async: false,
                            data:{'informId':_id},
                            success: function (data) {
                                var html="<tr>";
                                for (var i=0;i<data.length;i++){
                                    if(i%5==0){
                                        html=html+"</tr><tr><td style='margin: 2px'>"+data[i]+"</td>";
                                    }else{
                                        html=html+"<td style='margin: 2px'>"+data[i]+"</td>";
                                    }

                                }
                                html=html+"</tr>";
                                $("#seenPeople").html(html);
                                addDataWin=$('#Seen').window({
                                    title:'已查看人员清单',
                                    height: 500,
                                    width: 420,
                                    closed: true,
                                    minimizable:false,
                                    maximizable:false,
                                    collapsible:false,
                                    cache:false,
                                    shadow:false
                                });
                                addDataWin.window('open');
                            },
                        });
                    }
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
function closeSeen(addDataWin){
    addDataWin.window('close');
}
function additable() {
    layui.use('layer', function () { //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
        //触发事件
        var active = {
            // notice: function(){
            //     //示范一个公告层
            //     layer.open({
            //         type: 1
            //         ,title: false //不显示标题栏
            //         ,closeBtn: false
            //         ,area: '300px;'
            //         ,shade: 0.8
            //         ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
            //         ,btn: ['火速围观', '残忍拒绝']
            //         ,btnAlign: 'c'
            //         ,moveType: 1 //拖拽模式，0或者1
            //         ,content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">你知道吗？亲！<br>layer ≠ layui<br><br>layer只是作为Layui的一个弹层模块，由于其用户基数较大，所以常常会有人以为layui是layerui<br><br>layer虽然已被 Layui 收编为内置的弹层模块，但仍然会作为一个独立组件全力维护、升级。<br><br>我们此后的征途是星辰大海 ^_^</div>'
            //         ,success: function(layero){
            //             var btn = layero.find('.layui-layer-btn');
            //             btn.find('.layui-layer-btn0').attr({
            //                 href: 'http://www.layui.com/'
            //                 ,target: '_blank'
            //             });
            //         }
            //     });
            // }
            // ,
            offset: function (othis) {
                var type = othis.data('type')
                    , text = othis.text();
                layer.open({
                    type: 2
                    , title: '添加信息'
                    , offset: type //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
                    , id: 'layerDemo' + type //防止重复弹出
                    , area: ['630px', '430px']
                    , content: '/addinfshow'
                });
            }
        };
        $('#layerDemo .layui-btn').on('click', function () {
            var othis = $(this), method = othis.data('method');
            active[method] ? active[method].call(this, othis) : '';
        });

    });
}
// function userDefined() {
//     layui.use('layer', function () { //独立版的layer无需执行这一句
//         var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
//         //触发事件
//         var active = {
//             notice: function(){
//             //示范一个公告层
//             layer.open({
//                 type: 1
//                 ,title: false //不显示标题栏
//                 ,closeBtn: false
//                 ,area: '300px;'
//                 ,shade: 0.8
//                 ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
//                 ,btn: ['火速围观', '残忍拒绝']
//                 ,btnAlign: 'c'
//                 ,moveType: 1 //拖拽模式，0或者1
//                 ,content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">你知道吗？亲！<br>layer ≠ layui<br><br>layer只是作为Layui的一个弹层模块，由于其用户基数较大，所以常常会有人以为layui是layerui<br><br>layer虽然已被 Layui 收编为内置的弹层模块，但仍然会作为一个独立组件全力维护、升级。<br><br>我们此后的征途是星辰大海 ^_^</div>'
//                 ,success: function(layero){
//                     var btn = layero.find('.layui-layer-btn');
//                     btn.find('.layui-layer-btn0').attr({
//                         href: 'http://www.layui.com/'
//                         ,target: '_blank'
//                     });
//                 }
//             });
//         }
//             // notice: function (othis) {
//             //     var type = othis.data('type')
//             //         , text = othis.text();
//             //     layer.open({
//             //         type: 2
//             //         , title: '添加信息'
//             //         , offset: type //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
//             //         , id: 'layerDemo' + type //防止重复弹出
//             //         , area: ['630px', '430px']
//             //         , content: '/addinfshow'
//             //     });
//             // }
//         };
//         $('#layerDemo .layui-btn').on('click', function () {
//             var othis = $(this), method = othis.data('method');
//             active[method] ? active[method].call(this, othis) : '';
//         });
//
//     });
// }
