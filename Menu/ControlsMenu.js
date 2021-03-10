class ControlsMenu {

    TITLE_POS = { X: 400, Y: 150 };
    BACK_POS = { X: 10, Y: 85 };
    constructor(game) {
        Object.assign(this, {game});
        this.priority = MISCELLANEOUSPRIORITY;
    };

    update() {
        if (this.game.mouse != null) {
            if ((this.game.mouse.offsetX >= 10 && this.game.mouse.offsetX <= 325) && (this.game.mouse.offsetY >= 0 && this.game.mouse.offsetY <= 95)
            && (this.game.click)) {
                this.game.camera.loadStartMenu();
            }
        }

    };

    draw(ctx) {

        ctx.fillStyle = "darkslategray";
        var fontsize = 150;
        ctx.font = fontsize + 'px "Charcoal"';

        ctx.fillText("CONTROLS", this.TITLE_POS.X, this.TITLE_POS.Y);

        ctx.fillStyle = "White";
        fontsize = 125;
        ctx.font = fontsize + 'px "Charcoal"';

        // add controls

        this.addControlsDescription(ctx);

        if (this.game.mouse != null) {
            this.drawGoBack(ctx);
        }

    };

    drawGoBack(ctx) {
        var fontsize = 75;
        ctx.font = fontsize + 'px "Charcoal"';
        if ((this.game.mouse.offsetX >= 10 && this.game.mouse.offsetX <= 325) && (this.game.mouse.offsetY >= 0 && this.game.mouse.offsetY <= 95)) {
            ctx.fillStyle = "White";
            ctx.fillText("Go Back", this.BACK_POS.X, this.BACK_POS.Y);
        }
        else {
            ctx.fillStyle = "Gray";
            ctx.fillText("Go Back", this.BACK_POS.X, this.BACK_POS.Y);
        }

    };

    // creates the descriptions for a given UI element
    addControlsDescription(ctx) {

        let controlTextArray = [

                            {header: "Camera Control", text: [
                                {control: "w", description: "Move Camera Up"},
                                {control: "a", description: "Move Camera Left"},
                                {control: "s", description: "Move Camera Down"},
                                {control: "d", description: "Move Camera Right"}
                                ]
                            },

            
                            {header: "Unit Movement", text: [
                                                        {control: "Left Click", description: "Select Unit"},
                                                        {control: "Left Click + Drag", description: "Rectangle Select units in rectangle"},
                                                        {control: "Right Click", description: "Move selected units to path if valid path"},
                                                        {control: "Left Click (away from selected units)", description: "Clear selected units"}    
                                                    ]
                            },

                            {header: "Other Mouse", text: [
                                {control: "Double Click on Placed Building", description: "Removes Building (giving back some resources)"} 
                                ]
                            },

                            {header: "Attacking", text: [
                                {control: "Do Nothing", description: "If enemy is within range, your unit will attack it automatically."} 
                                ]
                            }
                        ]




        ctx.font = "25px SpaceMono-Regular";
        ctx.fillStyle = "red";
        //ctx.textBaseline = "bottom";
        //ctx.fillText("Mouse", 100, 182);

        let spacing = 30;

        let posX = 100;
        let posY = 182;
        controlTextArray.forEach(controlDescriptionObject => {
            posX = 100;
            let header = controlDescriptionObject.header;
            ctx.fillText(header + ":", posX, posY);
            posY += spacing;

            let controlDescriptionArray = controlDescriptionObject.text;

            controlDescriptionArray.forEach(controlDescription => {
                posX = 120;
                let control = controlDescription.control;
                let description = controlDescription.description;
                ctx.fillText(control + ": " + description, posX, posY);
                posY += spacing;
            })

            posY += spacing

        });
    }
}