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
ASSET_MANAGER.queueDownload("./sprites/mapOneWithGrid.png");
ASSET_MANAGER.queueDownload("./sprites/mech.png");
ASSET_MANAGER.queueDownload("./sprites/sniper.png");


ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

	gameEngine.init(ctx);

	//gameEngine.addEntity(new Map(gameEngine));
	gameEngine.addEntity(new MapOne(gameEngine));
	gameEngine.addEntity(new Soldier(gameEngine, 250, 250, [{x: 500, y: 500}]));
	//gameEngine.addEntity(new InfectedUnit(gameEngine, 0, 0));
	//gameEngine.addEntity(new InfectedChubby(gameEngine, 500, 500, [{x : 600, y: 500}, {x : 400, y: 400}, {x : 200, y: 400}, {x : 0, y: 0}]));
	//gameEngine.addEntity(new InfectedVenom(gameEngine, 1000, 500, [{x : 600, y: 500}, {x : 400, y: 400}, {x : 200, y: 400}, {x : 0, y: 0}]));
	//gameEngine.addEntity(new Sniper(gameEngine, 0, 0, [{x : 600, y: 500}, {x : 400, y: 400}, {x : 200, y: 400}, {x : 0, y: 0}]));
	gameEngine.addEntity(new InfectedVenom(gameEngine, 1000, 500, [{x : 600, y: 500}, {x : 400, y: 400}, {x : 200, y: 400}, {x : 0, y: 0}]));
	
	gameEngine.start();
});