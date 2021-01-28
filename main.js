var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/tile.png");
ASSET_MANAGER.queueDownload("./sprites/black.png");

//Units
ASSET_MANAGER.queueDownload("./sprites/soldier.png");
ASSET_MANAGER.queueDownload("./sprites/infected_unit.png");

//Projectiles
ASSET_MANAGER.queueDownload("./sprites/arrow.png");

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

	gameEngine.init(ctx);
	//gameEngine.addEntity(new Map(gameEngine));
	//gameEngine.addEntity(new Soldier(gameEngine, 1, 1))
	//gameEngine.addEntity(new InfectedUnit(gameEngine, 1, 1))
	gameEngine.addEntity(new Arrow(gameEngine, 100, 100, "target", false, false));
	gameEngine.start();
});