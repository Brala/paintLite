window.onload = function () {
    init()
};

var flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false,
    lineSize = 0,
    blurSize = 5;

var VAR = {
    W: 0,
    H: 0,
    rand: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    startSize: function(){}
};

//----change pen size----
var sizer = document.getElementById('sizer');
lineSize = document.getElementById('sizer').value;
var changeSize = function () {
    lineSize = document.getElementById('sizer').value;
}
sizer.addEventListener('change', changeSize, false);

//----change blur size----
var blurer = document.getElementById('blurer');
blurSize = document.getElementById('blurer').value;
var changeBlur = function () {
    blurSize = document.getElementById('blurer').value;
};
blurer.addEventListener('change', changeBlur, false);
//----change color----
var color = 'black';
var colors = ['white', 'black', 'yellow', 'red', 'green', 'brown', 'blue', 'pink', 'grey', 'purple', 'cyan', 'orange'];

var col = document.getElementsByClassName('color');
for (var i = 0; i < colors.length; i++) {
    col[i].addEventListener("click", change(i), false)
}

function change(i) {
    return function () {
        color = colors[i];
    };
}

// ----clear canvas----
var clearCanvas = document.getElementById('clearCanvas');
var fill = function() {
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
clearCanvas.addEventListener('click', fill, false);


var init = function () {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    window.addEventListener('resize',layout,false);
    layout();
    document.body.appendChild(canvas);
    VAR.startSize();
    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false)
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false)
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false)
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false)
};

function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineSize;
    ctx.shadowBlur = blurSize;
    ctx.shadowColor = color;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.closePath();
}

function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX;
        currY = e.clientY;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.shadowBlur = blurSize;
            ctx.shadowColor = color;
            ctx.arc(currX, currY, lineSize / 2, 0 * (Math.PI / 180), 360 * (Math.PI / 180));
            ctx.fill();
            ctx.closePath();
        }
    }
    if (res == 'up' || res == 'out') {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX;
            currY = e.clientY;
            draw();
        }
    }
}
//--------
var layout = function (e) {
    VAR.W = window.innerWidth;
    VAR.H = window.innerHeight;
    var setWidth = document.getElementById('width');
    var setHeight = document.getElementById('height');

    // ----change canvas size with <input> values----
    
    fillCanvas();
    // ----fill canvas bg-color----
    function fillCanvas() {
        fill();

        VAR.startSize = function(){
            canvas.width = setWidth.value;
            canvas.height = setHeight.value;
            setWidth.addEventListener('change', function () {
                canvas.width = setWidth.value;
                fill();
            }, false);
            setHeight.addEventListener('change', function () {
                canvas.height = setHeight.value;
                fill();
            }, false);
            fill();
        } 

        windowSize.addEventListener('click', function () {
            canvas.width = VAR.W;
            canvas.height = VAR.H;
            setWidth.value = VAR.W;
            setHeight.value = VAR.H;
            fill();
        })
    }
};
var windowSize = document.getElementById('window-size');

//----Mouse MOVING menu divs----
var mousePosition;
var offset = [0, 0];
var isDown = [false,false,false,false];
var menus = document.getElementsByClassName('menu');

//----returns number of width and height of an menu element
var m2Width = parseInt(window.getComputedStyle(menus[1]).width, 10);
var m2Height = parseInt(window.getComputedStyle(menus[1]).height, 10);
var m3Width = parseInt(window.getComputedStyle(menus[2]).width, 10);
var m4Height = parseInt(window.getComputedStyle(menus[3]).height, 10);
//----Initial positions of menu elements related to window 
menus[0].style.top = '5%';
menus[0].style.left = '5%';
menus[1].style.top = (window.innerHeight/100)*95 - m2Height + 'px';
menus[1].style.left = (window.innerWidth/100)*95 - m2Width +'px';
menus[2].style.top = '5%';
menus[2].style.left = (window.innerWidth/100)*95 - m3Width + 'px';
menus[3].style.top = (window.innerHeight/100)*95 - m4Height + 'px';
menus[3].style.left = '5%';
//----returns X and Y of coursor related to the element(top and left) + start moving
for(i=0;i<menus.length;i++){
    menus[i].addEventListener('mousedown', function (e) {
        isDown[i] = true;
        offset = [
            menus[i].offsetLeft - e.clientX,
            menus[i].offsetTop - e.clientY
        ];
    }, true);

};

menus[1].addEventListener('mousedown', function (e) {
    isDown[1] = true;
    offset2 = [
        menus[1].offsetLeft - e.clientX,
        menus[1].offsetTop - e.clientY
    ];
}, true);
menus[2].addEventListener('mousedown', function (e) {
    isDown[2] = true;
    offset3 = [
        menus[2].offsetLeft - e.clientX,
        menus[2].offsetTop - e.clientY
    ];
}, true);
menus[3].addEventListener('mousedown', function (e) {
    isDown[3] = true;
    offset4 = [
        menus[3].offsetLeft - e.clientX,
        menus[3].offsetTop - e.clientY
    ];
}, true);
//----stop moving
document.addEventListener('mouseup', function () {
    isDown[0] = false;
}, true);
document.addEventListener('mouseup', function () {
    isDown[1] = false;
}, true);
document.addEventListener('mouseup', function () {
    isDown[2] = false;
}, true);
document.addEventListener('mouseup', function () {
    isDown[3] = false;
}, true);
//----mousemove-change position of div related to window
document.addEventListener('mousemove', function (event) {
    if (isDown[0]) {
        mousePosition = {
            x: event.clientX,
            y: event.clientY
        };
        menus[0].style.left = (mousePosition.x + offset[0]) + 'px';
        menus[0].style.top = (mousePosition.y + offset[1]) + 'px';
    }
}, true);
document.addEventListener('mousemove', function (event) {
    if (isDown[1]) {
        mousePosition = {
            x: event.clientX,
            y: event.clientY
        };
        menus[1].style.left = (mousePosition.x + offset2[0]) + 'px';
        menus[1].style.top = (mousePosition.y + offset2[1]) + 'px';
    }
}, true);
document.addEventListener('mousemove', function (event) {
    if (isDown[2]) {
        mousePosition = {
            x: event.clientX,
            y: event.clientY
        };
        menus[2].style.left = (mousePosition.x + offset3[0]) + 'px';
        menus[2].style.top = (mousePosition.y + offset3[1]) + 'px';
    }
}, true);
document.addEventListener('mousemove', function (event) {
    if (isDown[3]) {
        mousePosition = {
            x: event.clientX,
            y: event.clientY
        };
        menus[3].style.left = (mousePosition.x + offset4[0]) + 'px';
        menus[3].style.top = (mousePosition.y + offset4[1]) + 'px';
    }
}, true);