class Automata {
    constructor() {
        this.grid = 100;
        this.plants = Array.from({length: this.grid}, () => new Array(this.grid).fill(null));
    }
    
    clearPlants() {
        for (let i = 0; i < this.grid; i++) {
            for (let j = 0; j < this.grid; j++) {
                this.plants[i][j] = null;
            }
        }
    }
   
    randomInt(max) {
        return Math.floor(Math.random() * max);
    }
    
    addPlant() {
        let x = this.randomInt(this.grid);
        let y = this.randomInt(this.grid);
        if (!this.plants[x][y]) { 
            let color = this.randomInt(360);
            this.plants[x][y] = new Plants({hue: color, x: x, y: y}, this);
        }
    }

    update() {
        this.plants.forEach((row, x) => {
            row.forEach((plant, y) => {
                if (plant) {
                    plant.update();
                    if (Math.random() < 0.001) {
                        this.plants[x][y] = null; 
                    }
                }
            });
        });
    }

    draw(ctx) {
        this.plants.forEach((row, x) => {
            row.forEach((plant, y) => {
                if (plant) {
                    plant.draw(ctx);
                }
            });
        });
    }
 
}