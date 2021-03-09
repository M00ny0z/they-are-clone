class LSystem {
   constructor(spawner) {
      this.spawner = spawner;
      this.events = [];
      this.rules = this.generateRuleset();
   }

   report(event, x, y) {
      //this.events.push({ event: this.rules.get(event), x, y });
      this.rules.get(event)(x, y);
   }

   //NOTE CANNOT BE ANYTHING BESIDES INFECTEDUNIT FOR NOW
   generateRuleset() {
      const output = new Map();
      output.set(APARTMENTDEATH, (x, y) => {
         for (let i = 0; i < 5; i++) {
            this.spawner.spawnEnemy(INFECTEDUNIT, x, y, this.spawner.copyPath(this.spawner.path1.path));
         }
      });

      output.set(BALLISTADEATH, (x, y) => {
         for (let i = 0; i < 2; i++) {
            this.spawner.spawnEnemy(INFECTEDUNIT, x, y, this.spawner.copyPath(this.spawner.path1.path));
         }
      });

      output.set(FARMDEATH, (x, y) => {
         for (let i = 0; i < 2; i++) {
            this.spawner.spawnEnemy(INFECTEDUNIT, x, y, this.spawner.copyPath(this.spawner.path1.path));
         }
      });

      output.set(FISHERMANDEATH, (x, y) => {
         for (let i = 0; i < 2; i++) {
            this.spawner.spawnEnemy(INFECTEDUNIT, x, y, this.spawner.copyPath(this.spawner.path1.path));
         }
      });

      output.set(MACHINEGUNDEATH, (x, y) => {
         for (let i = 0; i < 2; i++) {
            this.spawner.spawnEnemy(INFECTEDUNIT, x, y, this.spawner.copyPath(this.spawner.path1.path));
         }
      });

      output.set(QUARRYDEATH, (x, y) => {
         for (let i = 0; i < 2; i++) {
            this.spawner.spawnEnemy(INFECTEDUNIT, x, y, this.spawner.copyPath(this.spawner.path1.path));
         }
      });

      output.set(SAWMILLDEATH, (x, y) => {
         for (let i = 0; i < 2; i++) {
            this.spawner.spawnEnemy(INFECTEDUNIT, x, y, this.spawner.copyPath(this.spawner.path1.path));
         }
      });

      output.set(STONEDEATH, (x, y) => {
         for (let i = 0; i < 2; i++) {
            this.spawner.spawnEnemy(INFECTEDUNIT, x, y, this.spawner.copyPath(this.spawner.path1.path));
         }
      });

      output.set(WOODDEATH, (x, y) => {
         for (let i = 0; i < 2; i++) {
            this.spawner.spawnEnemy(INFECTEDUNIT, x, y, this.spawner.copyPath(this.spawner.path1.path));
         }
      });

      return output;
   }

   executeRules() {
      for (const event of events) {
         event.event(event.x, event.y);
      }
      this.events.clear();
   }
}