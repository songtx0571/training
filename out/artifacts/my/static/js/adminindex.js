    function loodtable(){
        var dim=$("#dim").val();
        layui.use('table', function(){
            var table = layui.table;
            table.render({//首页的数据表
                elem: '#test'
                ,url:'/findInf?dim='+dim
                ,cols: [[
                    {field:'zizeng', width:100, title: '排名',templet:'#zizeng'}
                    ,{field:'title',align:'left', width:300, title: '标题'}
                    ,{field:'content',align:'left', width:500, title: '内容'}
                    ,{field:'time', width:194, title: '时间', sort: true}
                    ,{fixed:'right', title:'详情', toolbar: '#barDemo', width:50}
                    // ,{fixed:'RDstatus',title:'状态',width:100}
                ]]
                ,page: true
            });



            table.on('tool(demo)', function(obj){
                var data = obj.data;
                if(obj.event === 'detail'){ //点击“查看”

                function showReadStatus() {
                    url:'/updateReadStatus'
                }

                // if(obj.event==='edit'){
                //     function getStatus(){
                //         url:'/findReadStatus'
                //     }
                // }


                    //写入用户信息

                    if (data.filedir != null & data.filedir != '') { //判定是否加载文件
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
                        //点击“查看”事件
                    } else {
                        alert("无文件");
                    }
                }

            });
        });
    }

$(function(){
	var userName = sessionStorage.Username
	document.getElementById('li1').style.display='none';
	document.getElementById('li2').style.display='none';
	document.getElementById('li3').style.display='none';
	// document.getElementById('li4').style.display='none';
    document.getElementById('li5').style.display='none';
	$.ajax({
    	url: '/getPermissionByUserId',//获取页面权限?
    	type: "POST",
    	datatype: 'json',
    	data:{userName: userName},
    	success: function (data) {
    		console.log(data);
    		for(var i=0;i<data.length;i++){
    			document.getElementById('li'+data[i].id).style.display='';
    		}
    	}
	});
})
