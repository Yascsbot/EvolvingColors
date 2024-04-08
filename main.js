const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	// ctx.imageSmoothingEnabled = false;
	gameEngine.init(ctx);
	// gameEngine.addEntity(new Automata(gameEngine, ctx));

	
    const automata = new Automata(gameEngine, ctx);
    automata.fillGrid(); // Fill the grid randomly
    gameEngine.addEntity(automata);

	gameEngine.start();
});
