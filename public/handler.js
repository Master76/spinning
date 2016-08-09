// general definition
const size = 10;
const tick = 20;
const speed = 1 / 120;
const padding = 20;
const fsdivr = 0.2;
var radius = 100;
var center = {
    x: 200,
    y: 200
};

window.onload = function () {
    performLayout();
    initShowText();

    initInstance("square0", -6 / 6, 0.8);
    initInstance("square1", -5 / 6, 0.9);
    initInstance("square2", -4 / 6, 1.0);
    initInstance("square3", -3 / 6, 1.1);

    initInstance("square4", -2 / 6, 1.2);
    initInstance("square5", -1 / 6, 1.3);
    initInstance("square6", 0 / 6, 1.4);
    initInstance("square7", 1 / 6, 1.5);

    initInstance("square8", 2 / 6, 1.6);
    initInstance("square9", 3 / 6, 1.7);
    initInstance("squarea", 4 / 6, 1.8);
    initInstance("squareb", 5 / 6, 1.9);
}

window.onresize = performLayout;

function performLayout() {
    // circle
    center.x = window.innerWidth * 0.5 - size;
    center.y = window.innerHeight * 0.5 - size;
    var min = center.x < center.y ? center.x : center.y;
    radius = min - padding * 2;
}

function initShowText() {
    var master = document.getElementById("master");
    var showText = constructShowText(master);
    showText.init();
    showText.tickStart();
}

function initInstance(name, pAlpha, scale) {
    var sizef;
    var alpha = -Math.PI;
    var instance;
    if (pAlpha != undefined) {
        alpha = Math.PI * pAlpha;
    }
    if (scale != undefined) {
        sizef = pixelf(size * scale);
    }
    else {
        sizef = pixelf(size);
    }
    var domElem = document.getElementById(name);
    domElem.style.position = "absolute"
    domElem.style.width = sizef;
    domElem.style.height = sizef;
    domElem.style.backgroundColor = "rgb(204, 204, 204)";

    instance = constructInstance(domElem, alpha);
    instance.tickStart();
}

function constructInstance(domElem, alpha) {
    var instance = {
        domElem: domElem,
        alpha: alpha,

        tickStart: function () {
            setInterval(this.relocate.bind(this), tick);
        },

        relocate: function () {
            if (alpha < -Math.PI) {
                alpha += 2 * Math.PI;
            }
            alpha -= Math.PI * speed;

            var position = {
                x: center.x - radius * Math.sin(alpha),
                y: center.y - radius * Math.cos(alpha)
            }

            domElem.style.marginLeft = pixelf(position.x);
            domElem.style.marginTop = pixelf(position.y);
        }
    }
    return instance;
}

function constructShowText(domElem) {
    var showText = {
        domElem: domElem,

        init: function () {
            domElem.style.position = "absolute";
            domElem.style.fontFamily = "Consolas";
            domElem.style.wordWrap = "false";
            domElem.style.webkitUserSelect = "none";
            domElem.style.cursor = "default";
            domElem.style.color = "rgb(86, 86, 86)";
            domElem.textContent = "MasterYu Engine";
        },

        tickStart: function () {
            setInterval(this.relocate.bind(this), tick * 5);
        },

        relocate: function () {
            var fontSize = radius * fsdivr;
            domElem.style.fontSize = pixelf(fontSize);
            var width = master.clientWidth * 0.5 - size;
            var height = master.clientHeight * 0.5 - size;
            domElem.style.marginLeft = pixelf(center.x - width);
            domElem.style.marginTop = pixelf(center.y - height);
        }
    }
    return showText;
}

function pixelf(num) {
    var str = num + "px";
    return str;
}