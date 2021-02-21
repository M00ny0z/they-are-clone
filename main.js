let chosenBuilding;
var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/mapOneWithGrid.png");
ASSET_MANAGER.queueDownload("./sprites/mapOne.png");

ASSET_MANAGER.queueDownload("./sprites/ui/frame.png");

// ui
ASSET_MANAGER.queueDownload("./sprites/ui/icon_empty.png");
ASSET_MANAGER.queueDownload("./sprites/buildings_grey.png");
// Resources (Bottom Left) Panel
ASSET_MANAGER.queueDownload("./sprites/ui/icon_food.png");
ASSET_MANAGER.queueDownload("./sprites/ui/icon_iron.png");
ASSET_MANAGER.queueDownload("./sprites/ui/icon_stone.png");
ASSET_MANAGER.queueDownload("./sprites/ui/icon_units.png");
ASSET_MANAGER.queueDownload("./sprites/ui/icon_wood.png");
// display 0
ASSET_MANAGER.queueDownload("./sprites/ui/icon_colonist.png");
ASSET_MANAGER.queueDownload("./sprites/ui/icon_resources.png");
ASSET_MANAGER.queueDownload("./sprites/ui/icon_military.png");
ASSET_MANAGER.queueDownload("./sprites/ui/icon_defense.png");
// display 1
// display 2
// display 3
// display 4
ASSET_MANAGER.queueDownload("./sprites/ui/icon_woodWall.png");

ASSET_MANAGER.queueDownload("./sprites/ui/icon_cancel.png");
ASSET_MANAGER.queueDownload("./sprites/ui/icon_back.png");
ASSET_MANAGER.queueDownload("./sprites/ui/0.png");
ASSET_MANAGER.queueDownload("./sprites/ui/1.png");
ASSET_MANAGER.queueDownload("./sprites/ui/2.png");
ASSET_MANAGER.queueDownload("./sprites/ui/3.png");
ASSET_MANAGER.queueDownload("./sprites/ui/4.png");
ASSET_MANAGER.queueDownload("./sprites/ui/5.png");
ASSET_MANAGER.queueDownload("./sprites/ui/6.png");
ASSET_MANAGER.queueDownload("./sprites/ui/7.png");
ASSET_MANAGER.queueDownload("./sprites/ui/8.png");
ASSET_MANAGER.queueDownload("./sprites/ui/9.png");

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
ASSET_MANAGER.queueDownload("./sprites/buildings.png");
ASSET_MANAGER.queueDownload("./sprites/crops.png");
ASSET_MANAGER.queueDownload("./sprites/commandCenter.png");

ASSET_MANAGER.queueDownload("./sprites/firebolt.png");
ASSET_MANAGER.queueDownload("./sprites/arrow.png");
ASSET_MANAGER.queueDownload("./sprites/sniper_arrow.png");
ASSET_MANAGER.queueDownload("./sprites/soldier_bolt.png");
ASSET_MANAGER.queueDownload("./sprites/titan_arrow.png");
ASSET_MANAGER.queueDownload("./sprites/cannonball.png");

//music
ASSET_MANAGER.queueDownload("./music/backgroundMusic.mp3");

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	gameEngine.init(ctx);

	new SceneManager(gameEngine);
	gameEngine.start();
});