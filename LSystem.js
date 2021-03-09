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

   generateRuleset() {
      const output = new Map();
      output.set(APARTMENTDEATH, (x, y) => {
         console.log(`build death x: ${x}, y: ${y}`);
         console.log("apartment died");
         for (let i = 0; i < 5; i++) {
            this.spawner.spawnEnemy(INFECTEDUNIT, x, y, this.spawner.copyPath(this.spawner.path1.path));
         }
      });

      output.set(BALLISTADEATH, (x, y) => {
         for (let i = 0; i < 3; i++) {
            //this.spawner.spawnEnemy(INFECTEDUNIT, x, y, )
         }
      });

      output.set(FARMDEATH, (x, y) => {
         for (let i = 0; i < 3; i++) {
            //this.spawner.spawnEnemy(INFECTEDUNIT, x, y, )
         }
      });

      output.set(FISHERMANDEATH, (x, y) => {
         for (let i = 0; i < 3; i++) {
            //this.spawner.spawnEnemy(INFECTEDUNIT, x, y, )
         }
      });

      output.set(MACHINEGUNDEATH, (x, y) => {
         for (let i = 0; i < 3; i++) {
            //this.spawner.spawnEnemy(INFECTEDUNIT, x, y, )
         }
      });

      output.set(QUARRYDEATH, (x, y) => {
         for (let i = 0; i < 3; i++) {
            //this.spawner.spawnEnemy(INFECTEDUNIT, x, y, )
         }
      });

      output.set(SAWMILLDEATH, (x, y) => {
         for (let i = 0; i < 3; i++) {
            //this.spawner.spawnEnemy(INFECTEDUNIT, x, y, )
         }
      });

      output.set(STONEDEATH, (x, y) => {
         for (let i = 0; i < 2; i++) {
            //this.spawner.spawnEnemy(INFECTEDUNIT, x, y, )
         }
      });

      output.set(WOODDEATH, (x, y) => {
         for (let i = 0; i < 1; i++) {
            //this.spawner.spawnEnemy(INFECTEDUNIT, x, y, )
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