class MapTwo {
    constructor(game) {
        Object.assign(this, { game });
        this.game.mainMap = this;

        this.mapNum = 2;

        // indices in TileMaps object
        this.indices = {dirt: 0, collision: 7, tracks: 2, green: 6, water: 5, ore: 3};

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mapTwoWithGrid.png");
        this.priority = MAPPRIORITY;

        this.game.collisionMap = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
        // this.calculatePath(15, 0, 42, 0)


        //this.collisionMap[0][1] = 1; 
        //console.log("collisionMap");
        //console.log(this.collisionMap);

        this.map = [];
        /*for (var i = 0; i < 50; i++) {
            this.map.push([]);
            for (var j = 0; j < 50; j++) {
                this.map[i].push({ "collisions": false, "green": false, "water": false, "dirt": false, "stone": false, "iron": false, "collisions": false,
                                    "fishermansCottage": false, "farm": false, "quarry": false, "sawmill": false});
                if (TileMaps.map.layers[0].data[j + (i * 50)] != 0) {
                    this.map[i][j].collisions = true;
                }
                if (TileMaps.map.layers[1].data[j + (i * 50)] != 0) {
                    this.map[i][j].green = true;
                }
                if (TileMaps.map.layers[2].data[j + (i * 50)] != 0) {
                    this.map[i][j].water = true;
                }
                if (TileMaps.map.layers[3].data[j + (i * 50)] == 116) { // 116 is dirt
                    this.map[i][j].dirt = true;
                }
                if (TileMaps.map.layers[6].data[j + (i * 50)] == 1374) { // 1374 is stone
                    this.map[i][j].stone = true;
                }
                if (TileMaps.map.layers[6].data[j + (i * 50)] == 1372) { // 1372 is iron
                    this.map[i][j].iron = true;
                }
            }
        }*/
        for (var x = 0; x < 50; x++) {
            this.map.push([]);
            for (var y = 0; y < 50; y++) {
                this.map[x].push({"green": false, "water": false, "dirt": false, "stone": false, "iron": false, "railroad": false,
                    "FishermansCottage": false, "Farm": false, "Quarry": false, "Sawmill": false
                });
            }
        }
        for (var i = 0; i < 2500; i++) {
            let x = i % 50; // column
            let y = Math.floor(i / 50); // row

            if (TileMaps.map2.layers[this.indices.collision].data[i] != 0) { 
                //console.log("true");
                this.game.collisionMap[y][x] = 0;
            }
            if (TileMaps.map2.layers[this.indices.green].data[i] != 0) {
                this.map[y][x].green = true;
            }
            if (TileMaps.map2.layers[this.indices.water].data[i] != 0) {
                this.map[y][x].water = true;
            }
            if (TileMaps.map2.layers[this.indices.dirt].data[i] == 4748) { // 116 is dirt (TileMaps.map2.layers[0].data[12*50 +17])
                this.map[y][x].dirt = true;
            }
            if (TileMaps.map2.layers[this.indices.ore].data[i] == 1374) { // 1374 is stone
                this.map[y][x].stone = true;
            }
            if (TileMaps.map2.layers[6].data[i] == 1372) { // 1372 is iron
                this.map[y][x].iron = true;
            }
        }

        // commandcenter
        for (var x = 20; x < 23; x++) {
            for (var y = 29; y < 32; y++) {
                this.game.collisionMap[y][x] = 0;
                //this.map[y][x].collisions = true;
            }
        }

        // railroad tracks

        var path1 = [//{ x: 39, y: 0},
            { x: 39, y: 7 },
            { x: 33, y: 7 },
            { x: 33, y: 16 },
            { x: 36, y: 16 },
            { x: 36, y: 22 },
            { x: 18, y: 22 },
            { x: 18, y: 35 },
            { x: 28, y: 35 }];

        var path2 = [//{ x: 25, y :51},
            { x: 25, y: 48 },
            { x: 22, y: 48 },
            { x: 22, y: 42 },
            { x: 28, y: 42 },
            { x: 28, y: 35 }
        ];


        //this.game.mainMap = this.map;
        //this.outputMapToText();
        //console.log("collisionMap:");
        //console.log(this.collisionMap);

        //showCollisions();


        // ADD THIS TO .railroad 
        let path1Path = returnIndividualPathCoordinates(path1, 39, 0);

        //console.log("path1Path");
        //console.log(path1Path);

        let path2Path = returnIndividualPathCoordinates(path2, 25, 49);

        //console.log("path2Path");
        //console.log(path2Path);

        this.addPathAsFilled(path1Path);
        this.addPathAsFilled(path2Path);
        console.log("map done:");
        console.log(this.map);

        console.log("collision map (1 = free, 0 = wall (collision)): ");
        console.log(this.game.collisionMap);

        //array[0].map((_, colIndex) => array.map(row => row[colIndex]));

        //console.log(_.zip.apply(_, the.game.collisionMap));

        //console.log("transposed map:");
        //console.log(this.transpose(this.game.collisionMap));

        //printCollisionMap();


        //printCollisionMap();

        /*var easystar = new EasyStar.js();
        // for web
        var grid = [[0,0,1,0,0],
                    [1,0,1,0,0],
                    [0,0,1,1,0],
                    [0,1,1,0,0],
                    [0,0,0,0,1]];

        easystar.setGrid(grid);
        easystar.setAcceptableTiles([0]);
        easystar.findPath(0, 0, 4, 0, function( path ) {
            if (path === null) {
                console.log("Path was not found.");
            } else {
                console.log("Path was found. The first Point is: ");
                console.log(path);
            }
        });
        easystar.setIterationsPerCalculation(1000);
        easystar.calculate();*/
        //console.log(path);

        // used for astar.js
        /*this.game.collisionMapGrid = new Graph(this.game.collisionMap);

        console.log("collisionMapGrid is: ");
        console.log(this.game.collisionMapGrid);
        var start = this.game.collisionMapGrid.grid[0][15];
        var end = this.game.collisionMapGrid.grid[1][42];
        var result = astar.search(this.game.collisionMapGrid, start, end);
        console.log("javascript-astar path: ");
        console.log(result);*/

        /*var graph = new Graph([
            [1,1,1,1],
            [0,1,1,0],
            [0,0,1,1]
        ]);
        var start = graph.grid[0][0];
        var end = graph.grid[1][2];
        var result = astar.search(graph, start, end);
        console.log("javascript-astar default output");
        console.log(result);*/





        //this.calculatePath(15, 0, 42, 1)
        //console.log("calculatePath(15, 0, 42, 1)");
        //let transposedGrid = this.transpose(this.game.collisionMap);
        //this.calculatePath(transposedGrid, 15, 0, 42, 1);
        let path = calculatePath(0, 15, 1, 42);
        console.log("path from return stored in variable:");
        console.log(path);

        this.generateCollisionMap2DArrayRow();
}


    generateCollisionMap2DArrayRow() {
        console.log("print row: ");
        let rowVal = "["
        for (var val = 0; val <= 48; val++) {
            rowVal += 1 + ", "
        }
        // 49
        rowVal += 1 + "]"
        console.log(rowVal);
    }

  transpose(matrix) {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
  }


    addPathAsFilled(pathArray) {
        pathArray.forEach(path => {
            //console.log(path.x);
            //let x = path.x
            //let y = path.y
            //console.log("x: " + x + ", y: " + y);
            this.map[path.y][path.x].railroad = true;
            //setColMapXYVal(x, y, 1);
        });
    }
    outputMapToText() {
        for (var x = 0; x < 50; x++) {
            this.map.push([]);
            for (var y = 0; y < 50; y++) {
                console.log("(" + x + ", " + y + "): " + ", green: " + this.map[y][x].green +
                    ", water: " + this.map[y][x].water + ", dirt: " + this.map[y][x].dirt + ", stone: " + this.map[y][x].stone + ", iron: " + this.map[y][x].iron +
                    ", fishermansCottage: " + this.map[y][x].fishermansCottage + ", farm: " + this.map[y][x].farm +
                    ", quarry: " + this.map[y][x].quarry + ", sawmill: " + this.map[y][x].sawmill);
            }
        }
    }


    update() {
        if (!PARAMS.DEBUG) {
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mapTwo.png");
        } else {
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mapTwoWithGrid.png");
        }

        //let path = [{x: 0, y:0}, {x:0, y:1}]
        /*let path = [{y:37, x: 27}, {y:37, x:28}]
        for (let i = 1; i < path.length; i++) {
            let point1 = {x: convertGridCordToPixelCord(path[i-1].x) + PARAMS.BLOCKWIDTH/2, y: convertGridCordToPixelCord(path[i-1].y) + PARAMS.BLOCKWIDTH / 2}; // convert grid coordinate to pixel.
            let point2 = {x: convertGridCordToPixelCord(path[i].x) + PARAMS.BLOCKWIDTH/2, y: convertGridCordToPixelCord(path[i].y) + PARAMS.BLOCKWIDTH / 2}; // convert grid coordinate to pixel.

            this.game.ctx.strokeStyle = "red";
            this.game.ctx.beginPath();
            this.game.ctx.setLineDash([5, 15]);
            this.game.ctx.moveTo(point1.y, point1.x);
            this.game.ctx.lineTo(point2.y, point2.x)
            this.game.ctx.stroke();
            this.game.ctx.setLineDash([]);
        }*/


    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, (-this.game.camera.cameraX * PARAMS.BLOCKWIDTH), (-this.game.camera.cameraY * PARAMS.BLOCKWIDTH), PARAMS.BLOCKWIDTH * PARAMS.MAPWIDTH, PARAMS.BLOCKWIDTH * PARAMS.MAPHEIGHT);
        if (PARAMS.CORD) {
            //ctx.strokeStyle = 'Green';
            //ctx.strokeRect(x, y, this.width * scale, this.height * scale);
            ctx.font = "10px SpaceMono-Regular";
            ctx.fillStyle = "black";
            for (var i = 0; i < 50; i++) {
                for (var j = 0; j < 50; j++) {
                    var x = (j - this.game.camera.cameraX) * PARAMS.BLOCKWIDTH;
                    var y = (i - this.game.camera.cameraY + 1) * PARAMS.BLOCKWIDTH;
                    //var x = j * PARAMS.BLOCKWIDTH;
                    //var y = i * PARAMS.BLOCKWIDTH;
                    ctx.fillText("(" + i + ", " + j + ")", x, (y-30));
                }
            }
        }
        //showCollisions();

    }

    drawMinimap(ctx, mmX, mmY) {
        ctx.drawImage(this.spritesheet, mmX, mmY, PARAMS.BLOCKWIDTH * 4, PARAMS.BLOCKWIDTH * 4);
    }
}