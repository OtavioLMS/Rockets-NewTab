// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g

// Constructor function
function Rocket(dna, geracao) {
    var r;
    var g;
    var b;
    var destaque = false;
    var primeiro = false;
    
    if(geracao == undefined){
        this.ro = floor(random(0, 200));
        this.go = floor(random(0, 200));
        this.bo = floor(random(0, 200));
        this.radius = floor(random(10,20));
        this.legs = floor(random(-10,-20));
    } else {
        this.ro = geracao.ro;
        this.go = geracao.go;
        this.bo = geracao.bo;
        this.radius = geracao.radius;
        this.legs = geracao.legs;
    }
    // Physics of rocket at current instance
    this.pos = createVector(width / 2, height-20);
    this.vel = createVector();
    this.acc = createVector();
    // Checkes rocket has reached target
    this.completed = false;
    // Checks if rocket had crashed
    this.crashed = false;
    // Gives a rocket dna
    if (dna) {
        this.dna = dna;
    } else {
        this.dna = new DNA();
    }
    this.fitness = 0;

    // Object can recieve force and add to acceleration
    this.applyForce = function (force) {
        this.acc.add(force);
    }
    // Calulates fitness of rocket
    this.calcFitness = function (peso) {
        // Takes distance to target
        var d = dist(this.pos.x, this.pos.y, target.x, target.y);

        // Maps range of fitness
        this.fitness = map(d, 0, width, width, 0);
        // If rocket gets to target increase fitness of rocket
        if (this.completed) {
            this.fitness *= 10;
        }
        // If rocket does not get to target decrease fitness
        if (this.crashed) {
            this.fitness /= 10;
        }
    }
    // Updates state of rocket
    this.update = function () {
        // Checks distance from rocket to target
        var d = dist(this.pos.x, this.pos.y, target.x, target.y);
        if (primeiro) {
            this.pos.x = width - 45;
            this.pos.y = 35;
            this.vel = createVector();
        } else if (this.completed) {
            this.pos = target.copy();
        } else if (d < targetRadius) {
            this.completed = true;
            this.pos = target.copy();
        }
        
        this.checkCrash();
        // Rocket has hit left or right of window
        if (this.pos.x > width || this.pos.x < 0) {
            this.crashed = true;
        }
        // Rocket has hit top or bottom of window
        if (this.pos.y > height || this.pos.y < 0) {
            this.crashed = true;
        }

        //applies the random vectors defined in dna to consecutive frames of rocket
        this.applyForce(this.dna.genes[count]);
        // if rocket has not got to goal and not crashed then update physics engine
        if (!this.completed && !this.crashed) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
            this.vel.limit(4);
        }
    }
    // displays rocket to window
    this.show = function (target) {
        // push and pop allow's rotating and translation not to affect other objects
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        
        if(destaque){
            strokeWeight(2);
            stroke(50,255,50, 50);
        } else {
            noStroke();
        }
        
        if(this.crashed){
            fill(this.r, this.g, this.b, 30);
        } else {
            fill(this.r, this.g, this.b);
        }
        
        rectMode(CENTER);
        ellipse(0, 0, this.radius);
        
        strokeWeight(2);
        stroke(255,255,255,50);
        if(this.crashed){
            stroke(this.r, this.g, this.b, 30);
        } else {
            stroke(this.r, this.g, this.b);
        }
        line(0,2,this.legs,5);
        line(0,0,this.legs,0);
        line(0,-2,this.legs,-5);
        
        noStroke();
        pop();
    }

    this.destacar = function () {
        destaque = true;
        
        push();
        translate(width - 45, 35);
        rotate(this.vel.heading());
        
        if(destaque){
            strokeWeight(2);
            stroke(50,255,50, 50);
        } else {
            noStroke();
        }
        
        if(this.crashed){
            fill(this.r, this.g, this.b, 30);
        } else {
            fill(this.r, this.g, this.b);
        }
        
        rectMode(CENTER);
        ellipse(0, 0, this.radius);
        
        strokeWeight(2);
        stroke(255,255,255,50);
        if(this.crashed){
            stroke(this.r, this.g, this.b, 30);
        } else {
            stroke(this.r, this.g, this.b);
        }
        line(0,2,this.legs,5);
        line(0,0,this.legs,0);
        line(0,-2,this.legs,-5);
        
        noStroke();
        pop();
    }

    this.destacarSimples = function () {
        destaque = true;
    }

    this.chegouPrimeiro = function () {
        primeiro = true;
    }

    this.tirarDestaque = function () {
        this.r = this.ro;
        this.g = this.go;
        this.b = this.bo;
        destaque = false;
    }
    
    this.checkCrash = function(){
        for(let obstacle of obstacles){
            if (this.pos.x > obstacle.x && this.pos.x < obstacle.x + obstacle.width && this.pos.y > obstacle.y && this.pos.y < obstacle.y + obstacle.height) {
                this.crashed = true;
            }
        }
    }
}
