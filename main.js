import { Player } from "./player.js";
import { InputHandler } from "./input.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      // !ground sprite
      this.groundMargin = 50;
      // !end
      this.player = new Player(this);
      this.input = new InputHandler();
    }
    update(deltaTime) {
        this.player.update(this.input.keys, deltaTime);
    }
    draw(context){
      this.player.draw(context);
    }
  }
  const game = new Game(canvas.width, canvas.height);
  console.log(game);

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
