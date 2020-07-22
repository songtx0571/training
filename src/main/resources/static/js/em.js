var emObj = (function (jQuery) {
    var temp;//员工
    var PeAcc;//业绩考核
    var Pesize = 0;
    var currentPage = 1;//当前页码
    var total;//总页数
    var amount=0;
    var scoreamount=0;
    // var columnNames = ['userName', 'name','departmentName', 'post',  'idnumber',  'phone','closhe', 'hat','projectId', 'post', 'state','manager','roleId','address','emergency','emergencyTel','education','credentials1', 'credentials2', 'credentials3','bank','card',  'laowupaiqian',
    //      'wages', 'basicwages', 'meritpay', 'remark','other'];
    var columnNames = ['userName', 'name','departmentName', 'post', ];

    function selectBy() {
        var qUserName = $("#qUserName").val();
        var qName = $("#qName").val();
        var qDepartment = $("#qDepartment").val();

        if (qUserName == "" && qName == "" && qDepartment == 0) {
            alert("请输入查询条件");
        } else {

            $('#bottomTab').css('display','');
            $('#bottom').css('display','none');
            $('#bottomB').css('display','none');

            //{"UserName": qUserName, "Name": qName, "Department": qDepartment},
            // $.ajax({
            //     url: "/findBy",//请求地址
            //     datatype: "json",//数据格式
            //     data: {"UserName": qUserName, "Name": qName, "Department": qDepartment},
            //     type: "post",//请求方式
            //     success: function (data) {   //如何发送成功
            //         temp = data;
            //         var html = '';
            //         for (var i = 0; i < temp.length; i++) {    //遍历data数组
            //             var emp = temp[i];
            //             html += "<tr>" +
            //
            //                 "<td><a  style='cursor:pointer; ' onclick=\"document.getElementById('updateinformation').style.display='block';emObj.showupdate(" + i + ")\"><img height='22px' src='img/update.png'></a></td>";
            //             for (var j = 0; j < columnNames.length; j++) {
            //                 if (j == 1) {
            //                     html += '<td><a  style="cursor:pointer;"  onclick="emObj.showemy(' + i + ');emObj.showemx(' + i + ');additable();" >' + emp[columnNames[j]] + '</a></td>'
            //                 }
            //
            //                 else if(j==8){
            //                     var project=emp[columnNames[j]];
            //                     console.log(project);
            //                     html += '<td>'
            //                     if(project.includes("1")){
            //                         html += '嘉爱斯运维、'
            //                     }if(project.includes("2")){
            //                         html += '泰爱斯运维、'
            //                     }if(project.includes("3")){
            //                         html += '浦江运维、'
            //                     }if(project.includes("4")){
            //                         html += '临江检修、'
            //                     }
            //                     html += '</td>'
            //
            //                 }
            //                 else if(j==10){
            //             		var  state = emp[columnNames[j]];
            //
            //             		if(state==0){
            //             			html += '<td>离职</td>';
            //             		}else{
            //             			html += '<td>在职</td>';
            //             		}
            //             	}
            //                 else if(j==12){
            //                     var roleId = emp[columnNames[j]];
            //                     if(roleId==1){
            //                         html += '<td>项目经理</td>'
            //                     }else if(roleId==2){
            //                         html += '<td>运行专工</td>'
            //                     }else if(roleId==3){
            //                         html += '<td>检修专工</td>'
            //                     }else if(roleId==4){
            //                         html += '<td>运行班长</td>'
            //                     }else if(roleId==5){
            //                         html += '<td>检修班长</td>'
            //                     }else if(roleId==6){
            //                         html += '<td>运行员工</td>'
            //                     }else if(roleId==7){
            //                         html += '<td>检修员工</td>'
            //                     }else if(roleId==8){
            //                         html += '<td>监视人员（甲方）</td>'
            //                     }else if(roleId==11){
            //                         html += '<td>测试专用</td>'
            //                     }else if(roleId==12){
            //                         html += '<td>管理员</td>'
            //                     }else if(roleId==13){
            //                         html += '<td>考试管理员+ 项目经理</td>'
            //                     }else if(roleId==14){
            //                         html += '<td>不设检修专工的项目</td>'
            //                     }else if(roleId==15){
            //                         html += '<td>综合管理</td>'
            //                     }
            //                 }
            //                 else {
            //                     html += '<td>' + emp[columnNames[j]] + '</td>';
            //
            //                 }
            //
            //             }
            //             html += "<td><a  style='text-decoration:underline;cursor:pointer; ' onclick='emObj.deleteemployee(\"" + emp.userid + "\"\,\"" + emp.userName + "\")'><img height='22px' src='img/delete.png'></a></td>" +
            //                 "<td><a  style='text-decoration:underline;cursor:pointer; ' onclick='emObj.reset(" + emp.userid + ")'><img height='22px' src='img/resetPwd.png'></a></td>" +
            //                 "</tr>";
            //         }
            //
            //
            //         $("#ulul").html(html);
            //         $('#currentPage').val(currentPage);
            //         $('#totalye').val(total);
            //         emObj.setColor();
            //         if (currentPage == 1) {
            //             document.getElementById('shangyiye').style.display = 'none';
            //         } else {
            //             document.getElementById('shangyiye').style.display = '';
            //         }
            //         if (currentPage == total) {
            //             document.getElementById('xiayiye').style.display = 'none';
            //         } else {
            //             document.getElementById('xiayiye').style.display = '';
            //         }
            //     },
            // })
            layui.use('table', function () {
                var table = layui.table;
                table.render({
                    elem:'#LayuiTable1'
                    ,url:'/findAllinformBy?UserName='+qUserName+'&Name='+qName+'&Department='+qDepartment
                    ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
                    ,defaultToolbar: [
                        // 'filter',
                        'exports', 'print'
                        //     , { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
                        //     title: '提示'
                        //     ,layEvent: 'LAYTABLE_TIPS'
                        //     ,icon: 'layui-icon-tips'
                        // }
                    ]
                    // ['userName', 'name','departmentName', 'post',  'idnumber',  'phone','closhe', 'hat',
                    // 'projectId', 'post', 'state','manager','roleId','address','emergency','emergencyTel','education','credentials1',
                    // 'credentials2', 'credentials3','bank','card',  'laowupaiqian',
                    //       'wages', 'basicwages', 'meritpay', 'remark','other'];
                    , cols: [
                        [
                            {rowspan:3,field: 'zizengL1', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengL1'},
                            {colspan:4,title:'基本信息'},
                            {colspan:4,title:'扩展信息',id:'kuozhan'},
                            {colspan:5,title:'权限信息',id:'quanxian'},
                            {colspan:3,title:'家庭信息',id:'jiating'},
                            {colspan:4,title:'技能信息',id:'jineng'},
                            {colspan:9,title:'工资信息',id:'gongzi'}
                        ],
                        [
                            {rowspan:2,title:'员工编号',field:'userName'},
                            {rowspan:2,title:'姓名',field:'name'},
                            {rowspan:2,title:'部门',field:'departmentName'},
                            {rowspan:2,title:'岗位',field:'post'},
                            {rowspan:2,title:'身份证号',field:'idnumber',id:'idnumber',hide:true},
                            {rowspan:2,title:'联系方式',field:'phone',id:'phone',hide:true},
                            {rowspan:2,title:'工作服尺寸',field:'closhe',id:'closhe',hide:true},
                            {rowspan:2,title:'安全帽编号',field:'hat',id:'hat',hide:true},
                            {rowspan:2,title:'项目组',field:'projectId',id:'projectId',hide:true},
                            {rowspan:2,title:'岗位',field:'post',id:'post',hide:true},
                            {rowspan:2,title:'在职状态',field:'state',id:'state',hide:true},
                            {rowspan:2,title:'绩效管理人',field:'manager',id:'manager',hide:true},
                            {rowspan:2,title:'角色',field:'roleId',id:'roleId',hide:true},
                            {rowspan:2,title:'家庭住址',field:'address',id:'address',hide:true},
                            {rowspan:2,title:'应急联系人',field:'emergency',id:'emergency',hide:true},
                            {rowspan:2,title:'应急电话',field:'emergencyTel',id:'emergencyTel',hide:true},
                            {rowspan:2,title:'学历',field:'education',id:'education',hide:true},
                            {rowspan:2,title:'证书1',field:'credentials1',id:'credentials1',hide:true},
                            {rowspan:2,title:'证书2',field:'credentials2',id:'credentials2',hide:true},
                            {rowspan:2,title:'证书3',field:'credentials3',id:'credentials3',hide:true},
                            {rowspan:2,title:'开户行',field:'bank',id:'bank',hide:true},
                            {rowspan:2,title:'工资卡号',field:'card',id:'card',hide:true},
                            {rowspan:2,title:'劳务派遣',field:'laowupaiqian',id:'laowupaiqian',hide:true},
                            {rowspan:2,title:'待遇标准',field:'wages',id:'wages',hide:true},
                            {rowspan:2,title:'基本工资',field:'basicwages',id:'basicwages',hide:true},
                            {rowspan:2,title:'绩效工资',field:'meritpay',id:'meritpay',hide:true},
                            {colspan:2,title:'变更记录',id:'bgjl',hide:true}
                        ],
                        [
                            {title:'入职信息',field:'remark',id:'remark',hide:true},
                            {title:'其他',field:'other',id:'other',hide:true}
                        ]
                    ]
                    // , cols: [[
                    //     {field: 'zizengL', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengL'}
                    //     , {field: 'people', align: 'left', width: 190, title: '员工姓名'}
                    //     , {field: 'workingHours', align: 'left', width: 90, title: '工时数'}
                    //     , {field: 'content', align: 'left',title: '工作详情'}
                    // ]]
                    //
                    , page: true
                })
                table.render({
                    elem:'#LayuiTable2'
                    ,url:'/findAllinformBy?UserName='+qUserName+'&Name='+qName+'&Department='+qDepartment
                    ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
                    ,defaultToolbar: [
                        // 'filter',
                        'exports', 'print'
                        //     , { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
                        //     title: '提示'
                        //     ,layEvent: 'LAYTABLE_TIPS'
                        //     ,icon: 'layui-icon-tips'
                        // }
                    ]
                    // ['userName', 'name','departmentName', 'post',  'idnumber',  'phone','closhe', 'hat',
                    // 'projectId', 'post', 'state','manager','roleId','address','emergency','emergencyTel','education','credentials1',
                    // 'credentials2', 'credentials3','bank','card',  'laowupaiqian',
                    //       'wages', 'basicwages', 'meritpay', 'remark','other'];
                    , cols: [
                        [
                            {rowspan:3,field: 'zizengL2', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengL2'},
                            {colspan:4,title:'基本信息'},
                            {colspan:4,title:'扩展信息',id:'kuozhan'},
                            {colspan:5,title:'权限信息',id:'quanxian'},
                            {colspan:3,title:'家庭信息',id:'jiating'},
                            {colspan:4,title:'技能信息',id:'jineng'},
                            {colspan:9,title:'工资信息',id:'gongzi'}
                        ],
                        [
                            {rowspan:2,title:'员工编号',field:'userName'},
                            {rowspan:2,title:'姓名',field:'name'},
                            {rowspan:2,title:'部门',field:'departmentName'},
                            {rowspan:2,title:'岗位',field:'post'},
                            {rowspan:2,title:'身份证号',field:'idnumber',id:'idnumber'},
                            {rowspan:2,title:'联系方式',field:'phone',id:'phone'},
                            {rowspan:2,title:'工作服尺寸',field:'closhe',id:'closhe'},
                            {rowspan:2,title:'安全帽编号',field:'hat',id:'hat'},
                            {rowspan:2,title:'项目组',field:'projectId',id:'projectId',hide:true},
                            {rowspan:2,title:'岗位',field:'post',id:'post',hide:true},
                            {rowspan:2,title:'在职状态',field:'state',id:'state',hide:true},
                            {rowspan:2,title:'绩效管理人',field:'manager',id:'manager',hide:true},
                            {rowspan:2,title:'角色',field:'roleId',id:'roleId',hide:true},
                            {rowspan:2,title:'家庭住址',field:'address',id:'address',hide:true},
                            {rowspan:2,title:'应急联系人',field:'emergency',id:'emergency',hide:true},
                            {rowspan:2,title:'应急电话',field:'emergencyTel',id:'emergencyTel',hide:true},
                            {rowspan:2,title:'学历',field:'education',id:'education',hide:true},
                            {rowspan:2,title:'证书1',field:'credentials1',id:'credentials1',hide:true},
                            {rowspan:2,title:'证书2',field:'credentials2',id:'credentials2',hide:true},
                            {rowspan:2,title:'证书3',field:'credentials3',id:'credentials3',hide:true},
                            {rowspan:2,title:'开户行',field:'bank',id:'bank',hide:true},
                            {rowspan:2,title:'工资卡号',field:'card',id:'card',hide:true},
                            {rowspan:2,title:'劳务派遣',field:'laowupaiqian',id:'laowupaiqian',hide:true},
                            {rowspan:2,title:'待遇标准',field:'wages',id:'wages',hide:true},
                            {rowspan:2,title:'基本工资',field:'basicwages',id:'basicwages',hide:true},
                            {rowspan:2,title:'绩效工资',field:'meritpay',id:'meritpay',hide:true},
                            {colspan:2,title:'变更记录',id:'bgjl',hide:true}
                        ],
                        [
                            {title:'入职信息',field:'remark',id:'remark',hide:true},
                            {title:'其他',field:'other',id:'other',hide:true}
                        ]
                    ]
                    // , cols: [[
                    //     {field: 'zizengL', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengL'}
                    //     , {field: 'people', align: 'left', width: 190, title: '员工姓名'}
                    //     , {field: 'workingHours', align: 'left', width: 90, title: '工时数'}
                    //     , {field: 'content', align: 'left',title: '工作详情'}
                    // ]]
                    //
                    , page: true
                })
                table.render({
                    elem:'#LayuiTable3'
                    ,url:'/findAllinformBy?UserName='+qUserName+'&Name='+qName+'&Department='+qDepartment
                    ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
                    ,defaultToolbar: [
                        // 'filter',
                        'exports', 'print'
                        //     , { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
                        //     title: '提示'
                        //     ,layEvent: 'LAYTABLE_TIPS'
                        //     ,icon: 'layui-icon-tips'
                        // }
                    ]
                    // ['userName', 'name','departmentName', 'post',  'idnumber',  'phone','closhe', 'hat',
                    // 'projectId', 'post', 'state','manager','roleId','address','emergency','emergencyTel','education','credentials1',
                    // 'credentials2', 'credentials3','bank','card',  'laowupaiqian',
                    //       'wages', 'basicwages', 'meritpay', 'remark','other'];
                    , cols: [
                        [
                            {rowspan:3,field: 'zizengL3', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengL3'},
                            {colspan:4,title:'基本信息'},
                            {colspan:4,title:'扩展信息',id:'kuozhan'},
                            {colspan:5,title:'权限信息',id:'quanxian'},
                            {colspan:3,title:'家庭信息',id:'jiating'},
                            {colspan:4,title:'技能信息',id:'jineng'},
                            {colspan:9,title:'工资信息',id:'gongzi'}
                        ],
                        [
                            {rowspan:2,title:'员工编号',field:'userName'},
                            {rowspan:2,title:'姓名',field:'name'},
                            {rowspan:2,title:'部门',field:'departmentName'},
                            {rowspan:2,title:'岗位',field:'post'},
                            {rowspan:2,title:'身份证号',field:'idnumber',id:'idnumber',hide:true},
                            {rowspan:2,title:'联系方式',field:'phone',id:'phone',hide:true},
                            {rowspan:2,title:'工作服尺寸',field:'closhe',id:'closhe',hide:true},
                            {rowspan:2,title:'安全帽编号',field:'hat',id:'hat',hide:true},
                            {rowspan:2,title:'项目组',field:'projectId',id:'projectId'},
                            {rowspan:2,title:'岗位',field:'post',id:'post'},
                            {rowspan:2,title:'在职状态',field:'state',id:'state'},
                            {rowspan:2,title:'绩效管理人',field:'manager',id:'manager'},
                            {rowspan:2,title:'角色',field:'roleId',id:'roleId'},
                            {rowspan:2,title:'家庭住址',field:'address',id:'address',hide:true},
                            {rowspan:2,title:'应急联系人',field:'emergency',id:'emergency',hide:true},
                            {rowspan:2,title:'应急电话',field:'emergencyTel',id:'emergencyTel',hide:true},
                            {rowspan:2,title:'学历',field:'education',id:'education',hide:true},
                            {rowspan:2,title:'证书1',field:'credentials1',id:'credentials1',hide:true},
                            {rowspan:2,title:'证书2',field:'credentials2',id:'credentials2',hide:true},
                            {rowspan:2,title:'证书3',field:'credentials3',id:'credentials3',hide:true},
                            {rowspan:2,title:'开户行',field:'bank',id:'bank',hide:true},
                            {rowspan:2,title:'工资卡号',field:'card',id:'card',hide:true},
                            {rowspan:2,title:'劳务派遣',field:'laowupaiqian',id:'laowupaiqian',hide:true},
                            {rowspan:2,title:'待遇标准',field:'wages',id:'wages',hide:true},
                            {rowspan:2,title:'基本工资',field:'basicwages',id:'basicwages',hide:true},
                            {rowspan:2,title:'绩效工资',field:'meritpay',id:'meritpay',hide:true},
                            {colspan:2,title:'变更记录',id:'bgjl',hide:true}
                        ],
                        [
                            {title:'入职信息',field:'remark',id:'remark',hide:true},
                            {title:'其他',field:'other',id:'other',hide:true}
                        ]
                    ]
                    // , cols: [[
                    //     {field: 'zizengL', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengL'}
                    //     , {field: 'people', align: 'left', width: 190, title: '员工姓名'}
                    //     , {field: 'workingHours', align: 'left', width: 90, title: '工时数'}
                    //     , {field: 'content', align: 'left',title: '工作详情'}
                    // ]]
                    //
                    , page: true
                })
                table.render({
                    elem:'#LayuiTable4'
                    ,url:'/findAllinformBy?UserName='+qUserName+'&Name='+qName+'&Department='+qDepartment
                    ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
                    ,defaultToolbar: [
                        // 'filter',
                        'exports', 'print'
                        //     , { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
                        //     title: '提示'
                        //     ,layEvent: 'LAYTABLE_TIPS'
                        //     ,icon: 'layui-icon-tips'
                        // }
                    ]
                    // ['userName', 'name','departmentName', 'post',  'idnumber',  'phone','closhe', 'hat',
                    // 'projectId', 'post', 'state','manager','roleId','address','emergency','emergencyTel','education','credentials1',
                    // 'credentials2', 'credentials3','bank','card',  'laowupaiqian',
                    //       'wages', 'basicwages', 'meritpay', 'remark','other'];
                    , cols: [
                        [
                            {rowspan:3,field: 'zizengL4', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengL4'},
                            {colspan:4,title:'基本信息'},
                            {colspan:4,title:'扩展信息',id:'kuozhan'},
                            {colspan:5,title:'权限信息',id:'quanxian'},
                            {colspan:3,title:'家庭信息',id:'jiating'},
                            {colspan:4,title:'技能信息',id:'jineng'},
                            {colspan:9,title:'工资信息',id:'gongzi'}
                        ],
                        [
                            {rowspan:2,title:'员工编号',field:'userName'},
                            {rowspan:2,title:'姓名',field:'name'},
                            {rowspan:2,title:'部门',field:'departmentName'},
                            {rowspan:2,title:'岗位',field:'post'},
                            {rowspan:2,title:'身份证号',field:'idnumber',id:'idnumber',hide:true},
                            {rowspan:2,title:'联系方式',field:'phone',id:'phone',hide:true},
                            {rowspan:2,title:'工作服尺寸',field:'closhe',id:'closhe',hide:true},
                            {rowspan:2,title:'安全帽编号',field:'hat',id:'hat',hide:true},
                            {rowspan:2,title:'项目组',field:'projectId',id:'projectId',hide:true},
                            {rowspan:2,title:'岗位',field:'post',id:'post',hide:true},
                            {rowspan:2,title:'在职状态',field:'state',id:'state',hide:true},
                            {rowspan:2,title:'绩效管理人',field:'manager',id:'manager',hide:true},
                            {rowspan:2,title:'角色',field:'roleId',id:'roleId',hide:true},
                            {rowspan:2,title:'家庭住址',field:'address',id:'address'},
                            {rowspan:2,title:'应急联系人',field:'emergency',id:'emergency'},
                            {rowspan:2,title:'应急电话',field:'emergencyTel',id:'emergencyTel'},
                            {rowspan:2,title:'学历',field:'education',id:'education',hide:true},
                            {rowspan:2,title:'证书1',field:'credentials1',id:'credentials1',hide:true},
                            {rowspan:2,title:'证书2',field:'credentials2',id:'credentials2',hide:true},
                            {rowspan:2,title:'证书3',field:'credentials3',id:'credentials3',hide:true},
                            {rowspan:2,title:'开户行',field:'bank',id:'bank',hide:true},
                            {rowspan:2,title:'工资卡号',field:'card',id:'card',hide:true},
                            {rowspan:2,title:'劳务派遣',field:'laowupaiqian',id:'laowupaiqian',hide:true},
                            {rowspan:2,title:'待遇标准',field:'wages',id:'wages',hide:true},
                            {rowspan:2,title:'基本工资',field:'basicwages',id:'basicwages',hide:true},
                            {rowspan:2,title:'绩效工资',field:'meritpay',id:'meritpay',hide:true},
                            {colspan:2,title:'变更记录',id:'bgjl',hide:true}
                        ],
                        [
                            {title:'入职信息',field:'remark',id:'remark',hide:true},
                            {title:'其他',field:'other',id:'other',hide:true}
                        ]
                    ]
                    // , cols: [[
                    //     {field: 'zizengL', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengL'}
                    //     , {field: 'people', align: 'left', width: 190, title: '员工姓名'}
                    //     , {field: 'workingHours', align: 'left', width: 90, title: '工时数'}
                    //     , {field: 'content', align: 'left',title: '工作详情'}
                    // ]]
                    //
                    , page: true
                })
                table.render({
                    elem:'#LayuiTable5'
                    ,url:'/findAllinformBy?UserName='+qUserName+'&Name='+qName+'&Department='+qDepartment
                    ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
                    ,defaultToolbar: [
                        // 'filter',
                        'exports', 'print'
                        //     , { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
                        //     title: '提示'
                        //     ,layEvent: 'LAYTABLE_TIPS'
                        //     ,icon: 'layui-icon-tips'
                        // }
                    ]
                    // ['userName', 'name','departmentName', 'post',  'idnumber',  'phone','closhe', 'hat',
                    // 'projectId', 'post', 'state','manager','roleId','address','emergency','emergencyTel','education','credentials1',
                    // 'credentials2', 'credentials3','bank','card',  'laowupaiqian',
                    //       'wages', 'basicwages', 'meritpay', 'remark','other'];
                    , cols: [
                        [
                            {rowspan:3,field: 'zizengL5', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengL5'},
                            {colspan:4,title:'基本信息'},
                            {colspan:4,title:'扩展信息',id:'kuozhan'},
                            {colspan:5,title:'权限信息',id:'quanxian'},
                            {colspan:3,title:'家庭信息',id:'jiating'},
                            {colspan:4,title:'技能信息',id:'jineng'},
                            {colspan:9,title:'工资信息',id:'gongzi'}
                        ],
                        [
                            {rowspan:2,title:'员工编号',field:'userName'},
                            {rowspan:2,title:'姓名',field:'name'},
                            {rowspan:2,title:'部门',field:'departmentName'},
                            {rowspan:2,title:'岗位',field:'post'},
                            {rowspan:2,title:'身份证号',field:'idnumber',id:'idnumber',hide:true},
                            {rowspan:2,title:'联系方式',field:'phone',id:'phone',hide:true},
                            {rowspan:2,title:'工作服尺寸',field:'closhe',id:'closhe',hide:true},
                            {rowspan:2,title:'安全帽编号',field:'hat',id:'hat',hide:true},
                            {rowspan:2,title:'项目组',field:'projectId',id:'projectId',hide:true},
                            {rowspan:2,title:'岗位',field:'post',id:'post',hide:true},
                            {rowspan:2,title:'在职状态',field:'state',id:'state',hide:true},
                            {rowspan:2,title:'绩效管理人',field:'manager',id:'manager',hide:true},
                            {rowspan:2,title:'角色',field:'roleId',id:'roleId',hide:true},
                            {rowspan:2,title:'家庭住址',field:'address',id:'address',hide:true},
                            {rowspan:2,title:'应急联系人',field:'emergency',id:'emergency',hide:true},
                            {rowspan:2,title:'应急电话',field:'emergencyTel',id:'emergencyTel',hide:true},
                            {rowspan:2,title:'学历',field:'education',id:'education'},
                            {rowspan:2,title:'证书1',field:'credentials1',id:'credentials1'},
                            {rowspan:2,title:'证书2',field:'credentials2',id:'credentials2'},
                            {rowspan:2,title:'证书3',field:'credentials3',id:'credentials3'},
                            {rowspan:2,title:'开户行',field:'bank',id:'bank',hide:true},
                            {rowspan:2,title:'工资卡号',field:'card',id:'card',hide:true},
                            {rowspan:2,title:'劳务派遣',field:'laowupaiqian',id:'laowupaiqian',hide:true},
                            {rowspan:2,title:'待遇标准',field:'wages',id:'wages',hide:true},
                            {rowspan:2,title:'基本工资',field:'basicwages',id:'basicwages',hide:true},
                            {rowspan:2,title:'绩效工资',field:'meritpay',id:'meritpay',hide:true},
                            {colspan:2,title:'变更记录',id:'bgjl',hide:true}
                        ],
                        [
                            {title:'入职信息',field:'remark',id:'remark',hide:true},
                            {title:'其他',field:'other',id:'other',hide:true}
                        ]
                    ]
                    // , cols: [[
                    //     {field: 'zizengL', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengL'}
                    //     , {field: 'people', align: 'left', width: 190, title: '员工姓名'}
                    //     , {field: 'workingHours', align: 'left', width: 90, title: '工时数'}
                    //     , {field: 'content', align: 'left',title: '工作详情'}
                    // ]]
                    //
                    , page: true
                })
                table.render({
                    elem:'#LayuiTable6'
                    ,url:'/findAllinformBy?UserName='+qUserName+'&Name='+qName+'&Department='+qDepartment
                    ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
                    ,defaultToolbar: [
                        // 'filter',
                        'exports', 'print'
                        //     , { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
                        //     title: '提示'
                        //     ,layEvent: 'LAYTABLE_TIPS'
                        //     ,icon: 'layui-icon-tips'
                        // }
                    ]
                    // ['userName', 'name','departmentName', 'post',  'idnumber',  'phone','closhe', 'hat',
                    // 'projectId', 'post', 'state','manager','roleId','address','emergency','emergencyTel','education','credentials1',
                    // 'credentials2', 'credentials3','bank','card',  'laowupaiqian',
                    //       'wages', 'basicwages', 'meritpay', 'remark','other'];
                    , cols: [
                        [
                            {rowspan:3,field: 'zizengL6', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengL6'},
                            {colspan:4,title:'基本信息'},
                            {colspan:4,title:'扩展信息',id:'kuozhan'},
                            {colspan:5,title:'权限信息',id:'quanxian'},
                            {colspan:3,title:'家庭信息',id:'jiating'},
                            {colspan:4,title:'技能信息',id:'jineng'},
                            {colspan:9,title:'工资信息',id:'gongzi'}
                        ],
                        [
                            {rowspan:2,title:'员工编号',field:'userName'},
                            {rowspan:2,title:'姓名',field:'name'},
                            {rowspan:2,title:'部门',field:'departmentName'},
                            {rowspan:2,title:'岗位',field:'post'},
                            {rowspan:2,title:'身份证号',field:'idnumber',id:'idnumber',hide:true},
                            {rowspan:2,title:'联系方式',field:'phone',id:'phone',hide:true},
                            {rowspan:2,title:'工作服尺寸',field:'closhe',id:'closhe',hide:true},
                            {rowspan:2,title:'安全帽编号',field:'hat',id:'hat',hide:true},
                            {rowspan:2,title:'项目组',field:'projectId',id:'projectId',hide:true},
                            {rowspan:2,title:'岗位',field:'post',id:'post',hide:true},
                            {rowspan:2,title:'在职状态',field:'state',id:'state',hide:true},
                            {rowspan:2,title:'绩效管理人',field:'manager',id:'manager',hide:true},
                            {rowspan:2,title:'角色',field:'roleId',id:'roleId',hide:true},
                            {rowspan:2,title:'家庭住址',field:'address',id:'address',hide:true},
                            {rowspan:2,title:'应急联系人',field:'emergency',id:'emergency',hide:true},
                            {rowspan:2,title:'应急电话',field:'emergencyTel',id:'emergencyTel',hide:true},
                            {rowspan:2,title:'学历',field:'education',id:'education',hide:true},
                            {rowspan:2,title:'证书1',field:'credentials1',id:'credentials1',hide:true},
                            {rowspan:2,title:'证书2',field:'credentials2',id:'credentials2',hide:true},
                            {rowspan:2,title:'证书3',field:'credentials3',id:'credentials3',hide:true},
                            {rowspan:2,title:'开户行',field:'bank',id:'bank'},
                            {rowspan:2,title:'工资卡号',field:'card',id:'card'},
                            {rowspan:2,title:'劳务派遣',field:'laowupaiqian',id:'laowupaiqian'},
                            {rowspan:2,title:'待遇标准',field:'wages',id:'wages'},
                            {rowspan:2,title:'基本工资',field:'basicwages',id:'basicwages'},
                            {rowspan:2,title:'绩效工资',field:'meritpay',id:'meritpay'},
                            {colspan:2,title:'变更记录',id:'bgjl'}
                        ],
                        [
                            {title:'入职信息',field:'remark',id:'remark'},
                            {title:'其他',field:'other',id:'other'}
                        ]
                    ]
                    // , cols: [[
                    //     {field: 'zizengL', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengL'}
                    //     , {field: 'people', align: 'left', width: 190, title: '员工姓名'}
                    //     , {field: 'workingHours', align: 'left', width: 90, title: '工时数'}
                    //     , {field: 'content', align: 'left',title: '工作详情'}
                    // ]]
                    //
                    , page: true
                })
            })
        }

    }


    function manage() {
        getRole();
        getDepartment();
        $('#bottom').css('display','');
        $('#bottomB').css('display','');

        $('#bottomTab').css('display','none');


        $('#total1').css('display','none');
        $('#total2').css('display','none');
        $('#total3').css('display','none');
        $('#total4').css('display','none');
        $('#total5').css('display','none');

        $.ajax({
            url: "/findAll",//请求地址
            datatype: "json",//数据格式
            data: {"currentPage": currentPage},
            type: "post",//请求方式
            success: function (data) {   //如何发送成功
                temp = data["employee"];
                total = data["total"];
                var html = '';

                for (var i = 0; i < temp.length; i++) {    //遍历data数组
                    var emp = temp[i];
                    html += "<tr><td><a  style='cursor:pointer; ' onclick=\"document.getElementById('updateinformation').style.display='block';emObj.showupdate(" + i + ")\"><img height='22px' src='img/update.png'></a></td>";
                    for (var j = 0; j < columnNames.length; j++) {

                        if (j == 1) {
                            html += '<td><a  style="cursor:pointer;"  onclick="emObj.showemy(' + i + ');emObj.showemx(' + i + ');additable();" >' + emp[columnNames[j]] + '</a></td>'
                        }
                        else if(j==8){
                            var project=emp[columnNames[j]];
                            console.log(project);
                            html += '<td>'
                            if(project.includes("1")){
                                html += '嘉爱斯运维、'
                            }if(project.includes("2")){
                                html += '泰爱斯运维、'
                            }if(project.includes("3")){
                                html += '浦江运维、'
                            }if(project.includes("4")){
                                html += '临江检修、'
                            }
                            html += '</td>'

                        }else if(j==10){
                            var  state = emp[columnNames[j]];
                            if(state==0){
                                html += '<td>离职</td>';
                            }else{
                                html += '<td>在职</td>';
                            }
                        }
                        else if(j==12){
                            var roleId = emp[columnNames[j]];
                            if(roleId==1){
                                html += '<td>项目经理</td>'
                            }else if(roleId==2){
                                html += '<td>运行专工</td>'
                            }else if(roleId==3){
                                html += '<td>检修专工</td>'
                            }else if(roleId==4){
                                html += '<td>运行班长</td>'
                            }else if(roleId==5){
                                html += '<td>检修班长</td>'
                            }else if(roleId==6){
                                html += '<td>运行员工</td>'
                            }else if(roleId==7){
                                html += '<td>检修员工</td>'
                            }else if(roleId==8){
                                html += '<td>监视人员（甲方）</td>'
                            }else if(roleId==11){
                                html += '<td>测试专用</td>'
                            }else if(roleId==12){
                                html += '<td>管理员</td>'
                            }else if(roleId==13){
                                html += '<td>考试管理员+ 项目经理</td>'
                            }else if(roleId==14){
                                html += '<td>不设检修专工的项目</td>'
                            }else if(roleId==15){
                                html += '<td>综合管理</td>'
                            }
                        }
                        else {
                            html += '<td>' + emp[columnNames[j]] + '</td>';
                        }

                    }

                    (emp.userid,emp.userName)
                    html += "<td><a  style='text-decoration:underline;cursor:pointer; ' onclick='emObj.deleteemployee(\"" + emp.userid + "\"\,\"" + emp.userName + "\")'><img height='22px' src='img/delete.png'></a></td>" +
                        "<td><a  style='text-decoration:underline;cursor:pointer; ' onclick='emObj.reset(" + emp.userid + ")'><img height='22px' src='img/resetPwd.png'></a></td>" +
                        "</tr>";
                }

                $("#ulul").html(html);
                $('#currentPage').val(currentPage);
                $('#totalye').val(total);
                emObj.setColor();

                if (currentPage == 1) {
                    document.getElementById('shangyiye').style.display = 'none';
                } else {
                    document.getElementById('shangyiye').style.display = '';
                }
                if (currentPage == total) {
                    document.getElementById('xiayiye').style.display = 'none';
                } else {
                    document.getElementById('xiayiye').style.display = '';
                }
            },
        })
    }

    function findEmUserName() {
        $.ajax({
            url: "/findEmUserName1",//请求地址
            datatype: "json",//数据格式
            type: "post",//请求方式
            success: function (data) {
                var unitObj = document.getElementById("mngSelect");
                $("#mngSelect").find("option:not(:first)").remove();
                for(var i=0;i<data.length;i++){
                    unitObj.options.add(new Option(data[i]));
                }
            }
        })
    }
    



    function selectAll() {
        getRole();
        getDepartment();
        // $('#total1').css('display','');
        // $('#total2').css('display','');
        // $('#total3').css('display','');
        // $('#total4').css('display','');
        // $('#total5').css('display','');
        $('#bottomTab').css('display','');
        $('#bottom').css('display','none');
        $('#bottomB').css('display','none');
        layui.use('table', function () {
            var table = layui.table;
            table.render({
                elem:'#LayuiTable1'
                ,url:'/findAllinform'
                ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
                ,defaultToolbar: [
                    // 'filter',
                    'exports', 'print'
                    //     , { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
                    //     title: '提示'
                    //     ,layEvent: 'LAYTABLE_TIPS'
                    //     ,icon: 'layui-icon-tips'
                    // }
                ]
                    // ['userName', 'name','departmentName', 'post',  'idnumber',  'phone','closhe', 'hat',
                // 'projectId', 'post', 'state','manager','roleId','address','emergency','emergencyTel','education','credentials1',
                // 'credentials2', 'credentials3','bank','card',  'laowupaiqian',
                    //       'wages', 'basicwages', 'meritpay', 'remark','other'];
                , cols: [
                    [
                        {rowspan:3,field: 'zizengL1', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengL1'},
                        {colspan:4,title:'基本信息'},
                        {colspan:4,title:'扩展信息',id:'kuozhan'},
                        {colspan:5,title:'权限信息',id:'quanxian'},
                        {colspan:3,title:'家庭信息',id:'jiating'},
                        {colspan:4,title:'技能信息',id:'jineng'},
                        {colspan:9,title:'工资信息',id:'gongzi'}
                    ],
                    [
                        {rowspan:2,title:'员工编号',field:'userName'},
                        {rowspan:2,title:'姓名',field:'name'},
                        {rowspan:2,title:'部门',field:'departmentName'},
                        {rowspan:2,title:'岗位',field:'post'},
                        {rowspan:2,title:'身份证号',field:'idnumber',id:'idnumber',hide:true},
                        {rowspan:2,title:'联系方式',field:'phone',id:'phone',hide:true},
                        {rowspan:2,title:'工作服尺寸',field:'closhe',id:'closhe',hide:true},
                        {rowspan:2,title:'安全帽编号',field:'hat',id:'hat',hide:true},
                        {rowspan:2,title:'项目组',field:'projectId',id:'projectId',hide:true},
                        {rowspan:2,title:'岗位',field:'post',id:'post',hide:true},
                        {rowspan:2,title:'在职状态',field:'state',id:'state',hide:true},
                        {rowspan:2,title:'绩效管理人',field:'manager',id:'manager',hide:true},
                        {rowspan:2,title:'角色',field:'roleId',id:'roleId',hide:true},
                        {rowspan:2,title:'家庭住址',field:'address',id:'address',hide:true},
                        {rowspan:2,title:'应急联系人',field:'emergency',id:'emergency',hide:true},
                        {rowspan:2,title:'应急电话',field:'emergencyTel',id:'emergencyTel',hide:true},
                        {rowspan:2,title:'学历',field:'education',id:'education',hide:true},
                        {rowspan:2,title:'证书1',field:'credentials1',id:'credentials1',hide:true},
                        {rowspan:2,title:'证书2',field:'credentials2',id:'credentials2',hide:true},
                        {rowspan:2,title:'证书3',field:'credentials3',id:'credentials3',hide:true},
                        {rowspan:2,title:'开户行',field:'bank',id:'bank',hide:true},
                        {rowspan:2,title:'工资卡号',field:'card',id:'card',hide:true},
                        {rowspan:2,title:'劳务派遣',field:'laowupaiqian',id:'laowupaiqian',hide:true},
                        {rowspan:2,title:'待遇标准',field:'wages',id:'wages',hide:true},
                        {rowspan:2,title:'基本工资',field:'basicwages',id:'basicwages',hide:true},
                        {rowspan:2,title:'绩效工资',field:'meritpay',id:'meritpay',hide:true},
                        {colspan:2,title:'变更记录',id:'bgjl',hide:true}
                    ],
                    [
                        {title:'入职信息',field:'remark',id:'remark',hide:true},
                        {title:'其他',field:'other',id:'other',hide:true}
                    ]
                ]
                // , cols: [[
                //     {field: 'zizengL', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengL'}
                //     , {field: 'people', align: 'left', width: 190, title: '员工姓名'}
                //     , {field: 'workingHours', align: 'left', width: 90, title: '工时数'}
                //     , {field: 'content', align: 'left',title: '工作详情'}
                // ]]
                //
                , page: true
            })
            table.render({
                elem:'#LayuiTable2'
                ,url:'/findAllinform'
                ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
                ,defaultToolbar: [
                    // 'filter',
                    'exports', 'print'
                    //     , { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
                    //     title: '提示'
                    //     ,layEvent: 'LAYTABLE_TIPS'
                    //     ,icon: 'layui-icon-tips'
                    // }
                ]
                // ['userName', 'name','departmentName', 'post',  'idnumber',  'phone','closhe', 'hat',
                // 'projectId', 'post', 'state','manager','roleId','address','emergency','emergencyTel','education','credentials1',
                // 'credentials2', 'credentials3','bank','card',  'laowupaiqian',
                //       'wages', 'basicwages', 'meritpay', 'remark','other'];
                , cols: [
                    [
                        {rowspan:3,field: 'zizengL2', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengL2'},
                        {colspan:4,title:'基本信息'},
                        {colspan:4,title:'扩展信息',id:'kuozhan'},
                        {colspan:5,title:'权限信息',id:'quanxian'},
                        {colspan:3,title:'家庭信息',id:'jiating'},
                        {colspan:4,title:'技能信息',id:'jineng'},
                        {colspan:9,title:'工资信息',id:'gongzi'}
                    ],
                    [
                        {rowspan:2,title:'员工编号',field:'userName'},
                        {rowspan:2,title:'姓名',field:'name'},
                        {rowspan:2,title:'部门',field:'departmentName'},
                        {rowspan:2,title:'岗位',field:'post'},
                        {rowspan:2,title:'身份证号',field:'idnumber',id:'idnumber'},
                        {rowspan:2,title:'联系方式',field:'phone',id:'phone'},
                        {rowspan:2,title:'工作服尺寸',field:'closhe',id:'closhe'},
                        {rowspan:2,title:'安全帽编号',field:'hat',id:'hat'},
                        {rowspan:2,title:'项目组',field:'projectId',id:'projectId',hide:true},
                        {rowspan:2,title:'岗位',field:'post',id:'post',hide:true},
                        {rowspan:2,title:'在职状态',field:'state',id:'state',hide:true},
                        {rowspan:2,title:'绩效管理人',field:'manager',id:'manager',hide:true},
                        {rowspan:2,title:'角色',field:'roleId',id:'roleId',hide:true},
                        {rowspan:2,title:'家庭住址',field:'address',id:'address',hide:true},
                        {rowspan:2,title:'应急联系人',field:'emergency',id:'emergency',hide:true},
                        {rowspan:2,title:'应急电话',field:'emergencyTel',id:'emergencyTel',hide:true},
                        {rowspan:2,title:'学历',field:'education',id:'education',hide:true},
                        {rowspan:2,title:'证书1',field:'credentials1',id:'credentials1',hide:true},
                        {rowspan:2,title:'证书2',field:'credentials2',id:'credentials2',hide:true},
                        {rowspan:2,title:'证书3',field:'credentials3',id:'credentials3',hide:true},
                        {rowspan:2,title:'开户行',field:'bank',id:'bank',hide:true},
                        {rowspan:2,title:'工资卡号',field:'card',id:'card',hide:true},
                        {rowspan:2,title:'劳务派遣',field:'laowupaiqian',id:'laowupaiqian',hide:true},
                        {rowspan:2,title:'待遇标准',field:'wages',id:'wages',hide:true},
                        {rowspan:2,title:'基本工资',field:'basicwages',id:'basicwages',hide:true},
                        {rowspan:2,title:'绩效工资',field:'meritpay',id:'meritpay',hide:true},
                        {colspan:2,title:'变更记录',id:'bgjl',hide:true}
                    ],
                    [
                        {title:'入职信息',field:'remark',id:'remark',hide:true},
                        {title:'其他',field:'other',id:'other',hide:true}
                    ]
                ]
                // , cols: [[
                //     {field: 'zizengL', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengL'}
                //     , {field: 'people', align: 'left', width: 190, title: '员工姓名'}
                //     , {field: 'workingHours', align: 'left', width: 90, title: '工时数'}
                //     , {field: 'content', align: 'left',title: '工作详情'}
                // ]]
                //
                , page: true
            })
            table.render({
                elem:'#LayuiTable3'
                ,url:'/findAllinform'
                ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
                ,defaultToolbar: [
                    // 'filter',
                    'exports', 'print'
                    //     , { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
                    //     title: '提示'
                    //     ,layEvent: 'LAYTABLE_TIPS'
                    //     ,icon: 'layui-icon-tips'
                    // }
                ]
                // ['userName', 'name','departmentName', 'post',  'idnumber',  'phone','closhe', 'hat',
                // 'projectId', 'post', 'state','manager','roleId','address','emergency','emergencyTel','education','credentials1',
                // 'credentials2', 'credentials3','bank','card',  'laowupaiqian',
                //       'wages', 'basicwages', 'meritpay', 'remark','other'];
                , cols: [
                    [
                        {rowspan:3,field: 'zizengL3', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengL3'},
                        {colspan:4,title:'基本信息'},
                        {colspan:4,title:'扩展信息',id:'kuozhan'},
                        {colspan:5,title:'权限信息',id:'quanxian'},
                        {colspan:3,title:'家庭信息',id:'jiating'},
                        {colspan:4,title:'技能信息',id:'jineng'},
                        {colspan:9,title:'工资信息',id:'gongzi'}
                    ],
                    [
                        {rowspan:2,title:'员工编号',field:'userName'},
                        {rowspan:2,title:'姓名',field:'name'},
                        {rowspan:2,title:'部门',field:'departmentName'},
                        {rowspan:2,title:'岗位',field:'post'},
                        {rowspan:2,title:'身份证号',field:'idnumber',id:'idnumber',hide:true},
                        {rowspan:2,title:'联系方式',field:'phone',id:'phone',hide:true},
                        {rowspan:2,title:'工作服尺寸',field:'closhe',id:'closhe',hide:true},
                        {rowspan:2,title:'安全帽编号',field:'hat',id:'hat',hide:true},
                        {rowspan:2,title:'项目组',field:'projectId',id:'projectId'},
                        {rowspan:2,title:'岗位',field:'post',id:'post'},
                        {rowspan:2,title:'在职状态',field:'state',id:'state'},
                        {rowspan:2,title:'绩效管理人',field:'manager',id:'manager'},
                        {rowspan:2,title:'角色',field:'roleId',id:'roleId'},
                        {rowspan:2,title:'家庭住址',field:'address',id:'address',hide:true},
                        {rowspan:2,title:'应急联系人',field:'emergency',id:'emergency',hide:true},
                        {rowspan:2,title:'应急电话',field:'emergencyTel',id:'emergencyTel',hide:true},
                        {rowspan:2,title:'学历',field:'education',id:'education',hide:true},
                        {rowspan:2,title:'证书1',field:'credentials1',id:'credentials1',hide:true},
                        {rowspan:2,title:'证书2',field:'credentials2',id:'credentials2',hide:true},
                        {rowspan:2,title:'证书3',field:'credentials3',id:'credentials3',hide:true},
                        {rowspan:2,title:'开户行',field:'bank',id:'bank',hide:true},
                        {rowspan:2,title:'工资卡号',field:'card',id:'card',hide:true},
                        {rowspan:2,title:'劳务派遣',field:'laowupaiqian',id:'laowupaiqian',hide:true},
                        {rowspan:2,title:'待遇标准',field:'wages',id:'wages',hide:true},
                        {rowspan:2,title:'基本工资',field:'basicwages',id:'basicwages',hide:true},
                        {rowspan:2,title:'绩效工资',field:'meritpay',id:'meritpay',hide:true},
                        {colspan:2,title:'变更记录',id:'bgjl',hide:true}
                    ],
                    [
                        {title:'入职信息',field:'remark',id:'remark',hide:true},
                        {title:'其他',field:'other',id:'other',hide:true}
                    ]
                ],
                // , cols: [[
                //     {field: 'zizengL', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengL'}
                //     , {field: 'people', align: 'left', width: 190, title: '员工姓名'}
                //     , {field: 'workingHours', align: 'left', width: 90, title: '工时数'}
                //     , {field: 'content', align: 'left',title: '工作详情'}
                // ]]
                //
                done:function type (res,curr,count) {
                    console.log($("[data-field='state']").children())
                    $("[data-field='projectId']").children().each(function(){
                        if($(this).text()==='项目组'){
                            $(this).text("项目组")
                        }else if($(this).text()==='1'){
                            $(this).text("嘉爱斯运维")
                        }else if($(this).text()==='2'){
                            $(this).text("泰爱斯运维")
                        }else if($(this).text()==='3'){
                            $(this).text("浦江运维")
                        }else if($(this).text()==='4'){
                            $(this).text("临江检修")
                        }else if($(this).text()==='1,2'){
                            $(this).text("嘉爱斯运维、泰爱斯运维")
                        }else if($(this).text()==='1,3'){
                            $(this).text("嘉爱斯运维、浦江运维")
                        }else if($(this).text()==='1,4'){
                            $(this).text("嘉爱斯运维、临江检修")
                        }else if($(this).text()==='2,3'){
                            $(this).text("泰爱斯运维、浦江运维")
                        }else if($(this).text()==='2,4'){
                            $(this).text("泰爱斯运维、临江检修")
                        }else if($(this).text()==='3,4'){
                            $(this).text("浦江运维、临江检修")
                        }else if($(this).text()==='1,2,3'){
                            $(this).text("嘉爱斯运维、泰爱斯运维、浦江运维")
                        }else if($(this).text()==='1,2,4'){
                            $(this).text("嘉爱斯运维、泰爱斯运维、临江检修")
                        }else if($(this).text()==='2,3,4'){
                            $(this).text("泰爱斯运维、浦江运维、临江检修")
                        }else if($(this).text()==='1,2,3,4'){
                            $(this).text("嘉爱斯运维、泰爱斯运维、浦江运维、临江检修")
                        }

                    });
                    $("[data-field='state']").children().each(function(){
                        if($(this).text()==='在职状态'){
                            $(this).text("在职状态");
                        }else if($(this).text()==='1'){
                            $(this).text("在职");
                        }else {
                            $(this).text("离职");
                        }
                    });
                    $("[data-field='roleId']").children().each(function(){
                        if($(this).text()==='角色'){
                            $(this).text("角色");
                        }else if($(this).text()==='1'){
                            $(this).text("项目经理");
                        }else if($(this).text()==='2'){
                            $(this).text("运行专工");
                        }else if($(this).text()==='3'){
                            $(this).text("检修专工");
                        }else if($(this).text()==='4'){
                            $(this).text("运行班长");
                        }else if($(this).text()==='5'){
                            $(this).text("检修班长");
                        }else if($(this).text()==='6'){
                            $(this).text("运行员工");
                        }else if($(this).text()==='7'){
                            $(this).text("检修员工");
                        }else if($(this).text()==='8'){
                            $(this).text("监视人员（甲方）");
                        }else if($(this).text()==='11'){
                            $(this).text("测试专用");
                        }else if($(this).text()==='12'){
                            $(this).text("管理员");
                        }else if($(this).text()==='13'){
                            $(this).text("考试管理员+项目经理");
                        }else if($(this).text()==='14'){
                            $(this).text("不设检修专工的项目");
                        }else if($(this).text()==='15'){
                            $(this).text("综合管理");
                        }
                    });
                    pageCurr=curr;
                }
                , page: true
            })
            table.render({
                elem:'#LayuiTable4'
                ,url:'/findAllinform'
                ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
                ,defaultToolbar: [
                    // 'filter',
                    'exports', 'print'
                    //     , { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
                    //     title: '提示'
                    //     ,layEvent: 'LAYTABLE_TIPS'
                    //     ,icon: 'layui-icon-tips'
                    // }
                ]
                // ['userName', 'name','departmentName', 'post',  'idnumber',  'phone','closhe', 'hat',
                // 'projectId', 'post', 'state','manager','roleId','address','emergency','emergencyTel','education','credentials1',
                // 'credentials2', 'credentials3','bank','card',  'laowupaiqian',
                //       'wages', 'basicwages', 'meritpay', 'remark','other'];
                , cols: [
                    [
                        {rowspan:3,field: 'zizengL4', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengL4'},
                        {colspan:4,title:'基本信息'},
                        {colspan:4,title:'扩展信息',id:'kuozhan'},
                        {colspan:5,title:'权限信息',id:'quanxian'},
                        {colspan:3,title:'家庭信息',id:'jiating'},
                        {colspan:4,title:'技能信息',id:'jineng'},
                        {colspan:9,title:'工资信息',id:'gongzi'}
                    ],
                    [
                        {rowspan:2,title:'员工编号',field:'userName'},
                        {rowspan:2,title:'姓名',field:'name'},
                        {rowspan:2,title:'部门',field:'departmentName'},
                        {rowspan:2,title:'岗位',field:'post'},
                        {rowspan:2,title:'身份证号',field:'idnumber',id:'idnumber',hide:true},
                        {rowspan:2,title:'联系方式',field:'phone',id:'phone',hide:true},
                        {rowspan:2,title:'工作服尺寸',field:'closhe',id:'closhe',hide:true},
                        {rowspan:2,title:'安全帽编号',field:'hat',id:'hat',hide:true},
                        {rowspan:2,title:'项目组',field:'projectId',id:'projectId',hide:true},
                        {rowspan:2,title:'岗位',field:'post',id:'post',hide:true},
                        {rowspan:2,title:'在职状态',field:'state',id:'state',hide:true},
                        {rowspan:2,title:'绩效管理人',field:'manager',id:'manager',hide:true},
                        {rowspan:2,title:'角色',field:'roleId',id:'roleId',hide:true},
                        {rowspan:2,title:'家庭住址',field:'address',id:'address'},
                        {rowspan:2,title:'应急联系人',field:'emergency',id:'emergency'},
                        {rowspan:2,title:'应急电话',field:'emergencyTel',id:'emergencyTel'},
                        {rowspan:2,title:'学历',field:'education',id:'education',hide:true},
                        {rowspan:2,title:'证书1',field:'credentials1',id:'credentials1',hide:true},
                        {rowspan:2,title:'证书2',field:'credentials2',id:'credentials2',hide:true},
                        {rowspan:2,title:'证书3',field:'credentials3',id:'credentials3',hide:true},
                        {rowspan:2,title:'开户行',field:'bank',id:'bank',hide:true},
                        {rowspan:2,title:'工资卡号',field:'card',id:'card',hide:true},
                        {rowspan:2,title:'劳务派遣',field:'laowupaiqian',id:'laowupaiqian',hide:true},
                        {rowspan:2,title:'待遇标准',field:'wages',id:'wages',hide:true},
                        {rowspan:2,title:'基本工资',field:'basicwages',id:'basicwages',hide:true},
                        {rowspan:2,title:'绩效工资',field:'meritpay',id:'meritpay',hide:true},
                        {colspan:2,title:'变更记录',id:'bgjl',hide:true}
                    ],
                    [
                        {title:'入职信息',field:'remark',id:'remark',hide:true},
                        {title:'其他',field:'other',id:'other',hide:true}
                    ]
                ]
                // , cols: [[
                //     {field: 'zizengL', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengL'}
                //     , {field: 'people', align: 'left', width: 190, title: '员工姓名'}
                //     , {field: 'workingHours', align: 'left', width: 90, title: '工时数'}
                //     , {field: 'content', align: 'left',title: '工作详情'}
                // ]]
                //
                , page: true
            })
            table.render({
                elem:'#LayuiTable5'
                ,url:'/findAllinform'
                ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
                ,defaultToolbar: [
                    // 'filter',
                    'exports', 'print'
                    //     , { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
                    //     title: '提示'
                    //     ,layEvent: 'LAYTABLE_TIPS'
                    //     ,icon: 'layui-icon-tips'
                    // }
                ]
                // ['userName', 'name','departmentName', 'post',  'idnumber',  'phone','closhe', 'hat',
                // 'projectId', 'post', 'state','manager','roleId','address','emergency','emergencyTel','education','credentials1',
                // 'credentials2', 'credentials3','bank','card',  'laowupaiqian',
                //       'wages', 'basicwages', 'meritpay', 'remark','other'];
                , cols: [
                    [
                        {rowspan:3,field: 'zizengL5', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengL5'},
                        {colspan:4,title:'基本信息'},
                        {colspan:4,title:'扩展信息',id:'kuozhan'},
                        {colspan:5,title:'权限信息',id:'quanxian'},
                        {colspan:3,title:'家庭信息',id:'jiating'},
                        {colspan:4,title:'技能信息',id:'jineng'},
                        {colspan:9,title:'工资信息',id:'gongzi'}
                    ],
                    [
                        {rowspan:2,title:'员工编号',field:'userName'},
                        {rowspan:2,title:'姓名',field:'name'},
                        {rowspan:2,title:'部门',field:'departmentName'},
                        {rowspan:2,title:'岗位',field:'post'},
                        {rowspan:2,title:'身份证号',field:'idnumber',id:'idnumber',hide:true},
                        {rowspan:2,title:'联系方式',field:'phone',id:'phone',hide:true},
                        {rowspan:2,title:'工作服尺寸',field:'closhe',id:'closhe',hide:true},
                        {rowspan:2,title:'安全帽编号',field:'hat',id:'hat',hide:true},
                        {rowspan:2,title:'项目组',field:'projectId',id:'projectId',hide:true},
                        {rowspan:2,title:'岗位',field:'post',id:'post',hide:true},
                        {rowspan:2,title:'在职状态',field:'state',id:'state',hide:true},
                        {rowspan:2,title:'绩效管理人',field:'manager',id:'manager',hide:true},
                        {rowspan:2,title:'角色',field:'roleId',id:'roleId',hide:true},
                        {rowspan:2,title:'家庭住址',field:'address',id:'address',hide:true},
                        {rowspan:2,title:'应急联系人',field:'emergency',id:'emergency',hide:true},
                        {rowspan:2,title:'应急电话',field:'emergencyTel',id:'emergencyTel',hide:true},
                        {rowspan:2,title:'学历',field:'education',id:'education'},
                        {rowspan:2,title:'证书1',field:'credentials1',id:'credentials1'},
                        {rowspan:2,title:'证书2',field:'credentials2',id:'credentials2'},
                        {rowspan:2,title:'证书3',field:'credentials3',id:'credentials3'},
                        {rowspan:2,title:'开户行',field:'bank',id:'bank',hide:true},
                        {rowspan:2,title:'工资卡号',field:'card',id:'card',hide:true},
                        {rowspan:2,title:'劳务派遣',field:'laowupaiqian',id:'laowupaiqian',hide:true},
                        {rowspan:2,title:'待遇标准',field:'wages',id:'wages',hide:true},
                        {rowspan:2,title:'基本工资',field:'basicwages',id:'basicwages',hide:true},
                        {rowspan:2,title:'绩效工资',field:'meritpay',id:'meritpay',hide:true},
                        {colspan:2,title:'变更记录',id:'bgjl',hide:true}
                    ],
                    [
                        {title:'入职信息',field:'remark',id:'remark',hide:true},
                        {title:'其他',field:'other',id:'other',hide:true}
                    ]
                ]
                // , cols: [[
                //     {field: 'zizengL', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengL'}
                //     , {field: 'people', align: 'left', width: 190, title: '员工姓名'}
                //     , {field: 'workingHours', align: 'left', width: 90, title: '工时数'}
                //     , {field: 'content', align: 'left',title: '工作详情'}
                // ]]
                //
                , page: true
            })
            table.render({
                elem:'#LayuiTable6'
                ,url:'/findAllinform'
                ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
                ,defaultToolbar: [
                    // 'filter',
                    'exports', 'print'
                    //     , { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
                    //     title: '提示'
                    //     ,layEvent: 'LAYTABLE_TIPS'
                    //     ,icon: 'layui-icon-tips'
                    // }
                ]
                // ['userName', 'name','departmentName', 'post',  'idnumber',  'phone','closhe', 'hat',
                // 'projectId', 'post', 'state','manager','roleId','address','emergency','emergencyTel','education','credentials1',
                // 'credentials2', 'credentials3','bank','card',  'laowupaiqian',
                //       'wages', 'basicwages', 'meritpay', 'remark','other'];
                , cols: [
                    [
                        {rowspan:3,field: 'zizengL6', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengL6'},
                        {colspan:4,title:'基本信息'},
                        {colspan:4,title:'扩展信息',id:'kuozhan'},
                        {colspan:5,title:'权限信息',id:'quanxian'},
                        {colspan:3,title:'家庭信息',id:'jiating'},
                        {colspan:4,title:'技能信息',id:'jineng'},
                        {colspan:9,title:'工资信息',id:'gongzi'}
                    ],
                    [
                        {rowspan:2,title:'员工编号',field:'userName'},
                        {rowspan:2,title:'姓名',field:'name'},
                        {rowspan:2,title:'部门',field:'departmentName'},
                        {rowspan:2,title:'岗位',field:'post'},
                        {rowspan:2,title:'身份证号',field:'idnumber',id:'idnumber',hide:true},
                        {rowspan:2,title:'联系方式',field:'phone',id:'phone',hide:true},
                        {rowspan:2,title:'工作服尺寸',field:'closhe',id:'closhe',hide:true},
                        {rowspan:2,title:'安全帽编号',field:'hat',id:'hat',hide:true},
                        {rowspan:2,title:'项目组',field:'projectId',id:'projectId',hide:true},
                        {rowspan:2,title:'岗位',field:'post',id:'post',hide:true},
                        {rowspan:2,title:'在职状态',field:'state',id:'state',hide:true},
                        {rowspan:2,title:'绩效管理人',field:'manager',id:'manager',hide:true},
                        {rowspan:2,title:'角色',field:'roleId',id:'roleId',hide:true},
                        {rowspan:2,title:'家庭住址',field:'address',id:'address',hide:true},
                        {rowspan:2,title:'应急联系人',field:'emergency',id:'emergency',hide:true},
                        {rowspan:2,title:'应急电话',field:'emergencyTel',id:'emergencyTel',hide:true},
                        {rowspan:2,title:'学历',field:'education',id:'education',hide:true},
                        {rowspan:2,title:'证书1',field:'credentials1',id:'credentials1',hide:true},
                        {rowspan:2,title:'证书2',field:'credentials2',id:'credentials2',hide:true},
                        {rowspan:2,title:'证书3',field:'credentials3',id:'credentials3',hide:true},
                        {rowspan:2,title:'开户行',field:'bank',id:'bank'},
                        {rowspan:2,title:'工资卡号',field:'card',id:'card'},
                        {rowspan:2,title:'劳务派遣',field:'laowupaiqian',id:'laowupaiqian'},
                        {rowspan:2,title:'待遇标准',field:'wages',id:'wages'},
                        {rowspan:2,title:'基本工资',field:'basicwages',id:'basicwages'},
                        {rowspan:2,title:'绩效工资',field:'meritpay',id:'meritpay'},
                        {colspan:2,title:'变更记录',id:'bgjl'}
                    ],
                    [
                        {title:'入职信息',field:'remark',id:'remark'},
                        {title:'其他',field:'other',id:'other'}
                    ]
                ]
                // , cols: [[
                //     {field: 'zizengL', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengL'}
                //     , {field: 'people', align: 'left', width: 190, title: '员工姓名'}
                //     , {field: 'workingHours', align: 'left', width: 90, title: '工时数'}
                //     , {field: 'content', align: 'left',title: '工作详情'}
                // ]]
                //
                , page: true
            })
        })
    }

    function setColor(selectId) {
        var table = document.getElementById("btable");
        var trs = table.getElementsByTagName('tr');
        for (var i = 0; i < trs.length; i++) {
            if ((i) % 3 == 0) trs[i].style.backgroundColor = " #F5F4F5";
        }
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




        // var operate1 = document.getElementById('total1');
        // operate1.onclick = function(){
        //     alert("success!");
        //     $("#basic").width=400+"px";
        //     $("#basic1").width=100+"px";
        //     $("#basic2").width=100+"px";
        //     $("#basic3").width=100+"px";
        //     $("#basic4").width=100+"px";
        // }


    function selectBeCycle() {
        var employeeId = $('#xemployeeId').val();
        var unitObj1 = document.getElementById("cycleSelect");
        $.ajax({
            url: "/selectBeCycle",//请求地址
            datatype: "json",//数据格式
            data: {
                "employeeId": employeeId,
            },
            type: "post",//请求方式
            async: false,//是否异步请求
            success: function (data) {
                $("#cycleSelect").find("option").remove();
                for (var i = 0; i < data.length; i++) {
                    unitObj1.options.add(new Option(data[i]));
                }
                selectBe();
            }
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
                        selectBeCycle();
                        $('#BeAddCycle').val('');
                    }else alert("周期已存在");
                }
            })
        }
    }

    function BeUpdateCycle(){
        var cycle = $('#BeUpdateCycle').val();
        var employeeId = $('#xemployeeId').val();
        var id=$('#BeId').val();
        if(id==null|id==''){
            alert("请选择周期");
        }else {
            $.ajax({
                url: "/BeUpdateCycle",//请求地址
                datatype: "json",//数据格式
                data: {
                    "cycle": cycle,
                    "employeeId": employeeId,
                    "id": id,
                },
                type: "post",//请求方式
                async: false,//是否异步请求
                success: function (data) {
                    console.log(data);
                    if(data=="success"){
                        alert("修改成功");
                        window.document.getElementById('updateBeCycle').style.display='none';
                        window.document.getElementById('selectcycle').style.display='';
                        selectBeCycle();
                        $('#BeUpdateCycle').val('');
                    }else alert("周期已存在");
                }
            })

        }
    }

    function dataisNull(x){
        if(x!=null&x!=''){
            return x;
        }else return 0
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

    function selectBe() {
        var employeeId = $("#xemployeeId").val();
        var unitObj1 = document.getElementById("cycleSelect");
        var cycle;
        if (unitObj1 != null) {
            cycle = unitObj1.value;
            if(cycle!='请选择'){
                $("#cycleSelect").css("color","black");
            }else {
                $("#cycleSelect").css("color","#9B9B9B");
            }
        }
        if(cycle!=null&cycle!="请选择"){
            let data = {"employeeId":employeeId,
                "cycle":cycle};
            $.ajax({
                url: "/findBe",//请求地址
                datatype: "json",//数据格式
                data: data,
                type: "post",//请求方式
                success: function (data) {   //如何发送成功
                    $('#BeId').val(data.id);
                    $('.week1').val(data.week1);
                    $('.week2').val(data.week2);
                    $('.week3').val(data.week3);
                    $('.week4').val(data.week4);
                    $('#period').val(data.period);
                    $('#tiaoxiu').val(dataisNull(data.tiaoxiu));
                    $('#qingjia').val(dataisNull(data.qingjia));
                    $('#kuanggong').val(dataisNull(data.kuanggong));
                    $('#chidao').val(dataisNull(data.chidao));
                    $('#lunxiu').val(dataisNull(data.lunxiu));
                    $('#jiaban').val(dataisNull(data.jiaban));
                    $('#chucai').val(dataisNull(data.chucai));
                    $('#zhiban').val(dataisNull(data.zhiban));
                    $('#kaoqin').val(dataisNull(data.kaoqin));
                    $('#chuchai').val(dataisNull(data.chuchai));
                    $('#remark').val(data.remark);
                    $('#sum').val(data.sum);
                    if (data.sum != null) {
                        var ftiaoxiu = (-1) * data.tiaoxiu;
                        $('#ftiaoxiu').val(ftiaoxiu);
                        var fqingjia = (-6) * data.qingjia;
                        $('#fqingjia').val(fqingjia);
                        var fkuanggong = (-20) * data.kuanggong;
                        $('#fkuanggong').val(fkuanggong);
                        var fchidao = (-1) * data.chidao;
                        $('#fchidao').val(fchidao);
                        var flunxiu = (-1) * data.lunxiu;
                        $('#flunxiu').val(flunxiu);
                       /* var fjiaban = 8 * data.jiaban;
                        $('#fjiaban').val(fjiaban);*/
                        var fchuchai = 2 * data.chuchai;
                        $('#fchuchai').val(fchuchai);
                        var fchuqing = 50 - data.tiaoxiu * 2 - data.qingjia * 2 - data.kuanggong * 2 - data.chidao * 2 - data.lunxiu * 2;
                        $('#fchuqing').val(fchuqing);
                    }else {
                        $('#ftiaoxiu').val("");
                        $('#fqingjia').val("");
                        $('#fkuanggong').val("");
                        $('#fchidao').val("");
                        $('#flunxiu').val("");
                        $('#fjiaban').val("");
                        $('#fchuchai').val("");
                        $('#fchuqing').val("");
                    }
                }
            })
        }
        $.ajax({
            url: "/getAssessmentByEmployeeId",//请求地址
            datatype: "json",//数据格式
            data: {"cycle":cycle,employeeId:employeeId},
            type: "post",//请求方式
            success: function (data) { 
            	$('#netPerformance').val(data.netPerformance);
            	$('#comprehensivePerformance').val(data.comprehensivePerformance);
            }
    	});
    }

    function deleteemployee(userid,userName) {
        let r = confirm("确定要删除吗");
        if (r == true) {
            $.ajax({
                url: "/deleteByUserName",
                type: "post",
                data: {"userid": userid,
                        "userName":userName
                },
                async: false,//是否异步请求
                datatype: "json",
                success: function (data) {
                    var a = data;
                    if (a == "success") {
                        alert("删除成功");
                        emObj.manage();
                    } else {
                        emObj.manage();
                    }

                },
                error: function (data) {
                    var a = data;
                    if (a == "success") {
                        alert("删除成功");
                        emObj.manage();
                    } else {
                        emObj.manage();
                    }

                }
            })
        }

    }

    function insertem() {
        var UserName = $("#iUserName").val();
        var Name = $("#iName").val();
        var text = "";
        if (UserName == '') {
            text += "员工编号不能为空\n";
        }
        if (Name == '') {
            text += "员工姓名不能为空\n";
        }
        if (text == "") {
            let newEm = new EmInfo2(UserName, Name);
            if (newEm.motify()) {
                $.ajax({
                    url: "/insertEm",//请求地址
                    datatype: "json",//数据格式
                    data: {
                        "UserName": UserName, "Name": Name
                    },
                    type: "post",//请求方式
                    async: false,//是否异步请求
                    success: function (data) {
                        if (data == "success") {
                            alert("添加成功");
                            window.location.reload();
                        } else if(data=="fail"){
                            alert("员工编号已存在");
                        }
                    }
                })
            }
        } else {
            alert(text);
        }
    }

    function updateBe() {
        var text = '';
        var unitObj1 = document.getElementById("cycleSelect");
        var employeeId = $('#xemployeeId').val();
        var week1 = $('.week1').val();
        var week2 = $('.week2').val();
        var week3 = $('.week3').val();
        var week4 = $('.week4').val();
        var period = $('#period').val();
        var tiaoxiu = $('#tiaoxiu').val();
        var qingjia = $('#qingjia').val();
        var kuanggong = $('#kuanggong').val();
        var chidao = $('#chidao').val();
        var lunxiu = $('#lunxiu').val();
        var chuchai = $('#chuchai').val();
        var remark = $('#remark').val();
        
        var jiaban = $('#jiaban').val();
        var zhiban = $('#zhiban').val();
        var kaoqin = $('#kaoqin').val();
        
        var cycle;
        var id=$('#BeId').val();
        if (unitObj1 != null) {
            cycle = unitObj1.value;
        }
        if (tiaoxiu == '' | period == '' | qingjia == '' | kuanggong == '' | chidao == '' | lunxiu == '' | jiaban == '' | chuchai == '' | cycle == '') {
            text = "数据不能为空";
            alert(text);
        }
        if(cycle=='请选择'){
            alert("请选择周期");
        }
        if (text == ''&cycle!='请选择') {
            ftiaoxiu = (-1.0) * tiaoxiu;
            fqingjia = (-6.0) * qingjia;
            fkuanggong = (-20.0) * kuanggong;
            fchidao = (-1.0) * chidao;
            flunxiu = (-1.0) * lunxiu;
            /*fjiaban = 8.0 * jiaban;*/
            fchuchai = 2.0 * chuchai;
            fchuqing = 50.0 - tiaoxiu * 1 - qingjia * 1 - kuanggong * 1 - chidao * 1 - lunxiu * 1;
            sum = week1 * 1 + week2 * 1 + week3 * 1 + week4 * 1 + period * 1 + fchuqing + ftiaoxiu + fqingjia + fkuanggong + fchidao + flunxiu + fchuchai;
            $.ajax({
                url: "/updateBe",//请求地址
                datatype: "json",//数据格式
                data: {
                    "id": id,
                    "week1": week1,
                    "week2": week2,
                    "week3": week3,
                    "week4": week4,
                    "period": period,
                    "tiaoxiu": tiaoxiu,
                    "qingjia": qingjia,
                    "kuanggong": kuanggong,
                    "chidao": chidao,
                    "lunxiu": lunxiu,
                    "chuchai": chuchai,
                    "remark": remark,
                    "cycle": cycle,
                    "kaoqin": kaoqin,
                    "zhiban": zhiban,
                    "jiaban": jiaban,
                    "employeeId": employeeId,
                    "sum": sum
                },
                type: "post",//请求方式
                async: false,//是否异步请求
                success: function (data) {
                    if (data == "success") {
                        alert("修改成功");
                        $('.week1').val(week1);
                        $('.week2').val(week2);
                        $('#fchuqing').val(fchuqing);
                        $('.week3').val(week3);
                        $('.week4').val(week4);
                        $('#period').val(period);
                        $('#ftiaoxiu').val(ftiaoxiu);
                        $('#fqingjia').val(fqingjia);
                        $('#fkuanggong').val(fkuanggong);
                        $('#fchidao').val(fchidao);
                        $('#flunxiu').val(flunxiu);
                        $('#fchuchai').val(fchuchai);
                        $('#remark').val(remark);
                        $('#sum').val(sum);
                    } else if (data == "fail") {
                        alert("不是最近周期，无法修改");
                    } else {
                        alert("错误");
                    }
                }
            })
        }
    }

    function insertPeAcc() {
        var workTasks = $('#addworkTasks').val();
        var access = $('#addaccess').val();
        var cycle = $('#addcycle').val();
        var employeeId = $('#yemployeeId').val();
        var weights = $('#addweights').val();

        if (workTasks == '' | access == '' | weights == '' | cycle == '') {
            alert("参数不能为空");
        }else if(weights*1>150){
            alert("权重不能大于150");
        }else {
            $.ajax({
                url: "/insertPeAcc",//请求地址
                datatype: "json",//数据格式
                data: {
                    "workTasks": workTasks,
                    "employeeId": employeeId,
                    "cycle": cycle,
                    "access": access,
                    "weights": weights,
                },
                type: "post",//请求方式
                async: false,//是否异步请求
                success: function (data) {
                    if (data == "success") {
                        alert("添加成功");
                        parent.emObj.selectCycle();
                        parent.emObj.findPeAcc();
                    } else {
                        alert("错误");
                    }
                    parent.layer.closeAll();
                }
            })


        }
    }

    function findPeAcc() {
        var unitObj = document.getElementById("mySelect");
        var cycle;
        if (unitObj != null) {
            cycle = unitObj.value;
            $("#mySelect").css("color","black");
         
        }
        f(cycle);
    }
    function findPeAccIndex() {
        var unitObj = document.getElementById("mySelect");
        var cycle;
        if (unitObj != null) {
            cycle = unitObj.value;
            $("#mySelect").css("color","black");

        }
        f(cycle);
    }


    function f(cycle) {
        var html = '';
        var employeeId = $("#yemployeeId").val();
        $.ajax({
            url: "/findPeAcc",//请求地址
            datatype: "json",//数据格式
            type: "post",//请求方式
            data: {
                "employeeId": employeeId,
                "cycle": cycle
            },
            success: function (data) {
                PeAcc = data;
                Pesize = data.length;
                for (var i = 0; i < data.length; i++) {
                    var score;
                    var detail;
                    amount+=(data[i].weights)*1
                    if (data[i].score != '' | data[i].score != null) {
                        score = data[i].score;
                        scoreamount+=score*1;
                    }
                    if (data[i].detail != '' | data[i].detail != null) {
                        detail = data[i].detail;
                    }

                    html += '<tr>' + '<td>' + (i + 1) + '</td>' +
                        '<td colspan="2">' + data[i].workTasks + '</td>' +
                        '<td colspan="4">' + data[i].access + '</td>' +
                        '<td>' + data[i].weights + '</td>' +
                        '<td><input id="Pescore' + i + '" value="' + score + '"></td>' +
                        '<td><input id="PescoreDetail' + i + '" value="' + detail + '"></td>\'' +
                        '<td><a onclick="emObj.deletePeAcc(' + i + ')" ><img height="25px" src="img/delete.png" ></a></td>' +
                        '<td><a onclick="emObj.showupdatePeAcc(' + i + ')"><img height="25px" src="img/update.png" ></a></td>' +
                        '</tr>'
                }
                $("#amount").val(amount);
                amount=0;
                $("#scoreamount").val(scoreamount);
                scoreamount=0;
                $("#peAcc").html(html);
            }

        })

    }

    function deletePeAcc(i) {
        let r = confirm("确定要删除吗");
        if (r == true) {
            var id = PeAcc[i].id;
            $.ajax({
                url: "/deletePeAcc",//请求地址
                datatype: "json",//数据格式
                data: {
                    "Id": id,
                },
                type: "post",//请求方式
                async: false,//是否异步请求
                success: function (data) {
                    if (data == "success") {
                        emObj.findPeAcc();
                        selectCycle();
                    } else {
                        alert("错误");
                    }
                }
            })
        }
    }

    function updatePeAcc(i) {
        var id = $("#uPeid").val();
        var weights = $("#uweights").val();
        var workTasks = $("#uworkTasks").val();
        var access = $("#uaccess").val();
        var cycle = $("#ucycle").val();
        var employeeId = $("#yemployeeId").val();
        if (weights == '' | workTasks == '' | access == '') {
            alert("请输入内容");
        } else {
            $.ajax({
                url: "/updatePeAcc",//请求地址
                datatype: "json",//数据格式
                data: {
                    "id": id,
                    "weights": weights,
                    "workTasks": workTasks,
                    "access": access,
                    "cycle": cycle,
                    "employeeId": employeeId,
                },
                type: "post",//请求方式
                async: false,//是否异步请求
                success: function (data) {
                    if (data == "success") {
                        alert("修改成功");
                        $("#uPeid").val("");
                        $("#uweights").val("");
                        $("#uworkTasks").val("");
                        $("#uaccess").val("");
                        emObj.findPeAcc();
                        selectCycle();
                        document.getElementById('updatePe').style.display = 'none';
                    } else if(data=="fail"){
                        alert("不是最近周期，无法修改");
                    }
                }
            })
        }
    }

    function copyPeAcc() {
        var unitObj = document.getElementById("mySelect");
        var lastcycle = unitObj.value;
        var cycle = $('#lastCycle').val();
        var employeeId = $('#yemployeeId').val();

        if (cycle == '' | cycle == null) {
            alert("请填写周期");
        } else if (lastcycle == "请选择") {
            alert("请填选择周期");
        } else {
            $.ajax({
                url: "/copyPeAcc",//请求地址
                datatype: "json",//数据格式
                data: {
                    "employeeId": employeeId,
                    "cycle": cycle,
                    "lastcycle": lastcycle
                },
                type: "post",//请求方式
                success: function (data) {
                    if (data == "success") {
                        alert("已复制至周期" + cycle);
                        emObj.findPeAcc();
                        selectCycle();
                        $('#lastCycle').val('');
                    } else if(data=='fail'){
                        alert("周期已存在");
                        emObj.findPeAcc();
                        selectCycle();
                    }
                }
            });

        }
    }

    function selectCycle() {
        var employeeId = $('#yemployeeId').val();
        var unitObj = document.getElementById("mySelect");
        $.ajax({
            url: "/selectCycle",//请求地址
            datatype: "json",//数据格式
            data: {
                "employeeId": employeeId,
            },
            type: "post",//请求方式
            async: false,//是否异步请求
            success: function (data) {
                $("#mySelect").find("option").remove();
                $("#lastCycle").val("");
                for (var i = 0; i < data.length; i++) {
                    unitObj.options.add(new Option(data[i]));
                }
            }
        })
    }

    function insertScore(x) {
        var obj = [];
        var value = document.getElementById(x);
        var cycle = value.value;
        if (cycle == "请选择") {
            alert("请选择周期");
        } else {
            for (var i = 0; i < Pesize; i++) {
                var returnObj = new Object();
                returnObj.id = PeAcc[i].id;
                returnObj.score = $("#Pescore" + i + "").val();
                returnObj.detail = $("#PescoreDetail" + i + "").val();
                obj.push(returnObj);
            }
            $.ajax({
                url: "/insetScore",
                datatype: "json",
                contentType: "application/json;charsetset=UTF-8",
                type: "post",
                traditional: true,
                data: JSON.stringify(obj),
                success: function (data) {
                    alert(data);
                }
            })
        }
    }

    function showupdate(i) {
        var emp = temp[i];
        $('#uId').val(emp.id);
        $('#uManager').val(emp.manager);
        $('#uUserid').val(emp.userid);
        $('#uEmergency').val(emp.emergency);
        $('#uEmergencyTel').val(emp.emergencyTel);
        $('#uRemark').val(emp.remark);
        $('#uWages').val(emp.wages);
        $('#uBasicwages').val(emp.basicwages);
        $('#uMeritpay').val(emp.meritpay);
        $('#uName').val(emp.name);
        $('#uUserName').val(emp.userName);
        $('#uIdnumber').val(emp.idnumber);
        $('#uCard').val(emp.card);
        $('#uPhone').val(emp.phone);
        $('#uCloshe').val(emp.closhe);
        $('#uHat').val(emp.hat);
        $('#uPost').val(emp.post);
        $('#uLaowupaiqian').val(emp.laowupaiqian);
        $('#uEducation').val(emp.education);
        $('#uCredentials1').val(emp.credentials1);
        $('#uCredentials2').val(emp.credentials2);
        $('#uCredentials3').val(emp.credentials3);
        $('#udate').val(emp.date);
        $('#uState').val(emp.state);
        $('#uDepartment').val(emp.department);
        $('#roleSelect').val(emp.roleId);
        setColor('uDepartment');
        setColor('roleSelect');
        findEmUserName();
        getProject(emp.userName);
    }

    function showemy(i) {
        var em = temp[i];
        $('#yName').val(em.name);
        $('#yUserName').val(em.userName);
        $('#yemployeeId').val(em.id);
        $('#yPost').val(em.post);
        selectCycle();
    }

    function showupdatePeAcc(i) {
        var pe = PeAcc[i];
        $("#uPeid").val(pe.id);
        $("#ucycle").val(pe.cycle);
        $("#uweights").val(pe.weights);
        $("#uworkTasks").val(pe.workTasks);
        $("#uaccess").val(pe.access);
        document.getElementById('updatePe').style.display = '';
    }

    function showemx(i) {
        clearbe();
        var em = temp[i];
        $('#xName').val(em.name);
        $('#xUserName').val(em.userName);
        $('#xPost').val(em.post);
        $('#xemployeeId').val(em.id);

        selectBeCycle();
    }

    function updateem() {
        var Manager;
        var unitObj = document.getElementById("mngSelect");
        var Emergency = $('#uEmergency').val();
        var Userid = $('#uUserid').val();
        var EmergencyTel = $('#uEmergencyTel').val();
        var Remark = $('#uRemark').val();
        var Wages = $('#uWages').val();
        var Basicwages = $('#uBasicwages').val();
        var Meritpay = $('#uMeritpay').val();
        var Id = $("#uId").val();
        var UserName = $("#uUserName").val();
        var Name = $("#uName").val();
        var Idnumber = $("#uIdnumber").val();
        var Card = $("#uCard").val();
        var Phone = $("#uPhone").val();
        var Closhe = $("#uCloshe").val();
        var Hat = $("#uHat").val();
        var Post = $("#uPost").val();
        if(unitObj.value!='请选择'){ Manager= unitObj.value;}
        var Laowupaiqian = $("#uLaowupaiqian").val();
        var Education = $("#uEducation").val();
        var Credentials1 = $("#uCredentials1").val();
        var Credentials2 = $("#uCredentials2").val();
        var Credentials3 = $("#uCredentials3").val();
        var date = $("#udate").val();
        var State = $("#uState").val();
        var Department = $("#uDepartment").val();
        var roleId = $('#roleSelect').val();

        alert("地址"+Address);
        var checkVal = new Array();
    	$('input[id^="projectCheck-"]:checked').each(function(){
    		checkVal.push($(this).val());
    	});
    	var projectId = checkVal.join(',');
        var text = "";
        if (UserName == '') {
            text += "员工编号不能为空\n";
        }
        if (Name == '') {
            text += "员工姓名不能为空\n";
        }
        if (text == "") {
            let newEm = new EmInfo(UserName, Name, Idnumber, Phone);
            if (newEm.motify()) {
                $.ajax({
                    url: "/updateEm",//请求地址
                    datatype: "json",//数据格式
                    data: {
                        "Id": Id,
                        "Userid": Userid,
                        "Emergency": Emergency,
                        "EmergencyTel": EmergencyTel,
                        "Remark": Remark,
                        "Wages": Wages,
                        "Basicwages": Basicwages,
                        "Meritpay": Meritpay,
                        "UserName": UserName,
                        "Name": Name,
                        "Idnumber": Idnumber,
                        "Card": Card,
                        "Department": Department,
                        "Phone": Phone,
                        "Closhe": Closhe,
                        "Hat": Hat,
                        "Manager":Manager,
                        "Laowupaiqian": Laowupaiqian,
                        "Post": Post,
                        "Education": Education,
                        "Credentials1": Credentials1,
                        "Credentials2": Credentials2,
                        "Credentials3": Credentials3,
                        "date": date,
                        "State": State,
                        "roleId": roleId,
                        "projectId":projectId,
                        "bank":Bank,
                        "address":Address
                    },
                    type: "post",//请求方式
                    async: false,//是否异步请求
                    success: function (data) {
                        if (data == "success") {
                            showCon("修改成功")
                            emObj.manage();
                            document.getElementById('updateinformation').style.display = 'none';
                        } else if(data=="fail1"){
                            showCon("员工编号已存在");
                        }else if(data=="fail2"){
                            showCon("身份证号已被使用");
                        }
                    }
                })
            }
        } else {
            alert(text);
        }
    }

    function reset(Id) {
        let r = confirm("确定要重置吗");
        if (r == true) {
            $.ajax({
                url: "/reset",//请求地址
                datatype: "json",//数据格式
                data: {"Id": Id},
                type: "post",//请求方式
                success: function (data) {   //如何发送成功
                    if (data == "success") {
                        alert("重置成功")
                    }
                },
                error: function (data) {
                    if (data == "success") {
                        alert("重置成功")
                    }
                }
            })
        }
    }

    function next() {
        if (total < currentPage + 1) {
            alert("没有下一页了")

        } else {
            currentPage += 1;
            manage();
        }
    }

    function before() {
        if (currentPage != 1) {
            currentPage -= 1;
            manage();
        } else {
            alert("没有前一页了");
        }
    }

    function turnto() {
        var page = parseInt($('#currentPage').val());
        if (page > total || page < 1) {
            alert("页码错误");
        } else {
            currentPage = page;
            manage();
        }

    }

    function Exexport() {
        window.location.href = "/export";

    }

    function addday(id) {
        var day = $("#" + id).val();
        if (day == null) {
            day = 0.5;
        } else {
            day = day * 1 + 0.5;
        }
        $("#" + id).val(day);

    }
    
    function addday1(id) {
        var day = $("#" + id).val();
        if (day == null) {
            day = 1;
        } else {
            day = day*1 + 1;
        }
        $("#" + id).val(day);
    }
    
    function minusday1(id) {
        var day = $("#" + id).val();
        if (day == null | day == 0) {
            day = 0;
            alert("天数已经为0");
        } else {
            day = day*1 - 1;
        }
        $("#" + id).val(day);
    }

    function minusday(id) {
        var day = $("#" + id).val();
        if (day == null | day == 0) {
            day = 0;
            alert("天数已经为0");
        } else {
            day = day * 1 - 0.5;
        }
        $("#" + id).val(day);
    }



    return {
        selectAll: selectAll,
        deleteemployee: deleteemployee,
        insertem: insertem,
        showupdate: showupdate,//修改界面信息显示
        updateem: updateem,//修改员工信息
        selectBy: selectBy,//条件查询
        next: next,
        turnto: turnto,
        before: before,
        reset: reset,
        showemx: showemx,
        updateBe: updateBe,
        selectBe: selectBe,
        showemy: showemy,
        Exexport: Exexport,
        setColor: setColor,
        insertPeAcc: insertPeAcc,
        findPeAcc: findPeAcc,
        findPeAccIndex:findPeAccIndex,

        deletePeAcc: deletePeAcc,
        insertScore: insertScore,
        copyPeAcc: copyPeAcc,
        updatePeAcc: updatePeAcc,
        showupdatePeAcc: showupdatePeAcc,
        addday: addday,
        minusday: minusday,
        addday1: addday1,
        minusday1: minusday1,
        selectCycle: selectCycle,
        BeAddCycle:BeAddCycle,
        BeUpdateCycle:BeUpdateCycle,
        manage:manage
    }
}(jQuery));


class EmInfo {
    constructor(UserName, Name, Idnumber, Phone) {
        this.UserName = UserName;
        this.Name = Name;
        this.Idnumber = Idnumber;
        this.Phone = Phone;
        this.args = ['UserName', 'Name', 'Idnumber', 'Phone'];
        this.args2 = ['用户编号', '姓名', '身份证号', '联系方式']
    }

    motify() {
        let ruls = {
            UserName: /^[A-Z]\d{3}/,
            Phone: /^[1-9]\d{10}/,
            Name: /^[\u4e00-\u9fa5]{0,4}$/,
            Idnumber: /^[1-9]\d{16}(\d|x|X)$/
        }
        for (let i = 0; i < this.args.length; i++) {
            let arg = this.args[i];
            if (this[arg] != '' && this[arg] != null) {
                let isMatch = ruls[arg].test(this[arg]);
                if (!isMatch) {
                    alert(this.args2[i] + ": 格式错误");
                    return false;
                }

            }
        }
        return true;
    }
}

class EmInfo2 {
    constructor(UserName, Name) {
        this.UserName = UserName;
        this.Name = Name;
        this.args = ['UserName', 'Name'];
        this.args2 = ['用户编号', '姓名']
    }

    motify() {
        let ruls = {
            UserName: /^[A-Z]\d{3}/,
            Name: /^[\u4e00-\u9fa5]{0,4}$/,
        }
        for (let i = 0; i < this.args.length; i++) {
            let arg = this.args[i];
            if (this[arg] != '' && this[arg] != null) {
                let isMatch = ruls[arg].test(this[arg]);
                if (!isMatch) {
                    alert(this.args2[i] + ": 格式错误");
                    return false;
                }

            }
        }
        return true;
    }
}


function additable() {
    layui.use('layer', function () { //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
        //触发事件
        var employeeId = $("#yemployeeId").val();
        var type = "auto";
        layer.open({
            type: 2
            , title: '员工考核'
            , offset: type //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
            , id: 'layerDemo' + type //防止重复弹出
            , area: ['430px', '210px']
            , content: '/nametbShow?employeeId=' + employeeId
        });


    });
}

function addyejiTable() {
    layui.use('layer', function () { //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
        //触发事件
        var employeeId = $("#yemployeeId").val();
        if(employeeId==null|employeeId==''){
            alert("请选择员工")
        }else {
            var type = "auto";
            layer.open({
                type: 2
                , title: '添加标准'
                , offset: type //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
                , id: 'layerDemo' + type //防止重复弹出
                , area: ['495px', '380px']
                , content: '/addPeAcc?employeeId=' + employeeId
            });
        }

    });
}
function exportTable() {
    layui.use('layer', function () { //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
        //触发事件
            var type = "auto";
            layer.open({
                type: 2
                , title: '信息导出'
                , offset: type //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
                , id: 'layerDemo' + type //防止重复弹出
                , area: ['430px', '200px']
                , content: "exportTable"
            });

    });
}

window.onload=function(){
    emObj.selectAll();
}

