var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/tile.png");
ASSET_MANAGER.queueDownload("./sprites/black.png");

ASSET_MANAGER.queueDownload("./sprites/soldier.png");
ASSET_MANAGER.queueDownload("./sprites/infected_unit.png");
ASSET_MANAGER.queueDownload("./sprites/infected_venom.png");
ASSET_MANAGER.queueDownload("./sprites/infected_chubby.png");

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

	gameEngine.init(ctx);
	//gameEngine.addEntity(new Map(gameEngine));
	//gameEngine.addEntity(new Soldier(gameEngine, 0, 0));
	//gameEngine.addEntity(new InfectedUnit(gameEngine, 0, 0));
	//gameEngine.addEntity(new InfectedVenom(gameEngine, 0, 0));
	gameEngine.addEntity(new InfectedChubby(gameEngine, 0, 0));
	gameEngine.start();
});