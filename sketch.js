// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g

var population;
// Each rocket is alive till 400 frames
var lifespan = 700;
// Keeps track of frames
var count = 0;

var geracao = 1;
// Where rockets are trying to go
var target;
// Max force applied to rocket
var maxforce = 1;

var obstacles = [];

var targetRadius = 15;
var moveTarget = false;

var obs;

function setup() {
    rx = (window.innerWidth / 2) - 300;
    createCanvas(window.innerWidth, window.innerHeight);
    population = new Population();
    target = createVector(width / 2, 80);
}

function draw() {
    clear();
    
    textSize(190);
    fill(0, 0, 0, 30);
    textFont("fantasy");
    text('Gen - ' + geracao, 30, (window.innerHeight - 10));
    
    fill(0, 0, 0, 90);
    ellipse(width - 45, 35, 50, 50);
    fill(255, 255, 255);
    ellipse(width - 45, 35, 47, 47);

    population.run(target);
    count++;
    if (count == lifespan) {
        population.evaluate();
        population.selection();
        count = 0;
        geracao++;
    }
    
    fill(40, 200, 40, 90);
    ellipse(target.x, target.y, targetRadius*2, targetRadius*2);
    fill(255);
    ellipse(target.x, target.y, targetRadius*2-4, targetRadius*2-4);
    
    for(let obstacle of obstacles){
        obstacle.show();
    }
    
    if(obs != undefined){
        rectMode(CORNER);
        fill(200, 100, 100, 50);
        stroke(230, 100, 100, 50);
        let x;
        let y;
        let w;
        let h;
        if(obs.x <= mouseX){
            x = obs.x;
            w = mouseX - obs.x;
        } else {
            x = mouseX;
            w = obs.x - mouseX;
        }
        
        if(obs.y <= mouseY){
            y = obs.y;
            h = mouseY - obs.y;
        } else {
            y = mouseY;
            h = obs.y - mouseY;
        }
        rect(x, y, w, h);
        noStroke();
    }
    strokeWeight(15);
    stroke(0, 0, 0, 90);
    line(15, (window.innerHeight - 20), 15, map(count, 0, lifespan, (window.innerHeight - 20), 20));
    noStroke();
    
    textSize(30);
    fill(0, 0, 0, 90);
    text('Melhor da rodada', width - 300, 47);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    rx = (window.innerWidth / 2) - 300;
    target.x = width / 2;
}

function mousePressed(){
    if(dist(mouseX, mouseY, target.x, target.y) <= targetRadius){
        moveTarget = true;
    }
}

function mouseDragged(){
    if(moveTarget){
        target.x = mouseX;
        target.y = mouseY;
    } else {
        if(obs == undefined){
            obs = new Obstacle(mouseX, mouseY);
        }
    }
}

function mouseReleased(){
    if(obs != undefined){
        obs.complete(mouseX, mouseY);
        obstacles.push(obs);
    }
    
    moveTarget = false;
    obs = undefined;
}

function keyPressed() {
    console.log(keyCode);
    if (keyCode === 82) {
        location.reload();
    }
}



