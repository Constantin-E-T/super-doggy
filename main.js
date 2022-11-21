import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy, ClimbingEnemy, GroundEnemy } from "./enemies.js";
import { UI } from "./UI.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 80;
      this.speed = 0;
      this.maxSpeed = 4;
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.UI = new UI(this);
      // Enemy add
      this.enemies = [];
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      // end
      // particles
      this.particles = [];
      this.maxParticles = 50;
      // debug box
      this.debug = true;
      // score on collision
      this.score = 0;
      // font color for score
      this.fontColor = 'black';
      // end
      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();
    }
    update(deltaTime) {
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
      // handleEnemies
      if (this.enemyTimer > this.enemyInterval){
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach(enemy => {
        enemy.update(deltaTime);
        // remove enemy from array after passing left side of the display
        if (enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1);
      });
      // handle particle
      this.particles.forEach((particle, index) => {
        particle.update();
        if (particle.markedForDeletion) this.particles.splice(index, 1);
      });
      if (this.particles.length > 50) {
        this.particles = this.particles.slice(0, this.maxParticles);
      }
    }
    draw(context){
      this.background.draw(context);
      this.player.draw(context);
      this.enemies.forEach(enemy => {
        enemy.draw(context);
      });
      this.particles.forEach(particle => {
        particle.draw(context);
      })
      this.UI.draw(context);
    }
    addEnemy(){
      // ground enemy
      if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
      // end
      // climbing enemy
      else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
      // end
      // flying enemy
      this.enemies.push(new FlyingEnemy(this))
      // console.log(this.enemies);
      // end
    }
  }
  const game = new Game(canvas.width, canvas.height);
  // console.log(game);

  //! animate sprite by frames
  let lastTime = 0
  //! end
  function animate(timeStamp) {
    //! animate sprite by frames
    const deltaTime = timeStamp - lastTime;
    // console.log(deltaTime);
    lastTime = timeStamp;
    //! end
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }

  animate(0);
});
