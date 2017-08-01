/**
 * Created by Administrator on 2017/4/1 0001.
 */
var arr = [];
var last;
var first = document.getElementById('parent');
var flag = false;
function parentStart(node) {
    if (node) {
        arr.push(node);
        parentStart(node.firstElementChild);
        parentStart(node.lastElementChild);
    }
}
function sonStart(node) {
    if(node) {
        sonStart(node.firstElementChild);
        sonStart(node.lastElementChild);
        arr.push(node);
    }
}
function midStart(node) {
    if(node) {
        midStart(node.firstElementChild);
        arr.push(node);
        midStart(node.lastElementChild);
    }
}
function midBtn() {
    if (!flag) {
        reset();
        midStart(first);
        changeColor();
    }
}
function sonBtn() {
    if (!flag) {
        reset();
        sonStart(first);
        changeColor();
    }
}
function parentBtn () {
    if (!flag) {
        reset();
        parentStart(first);
        changeColor();
    }
}
function changeColor() {
    for (var i = 0; i < arr.length; i++) {
        setTimeout(function (i) {
            return function () {
                if (i == 0) {
                    arr[i].style.backgroundColor = 'blue';
                } else if (i < arr.length){
                    arr[i].style.backgroundColor = 'blue';
                    arr[i-1].style.backgroundColor = '#fff';
                }
                if (i == arr.length-1) {
                    last = arr[i];
                    flag = false;
                }
            }
        }(i),i*500)
    }
}
function reset() {
    flag = true;
    if (last) {
        last.style.backgroundColor = '#fff';
    }
    arr=[];
}