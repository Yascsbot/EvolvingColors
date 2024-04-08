

class Automata {
    constructor(game, ctx) {
        this.game = game;
        this.ctx = ctx;

        this.cols = 40;
        this.rows = 40;
        this.cellSize = 10;
        this.speed = 25;

        // this.grid = [];
        this.grid = this.makeGrid(this.cols, this.rows);
        this.fillGrid();

    }

    makeGrid(cols, rows) {
        let grid = []
        for (let i = 0; i < this.cols; i++) {
            grid.push([])
            for (let j = 0; j < this.rows; j++) {
                grid[i][j] = 0;
            }
        }
        return grid;
    }
    fillGrid() {
        for(let i = 0; i < this.cols; i++){
            for(let j = 0; j < this.rows; j++){
                this.grid[i][j] = randomInt(2);
            }
        }

    }
    // count live neighbors 
    countNeighbors(x, y) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let neighborX = x + i;
                let neighborY = y + j;
                // Check if the neighbor cell is within the grid bounds
                if (neighborX >= 0 && neighborX < this.cols && neighborY >= 0 && neighborY < this.rows) {
                    count += this.grid[neighborX][neighborY];
                }
            }
        }
        // Exclude the cell itself from the neighbor count
        count -= this.grid[x][y];
        return count; // count of live neighbors
    }
    update() {
        // this.x += this.speed * this.game.clockTick;
        let newGrid = [];
        for (let i = 0; i < this.cols; i++) {
            newGrid.push([]);
            for (let j = 0; j < this.rows; j++) {
                // Count the number of live neighbors for the current cell
                let neighbors = this.countNeighbors(i, j);
                if (this.grid[i][j] === 1) { // Alive cell
                    if (neighbors < 2 || neighbors > 3) {
                        newGrid[i][j] = 0; // Dies due to underpopulation or overpopulation
                    } else {
                        newGrid[i][j] = 1; // Lives on to the next generation
                    }
                } else { // Dead cell
                    if (neighbors === 3) {
                        newGrid[i][j] = 1; // Reproduction
                    } else {
                        newGrid[i][j] = 0; // Stays dead
                    }
                }
            }
        }
        this.grid = newGrid; // Update the grid with the new state
    }

    draw(ctx) {
        ctx.fillStyle = 'black'; // fill color
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                if (this.grid[i][j] === 1) { // if the cell is 1 fill the cell
                    ctx.fillRect(i * this.cols, j * this.cols, this.cols, this.cols);

                 //   Draw a black circle at the center of the cell
                    // ctx.beginPath();
                    // ctx.arc(i * this.cellSize + this.cellSize / 2, j * this.cellSize + this.cellSize / 2, this.cellSize / 2, 0, Math.PI * 2);
                    // ctx.fill();
                    // ctx.closePath();
                }
            }
        }
    }
}
