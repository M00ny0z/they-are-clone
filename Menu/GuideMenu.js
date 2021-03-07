class GuideMenu {

    TITLE_POS = { X: 547, Y: 150 };
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

        ctx.fillText("GUIDE", this.TITLE_POS.X, this.TITLE_POS.Y);

        ctx.fillStyle = "White";
        fontsize = 125;
        ctx.font = fontsize + 'px "Charcoal"';

        // add controls

        if (this.game.mouse != null) {
            this.drawGoBack(ctx);
        }
        this.loadInstructions(ctx);

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

    loadInstructions(ctx) {
        var url = 'instructions.pdf';
        //
        // Asynchronous download PDF
        //
        var loadingTask = pdfjsLib.getDocument(url);
        loadingTask.promise.then(function(pdf) {
            //
            // Fetch the first page
            //
            pdf.getPage(1).then(function(page) {
            var scale = 1.5;
            var viewport = page.getViewport({ scale: scale, });

            //
            // Prepare canvas using PDF page dimensions
            //
            var canvas = document.getElementById('gameWorld');
           //const width = 250
            //const height = viewport.height * (width / viewport.width)
           //const canvas = new OffscreenCanvas(width, height)
            var context = canvas.getContext('2d');
            //canvas.height = viewport.height;
            //canvas.width = viewport.width;

            //
            // Render PDF page into canvas context
            //
            var renderContext = {
                canvasContext: context,
                viewport: viewport,
            };
            page.render(renderContext);
            });
        });
    }
}
