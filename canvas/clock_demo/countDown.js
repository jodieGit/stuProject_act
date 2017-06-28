var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADUS;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

const endTime = new Date(2017,5,29,14,56,54);
var curShowTimeSeconds = 0;

var balls = [];
var colorList = ['#33b5e5', '#0099cc', '#aa66cc', '#9933cc'];

// function countDown(cxt) {
//     var lastDate = new Date('2017-06-27');
//     var nowDate = new Date();
//     var dateDiff = lstDate.getTime() - nowDate.getTime();
//     var hour = Math.floor(dateDiff / (3600 * 1000));
//     var min = Math.floor((dateDiff % (3600 * 1000)) / (60 * 1000));
//     var sec = Math.floor(((dateDiff % (3600 * 1000)) % (60 * 1000)) / (1000));
//     renderDigit(MARGIN_TOP,  MARGIN_LEFT, sec, cxt);
// };


window.onload = function() {
    // WINDOW_WIDTH = document.body.clientWidth;
    // WINDOW_HEIGHT = document.body.clientHeight;
    WINDOW_WIDTH = window.innerWidth;
    WINDOW_HEIGHT = window.innerHeight;
    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
    RADUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1;
    MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurShowTimeSeconds();

    setInterval(function() {
        render(context);
        update();
    }, 50);
}
function getCurShowTimeSeconds() {
    var nowDate = new Date();
    var ret = nowDate.getHours() * 3600 + nowDate.getMinutes() * 60 + nowDate.getSeconds();
    return ret;
    // var dateDiff = endTime.getTime() - nowDate.getTime();
    // var ret = Math.round(dateDiff / 1000);
    // return ret > 0 ? ret : 0;
}
function update() {
    var nextShowTimeSeconds = getCurShowTimeSeconds();
    
    var nextHour = parseInt(nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHour*3600)/60) ;
    var nextSeconds = parseInt(nextShowTimeSeconds % 60);

    var curHour = parseInt(curShowTimeSeconds / 3600);
    var curMinutes = parseInt((curShowTimeSeconds - nextHour*3600)/60);
    var curSeconds = parseInt(curShowTimeSeconds % 60);

    if(nextSeconds != curSeconds) {
        if(parseInt(nextHour/10) != parseInt(curHour/10)) {
            addBall(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHour/10));
        }
        if(parseInt(nextHour%10) != parseInt(curHour % 10)) {
            addBall(MARGIN_LEFT + 15 * (RADUS + 1), MARGIN_TOP, parseInt(curHour % 10));
        }
        if(parseInt(nextMinutes/10) != parseInt(curMinutes/10)) {
            addBall(MARGIN_LEFT + 39 * (RADUS + 1), MARGIN_TOP, parseInt(curMinutes / 10));
        }
        if(parseInt(nextMinutes%10) != parseInt(curMinutes % 10)) {
            addBall(MARGIN_LEFT + 54 * (RADUS + 1), MARGIN_TOP, parseInt(curMinutes % 10));
        }
        if(parseInt(nextSeconds/10) != parseInt(curSeconds/10)) {
            addBall(MARGIN_LEFT + 78 * (RADUS + 1), MARGIN_TOP, parseInt(curSeconds / 10));
        }
        if(parseInt(nextSeconds%10) != parseInt(curSeconds % 10)) {
            addBall(MARGIN_LEFT + 93 * (RADUS + 1), MARGIN_TOP, parseInt(nextSeconds % 10));
        }
        curShowTimeSeconds = nextShowTimeSeconds;
    }
    updateBalls();
}
function updateBalls() {
    // console.log(balls);
    for(var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if(balls[i].y >= WINDOW_HEIGHT - RADUS) {
            balls[i].y = WINDOW_HEIGHT - RADUS;
            balls[i].vy = -balls[i].vy * 0.8;
        }
    }

    var cnt = 0;
    for(var i=0;i<balls.length;i++) {
        if(balls[i].x+RADUS >0 && balls[i].x-RADUS<WINDOW_WIDTH) {
            balls[cnt++] = balls[i];
        }
    }
    while(balls.length > Math.min(300, cnt)) {
        balls.pop();
    }
}
function addBall(x, y, num) {
    for(var i=0; i<digter[num].length; i++) {
        for(var j=0;j<digter[num][i].length; j++) {
            if(digter[num][i][j]== 1) {
                var aBall = {
                    x: x + j * 2 * (RADUS + 1) + (RADUS + 1),
                    y: y + i * 2 * (RADUS + 1) + (RADUS + 1),
                    g: Math.random() + 1.5,
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: -5,
                    color: colorList[Math.floor(Math.random()*colorList.length)]
                }
                balls.push(aBall);
            }
        }
    }
}
function render(cxt) {
    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    var hours = parseInt(curShowTimeSeconds / 3600);
    var minutes = parseInt((curShowTimeSeconds - hours*3600)/60);
    var seconds = curShowTimeSeconds % 60;
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours/10), cxt);
    renderDigit(MARGIN_LEFT + (7*2+1)*(RADUS+1), MARGIN_TOP, parseInt(hours%10), cxt);
    renderDigit(MARGIN_LEFT + (2*(7*2+1))*(RADUS+1), MARGIN_TOP, 10, cxt);
    renderDigit(MARGIN_LEFT + (2*(7*2+1) + 9)*(RADUS+1), MARGIN_TOP, parseInt(minutes/10), cxt);
    renderDigit(MARGIN_LEFT + (3*(7*2+1) + 9)*(RADUS+1), MARGIN_TOP, parseInt(minutes%10), cxt);
    renderDigit(MARGIN_LEFT + (4*(7*2+1) + 9)*(RADUS+1), MARGIN_TOP, 10, cxt);
    renderDigit(MARGIN_LEFT + (4*(7*2+1) + 9 + 9)*(RADUS+1), MARGIN_TOP, parseInt(seconds/10), cxt);
    renderDigit(MARGIN_LEFT + (5*(7*2+1) + 9 + 9)*(RADUS+1), MARGIN_TOP, parseInt(seconds%10), cxt);
    for(var i=0;i<balls.length;i++) {
        cxt.fillStyle = balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, RADUS, 0, 2*Math.PI, true);
        cxt.closePath();
        cxt.fill();
    }
} 

function renderDigit(x, y, num, cxt) {
    cxt.fillStyle = "rgb(0, 102, 153)";
    for(var i = 0; i < digter[num].length; i++) {
        for(var j = 0; j < digter[num][i].length; j++) {
            if(digter[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc(x + j * 2 * (RADUS + 1) + (RADUS + 1), y + i * 2 * (RADUS +1) + (RADUS + 1), RADUS, 0, 2 * Math.PI);
                cxt.closePath();
                cxt.fill();
            }
        }
    }
}
