var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/tile.png");
ASSET_MANAGER.queueDownload("./sprites/black.png");

ASSET_MANAGER.queueDownload("./sprites/soldier.png");
ASSET_MANAGER.queueDownload("./sprites/sniper.png");

ASSET_MANAGER.queueDownload("./sprites/infected_unit.png");
ASSET_MANAGER.queueDownload("./sprites/infected_venom.png");
ASSET_MANAGER.queueDownload("./sprites/infected_chubby.png");

ASSET_MANAGER.queueDownload("./sprites/ballista.png");

//Projectiles
ASSET_MANAGER.queueDownload("./sprites/firebolt.png");
ASSET_MANAGER.queueDownload("./sprites/arrow.png");
ASSET_MANAGER.queueDownload("./sprites/mapOneWithGrid.png");
ASSET_MANAGER.queueDownload("./sprites/mech.png");


ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

	gameEngine.init(ctx);

	//gameEngine.addEntity(new Map(gameEngine));
	gameEngine.addEntity(new MapOne(gameEngine));
	//Spawn 10 zombies from the top of map to follow railroad
	for(var i = 0; i < 10; i++) {
		gameEngine.addEntity(new InfectedUnit(gameEngine, 2496, -100 + i * 50, [{x : 2496, y: 480}, {x : 2112, y: 480}, {x : 2112, y: 1050}, {x : 2304, y: 1050}, {x : 2304, y: 1420}, {x : 1500, y: 1420}]));
	}
	gameEngine.addEntity(new InfectedVenom(gameEngine, 2496, -150, [{x : 2496, y: 480}, {x : 2112, y: 480}, {x : 2112, y: 1050}, {x : 2304, y: 1050}, {x : 2304, y: 1420}, {x : 1500, y: 1420}]));

	gameEngine.addEntity(new Soldier(gameEngine, 1200, 1500, [{x: 2500, y: 1500}, {x: 2000, y: 700}]));    //target
    gameEngine.addEntity(new Soldier(gameEngine, 1000, 1500, [{x: 2450, y: 1500}, {x: 2100, y: 700}]));    //target
	gameEngine.addEntity(new Soldier(gameEngine, 800, 1500, [{x: 2400, y: 1500}, {x: 2200, y: 600}]));    //target

	gameEngine.addEntity(new InfectedVenom(gameEngine, 64 * 25, 64 * 48,  [{x: 64 * 28, y: 64 * 32}]));
	gameEngine.addEntity(new InfectedVenom(gameEngine, 64 * 25, 64 * 42,  [{x: 64 * 27, y: 64 * 32}]));
	gameEngine.addEntity(new InfectedVenom(gameEngine, 64 * 25, 64 * 50,  [{x: 64 * 31, y: 64 * 32}]));
	gameEngine.addEntity(new InfectedVenom(gameEngine, 64 * 25, 64 * 51,  [{x: 64 * 25, y: 64 * 32}]));
    //gameEngine.addEntity(new InfectedChubby(gameEngine, 64 * 23,  64 * 50,  [{x: 64 * 27, y: 64 * 34}]));
	//gameEngine.addEntity(new Soldier(gameEngine, 250, 250, [{x: 500, y: 500}]));	//target
	//gameEngine.addEntity(new InfectedUnit(gameEngine, 0, 0));
	//gameEngine.addEntity(new InfectedChubby(gameEngine, 500, 500, [{x : 600, y: 500}, {x : 400, y: 400}, {x : 200, y: 400}, {x : 0, y: 0}]));
	//gameEngine.addEntity(new InfectedVenom(gameEngine, 1000, 500, [{x : 600, y: 500}, {x : 400, y: 400}, {x : 200, y: 400}, {x : 0, y: 0}]));
	//gameEngine.addEntity(new Sniper(gameEngine, 0, 0, [{x : 600, y: 500}, {x : 400, y: 400}, {x : 200, y: 400}, {x : 0, y: 0}]));
	//gameEngine.addEntity(new InfectedVenom(gameEngine, 1000, 500, [{x : 600, y: 500}, {x : 400, y: 400}, {x : 200, y: 400}, {x : 0, y: 0}]));
	gameEngine.start();
});