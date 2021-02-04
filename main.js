let chosenBuilding;
var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/mapOneWithGrid.png");

ASSET_MANAGER.queueDownload("./sprites/ui/frame.png");
ASSET_MANAGER.queueDownload("./sprites/ui/home_icon.png");
ASSET_MANAGER.queueDownload("./sprites/ui/work_icon.png");
ASSET_MANAGER.queueDownload("./sprites/ui/tent_icon.png");

ASSET_MANAGER.queueDownload("./sprites/tile.png");
ASSET_MANAGER.queueDownload("./sprites/black.png");

ASSET_MANAGER.queueDownload("./sprites/ranger.png");
ASSET_MANAGER.queueDownload("./sprites/soldier.png");
ASSET_MANAGER.queueDownload("./sprites/sniper.png");
ASSET_MANAGER.queueDownload("./sprites/titan.png");
ASSET_MANAGER.queueDownload("./sprites/mech.png");

ASSET_MANAGER.queueDownload("./sprites/infected_unit.png");
ASSET_MANAGER.queueDownload("./sprites/infected_harpy.png");
ASSET_MANAGER.queueDownload("./sprites/infected_venom.png");
ASSET_MANAGER.queueDownload("./sprites/infected_chubby.png");

ASSET_MANAGER.queueDownload("./sprites/ballista.png");
ASSET_MANAGER.queueDownload("./sprites/machinegun_turret.png");
ASSET_MANAGER.queueDownload("./sprites/tent.png");
ASSET_MANAGER.queueDownload("./sprites/buildings.png");

ASSET_MANAGER.queueDownload("./sprites/firebolt.png");
ASSET_MANAGER.queueDownload("./sprites/arrow.png");
ASSET_MANAGER.queueDownload("./sprites/sniper_arrow.png");
ASSET_MANAGER.queueDownload("./sprites/soldier_bolt.png");
ASSET_MANAGER.queueDownload("./sprites/titan_arrow.png");


ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	gameEngine.init(ctx);

	new SceneManager(gameEngine);
	gameEngine.start();
});