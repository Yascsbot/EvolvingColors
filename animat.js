class Animat {
	constructor(anim, automata) {
        this.automata = automata;
        this.hue = anim.hue;
        this.x = anim.x;
        this.y = anim.y;
        this.energy = 50;
        this.grid = 100;
        this.pixel = 10;
    }
    move() {
        const neighbors = [];
        const radius = 2; 
        let moveThreshold = 20;  
        let probabilityToMove = 0.5
        for (let i = -radius; i <= radius; i++) {
            for (let j = -radius; j <= radius; j++) {
                if (i === 0 && j === 0) continue;
    
                const newX = (this.x + i + this.grid) % this.grid;
                const newY = (this.y + j + this.grid) % this.grid;
                const plant = this.automata.plants[newX][newY];
    
                if (!plant) {
                    neighbors.push({ x: newX, y: newY });
                } else {
                    const hueDiff = Math.abs(this.hue - plant.hue);
                    if (hueDiff > moveThreshold || (hueDiff === moveThreshold && Math.random() < probabilityToMove)) {
                        neighbors.push({ x: newX, y: newY });
                    }
                }
            }
        }
    
        if (neighbors.length > 0) {
            const randomIndex = Math.floor(Math.random() * neighbors.length);
            this.x = neighbors[randomIndex].x;
            this.y = neighbors[randomIndex].y;
        }
    }
    

	mutate() {
        const getRandomOffset = (range) => Math.floor(Math.random() * range) - Math.floor(range / 2);
        const newX = (this.x + getRandomOffset(3) + this.grid) % this.grid;
        const newY = (this.y + getRandomOffset(3) + this.grid) % this.grid;
        const newHue = (this.hue + getRandomOffset(21) + 360) % 360;
		return { hue: newHue, x: newX, y: newY };
    }
	
	eat() {
		const growthrate = parseInt(document.getElementById("animatgrowth").value);
		const selectivity = parseInt(document.getElementById("animatselection").value);
		const plant = this.automata.plants[this.x][this.y];
		const diff = this.hueDifference(plant);
	
		if(plant && diff >= selectivity) {
			this.automata.plants[this.x][this.y] = null;
			this.energy += 80 / growthrate * diff;
		}
	}

	hueDifference(plant) {
		let diff;
		if (plant) {
			diff = Math.abs(this.hue - plant.hue);
		} else {
			diff = 180;
		}
		if (diff > 180) {
			diff = 360 - diff; 
		}
		return (90 - diff) / 90;
	}
    reproduce() {
		if(this.energy > 80) {
			this.energy -= 80;

			gameEngine.addEntity(new Animat(this.mutate(),this.automata));
		}
	}

	die() {
		this.removeFromWorld = true;
	}

	update() {
		this.move();
		this.eat();
		this.reproduce();
		if(this.energy < 1 || Math.random() < 0.01) this.die();
	}

	draw(ctx) {
        const centerX = (this.x + 0.5) * this.pixel;
        const centerY = (this.y + 0.5) * this.pixel;
        const radius = this.pixel / 2 - 1;  
		ctx.fillStyle = `hsl(${this.hue}, 75%, 50%)`; 
        ctx.strokeStyle = "light gray";  
		ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
};