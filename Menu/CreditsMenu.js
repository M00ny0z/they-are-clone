const imgY = 250;
const imgX = 100;
const spacing = 400;
const CRED1_POS ={ x: imgX, y: imgY, width: 210, height: 210 };
const CRED2_POS ={ x: imgX + spacing * 1, y: imgY, width: 210, height: 210 };
const CRED3_POS ={ x: imgX + spacing * 2, y: imgY, width: 210, height: 210 };
const CRED4_POS ={ x: imgX + spacing * 3, y: imgY, width: 210, height: 210 };

class CreditsMenu {

    WIDTH = 1584;
    HEIGHT = 896;
    TITLE_POS = { X: 470, Y: 170 };

    BACK_POS = { X: 10, Y: 85 };

    constructor(game) {
        Object.assign(this, {game});

        this.priority = MISCELLANEOUSPRIORITY;

        this.seoungdeokImg = ASSET_MANAGER.getAsset("./sprites/introScreen/credits/devs/npc.png");
        this.mannyImg = ASSET_MANAGER.getAsset("./sprites/introScreen/credits/devs/npc.png");
        this.garyImg = ASSET_MANAGER.getAsset("./sprites/introScreen/credits/devs/npc.png");
        this.gregImg = ASSET_MANAGER.getAsset("./sprites/introScreen/credits/devs/gregHablutzel.png");
        this.gregsDogImg = ASSET_MANAGER.getAsset("./sprites/introScreen/credits/gregsDog.jpg");
        this.devBackgroundImg = ASSET_MANAGER.getAsset("./sprites/introScreen/credits/devBackground.png");

        this.incaBackImg = ASSET_MANAGER.getAsset("./sprites/introScreen/credits/inca_back.png");
        this.incaBack2Img = ASSET_MANAGER.getAsset("./sprites/introScreen/credits/inca_back2.png");
        this.incaFrontImg = ASSET_MANAGER.getAsset("./sprites/introScreen/credits/inca_front.png");




        this.devArray = [{img: this.seoungdeokImg, name: "Seoungdeok Jeon", text: ["Hey. I'm not an NPC."]}, 
                         {img: this.mannyImg, name: "Manny Munoz", text: ["Hey. I'm not an NPC."]}, 
                         {img: this.garyImg, name: "Gary Kono", text: ["Hey. I'm not an NPC."]}, 
                         {img: this.gregImg, name: "Gregory Hablutzel", text: ["Say hello to my little", "friend."]}];
        this.posArray = [CRED1_POS, CRED2_POS, CRED3_POS, CRED4_POS];


        shuffleArray(this.posArray); // shuffle credit order
        shuffleArray(this.devArray); // shuffle credit order

    };

    update() {

        if (this.game.mouse != null) {
            if ((this.game.mouse.offsetX >= 10 && this.game.mouse.offsetX <= 225) && (this.game.mouse.offsetY >= 20 && this.game.mouse.offsetY <= 65)
            && (this.game.click)) {
                this.game.camera.loadStartMenu();
            }
        }

    };

    draw(ctx) {

        ctx.fillStyle = "darkslategray";
        var fontsize = 150;
        ctx.font = fontsize + 'px "Charcoal"';

        ctx.fillText("CREDITS", this.TITLE_POS.X, this.TITLE_POS.Y);

        ctx.fillStyle = "black";
        fontsize = 125;
        ctx.font = fontsize + 'px "Charcoal"';
        //ctx.drawImage(this.gregImg, this.GREG_POS.X, this.GREG_POS.Y, this.GREG_POS.width, this.GREG_POS.height);

        this.drawDevs(ctx);

        /*ctx.fillText("Seoungdeok Jeon", this.SEOUNGDEOK_POS.X, this.SEOUNGDEOK_POS.Y);
        ctx.fillText("Gary Kono", this.GARY_POS.X, this.GARY_POS.Y);
        ctx.fillText("Gregory Hablutzel", this.GREG_POS.X, this.GREG_POS.Y);
        ctx.fillText("Manny Munoz", this.MANNY_POS.X, this.MANNY_POS.Y);
*/
        if (this.game.mouse != null) {
            this.drawGoBack(ctx);
        }
    
    };

    drawDevs(ctx) {
        for (let i = 0; i < 4; i++) {
            let dev = this.devArray[i];
            let pos = this.posArray[i];
            //ctx.drawImage(dev.img, pos.x, pos.y, pos.width, pos.height);
            //ctx.drawImage(this.devBackgroundImg, pos.x-50, pos.y-50, pos.x + 50 + pos.width + 50, pos.y + 50 + pos.height + 50);   
            ctx.drawImage(this.devBackgroundImg, pos.x-50, pos.y-50, pos.width + 50 + 50, pos.height + 50 + 200);   

            ctx.drawImage(dev.img, pos.x, pos.y, pos.width, pos.height);
            ctx.font = "20px SpaceMono-Bold";
            ctx.fillStyle = "pink";
            ctx.textBaseline = "bottom";
            ctx.fillText(dev.name, pos.x, pos.y+250);


            ctx.font = "15px SpaceMono-Regular";
            ctx.fillStyle = "lightgray";
            let posY = 300;
            let j = 0;
            dev.text.forEach(text => {
                ctx.fillText(dev.text[j], pos.x, pos.y + posY);
                posY += 20;
                j = j+1;
            });
            //ctx.fillText(dev.text, pos.x, pos.y+300);

            if (dev.name == "Gregory Hablutzel") {
                ctx.drawImage(this.gregsDogImg, pos.x+100, pos.y+posY-40+3, 60, 70);   
            }



        }
    }

    drawGoBack(ctx) {

        var fontsize = 75;
        ctx.font = fontsize + 'px "Charcoal"';
        if ((this.game.mouse.offsetX >= 10 && this.game.mouse.offsetX <= 225) && (this.game.mouse.offsetY >= 20 && this.game.mouse.offsetY <= 65)) {
            ctx.fillStyle = "White";
            ctx.fillText("Go Back", this.BACK_POS.X, this.BACK_POS.Y);
        }
        else {
            ctx.fillStyle = "Gray";
            ctx.fillText("Go Back", this.BACK_POS.X, this.BACK_POS.Y);
        }

    };

}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}