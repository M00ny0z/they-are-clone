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

const ENTITIES = {};
ENTITIES[FARM]= Farm;
ENTITIES[QUARRY]= Quarry;
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
//


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

// const drawHealthbar = (ctx, percent) => {
//     ctx.save();

//     ctx.strokeStyle = 'gray';
//     ctx.strokeRect(4, 4, 100, 15);
//     ctx.fillStyle = percent > 50 ? 'green' : 'red';
//     ctx.fillRect(this.x - 10, this.y - 20, 98 * (percent / 100), 13);

//     ctx.restore();
//  };

// returns a string that can be used as a hsl web color
function hsl(h, s, l) {
    return "hsl(" + h + "," + s + "%," + l + "%)";
};

function distance(A, B) {
    return Math.sqrt((B.x - A.x) * (B.x - A.x) + (B.y - A.y)*(B.y - A.y));
};

function buildingCheck(entity) {
    const buildingCheck = (
        entity instanceof Ballista ||
        entity instanceof Farm ||
        entity instanceof Cottage ||
        entity instanceof FishermansCottage ||
        entity instanceof Quarry ||
        entity instanceof Sawmill ||
        entity instanceof StoneWall ||
        entity instanceof StoneGateVertical ||
        entity instanceof StoneGateHorizontal ||
        entity instanceof StoneHouse ||
        entity instanceof Tent || 
        entity instanceof WoodGateVertical ||
        entity instanceof WoodGateHorizontal ||
        entity instanceof WoodWall ||
        entity instanceof CommandCenter ||
        entity instanceof MachineGunTurret
    );
    if (buildingCheck) {
        return true;
    } else {
        return false;
    }
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

// add global parameters here
var PARAMS = {
    DEBUG: true,
    CORD: false,
    RESOURCEXY: false,
    BLOCKWIDTH: 48,
    MAPWIDTH: 50,
    MAPHEIGHT: 50,
    CAMERAWIDTH: 32,
    CAMERAHEIGHT: 19,
    MINIMAPSCALE: 0.08,
    MINIMAPUNITSIZE: 3
};