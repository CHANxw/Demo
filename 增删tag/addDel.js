/**
 * Created by Administrator on 2017/4/1 0001.
 */
var tags = [];
var hobbyData = [];
var inText = document.getElementById('in-text');
var tagList = document.getElementById('tag-list');
var hobby = document.getElementById('hobbys');
var hobbyList = document.getElementById('hobby-list');
initTagEvent (tagList,tags);
initTagEvent (hobbyList,hobbyData);

inText.addEventListener('keyup',function () {
    var text = inText.value.trim();
    var key = event.keyCode;
    var err = document.getElementById('alert-msg');
    if ((key == 13) || (key == 32) || (key == 188)) {
        if (text !== '') {
            addTag(tags,text);
            inText.value = '';
            err.innerHTML= '';
            initTags(tagList,tags);
        } else {
            err.innerHTML = '请输入正确的tag';
        }
    }
});
//事件代理
function initTagEvent (list,lists) {
    delegateEvent(list,'li','click',function () {
        var r = confirm('真的要删除这个tag吗？');
        if (r) {
            var tag = this.innerHTML.replace('点击删除','');
            console.log(tag);
            delTag(lists,tag);
            initTags(list,lists);
        }
    });
    delegateEvent(list,'li','mouseover',function () {
        var tag = this.innerHTML;
        this.innerHTML = '点击删除' + tag;
    });
    delegateEvent(list,'li','mouseout',function () {
        var tag = this.innerHTML;
        this.innerHTML = tag.replace('点击删除','')
    });
}

function resetHobby() {
    hobbyData = [];
    initTags(hobbyList,hobbyData);
}
function initTags(id,lists) {
    id.innerHTML='';
    for (var i = 0; i <lists.length; i++) {
        var oLi = document.createElement('li');
        oLi.innerHTML = lists[i];
        id.appendChild(oLi);
    }
}
function filterHobby() {
    var hobbys = hobby.value.trim().split(/[\s|,|，|.|。|\n]/).unique();
    for (var i = 0; i < hobbys.length; i++) {
        addTag(hobbyData,hobbys[i]);
        initTags(hobbyList,hobbyData);
    }
    hobby.value = '';
    console.log(hobbys);
}
function addTag(lists,item) {
    var flag = true;
    for (var i = 0; i < lists.length; i++) {
        if (item == lists[i]) {
            flag = false;
        }
    }
    if (flag) {
        if (lists.length > 9) {
            lists.splice(0,1);
        }
        lists.push(item);
    }
}
function delTag(lists,item) {
    for (var i = 0; i < lists.length; i++) {
        if (item == lists[i]) {
            lists.splice (i, 1);
        }
    }
}

function delegateEvent(parent,child,event,listener) {
    if (parent.addEventListener) {
        parent.addEventListener(event,listenFn)
    } else {
        parent.attachEvent('on' + event,listenFn)
    }
    function listenFn(e) {
        var e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.nodeName.toLowerCase() == child) {
            if (listener) {
                listener.call(target,e)
            }
        }
    }
}

Array.prototype.unique = function () {
    var temp = [];
    for (var i = 0; i < this.length; i++) {
        if (temp.indexOf(this[i]) == -1 && this[i] !== '') {
            temp.push(this[i]);
        }
    }
    return temp;
};

//原生上添加trim方法
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g,"");
    //正则替换
};
