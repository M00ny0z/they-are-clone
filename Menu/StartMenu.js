class StartMenu {

    TITLE_POS = { X: 300, Y: 100 };

    MAPONE_POS = { X: 100, Y: 130, width: 350, height: 350 };
    MAPTWO_POS = { X: 625, Y: 130, width: 350, height: 350 };
    MAPTHREE_POS = { X: 1150, Y: 130, width: 350, height: 350 };

    // 1
    MAPONE_TITLE_POS = {X: 160, Y: 515};
    MAPONE_DESCRIPTION_POS = {X: 100, Y: 540};
    // 2
    MAPTWO_TITLE_POS = {X: 650, Y: 515};
    MAPTWO_DESCRIPTION_POS = {X: 625, Y: 540};
    // 3
    MAPTHREE_TITLE_POS = {X: 1210, Y: 515};
    MAPTHREE_DESCRIPTION_POS = {X: 1150, Y: 540};

    STUDIO_POS = { X: 630, Y: 800, width: 350, height: 50 };

    // CONTROLS_POS = { X: 1395, Y: 805, width: 130, height: 20 };
    // GUIDE_POS = { X: 1420, Y: 835, width: 90, height: 20 };
    // CREDITS_POS = { X: 1410, Y: 865, width: 110, height: 20 };
    CONTROLS_POS = { X: 1100, Y: 835, width: 130, height: 20 };
    GUIDE_POS = { X: 1270, Y: 835, width: 90, height: 20 };
    CREDITS_POS = { X: 1400, Y: 835, width: 110, height: 20 };

    constructor(game) {
        Object.assign(this, { game });
        this.mapOneImg = ASSET_MANAGER.getAsset("./sprites/mapOne.png");
        this.mapTwoImg = ASSET_MANAGER.getAsset("./sprites/mapTwo.png");
        this.mapThreeImg = ASSET_MANAGER.getAsset("./sprites/mapThree.png");
        this.createdByImg = ASSET_MANAGER.getAsset("./sprites/createdBy.png");
        this.red5StudiosImg = ASSET_MANAGER.getAsset("./sprites/introScreen/red5Studios.png");

        this.priority = MISCELLANEOUSPRIORITY;
    };

    update() {
        if (this.game.click) {
            if ((this.game.click.offsetX >= this.MAPONE_POS.X && this.game.click.offsetX <= this.MAPONE_POS.X + this.MAPONE_POS.width) &&
                (this.game.click.offsetY >= this.MAPONE_POS.Y && this.game.click.offsetY <= this.MAPONE_POS.Y + this.MAPONE_POS.height)) {
                console.log("map one clicked");
                this.game.camera.title = false;
                this.game.camera.startMap(1);
                this.game.click = null;
            }
            else if ((this.game.click.offsetX >= this.MAPTWO_POS.X && this.game.click.offsetX <= this.MAPTWO_POS.X + this.MAPTWO_POS.width) &&
                (this.game.click.offsetY >= this.MAPTWO_POS.Y && this.game.click.offsetY <= this.MAPTWO_POS.Y + this.MAPTWO_POS.height)) {
                console.log("map two clicked");
                this.game.camera.title = false;
                this.game.camera.startMap(2);
                this.game.click = null;
            }
            else if ((this.game.click.offsetX >= this.MAPTHREE_POS.X && this.game.click.offsetX <= this.MAPTHREE_POS.X + this.MAPTHREE_POS.width) &&
                (this.game.click.offsetY >= this.MAPTHREE_POS.Y && this.game.click.offsetY <= this.MAPTHREE_POS.Y + this.MAPTHREE_POS.height)) {
                console.log("map three clicked");
                this.game.camera.title = false;
                this.game.camera.startMap(3);
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
        ctx.font = "100px Charcoal";
        ctx.fillText("THEY ARE MILLIONS", this.TITLE_POS.X, this.TITLE_POS.Y);

        this.drawMap(ctx, 1);
        this.drawMap(ctx, 2);
        this.drawMap(ctx, 3);

        this.addDescription(ctx,1);
        this.addDescription(ctx,2);
        this.addDescription(ctx,3);

        ctx.font = "38px Charcoal";
        this.drawControls(ctx);
        this.drawGuide(ctx);
        this.drawCredits(ctx);
        
        ctx.drawImage(this.red5StudiosImg, this.STUDIO_POS.X, this.STUDIO_POS.Y, this.STUDIO_POS.width, this.STUDIO_POS.height);
    };

    drawMap(ctx, num) {
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
                    ctx.drawImage(this.mapTwoImg, this.MAPTWO_POS.X, this.MAPTWO_POS.Y, this.MAPTWO_POS.width, this.MAPTWO_POS.height);
                }
                else {
                    ctx.globalAlpha = 0.75;
                    ctx.drawImage(this.mapTwoImg, this.MAPTWO_POS.X, this.MAPTWO_POS.Y, this.MAPTWO_POS.width, this.MAPTWO_POS.height);
                }
                break;
            case 3:
                if ((this.game.mouse != null) && (this.game.mouse.offsetX >= this.MAPTHREE_POS.X && this.game.mouse.offsetX <= this.MAPTHREE_POS.X + this.MAPTHREE_POS.width) && (this.game.mouse.offsetY >= this.MAPTHREE_POS.Y && this.game.mouse.offsetY <= this.MAPTHREE_POS.Y + this.MAPTHREE_POS.height)) {
                    ctx.globalAlpha = 1.0;
                    ctx.drawImage(this.mapThreeImg, this.MAPTHREE_POS.X, this.MAPTHREE_POS.Y, this.MAPTHREE_POS.width, this.MAPTHREE_POS.height);
                }
                else {
                    ctx.globalAlpha = 0.75;
                    ctx.drawImage(this.mapThreeImg, this.MAPTHREE_POS.X, this.MAPTHREE_POS.Y, this.MAPTHREE_POS.width, this.MAPTHREE_POS.height);
                }
                break;
        }
        ctx.globalAlpha = 1.0
    }

    addDescription(ctx, num) {
        switch (num) {
            case 1:
                ctx.beginPath();
                ctx.fillStyle = "darkgrey";
                ctx.fillRect(this.MAPONE_DESCRIPTION_POS.X, this.MAPONE_TITLE_POS.Y - 30, 350, 310);
                ctx.stroke();

                ctx.fillStyle = "black";
                ctx.font = "bold 30px Charcoal";
                ctx.fillText("The Hidden Valley", this.MAPONE_TITLE_POS.X, this.MAPONE_TITLE_POS.Y);
                ctx.font = "16px Charcoal";
                ctx.fillStyle = "white";
                ctx.fillText("Difficult: ", this.MAPONE_DESCRIPTION_POS.X + 10,  this.MAPONE_DESCRIPTION_POS.Y);
                ctx.fillStyle = "green";
                ctx.fillText("Easy", this.MAPONE_DESCRIPTION_POS.X + 75,  this.MAPONE_DESCRIPTION_POS.Y);
                ctx.fillStyle = "white";
                ctx.fillText("Days: 10", this.MAPONE_DESCRIPTION_POS.X + 10, this.MAPONE_DESCRIPTION_POS.Y + 20);

                var descriptionTextY = this.MAPONE_DESCRIPTION_POS.Y + 50;
                var descriptionStringArray = ["Our rangers found this small valley on the banks of", "a shallow river. It is undoubtedly where the capital", "city New Empire rises. On the map you will find" , "rich mineral deposits that are needed to defend the", "colony."];
                descriptionStringArray.forEach(description => {
                    ctx.fillText(description, this.MAPONE_DESCRIPTION_POS.X + 5, descriptionTextY);
                    descriptionTextY += 20;
                })
                break;
            case 2:
                ctx.beginPath();
                ctx.fillStyle = "darkgrey";
                ctx.fillRect(this.MAPTWO_DESCRIPTION_POS.X, this.MAPTWO_TITLE_POS.Y - 30, 350, 310);
                ctx.stroke();

                ctx.fillStyle = "black";
                ctx.font = "bold 30px Charcoal";
                ctx.fillText("The Mines of the Raven", this.MAPTWO_TITLE_POS.X, this.MAPTWO_TITLE_POS.Y);
                ctx.font = "16px Charcoal";
                ctx.fillStyle = "white";
                ctx.fillText("Difficult: ", this.MAPTWO_DESCRIPTION_POS.X + 10,  this.MAPTWO_DESCRIPTION_POS.Y);
                ctx.fillStyle = "yellow";
                ctx.fillText("Medium", this.MAPTWO_DESCRIPTION_POS.X + 75,  this.MAPTWO_DESCRIPTION_POS.Y);
                ctx.fillStyle = "white";
                ctx.fillText("Days: 15", this.MAPTWO_DESCRIPTION_POS.X + 10, this.MAPTWO_DESCRIPTION_POS.Y + 20);
                var descriptionTextY = this.MAPTWO_DESCRIPTION_POS.Y + 50;
                var descriptionStringArray = ["On this volcanic wasteland of sharp rocks, you'll", 
                                            "find iron mines that were abandoned by humans a", 
                                            "long time ago. Now, only the croaking of the ravens", 
                                            "breaks the silence of these ash lands. Build a large", 
                                            "colony and exploit its valuable mines to ensure a", 
                                            "continuous supply of resources for the Empire.", 
                                            "There are many points of entry between the", 
                                            "mountains and the mines. You will have to build", 
                                            "strong defenses at each entrance to protect the mines."];
                descriptionStringArray.forEach(description => {
                    ctx.fillText(description, this.MAPTWO_DESCRIPTION_POS.X + 5, descriptionTextY);
                    descriptionTextY += 20;
                })
                break;   
            case 3:
                ctx.beginPath();
                ctx.fillStyle = "darkgrey";
                ctx.fillRect(this.MAPTHREE_DESCRIPTION_POS.X, this.MAPTHREE_TITLE_POS.Y - 30, 350, 310);
                ctx.stroke();

                ctx.fillStyle = "black";
                ctx.font = "bold 30px Charcoal";
                ctx.fillText("The Coast of Bones", this.MAPTHREE_TITLE_POS.X, this.MAPTHREE_TITLE_POS.Y);
                ctx.font = "16px Charcoal";
                ctx.fillStyle = "white";
                ctx.fillText("Difficult: ", this.MAPTHREE_DESCRIPTION_POS.X + 10,  this.MAPTHREE_DESCRIPTION_POS.Y);
                ctx.fillStyle = "red";
                ctx.fillText("Hard", this.MAPTHREE_DESCRIPTION_POS.X + 75,  this.MAPTHREE_DESCRIPTION_POS.Y);
                ctx.fillStyle = "white";
                ctx.fillText("Days: 20", this.MAPTHREE_DESCRIPTION_POS.X + 10, this.MAPTHREE_DESCRIPTION_POS.Y + 20);
                var descriptionTextY = this.MAPTHREE_DESCRIPTION_POS.Y + 50;
                var descriptionStringArray = ["Thousands of human bones are scattered across the", 
                                            "sands of this coast, like macabre witnesses of a battle", 
                                            "of long ago. However, the waters that bathe the Coast", 
                                            "of Bones are exceptionally rich in marine life and a", 
                                            "very favorable environment to build a fishing-based", 
                                            "colony. It's a relatively easy place to protect. To", 
                                            "the North a great mountain range rises and, to the", 
                                            "South, the great sea provides protection. Get rid of", 
                                            "the infected in the region quickly, so you can defend", 
                                            "your colony from the larger and ever vicious", "onslaught."];
                descriptionStringArray.forEach(description => {
                    ctx.fillText(description, this.MAPTHREE_DESCRIPTION_POS.X + 5, descriptionTextY);
                    descriptionTextY += 20;
                })
        }
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