var otabLis = 0;
var temp = 0;

function Showtimes()
{
	// str：0代表练习，1代表考试
	var UserName=sessionStorage.Username;
	$.ajax({
		url:'/selecttimes',
		datatype: 'json',
		data:{"UserName":UserName},
		type:'post',
		success : function(data){
			if(data<4){
				ShowQuestion();
			}else {
				alert("考试次数已经用完");
				document.getElementById('exam').style.display='none';document.getElementById('fade').style.display='none';StopEt();
			}
		}

	})
}
function ShowQuestion() {
	$.ajax({
			url : '/getQuestion', //获取了当前试卷的题目信息
			type : "POST",
			datatype : 'json',
			success : function(result)
			{
				if(result==null||result==''){
					alert("考试未开始或者已经结束");

					// var week;
					// //获取当前week
					// $.ajax({
					// 	url: "/getExamWeek",//请求地址
					// 	datatype: "json",//数据格式
					// 	data: {
					// 		"week": week,
					// 	},
					// 	type: "post",//请求方式
					// 	success: function (data) {
					// 		alert("获取成功");
					// 		week=data.week;
					// 		alert(week);
					// 	}
					// });
					//
					//
					//
					// //将考试记录传至后端
					// var questionId =10;
					// var userName=sessionStorage.Username;
					// var day2 = new Date();
					// day2.setTime(day2.getTime());
					// var year = day2.getFullYear();
					// var month = (day2.getMonth()+1);
					// var day = day2.getDate();
					// var time = year+"-" + month + "-" + day;//显示时间：年-月-日
					// var cycle = year+"-"+ month;
					// // var week = Math.ceil(day/7);
					// var times;
					//
					// $.ajax({
					// 	url: "/getExamTimes",//请求地址
					// 	datatype: "json",//数据格式
					// 	data: {"userName":userName,"cycle":cycle,"week":week,"questionId":questionId,"times":times},//此处不应有questionId,但是后端sql已经把它删了，为了节约时间，这里不管他了
					// 	type: "post",//请求方式
					// 	success: function (data) {
					// 		times=data.times;
					// 		console.log(times)
					// 		if(times!="1"&&times!="2"&&times!="3"){
					// 			alert("无数据")
					// 			//无数据，则添加
					// 			times=1;
					// 			$.ajax({
					// 				url: "/insertExamHis",//请求地址
					// 				datatype: "json",//数据格式
					// 				data: {
					// 					"userName":userName,
					// 					"cycle":cycle,
					// 					"week":week,
					// 					"questionId":questionId,
					// 					"times":times,
					// 				},
					// 				type: "post",//请求方式
					// 				success: function (data) {
					// 					alert("插入成功")
					// 				}
					// 			});
					// 		}
					// 		else{
					// 			//次数未超过限制，插入新数据
					// 			times++;
					// 			$.ajax({
					// 				url: "/insertExamHis",//请求地址
					// 				datatype: "json",//数据格式
					// 				data: {
					// 					"userName":userName,
					// 					"cycle":cycle,
					// 					"week":week,
					// 					"questionId":questionId,
					// 					"times":times,
					// 				},
					// 				type: "post",//请求方式
					// 				success: function (data) {
					//
					// 				}
					// 			});
					// 		}
					// 	}
					// });





					document.getElementById('exam').style.display='none';document.getElementById('fade').style.display='none';StopEt();
				}else {
					data = result;
					var answer = [];
					var type = [];
					var checkbox_num = 0;
					var radio_num = 0;
					var html = "<div class='title_tab' id='title_tab1'>" +
							"<ul class='clearfix'>" +
							"<li onclick=\"tab1('candidates1',0)\" class='current'>第1题</li>" +
							"<li onclick=\"tab1('candidates1',1)\">第2题</li>" +
							"<li onclick=\"tab1('candidates1',2)\">第3题</li>" +
							"<li onclick=\"tab1('candidates1',3)\">第4题</li>" +
							"<li onclick=\"tab1('candidates1',4)\">第5题</li>" +
							"<li onclick=\"tab1('candidates1',5)\">第6题</li>" +
							"<li onclick=\"tab1('candidates1',6)\">第7题</li>" +
							"<li onclick=\"tab1('candidates1',7)\">第8题</li>" +
							"<li onclick=\"tab1('candidates1',8)\">第9题</li>" +
							"<li onclick=\"tab1('candidates1',9)\">第10题</li>" +
							"<li onclick=\"tab1('candidates1',10)\">第11题</li>" +
							"<li onclick=\"tab1('candidates1',11)\">第12题</li>" +
							"<li onclick=\"tab1('candidates1',12)\">第13题</li>" +
							"<li onclick=\"tab1('candidates1',13)\">第14题</li>" +
							"<li onclick=\"tab1('candidates1',14)\">第15题</li>" +
							"<li onclick=\"tab1('candidates1',15)\">第16题</li>" +
							"<li onclick=\"tab1('candidates1',16)\">第17题</li>" +
							"<li onclick=\"tab1('candidates1',17)\">第18题</li>" +
							"<li onclick=\"tab1('candidates1',18)\">第19题</li>" +
							"<li onclick=\"tab1('candidates1',19)\">第20题</li>" +
							"</ul></div>";
					for (var i = 0; i < data.length; i++){
						answer.push(data[i].answer);
						type.push(data[i].type);
						if (data[i].type == 1) {
							radio_num = radio_num + 1;
							var index = radio_num;
							html += "<div id='candidates1_"+ i + "'class='tab_content' style='height: 400px;'>";
							html += "<div>" + (i+1) + "."+ data[i].question + "</div>";
							html += "<div><input type='radio' name='radio_"+ index + "' value='A'>A."+ data[i].optionA + "</input><br>";
							html += "<input type='radio' name='radio_" + index+ "' value='B'>B." + data[i].optionB + "</input><br></div></div>";
						} else if (data[i].type == 2){
							checkbox_num = checkbox_num + 1;
							var index = checkbox_num;
							html += "<div id='candidates1_"+ i + "'class='tab_content' style='height: 400px;'>";
							html += "<div>" + (i+1) + "." + data[i].question + "</div>";
							html += "<div><input type='checkbox' name='checkbox_" + index + "' value='A'>A." + data[i].optionA + "</input><br>";
							html += "<input type='checkbox' name='checkbox_" + index + "' value='B'>B." + data[i].optionB + "</input><br>";
							html += "<input type='checkbox' name='checkbox_" + index + "' value='C'>C." + data[i].optionC + "</input><br>";
							html += "<input type='checkbox' name='checkbox_" + index + "' value='D'>D." + data[i].optionD + "</input><br></div></div>";
						} else {
							radio_num = radio_num + 1;
							var index = radio_num;
							html += "<div id='candidates1_" + i + "'class='tab_content' style='height: 400px;'>";
							html += "<div>" + (i+1) + "." + data[i].question + "</div>";
							html += "<div><input type='radio' name='radio_" + index + "' value='A'>A." + data[i].optionA + "</input><br>";
							html += "<input type='radio' name='radio_" + index + "' value='B'>B." + data[i].optionB + "</input><br>";
							html += "<input type='radio' name='radio_" + index + "' value='C'>C." + data[i].optionC + "</input><br>";
							html += "<input type='radio' name='radio_" + index + "' value='D'>D." + data[i].optionD + "</input><br></div></div>";

						}
					}
					$('#tab_candidates1').html(html);
					$('#candidates1_0').removeClass("tab_content");
					$('#candidates1_0').addClass("tab_content current");
					sessionStorage.answer = JSON.stringify(answer);
					
					sessionStorage.type = JSON.stringify(type);
					temp=0;

					//将考试记录传至后端
					// for(var i=0;i< data.length; i++){
						var questionId =data[i].questionId;
						var userName=sessionStorage.Username;
						var day2 = new Date();
						 day2.setTime(day2.getTime());
						var year = day2.getFullYear();
						var month = (day2.getMonth()+1);
						var day = day2.getDate();
						var time = year+"-" + month + "-" + day;//显示时间：年-月-日
						var cycle = year+"-"+ month;
						// var week = Math.ceil(day/7); //系统时间
						var times;

					var week;//获取当前week
					$.ajax({
						url: "/getExamWeek",//请求地址
						datatype: "json",//数据格式
						data: {
							"week": week,
						},
						type: "post",//请求方式
						success: function (data) {
							// alert("获取成功");
							week=data.week;
							// alert(week);
						}
					});


						$.ajax({
							url: "/getExamTimes",//请求地址
							datatype: "json",//数据格式
							data: {"userName":userName,"cycle":cycle,"week":week,"questionId":questionId,"times":times},//此处不应有questionId,但是后端sql已经把它删了，为了节约时间，这里不管他了
							type: "post",//请求方式
							success: function (data) {
								times=data.times;
								console.log(times);
								if(times!="0"&&times!="1"&&times!="2"&&times!="3"&&times!="4"){
									// alert("无数据");
									//无数据，则添加
									times=1;
									$.ajax({
										url: "/insertExamHis",//请求地址
										datatype: "json",//数据格式
										data: {
											"userName":userName,
											"cycle":cycle,
											"week":week,
											"questionId":questionId,
											"times":times,
										},
										type: "post",//请求方式
										success: function (data) {

										}
									});
								}
								// else if(times>=4){
								// 	//次数超过限制，不操作
								// 	alert("本轮考试次数已达四次");
								// }
								else{
									//次数未超过限制，插入新数据
									times++;
									$.ajax({
										url: "/insertExamHis",//请求地址
										datatype: "json",//数据格式
										data: {
											"userName":userName,
											"cycle":cycle,
											"week":week,
											"questionId":questionId,
											"times":times,
										},
										type: "post",//请求方式
										success: function (data) {

										}
									});
								}
							}
						});




					// }

				}
			}
		});

}

// otabLis = document.getElementById("title_tab1").getElementsByTagName("li");

function tab1(obj, id)
{
	otabLis = document.getElementById("title_tab1").getElementsByTagName("li");
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
			temp = i;
		}
	}
}

function tabNext1() //下一题
{
	otabLis = document.getElementById("title_tab1").getElementsByTagName("li");
	temp++;
	// alert(temp);
	// alert(otabLis.length);
	if (temp >= otabLis.length)
	{
		temp = 0;
	}
	for (var i = 0; i < otabLis.length; i++)
	{
		otabLis.item(i).className = "";
	}
	otabLis.item(temp).className = "current";
	tab1('candidates1', temp);
}

function tabPrev1() //上一题
{
	otabLis = document.getElementById("title_tab1").getElementsByTagName("li");
	temp--;
	// alert(temp);
	// alert(otabLis.length);
	if (temp < 0)
	{
		temp = otabLis.length - 1;
	}
	for (var i = 0; i < otabLis.length; i++)
	{
		otabLis.item(i).className = "";
	}
	otabLis.item(temp).className = "current";
	tab1('candidates1', temp);
}