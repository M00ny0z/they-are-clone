var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/tile.png");
ASSET_MANAGER.queueDownload("./sprites/black.png");

ASSET_MANAGER.queueDownload("./sprites/soldier.png");
ASSET_MANAGER.queueDownload("./sprites/infected_unit.png");
ASSET_MANAGER.queueDownload("./sprites/infected_venom.png");
ASSET_MANAGER.queueDownload("./sprites/infected_chubby.png");

ASSET_MANAGER.queueDownload("./sprites/firebolt.png");

//Projectiles
ASSET_MANAGER.queueDownload("./sprites/arrow.png");

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

	gameEngine.init(ctx);
	//gameEngine.addEntity(new Map(gameEngine));
	gameEngine.addEntity(new Soldier(gameEngine, 800, 800, [{ x: 400, y: 300}]));
	var t = new InfectedUnit(gameEngine, 800, 250, [{ x: 800, y: 450}, { x: 400, y: 450}, { x: 200, y: 250}]);
	gameEngine.addEntity(t);
	//gameEngine.addEntity(new InfectedUnit(gameEngine, 0, 0));
	//gameEngine.addEntity(new InfectedVenom(gameEngine, 250, 250));
	//gameEngine.addEntity(new InfectedChubby(gameEngine, 250, 250));
	//gameEngine.addEntity(new FireBolt(gameEngine, 250, 250));
	//gameEngine.addEntity(new Arrow(gameEngine, 100, 100, t, false, true))
	gameEngine.start();
});