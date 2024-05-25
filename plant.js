class Plants {
    constructor(plant, automata) {
        this.automata = automata;
        this.hue = plant.hue;
        this.pixel = 10;  
        this.grid = 100; 
        this.x = plant.x;
        this.y = plant.y;
        this.growth = 0; 
    }
    
    mutate() {
        const newX = (this.x - 1 + this.randomInt(3) +  this.grid) %  this.grid;
        const newY = (this.y - 1 + this.randomInt(3) +  this.grid) %  this.grid;
        const newHue = (this.hue - 10 + this.randomInt(21) + 360) % 360;
        return { hue: newHue, x: newX, y: newY };
    }
    randomInt(max) {
        return Math.floor(Math.random() * max);  
    }

    update() {
        const growthRate = parseInt(document.getElementById("plantgrowth").value);
        if (growthRate <= 0) return;   
        const inc =  growthRate * 1/2;
        this.growth +=  inc;
        if (this.growth >= 80) {  
            const newPlant = this.mutate(); 
            if (!this.automata.plants[newPlant.x][newPlant.y]) {  
                this.automata.plants[newPlant.x][newPlant.y] = new Plants(newPlant, this.automata);
                this.growth -= 80;  
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
        ctx.fillRect(this.x * this.pixel, this.y * this.pixel, this.pixel, this.pixel);  
        ctx.strokeRect(this.x * this.pixel, this.y * this.pixel, this.pixel, this.pixel);  
    }

}