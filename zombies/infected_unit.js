class InfectedUnit extends Entity {
    constructor(game, x, y, path) {
        const offset = 32;
        const radius = 50;
        const visualRadius = 200;
        const maxSpeed = 100;
        const hitpoints = 100;
        const offsetList = [];
        const collisionFunction = () => {
            // collision detection
            for (const ent of this.game.entities) {
                const enemyEntityList = ent instanceof Ranger ||  ent instanceof Soldier ||
                                        ent instanceof Sniper || ent instanceof Titan || 
                                        ent instanceof Ballista || ent instanceof CommandCenter || 
                                        ent instanceof Farm || ent instanceof FishermansCottage ||
                                        ent instanceof Quarry || ent instanceof Sawmill ||
                                        ent instanceof StoneWall || ent instanceof Tent ||
                                        ent instanceof WoodWall || ent instanceof MachineGunTurret;
                if (enemyEntityList && canSee(this, ent)) {
                    this.target = ent;
                }
                if (enemyEntityList && collide(this, ent)) {
                    if (this.state === 0 ) {
                        this.state = 1;
                        this.elapsedTime = 0;
                    } else if (this.elapsedTime > 1.5) {
                        ent.hitpoints -= 15;
                        this.elapsedTime = 0;
                    }
                }
            }
        };
        super(
            game, ASSET_MANAGER.getAsset("./sprites/infected_unit.png"), 
            x, y, path, radius, visualRadius, maxSpeed, offset, offsetList, hitpoints, 
            collisionFunction
        );
        this.xOffset = 60;
        this.yOffset = 40;
    };

    loadAnimations() {
        let spriteInfo = {};

        //0 = attack animations
        this.animations.push([]);
        spriteInfo = {
            'state': 0,
            'xStart': 0,
            'width': 128,
            'height': 80,
            'frames': 12,
            'speed': .05,
            'padding': 0
        };
        //0 = EAST
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1387, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1290, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1193, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1096, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 999, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 902, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 805, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1484, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));

        //1 = attack animations
        this.animations.push([]);
        spriteInfo = {
            'state': 1,
            'xStart': 0,
            'width': 128,
            'height': 80,
            'frames': 12,
            'speed': .05,
            'padding': 0
        };
        //0 = EAST
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 605, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 508, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 411, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 314, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 217, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 120, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 23, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 702, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));

        //2 = death animations
        this.animations.push([]);
        spriteInfo = {
            'state': 2,
            'xStart': 1537,
            'width': 128,
            'height': 80,
            'frames': 12,
            'speed': .05,
            'padding': 0
        };
        //0 = EAST
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 605, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 508, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 411, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 314, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 217, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 120, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 23, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 702, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));

        //3 = idle animations
        this.animations.push([]);
        spriteInfo = {
            'state': 3,
            'xStart': 3073,
            'width': 128,
            'height': 80,
            'frames': 11,
            'speed': .05,
            'padding': 0
        };
        //0 = EAST
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1387, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //1 = NE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1290, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //2 = N
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1193, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //3 = NW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1096, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //4 = W
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 999, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //5 = SW
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 902, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //6 = S
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 805, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
        //7 = SE
        this.animations[spriteInfo['state']].push(new Animator(this.spritesheet, spriteInfo['xStart'], 1484, spriteInfo['width'], spriteInfo['height'], spriteInfo['frames'], spriteInfo['speed'], spriteInfo['padding'], false, true));
    }

    drawHealthbar(ctx) {
        const posX = this.x - this.xOffset - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH);
        const posY = this.y - this.yOffset - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH);

        ctx.save();

        ctx.strokeStyle = 'gray';
        ctx.strokeRect(posX, posY, 100, 15);
        
        ctx.fillStyle = 'white';
        ctx.fillRect(posX + 1, posY + 1, 98, 13);

        ctx.fillStyle = this.hitpoints >= 50 ? 'green' : 'red';
        ctx.fillRect(posX + 2, posY + 2, 96 * (this.hitpoints / 100), 11);
        
        ctx.restore();
    };

    draw(ctx) {
        this.drawHealthbar(ctx);
        
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, 
            this.x - this.xOffset - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), 
            this.y - this.yOffset - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), 1);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();

            ctx.setLineDash([5, 15]);
            ctx.beginPath();
            ctx.arc(this.x - (this.game.camera.cameraX * PARAMS.BLOCKWIDTH), this.y - (this.game.camera.cameraY * PARAMS.BLOCKWIDTH), this.visualRadius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
            ctx.setLineDash([]);
        }
    };
}   