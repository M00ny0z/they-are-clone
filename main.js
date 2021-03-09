window.addEventListener("load", main);

let chosenBuilding;
var gameEngine;
var ASSET_MANAGER;

function main() {
	gameEngine = new GameEngine();
	ASSET_MANAGER = new AssetManager();

	ASSET_MANAGER.queueDownload("./sprites/mapOneWithGrid.png");
	ASSET_MANAGER.queueDownload("./sprites/mapOne.png");
	ASSET_MANAGER.queueDownload("./sprites/mapTwo.png");
	ASSET_MANAGER.queueDownload("./sprites/mapTwoWithGrid.png");
	ASSET_MANAGER.queueDownload("./sprites/mapThree.png");
	ASSET_MANAGER.queueDownload("./sprites/mapThreeWithGrid.png");
	ASSET_MANAGER.queueDownload("./sprites/createdBy.png");

	// Intro Screen
	ASSET_MANAGER.queueDownload("./sprites/introScreen/red5Studios.png");
	ASSET_MANAGER.queueDownload("./sprites/introScreen/credits/inca_back.png");
	ASSET_MANAGER.queueDownload("./sprites/introScreen/credits/inca_back2.png");
	ASSET_MANAGER.queueDownload("./sprites/introScreen/credits/inca_front.png");
	ASSET_MANAGER.queueDownload("./sprites/introScreen/credits/gregsDog.jpg");
	ASSET_MANAGER.queueDownload("./sprites/introScreen/credits/devBackground.png");

	ASSET_MANAGER.queueDownload("./sprites/introScreen/credits/devs/npc.png");
	ASSET_MANAGER.queueDownload("./sprites/introScreen/credits/devs/gregHablutzel.png");


	ASSET_MANAGER.queueDownload("./sprites/ui/frame.png");

	// ui
	ASSET_MANAGER.queueDownload("./sprites/ui/icon_empty.png");
	ASSET_MANAGER.queueDownload("./sprites/buildings_grayscale.png");
	ASSET_MANAGER.queueDownload("./sprites/machinegun_turret_grayscale.png");
	ASSET_MANAGER.queueDownload("./sprites/ballista_grayscale.png");
	ASSET_MANAGER.queueDownload("./sprites/ranger_grayscale.png");
	ASSET_MANAGER.queueDownload("./sprites/soldier_grayscale.png");
	ASSET_MANAGER.queueDownload("./sprites/sniper_grayscale.png");
	ASSET_MANAGER.queueDownload("./sprites/titan_grayscale.png");
	// Resources (Bottom Left) Panel
	ASSET_MANAGER.queueDownload("./sprites/ui/icon_food.png");
	ASSET_MANAGER.queueDownload("./sprites/ui/icon_iron.png");
	ASSET_MANAGER.queueDownload("./sprites/ui/icon_stone.png");
	ASSET_MANAGER.queueDownload("./sprites/ui/icon_units.png");
	ASSET_MANAGER.queueDownload("./sprites/ui/icon_wood.png");

	ASSET_MANAGER.queueDownload("./sprites/ui/icon_colonist.png");
	ASSET_MANAGER.queueDownload("./sprites/ui/icon_resources.png");
	ASSET_MANAGER.queueDownload("./sprites/ui/icon_military.png");
	ASSET_MANAGER.queueDownload("./sprites/ui/icon_defense.png");
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
}