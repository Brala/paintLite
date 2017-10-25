window.onload = function () {
    init()
};

var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;
    lineSize = 0;
    blurSize = 5;

var VAR = {
        W: 0,
        H: 0,
        rand: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};

//----change pen size----
var sizer = document.getElementById('sizer');
lineSize = document.getElementById('sizer').value;
var changeSize = function(){lineSize = document.getElementById('sizer').value;}
sizer.addEventListener('change',changeSize,false);

//----change blur size----
var blurer = document.getElementById('blurer');
blurSize = document.getElementById('blurer').value;
var changeBlur = function(){blurSize = document.getElementById('blurer').value;};
blurer.addEventListener('change', changeBlur, false);
//----change color----
var color = 'black';
var colors = ['white','black','yellow','red','green','brown','blue','pink','grey','purple','cyan','orange'];

var col = document.getElementsByClassName('color');
for(var i=0; i<colors.length; i++){
    col[i].addEventListener("click", change(i), false)
}
function change(i) { return function(){ color = colors[i]; };}

// ----clear canvas----
var clearCanvas = document.getElementById('clearCanvas');
var clear = function(){ ctx.clearRect(0,0,VAR.W,VAR.H); };
clearCanvas.addEventListener('click', clear, false);

var init = function () {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    layout();
    window.addEventListener('resize', layout, false);
    document.body.appendChild(canvas);
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
            // ctx.shadowBlur = blurSize;
            ctx.arc(currX, currY, lineSize/2, 0 * (Math.PI / 180), 360 * (Math.PI / 180));
            ctx.fill();
            ctx.closePath();
            dot_flag = false;
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

var layout = function (e) {
    VAR.W = window.innerWidth;
    VAR.H = window.innerHeight;
    VAR.d = Math.min(VAR.W, VAR.H);
    canvas.width = VAR.W;
    canvas.height = VAR.H;
};

//----Mouse MOVING menu divs----
var mousePosition;
var offset = [0, 0];
var isDown1, isDown2, isDown3, isDown4 = false;
//var menus = ['menu1','menu2','menu3','menu4'];
//for(i=0,i>menus.length,i++){}


//----------------- 1st menu div ----

var m1 = document.getElementById('menu1');
m1.style.top = '5%';
m1.style.left = '5%';
m1.addEventListener('mousedown', function (e) {
    isDown1 = true;
    offset = [
        m1.offsetLeft - e.clientX,
        m1.offsetTop - e.clientY
    ];
}, true);

document.addEventListener('mouseup', function () {
    isDown1 = false;
}, true);

document.addEventListener('mousemove', function (event) {
    event.preventDefault();
    if (isDown1) {
        mousePosition = {
            x: event.clientX,
            y: event.clientY
        };
        m1.style.left = (mousePosition.x + offset[0]) + 'px';
        m1.style.top = (mousePosition.y + offset[1]) + 'px';
    }
}, true);

//----------------- 2nd menu div ----

var m2 = document.getElementById('menu2');
//----Initial position of element related to window 
m2.style.bottom = '5%';
m2.style.right = '5%';
//----returns number of width and height of an element
var m2Width = parseInt(window.getComputedStyle(m2).width, 10);
var m2Height = parseInt(window.getComputedStyle(m2).height, 10);
//----returns X and Y of coursor related to the element(top and left) + start moving
m2.addEventListener('mousedown', function (e) {
    isDown2 = true;
    offset2 = [
        m2Width + (m2.offsetLeft - e.clientX),
        m2Height + (m2.offsetTop - e.clientY)
    ];
}, true);
//----stop moving
document.addEventListener('mouseup', function () {
    isDown2 = false;
}, true);
//----mousemove-change position of div related to window
document.addEventListener('mousemove', function (event) {
    event.preventDefault();
    if (isDown2) {
        mousePosition = {
            x: event.clientX,
            y: event.clientY
        };
        m2.style.right = ((VAR.W - mousePosition.x) - offset2[0]) + 'px';
        m2.style.bottom = ((VAR.H - mousePosition.y) - offset2[1]) + 'px';
    }
}, true);

//----------------- 3rd menu div ----

var m3 = document.getElementById('menu3');
//----Initial position of element related to window 
m3.style.top = '5%';
m3.style.right = '5%';
//----returns number of width and height of an element
var m3Width = parseInt(window.getComputedStyle(m3).width, 10);
var m3Height = parseInt(window.getComputedStyle(m3).height, 10);
//----returns X and Y of coursor related to the element(top and left) + start moving
m3.addEventListener('mousedown', function (e) {
    isDown3 = true;
    offset3 = [
        m3Width + (m3.offsetLeft - e.clientX),
        m3Height + (m3.offsetTop - e.clientY)
    ];
}, true);
//----stop moving
document.addEventListener('mouseup', function () {
    isDown3 = false;
}, true);
//----mousemove-change position of div related to window
document.addEventListener('mousemove', function (event) {
    event.preventDefault();
    if (isDown3) {
        mousePosition = {
            x: event.clientX,
            y: event.clientY
        };
        m3.style.top = 'auto';
        m3.style.right = ((VAR.W - mousePosition.x) - offset3[0]) + 'px';
        m3.style.bottom = ((VAR.H - mousePosition.y) - offset3[1]) + 'px';
    }
}, true);

//----------------- 4th menu div ----

var m4 = document.getElementById('menu4');
//----Initial position of element related to window 
m4.style.bottom = '5%';
m4.style.left = '5%';
//----returns number of width and height of an element
var m4Width = parseInt(window.getComputedStyle(m4).width, 10);
var m4Height = parseInt(window.getComputedStyle(m4).height, 10);
//----returns X and Y of coursor related to the element(top and left) + start moving
m4.addEventListener('mousedown', function (e) {
    isDown4 = true;
    offset4 = [
        m4Width + (m4.offsetLeft - e.clientX),
        m4Height + (m4.offsetTop - e.clientY)
    ];
}, true);
//----stop moving
document.addEventListener('mouseup', function () {
    isDown4 = false;
}, true);
//----mousemove-change position of div related to window
document.addEventListener('mousemove', function (event) {
    event.preventDefault();
    if (isDown4) {
        mousePosition = {
            x: event.clientX,
            y: event.clientY
        };
        m4.style.left = 'auto';
        m4.style.right = ((VAR.W - mousePosition.x) - offset4[0]) + 'px';
        m4.style.bottom = ((VAR.H - mousePosition.y) - offset4[1]) + 'px';
    }
}, true);