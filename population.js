// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g

function Population() {
    // Array of rockets
    this.rockets = [];
    // Amount of rockets
    this.popsize = 100;
    // Amount parent rocket partners
    this.matingpool = [];
    this.pesos = [];
    let count = this.popsize;
    
    let first;

    // Associates a rocket to an array index
    for (var i = 0; i < this.popsize; i++) {
        this.rockets[i] = new Rocket();
    }

    this.evaluate = function () {
        var maxfit = 0;
        // Iterate through all rockets and calcultes their fitness
        for (var i = 0; i < this.popsize; i++) {
            // Calculates fitness
            this.rockets[i].calcFitness(this.pesos[i]);
            // If current fitness is greater than max, then make max equal to current
            if (this.rockets[i].fitness > maxfit) {
                maxfit = this.rockets[i].fitness;
            }
        }
        // Normalises fitnesses
        for (var i = 0; i < this.popsize; i++) {
            this.rockets[i].fitness /= maxfit;
        }

        this.matingpool = [];
        // Take rockets fitness make in to scale of 1 to 100
        // A rocket with high fitness will highly likely will be in the mating pool
        for (var i = 0; i < this.popsize; i++) {
            var n = this.rockets[i].fitness * 100;
            for (var j = 0; j < n; j++) {
                this.matingpool.push(this.rockets[i]);
            }
        }
    }
    // Selects appropriate genes for child
    this.selection = function () {
        var newRockets = [];
        for (var i = 0; i < this.rockets.length; i++) {
            // Picks random dna
            var rocketA = random(this.matingpool);
            var rocketB = random(this.matingpool);
            var parentA = rocketA.dna;
            var parentB = rocketB.dna;
            // Creates child by using crossover function
            var child = parentA.crossover(parentB);
            child.mutation();
            // Creates new rocket with child dna
            let ro = (rocketA.ro + rocketB.ro)/2;
            let go = (rocketA.go + rocketB.go)/2;
            let bo = (rocketA.bo + rocketB.bo)/2;
            let radius = (rocketA.radius + rocketB.radius)/2;
            let legs = (rocketA.legs + rocketB.legs)/2;
            if (random(1) < 0.01) {
                ro = floor(random(0, 200));
            }
            if (random(1) < 0.01) {
                go = floor(random(0, 200));
            }
            if (random(1) < 0.01) {
                bo = floor(random(0, 200));
            }
            if (random(1) < 0.01) {
                radius = floor(random(10, 20));
            }
            if (random(1) < 0.01) {
                legs = floor(random(-10, -20));
            }
            let geracao = {
                'ro':ro,
                'go':go,
                'bo':bo,
                'radius':radius,
                'legs':legs
            }
            newRockets[i] = new Rocket(child, geracao);
        }
        // This instance of rockets are the new rockets
        this.rockets = newRockets;
        first = undefined;
    }

    // Calls for update and show functions
    this.run = function (target) {
        this.pesos = [];
        count = this.popsize;
        let menorD = dist(this.rockets[0].pos.x, this.rockets[0].pos.y, target.x, target.y);
        let posMenor = 0;
        for (var i = 0; i < this.popsize; i++) {
            this.rockets[i].update();
            // Displays rockets to screen
            if(!this.rockets[i].crashed){
                let d = dist(this.rockets[i].pos.x, this.rockets[i].pos.y, target.x, target.y);
                if(d < menorD) {
                    menorD = d;
                    posMenor = i;
                }
                if(d < 300){
                    strokeWeight(2);
                    stroke(255, 255, 255, map(d, 0, 300, 100, 0));
                    line(target.x, target.y, this.rockets[i].pos.x, this.rockets[i].pos.y);
                }
            }
        }
        for (var i = 0; i < this.popsize; i++) {
            if(this.rockets[i].completed){
                this.pesos.push(count);
                count--;
                if(first == undefined){
                    first = i;
                    this.rockets[i].chegouPrimeiro();
                }
            } else {
                this.pesos.push(0);
            }
            this.rockets[i].tirarDestaque();
            if (i == posMenor) {
                if(first == undefined){
                    this.rockets[i].destacar();
                } else {
                    this.rockets[i].destacarSimples();
                }
                strokeWeight(2);
                stroke(50,255,50, 50);
                line(target.x, target.y, this.rockets[i].pos.x, this.rockets[i].pos.y);
                noStroke();
            }
            this.rockets[i].show(target);
        }
    }
}
