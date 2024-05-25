const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	// ctx.imageSmoothingEnabled = false;
	gameEngine.init(ctx);
	// gameEngine.addEntity(new Automata(gameEngine, ctx));

    const automata = new Automata(gameEngine, ctx);
    // automata.fillGrid(); // Fill the grid randomly
    gameEngine.addEntity(automata);

	document.getElementById("plant").addEventListener("click", () => {
		automata.addPlant();
	});

	document.getElementById("animat").addEventListener("click", () => {
		gameEngine.addEntity(new Animat({x:randomInt(params.grid),y:randomInt(params.grid),hue:randomInt(360)}, automata));
	});

	document.getElementById("clear").addEventListener("click", () => {
		gameEngine.clearAnimats();
		automata.clearPlants();
	});

	gameEngine.start();
});
