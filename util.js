const FARM = "FARM";
const QUARRY = "QUARRY";
const COMMANDCENTER = "COMMANDCENTER";
const BALLISTA = "BALLISTA";
const FISHERMANSCOTTAGE = "FISHERMANCOTTAGE";
const SAWMILL = "SAWMILL";
const MACHINEGUNTURRET = "MACHINEGUNTURRET";
const STONEGATEVERT = "STONEGATEVERT";
const STONEGATEHORI = "STONEGATEHORI";
const STONEWALL = "STONEWALL";
const WOODHOUSE = "WOODHOUSE";
const WOODGATEVERT = "WOODGATEVERT";
const WOODGATEHORI = "WOODGATEHORI";
const WOODWALL = "WOODWALL";
const UNIT = 0;
const ZOMBIE = 1;
//Units
const RANGER = "Ranger";
const SOLDIER = "Soldier";
const SNIPER = "Sniper";
const TITAN = "Titan";
const INFECTEDUNIT = "InfectedUnit";
const INFECTEDVENOM = "InfectedVenom";
const INFECTEDHARPY = "InfectedHarpy";
const INFECTEDCHUBBY = "InfectedChubby";
//Priorities
const NUMBEROFPRIORITYLEVELS = 6;
const MAPPRIORITY = 0;
const BUILDINGPRIORITY = 1;
const ALLYUNITPRIORITY = 2;
const ENEMYUNITPRIORITY = 3;
const EFFECTPRIORITY = 4;
const MISCELLANEOUSPRIORITY = 5;
// MAX HEALTHS
const MAX_UNIT_HEALTH = 70;
const MAX_FARM_HEALTH = 150;
const MAX_COMMANDCENTER_HEALTH = 1000;
const MAX_BALLISTA_HEALTH = 200;
const MAX_APARTMENT_HEALTH = 150;
const MAX_FISHERMANS_HEALTH = 150;
const MAX_MACHINEGUN_HEALTH = 250;
const MAX_QUARRY_HEALTH = 150;
const MAX_SAWMILL_HEALTH = 150;
const MAX_STONEHOUSE_HEALTH = 125;
const MAX_STONEWALL_HEALTH = 200;
const MAX_WOODHOUSE_HEALTH = 125;
const MAX_WOODWALL_HEALTH = 100;
const MAX_RANGER_HEALTH = 80;
const MAX_SNIPER_HEALTH = 100;
const MAX_SOLDIER_HEALTH = 100;
const MAX_TITAN_HEALTH = 250;
const MAX_CHUBBY_HEALTH = 200;
const MAX_HARPY_HEALTH = 50;
const MAX_VENOM_HEALTH = 80;
const MAX_STONEGATE_HEALTH = 200;
const MAX_WOODGATE_HEALTH = 100;
// EVENTS
const APARTMENTDEATH = "APARTMENTDEATH";
const BALLISTADEATH = "BALLISTADEATH";
const FARMDEATH = "FARMDEATH";
const FISHERMANDEATH = "FISHERMANDEATH";
const MACHINEGUNDEATH = "MACHINEGUNDEATH";
const QUARRYDEATH = "QUARRYDEATH";
const SAWMILLDEATH = "SAWMILLDEATH";
const STONEDEATH = "STONEDEATH";
const WOODDEATH = "WOODDEATH";

const ENTITIES = {};
ENTITIES[FARM] = Farm;
ENTITIES[QUARRY] = Quarry;
ENTITIES[COMMANDCENTER] = CommandCenter;
ENTITIES[FISHERMANSCOTTAGE] = FishermansCottage;
ENTITIES[MACHINEGUNTURRET] = MachineGunTurret;
ENTITIES[SAWMILL] = Sawmill;
ENTITIES[STONEGATEVERT] = StoneGateVertical;
ENTITIES[STONEGATEHORI] = StoneGateHorizontal;
ENTITIES[STONEWALL] = StoneWall;
ENTITIES[WOODHOUSE] = WoodHouse;
ENTITIES[WOODGATEVERT] = WoodGateVertical;
ENTITIES[WOODGATEHORI] = WoodGateHorizontal;
ENTITIES[WOODWALL] = WoodWall;
ENTITIES[INFECTEDUNIT] = InfectedUnit;
ENTITIES[INFECTEDCHUBBY] = InfectedChubby;
ENTITIES[INFECTEDHARPY] = InfectedHarpy;
ENTITIES[INFECTEDVENOM] = InfectedVenom;
//

const drawHealthbar = (ctx, currentHealth, x, y, game, maxHealth) => {
    const posX = (x - PARAMS.BLOCKWIDTH / 2) - (game.camera.cameraX * PARAMS.BLOCKWIDTH) + 7;
    const posY = y - (game.camera.cameraY * PARAMS.BLOCKWIDTH) - 10;

    if (currentHealth < 0) {
        currentHealth = 0;
    }

    ctx.save();

    ctx.strokeStyle = 'gray';
    ctx.strokeRect(posX, posY, 35, 8);

    ctx.fillStyle = 'black';
    ctx.fillRect(posX + 1, posY + 1, 34, 6);

    ctx.fillStyle = currentHealth >= 50 ? 'green' : 'red';
    ctx.fillRect(posX + 2, posY + 2, 33 * (currentHealth / maxHealth), 3);

    ctx.restore();
};

// takes an x or y coordinate, and returns a value such that it is between [0,49]
function sanitizeCord(cord) {
    if (cord < 0) {
        cord = 0;
    }
    if (cord > 49) {
        cord = 49;
    }
    return cord;
}

function capitalizeString(string) {
    return string[0].toUpperCase() + string.slice(1);
}

// returns a random integer between 0 and n-1
function randomInt(n) {
    return Math.floor(Math.random() * n);
};

// returns a string that can be used as a rgb web color
function rgb(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
};

const nullCheck = (todo) => {
    console.log(todo);
    return ((todo == undefined || todo == null) ? false : todo);
};

function testDrawingToCanvasAtXY(x, y) {
    this.gameEngine.ctx.font = "25px SpaceMono-Regular";
    this.gameEngine.ctx.fillStyle = "AliceBlue";
    this.gameEngine.ctx.textBaseline = "bottom";
    this.gameEngine.ctx.fillText("TEST", x, y);
}
function calculatePathForEntity(entity, startY, startX, endY, endX) {
    //entity.
    var easystar = new EasyStar.js();
    easystar.setGrid(this.gameEngine.collisionMap);
    easystar.setAcceptableTiles([1]);
    easystar.enableDiagonals();
    easystar.disableCornerCutting();

    this.gameEngine.instanceID = easystar.findPath(startX, startY, endX, endY, function (path) {
        //this.gameEngine.path = path;
        //entity.path = path; // A* path
        //console.log("entityTestFunction CallBack!!!");
        //entity.entityTestFunction();
        entity.calculatingPath = false;
        if (path === null) {
            console.log("A* Path NOT FOUND for: {y: " + startY + ", x: " + startX + "} to {y: " + endY + ", x: " + endX + "}");
            console.log(path);
            entity.path = []; // A* path
        } else {
            console.log("A* Path was found for: {y: " + startY + ", x: " + startX + "} to {y: " + endY + ", x: " + endX + "}");
            console.log(path);
            path.shift(); // drop first coordinate (the coordinate that you are at).
            entity.path = path; // A* path
            //drawPath(path);
        }
    });
    easystar.setIterationsPerCalculation(1000);
    entity.calculatingPath = true; // calculating A* path (EasyStar)
    easystar.calculate();
    //console.log("calcPath after calculate: ")
    //console.log(calcPath);
    //return calcPath;
}

function drawPath(path) {
    /*this.gameEngine.ctx.strokeStyle = "grey";
    this.gameEngine.ctx.moveTo(500, 782);
    this.gameEngine.ctx.lineTo(985, 782);
    this.gameEngine.ctx.stroke();*/
    //console.log("path is: ")
    for (let i = 1; i < path.length; i++) {
        let point1 = { x: convertGridCordToPixelCord(path[i - 1].x) + PARAMS.BLOCKWIDTH / 2, y: convertGridCordToPixelCord(path[i - 1].y) + PARAMS.BLOCKWIDTH / 2 }; // convert grid coordinate to pixel.
        let point2 = { x: convertGridCordToPixelCord(path[i].x) + PARAMS.BLOCKWIDTH / 2, y: convertGridCordToPixelCord(path[i].y) + PARAMS.BLOCKWIDTH / 2 }; // convert grid coordinate to pixel.
        //console.log(point);
        /*ctx.strokeStyle = "Black";
        ctx.beginPath();
        ctx.setLineDash([5, 15]);
        ctx.moveTo(point1.x, point1.y);
        ctx.lineTo(point2.x, point2.y);
        ctx.fillText("P1", point1.x, point1.y);
        ctx.fillText("P2", point2.x, point2.y);

        ctx.stroke();
        ctx.setLineDash([]);
*/
        this.gameEngine.ctx.strokeStyle = "red";
        this.gameEngine.ctx.beginPath();
        this.gameEngine.ctx.setLineDash([5, 15]);
        this.gameEngine.ctx.moveTo(point1.x, point1.y);
        this.gameEngine.ctx.lineTo(point2.x, point2.y)
        this.gameEngine.ctx.stroke();
        this.gameEngine.ctx.setLineDash([]);
    }
    /*path.forEach(point => {
        console.log(point);
    });
    console.log("-----");*/

}

function calculatePath(startY, startX, endY, endX) {
    var easystar = new EasyStar.js();
    easystar.setGrid(this.gameEngine.collisionMap);
    easystar.setAcceptableTiles([1]);
    let calcPath = null;
    this.gameEngine.instanceID = easystar.findPath(startX, startY, endX, endY, function (path) {
        this.gameEngine.path = path;
        calcPath = path;
        console.log("calcPath is: ")
        console.log(calcPath);

        if (path === null) {
            console.log("A* Path was not found.");
        } else {
            console.log("A* Path was found for: {y: " + startY + ", x: " + startX + "} to {y: " + endY + ", x: " + endX + "}");
            console.log(path);

        }
    });
    easystar.setIterationsPerCalculation(1000);
    easystar.calculate();
    console.log("calcPath after calculate: ")
    console.log(calcPath);
    //return calcPath;
}

// returns a string that can be used as a hsl web color
function hsl(h, s, l) {
    return "hsl(" + h + "," + s + "%," + l + "%)";
};

function distance(A, B) {
    if (B instanceof Quarry || B instanceof Sawmill || B instanceof ApartmentComplex) {
        const circleOne = Math.sqrt((((B.x - A.x) ** 2) + ((B.y - A.y) ** 2)));
        const circleTwo = Math.sqrt((
            ((B.x - A.x) ** 2) +
            ((B.y - A.y) ** 2)
        ));
        return Math.min(circleOne, circleTwo);
    } else {
        return Math.sqrt(((B.x - A.x) ** 2) + ((B.y - A.y) ** 2));
    }
};

function buildingCheck(entity) {
    return (
        entity instanceof Ballista ||
        entity instanceof Farm ||
        entity instanceof StoneHouse ||
        entity instanceof FishermansCottage ||
        entity instanceof Quarry ||
        entity instanceof Sawmill ||
        entity instanceof StoneWall ||
        entity instanceof StoneGateVertical ||
        entity instanceof StoneGateHorizontal ||
        entity instanceof ApartmentComplex ||
        entity instanceof WoodHouse ||
        entity instanceof WoodGateVertical ||
        entity instanceof WoodGateHorizontal ||
        entity instanceof WoodWall ||
        entity instanceof CommandCenter ||
        entity instanceof MachineGunTurret
    );
}

function collide(A, B) {
    // if(buildingCheck(A)) {
    //     console.log(A.x);
    //     console.log(A.y);
    //     A.x = A.x + PARAMS.BLOCKWIDTH;
    //     A.y = A.x + PARAMS.BLOCKWIDTH;
    // }
    // if(buildingCheck(B)) {
    //     console.log(B.x);
    //     console.log(B.y);
    //     B.x = B.x + PARAMS.BLOCKWIDTH;
    //     B.y = B.y + PARAMS.BLOCKWIDTH;
    // }
    return (distance(A, B) < A.radius + B.radius);
};

function canSee(A, B) { // if A can see B
    // if(buildingCheck(A)) {
    //     console.log(A.x);
    //     console.log(A.y);
    //     A.x = A.x + PARAMS.BLOCKWIDTH;
    //     A.y = A.x + PARAMS.BLOCKWIDTH;
    // }
    // if(buildingCheck(B)) {
    //     console.log(B.x);
    //     console.log(B.y);
    //     B.x = B.x + PARAMS.BLOCKWIDTH;
    //     B.y = B.y + PARAMS.BLOCKWIDTH;
    // }
    return (distance(A, B) < A.visualRadius + B.radius);
};

function getFacing(velocity) {
    //Idle
    if (velocity.x === 0 && velocity.y === 0) return 4;
    let angle = Math.atan2(velocity.y, velocity.x) / Math.PI;
    //N
    if (-0.625 < angle && angle < -0.375) return 2;
    //NE
    if (-0.375 < angle && angle < -0.125) return 1;
    //E
    if (-0.125 < angle && angle < 0.125) return 0;
    if (0.125 < angle && angle < 0.375) return 7;
    if (0.375 < angle && angle < 0.625) return 6;
    if (0.625 < angle && angle < 0.875) return 5;
    if (-0.875 > angle || angle > 0.875) return 4;
    //NW
    if (-0.875 < angle && angle < -0.625) return 3;
};


// pad an input number to a string with the given number of prefaced 0's
function leftPad(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}


// creates an alias for requestAnimationFrame for backwards compatibility
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();





////////////////////////////////////////////////////////////////////////////////////
/////// Grid Functions

function convertPixelCordToGridCord(pixelCord) {
    return Math.floor(pixelCord / PARAMS.BLOCKWIDTH);
}

function returnIndividualPathCoordinates(pathArray, x, y) {
    let outputPath = [];
    pathArray.forEach(path => {
        if (x != path.x) {
            if (x < path.x) {
                for (x = x; x < path.x; x++) {
                    outputPath.push({ x, y });
                }
            } else { // x > path.x
                for (x = x; x > path.x; x--) {
                    outputPath.push({ x, y });
                }
            }
        } else { // y != path.y
            if (y < path.y) {
                for (y = y; y < path.y; y++) {
                    outputPath.push({ x, y });
                }
            } else { // x > path.x
                for (y = y; y > path.y; y--) {
                    outputPath.push({ x, y });
                }
            }
        }
    });
    outputPath.push(pathArray[pathArray.length - 1]);
    return outputPath;
}

function setColMapXYVal(gridX, gridY, val) {
    this.gameEngine.collisionMap[gridY][gridX] = val;
}

function printCollisionMap() {
    console.log("collision map: (0 = no collision, 1 = collision)")
    for (var y = 0; y < 50; y++) {
        var outputLine = leftPad(y, 2) + ": [";
        for (var x = 0; x <= 48; x++) {
            outputLine += this.gameEngine.collisionMap[y][x] + ", ";
        }
        outputLine += this.gameEngine.collisionMap[y][x] + "]";
        console.log(outputLine);
    }
}

function showCollisions() {
    this.gameEngine.ctx.font = "10px SpaceMono-Regular";
    this.gameEngine.ctx.fillStyle = "pink";
    for (var i = 0; i < 50; i++) {
        for (var j = 0; j < 50; j++) {
            var x = (j - this.gameEngine.camera.cameraX) * PARAMS.BLOCKWIDTH;
            var y = (i - this.gameEngine.camera.cameraY + 1) * PARAMS.BLOCKWIDTH;
            console.log("x: " + x + ", y: " + y);
            this.gameEngine.ctx.fillText("" + this.gameEngine.collisionMap[i][j], x, y);

            //this.gameEngine.ctx.fillText("" + this.gameEngine.collisionMap[y][x], x, y);
        }
    }
}


// for 1 block buildings, increment=4, decrement = 2 (grid size)
// for 2 block vertical buildings, increment=5, decrement = 2 (grid size)
// returns a boolean true if none of same building type are within grid
function checkSameBuildingTypeInMapResourceGrid(unitType, gridX, gridY, increment, decrement) {
    //console.log("unitType: " + unitType);
    let mapStartX = sanitizeCord(gridX - decrement);
    let mapStartY = sanitizeCord(gridY - decrement);
    let mapEndX;
    if (increment === 5) { // sawmill, quarry
        mapEndX = sanitizeCord(mapStartX + increment - 1);
    } else { //fishermans cottage, farm
        mapEndX = sanitizeCord(mapStartX + increment);
    }
    //let mapEndX = sanitizeCord(mapStartX + increment);
    let mapEndY = sanitizeCord(mapStartY + increment);
    //console.log(this.gameEngine.mainMap.map[0][0]["FishermansCottage"]);
    //console.log(this.gameEngine.mainMap.map[0][0][unitType]);
    for (var i = mapStartY; i <= mapEndY; i++) {
        for (var j = mapStartX; j <= mapEndX; j++) {
            if (this.gameEngine.mainMap.map[i][j][unitType]) { // does unit resource grid already exist there?
                return false; // if so, we can't place. return false
            }
        }
    }
    return true; // no overlap. We are free to place.
}


// for 1 block buildings, increment=4, decrement = 2 (grid size)
// for 2 block vertical buildings, increment=5, decrement = 2 (grid size)
// labels gridpoints on map with tha building type existing there.
function fillBuildingTypeInMapResourceGrid(unitType, gridX, gridY, increment, decrement) {
    let mapStartX = sanitizeCord(gridX - decrement);
    let mapStartY = sanitizeCord(gridY - decrement);
    let mapEndX = sanitizeCord(mapStartX + increment);
    let mapEndY = sanitizeCord(mapStartY + increment);
    for (var i = mapStartX; i <= mapEndX; i++) {
        for (var j = mapStartY; j <= mapEndY; j++) {
            // we want to toggle everything from false -> true.
            if (this.gameEngine.mainMap.map[i][j][unitType]) { // if already true
                console.log("This should not occur (fillBuildingTypeInMapGrid, building is in map but it shouldn't be there)!!!!");
            }
            this.gameEngine.mainMap.map[i][j][unitType] = true; // set it to occupied.
        }
    }
}

// for 1 block buildings, increment=4, decrement = 2 (grid size)
// for 2 block vertical buildings, increment=5, decrement = 2 (grid size)
// labels gridpoints on map with tha building type doesn't exist there.
function removeBuildingTypeInMapResourceGrid(unitType, gridX, gridY, increment, decrement) {
    let mapStartX = sanitizeCord(gridX - decrement);
    let mapStartY = sanitizeCord(gridY - decrement);
    let mapEndX = sanitizeCord(mapStartX + increment);
    let mapEndY = sanitizeCord(mapStartY + increment);
    for (var i = mapStartX; i <= mapEndX; i++) {
        for (var j = mapStartY; j <= mapEndY; j++) {
            // we want to toggle everything from false -> true.
            if (!this.gameEngine.mainMap.map[i][j][unitType]) { // if already false
                console.log("This should not occur (removeBuildingTypeInMapGrid, building is not in map but it should be there)!!!!");
            }
            this.gameEngine.mainMap.map[i][j][unitType] = false; // set it to occupied.
        }
    }
}





class Score {
    constructor(game, x, y, score) {
        Object.assign(this, { game, x, y, score });
        this.priority = MISCELLANEOUSPRIORITY;
        this.velocity = -32;
        // this.x = this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH);
        // this.y = this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH);
        this.elapsed = 0;
    };

    update() {
        this.elapsed += this.game.clockTick;
        if (this.elapsed > 1) this.removeFromWorld = true;

        this.y += this.game.clockTick * this.velocity;
    };

    draw(ctx) {
        var offset = this.score < 10 ? 6 : 12;
        ctx.font = '12px "Press Start 2P"';
        ctx.fillStyle = "Black";
        ctx.fillText(this.score, ((this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH)) - offset + 1), ((this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH)) + 1));
        ctx.fillStyle = rgb(183, 3, 3);
        ctx.fillText(this.score, ((this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH)) - offset), (this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH)));
    };

    drawMinimap(ctx, mmX, mmY) {

    }
};


// add global parameters here
var PARAMS = {
    DEBUG: true,
    CORD: true,
    RESOURCEXY: false,
    BLOCKWIDTH: 48,
    MAPWIDTH: 50,
    MAPHEIGHT: 50,
    CAMERAWIDTH: 32,
    CAMERAHEIGHT: 19,
    MINIMAPSCALE: 0.08,
    MINIMAPUNITSIZE: 3,
    PERFORMANCE_MEASURE: true,
    PERFORMANCE_TIME_WINDOW: 120
};

function print_hello() {
    return "goodbye"
}