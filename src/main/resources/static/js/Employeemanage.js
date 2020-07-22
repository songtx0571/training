
$(function(){
	checkLogin();
	fillRole();
	getDepartment1();
	var userName = sessionStorage.Username //获取username
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

	layui.use('laydate', function(){
		var laydate = layui.laydate;

		//执行一个laydate实例
		laydate.render({
			elem: '#achievementTime' //指定元素
			,type: 'month'
			,value: new Date()
			,btns: ['confirm']
			,done: function(value){
				fillAssessmemt(value);
			}
		});
	});
})
function checkLogin(){
	var userName = sessionStorage.Username;
	console.log(sessionStorage);
	console.log(userName);
	if(userName==null){
		window.location="../";
	}
	//老权限
	// $.ajax({
	// 	"type" : 'post',
	// 	"url": "/getPermissionByUserIdAndPermissionId",
	// 	"data":{userName:userName,permissionId:4},
	// 	"success":function(data){
	// 		if(!data){
	// 			layer.alert('该账号没有员工管理的权限，请换账号重试!', {icon : 2});
	// 			window.location="../";
	// 		}
	//
	// 	}
	// });
	$.ajax({
		"type" : 'post',
		"url": "/getRoleAndProjectByUserName",
		"data":{userName:userName},
		async:false,
		success:function(data){
			console.log(data);
			var role=data[0].roleId;
			if(role!="12"){
				console.log("123");
				document.getElementById('informManage').style.display='none';
				document.getElementById('addUser').style.display='none';
				document.getElementById('roleChange').style.display='none';
			}
		}
	});
}


function getAssessmemt(){
	document.getElementById('Assessment').style.display='block';
	var cycle = $("#achievementTime").val();
	fillAssessmemt(cycle);
}

function exportAll(){

}

function Employee(data) {
	var o={
		basicwages:data.basicwages,
		department: data.department,
		peopleName:data.name,
		netPerformance:data.netPerformance,
		comprehensivePerformance:data.comprehensivePerformance,
		mealSupplement:data.mealSupplement,
		kaoqin:data.kaoqin,
		jiaban:data.jiaban,
		salaryJiaban:data.salaryJiaban,
		daiyu:2*data.basicwages,
		phoneAllowance:data.phoneAllowance,
		wagePayable:data.wagePayable,
		gongjijin:data.gongjijin,
		zhuanxiang:data.zhuanxiang,
		qitakouchu:data.qitakouchu,
		yanglao:data.yanglao,
		shiye:data.shiye,
		yiliao:data.yiliao,
		usernameS:data.userName,

		taxMonth:data.wagePayable-5000-data.yanglao-data.shiye-data.yiliao-data.gongjijin-data.zhuanxiang-data.qitakouchu,
	}
	return o;
}

function getColsByRole() {
	var role = sessionStorage.roleId;
	if (role=="15"){
		var cols = [[
			{field: 'zizengSalary', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengSalary'}
			, {field: 'peopleName', align: 'left', width: 90, title: '员工姓名'}
			, {field: 'netPerformance', align: 'left',title: '净绩效'}
			, {field: 'comprehensivePerformance', align: 'left',  title: '综合绩效'}
			, {field: 'kaoqin', align: 'left',  title: '考勤天数'}
			, {field: 'mealSupplement', align: 'left',  title: '餐补'}
			, {field: 'jiaban', align: 'left',  title: '加班天数'}
			, {field: 'salaryJiaban', align: 'left',  title: '加班工资'}
			, {field: 'daiyu', align: 'left',  title: '待遇标准'}
			, {field: 'phoneAllowance', align: 'left',  title: '通讯补助'}
			, {field: 'wagePayable', align: 'left',  title: '应发工资'}
			, {field: 'gongjijin', align: 'left',  title: '公积金'}
			, {field: 'zhuanxiang', align: 'left',  title: '专项扣除'}
			, {field: 'qitakouchu', align: 'left',  title: '其他扣除'}
			, {field: 'taxMonth', align: 'left',  title: '当月应纳税所得额'}
			, {field: 'taxTotal', align: 'left',  title: '累计应纳税所得额'}
			, {field: 'taxTotalSingle', align: 'left',  title: '累计个税'}
			, {field: 'taxMonthSingle', align: 'left',  title: '当月个税'}
			, {field: 'salaryActual', align: 'left',  title: '实发工资'}
			, {toolbar: '#barDemo', align: 'left',  title: '操作'}
		]];
	}
	else if(role=="12"){
		var cols = [[
			{field: 'zizengSalary', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengSalary'}
			, {field: 'peopleName', align: 'left', width: 90, title: '员工姓名'}
			, {field: 'netPerformance', align: 'left',title: '净绩效'}
			, {field: 'comprehensivePerformance', align: 'left',  title: '综合绩效'}
			, {field: 'kaoqin', align: 'left',  title: '考勤天数'}
			, {field: 'mealSupplement', align: 'left',  title: '餐补'}
			, {field: 'jiaban', align: 'left',  title: '加班天数'}
			, {field: 'salaryJiaban', align: 'left',  title: '加班工资'}
			, {field: 'daiyu', align: 'left',  title: '待遇标准'}
			, {field: 'phoneAllowance', align: 'left',  title: '通讯补助'}
			, {field: 'wagePayable', align: 'left',  title: '应发工资'}
			, {field: 'gongjijin', align: 'left',  title: '公积金'}
			, {field: 'zhuanxiang', align: 'left',  title: '专项扣除'}
			, {field: 'qitakouchu', align: 'left',  title: '其他扣除'}
			, {field: 'taxMonth', align: 'left',  title: '当月应纳税所得额'}
			, {field: 'taxTotal', align: 'left',  title: '累计应纳税所得额'}
			, {field: 'taxTotalSingle', align: 'left',  title: '累计个税'}
			, {field: 'taxMonthSingle', align: 'left',  title: '当月个税'}
			, {field: 'salaryActual', align: 'left',  title: '实发工资'}
		]];
	}
	else{
		var cols = [[
			{field: 'zizengSalary', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengSalary'}
			, {field: 'peopleName', align: 'left', width: 90, title: '员工姓名'}
			, {field: 'netPerformance', align: 'left',title: '净绩效'}
			, {field: 'comprehensivePerformance', align: 'left',  title: '综合绩效'}
			, {field: 'kaoqin', align: 'left',  title: '考勤天数'}
			, {field: 'mealSupplement', align: 'left',  title: '餐补'}
			, {field: 'jiaban', align: 'left',  title: '加班天数'}
			, {field: 'salaryJiaban', align: 'left',  title: '加班工资'}
			, {field: 'daiyu', align: 'left',  title: '待遇标准'}
			, {field: 'phoneAllowance', align: 'left',  title: '通讯补助'}
			, {field: 'wagePayable', align: 'left',  title: '应发工资'}
			, {field: 'gongjijin', align: 'left',  title: '公积金'}
			, {field: 'zhuanxiang', align: 'left',  title: '专项扣除'}
			, {field: 'qitakouchu', align: 'left',  title: '其他扣除'}
			, {field: 'taxMonth', align: 'left',  title: '当月应纳税所得额'}
			, {field: 'taxTotal', align: 'left',  title: '累计应纳税所得额'}
			, {field: 'taxTotalSingle', align: 'left',  title: '累计个税'}
			, {field: 'taxMonthSingle', align: 'left',  title: '当月个税'}
			, {field: 'salaryActual', align: 'left',  title: '实发工资'}
		]];
	}
	return cols;
}

function f() {

}

function getSalary(){
	var userName = sessionStorage.Username;

	var peopleName = new Array();
	var netPerformance = new Array();//净绩效
	var comprehensivePerformance = new Array();//综合绩效
	var kaoqin = new Array();//考勤
	var mealSupplement = new Array();//餐补
	var jiaban = new Array();//加班工时
	var salaryJiaban = new Array();//加班工资
	var daiyu = new Array();//待遇标准
	var phoneAllowance = new Array();//通讯补助
	var wagePayable = new Array();//应发工资
	var yanglao = new Array();//养老保险
	var shiye = new Array();//失业金
	var yiliao = new Array();//医疗保险
	var gongjijin = new Array();//公积金
	var zhuanxiang = new Array();//专项扣除
	var qitakouchu = new Array();//其他扣除
	var taxMonth = new Array();//当月应纳税
	var taxTotal = new Array();//累计应纳税
	var taxTotalSingle = new Array();//累积个税
	var taxMonthSingle = new Array();//当月个税
	var salaryActual = new Array();//实发工资

	var taxTem = new Array();
	var taxTotal2 = new Array();
	var taxTotalSingle2 = new Array();
	var usernameS = new Array();

	{
		var role= sessionStorage.roleId;
		document.getElementById('Salary').style.display='block';
		if(role=="15"){
			document.getElementById('changeC').style.display='';

			var now = new Date();
			var todayYear = now.getFullYear().toString();
			var monthNum = now.getMonth()+1;
			var todayMonth;
			if(monthNum<10){
				todayMonth = "0"+monthNum.toString();
			}
			else{
				todayMonth = monthNum.toString();
			}
			console.log(todayYear+todayMonth)
			layui.use('laydate', function(){
				var laydate = layui.laydate;
				//年月选择器
				$("#laborMonthSalary").remove();//移除后重新加载，因为LayDate不能二次渲染...
				$("#selectMonthSalary").html('<input type="text" class="layui-input" placeholder="请选择月份" id="laborMonthSalary" style="position: absolute;top:50px;left:100px;height:36px;width:150px;">');

				laydate.render({
					elem: '#laborMonthSalary'
					,type: 'month'
					,max:0
					,done:function (value,date,endDate) {
						// location.reload();
						var datetime=value;//真实年月
						var showMonth = datetime.substr(0,4)+"年"+datetime.substr(5,2)+"月";
						console.log(datetime);
						var YearDate = datetime.substr(0,4);
						var MonthDate = datetime.substr(5,2);
						console.log(MonthDate);
						// console.log(showMonth);
						$("#laborMonthSalary").val("");//此处打算清空月份选择器以便于使用自己定义的样式显示内容,但是很奇怪，这里没清掉。
						$('#laborMonthSalary').prop("placeholder",showMonth);

						if(todayYear==YearDate&&todayMonth==MonthDate){
							$.ajax({
								//通过年月获取员工工资信息
								// url: '/getWorkingHoursByProPeople',
								url: '/getSalary1',
								type: "POST",
								async:false,
								datatype: 'json',
								data:{
									datetime:datetime
								},
								success: function (data) {
									console.log(data);
									var employees = [];
									for (var i = 0; i < data.data.length; i++) {
										var empolyee = new Employee(data.data[i]);
										employees.push(empolyee);
									}
									console.log(employees);
									var dataLength=data.data.length;
									var peopleName = new Array();
									var netPerformance = new Array();//净绩效
									var comprehensivePerformance = new Array();//综合绩效
									var kaoqin = new Array();//考勤
									var mealSupplement = new Array();//餐补
									var jiaban = new Array();//加班工时
									var salaryJiaban = new Array();//加班工资
									var daiyu = new Array();//待遇标准
									var phoneAllowance = new Array();//通讯补助
									var wagePayable = new Array();//应发工资
									var yanglao = new Array();//养老保险
									var shiye = new Array();//失业金
									var yiliao = new Array();//医疗保险
									var gongjijin = new Array();//公积金
									var zhuanxiang = new Array();//专项扣除
									var qitakouchu = new Array();//其他扣除
									var taxMonth = new Array();//当月应纳税
									var taxTotal = new Array();//累计应纳税
									var taxTotalSingle = new Array();//累积个税
									var taxMonthSingle = new Array();//当月个税
									var salaryActual = new Array();//实发工资

									var taxTem = new Array();
									var taxTotal2 = new Array();
									var taxTotalSingle2 = new Array();
									var usernameS = new Array();

									for (var i=0;i<dataLength;i++){
										taxTotal[i]=0;
										taxTotalSingle[i]=0;
										taxTem[i]=0;
										taxTotal2[i]=0;
										taxTotalSingle2[i]=0;
									} ;


									for(var i=0;i<data.data.length;i++){
										peopleName[i]=data.data[i].name;
										netPerformance[i]=data.data[i].netPerformance;
										comprehensivePerformance[i]=data.data[i].comprehensivePerformance;
										mealSupplement[i]=data.data[i].mealSupplement;
										kaoqin[i]=data.data[i].kaoqin;
										jiaban[i]=data.data[i].jiaban;
										salaryJiaban[i]=data.data[i].salaryJiaban;
										daiyu[i]=2*data.data[i].basicwages;
										phoneAllowance[i]=data.data[i].phoneAllowance;
										wagePayable[i]=data.data[i].wagePayable;
										gongjijin[i]=data.data[i].gongjijin;
										zhuanxiang[i]=data.data[i].zhuanxiang;
										qitakouchu[i]=data.data[i].qitakouchu;
										// taxMonth[i]=data.data[i].tax1;
										yanglao[i]=data.data[i].yanglao;
										shiye[i]=data.data[i].shiye;
										yiliao[i]=data.data[i].yiliao;
										usernameS[i]=data.data[i].userName;

										taxMonth[i]=wagePayable[i]-5000-yanglao[i]-shiye[i]-yiliao[i]-gongjijin[i]-zhuanxiang[i]-qitakouchu[i];

										// console.log(data.data[i].wagePayable);
										// console.log(wagePayable[i]);
									}



									//计算个税
									var monthNum = parseInt(MonthDate);
									var yearNum = parseInt(YearDate);
									var cycleMonth;

									for(var j=1;j<=monthNum;j++)
									{
										if(j<10){
											cycleMonth = '0' + j.toString();

										}else {
											cycleMonth = j.toString();
										}

										$.ajax({
											//通过年月获取员工税信息

											url: '/getSalary2',
											type: "POST",
											async:false,
											datatype: 'json',
											data:{
												yearDate:YearDate,
												cycleMonth:cycleMonth,
												datetime:datetime,
											},
											success: function (data) {
												console.log(data);
												// console.log(taxTotal);
												for(var i=0;i<dataLength;i++){
													taxTotal[i] += parseInt(data.data[i].tax1);
													taxTem[i]=parseInt(data.data[i].tax1);
												}
												// console.log(taxTotal);
											}
										});
									}
									for(var i=0;i<dataLength;i++){
										taxTotal2[i]=taxTotal[i]-taxTem[i];
									}


									// console.log(cycleMonth);
									for(var i=0;i<dataLength;i++)
									{
										if(taxTotal[i]<0){
											taxTotal[i]=0;
											taxTotalSingle[i]=0;
										}else if(taxTotal[i]<36000){
											taxTotalSingle[i]=(0.03*taxTotal[i]).toFixed(2)
										}else if(taxTotal[i]<144000){
											taxTotalSingle[i]=(0.1*taxTotal[i]-2520).toFixed(2)
										}else if(taxTotal[i]<300000){
											taxTotalSingle[i]=(0.2*taxTotal[i]-16920).toFixed(2)
										}else if(taxTotal[i]<420000){
											taxTotalSingle[i]=(0.25*taxTotal[i]-31920).toFixed(2)
										}else if(taxTotal[i]<660000){
											taxTotalSingle[i]=(0.3*taxTotal[i]-52920).toFixed(2)
										}else if(taxTotal[i]<960000){
											taxTotalSingle[i]=(0.35*taxTotal[i]-85920).toFixed(2)
										}else{
											taxTotalSingle[i]=(0.4*taxTotal[i]-181920)
										};
										if(taxTotal2[i]<0){
											taxTotal2[i]=0;
											taxTotalSingle2[i]=0;
										}else if(taxTotal2[i]<36000){
											taxTotalSingle2[i]=(0.03*taxTotal2[i]).toFixed(2)
										}else if(taxTotal2[i]<144000){
											taxTotalSingle2[i]=(0.1*taxTotal2[i]-2520).toFixed(2)
										}else if(taxTotal2[i]<300000){
											taxTotalSingle2[i]=(0.2*taxTotal2[i]-16920).toFixed(2)
										}else if(taxTotal2[i]<420000){
											taxTotalSingle2[i]=(0.25*taxTotal2[i]-31920).toFixed(2)
										}else if(taxTotal2[i]<660000){
											taxTotalSingle2[i]=(0.3*taxTotal2[i]-52920).toFixed(2)
										}else if(taxTotal2[i]<960000){
											taxTotalSingle2[i]=(0.35*taxTotal2[i]-85920).toFixed(2)
										}else{
											taxTotalSingle2[i]=(0.4*taxTotal2[i]-181920)
										};
										taxMonthSingle[i]=taxTotalSingle[i]-taxTotalSingle2[i];



										salaryActual[i]=wagePayable[i]-yanglao[i]-shiye[i]-yiliao[i]-gongjijin[i]-taxMonthSingle[i]-qitakouchu[i];

									}


									layui.use('table', function () {
										var table = layui.table;
										var dataS = new Array();
										var colsInform = new getColsByRole();
										for(var i=0;i<dataLength;i++)
										{
											dataS.push({
												"peopleName":peopleName[i],
												"netPerformance":netPerformance[i],
												"comprehensivePerformance":comprehensivePerformance[i],
												"mealSupplement":mealSupplement[i],
												"kaoqin":kaoqin[i],
												"jiaban":jiaban[i],
												"salaryJiaban":salaryJiaban[i],
												"daiyu":daiyu[i],
												"phoneAllowance":phoneAllowance[i],
												"wagePayable":wagePayable[i],
												"gongjijin":gongjijin[i],
												"zhuanxiang":zhuanxiang[i],
												"qitakouchu":qitakouchu[i],
												"taxMonth":taxMonth[i],
												"taxTotal":taxTotal[i],
												"taxTotalSingle":taxTotalSingle[i],
												"taxMonthSingle":taxMonthSingle[i],
												"salaryActual":salaryActual[i],
												"usernameS":usernameS[i],
												"yanglao":yanglao[i],
												"shiye":shiye[i],
												"yiliao":yiliao[i],

											})
										}
										console.log(dataS)
										var userName = sessionStorage.Username;
										$.ajax({
											"type" : 'post',
											"url": "/getRoleAndProjectByUserName",
											"data":{userName:userName},
											"success":function(data){
												console.log(data);
												var role=data[0].roleId;
												document.getElementById('export').style.display = '';
												var ins1=table.render({
													elem: '#salaryTable'
													,data:dataS
													,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
													,defaultToolbar: [ 'exports', 'print']
													// ,cellMinWidth: 90
													,cols: colsInform
													// done:function type (res,curr,count) {
													// 	// 表头点击事件
													//
													// 	pageCurr=curr;
													// }
													, page: true
													,done:function (res,curr,count) {

														$.ajax({
															//通过年月获取员工工资信息
															// url: '/getWorkingHoursByProPeople',
															url: '/getSalary1all',
															type: "POST",
															async:false,
															datatype: 'json',
															data:{
																datetime:datetime
															},
															success: function (data) {
																console.log(data);
																var employees = [];
																for (var i = 0; i < data.data.length; i++) {
																	var empolyee = new Employee(data.data[i]);
																	employees.push(empolyee);
																}
																console.log(employees);
																var dataLength=data.data.length;
																var peopleName = new Array();
																var netPerformance = new Array();//净绩效
																var comprehensivePerformance = new Array();//综合绩效
																var kaoqin = new Array();//考勤
																var mealSupplement = new Array();//餐补
																var jiaban = new Array();//加班工时
																var salaryJiaban = new Array();//加班工资
																var daiyu = new Array();//待遇标准
																var phoneAllowance = new Array();//通讯补助
																var wagePayable = new Array();//应发工资
																var yanglao = new Array();//养老保险
																var shiye = new Array();//失业金
																var yiliao = new Array();//医疗保险
																var gongjijin = new Array();//公积金
																var zhuanxiang = new Array();//专项扣除
																var qitakouchu = new Array();//其他扣除
																var taxMonth = new Array();//当月应纳税
																var taxTotal = new Array();//累计应纳税
																var taxTotalSingle = new Array();//累积个税
																var taxMonthSingle = new Array();//当月个税
																var salaryActual = new Array();//实发工资

																var taxTem = new Array();
																var taxTotal2 = new Array();
																var taxTotalSingle2 = new Array();
																var usernameS = new Array();

																for (var i=0;i<dataLength;i++){
																	taxTotal[i]=0;
																	taxTotalSingle[i]=0;
																	taxTem[i]=0;
																	taxTotal2[i]=0;
																	taxTotalSingle2[i]=0;
																} ;


																for(var i=0;i<data.data.length;i++){
																	peopleName[i]=data.data[i].name;
																	netPerformance[i]=data.data[i].netPerformance;
																	comprehensivePerformance[i]=data.data[i].comprehensivePerformance;
																	mealSupplement[i]=data.data[i].mealSupplement;
																	kaoqin[i]=data.data[i].kaoqin;
																	jiaban[i]=data.data[i].jiaban;
																	salaryJiaban[i]=data.data[i].salaryJiaban;
																	daiyu[i]=2*data.data[i].basicwages;
																	phoneAllowance[i]=data.data[i].phoneAllowance;
																	wagePayable[i]=data.data[i].wagePayable;
																	gongjijin[i]=data.data[i].gongjijin;
																	zhuanxiang[i]=data.data[i].zhuanxiang;
																	qitakouchu[i]=data.data[i].qitakouchu;
																	// taxMonth[i]=data.data[i].tax1;
																	yanglao[i]=data.data[i].yanglao;
																	shiye[i]=data.data[i].shiye;
																	yiliao[i]=data.data[i].yiliao;
																	usernameS[i]=data.data[i].userName;

																	taxMonth[i]=wagePayable[i]-5000-yanglao[i]-shiye[i]-yiliao[i]-gongjijin[i]-zhuanxiang[i]-qitakouchu[i];

																	// console.log(data.data[i].wagePayable);
																	// console.log(wagePayable[i]);
																}



																//计算个税
																var monthNum = parseInt(MonthDate);
																var yearNum = parseInt(YearDate);
																var cycleMonth;

																for(var j=1;j<=monthNum;j++)
																{
																	if(j<10){
																		cycleMonth = '0' + j.toString();

																	}else {
																		cycleMonth = j.toString();
																	}

																	$.ajax({
																		//通过年月获取员工税信息

																		url: '/getSalary2',
																		type: "POST",
																		async:false,
																		datatype: 'json',
																		data:{
																			yearDate:YearDate,
																			cycleMonth:cycleMonth,
																			datetime:datetime,
																		},
																		success: function (data) {
																			console.log(data);
																			// console.log(taxTotal);
																			for(var i=0;i<dataLength;i++){
																				taxTotal[i] += parseInt(data.data[i].tax1);
																				taxTem[i]=parseInt(data.data[i].tax1);
																			}
																			// console.log(taxTotal);
																		}
																	});
																}
																for(var i=0;i<dataLength;i++){
																	taxTotal2[i]=taxTotal[i]-taxTem[i];
																}


																// console.log(cycleMonth);
																for(var i=0;i<dataLength;i++)
																{
																	if(taxTotal[i]<0){
																		taxTotal[i]=0;
																		taxTotalSingle[i]=0;
																	}else if(taxTotal[i]<36000){
																		taxTotalSingle[i]=(0.03*taxTotal[i]).toFixed(2)
																	}else if(taxTotal[i]<144000){
																		taxTotalSingle[i]=(0.1*taxTotal[i]-2520).toFixed(2)
																	}else if(taxTotal[i]<300000){
																		taxTotalSingle[i]=(0.2*taxTotal[i]-16920).toFixed(2)
																	}else if(taxTotal[i]<420000){
																		taxTotalSingle[i]=(0.25*taxTotal[i]-31920).toFixed(2)
																	}else if(taxTotal[i]<660000){
																		taxTotalSingle[i]=(0.3*taxTotal[i]-52920).toFixed(2)
																	}else if(taxTotal[i]<960000){
																		taxTotalSingle[i]=(0.35*taxTotal[i]-85920).toFixed(2)
																	}else{
																		taxTotalSingle[i]=(0.4*taxTotal[i]-181920)
																	};
																	if(taxTotal2[i]<0){
																		taxTotal2[i]=0;
																		taxTotalSingle2[i]=0;
																	}else if(taxTotal2[i]<36000){
																		taxTotalSingle2[i]=(0.03*taxTotal2[i]).toFixed(2)
																	}else if(taxTotal2[i]<144000){
																		taxTotalSingle2[i]=(0.1*taxTotal2[i]-2520).toFixed(2)
																	}else if(taxTotal2[i]<300000){
																		taxTotalSingle2[i]=(0.2*taxTotal2[i]-16920).toFixed(2)
																	}else if(taxTotal2[i]<420000){
																		taxTotalSingle2[i]=(0.25*taxTotal2[i]-31920).toFixed(2)
																	}else if(taxTotal2[i]<660000){
																		taxTotalSingle2[i]=(0.3*taxTotal2[i]-52920).toFixed(2)
																	}else if(taxTotal2[i]<960000){
																		taxTotalSingle2[i]=(0.35*taxTotal2[i]-85920).toFixed(2)
																	}else{
																		taxTotalSingle2[i]=(0.4*taxTotal2[i]-181920)
																	};
																	taxMonthSingle[i]=taxTotalSingle[i]-taxTotalSingle2[i];



																	salaryActual[i]=wagePayable[i]-yanglao[i]-shiye[i]-yiliao[i]-gongjijin[i]-taxMonthSingle[i]-qitakouchu[i];

																}


																layui.use('table', function () {
																	var table = layui.table;
																	var dataS = new Array();
																	var colsInform = new getColsByRole();
																	for(var i=0;i<dataLength;i++)
																	{
																		dataS.push({
																			"peopleName":peopleName[i],
																			"netPerformance":netPerformance[i],
																			"comprehensivePerformance":comprehensivePerformance[i],
																			"mealSupplement":mealSupplement[i],
																			"kaoqin":kaoqin[i],
																			"jiaban":jiaban[i],
																			"salaryJiaban":salaryJiaban[i],
																			"daiyu":daiyu[i],
																			"phoneAllowance":phoneAllowance[i],
																			"wagePayable":wagePayable[i],
																			"gongjijin":gongjijin[i],
																			"zhuanxiang":zhuanxiang[i],
																			"qitakouchu":qitakouchu[i],
																			"taxMonth":taxMonth[i],
																			"taxTotal":taxTotal[i],
																			"taxTotalSingle":taxTotalSingle[i],
																			"taxMonthSingle":taxMonthSingle[i],
																			"salaryActual":salaryActual[i],
																			"usernameS":usernameS[i],
																			"yanglao":yanglao[i],
																			"shiye":shiye[i],
																			"yiliao":yiliao[i],

																		})
																	}
																	// console.log(dataS)
																	var userName = sessionStorage.Username;
																	$.ajax({
																		"type" : 'post',
																		"url": "/getRoleAndProjectByUserName",
																		"data":{userName:userName},
																		"success":function(data){
																			console.log(data);
																			var role=data[0].roleId;
																			// document.getElementById('export').style.display = '';
																			var ins1;
																			ins1=table.render({
																				elem: '#salaryTableAll'
																				,data:dataS
																				,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
																				,defaultToolbar: [ 'exports', 'print']
																				// ,cellMinWidth: 90
																				,cols: [[
																					{field: 'zizengSalary', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengSalaryAll'}
																					, {field: 'peopleName', align: 'left', width: 90, title: '员工姓名'}
																					, {field: 'netPerformance', align: 'left',title: '净绩效'}
																					, {field: 'comprehensivePerformance', align: 'left',  title: '综合绩效'}
																					, {field: 'kaoqin', align: 'left',  title: '考勤天数'}
																					, {field: 'mealSupplement', align: 'left',  title: '餐补'}
																					, {field: 'jiaban', align: 'left',  title: '加班天数'}
																					, {field: 'salaryJiaban', align: 'left',  title: '加班工资'}
																					, {field: 'daiyu', align: 'left',  title: '待遇标准'}
																					, {field: 'phoneAllowance', align: 'left',  title: '通讯补助'}
																					, {field: 'wagePayable', align: 'left',  title: '应发工资'}
																					, {field: 'gongjijin', align: 'left',  title: '公积金'}
																					, {field: 'zhuanxiang', align: 'left',  title: '专项扣除'}
																					, {field: 'qitakouchu', align: 'left',  title: '其他扣除'}
																					, {field: 'taxMonth', align: 'left',  title: '当月应纳税所得额'}
																					, {field: 'taxTotal', align: 'left',  title: '累计应纳税所得额'}
																					, {field: 'taxTotalSingle', align: 'left',  title: '累计个税'}
																					, {field: 'taxMonthSingle', align: 'left',  title: '当月个税'}
																					, {field: 'salaryActual', align: 'left',  title: '实发工资'}
																					, {toolbar: '#barDemoAll', align: 'left',  title: '操作'}
																				]]
																				// done:function type (res,curr,count) {
																				// 	// 表头点击事件
																				//
																				// 	pageCurr=curr;
																				// }
																				, limit:10000
																				, page: true
																				,done:function (res,curr,count) {
																					document.getElementById('table2').style.display = 'none';
																					console.log(res);
																					var exportData=res.data;
																					console.log(exportData);

																					$("#export").click(function(){
																						table.exportFile(ins1.config.id,exportData,'xls')
																						location.reload();
																						table.reload('salaryTableAll',{
																							data:[],
																						});
																						console.log("success")
																						// getSalary();
																						// ins1='';
																						// exportData=null;
																						// document.getElementById("table2").reset();
																						// $('#table2').reset();
																					})
																					document.getElementById('Salary').style.display = 'block';
																					document.getElementById('changeC').style.display = '';
																				}
																			});
																		}
																	});
																	table.on('tool(salaryTable)', function (obj) {
																		var data = obj.data;
																		console.log(data);
																		if (obj.event === 'edit') {
																			console.log(data);
																			$("#sid").val(data.usernameS);
																			$("#tongxunbuzhu").val(data.phoneAllowance);
																			$("#yanglaobaoxian").val(data.yanglao);
																			$("#shiyejin").val(data.shiye);
																			$("#yiliaobaoxian").val(data.yiliao);
																			$("#gongjijin").val(data.gongjijin);
																			$("#zhuanxiang").val(data.zhuanxiang);
																			$("#qitakouchu").val(data.qitakouchu);
																			document.getElementById('updateSalary').style.display = 'block';
																		}
																	});
																});

															}
														});


													}
												});
											}
										});
										table.on('tool(salaryTable)', function (obj) {
											var data = obj.data;
											console.log(data);
											if (obj.event === 'edit') {
												console.log(data);
												$("#sid").val(data.usernameS);
												$("#tongxunbuzhu").val(data.phoneAllowance);
												$("#yanglaobaoxian").val(data.yanglao);
												$("#shiyejin").val(data.shiye);
												$("#yiliaobaoxian").val(data.yiliao);
												$("#gongjijin").val(data.gongjijin);
												$("#zhuanxiang").val(data.zhuanxiang);
												$("#qitakouchu").val(data.qitakouchu);
												document.getElementById('updateSalary').style.display = 'block';
											}
										});
									});
								}
							});
						}
						else{
							$.ajax({
								//通过年月获取员工工资信息
								// url: '/getWorkingHoursByProPeople',
								url: '/getSalary1',
								type: "POST",
								async:false,
								datatype: 'json',
								data:{
									datetime:datetime
								},
								success: function (data) {
									console.log(data);
									var dataLength=data.data.length;

									for (var i=0;i<dataLength;i++){
										taxTotal[i]=0;
										taxTotalSingle[i]=0;
										taxTem[i]=0;
										taxTotal2[i]=0;
										taxTotalSingle2[i]=0;
									} ;


									for(var i=0;i<data.data.length;i++){
										peopleName[i]=data.data[i].name;
										netPerformance[i]=data.data[i].netPerformance;
										comprehensivePerformance[i]=data.data[i].comprehensivePerformance;
										mealSupplement[i]=data.data[i].mealSupplement;
										kaoqin[i]=data.data[i].kaoqin;
										jiaban[i]=data.data[i].jiaban;
										salaryJiaban[i]=data.data[i].salaryJiaban;
										daiyu[i]=2*data.data[i].basicwages;
										phoneAllowance[i]=data.data[i].phoneAllowance;
										wagePayable[i]=data.data[i].wagePayable;
										gongjijin[i]=data.data[i].gongjijin;
										zhuanxiang[i]=data.data[i].zhuanxiang;
										qitakouchu[i]=data.data[i].qitakouchu;
										// taxMonth[i]=data.data[i].tax1;
										yanglao[i]=data.data[i].yanglao;
										shiye[i]=data.data[i].shiye;
										yiliao[i]=data.data[i].yiliao;
										usernameS[i]=data.data[i].userName;

										taxMonth[i]=wagePayable[i]-5000-yanglao[i]-shiye[i]-yiliao[i]-gongjijin[i]-zhuanxiang[i]-qitakouchu[i];

										// console.log(data.data[i].wagePayable);
										// console.log(wagePayable[i]);
									}



									//计算个税
									var monthNum = parseInt(MonthDate);
									var yearNum = parseInt(YearDate);
									var cycleMonth;

									for(var j=1;j<=monthNum;j++)
									{
										if(j<10){
											cycleMonth = '0' + j.toString();

										}else {
											cycleMonth = j.toString();
										}

										$.ajax({
											//通过年月获取员工税信息

											url: '/getSalary2',
											type: "POST",
											async:false,
											datatype: 'json',
											data:{
												yearDate:YearDate,
												cycleMonth:cycleMonth,
												datetime:datetime,
											},
											success: function (data) {
												console.log(data);
												// console.log(taxTotal);
												for(var i=0;i<dataLength;i++){
													taxTotal[i] += parseInt(data.data[i].tax1);
													taxTem[i]=parseInt(data.data[i].tax1);
												}
												// console.log(taxTotal);
											}
										});
									}
									for(var i=0;i<dataLength;i++){
										taxTotal2[i]=taxTotal[i]-taxTem[i];
									}


									// console.log(cycleMonth);
									for(var i=0;i<dataLength;i++)
									{
										if(taxTotal[i]<0){
											taxTotal[i]=0;
											taxTotalSingle[i]=0;
										}else if(taxTotal[i]<36000){
											taxTotalSingle[i]=(0.03*taxTotal[i]).toFixed(2)
										}else if(taxTotal[i]<144000){
											taxTotalSingle[i]=(0.1*taxTotal[i]-2520).toFixed(2)
										}else if(taxTotal[i]<300000){
											taxTotalSingle[i]=(0.2*taxTotal[i]-16920).toFixed(2)
										}else if(taxTotal[i]<420000){
											taxTotalSingle[i]=(0.25*taxTotal[i]-31920).toFixed(2)
										}else if(taxTotal[i]<660000){
											taxTotalSingle[i]=(0.3*taxTotal[i]-52920).toFixed(2)
										}else if(taxTotal[i]<960000){
											taxTotalSingle[i]=(0.35*taxTotal[i]-85920).toFixed(2)
										}else{
											taxTotalSingle[i]=(0.4*taxTotal[i]-181920)
										};
										if(taxTotal2[i]<0){
											taxTotal2[i]=0;
											taxTotalSingle2[i]=0;
										}else if(taxTotal2[i]<36000){
											taxTotalSingle2[i]=(0.03*taxTotal2[i]).toFixed(2)
										}else if(taxTotal2[i]<144000){
											taxTotalSingle2[i]=(0.1*taxTotal2[i]-2520).toFixed(2)
										}else if(taxTotal2[i]<300000){
											taxTotalSingle2[i]=(0.2*taxTotal2[i]-16920).toFixed(2)
										}else if(taxTotal2[i]<420000){
											taxTotalSingle2[i]=(0.25*taxTotal2[i]-31920).toFixed(2)
										}else if(taxTotal2[i]<660000){
											taxTotalSingle2[i]=(0.3*taxTotal2[i]-52920).toFixed(2)
										}else if(taxTotal2[i]<960000){
											taxTotalSingle2[i]=(0.35*taxTotal2[i]-85920).toFixed(2)
										}else{
											taxTotalSingle2[i]=(0.4*taxTotal2[i]-181920)
										};
										taxMonthSingle[i]=taxTotalSingle[i]-taxTotalSingle2[i];



										salaryActual[i]=wagePayable[i]-yanglao[i]-shiye[i]-yiliao[i]-gongjijin[i]-taxMonthSingle[i]-qitakouchu[i];

									}


									layui.use('table', function () {
										var table = layui.table;
										var dataS = new Array();
										for(var i=0;i<dataLength;i++)
										{
											dataS.push({
												"peopleName":peopleName[i],
												"netPerformance":netPerformance[i],
												"comprehensivePerformance":comprehensivePerformance[i],
												"mealSupplement":mealSupplement[i],
												"kaoqin":kaoqin[i],
												"jiaban":jiaban[i],
												"salaryJiaban":salaryJiaban[i],
												"daiyu":daiyu[i],
												"phoneAllowance":phoneAllowance[i],
												"wagePayable":wagePayable[i],
												"gongjijin":gongjijin[i],
												"zhuanxiang":zhuanxiang[i],
												"qitakouchu":qitakouchu[i],
												"taxMonth":taxMonth[i],
												"taxTotal":taxTotal[i],
												"taxTotalSingle":taxTotalSingle[i],
												"taxMonthSingle":taxMonthSingle[i],
												"salaryActual":salaryActual[i],
												"usernameS":usernameS[i],
												"yanglao":yanglao[i],
												"shiye":shiye[i],
												"yiliao":yiliao[i],

											})
										}
										console.log(dataS)
										var userName = sessionStorage.Username;
										$.ajax({
											"type" : 'post',
											"url": "/getRoleAndProjectByUserName",
											"data":{userName:userName},
											"success":function(data){
												console.log(data);
												var role=data[0].roleId;
												// var exportData;
												document.getElementById('export').style.display = '';
												var ins1 = table.render({
													elem: '#salaryTable'
													,data:dataS
													,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
													,defaultToolbar: [ 'exports', 'print']
													// ,cellMinWidth: 90
													,cols: getColsByRole()
													, page: true
													,done:function (res,curr,count) {
														$.ajax({
															//通过年月获取员工工资信息
															// url: '/getWorkingHoursByProPeople',
															url: '/getSalary1all',
															type: "POST",
															async:false,
															datatype: 'json',
															data:{
																datetime:datetime
															},
															success: function (data) {
																console.log(data);
																var employees = [];
																for (var i = 0; i < data.data.length; i++) {
																	var empolyee = new Employee(data.data[i]);
																	employees.push(empolyee);
																}
																console.log(employees);
																var dataLength=data.data.length;
																var peopleName = new Array();
																var netPerformance = new Array();//净绩效
																var comprehensivePerformance = new Array();//综合绩效
																var kaoqin = new Array();//考勤
																var mealSupplement = new Array();//餐补
																var jiaban = new Array();//加班工时
																var salaryJiaban = new Array();//加班工资
																var daiyu = new Array();//待遇标准
																var phoneAllowance = new Array();//通讯补助
																var wagePayable = new Array();//应发工资
																var yanglao = new Array();//养老保险
																var shiye = new Array();//失业金
																var yiliao = new Array();//医疗保险
																var gongjijin = new Array();//公积金
																var zhuanxiang = new Array();//专项扣除
																var qitakouchu = new Array();//其他扣除
																var taxMonth = new Array();//当月应纳税
																var taxTotal = new Array();//累计应纳税
																var taxTotalSingle = new Array();//累积个税
																var taxMonthSingle = new Array();//当月个税
																var salaryActual = new Array();//实发工资

																var taxTem = new Array();
																var taxTotal2 = new Array();
																var taxTotalSingle2 = new Array();
																var usernameS = new Array();

																for (var i=0;i<dataLength;i++){
																	taxTotal[i]=0;
																	taxTotalSingle[i]=0;
																	taxTem[i]=0;
																	taxTotal2[i]=0;
																	taxTotalSingle2[i]=0;
																} ;


																for(var i=0;i<data.data.length;i++){
																	peopleName[i]=data.data[i].name;
																	netPerformance[i]=data.data[i].netPerformance;
																	comprehensivePerformance[i]=data.data[i].comprehensivePerformance;
																	mealSupplement[i]=data.data[i].mealSupplement;
																	kaoqin[i]=data.data[i].kaoqin;
																	jiaban[i]=data.data[i].jiaban;
																	salaryJiaban[i]=data.data[i].salaryJiaban;
																	daiyu[i]=2*data.data[i].basicwages;
																	phoneAllowance[i]=data.data[i].phoneAllowance;
																	wagePayable[i]=data.data[i].wagePayable;
																	gongjijin[i]=data.data[i].gongjijin;
																	zhuanxiang[i]=data.data[i].zhuanxiang;
																	qitakouchu[i]=data.data[i].qitakouchu;
																	// taxMonth[i]=data.data[i].tax1;
																	yanglao[i]=data.data[i].yanglao;
																	shiye[i]=data.data[i].shiye;
																	yiliao[i]=data.data[i].yiliao;
																	usernameS[i]=data.data[i].userName;

																	taxMonth[i]=wagePayable[i]-5000-yanglao[i]-shiye[i]-yiliao[i]-gongjijin[i]-zhuanxiang[i]-qitakouchu[i];

																	// console.log(data.data[i].wagePayable);
																	// console.log(wagePayable[i]);
																}



																//计算个税
																var monthNum = parseInt(MonthDate);
																var yearNum = parseInt(YearDate);
																var cycleMonth;

																for(var j=1;j<=monthNum;j++)
																{
																	if(j<10){
																		cycleMonth = '0' + j.toString();

																	}else {
																		cycleMonth = j.toString();
																	}

																	$.ajax({
																		//通过年月获取员工税信息

																		url: '/getSalary2',
																		type: "POST",
																		async:false,
																		datatype: 'json',
																		data:{
																			yearDate:YearDate,
																			cycleMonth:cycleMonth,
																			datetime:datetime,
																		},
																		success: function (data) {
																			console.log(data);
																			// console.log(taxTotal);
																			for(var i=0;i<dataLength;i++){
																				taxTotal[i] += parseInt(data.data[i].tax1);
																				taxTem[i]=parseInt(data.data[i].tax1);
																			}
																			// console.log(taxTotal);
																		}
																	});
																}
																for(var i=0;i<dataLength;i++){
																	taxTotal2[i]=taxTotal[i]-taxTem[i];
																}


																// console.log(cycleMonth);
																for(var i=0;i<dataLength;i++)
																{
																	if(taxTotal[i]<0){
																		taxTotal[i]=0;
																		taxTotalSingle[i]=0;
																	}else if(taxTotal[i]<36000){
																		taxTotalSingle[i]=(0.03*taxTotal[i]).toFixed(2)
																	}else if(taxTotal[i]<144000){
																		taxTotalSingle[i]=(0.1*taxTotal[i]-2520).toFixed(2)
																	}else if(taxTotal[i]<300000){
																		taxTotalSingle[i]=(0.2*taxTotal[i]-16920).toFixed(2)
																	}else if(taxTotal[i]<420000){
																		taxTotalSingle[i]=(0.25*taxTotal[i]-31920).toFixed(2)
																	}else if(taxTotal[i]<660000){
																		taxTotalSingle[i]=(0.3*taxTotal[i]-52920).toFixed(2)
																	}else if(taxTotal[i]<960000){
																		taxTotalSingle[i]=(0.35*taxTotal[i]-85920).toFixed(2)
																	}else{
																		taxTotalSingle[i]=(0.4*taxTotal[i]-181920)
																	};
																	if(taxTotal2[i]<0){
																		taxTotal2[i]=0;
																		taxTotalSingle2[i]=0;
																	}else if(taxTotal2[i]<36000){
																		taxTotalSingle2[i]=(0.03*taxTotal2[i]).toFixed(2)
																	}else if(taxTotal2[i]<144000){
																		taxTotalSingle2[i]=(0.1*taxTotal2[i]-2520).toFixed(2)
																	}else if(taxTotal2[i]<300000){
																		taxTotalSingle2[i]=(0.2*taxTotal2[i]-16920).toFixed(2)
																	}else if(taxTotal2[i]<420000){
																		taxTotalSingle2[i]=(0.25*taxTotal2[i]-31920).toFixed(2)
																	}else if(taxTotal2[i]<660000){
																		taxTotalSingle2[i]=(0.3*taxTotal2[i]-52920).toFixed(2)
																	}else if(taxTotal2[i]<960000){
																		taxTotalSingle2[i]=(0.35*taxTotal2[i]-85920).toFixed(2)
																	}else{
																		taxTotalSingle2[i]=(0.4*taxTotal2[i]-181920)
																	};
																	taxMonthSingle[i]=taxTotalSingle[i]-taxTotalSingle2[i];



																	salaryActual[i]=wagePayable[i]-yanglao[i]-shiye[i]-yiliao[i]-gongjijin[i]-taxMonthSingle[i]-qitakouchu[i];

																}


																layui.use('table', function () {
																	var table = layui.table;
																	var dataS = new Array();
																	var colsInform = new getColsByRole();
																	for(var i=0;i<dataLength;i++)
																	{
																		dataS.push({
																			"peopleName":peopleName[i],
																			"netPerformance":netPerformance[i],
																			"comprehensivePerformance":comprehensivePerformance[i],
																			"mealSupplement":mealSupplement[i],
																			"kaoqin":kaoqin[i],
																			"jiaban":jiaban[i],
																			"salaryJiaban":salaryJiaban[i],
																			"daiyu":daiyu[i],
																			"phoneAllowance":phoneAllowance[i],
																			"wagePayable":wagePayable[i],
																			"gongjijin":gongjijin[i],
																			"zhuanxiang":zhuanxiang[i],
																			"qitakouchu":qitakouchu[i],
																			"taxMonth":taxMonth[i],
																			"taxTotal":taxTotal[i],
																			"taxTotalSingle":taxTotalSingle[i],
																			"taxMonthSingle":taxMonthSingle[i],
																			"salaryActual":salaryActual[i],
																			"usernameS":usernameS[i],
																			"yanglao":yanglao[i],
																			"shiye":shiye[i],
																			"yiliao":yiliao[i],

																		})
																	}
																	// console.log(dataS)
																	var userName = sessionStorage.Username;
																	$.ajax({
																		"type" : 'post',
																		"url": "/getRoleAndProjectByUserName",
																		"data":{userName:userName},
																		"success":function(data){
																			console.log(data);
																			var role=data[0].roleId;
																			// document.getElementById('export').style.display = '';
																			var ins1;
																				ins1=table.render({
																				elem: '#salaryTableAll'
																				,data:dataS
																				,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
																				,defaultToolbar: [ 'exports', 'print']
																				// ,cellMinWidth: 90
																				,cols: [[
																					{field: 'zizengSalary', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengSalaryAll'}
																					, {field: 'peopleName', align: 'left', width: 90, title: '员工姓名'}
																					, {field: 'netPerformance', align: 'left',title: '净绩效'}
																					, {field: 'comprehensivePerformance', align: 'left',  title: '综合绩效'}
																					, {field: 'kaoqin', align: 'left',  title: '考勤天数'}
																					, {field: 'mealSupplement', align: 'left',  title: '餐补'}
																					, {field: 'jiaban', align: 'left',  title: '加班天数'}
																					, {field: 'salaryJiaban', align: 'left',  title: '加班工资'}
																					, {field: 'daiyu', align: 'left',  title: '待遇标准'}
																					, {field: 'phoneAllowance', align: 'left',  title: '通讯补助'}
																					, {field: 'wagePayable', align: 'left',  title: '应发工资'}
																					, {field: 'gongjijin', align: 'left',  title: '公积金'}
																					, {field: 'zhuanxiang', align: 'left',  title: '专项扣除'}
																					, {field: 'qitakouchu', align: 'left',  title: '其他扣除'}
																					, {field: 'taxMonth', align: 'left',  title: '当月应纳税所得额'}
																					, {field: 'taxTotal', align: 'left',  title: '累计应纳税所得额'}
																					, {field: 'taxTotalSingle', align: 'left',  title: '累计个税'}
																					, {field: 'taxMonthSingle', align: 'left',  title: '当月个税'}
																					, {field: 'salaryActual', align: 'left',  title: '实发工资'}
																					, {toolbar: '#barDemoAll', align: 'left',  title: '操作'}
																				]]
																				// done:function type (res,curr,count) {
																				// 	// 表头点击事件
																				//
																				// 	pageCurr=curr;
																				// }
																				, limit:10000
																				, page: true
																				,done:function (res,curr,count) {
																					document.getElementById('table2').style.display = 'none';
																					console.log(res);
																					var exportData=res.data;
																					console.log(exportData);

																					console.log(location.href)
																					$("#export").click(function(){
																						table.exportFile(ins1.config.id,exportData,'xls')
																						location.reload();
																						table.reload('salaryTableAll',{
																							data:[],
																						});
																						console.log("success")
																						// ins1='';
																						// exportData=null;
																						// $('#table2').reset();
																						// document.getElementById("table2").reset();
																					})
																					// document.getElementById('Salary').style.display = 'block';
																					// document.getElementById('changeC').style.display = '';
																				}
																			});
																		}
																	});
																	table.on('tool(salaryTable)', function (obj) {
																		var data = obj.data;
																		console.log(data);
																		if (obj.event === 'edit') {
																			console.log(data);
																			$("#sid").val(data.usernameS);
																			$("#tongxunbuzhu").val(data.phoneAllowance);
																			$("#yanglaobaoxian").val(data.yanglao);
																			$("#shiyejin").val(data.shiye);
																			$("#yiliaobaoxian").val(data.yiliao);
																			$("#gongjijin").val(data.gongjijin);
																			$("#zhuanxiang").val(data.zhuanxiang);
																			$("#qitakouchu").val(data.qitakouchu);
																			document.getElementById('updateSalary').style.display = 'block';
																		}
																	});
																});

															}
														});
													}
												});

											}
										});


										table.on('tool(salaryTable)', function (obj) {
											var data = obj.data;
											console.log(data);
											if (obj.event === 'edit') {
												console.log(data);
												$("#sid").val(data.usernameS);
												$("#tongxunbuzhu").val(data.phoneAllowance);
												$("#yanglaobaoxian").val(data.yanglao);
												$("#shiyejin").val(data.shiye);
												$("#yiliaobaoxian").val(data.yiliao);
												$("#gongjijin").val(data.gongjijin);
												$("#zhuanxiang").val(data.zhuanxiang);
												$("#qitakouchu").val(data.qitakouchu);
												document.getElementById('updateSalary').style.display = 'block';
											}
										});
									});
								}
							});
						}
					}
				});
			});
		}
		else if(role=="12") {
			layui.use('laydate', function(){
				var laydate = layui.laydate;
				//年月选择器
				$("#laborMonthSalary").remove();//移除后重新加载，因为LayDate不能二次渲染...
				$("#selectMonthSalary").html('<input type="text" class="layui-input" placeholder="请选择月份" id="laborMonthSalary" style="position: absolute;top:50px;left:100px;height:36px;width:150px;">');

				laydate.render({
					elem: '#laborMonthSalary'
					,type: 'month'
					,max:0
					,done:function (value,date,endDate) {
						var datetime=value;//真实年月
						var showMonth = datetime.substr(0,4)+"年"+datetime.substr(5,2)+"月";
						console.log(datetime);
						var YearDate = datetime.substr(0,4);
						var MonthDate = datetime.substr(5,2);
						console.log(MonthDate);
						// console.log(showMonth);
						$("#laborMonthSalary").val("");//此处打算清空月份选择器以便于使用自己定义的样式显示内容,但是很奇怪，这里没清掉。
						$('#laborMonthSalary').prop("placeholder",showMonth);

						$.ajax({
							//通过年月获取员工工资信息
							// url: '/getWorkingHoursByProPeople',
							url: '/getSalary1',
							type: "POST",
							async:false,
							datatype: 'json',
							data:{
								datetime:datetime
							},
							success: function (data) {
								console.log(data);
								var dataLength=data.data.length;

								for (var i=0;i<dataLength;i++){
									taxTotal[i]=0;
									taxTotalSingle[i]=0;
									taxTem[i]=0;
									taxTotal2[i]=0;
									taxTotalSingle2[i]=0;
								} ;


								for(var i=0;i<data.data.length;i++){
									peopleName[i]=data.data[i].name;
									netPerformance[i]=data.data[i].netPerformance;
									comprehensivePerformance[i]=data.data[i].comprehensivePerformance;
									mealSupplement[i]=data.data[i].mealSupplement;
									kaoqin[i]=data.data[i].kaoqin;
									jiaban[i]=data.data[i].jiaban;
									salaryJiaban[i]=data.data[i].salaryJiaban;
									daiyu[i]=2*data.data[i].basicwages;
									phoneAllowance[i]=data.data[i].phoneAllowance;
									wagePayable[i]=data.data[i].wagePayable;
									gongjijin[i]=data.data[i].gongjijin;
									zhuanxiang[i]=data.data[i].zhuanxiang;
									qitakouchu[i]=data.data[i].qitakouchu;
									// taxMonth[i]=data.data[i].tax1;
									yanglao[i]=data.data[i].yanglao;
									shiye[i]=data.data[i].shiye;
									yiliao[i]=data.data[i].yiliao;
									usernameS[i]=data.data[i].userName;

									taxMonth[i]=wagePayable[i]-5000-yanglao[i]-shiye[i]-yiliao[i]-gongjijin[i]-zhuanxiang[i]-qitakouchu[i];

									console.log(data.data[i].wagePayable);
									console.log(wagePayable[i]);
								}



								//计算个税
								var monthNum = parseInt(MonthDate);
								var yearNum = parseInt(YearDate);
								var cycleMonth;

								for(var j=1;j<=monthNum;j++)
								{
									if(j<10){
										cycleMonth = '0' + j.toString();

									}else {
										cycleMonth = j.toString();
									}

									$.ajax({
										//通过年月获取员工税信息

										url: '/getSalary2',
										type: "POST",
										async:false,
										datatype: 'json',
										data:{
											yearDate:YearDate,
											cycleMonth:cycleMonth,
											datetime:datetime,
										},
										success: function (data) {
											console.log(data);
											// console.log(taxTotal);
											for(var i=0;i<dataLength;i++){
												taxTotal[i] += parseInt(data.data[i].tax1);
												taxTem[i]=parseInt(data.data[i].tax1);
											}
											// console.log(taxTotal);
										}
									});
								}
								for(var i=0;i<dataLength;i++){
									taxTotal2[i]=taxTotal[i]-taxTem[i];
								}


								// console.log(cycleMonth);
								for(var i=0;i<dataLength;i++)
								{
									if(taxTotal[i]<0){
										taxTotal[i]=0;
										taxTotalSingle[i]=0;
									}else if(taxTotal[i]<36000){
										taxTotalSingle[i]=(0.03*taxTotal[i]).toFixed(2)
									}else if(taxTotal[i]<144000){
										taxTotalSingle[i]=(0.1*taxTotal[i]-2520).toFixed(2)
									}else if(taxTotal[i]<300000){
										taxTotalSingle[i]=(0.2*taxTotal[i]-16920).toFixed(2)
									}else if(taxTotal[i]<420000){
										taxTotalSingle[i]=(0.25*taxTotal[i]-31920).toFixed(2)
									}else if(taxTotal[i]<660000){
										taxTotalSingle[i]=(0.3*taxTotal[i]-52920).toFixed(2)
									}else if(taxTotal[i]<960000){
										taxTotalSingle[i]=(0.35*taxTotal[i]-85920).toFixed(2)
									}else{
										taxTotalSingle[i]=(0.4*taxTotal[i]-181920)
									};
									if(taxTotal2[i]<0){
										taxTotal2[i]=0;
										taxTotalSingle2[i]=0;
									}else if(taxTotal2[i]<36000){
										taxTotalSingle2[i]=(0.03*taxTotal2[i]).toFixed(2)
									}else if(taxTotal2[i]<144000){
										taxTotalSingle2[i]=(0.1*taxTotal2[i]-2520).toFixed(2)
									}else if(taxTotal2[i]<300000){
										taxTotalSingle2[i]=(0.2*taxTotal2[i]-16920).toFixed(2)
									}else if(taxTotal2[i]<420000){
										taxTotalSingle2[i]=(0.25*taxTotal2[i]-31920).toFixed(2)
									}else if(taxTotal2[i]<660000){
										taxTotalSingle2[i]=(0.3*taxTotal2[i]-52920).toFixed(2)
									}else if(taxTotal2[i]<960000){
										taxTotalSingle2[i]=(0.35*taxTotal2[i]-85920).toFixed(2)
									}else{
										taxTotalSingle2[i]=(0.4*taxTotal2[i]-181920)
									};
									taxMonthSingle[i]=taxTotalSingle[i]-taxTotalSingle2[i];



									salaryActual[i]=wagePayable[i]-yanglao[i]-shiye[i]-yiliao[i]-gongjijin[i]-taxMonthSingle[i]-qitakouchu[i];

								}


								layui.use('table', function () {
									var table = layui.table;
									var dataS = new Array();
									for(var i=0;i<dataLength;i++)
									{
										dataS.push({
											"peopleName":peopleName[i],
											"netPerformance":netPerformance[i],
											"comprehensivePerformance":comprehensivePerformance[i],
											"mealSupplement":mealSupplement[i],
											"kaoqin":kaoqin[i],
											"jiaban":jiaban[i],
											"salaryJiaban":salaryJiaban[i],
											"daiyu":daiyu[i],
											"phoneAllowance":phoneAllowance[i],
											"wagePayable":wagePayable[i],
											"gongjijin":gongjijin[i],
											"zhuanxiang":zhuanxiang[i],
											"qitakouchu":qitakouchu[i],
											"taxMonth":taxMonth[i],
											"taxTotal":taxTotal[i],
											"taxTotalSingle":taxTotalSingle[i],
											"taxMonthSingle":taxMonthSingle[i],
											"salaryActual":salaryActual[i],
											"usernameS":usernameS[i],
											"yanglao":yanglao[i],
											"shiye":shiye[i],
											"yiliao":yiliao[i],

										})
									}
									console.log(dataS)

									$.ajax({
										"type" : 'post',
										"url": "/getRoleAndProjectByUserName",
										"data":{userName:userName},
										"success":function(data){
											console.log(data);
											var role=data[0].roleId;
											table.render({
												elem: '#salaryTable'
												,data:dataS
												,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
												,defaultToolbar: [ 'exports', 'print']
												// ,cellMinWidth: 90
												,cols: getColsByRole()
												, page: true
											});
										}
									});


									table.on('tool(salaryTable)', function (obj) {
										var data = obj.data;
										console.log(data);
										if (obj.event === 'edit') {
											console.log(data);
											$("#sid").val(data.usernameS);
											$("#tongxunbuzhu").val(data.phoneAllowance);
											$("#yanglaobaoxian").val(data.yanglao);
											$("#shiyejin").val(data.shiye);
											$("#yiliaobaoxian").val(data.yiliao);
											$("#gongjijin").val(data.gongjijin);
											$("#zhuanxiang").val(data.zhuanxiang);
											$("#qitakouchu").val(data.qitakouchu);
											document.getElementById('updateSalary').style.display = 'block';
										}
									});
								});
							}
						});
					}
				});
			});
		}
		else{

			layui.use('laydate', function(){
				var laydate = layui.laydate;
				//年月选择器
				$("#laborMonthSalary").remove();//移除后重新加载，因为LayDate不能二次渲染...
				$("#selectMonthSalary").html('<input type="text" class="layui-input" placeholder="请选择月份" id="laborMonthSalary" style="position: absolute;top:50px;left:100px;height:36px;width:150px;">');

				laydate.render({
					elem: '#laborMonthSalary'
					,type: 'month'
					,max:0
					,done:function (value,date,endDate) {
						var datetime=value;//真实年月
						var showMonth = datetime.substr(0,4)+"年"+datetime.substr(5,2)+"月";
						console.log(datetime);
						var YearDate = datetime.substr(0,4);
						var MonthDate = datetime.substr(5,2);
						console.log(MonthDate);
						// console.log(showMonth);
						$("#laborMonthSalary").val("");//此处打算清空月份选择器以便于使用自己定义的样式显示内容,但是很奇怪，这里没清掉。
						$('#laborMonthSalary').prop("placeholder",showMonth);

						$.ajax({
							//通过年月获取员工工资信息
							// url: '/getWorkingHoursByProPeople',
							url: '/getSalary1s',
							type: "POST",
							async:false,
							datatype: 'json',
							data:{
								datetime:datetime,
								userName:userName,
							},
							success: function (data) {
								console.log(data);
								var dataLength=data.data.length;

								for (var i=0;i<dataLength;i++){
									taxTotal[i]=0;
									taxTotalSingle[i]=0;
									taxTem[i]=0;
									taxTotal2[i]=0;
									taxTotalSingle2[i]=0;
								} ;


								for(var i=0;i<data.data.length;i++){
									peopleName[i]=data.data[i].name;
									netPerformance[i]=data.data[i].netPerformance;
									comprehensivePerformance[i]=data.data[i].comprehensivePerformance;
									mealSupplement[i]=data.data[i].mealSupplement;
									kaoqin[i]=data.data[i].kaoqin;
									jiaban[i]=data.data[i].jiaban;
									salaryJiaban[i]=data.data[i].salaryJiaban;
									daiyu[i]=2*data.data[i].basicwages;
									phoneAllowance[i]=data.data[i].phoneAllowance;
									wagePayable[i]=data.data[i].wagePayable;
									gongjijin[i]=data.data[i].gongjijin;
									zhuanxiang[i]=data.data[i].zhuanxiang;
									qitakouchu[i]=data.data[i].qitakouchu;
									// taxMonth[i]=data.data[i].tax1;
									yanglao[i]=data.data[i].yanglao;
									shiye[i]=data.data[i].shiye;
									yiliao[i]=data.data[i].yiliao;
									usernameS[i]=data.data[i].userName;

									taxMonth[i]=wagePayable[i]-5000-yanglao[i]-shiye[i]-yiliao[i]-gongjijin[i]-zhuanxiang[i]-qitakouchu[i];

									console.log(data.data[i].wagePayable);
									console.log(wagePayable[i]);
								}



								//计算个税
								var monthNum = parseInt(MonthDate);
								var yearNum = parseInt(YearDate);
								var cycleMonth;

								for(var j=1;j<=monthNum;j++)
								{
									if(j<10){
										cycleMonth = '0' + j.toString();

									}else {
										cycleMonth = j.toString();
									}

									$.ajax({
										//通过年月获取员工税信息

										url: '/getSalary2s',
										type: "POST",
										async:false,
										datatype: 'json',
										data:{
											yearDate:YearDate,
											cycleMonth:cycleMonth,
											userName:userName,
											datetime:datetime,
										},
										success: function (data) {
											console.log(data);
											// console.log(taxTotal);
											for(var i=0;i<dataLength;i++){
												taxTotal[i] += parseInt(data.data[i].tax1);
												taxTem[i]=parseInt(data.data[i].tax1);
											}
											// console.log(taxTotal);
										}
									});
								}
								for(var i=0;i<dataLength;i++){
									taxTotal2[i]=taxTotal[i]-taxTem[i];
								}


								// console.log(cycleMonth);
								for(var i=0;i<dataLength;i++)
								{
									if(taxTotal[i]<0){
										taxTotal[i]=0;
										taxTotalSingle[i]=0;
									}else if(taxTotal[i]<36000){
										taxTotalSingle[i]=(0.03*taxTotal[i]).toFixed(2)
									}else if(taxTotal[i]<144000){
										taxTotalSingle[i]=(0.1*taxTotal[i]-2520).toFixed(2)
									}else if(taxTotal[i]<300000){
										taxTotalSingle[i]=(0.2*taxTotal[i]-16920).toFixed(2)
									}else if(taxTotal[i]<420000){
										taxTotalSingle[i]=(0.25*taxTotal[i]-31920).toFixed(2)
									}else if(taxTotal[i]<660000){
										taxTotalSingle[i]=(0.3*taxTotal[i]-52920).toFixed(2)
									}else if(taxTotal[i]<960000){
										taxTotalSingle[i]=(0.35*taxTotal[i]-85920).toFixed(2)
									}else{
										taxTotalSingle[i]=(0.4*taxTotal[i]-181920)
									};
									if(taxTotal2[i]<0){
										taxTotal2[i]=0;
										taxTotalSingle2[i]=0;
									}else if(taxTotal2[i]<36000){
										taxTotalSingle2[i]=(0.03*taxTotal2[i]).toFixed(2)
									}else if(taxTotal2[i]<144000){
										taxTotalSingle2[i]=(0.1*taxTotal2[i]-2520).toFixed(2)
									}else if(taxTotal2[i]<300000){
										taxTotalSingle2[i]=(0.2*taxTotal2[i]-16920).toFixed(2)
									}else if(taxTotal2[i]<420000){
										taxTotalSingle2[i]=(0.25*taxTotal2[i]-31920).toFixed(2)
									}else if(taxTotal2[i]<660000){
										taxTotalSingle2[i]=(0.3*taxTotal2[i]-52920).toFixed(2)
									}else if(taxTotal2[i]<960000){
										taxTotalSingle2[i]=(0.35*taxTotal2[i]-85920).toFixed(2)
									}else{
										taxTotalSingle2[i]=(0.4*taxTotal2[i]-181920)
									};
									taxMonthSingle[i]=taxTotalSingle[i]-taxTotalSingle2[i];



									salaryActual[i]=wagePayable[i]-yanglao[i]-shiye[i]-yiliao[i]-gongjijin[i]-taxMonthSingle[i]-qitakouchu[i];

								}


								layui.use('table', function () {
									var table = layui.table;
									var dataS = new Array();
									for(var i=0;i<dataLength;i++)
									{
										dataS.push({
											"peopleName":peopleName[i],
											"netPerformance":netPerformance[i],
											"comprehensivePerformance":comprehensivePerformance[i],
											"mealSupplement":mealSupplement[i],
											"kaoqin":kaoqin[i],
											"jiaban":jiaban[i],
											"salaryJiaban":salaryJiaban[i],
											"daiyu":daiyu[i],
											"phoneAllowance":phoneAllowance[i],
											"wagePayable":wagePayable[i],
											"gongjijin":gongjijin[i],
											"zhuanxiang":zhuanxiang[i],
											"qitakouchu":qitakouchu[i],
											"taxMonth":taxMonth[i],
											"taxTotal":taxTotal[i],
											"taxTotalSingle":taxTotalSingle[i],
											"taxMonthSingle":taxMonthSingle[i],
											"salaryActual":salaryActual[i],
											"usernameS":usernameS[i],
											"yanglao":yanglao[i],
											"shiye":shiye[i],
											"yiliao":yiliao[i],

										})
									}
									console.log(dataS)
									$.ajax({
										"type" : 'post',
										"url": "/getRoleAndProjectByUserName",
										"data":{userName:userName},
										"success":function(data){
											console.log(data);
											var role=data[0].roleId;
											table.render({
												elem: '#salaryTable'
												,data:dataS
												,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
												,defaultToolbar: [ 'exports', 'print']
												// ,cellMinWidth: 90
												,cols: getColsByRole()
												, page: true
											});
										}
									});


									table.on('tool(salaryTable)', function (obj) {
										var data = obj.data;
										console.log(data);
										if (obj.event === 'edit') {
											console.log(data);
											$("#sid").val(data.usernameS);
											$("#tongxunbuzhu").val(data.phoneAllowance);
											$("#yanglaobaoxian").val(data.yanglao);
											$("#shiyejin").val(data.shiye);
											$("#yiliaobaoxian").val(data.yiliao);
											$("#gongjijin").val(data.gongjijin);
											$("#zhuanxiang").val(data.zhuanxiang);
											$("#qitakouchu").val(data.qitakouchu);
											document.getElementById('updateSalary').style.display = 'block';
										}
									});
								});
							}
						});
					}
				});
			});
		}
	}

}

function updateSalary() {
	var userUp = $("#sid").val();
	var tongxunUp = $("#tongxunbuzhu").val();
	var yanglaoUp = $("#yanglaobaoxian").val();
	var shiyeUp = $("#shiyejin").val();
	var yiliaoUp = $("#yiliaobaoxian").val();
	var gongjjUp = $("#gongjijin").val();
	var zxUp = $("#zhuanxiang").val();
	var qtUp = $("#qitakouchu").val();
	document.getElementById('export').style.display = '';
	if(userUp==''||tongxunUp==''||yanglaoUp==''||shiyeUp==''||yiliaoUp==''||gongjjUp==''||zxUp==''||qtUp==''){
		alert("请将各项信息填写完整。");
	}else{
		var cycle=$("#laborMonthSalary").val();
		$.ajax({
			url: "/updateSalary",//请求地址
			datatype: "json",//数据格式
			type: "post",//请求方式
			data: {
				"userName": userUp,
				"phoneAllowance":tongxunUp,
				"yanglao":yanglaoUp,
				"shiye":shiyeUp,
				"yiliao":yiliaoUp,
				"gongjijin":gongjjUp,
				"zhuanxiang":zxUp,
				"qitakouchu":qtUp,
				"cycle":cycle,
			},
			success: function (data) {

				$.ajax({
					url: "/updateSalaryCopy",//请求地址
					datatype: "json",//数据格式
					type: "post",//请求方式
					data: {
						"userName": userUp,
						"phoneAllowance":tongxunUp,
						"yanglao":yanglaoUp,
						"shiye":shiyeUp,
						"yiliao":yiliaoUp,
						"gongjijin":gongjjUp,
						"zhuanxiang":zxUp,
						"qitakouchu":qtUp,
					},
					success: function (data) {
						alert("修改成功！");
						document.getElementById('updateSalary').style.display = 'none';

						console.log($(".layui-laypage-em").next().html());
						var recurr=$(".layui-laypage-em").next().html();


						var userName = sessionStorage.Username;
						var datetime=$("#laborMonthSalary").val();
						var showMonth = datetime.substr(0,4)+"年"+datetime.substr(5,2)+"月";
						console.log(datetime);
						var YearDate = datetime.substr(0,4);
						var MonthDate = datetime.substr(5,2);
						console.log(MonthDate);
						$.ajax({
							//通过年月获取员工工资信息
							// url: '/getWorkingHoursByProPeople',
							url: '/getSalary1',
							type: "POST",
							async:false,
							datatype: 'json',
							data:{
								datetime:datetime
							},
							success: function (data) {
								console.log(data);
								var dataLength=data.data.length;
								var peopleName = new Array();
								var netPerformance = new Array();//净绩效
								var comprehensivePerformance = new Array();//综合绩效
								var kaoqin = new Array();//考勤
								var mealSupplement = new Array();//餐补
								var jiaban = new Array();//加班工时
								var salaryJiaban = new Array();//加班工资
								var daiyu = new Array();//待遇标准
								var phoneAllowance = new Array();//通讯补助
								var wagePayable = new Array();//应发工资
								var yanglao = new Array();//养老保险
								var shiye = new Array();//失业金
								var yiliao = new Array();//医疗保险
								var gongjijin = new Array();//公积金
								var zhuanxiang = new Array();//专项扣除
								var qitakouchu = new Array();//其他扣除
								var taxMonth = new Array();//当月应纳税
								var taxTotal = new Array();//累计应纳税
								var taxTotalSingle = new Array();//累积个税
								var taxMonthSingle = new Array();//当月个税
								var salaryActual = new Array();//实发工资

								var taxTem = new Array();
								var taxTotal2 = new Array();
								var taxTotalSingle2 = new Array();
								var usernameS = new Array();

								for (var i=0;i<dataLength;i++){
									taxTotal[i]=0;
									taxTotalSingle[i]=0;
									taxTem[i]=0;
									taxTotal2[i]=0;
									taxTotalSingle2[i]=0;
								} ;


								for(var i=0;i<data.data.length;i++){
									peopleName[i]=data.data[i].name;
									netPerformance[i]=data.data[i].netPerformance;
									comprehensivePerformance[i]=data.data[i].comprehensivePerformance;
									mealSupplement[i]=data.data[i].mealSupplement;
									kaoqin[i]=data.data[i].kaoqin;
									jiaban[i]=data.data[i].jiaban;
									salaryJiaban[i]=data.data[i].salaryJiaban;
									daiyu[i]=2*data.data[i].basicwages;
									phoneAllowance[i]=data.data[i].phoneAllowance;
									wagePayable[i]=data.data[i].wagePayable;
									gongjijin[i]=data.data[i].gongjijin;
									zhuanxiang[i]=data.data[i].zhuanxiang;
									qitakouchu[i]=data.data[i].qitakouchu;
									// taxMonth[i]=data.data[i].tax1;
									yanglao[i]=data.data[i].yanglao;
									shiye[i]=data.data[i].shiye;
									yiliao[i]=data.data[i].yiliao;
									usernameS[i]=data.data[i].userName;

									taxMonth[i]=wagePayable[i]-5000-yanglao[i]-shiye[i]-yiliao[i]-gongjijin[i]-zhuanxiang[i]-qitakouchu[i];

									console.log(data.data[i].wagePayable);
									console.log(wagePayable[i]);
								}



								//计算个税
								var monthNum = parseInt(MonthDate);
								var yearNum = parseInt(YearDate);
								var cycleMonth;

								for(var j=1;j<=monthNum;j++)
								{
									if(j<10){
										cycleMonth = '0' + j.toString();

									}else {
										cycleMonth = j.toString();
									}

									$.ajax({
										//通过年月获取员工税信息

										url: '/getSalary2',
										type: "POST",
										async:false,
										datatype: 'json',
										data:{
											yearDate:YearDate,
											cycleMonth:cycleMonth,
											datetime:datetime
										},
										success: function (data) {
											console.log(data);
											// console.log(taxTotal);
											for(var i=0;i<dataLength;i++){
												taxTotal[i] += parseInt(data.data[i].tax1);
												taxTem[i]=parseInt(data.data[i].tax1);
											}
											// console.log(taxTotal);
										}
									});
								}
								for(var i=0;i<dataLength;i++){
									taxTotal2[i]=taxTotal[i]-taxTem[i];
								}


								// console.log(cycleMonth);
								for(var i=0;i<dataLength;i++)
								{
									if(taxTotal[i]<0){
										taxTotal[i]=0;
										taxTotalSingle[i]=0;
									}else if(taxTotal[i]<36000){
										taxTotalSingle[i]=(0.03*taxTotal[i]).toFixed(2)
									}else if(taxTotal[i]<144000){
										taxTotalSingle[i]=(0.1*taxTotal[i]-2520).toFixed(2)
									}else if(taxTotal[i]<300000){
										taxTotalSingle[i]=(0.2*taxTotal[i]-16920).toFixed(2)
									}else if(taxTotal[i]<420000){
										taxTotalSingle[i]=(0.25*taxTotal[i]-31920).toFixed(2)
									}else if(taxTotal[i]<660000){
										taxTotalSingle[i]=(0.3*taxTotal[i]-52920).toFixed(2)
									}else if(taxTotal[i]<960000){
										taxTotalSingle[i]=(0.35*taxTotal[i]-85920).toFixed(2)
									}else{
										taxTotalSingle[i]=(0.4*taxTotal[i]-181920)
									};
									if(taxTotal2[i]<0){
										taxTotal2[i]=0;
										taxTotalSingle2[i]=0;
									}else if(taxTotal2[i]<36000){
										taxTotalSingle2[i]=(0.03*taxTotal2[i]).toFixed(2)
									}else if(taxTotal2[i]<144000){
										taxTotalSingle2[i]=(0.1*taxTotal2[i]-2520).toFixed(2)
									}else if(taxTotal2[i]<300000){
										taxTotalSingle2[i]=(0.2*taxTotal2[i]-16920).toFixed(2)
									}else if(taxTotal2[i]<420000){
										taxTotalSingle2[i]=(0.25*taxTotal2[i]-31920).toFixed(2)
									}else if(taxTotal2[i]<660000){
										taxTotalSingle2[i]=(0.3*taxTotal2[i]-52920).toFixed(2)
									}else if(taxTotal2[i]<960000){
										taxTotalSingle2[i]=(0.35*taxTotal2[i]-85920).toFixed(2)
									}else{
										taxTotalSingle2[i]=(0.4*taxTotal2[i]-181920)
									};
									taxMonthSingle[i]=taxTotalSingle[i]-taxTotalSingle2[i];



									salaryActual[i]=wagePayable[i]-yanglao[i]-shiye[i]-yiliao[i]-gongjijin[i]-taxMonthSingle[i]-qitakouchu[i];

								}


								layui.use('table', function () {
									var table = layui.table;
									var dataS = new Array();
									for(var i=0;i<dataLength;i++)
									{
										dataS.push({
											"peopleName":peopleName[i],
											"netPerformance":netPerformance[i],
											"comprehensivePerformance":comprehensivePerformance[i],
											"mealSupplement":mealSupplement[i],
											"kaoqin":kaoqin[i],
											"jiaban":jiaban[i],
											"salaryJiaban":salaryJiaban[i],
											"daiyu":daiyu[i],
											"phoneAllowance":phoneAllowance[i],
											"wagePayable":wagePayable[i],
											"gongjijin":gongjijin[i],
											"zhuanxiang":zhuanxiang[i],
											"qitakouchu":qitakouchu[i],
											"taxMonth":taxMonth[i],
											"taxTotal":taxTotal[i],
											"taxTotalSingle":taxTotalSingle[i],
											"taxMonthSingle":taxMonthSingle[i],
											"salaryActual":salaryActual[i],
											"usernameS":usernameS[i],
											"yanglao":yanglao[i],
											"shiye":shiye[i],
											"yiliao":yiliao[i],

										})
									}
									console.log(dataS)

									$.ajax({
										"type" : 'post',
										"url": "/getRoleAndProjectByUserName",
										"data":{userName:userName},
										"success":function(data){
											console.log(data);
											var role=data[0].roleId;

											document.getElementById('export').style.display = '';

											var ins1=table.render({
												elem: '#salaryTable'
												,data:dataS
												,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
												,defaultToolbar: [ 'exports', 'print']
												// ,cellMinWidth: 90
												,cols: getColsByRole()
												,done:function (res,curr,count) {
													$.ajax({
														//通过年月获取员工工资信息
														// url: '/getWorkingHoursByProPeople',
														url: '/getSalary1all',
														type: "POST",
														async:false,
														datatype: 'json',
														data:{
															datetime:datetime
														},
														success: function (data) {
															console.log(data);
															var employees = [];
															for (var i = 0; i < data.data.length; i++) {
																var empolyee = new Employee(data.data[i]);
																employees.push(empolyee);
															}
															console.log(employees);
															var dataLength=data.data.length;
															var peopleName = new Array();
															var netPerformance = new Array();//净绩效
															var comprehensivePerformance = new Array();//综合绩效
															var kaoqin = new Array();//考勤
															var mealSupplement = new Array();//餐补
															var jiaban = new Array();//加班工时
															var salaryJiaban = new Array();//加班工资
															var daiyu = new Array();//待遇标准
															var phoneAllowance = new Array();//通讯补助
															var wagePayable = new Array();//应发工资
															var yanglao = new Array();//养老保险
															var shiye = new Array();//失业金
															var yiliao = new Array();//医疗保险
															var gongjijin = new Array();//公积金
															var zhuanxiang = new Array();//专项扣除
															var qitakouchu = new Array();//其他扣除
															var taxMonth = new Array();//当月应纳税
															var taxTotal = new Array();//累计应纳税
															var taxTotalSingle = new Array();//累积个税
															var taxMonthSingle = new Array();//当月个税
															var salaryActual = new Array();//实发工资

															var taxTem = new Array();
															var taxTotal2 = new Array();
															var taxTotalSingle2 = new Array();
															var usernameS = new Array();

															for (var i=0;i<dataLength;i++){
																taxTotal[i]=0;
																taxTotalSingle[i]=0;
																taxTem[i]=0;
																taxTotal2[i]=0;
																taxTotalSingle2[i]=0;
															} ;


															for(var i=0;i<data.data.length;i++){
																peopleName[i]=data.data[i].name;
																netPerformance[i]=data.data[i].netPerformance;
																comprehensivePerformance[i]=data.data[i].comprehensivePerformance;
																mealSupplement[i]=data.data[i].mealSupplement;
																kaoqin[i]=data.data[i].kaoqin;
																jiaban[i]=data.data[i].jiaban;
																salaryJiaban[i]=data.data[i].salaryJiaban;
																daiyu[i]=2*data.data[i].basicwages;
																phoneAllowance[i]=data.data[i].phoneAllowance;
																wagePayable[i]=data.data[i].wagePayable;
																gongjijin[i]=data.data[i].gongjijin;
																zhuanxiang[i]=data.data[i].zhuanxiang;
																qitakouchu[i]=data.data[i].qitakouchu;
																// taxMonth[i]=data.data[i].tax1;
																yanglao[i]=data.data[i].yanglao;
																shiye[i]=data.data[i].shiye;
																yiliao[i]=data.data[i].yiliao;
																usernameS[i]=data.data[i].userName;

																taxMonth[i]=wagePayable[i]-5000-yanglao[i]-shiye[i]-yiliao[i]-gongjijin[i]-zhuanxiang[i]-qitakouchu[i];

																console.log(data.data[i].wagePayable);
																console.log(wagePayable[i]);
															}



															//计算个税
															var monthNum = parseInt(MonthDate);
															var yearNum = parseInt(YearDate);
															var cycleMonth;

															for(var j=1;j<=monthNum;j++)
															{
																if(j<10){
																	cycleMonth = '0' + j.toString();

																}else {
																	cycleMonth = j.toString();
																}

																$.ajax({
																	//通过年月获取员工税信息

																	url: '/getSalary2',
																	type: "POST",
																	async:false,
																	datatype: 'json',
																	data:{
																		yearDate:YearDate,
																		cycleMonth:cycleMonth,
																		datetime:datetime,
																	},
																	success: function (data) {
																		console.log(data);
																		// console.log(taxTotal);
																		for(var i=0;i<dataLength;i++){
																			taxTotal[i] += parseInt(data.data[i].tax1);
																			taxTem[i]=parseInt(data.data[i].tax1);
																		}
																		// console.log(taxTotal);
																	}
																});
															}
															for(var i=0;i<dataLength;i++){
																taxTotal2[i]=taxTotal[i]-taxTem[i];
															}


															// console.log(cycleMonth);
															for(var i=0;i<dataLength;i++)
															{
																if(taxTotal[i]<0){
																	taxTotal[i]=0;
																	taxTotalSingle[i]=0;
																}else if(taxTotal[i]<36000){
																	taxTotalSingle[i]=(0.03*taxTotal[i]).toFixed(2)
																}else if(taxTotal[i]<144000){
																	taxTotalSingle[i]=(0.1*taxTotal[i]-2520).toFixed(2)
																}else if(taxTotal[i]<300000){
																	taxTotalSingle[i]=(0.2*taxTotal[i]-16920).toFixed(2)
																}else if(taxTotal[i]<420000){
																	taxTotalSingle[i]=(0.25*taxTotal[i]-31920).toFixed(2)
																}else if(taxTotal[i]<660000){
																	taxTotalSingle[i]=(0.3*taxTotal[i]-52920).toFixed(2)
																}else if(taxTotal[i]<960000){
																	taxTotalSingle[i]=(0.35*taxTotal[i]-85920).toFixed(2)
																}else{
																	taxTotalSingle[i]=(0.4*taxTotal[i]-181920)
																};
																if(taxTotal2[i]<0){
																	taxTotal2[i]=0;
																	taxTotalSingle2[i]=0;
																}else if(taxTotal2[i]<36000){
																	taxTotalSingle2[i]=(0.03*taxTotal2[i]).toFixed(2)
																}else if(taxTotal2[i]<144000){
																	taxTotalSingle2[i]=(0.1*taxTotal2[i]-2520).toFixed(2)
																}else if(taxTotal2[i]<300000){
																	taxTotalSingle2[i]=(0.2*taxTotal2[i]-16920).toFixed(2)
																}else if(taxTotal2[i]<420000){
																	taxTotalSingle2[i]=(0.25*taxTotal2[i]-31920).toFixed(2)
																}else if(taxTotal2[i]<660000){
																	taxTotalSingle2[i]=(0.3*taxTotal2[i]-52920).toFixed(2)
																}else if(taxTotal2[i]<960000){
																	taxTotalSingle2[i]=(0.35*taxTotal2[i]-85920).toFixed(2)
																}else{
																	taxTotalSingle2[i]=(0.4*taxTotal2[i]-181920)
																};
																taxMonthSingle[i]=taxTotalSingle[i]-taxTotalSingle2[i];



																salaryActual[i]=wagePayable[i]-yanglao[i]-shiye[i]-yiliao[i]-gongjijin[i]-taxMonthSingle[i]-qitakouchu[i];

															}


															layui.use('table', function () {
																var table = layui.table;
																var dataS = new Array();
																var colsInform = new getColsByRole();
																for(var i=0;i<dataLength;i++)
																{
																	dataS.push({
																		"peopleName":peopleName[i],
																		"netPerformance":netPerformance[i],
																		"comprehensivePerformance":comprehensivePerformance[i],
																		"mealSupplement":mealSupplement[i],
																		"kaoqin":kaoqin[i],
																		"jiaban":jiaban[i],
																		"salaryJiaban":salaryJiaban[i],
																		"daiyu":daiyu[i],
																		"phoneAllowance":phoneAllowance[i],
																		"wagePayable":wagePayable[i],
																		"gongjijin":gongjijin[i],
																		"zhuanxiang":zhuanxiang[i],
																		"qitakouchu":qitakouchu[i],
																		"taxMonth":taxMonth[i],
																		"taxTotal":taxTotal[i],
																		"taxTotalSingle":taxTotalSingle[i],
																		"taxMonthSingle":taxMonthSingle[i],
																		"salaryActual":salaryActual[i],
																		"usernameS":usernameS[i],
																		"yanglao":yanglao[i],
																		"shiye":shiye[i],
																		"yiliao":yiliao[i],

																	})
																}
																console.log(dataS)
																var userName = sessionStorage.Username;
																$.ajax({
																	"type" : 'post',
																	"url": "/getRoleAndProjectByUserName",
																	"data":{userName:userName},
																	"success":function(data){
																		console.log(data);
																		var role=data[0].roleId;
																		// document.getElementById('export').style.display = '';
																		var ins1;
																		ins1=table.render({
																			elem: '#salaryTableAll'
																			,data:dataS
																			,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
																			,defaultToolbar: [ 'exports', 'print']
																			// ,cellMinWidth: 90
																			,cols: [[
																				{field: 'zizengSalary', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengSalaryAll'}
																				, {field: 'peopleName', align: 'left', width: 90, title: '员工姓名'}
																				, {field: 'netPerformance', align: 'left',title: '净绩效'}
																				, {field: 'comprehensivePerformance', align: 'left',  title: '综合绩效'}
																				, {field: 'kaoqin', align: 'left',  title: '考勤天数'}
																				, {field: 'mealSupplement', align: 'left',  title: '餐补'}
																				, {field: 'jiaban', align: 'left',  title: '加班天数'}
																				, {field: 'salaryJiaban', align: 'left',  title: '加班工资'}
																				, {field: 'daiyu', align: 'left',  title: '待遇标准'}
																				, {field: 'phoneAllowance', align: 'left',  title: '通讯补助'}
																				, {field: 'wagePayable', align: 'left',  title: '应发工资'}
																				, {field: 'gongjijin', align: 'left',  title: '公积金'}
																				, {field: 'zhuanxiang', align: 'left',  title: '专项扣除'}
																				, {field: 'qitakouchu', align: 'left',  title: '其他扣除'}
																				, {field: 'taxMonth', align: 'left',  title: '当月应纳税所得额'}
																				, {field: 'taxTotal', align: 'left',  title: '累计应纳税所得额'}
																				, {field: 'taxTotalSingle', align: 'left',  title: '累计个税'}
																				, {field: 'taxMonthSingle', align: 'left',  title: '当月个税'}
																				, {field: 'salaryActual', align: 'left',  title: '实发工资'}
																				, {toolbar: '#barDemoAll', align: 'left',  title: '操作'}
																			]]
																			// done:function type (res,curr,count) {
																			// 	// 表头点击事件
																			//
																			// 	pageCurr=curr;
																			// }
																			, limit:10000
																			, page: true
																			,done:function (res,curr,count) {
																				document.getElementById('table2').style.display = 'none';
																				console.log(res);
																				var exportData=res.data;
																				console.log(exportData);

																				$("#export").click(function(){
																					table.exportFile(ins1.config.id,exportData,'xls');
																					location.reload();
																					table.reload('salaryTableAll',{
																						data:[],
																					});
																					console.log("success");

																					// ins1='';
																					// exportData=null;
																					// $('#table2').reset();
																					// document.getElementById("table2").reset();
																				})
																				// document.getElementById('Salary').style.display = 'block';
																				// document.getElementById('changeC').style.display = '';

																			}
																		});
																	}
																});
																table.on('tool(salaryTable)', function (obj) {
																	var data = obj.data;
																	console.log(data);
																	if (obj.event === 'edit') {
																		console.log(data);
																		$("#sid").val(data.usernameS);
																		$("#tongxunbuzhu").val(data.phoneAllowance);
																		$("#yanglaobaoxian").val(data.yanglao);
																		$("#shiyejin").val(data.shiye);
																		$("#yiliaobaoxian").val(data.yiliao);
																		$("#gongjijin").val(data.gongjijin);
																		$("#zhuanxiang").val(data.zhuanxiang);
																		$("#qitakouchu").val(data.qitakouchu);
																		document.getElementById('updateSalary').style.display = 'block';
																	}
																});
															});

														}
													});
												}
												,page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
													layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'] //自定义分页布局
													,curr: recurr //设定初始页
													// ,groups: 1 //只显示 1 个连续页码
													// ,first: false //不显示首页
													// ,last: false //不显示尾页
												}
											});
										}
									});

									table.render();

									table.on('tool(salaryTable)', function (obj) {
										var data = obj.data;
										console.log(data);
										if (obj.event === 'edit') {
											console.log(data);
											$("#sid").val(data.usernameS);
											$("#tongxunbuzhu").val(data.phoneAllowance);
											$("#yanglaobaoxian").val(data.yanglao);
											$("#shiyejin").val(data.shiye);
											$("#yiliaobaoxian").val(data.yiliao);
											$("#gongjijin").val(data.gongjijin);
											$("#zhuanxiang").val(data.zhuanxiang);
											$("#qitakouchu").val(data.qitakouchu);
											document.getElementById('updateSalary').style.display = 'block';
										}
									});
								});
							}
						});
					}
				});


			}
		});
	}
}

function fillAssessmemt(cycle){
	var userName = sessionStorage.Username;
	$.ajax({
		"type" : 'post',
		"url": "/getRoleAndProjectByUserName",
		"data":{userName:userName},
		async:false,
		success:function(data){
			console.log(data);
			var role=data[0].roleId;
			if(role=="12"){
				$("#AssessmentTbody tr").remove("tr[id=AssessmentTbody123]");
				$.ajax({
					url: '/getAssessment',
					type: "POST",
					datatype: 'json',
					async:false,
					data:{cycle: cycle},
					success: function (data) {
						console.log(data);
						var tbody = document.getElementById("AssessmentTbody");
						for(var i=0;i<data.length;i++){
							var tr = document.createElement("tr");
							tr.setAttribute("id", "AssessmentTbody123");
							var td = "<td>"+data[i].userName+"</td>"+'<td><a  style="cursor:pointer;"  ondblclick="emObj.showemy2(' + i + ');emObj.showemx2(' + i + ');additable2();" >'+data[i].name+'</a></td>'


							var em = data[i];
							console.log(em)
							var eId=em.id;
							$.ajax({
								url: "/findPeAcc",//请求地址
								datatype: "json",//数据格式
								type: "post",//请求方式
								async:false,
								data: {
									"employeeId": eId,
									"cycle": cycle
								},
								success: function (data) {
									console.log(data)
									var PeAcc = data;
									var Pesize = data.length;
									var totalScore = 0;

									if(data.length<=10){
										for (var j = 0; j < data.length; j++) {
											if(PeAcc[j].score==''){
												PeAcc[j].score=0;
											}
											parseInt(PeAcc[j].score)
											td += '<td>'+ PeAcc[j].score + '</td>'
											totalScore =parseInt(totalScore)+parseInt(PeAcc[j].score)
										}
										for (var k = data.length; k < 10; k++) {
											td += '<td>'+ 0 + '</td>'
										}
										td += '<td>' + totalScore + '</td>'
									}
									if(data.length>10){
										for (var j = 0; j <10; j++) {
											if(PeAcc[j].score==''){
												PeAcc[j].score=0;
											}
											parseInt(PeAcc[j].score)
											td += '<td>'+ PeAcc[j].score + '</td>'
											totalScore =parseInt(totalScore)+parseInt(PeAcc[j].score)
										}
										td += '<td>' + totalScore + '</td>'
									}
								}
							})



							td += "<td>"+data[i].zhiban+"</td><td>"+data[i].kaoqin+"</td>" +
								"<td>"+data[i].netPerformance+"</td><td>"+data[i].comprehensivePerformance+"</td>"
							tr.innerHTML = td;
							tbody.appendChild(tr);
						}
					}
				});
			}
			else{
				$("#AssessmentTbody tr").remove("tr[id=AssessmentTbody123]");
				$.ajax({
					url: '/getAssessmentBy',
					type: "POST",
					datatype: 'json',
					async:false,
					data:{
						cycle: cycle,
						manager:userName,
					},
					success: function (data) {
						console.log(data);
						var tbody = document.getElementById("AssessmentTbody");
						for(var i=0;i<data.length;i++){
							var tr = document.createElement("tr");
							tr.setAttribute("id", "AssessmentTbody123");
							var td = "<td>"+data[i].userName+"</td>"+'<td><a  style="cursor:pointer;"  ondblclick="emObj.showemy2(' + i + ');emObj.showemx2(' + i + ');additable2();" >'+data[i].name+'</a></td>'

							var em = data[i];
							console.log(em)
							var eId=em.id;
							$.ajax({
								url: "/findPeAcc",//请求地址
								datatype: "json",//数据格式
								type: "post",//请求方式
								async:false,
								data: {
									"employeeId": eId,
									"cycle": cycle,
								},
								success: function (data) {
									console.log(data)
									var PeAcc = data;
									var Pesize = data.length;
									var totalScore = 0;

									if(data.length<=10){
										for (var j = 0; j < data.length; j++) {
											if(PeAcc[j].score==''){
												PeAcc[j].score=0;
											}
											parseInt(PeAcc[j].score)
											td += '<td>'+ PeAcc[j].score + '</td>'
											totalScore =parseInt(totalScore)+parseInt(PeAcc[j].score)
										}
										for (var k = data.length; k < 10; k++) {
											td += '<td>'+ 0 + '</td>'
										}
										td += '<td>' + totalScore + '</td>'
									}
									if(data.length>10){
										for (var j = 0; j <10; j++) {
											if(PeAcc[j].score==''){
												PeAcc[j].score=0;
											}
											parseInt(PeAcc[j].score)
											td += '<td>'+ PeAcc[j].score + '</td>'
											totalScore =parseInt(totalScore)+parseInt(PeAcc[j].score)
										}
										td += '<td>' + totalScore + '</td>'
									}
								}
							})
							td += "<td>"+data[i].zhiban+"</td><td>"+data[i].kaoqin+"</td>" +
								"<td>"+data[i].netPerformance+"</td><td>"+data[i].comprehensivePerformance+"</td>"
							tr.innerHTML = td;
							tbody.appendChild(tr);
						}
					}
				});
			}
		}
	});
}

function downAssessment(){
	var cycle = $('#achievementTime').val();
	window.open("/downAssessment?cycle="+cycle)
}




function fillRole(){
	$.ajax({
		url: "/getRole",//请求地址
		datatype: "json",//数据格式
		type: "post",//请求方式
		success: function (data) {
			$("#roleTbody tr").remove("tr[id=roleTr123]");
			var tbody = document.getElementById("roleTbody");
			for(var i=0;i<data.length;i++){
				var tr = document.createElement("tr");
				tr.setAttribute("id","roleTr123");
				var td = "<td>"+(i+1)+"</td><td>"+data[i].roleName+"</td><td>" +
					"<input type='button' id='roleButton' value='修改角色' class='button' onclick='updateRole("+data[i].id+")' />" +
					"<input type='button' id='roleButton' value='删除角色' class='button' onclick='delRole("+data[i].id+")'/>" +
					"<input type='button' id='roleButton1' value='修改角色权限' class='button' onclick='updRolePermission("+data[i].id+")'/>" +
					"</td>";
				tr.innerHTML = td;
				tbody.appendChild(tr);
			}
			var tr1 =  document.createElement("tr");
			tr1.setAttribute("id","roleTr123");
			var td1 = "<td colspan='2'></td><td><img id='roleImg'  src='img/add.png' onclick='addRole()'/></td>"
			tr1.innerHTML = td1;
			tbody.appendChild(tr1);
		}
	})
}

function addRole(){
	document.getElementById('addRole').style.display='block';
	document.getElementById('updateRole').style.display='none';
	document.getElementById('insertRole').style.display='';
	$("#addRoleTitle").text("添加角色");
}
function updateRole(id){
	$("#roleId").val(id);
	document.getElementById('addRole').style.display='block';
	document.getElementById('updateRole').style.display='';
	document.getElementById('insertRole').style.display='none';
	$("#addRoleTitle").text("修改角色");
	$.ajax({
		url: "/getRoleById",//请求地址
		datatype: "json",//数据格式
		type: "post",//请求方式
		data: {"id": id},
		success: function (data) {
			console.log(data);
			$("#roleName").val(data.roleName);
		}
	});
}
function updRole(){
	var roleName=$("#roleName").val();
	var roleId = $("#roleId").val();
	$.ajax({
		url: "/updateRole",//请求地址
		datatype: "json",//数据格式
		type: "post",//请求方式
		data: {"roleName": roleName,"id":roleId},
		success: function (data) {
			console.log(data);
			fillRole();
			document.getElementById('addRole').style.display='none'
		}
	});
}
function insertRole(){
	roleName=$("#roleName").val();
	$.ajax({
		url: "/addRole",//请求地址
		datatype: "json",//数据格式
		type: "post",//请求方式
		data: {"roleName": roleName},
		success: function (data) {
			console.log(data);
			fillRole();
			document.getElementById('addRole').style.display='none'
		}
	});
}
function delRole(id){
	$.ajax({
		url: "/deleteRole",//请求地址
		datatype: "json",//数据格式
		type: "post",//请求方式
		data: {"id": id},
		success: function (data) {
			console.log(data);
			fillRole();
		}
	});
}
function updRolePermission(id){
	$('#permissionRoleId').val(id);
	document.getElementById('permission').style.display='block';
	fillPermission();
	setTimeout(function () {
		fillChecked(id);
	}, 1000);
}



function fillPermission(){
	$('#permissionFrom').html('');
	$.ajax({
		url: "/getPermissionByparentId",//请求地址
		datatype: "json",//数据格式
		type: "post",//请求方式
		data: {"parentId": 0},
		success: function (data) {
			var permissionFrom = document.getElementById('permissionFrom'); //2、找到父级元素
			for(var i=0;i<data.length;i++){
				var div = document.createElement('div');
				div.setAttribute("id","div-"+data[i].id);
				div.innerHTML = "<input type='checkbox' id='check-"+data[i].id+"' value='"+data[i].id+"' onclick='change1("+data[i].id+")'>" +
					"<label id='labelcheck' for='check-"+data[i].id+"'></label>"+ data[i].permissionName;
				permissionFrom.appendChild(div);
				fillPermissionChild(data[i].id);
			}
		}
	});
}
function fillChecked(roleId){
	$.ajax({
		url: "/getRolePermissionByRoleId",//请求地址
		datatype: "json",//数据格式
		type: "post",//请求方式
		data: {"roleId": roleId},
		success: function (data) {
			for(var i=0;i<data.length;i++){
				if(data[i].type==1){
					if(data[i].parentId1==0){
						if(data[i].parentId2==0){
							document.getElementById('check-'+data[i].permissionId).checked = true;
						}else{
							document.getElementById('check-'+data[i].parentId2+'-'+data[i].permissionId).checked = true;
						}
					}else{
						document.getElementById('check-'+data[i].parentId1+'-'+data[i].parentId2+'-'+data[i].permissionId).checked = true;
					}
				}
			}
		}
	});
}

function fillPermissionChild(id){
	$.ajax({
		url: "/getPermissionByparentId",//请求地址
		datatype: "json",//数据格式
		type: "post",//请求方式
		data: {"parentId": id},
		success: function (data) {
			if(data.length>0){
				var permissionFrom = document.getElementById('div-'+id);
				for(var i=0;i<data.length;i++){
					var div = document.createElement('div')
					div.setAttribute("id",'div-'+id+'-'+data[i].id);
					div.innerHTML = "<input type='checkbox' id='check-"+id+"-"+data[i].id+"' value='"+data[i].id+"' onclick='change2("+id+","+data[i].id+")'>" +
						"<label id='labelcheck' for='check-"+id+"-"+data[i].id+"'></label>"+ data[i].permissionName;
					permissionFrom.appendChild(div);
					fillPermissionChild2(id,data[i].id)
				}
			}
		}
	});
}

function fillPermissionChild2(parentId,id){
	$.ajax({
		url: "/getPermissionByparentId",//请求地址
		datatype: "json",//数据格式
		type: "post",//请求方式
		data: {"parentId": id},
		success: function (data) {
			if(data.length>0){
				var permissionFrom = document.getElementById('div-'+parentId+'-'+id);
				for(var i=0;i<data.length;i++){
					var div = document.createElement('div')
					div.setAttribute("id",'div-'+parentId+'-'+id+'-'+data[i].id);
					div.innerHTML = "<input type='checkbox' id='check-"+parentId+"-"+id+"-"+data[i].id+"' onclick='change3("+parentId+","+id+","+data[i].id+")' value='"+data[i].id+"'>" +
						"<label id='labelcheck' for='check-"+parentId+"-"+id+"-"+data[i].id+"'></label>"+ data[i].permissionName;
					permissionFrom.appendChild(div);
					fillPermissionChild2(id,data[i].id)
				}
			}
		}
	});
}

function change1(id){
	var obj = document.getElementById('check-'+id);
	$("input[id^=check-"+id+"]").each(function(){
		this.checked = obj.checked;
	})
}

function change2(parentId,id){
	var obj = document.getElementById('check-'+parentId+'-'+id);
	if(!obj.checked){
		document.getElementById('check-'+parentId).checked = false;
	}
	$("input[id^=check-"+parentId+"-"+id+"]").each(function(){
		this.checked = obj.checked;
	})
}

function change3(parentId,id,childId){
	var obj = document.getElementById('check-'+parentId+'-'+id+'-'+childId);
	console.log(obj);
	if(!obj.checked){
		document.getElementById('check-'+parentId).checked = false;
		document.getElementById('check-'+parentId+'-'+id).checked = false;
	}
}


function addpermission(){
	var roleId = $('#permissionRoleId').val();
	var checkVal = new Array();
	$('input[id^="check-"]:checked').each(function(){
		checkVal.push($(this).val());
	});
	var permissionIds = checkVal.join(',');
	console.log(permissionIds);
	$.ajax({
		url: "/updateRolePermission",//请求地址
		datatype: "json",//数据格式
		type: "post",//请求方式
		data: {"roleId": roleId,"permissionIds":permissionIds},
		success: function (data) {
			console.log(data);
			document.getElementById('permission').style.display='none';
		}
	});
}
function getRole(){
	$.ajax({
		url: "/getRole",//请求地址
		datatype: "json",//数据格式
		type: "post",//请求方式
		success: function (data) {
			console.log(data);
			var unitObj = document.getElementById("roleSelect");
			$("#roleSelect").find("option:not(:first)").remove();
			for(var i=0;i<data.length;i++){
				unitObj.options.add(new Option(data[i].roleName,data[i].id));
			}
		}
	})
}


function getDepartment(){


	var userName = sessionStorage.Username;
	$.ajax({
		"type" : 'post',
		"url": "/getRoleAndProjectByUserName",
		"data":{"userName":userName},
		dataType:'json',
		async:false,
		"success":function(data){
			console.log(data);
			var role=data[0].roleId;
			if(role=="12"){
				$.ajax({
					url: "/getDepartment",//请求地址
					datatype: "json",//数据格式
					type: "post",//请求方式
					async:false,
					success: function (data) {
						console.log(data)
						var unitObj = document.getElementById("uDepartment");
						$("#uDepartment").find("option:not(:first)").remove();
						for(var i=0;i<data.length;i++){
							unitObj.options.add(new Option(data[i].departmentName,data[i].id));
						}
					}
				})
			}else{
				console.log(userName);
				$.ajax({
					// url: "/getDepartmentByUsername",//请求地址
					"type" : 'post',
					"url": "/getDepartmentByUsername",
					"data":{"userName":userName},
					dataType:'json',
					async:false,
					success: function (data) {
						console.log(data);
						var unitObj = document.getElementById("uDepartment");
						$("#uDepartment").find("option:not(:first)").remove();
						for(var i=0;i<data.length;i++){
							unitObj.options.add(new Option(data[i].departmentName,data[i].id));
						}
					}
				})
			}
		}
	});
}

function getDepartment1(){
	var userName = sessionStorage.Username;
	console.log(userName)
	$.ajax({
		"type" : 'post',
		"url": "/getRoleAndProjectByUserName",
		"data":{userName:userName},
		async:false,
		"success":function(data){
			console.log(data);
			var role=data[0].roleId;
			if(role=="12"){
				$.ajax({
					url: "/getDepartment",//请求地址
					datatype: "json",//数据格式
					type: "post",//请求方式
					success: function (data) {
						console.log(data);
						var unitObj = document.getElementById("qDepartment");
						$("#qDepartment").find("option:not(:first)").remove();
						for(var i=0;i<data.length;i++){
							unitObj.options.add(new Option(data[i].departmentName,data[i].id));
						}
					}
				})
			}else{
				$.ajax({
					url: "/getDepartmentByUsername",//请求地址
					datatype: "json",//数据格式
					"data":{"userName":userName},
					type: "post",//请求方式
					success: function (data) {
						var unitObj = document.getElementById("qDepartment");
						$("#qDepartment").find("option:not(:first)").remove();
						for(var i=0;i<data.length;i++){
							unitObj.options.add(new Option(data[i].departmentName,data[i].id));
						}
					}
				})
			}
		}
	});
}

function getUserProject(userName){
	$.ajax({
		url: "/getUserByUserName",//请求地址
		datatype: "json",//数据格式
		type: "post",//请求方式
		data:{"userName":userName},
		success: function (result) {
			var data = result.data;
			var peojectId = data.projectId.split(",");
			for(var i=0;i<peojectId.length;i++){
				$("#projectCheck-"+peojectId[i]).attr("checked",true);
			}
		}
	})
}

function getProject(userName){
	$.ajax({
		url: "/WeeklyController/getProject",//请求地址
		datatype: "json",//数据格式
		type: "post",//请求方式
		success: function (result) {
			var data = result.data;
			console.log(result);
			console.log(data)
			var Project = document.getElementById("Project");
			$("#Project div").remove("div[id=projectCheck123]");

			for(var i=0;i<data.length;i++){
				var div = document.createElement('div')
				div.setAttribute("id",'projectCheck123');
				div.innerHTML = "<input type='checkbox' id='projectCheck-"+data[i].id+"' value='"+data[i].id+"'>" +
					"<label id='labelcheck' for='projectCheck-"+data[i].id+"'></label>"+ data[i].projectTeam;
				Project.appendChild(div);
			}
			getUserProject(userName);

		}
	})
}

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
		// RIGHT JOIN (SELECT h.id,h.departmentName FROM department h RIGHT JOIN employee a ON h.id=a.Department WHERE a.userName=#{param4}) d ON a.Department=d.id


		var userName = sessionStorage.Username;
		$.ajax({
			"type" : 'post',
			"url": "/getRoleAndProjectByUserName",
			"data":{userName:userName},
			async:false,
			"success":function(data){
				console.log(data);
				var role=data[0].roleId;
				if(role=="12"){
					var qUserName = $("#qUserName").val();
					var qName = $("#qName").val();
					var qDepartment = $("#qDepartment").val();
					if (qUserName == "" && qName == "" && qDepartment == 0) {
						alert("请输入查询条件");
					} else {
						$('#bottomTab').css('display','');
						$('#bottom').css('display','none');
						$('#bottomB').css('display','none');
						layui.use('table', function () {
							var table = layui.table;
							table.render({
								elem:'#LayuiTable1'
								,url:'/findAllinformBy?UserName='+qUserName+'&Name='+qName+'&Department='+qDepartment
								,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
								,defaultToolbar: [
									'exports', 'print'
								]
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
								, page: true
							})
							table.render({
								elem:'#LayuiTable2'
								,url:'/findAllinformBy?UserName='+qUserName+'&Name='+qName+'&Department='+qDepartment
								,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
								,defaultToolbar: [
									'exports', 'print'
								]
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
								, page: true
							})
							table.render({
								elem:'#LayuiTable3'
								,url:'/findAllinformBy?UserName='+qUserName+'&Name='+qName+'&Department='+qDepartment
								,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
								,defaultToolbar: [
									'exports', 'print'
								]
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
								, page: true
							})
							table.render({
								elem:'#LayuiTable4'
								,url:'/findAllinformBy?UserName='+qUserName+'&Name='+qName+'&Department='+qDepartment
								,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
								,defaultToolbar: [
									'exports', 'print'
								]
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
								, page: true
							})
							table.render({
								elem:'#LayuiTable5'
								,url:'/findAllinformBy?UserName='+qUserName+'&Name='+qName+'&Department='+qDepartment
								,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
								,defaultToolbar: [
									'exports', 'print'
								]
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
								, page: true
							})
							table.render({
								elem:'#LayuiTable6'
								,url:'/findAllinformBy?UserName='+qUserName+'&Name='+qName+'&Department='+qDepartment
								,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
								,defaultToolbar: [
									'exports', 'print'
								]
								, cols: [
									[
										{rowspan:3,field: 'zizengL6', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengL6'},
										{colspan:4,title:'基本信息',width:505},
										// {colspan:4,title:'扩展信息',id:'kuozhan'},
										// {colspan:5,title:'权限信息',id:'quanxian'},
										// {colspan:3,title:'家庭信息',id:'jiating'},
										// {colspan:4,title:'技能信息',id:'jineng'},
										{colspan:9,title:'工资信息',id:'gongzi',width:1305}
									],
									[
										{rowspan:2,title:'员工编号',field:'userName',width:95},
										{rowspan:2,title:'姓名',field:'name',width:85},
										{rowspan:2,title:'部门',field:'departmentName',width:120},
										{rowspan:2,title:'岗位',field:'post',width:205},
										// {rowspan:2,title:'身份证号',field:'idnumber',id:'idnumber',hide:true},
										// {rowspan:2,title:'联系方式',field:'phone',id:'phone',hide:true},
										// {rowspan:2,title:'工作服尺寸',field:'closhe',id:'closhe',hide:true},
										// {rowspan:2,title:'安全帽编号',field:'hat',id:'hat',hide:true},
										// {rowspan:2,title:'项目组',field:'projectId',id:'projectId',hide:true},
										// {rowspan:2,title:'岗位',field:'post',id:'post',hide:true},
										// {rowspan:2,title:'在职状态',field:'state',id:'state',hide:true},
										// {rowspan:2,title:'绩效管理人',field:'manager',id:'manager',hide:true},
										// {rowspan:2,title:'角色',field:'roleId',id:'roleId',hide:true},
										// {rowspan:2,title:'家庭住址',field:'address',id:'address',hide:true},
										// {rowspan:2,title:'应急联系人',field:'emergency',id:'emergency',hide:true},
										// {rowspan:2,title:'应急电话',field:'emergencyTel',id:'emergencyTel',hide:true},
										// {rowspan:2,title:'学历',field:'education',id:'education',hide:true},
										// {rowspan:2,title:'证书1',field:'credentials1',id:'credentials1',hide:true},
										// {rowspan:2,title:'证书2',field:'credentials2',id:'credentials2',hide:true},
										// {rowspan:2,title:'证书3',field:'credentials3',id:'credentials3',hide:true},
										{rowspan:2,title:'开户行',field:'bank',id:'bank',width:75},
										{rowspan:2,title:'工资卡号',field:'card',id:'card',width:250},
										{rowspan:2,title:'劳务派遣',field:'laowupaiqian',id:'laowupaiqian',width:90},
										{rowspan:2,title:'待遇标准',field:'wages',id:'wages',width:90},
										{rowspan:2,title:'基本工资',field:'basicwages',id:'basicwages',width:90},
										{rowspan:2,title:'绩效工资',field:'meritpay',id:'meritpay',width:90},
										{colspan:2,title:'变更记录',id:'bgjl',width:620}
									],
									[
										{title:'入职信息',field:'remark',id:'remark',width:480},
										{title:'其他',field:'other',id:'other',width:140}
									]
								]
								, page: true
							})
						})
					}
				}
				else{
					var qUserName = $("#qUserName").val();
					var qName = $("#qName").val();
					var qDepartment = $("#qDepartment").val();
					if (qUserName == "" && qName == "" && qDepartment == 0) {
						alert("请输入查询条件");
					} else {
						$('#bottomTab').css('display','');
						$('#bottom').css('display','none');
						$('#bottomB').css('display','none');
						layui.use('table', function () {
							var table = layui.table;
							table.render({
								elem:'#LayuiTable1'
								,url:'/findAllinformByM?UserName='+qUserName+'&Name='+qName+'&Department='+qDepartment+'&Manager='+userName
								,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
								,defaultToolbar: [
									'exports', 'print'
								]
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
								, page: true
							})
							table.render({
								elem:'#LayuiTable2'
								,url:'/findAllinformByM?UserName='+qUserName+'&Name='+qName+'&Department='+qDepartment+'&Manager='+userName								,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
								,defaultToolbar: [
									'exports', 'print'
								]
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
								, page: true
							})
							table.render({
								elem:'#LayuiTable3'
								,url:'/findAllinformByM?UserName='+qUserName+'&Name='+qName+'&Department='+qDepartment+'&Manager='+userName								,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
								,defaultToolbar: [
									'exports', 'print'
								]
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
								, page: true
							})
							table.render({
								elem:'#LayuiTable4'
								,url:'/findAllinformByM?UserName='+qUserName+'&Name='+qName+'&Department='+qDepartment+'&Manager='+userName								,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
								,defaultToolbar: [
									'exports', 'print'
								]
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
								, page: true
							})
							table.render({
								elem:'#LayuiTable5'
								,url:'/findAllinformByM?UserName='+qUserName+'&Name='+qName+'&Department='+qDepartment+'&Manager='+userName								,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
								,defaultToolbar: [
									'exports', 'print'
								]
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
								, page: true
							})
							table.render({
								elem:'#LayuiTable6'
								,url:'/findAllinformByM?UserName='+qUserName+'&Name='+qName+'&Department='+qDepartment+'&Manager='+userName
								,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
								,defaultToolbar: [
									'exports', 'print'
								]
								, cols: [
									[
										{rowspan:3,field: 'zizengL6', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengL6'},
										{colspan:4,title:'基本信息',width:505},
										// {colspan:4,title:'扩展信息',id:'kuozhan'},
										// {colspan:5,title:'权限信息',id:'quanxian'},
										// {colspan:3,title:'家庭信息',id:'jiating'},
										// {colspan:4,title:'技能信息',id:'jineng'},
										{colspan:9,title:'工资信息',id:'gongzi',width:1305}
									],
									[
										{rowspan:2,title:'员工编号',field:'userName',width:95},
										{rowspan:2,title:'姓名',field:'name',width:85},
										{rowspan:2,title:'部门',field:'departmentName',width:120},
										{rowspan:2,title:'岗位',field:'post',width:205},
										// {rowspan:2,title:'身份证号',field:'idnumber',id:'idnumber',hide:true},
										// {rowspan:2,title:'联系方式',field:'phone',id:'phone',hide:true},
										// {rowspan:2,title:'工作服尺寸',field:'closhe',id:'closhe',hide:true},
										// {rowspan:2,title:'安全帽编号',field:'hat',id:'hat',hide:true},
										// {rowspan:2,title:'项目组',field:'projectId',id:'projectId',hide:true},
										// {rowspan:2,title:'岗位',field:'post',id:'post',hide:true},
										// {rowspan:2,title:'在职状态',field:'state',id:'state',hide:true},
										// {rowspan:2,title:'绩效管理人',field:'manager',id:'manager',hide:true},
										// {rowspan:2,title:'角色',field:'roleId',id:'roleId',hide:true},
										// {rowspan:2,title:'家庭住址',field:'address',id:'address',hide:true},
										// {rowspan:2,title:'应急联系人',field:'emergency',id:'emergency',hide:true},
										// {rowspan:2,title:'应急电话',field:'emergencyTel',id:'emergencyTel',hide:true},
										// {rowspan:2,title:'学历',field:'education',id:'education',hide:true},
										// {rowspan:2,title:'证书1',field:'credentials1',id:'credentials1',hide:true},
										// {rowspan:2,title:'证书2',field:'credentials2',id:'credentials2',hide:true},
										// {rowspan:2,title:'证书3',field:'credentials3',id:'credentials3',hide:true},
										{rowspan:2,title:'开户行',field:'bank',id:'bank',width:75},
										{rowspan:2,title:'工资卡号',field:'card',id:'card',width:250},
										{rowspan:2,title:'劳务派遣',field:'laowupaiqian',id:'laowupaiqian',width:90},
										{rowspan:2,title:'待遇标准',field:'wages',id:'wages',width:90},
										{rowspan:2,title:'基本工资',field:'basicwages',id:'basicwages',width:90},
										{rowspan:2,title:'绩效工资',field:'meritpay',id:'meritpay',width:90},
										{colspan:2,title:'变更记录',id:'bgjl',width:620}
									],
									[
										{title:'入职信息',field:'remark',id:'remark',width:480},
										{title:'其他',field:'other',id:'other',width:140}
									]
								]
								, page: true
							})
						})
					}
				}
			}
		});
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
		var userName = sessionStorage.Username;
		$.ajax({
			"type" : 'post',
			"url": "/getRoleAndProjectByUserName",
			"data":{userName:userName},
			async:false,
			"success":function(data){
				console.log(data);
				var role=data[0].roleId;
				if(role=="12"){
					getRole();
					getDepartment();
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
							]
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
							, page: true
						})
						table.render({
							elem:'#LayuiTable3'
							,url:'/findAllinform'
							,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
							,defaultToolbar: [
								// 'filter',
								'exports', 'print'
							]

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

							]

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
							, page: true
						})
						table.render({
							elem:'#LayuiTable5'
							,url:'/findAllinform'
							,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
							,defaultToolbar: [
								// 'filter',
								'exports', 'print'

							]
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
							, page: true
						})
						table.render({
							elem:'#LayuiTable6'
							,url:'/findAllinform'
							,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
							,defaultToolbar: [
								// 'filter',
								'exports', 'print'

							]

							, cols: [
								[
									{rowspan:3,field: 'zizengL6', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengL6'},
									{colspan:4,title:'基本信息',width:505},
									{colspan:9,title:'工资信息',id:'gongzi',width:1305}
								],
								[
									{rowspan:2,title:'员工编号',field:'userName',width:95},
									{rowspan:2,title:'姓名',field:'name',width:85},
									{rowspan:2,title:'部门',field:'departmentName',width:120},
									{rowspan:2,title:'岗位',field:'post',width:205},
									{rowspan:2,title:'开户行',field:'bank',id:'bank',width:75},
									{rowspan:2,title:'工资卡号',field:'card',id:'card',width:250},
									{rowspan:2,title:'劳务派遣',field:'laowupaiqian',id:'laowupaiqian',width:90},
									{rowspan:2,title:'待遇标准',field:'wages',id:'wages',width:90},
									{rowspan:2,title:'基本工资',field:'basicwages',id:'basicwages',width:90},
									{rowspan:2,title:'绩效工资',field:'meritpay',id:'meritpay',width:90},
									{colspan:2,title:'变更记录',id:'bgjl',width:620}
								],
								[
									{title:'入职信息',field:'remark',id:'remark',width:480},
									{title:'其他',field:'other',id:'other',width:140}
								]
							]
							, page: true
						})
					})
				}
				else{
					getRole();
					getDepartment();
					$('#bottomTab').css('display','');
					$('#bottom').css('display','none');
					$('#bottomB').css('display','none');
					layui.use('table', function () {
						var table = layui.table;
						table.render({
							elem:'#LayuiTable1'
							,url:'/findAllinformByUsername?userName='+ userName
							,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
							,defaultToolbar: [
								'exports', 'print'
							]
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
							, page: true
						})
						table.render({
							elem:'#LayuiTable2'
							,url:'/findAllinformByUsername?userName='+ userName
							,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
							,defaultToolbar: [
								// 'filter',
								'exports', 'print'
							]
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
							, page: true
						})
						table.render({
							elem:'#LayuiTable3'
							,url:'/findAllinformByUsername?userName='+ userName
							,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
							,defaultToolbar: [
								// 'filter',
								'exports', 'print'
							]
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
							,url:'/findAllinformByUsername?userName='+ userName
							,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
							,defaultToolbar: [
								// 'filter',
								'exports', 'print'
							]
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
							, page: true
						})
						table.render({
							elem:'#LayuiTable5'
							,url:'/findAllinformByUsername?userName='+ userName
							,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
							,defaultToolbar: [
								// 'filter',
								'exports', 'print'
							]
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
							, page: true
						})
						table.render({
							elem:'#LayuiTable6'
							,url:'/findAllinformByUsername?userName='+ userName
							,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
							,defaultToolbar: [
								// 'filter',
								'exports', 'print'
							]
							, cols: [
								[
									{rowspan:3,field: 'zizengL6', align:'left',width: 75,title: '序号',sort: true, templet: '#zizengL6'},
									{colspan:4,title:'基本信息',width:505},
									// {colspan:4,title:'扩展信息',id:'kuozhan'},
									// {colspan:5,title:'权限信息',id:'quanxian'},
									// {colspan:3,title:'家庭信息',id:'jiating'},
									// {colspan:4,title:'技能信息',id:'jineng'},
									{colspan:9,title:'工资信息',id:'gongzi',width:1305}
								],
								[
									{rowspan:2,title:'员工编号',field:'userName',width:95},
									{rowspan:2,title:'姓名',field:'name',width:85},
									{rowspan:2,title:'部门',field:'departmentName',width:120},
									{rowspan:2,title:'岗位',field:'post',width:205},
									// {rowspan:2,title:'身份证号',field:'idnumber',id:'idnumber',hide:true},
									// {rowspan:2,title:'联系方式',field:'phone',id:'phone',hide:true},
									// {rowspan:2,title:'工作服尺寸',field:'closhe',id:'closhe',hide:true},
									// {rowspan:2,title:'安全帽编号',field:'hat',id:'hat',hide:true},
									// {rowspan:2,title:'项目组',field:'projectId',id:'projectId',hide:true},
									// {rowspan:2,title:'岗位',field:'post',id:'post',hide:true},
									// {rowspan:2,title:'在职状态',field:'state',id:'state',hide:true},
									// {rowspan:2,title:'绩效管理人',field:'manager',id:'manager',hide:true},
									// {rowspan:2,title:'角色',field:'roleId',id:'roleId',hide:true},
									// {rowspan:2,title:'家庭住址',field:'address',id:'address',hide:true},
									// {rowspan:2,title:'应急联系人',field:'emergency',id:'emergency',hide:true},
									// {rowspan:2,title:'应急电话',field:'emergencyTel',id:'emergencyTel',hide:true},
									// {rowspan:2,title:'学历',field:'education',id:'education',hide:true},
									// {rowspan:2,title:'证书1',field:'credentials1',id:'credentials1',hide:true},
									// {rowspan:2,title:'证书2',field:'credentials2',id:'credentials2',hide:true},
									// {rowspan:2,title:'证书3',field:'credentials3',id:'credentials3',hide:true},
									{rowspan:2,title:'开户行',field:'bank',id:'bank',width:75},
									{rowspan:2,title:'工资卡号',field:'card',id:'card',width:250},
									{rowspan:2,title:'劳务派遣',field:'laowupaiqian',id:'laowupaiqian',width:90},
									{rowspan:2,title:'待遇标准',field:'wages',id:'wages',width:90},
									{rowspan:2,title:'基本工资',field:'basicwages',id:'basicwages',width:90},
									{rowspan:2,title:'绩效工资',field:'meritpay',id:'meritpay',width:90},
									{colspan:2,title:'变更记录',id:'bgjl',width:620}
								],
								[
									{title:'入职信息',field:'remark',id:'remark',width:480},
									{title:'其他',field:'other',id:'other',width:140}
								]
							]
							, page: true
						})
					})
				}
			}
		});
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




	var operate1 = document.getElementById('total1');
	operate1.onclick = function(){
		alert("success!");
		$("#basic").width=400+"px";
		$("#basic1").width=100+"px";
		$("#basic2").width=100+"px";
		$("#basic3").width=100+"px";
		$("#basic4").width=100+"px";
	}


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
			var data = {"employeeId":employeeId,
				"cycle":cycle};
			$.ajax({
				url: "/findBe",//请求地址
				datatype: "json",//数据格式
				data: data,
				type: "post",//请求方式
				success: function (data) {   //如何发送成功
					$('#BeId').val(data.id);
					$('#week1').val(data.week1);
					$('#week2').val(data.week2);
					$('#week3').val(data.week3);
					$('#week4').val(data.week4);
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
		var r = confirm("确定要删除吗");
		if (r == true) {
			$.ajax({
				url: "/devareByUserName",
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
			var newEm = new EmInfo2(UserName, Name);
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
		var week1 = $('#week1').val();
		var week2 = $('#week2').val();
		var week3 = $('#week3').val();
		var week4 = $('#week4').val();
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
		if (tiaoxiu == '' | week1 == '' | week2 == '' | week3 == '' | week4 == '' | period == '' | qingjia == '' | kuanggong == '' | chidao == '' | lunxiu == '' | jiaban == '' | chuchai == '' | cycle == '') {
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
						$('#week1').val(week1);
						$('#week2').val(week2);
						$('#fchuqing').val(fchuqing);
						$('#week3').val(week3);
						$('#week4').val(week4);
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
						'<td><a onclick="emObj.devarePeAcc(' + i + ')" ><img height="25px" src="img/devare.png" ></a></td>' +
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
		var userName = sessionStorage.Username;
		$.ajax({
			"type" : 'post',
			"url": "/getRoleAndProjectByUserName",
			"data":{userName:userName},
			async:false,
			success:function(data){
				console.log(data);
				var role=data[0].roleId;
				if(role=="12"){
					$.ajax({
						url: "/findAll",//请求地址
						datatype: "json",//数据格式
						async:false,
						data: {"currentPage": currentPage},
						type: "post",//请求方式
						success: function (data) {
							console.log(data);
							temp = data["employee"];
							console.log(temp);
							var em = temp[i];
							$('#yName').val(em.name);
							$('#yUserName').val(em.userName);
							$('#yemployeeId').val(em.id);
							$('#yPost').val(em.post);
							selectCycle();
						},
					})
				}
				else{
					$.ajax({
						url: "/findAllBy",//请求地址
						datatype: "json",//数据格式
						async:false,
						data: {
							"currentPage": currentPage
						},
						type: "post",//请求方式
						success: function (data) {
							console.log(data);
							temp = data["employee"];
							console.log(temp);
							var em = temp[i];
							$('#yName').val(em.name);
							$('#yUserName').val(em.userName);
							$('#yemployeeId').val(em.id);
							$('#yPost').val(em.post);
							selectCycle();
						},
					})
				}
			}
		});
	}
	function showemy2(i) {
		var userName = sessionStorage.Username;
		$.ajax({
			"type" : 'post',
			"url": "/getRoleAndProjectByUserName",
			"data":{userName:userName},
			async:false,
			success:function(data){
				console.log(data);
				var role=data[0].roleId;
				if(role=="12"){
					$.ajax({
						url: "/findAll2",//请求地址
						datatype: "json",//数据格式
						data: {"currentPage": currentPage},
						type: "post",//请求方式
						success: function (data) {
							console.log(data);
							temp = data["employee"];
							var em = temp[i];
							$('#yName').val(em.name);
							$('#yUserName').val(em.userName);
							$('#yemployeeId').val(em.id);
							$('#yPost').val(em.post);
							selectCycle();
						},
					})
				}
				else{
					$.ajax({
						url: "/findAll2By",//请求地址
						datatype: "json",//数据格式
						data: {
							"currentPage": currentPage,
							"manager":userName,
						},
						type: "post",//请求方式
						success: function (data) {
							console.log(data);

							temp = data.data;
							var em = temp[i];
							$('#yName').val(data.data[i].excelRow[1]);
							$('#yUserName').val(data.data[i].excelRow[0]);
							$('#yemployeeId').val(data.data[i].id);
							$('#yPost').val(data.data[i].post);
							selectCycle();
						},
					})
				}
			}
		});
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
	function showemx2(i) {
		clearbe();
		var em = temp[i];
		$('#xName').val(em.excelRow[1]);
		$('#xUserName').val(em.excelRow[0]);
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
        var Address= $('#uAddress').val();
        var Bank= $("#uBank").val();
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
							$.messager.alert("提示","修改成功");
							emObj.manage();
							document.getElementById('updateinformation').style.display = 'none';
						} else if(data=="fail1"){
                            $.messager.alert("提示","员工编号已存在");
						}else if(data=="fail2"){
                            $.messager.alert("提示","身份证号已被使用");
						}
					}
				})
			}
		} else {
            $.messager.alert("提示",text);
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
                        $.messager.alert("提示","重置成功");
					}
				},
				error: function (data) {
					if (data == "success") {
                        $.messager.alert("提示","重置成功");
					}
				}
			})
		}
	}

	function next() {
		if (total < currentPage + 1) {
            $.messager.alert("提示","没有下一页了");

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
            $.messager.alert("提示","没有下一页了");
		}
	}

	function turnto() {
		var page = parseInt($('#currentPage').val());
		if (page > total || page < 1) {
            $.messager.alert("提示","页码错误");
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
			showCon("天数已经为0");
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
		showemx2: showemx2,
		updateBe: updateBe,
		selectBe: selectBe,
		showemy: showemy,
		showemy2: showemy2,
		Exexport: Exexport,
		setColor: setColor,
		insertPeAcc: insertPeAcc,
		findPeAcc: findPeAcc,
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
                    $.messager.alert("提示",this.args2[i] + ": 格式错误");
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
                    $.messager.alert("提示",this.args2[i] + ": 格式错误");
					return false;
				}

			}
		}
		return true;
	}
}

function changeCoe() {
	layui.use('layer', function () { //独立版的layer无需执行这一句
		var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
		//触发事件
		// var employeeId = $("#yemployeeId").val();
		// console.log(employeeId);
		var type = "auto";
		layer.open({
			type: 2
			, title: '修改相关系数'
			, offset: type //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
			, id: 'layerDemo' + type //防止重复弹出
			, area: ['500px', '400px']
			, content: '/changeCoeShow'
			, success: function (layero,index) {
			}
		});
	});
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
function additable2() {
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
            $.messager.alert("提示","请选择员工");
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


