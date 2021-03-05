class StartMenu {

    TITLE_POS = { X: 150, Y: 150 };

    MAPONE_POS = { X: 100, Y: 250, width: 350, height: 350 };
    MAPTWO_POS = { X: 625, Y: 250, width: 350, height: 350 };
    MAPTHREE_POS = { X: 1150, Y: 250, width: 350, height: 350 };

    CONTROLS_POS = { X: 1290, Y: 700, width: 240, height: 45 };
    GUIDE_POS = { X: 1340, Y: 780, width: 150, height: 45 };
    CREDITS_POS = { X: 1320, Y: 860, width: 210, height: 45 };

    constructor(game) {
        Object.assign(this, { game });
        this.mapOneImg = ASSET_MANAGER.getAsset("./sprites/mapOne.png");

        this.priority = 1;
    };

    update() {
        if (this.game.click) {
            if ((this.game.click.offsetX >= this.MAPONE_POS.X && this.game.click.offsetX <= this.MAPONE_POS.X + this.MAPONE_POS.width) &&
                (this.game.click.offsetY >= this.MAPONE_POS.Y && this.game.click.offsetY <= this.MAPONE_POS.Y + this.MAPONE_POS.height)) {
                console.log("map one clicked");
                this.game.camera.title = false;
                this.game.camera.startMapOne();
                this.game.click = null;
            }
            else if ((this.game.click.offsetX >= this.MAPTWO_POS.X && this.game.click.offsetX <= this.MAPTWO_POS.X + this.MAPTWO_POS.width) &&
                (this.game.click.offsetY >= this.MAPTWO_POS.Y && this.game.click.offsetY <= this.MAPTWO_POS.Y + this.MAPTWO_POS.height)) {
                console.log("map two clicked");
                this.game.camera.title = false;
                this.game.camera.startMapOne();
                this.game.click = null;
            }
            else if ((this.game.click.offsetX >= this.MAPTHREE_POS.X && this.game.click.offsetX <= this.MAPTHREE_POS.X + this.MAPTHREE_POS.width) &&
                (this.game.click.offsetY >= this.MAPTHREE_POS.Y && this.game.click.offsetY <= this.MAPTHREE_POS.Y + this.MAPTHREE_POS.height)) {
                console.log("map three clicked");
                this.game.camera.title = false;
                this.game.camera.startMapOne();
                this.game.click = null;
            }
            else if ((this.game.click.offsetX >= this.CONTROLS_POS.X && this.game.click.offsetX <= this.CONTROLS_POS.X + this.CONTROLS_POS.width) &&
                (this.game.click.offsetY >= this.CONTROLS_POS.Y - this.CONTROLS_POS.height && this.game.click.offsetY <= this.CONTROLS_POS.Y)) {
                console.log("controls menu clicked");
                this.game.camera.loadControlsMenu();
                this.game.click = null;
            }
            else if ((this.game.click.offsetX >= this.GUIDE_POS.X && this.game.click.offsetX <= this.GUIDE_POS.X + this.GUIDE_POS.width) &&
                (this.game.click.offsetY >= this.GUIDE_POS.Y - this.GUIDE_POS.height && this.game.click.offsetY <= this.GUIDE_POS.Y)) {
                console.log("guide menu clicked")
                this.game.camera.loadGuideMenu();
                this.game.click = null;
            }
            else if ((this.game.click.offsetX >= this.CREDITS_POS.X && this.game.click.offsetX <= this.CREDITS_POS.X + this.CREDITS_POS.width) &&
                (this.game.click.offsetY >= this.CREDITS_POS.Y - this.CREDITS_POS.height && this.game.click.offsetY <= this.CREDITS_POS.Y)) {
                console.log("credits menu clicked")
                this.game.camera.loadCreditsMenu();
                this.game.click = null;
            }
            this.game.click = null;
        }
    };

    draw(ctx) {
        ctx.fillStyle = "darkslategray";
        ctx.font = "120px Charcoal";
        ctx.fillText("THERE ARE MILLIONS", this.TITLE_POS.X, this.TITLE_POS.Y);

        this.drawMap(ctx, 1);
        this.drawMap(ctx, 2);
        this.drawMap(ctx, 3);

        ctx.font = "50px Charcoal";
        this.drawControls(ctx);
        this.drawGuide(ctx);
        this.drawCredits(ctx);
    };

    drawMap(ctx, num) {
        // ctx.beginPath();
        // ctx.strokeStyle = "red";
        // ctx.rect(this.MAPONE_POS.X, this.MAPONE_POS.Y, this.MAPONE_POS.width, this.MAPONE_POS.height);
        // ctx.rect(this.MAPTWO_POS.X, this.MAPTWO_POS.Y, this.MAPTWO_POS.width, this.MAPTWO_POS.height);
        // ctx.rect(this.MAPTHREE_POS.X, this.MAPTHREE_POS.Y, this.MAPTHREE_POS.width, this.MAPTHREE_POS.height);
        // ctx.stroke();
        switch (num) {
            case 1:
                if ((this.game.mouse != null) && (this.game.mouse.offsetX >= this.MAPONE_POS.X && this.game.mouse.offsetX <= this.MAPONE_POS.X + this.MAPONE_POS.width) &&
                    (this.game.mouse.offsetY >= this.MAPONE_POS.Y && this.game.mouse.offsetY <= this.MAPONE_POS.Y + this.MAPONE_POS.height)) {
                    ctx.globalAlpha = 1.0;
                    ctx.drawImage(this.mapOneImg, this.MAPONE_POS.X, this.MAPONE_POS.Y, this.MAPONE_POS.width, this.MAPONE_POS.height);
                }
                else {
                    ctx.globalAlpha = 0.75;
                    ctx.drawImage(this.mapOneImg, this.MAPONE_POS.X, this.MAPONE_POS.Y, this.MAPONE_POS.width, this.MAPONE_POS.height);
                }
                break;
            case 2:
                if ((this.game.mouse != null) && (this.game.mouse.offsetX >= this.MAPTWO_POS.X && this.game.mouse.offsetX <= this.MAPTWO_POS.X + this.MAPTWO_POS.width) && (this.game.mouse.offsetY >= this.MAPTWO_POS.Y && this.game.mouse.offsetY <= this.MAPTWO_POS.Y + this.MAPTWO_POS.height)) {
                    ctx.globalAlpha = 1.0;
                    ctx.drawImage(this.mapOneImg, this.MAPTWO_POS.X, this.MAPTWO_POS.Y, this.MAPTWO_POS.width, this.MAPTWO_POS.height);
                }
                else {
                    ctx.globalAlpha = 0.75;
                    ctx.drawImage(this.mapOneImg, this.MAPTWO_POS.X, this.MAPTWO_POS.Y, this.MAPTWO_POS.width, this.MAPTWO_POS.height);
                }
                break;
            case 3:
                if ((this.game.mouse != null) && (this.game.mouse.offsetX >= this.MAPTHREE_POS.X && this.game.mouse.offsetX <= this.MAPTHREE_POS.X + this.MAPTHREE_POS.width) && (this.game.mouse.offsetY >= this.MAPTHREE_POS.Y && this.game.mouse.offsetY <= this.MAPTHREE_POS.Y + this.MAPTHREE_POS.height)) {
                    ctx.globalAlpha = 1.0;
                    ctx.drawImage(this.mapOneImg, this.MAPTHREE_POS.X, this.MAPTHREE_POS.Y, this.MAPTHREE_POS.width, this.MAPTHREE_POS.height);
                }
                else {
                    ctx.globalAlpha = 0.75;
                    ctx.drawImage(this.mapOneImg, this.MAPTHREE_POS.X, this.MAPTHREE_POS.Y, this.MAPTHREE_POS.width, this.MAPTHREE_POS.height);
                }
                break;
        }
        ctx.globalAlpha = 1.0;
    }

    drawControls(ctx) {
        // ctx.beginPath();
        // ctx.strokeStyle = "red";
        // ctx.rect(this.CONTROLS_POS.X, this.CONTROLS_POS.Y - this.CONTROLS_POS.height, this.CONTROLS_POS.width, this.CONTROLS_POS.height);
        // ctx.stroke();
        if ((this.game.mouse != null) && (this.game.mouse.offsetX >= this.CONTROLS_POS.X && this.game.mouse.offsetX <= this.CONTROLS_POS.X + this.CONTROLS_POS.width) && (this.game.mouse.offsetY >= this.CONTROLS_POS.Y - this.CONTROLS_POS.height && this.game.mouse.offsetY <= this.CONTROLS_POS.Y)) {
            ctx.fillStyle = "Black";
            ctx.fillText("Controls", this.CONTROLS_POS.X, this.CONTROLS_POS.Y);
        }
        else {
            ctx.fillStyle = "Gray";
            ctx.fillText("Controls", this.CONTROLS_POS.X, this.CONTROLS_POS.Y);
        }

    };

    drawGuide(ctx) {
        // ctx.beginPath();
        // ctx.strokeStyle = "red";
        // ctx.rect(this.GUIDE_POS.X, this.GUIDE_POS.Y - this.GUIDE_POS.height, this.GUIDE_POS.width, this.GUIDE_POS.height);
        // ctx.stroke();
        if ((this.game.mouse != null) && (this.game.mouse.offsetX >= this.GUIDE_POS.X && this.game.mouse.offsetX <= this.GUIDE_POS.X + this.GUIDE_POS.width) && (this.game.mouse.offsetY >= this.GUIDE_POS.Y - this.GUIDE_POS.height && this.game.mouse.offsetY <= this.GUIDE_POS.Y)) {
            ctx.fillStyle = "Black";
            ctx.fillText("Guide", this.GUIDE_POS.X, this.GUIDE_POS.Y);
        }
        else {
            ctx.fillStyle = "Gray";
            ctx.fillText("Guide", this.GUIDE_POS.X, this.GUIDE_POS.Y);
        }

    };

    drawCredits(ctx) {
        // ctx.beginPath();
        // ctx.strokeStyle = "red";
        // ctx.rect(this.CREDITS_POS.X, this.CREDITS_POS.Y - this.CREDITS_POS.height, this.CREDITS_POS.width, this.CREDITS_POS.height);
        // ctx.stroke();
        if ((this.game.mouse != null) && (this.game.mouse.offsetX >= this.CREDITS_POS.X && this.game.mouse.offsetX <= this.CREDITS_POS.X + this.CREDITS_POS.width) && (this.game.mouse.offsetY >= this.CREDITS_POS.Y - this.CREDITS_POS.height && this.game.mouse.offsetY <= this.CREDITS_POS.Y)) {
            ctx.fillStyle = "Black";
            ctx.fillText("Credits", this.CREDITS_POS.X, this.CREDITS_POS.Y);
        }
        else {
            ctx.fillStyle = "Gray";
            ctx.fillText("Credits", this.CREDITS_POS.X, this.CREDITS_POS.Y);
        }

    };
}