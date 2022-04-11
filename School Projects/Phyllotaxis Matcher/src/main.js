import * as utils from "./utils.js";

const canvasWidth = 400, canvasHeight = 300;
let ctx, ctx2;

let n = 0;
let n2 = 0;

let divergence = 137.5;
let divergenceNew = 137.5;
let divergence2 = 137.5;

let size = 2;
let sizeNew = 2;
let size2 = 2;

let c = 2;
let cNew = 2;
let c2 = 2;

let increment = 0;
let incrementNew = 0;
let increment2 = 0;

let color = utils.random(7);
let colorNew = 1;
let color2 = utils.random(7);

let fps, fpsNew;

let correct = 0;
let incorrect = 0;

window.onload = init;

function init(){
    ctx = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    ctx2 = canvas2.getContext("2d");
    canvas2.width = canvasWidth;
    canvas2.height = canvasHeight;

    ctx.fillRect(0,0,canvasWidth,canvasHeight);
    ctx2.fillRect(0,0,canvasWidth,canvasHeight);

    //generates a phyllotaxis to match
    restart2();

    // sets up all buttons and phyllotaxis generation options
    document.querySelector("#restart").onclick = restart;

    document.querySelector("#Compare").onclick = restartGame;

    let speedButtons = document.querySelectorAll("input[type=radio][name=speed]");
    for (let r of speedButtons){
        r.onchange = function(e){
            fpsNew = Number(e.target.value);
        }
    }

    let degreeButtons = document.querySelectorAll("input[type=radio][name=degree]");
    for (let r of degreeButtons){
        r.onchange = function(e){
            divergenceNew = Number(e.target.value);
            document.querySelector("#eleven").innerHTML = divergenceNew;
        }
    }

    let sizeButtons = document.querySelectorAll("input[type=radio][name=size]");
    for (let r of sizeButtons){
        r.onchange = function(e){
            sizeNew = Number(e.target.value);
            document.querySelector("#fourteen").innerHTML = sizeNew;
        }
    }

    let spaceButtons = document.querySelectorAll("input[type=radio][name=space]");
    for (let r of spaceButtons){
        r.onchange = function(e){
            cNew = Number(e.target.value);
            document.querySelector("#thirteen").innerHTML = cNew;
        }
    }

    let incButtons = document.querySelectorAll("input[type=radio][name=sizeIncrease]");
    for (let r of incButtons){
        r.onchange = function(e){
            incrementNew = Number(e.target.value);
            document.querySelector("#twelve").innerHTML = incrementNew;
        }
    }

    let colorButtons = document.querySelectorAll("input[type=radio][name=color]");
    for (let r of colorButtons){
        r.onchange = function(e){
            colorNew = Number(e.target.value);
            document.querySelector("#fifteen").innerHTML = colorNew;
        }
    }

    loop();
}

function loop(){
    setTimeout(loop, 1000/fps);

    //angle and radius of the dot on the first canvas
    let a = n * utils.dtr(divergence);
    let r = c * Math.sqrt(n);

    //angle and radius of the dot on the second canvas
    let a2 = n2 * utils.dtr(divergence2);
    let r2 = c2 * Math.sqrt(n2);

    // the x and y of the dot on the first canvas
    let x = r * Math.cos(a) + canvasWidth/2;
    let y = r * Math.sin(a) + canvasHeight/2;

    //the x and y of the dot on the second canvas
    let x2 = r2 * Math.cos(a2) + canvasWidth/2;
    let y2 = r2 * Math.sin(a2) + canvasHeight/2;

    let aDegrees = (n * divergence) % 256;
    let aDegrees2 = (n2 * divergence2) % 256;

    let colorSetting
    let colorSetting2

    switch (color){
        case 1:
            colorSetting = `rgb(255,255,${aDegrees})`
            break;
        case 2:
            colorSetting = `rgb(255,${aDegrees},255)`
            break;
        case 3:
            colorSetting = `rgb(255,${aDegrees},${aDegrees})`
            break;
        case 4:
            colorSetting = `rgb(${aDegrees},255,255)`
            break;
        case 5:
            colorSetting = `rgb(${aDegrees},255,${aDegrees})`
            break;
        case 6:
            colorSetting = `rgb(${aDegrees},${aDegrees},255)`
            break;
        case 7:
            colorSetting = `rgb(${aDegrees},${aDegrees},${aDegrees})`
            break;
    }

    switch (color2){
        case 1:
            colorSetting2 = `rgb(255,255,${aDegrees2})`
            break;
        case 2:
            colorSetting2 = `rgb(255,${aDegrees2},255)`
            break;
        case 3:
            colorSetting2 = `rgb(255,${aDegrees2},${aDegrees2})`
            break;
        case 4:
            colorSetting2 = `rgb(${aDegrees2},255,255)`
            break;
        case 5:
            colorSetting2 = `rgb(${aDegrees2},255,${aDegrees2})`
            break;
        case 6:
            colorSetting2 = `rgb(${aDegrees2},${aDegrees2},255)`
            break;
        case 7:
            colorSetting2 = `rgb(${aDegrees2},${aDegrees2},${aDegrees2})`
            break;
    }


    //generates a dot on the first canvas with the given varaibles, as well as wether the dot should be larger than the previous dot
    if(increment > 0){
        drawCircle(ctx,x,y,size + n/increment,colorSetting);
    }
    else{drawCircle(ctx,x,y,size,colorSetting);}

    //the same generation occurs on the second canvas
    if(increment2 > 0){
        drawCircle(ctx2,x2,y2,size2 + n2/increment2,colorSetting2);
    }
    else{drawCircle(ctx2,x2,y2,size2,colorSetting2);}

    n++;
    n2++;
}

//draws a dot on the canvas with the given values
function drawCircle(ctx,x,y,radius,color){
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

//restarts the Phyllotaxis generation of the first canvas, and updates the variables if any have changed.
function restart(){
    divergence = divergenceNew;
    fps = fpsNew;
    increment = incrementNew;
    c = cNew;
    size = sizeNew;
    color = colorNew;
    n = 0;
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 400, 300);
    ctx.restore();
}

//restarts the Phyllotaxis generation of the second canvas, and creates new variable to generate the phyllotaxis by
function restart2(){
    n2 = 0;
    divergence2 = utils.randomDeg();
    increment2 = utils.randomInc();
    c2 = utils.random(5);
    size2 = utils.random(5);
    color2 = utils.random(7);
    ctx2.save();
    ctx2.fillStyle = 'black';
    ctx2.fillRect(0, 0, 400, 300);
    ctx2.restore();
}

//updates the score depending on if the comparison is successful, and creates a new phyllotaxis on the second canvas if the comparison is successful.
function restartGame(){
    if(utils.comparePhy(divergence, divergence2, c, c2, increment, increment2, size, size2, color, color2))
    {
        correct++;
        document.querySelector("#correct").innerHTML = "Correct Matches: " + correct;
    }
    else{
        incorrect++;
        document.querySelector("#incorrect").innerHTML = "Incorrect Matches: " + incorrect;
    }
    restart2();
}

export{init}