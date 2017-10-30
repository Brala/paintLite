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

//----------------- 1st & 2nd menu div ----
var m1 = document.getElementsByClassName('menu');
var m3 = document.getElementById('menu4');
var m4 = document.getElementById('menu3');
//----returns number of width and height of an element
var m2Width = parseInt(window.getComputedStyle(m1[1]).width, 10);
var m2Height = parseInt(window.getComputedStyle(m1[1]).height, 10);
//----Initial position of element related to window 
m1[0].style.top = '5%';
m1[0].style.left = '5%';
m1[1].style.top = (window.innerHeight/100)*95 - m2Height + 'px';
m1[1].style.left = (window.innerWidth/100)*95 - m2Width +'px';
//----returns X and Y of coursor related to the element(top and left) + start moving
m1[0].addEventListener('mousedown', function (e) {
    isDown[0] = true;
    offset = [
        m1[0].offsetLeft - e.clientX,
        m1[0].offsetTop - e.clientY
    ];
}, true);
m1[1].addEventListener('mousedown', function (e) {
    isDown[1] = true;
    offset2 = [
        m1[1].offsetLeft - e.clientX,
        m1[1].offsetTop - e.clientY
    ];
}, true);


//----stop moving
document.addEventListener('mouseup', function () {
    isDown[0] = false;
}, true);
document.addEventListener('mouseup', function () {
    isDown[1] = false;
}, true);
//----mousemove-change position of div related to window
document.addEventListener('mousemove', function (event) {
    if (isDown[0]) {
        mousePosition = {
            x: event.clientX,
            y: event.clientY
        };
        m1[0].style.left = (mousePosition.x + offset[0]) + 'px';
        m1[0].style.top = (mousePosition.y + offset[1]) + 'px';
    }
}, true);
document.addEventListener('mousemove', function (event) {
    if (isDown[1]) {
        mousePosition = {
            x: event.clientX,
            y: event.clientY
        };
        m1[1].style.left = (mousePosition.x + offset2[0]) + 'px';
        m1[1].style.top = (mousePosition.y + offset2[1]) + 'px';
    }
}, true);

//----------------- 3rd menu div ----

var m3 = document.getElementById('menu3');
//----returns number of width and height of an element
var m3Width = parseInt(window.getComputedStyle(m3).width, 10);
//----Initial position of element related to window 
m3.style.top = '5%';
m3.style.left = (window.innerWidth/100)*95 - m3Width + 'px';
//----returns X and Y of coursor related to the element(top and left) + start moving
m3.addEventListener('mousedown', function (e) {
    isDown[2] = true;
    offset3 = [
        m3.offsetLeft - e.clientX,
        m3.offsetTop - e.clientY
    ];
}, true);
//----stop moving
document.addEventListener('mouseup', function () {
    isDown[2] = false;
}, true);
//----mousemove-change position of div related to window
document.addEventListener('mousemove', function (event) {
    if (isDown[2]) {
        mousePosition = {
            x: event.clientX,
            y: event.clientY
        };
        m3.style.left = (mousePosition.x + offset3[0]) + 'px';
        m3.style.top = (mousePosition.y + offset3[1]) + 'px';
    }
}, true);

//----------------- 4th menu div ----

var m4 = document.getElementById('menu4');
//----returns number of width and height of an elements
var m4Height = parseInt(window.getComputedStyle(m4).height, 10);
//----Initial position of element related to window 
m4.style.top = (window.innerHeight/100)*95 - m4Height + 'px';
m4.style.left = '5%';
//----returns X and Y of coursor related to the element(top and left) + start moving
m4.addEventListener('mousedown', function (e) {
    isDown[3] = true;
    offset4 = [
        m4.offsetLeft - e.clientX,
        m4.offsetTop - e.clientY
    ];
}, true);
//----stop moving
document.addEventListener('mouseup', function () {
    isDown[3] = false;
}, true);
//----mousemove-change position of div related to window
document.addEventListener('mousemove', function (event) {
    if (isDown[3]) {
        mousePosition = {
            x: event.clientX,
            y: event.clientY
        };
        m4.style.left = (mousePosition.x + offset4[0]) + 'px';
        m4.style.top = (mousePosition.y + offset4[1]) + 'px';
    }
}, true);