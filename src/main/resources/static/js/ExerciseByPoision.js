var PoisionAselect=docunment.getElementById("PoisionA");
var PosionBselect=document.getElementById("PoisionB");
function showselect(){
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
			   html+="<option value="+data[i]+" onchange='showQ()'>"+data[i]+"</option>";
		   }
		   $("#PoisionB").html(html);
		}
	});
}
function showQ(){
	var PoisionA = PoisionAselect.value;
	var PoisionB = PoisionBselect.value;
	$.ajax(
	{
		url : '/ShowQ',
		type : "POST",
		datatype : 'json',
		data :
		{
			PoisionA : PoisionA,
			PoisionB1 :PosionB
		},
		success : function(result)
		{
			
		}
	});
}