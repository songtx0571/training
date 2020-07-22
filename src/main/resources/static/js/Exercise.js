var otabLis = 0;
var index1 = 0;
var mt=0;
var PoisionAbefore='';
var PoisionB1before='';
var permission=0;
//function ShowExercise()
//{
//	var select=document.getElementById("Eo");
//	// str：0代表练习，1代表考试
//	var ID = select.value+"%";
//	$
//			.ajax(
//			{
//				url : '/GetExercise',
//				type : "POST",
//				datatype : 'json',
//				data :
//				{
//					ID : ID
//				},
//				success : function(result)
//				{
//					data = result;
//					// console.log(data);
//					var html = "<div class='title_tab' id='title_tab' style='overflow:auto'><ul class='clearfix'>";
//					for (var j = 0; j < data.length; j++)
//					{
//						var index = j + 1;
//						html += "<li onclick=\"tab('candidates'," + j
//								+ ")\" id='li" + j + "'>第" + index + "题</li>";
//					}
//					html += "</ul></div>";
//					for (var i = 0; i < data.length; i++)
//					{
//						if (data[i].type == 1)
//						{
//							var index = i + 1;
//							html += "<div id='candidates_"
//									+ i
//									+ "'class='tab_content' style='height: 400px;'>";
//							html += "<div>" + data[i].questionID + "."
//									+ data[i].question + "</div>";
//							html += "<div><input type='radio' name='radio_"
//									+ index + "' value='A'>A."
//									+ data[i].optionA + "</input><br>";
//							html += "<input type='radio' name='radio_" + index
//									+ "' value='B'>B." + data[i].optionB
//									+ "</input><br></div>";
//							html += "<div><input type='button' class='button' value='查看答案' onclick='answershow("
//									+ i
//									+ ")'/></div><div id='answer"
//									+ i
//									+ "' style='display: none;'>答案和解析：<br>"
//									+ data[i].remarks
//									+ "<br>答案:"
//									+ data[i].answer + "</div></div>";
//						} else if (data[i].type == 2)
//						{
//							var index = i + 1;
//							html += "<div id='candidates_"
//									+ i
//									+ "'class='tab_content' style='height: 400px;'>";
//							html += "<div>" + data[i].questionID + "."
//									+ data[i].question + "</div>";
//							html += "<div><input type='checkbox' name='radio_"
//									+ index + "' value='A'>A."
//									+ data[i].optionA + "</input><br>";
//							html += "<input type='checkbox' name='radio_"
//									+ index + "' value='B'>B."
//									+ data[i].optionB + "</input><br>";
//							html += "<input type='checkbox' name='radio_"
//									+ index + "' value='C'>C."
//									+ data[i].optionC + "</input><br>";
//							html += "<input type='checkbox' name='radio_"
//									+ index + "' value='D'>D."
//									+ data[i].optionD + "</input><br></div>";
//							html += "<div><input type='button' class='button' value='查看答案' onclick='answershow("
//									+ i
//									+ ")'/></div><div id='answer"
//									+ i
//									+ "' style='display: none;'>答案和解析：<br>"
//									+ data[i].remarks
//									+ "<br>答案:"
//									+ data[i].answer + "</div></div>";
//						} else
//						{
//							var index = i + 1;
//							html += "<div id='candidates_"
//									+ i
//									+ "'class='tab_content' style='height: 400px;'>";
//							html += "<div>" + data[i].questionID + "."
//									+ data[i].question + "</div>";
//							html += "<div><input type='radio' name='radio_"
//									+ index + "' value='A'>A."
//									+ data[i].optionA + "</input><br>";
//							html += "<input type='radio' name='radio_" + index
//									+ "' value='B'>B." + data[i].optionB
//									+ "</input><br>";
//							html += "<input type='radio' name='radio_" + index
//									+ "' value='C'>C." + data[i].optionC
//									+ "</input><br>";
//							html += "<input type='radio' name='radio_" + index
//									+ "' value='D'>D." + data[i].optionD
//									+ "</input><br></div>";
//							html += "<div><input type='button' class='button' value='查看答案' onclick='answershow("
//									+ i
//									+ ")'/></div><div id='answer"
//									+ i
//									+ "' style='display: none;'>答案和解析：<br>"
//									+ data[i].remarks
//									+ "<br>答案:"
//									+ data[i].answer + "</div></div>";
//						}
//					}
//					$('#tab_candidates').html(html);
//					$('#li0').addClass("current");
//					$('#candidates_0').removeClass("tab_content");
//					$('#candidates_0').addClass("tab_content current");
//					index1 = 0;
//					setTimeout("ExCount()",2000);
//				}
//			});
//}
function closeBanner2(){
	document.getElementById("achievementRecord-select").style.display="none";
	document.getElementById("banner").style.display="none";
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
function showselect(){
	var PoisionAselect=document.getElementById("PoisionA");
	var PoisionA = PoisionAselect.value;
	$.ajax(
	{
		url : '/GetPoisionB',
		type : "POST",
		datatype : 'json',
		data :
		{
			PoisionA : PoisionA
		},
		success : function(result)
		{
		   var html="";
		   data=result;
		   for(var i=0;i<data.length;i++){
			   html+="<option value="+data[i].poisionB+">"+data[i].poisionB+"</option>";
		   }
		   $("#PoisionB").html(html);
		}
	});
}
function showQ(){
	var PoisionAselect=document.getElementById("PoisionA");
	var PoisionBselect=document.getElementById("PoisionB");
	var ChapterIdSelect=document.getElementById("ChapterId");
	var PoisionA = PoisionAselect.value;
	var PoisionB1 = PoisionBselect.value;
	var ChapterID = ChapterIdSelect.value;
	if(PoisionA!=PoisionAbefore & PoisionB1!=PoisionB1before){
		PoisionAbefore=PoisionA;
		PoisionB1before=PoisionB1;
		permission=1;
	}else {
		permission=0;
	}
	mt=0;
	$.ajax(
	{
		url : '/ShowQ',
		type : "POST",
		datatype : 'json',
		data :
		{
			PoisionA : PoisionA,
			PoisionB1 :PoisionB1,
			ChapterID :ChapterID
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
					html += "<div>" + data[i].questionID + "."
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
					html += "<div>" + data[i].questionID + "."
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
					html += "<div>" + data[i].questionID + "."
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
			if(permission==1){
				setTimeout("ExCount()",2000);
			}
		}
	});
}


function ExCount()
{
	mt=mt+1;
	console.log(mt);
	x=setTimeout("ExCount()",1000);
	p=setTimeout("Periodset()",1000);

}


function tab(obj, id)
{
	clearTimeout(p);
	clearTimeout(x);
	mt = 0;
	ExCount();
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


function Periodset(){
	var Username=sessionStorage.Username;
	var Period = 1;
	if(mt>=10){
		clearTimeout(x);
		clearTimeout(p);
		mt=0;
		$.ajax(
		{
			url : '/addPeriod',
			type : "POST",
			datatype : 'json',
			data :
			{
				Username:Username,
				Period:Period
				
			},
			success : function(result)
			{
				if(result==1){
				console.log("记录成功");	
				}else{
				console.log("记录失败");	
				}
				}
				
			});
	}
}

window.onload=function(){
	showselect();
}