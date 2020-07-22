var treeData = {
    id: "tree",//菜单节点的id
    onShowTree: function () {//当左侧栏展开的时候, 会调用这个onShowTree中定义的方法
        //some function
    	showTree();
    },
    onHideTree: function () { //当左侧栏收缩的时候, 会调用这个onHideTree中定义的方法
        //some function
    	hideTree();
    },
    children: [       
    	{
    		content: "检修周报登记",
    		selected: true,
            click: function (){aaa('../WeeklyController/Weekly')}
    	},
    	{
    		content: "运行周报登记",
    		click: function (){aaa('../WeeklyController/runningWeekly')}
    	},
		{
    		content: "周报历史记录",
    		click: function (){aaa('../WeeklyController/WeeklyRecord')}
		},
		/*{
			content: "脱硝运行日志登记",
			click: function (){aaa('../ScrDailyController/ScrDaily')}
		},*/
		{
			content: "运行日志登记",
			click: function (){aaa('../ScrDailyController/WfgdDaily')}
		},
		{
			content: "运行日志查询",
			click: function (){aaa('../ScrDailyController/ScrDailys')}
		},
		{
			content: "检修日志登记",
			click: function (){aaa('../MaintenanceController/Maintenance')}
		},
		{
			content: "检修日志查询",
			click: function (){aaa('../MaintenanceController/Maintenances')}
		}            		
	]
}
