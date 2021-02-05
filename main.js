let chosenBuilding;
var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/mapOneWithGrid.png");

ASSET_MANAGER.queueDownload("./sprites/ui/frame.png");

// ui
// display 0
ASSET_MANAGER.queueDownload("./sprites/ui/icon_colonist.png");
ASSET_MANAGER.queueDownload("./sprites/ui/icon_resources.png");
ASSET_MANAGER.queueDownload("./sprites/ui/icon_military.png");
ASSET_MANAGER.queueDownload("./sprites/ui/icon_defense.png");
// display 1
ASSET_MANAGER.queueDownload("./sprites/ui/icon_tent.png");
// display 2
ASSET_MANAGER.queueDownload("./sprites/ui/icon_fishermanCottage.png");
ASSET_MANAGER.queueDownload("./sprites/ui/icon_farm.png");
ASSET_MANAGER.queueDownload("./sprites/ui/icon_quarry.png");
ASSET_MANAGER.queueDownload("./sprites/ui/icon_sawmill.png");
// display 3
ASSET_MANAGER.queueDownload("./sprites/ui/icon_ballista.png");
// display 4
ASSET_MANAGER.queueDownload("./sprites/ui/icon_woodWall.png");

ASSET_MANAGER.queueDownload("./sprites/ui/icon_back.png");


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