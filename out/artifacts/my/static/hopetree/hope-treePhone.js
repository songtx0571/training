class Branch {
    // el: 结构<div><ul><li>自身</li>...</ul></div>, 在init函数中定义;
    // parent: 父节点;
    // data: brench的信息, 对应children中的某一个;
    // branches: 根据data生成的树枝;
    // branchEls: 树枝的节点;
    // paddingLeft: 根据父节点+2, 每一个子层都比父层向右偏移该距离, 在init函数中定义;


    // selected: 是否被选中, 默认不选中;
    // opened: 子节点是否被打开, 默认不打开;
    constructor(parent, data) {
        this.parent = parent;
        this.data = data;
        this.selected = data.selected || false;
        this.opened = data.opened || false;
        this.click = data.click || null;
        this.branches = [];
        this.branchEls = [];
        this.paddingLeft = 0;
        this.content = "";
        this.setContent();
        this.init();
        this.setBranches();
    }
    setSelected() {
        if (this.selected) {
            this.select()
        } else {
            $(this.el).remove("selected");
        }
        if (this.hasBranches()) {
            this.branches.forEach(branch => {
                branch.setSelected();
            });
        }
    }
    select() {
        $(this.el).addClass("selected");
    }
    close() {
        this.opened = false;
        if (this.hasBranches()) {
            this.branches.forEach(branch => {
                branch.setOpened();
            })
        }
    }
    closeSiblings() {
        var we = this.parent.branches;
        var me = this;
        we.forEach(oneOfOursBranch => {
            if (oneOfOursBranch != me) {
                oneOfOursBranch.opened = false;
            }
            oneOfOursBranch.setOpened();
        });
    }
    cancelAllSelected() {
        this.selected = false;
        $(this.el).removeClass("selected");
        this.branches.forEach(branch => {
            branch.cancelAllSelected();
        });
    }
    setOpened() {
        if (this.parent.opened) {
            $(this.el).slideDown(200);
        } else {
            $(this.el).slideUp(50);
        }
        if (this.hasBranches()) {
            if (this.opened) {
                $(this.el).find("img").css("transform", "rotate(90deg)");
            } else {
                $(this.el).find("img").removeAttr("style");
            }
            this.branches.forEach(branch => {
                branch.setOpened();
            })
        }
    }
    setContent() {
        if (this.data.content) {
            this.content = this.data.content;
        } else {
            throw "Tree: 每个children中的对象都需要content属性和不为空的值";
        }
    }
    setBranches() {
        if (this.data.children && this.data.children.length > 0) {
            this.data.children.forEach(children => {
                var branch = new Branch(this, children);
                this.branches.push(branch);
            });
        }
    }
    hasBranches() {
        if (this.data.children && this.data.children.length > 0)
            return true;
        return false;
    }
    addClickEvent() {
        var clickEvent;
        var me = this;
        $(this.el).children("p").click(function () {
            me.closeSiblings();
            if (me.hasBranches()) {
                me.opened = !me.opened;
                me.setOpened()
            } else {
                var tree = new Tree();
                tree.branches.forEach(branch => {
                    branch.cancelAllSelected();
                });
                me.selected = true;
                me.select()
            }
            if (me.click) {
                $(me.el).children("p").click(me.click())
            }
        })
    }
    init() {
        var parent = this.parent;
        var tree = new Tree();
        this.paddingLeft = parent.paddingLeft + 12;
        this.el = document.createElement("div");

        if (this.hasBranches()) {
            this.branches.forEach(element => {
                var branchEl = document.createElement("div");
                this.branchEls.push(branchEl);
            });
            this.el.innerHTML = "<p style='padding-left:" + this.paddingLeft + "px;'><img src='" + tree.absoluteSrc + "moreRight.png'>" + this.content + "</p>";
        } else {
            this.el.innerHTML = "<p style='padding-left:" + this.paddingLeft + "px;'>" + this.content + "</p>";
        }
        this.addClickEvent();
        this.parent.el.appendChild(this.el)
    }
}

class Tree {
    // id: 初始化tree的id;
    // el: tree的总结点, 以后tree的内容会放在这个节点
    // treeData: 用户设置的treeData, 根据这个来生成tree
    // branches: 根据treeData生成的树枝
    //
    constructor(treeData) {
        if (Tree.prototype.instance) {
            return Tree.prototype.instance;
        } else {
            Tree.prototype.instance = this;
            this.id = treeData.id;
            this.el = document.getElementById(this.id);
            this.opened = true;
            this.paddingLeft = 0;
            this.isPC = this.isPC();
            this.absoluteSrc = this.getAbsoluteSrc();
            this.branches = function (o) {
                var arr = [];
                treeData.children.forEach(children => {
                    var branch = new Branch(o, children);
                    arr.push(branch);
                });
                return arr;
            }(this);
            this.performance = this.performanceFactory(treeData.onShowTree ? treeData.onShowTree : function () {
                console.log("tree show")
            },
                treeData.onHideTree ? treeData.onHideTree : function () {
                    console.log("tree hide")
            });
            $(this.el).addClass("treeWrap");
            importStyleSheet();
            this.init();

            function importStyleSheet() {
                var head = document.querySelector("head") || document.getElementsByName("head");
                var style = document.createElement('link');
                style.rel = "stylesheet";
                style.href = Tree.prototype.instance.absoluteSrc + "treePhone.css";
                head.appendChild(style);
            }
        }
    }
    setStyle() {
        /*var $tree = $(".treeWrap");
        $tree.css("height", "100%");*/
    }
    setSelected() {
        this.branches.forEach(branch => {
            branch.setSelected();
        });
    }
    setOpened() {
        this.branches.forEach(branch => {
            branch.setOpened();
        });
    }
    init() {
        this.setStyle();
        this.setOpened();
        this.setSelected();
        this.performance.addEvent(this.el);
    }
    isPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"
        ];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }
    performanceFactory(onShowTree, onHideTree) {
        if (this.isPC) {
            return new PCPerformance(onShowTree, onHideTree);
        } else {
            return new PhonePerformance(onShowTree, onHideTree);
        }
    }
    getAbsoluteSrc() {
        var scripts = document.getElementsByTagName('script');
        var str = "hope-tree.js";
        var src = "";
        for (var i = 0; i < scripts.length; i++) {
            var scriptNode = scripts[i];
            if (scriptNode.src.indexOf(str) > 0) {
                src = scriptNode.src.substring(0, scriptNode.src.indexOf(str));
                return src;
            }
        }
    }
    getWidth() {
        return this.performance.getWidth()
    }
}
class Performance {
    constructor(onShowTree, onHideTree) {
        Performance.prototype.onShowTree = onShowTree;
        Performance.prototype.onHideTree = onHideTree;
    }
    getWidth() {
        throw "需要复写";
    }
    showTree() {
        throw "需要复写";
    }
    hideTree() {
        throw "需要复写";
    }
    addEvent() {
        throw "需要复写";
    }
    onShowTree() {
        throw "需要复写";
    }
    onHideTree() {
        throw "需要复写";
    }
}
class PCPerformance extends Performance {
    constructor(fun1, fun2) {
        super(fun1, fun2);
        if (PCPerformance.prototype.instance) {
            return PCPerformance.prototype.instance;
        } else {
           /* $("body").append("<table id='treeBackground-pc' class='treeBackground-pc'><tr><td>展开侧边栏</td></tr></table>");*/
            PCPerformance.prototype.instance = this;
            return this;
        }
    }
    getWidth() {
        var tree = new Tree();
        if ($(tree.el).is(":visible")) {
            // console.log(184)
            return 184;
        } else {
            // console.log(22)
            return 22;
        }
    }
    addEvent(treeEl) {
       /* treeEl.onmouseover = PCPerformance.prototype.instance.showTree;
        treeEl.onmouseout = PCPerformance.prototype.instance.hideTree;
        var showTreeBtn = document.getElementById("treeBackground-pc");
        showTreeBtn.onmouseover = function () {
            PCPerformance.prototype.onShowTree();
            PCPerformance.prototype.instance.showTree();
        }
        treeEl.onmouseout()*/
    }

    showTree() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        var tree = new Tree();
      /*  $("#treeBackground-pc").hide();
        $(tree.el).show();*/
    }
    hideTree() {
      /*  if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(function () {
            var tree = new Tree();
            $("#treeBackground-pc").show();
            $(tree.el).hide();
            PCPerformance.prototype.onHideTree()
        }, 1000)*/
    }
}
class PhonePerformance extends Performance {
    constructor(fun1, fun2) {
        super(fun1, fun2);
        if (PhonePerformance.prototype.instance) {
            return PhonePerformance.prototype.instance;
        } else {
          /*  $("body").append("<div id='treeBackground-phone' class='treeBackground-phone'></div>");*/
            var tree = new Tree();
            this.btnEl = document.getElementById("treeBackground-phone");
            this.treeEl = tree.el;
            this.hideTreeTimer = null;
            this.touchendTimer = null;
            $(this.treeEl).addClass("largeTree");
            PhonePerformance.prototype.instance = this;
            return this;
        }
    }
    getWidth() {
        var tree = new Tree();
        if ($(tree.el).is(":visible")) {
            return 186;
        } else {
            return 0;
        }
    }
    addEvent(treeEl) {
        treeEl.ontouchstart = this.showTree;
        treeEl.ontouchend = this.hideTreeProxy;
        treeEl.ontouchend();
        
    }
    move(event) {
        var container = document.getElementsByClassName("assistive-touch")[0];
        //获取手指当前坐标
        var pageX = event.touches[0].clientX;
        var pageY = event.touches[0].clientY;
        //获取按钮的大小
        var width = parseInt(container.clientWidth) || 0;
        var height = parseInt(container.clientHeight) || 0;
        //计算出鼠标坐标相对于block坐标的间距
        container.style.left = (pageX + width / 2) + "px"; //设置block的X坐标
        container.style.top = (pageY + height / 2) + "px"; //设置block的Y坐标
        if (!document.ontouchmove) {
            document.ontouchmove = moveIt(event);
        }

        function moveIt(event) {
            container.style.left = (event.touches[0].clientX - width / 2) + "px"; //设置block的X坐标
            container.style.top = PhonePerformance.prototype.top = ((event.touches[0].clientY - height / 2) < 0 ? 0 : (event.touches[0].clientY - height / 2)) + "px"; //设置block的Y坐标
        }

        document.ontouchend = function () {
            PhonePerformance.prototype.instance.hideTreeProxy();
            $(document).unbind("touchmove", moveIt).unbind("touchend");
        }
    }
    hideTreeProxy() {
        $("#treeBackground-phone").css({
            "top": PhonePerformance.prototype.top,
            "left": "",
        });
        if (this.hideTreeTimer) {
            clearTimeout(this.hideTreeTimer);
        }
        this.hideTreeTimer = setTimeout(function () {
            var me = PhonePerformance.prototype.instance

            $("#treeBackground-phone").removeClass("treeBackground-phone").addClass("assistive-touch")
                .css({
                    "background-image": "url(" + Tree.prototype.instance.absoluteSrc + "menuBtn.png)",
                });
            me.hideTree();

            var assistiveTouch = document.getElementsByClassName("assistive-touch")[0];
            me.addEventListenrToAssistiveTouch();
           if (me.touchendTimer) {
                clearTimeout(me.touchendTimer);
            }
            me.touchendTimer = setTimeout(function () {
                $(assistiveTouch).addClass("assistive-touch-idle");
            }, 4000)
        }, 3000)
    }
    addEventListenrToAssistiveTouch() {
        var me = this;
        
        var assistiveTouch = document.getElementsByClassName("assistive-touch")[0];

        assistiveTouch.onclick = function () {
            me.showTree()
        };
        assistiveTouch.ontouchmove = function (event) {
            event.preventDefault();
            event.stopPropagation();
            me.move(event)
        };
        assistiveTouch.ontouchstart = function () {
            $(assistiveTouch).removeClass("assistive-touch-idle").addClass("assistive-touch-touched");
            if (me.touchendTimer) {
                console.log("清除touchendTimer")
                clearTimeout(me.touchendTimer);
            }
        };
        assistiveTouch.ontouchend = function () {
            $(assistiveTouch).removeClass("assistive-touch-touched");
            me.hideTreeProxy();
            if (me.touchendTimer) {
                clearTimeout(me.touchendTimer);
            }
            me.touchendTimer = setTimeout(function () {
                $(assistiveTouch).addClass("assistive-touch-idle");
            }, 2000)
        }
    }
    hideTree() {
        /*var tree = new Tree();
        $(tree.el).hide();
        PhonePerformance.prototype.onHideTree();*/
    }
    showTree() {
        if (this.hideTreeTimer) {
            clearTimeout(this.hideTreeTimer);
        }
        var tree = new Tree();
        $("#treeBackground-phone").removeAttr("style").removeClass("assistive-touch assistive-touch-idle").addClass("treeBackground-phone");
        $(tree.el).show(300);
        PhonePerformance.prototype.onShowTree();
        this.hideTreeTimer = setTimeout(function () {
            var me = PhonePerformance.prototype.instance
            $("#treeBackground-phone").removeClass("treeBackground-phone").addClass("assistive-touch")
                .css({
                    "background-image": "url(" + Tree.prototype.instance.absoluteSrc + "menuBtn.png)",
                });
            me.hideTree();
            me.addEventListenrToAssistiveTouch();
            $("#treeBackground-phone").css({
                "top": PhonePerformance.prototype.top,
                "left": "",
            });

        }, 3000)

    }
}