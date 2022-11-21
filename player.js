import { Running, Sitting, Jumping, Falling, Rolling } from "./playerStates.js";

export class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.vy = 0;
    this.weight  = 1;
    this.image = document.getElementById('player');
    //! add reading for frame axis on the sprite to change states
    // cycle from left to right on sprite player sheet
    this.frameX = 0;
    // end
    // cycle from up to down on sprite player sheet
    this.frameY = 0;
    // end
    this.maxFrame;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    // ! end 
    this.speed = 0;
    this.maxSpeed = 10;
    //! this.image = player;
    //! states
    // must be the same order as on the playerStates.js const states
    this.states = [
        new Sitting(this.game),
        new Running(this.game), 
        new Jumping(this.game), 
        new Falling(this.game),
        new Rolling(this.game),
      ];
    // end
    
    //! end 
  }
  update(input, deltaTime) {
    this.checkCollision();
    //! handle input for states
    this.currentState.handleInput(input);
    //! end
    //! horizontal movement for every frame
    this.x += this.speed;
    if (input.includes('ArrowRight')) this.speed = this.maxSpeed;
    else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
    else this.speed = 0;
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
    //! vertical movement
    this.y += this.vy;
    if (!this.onGround()) this.vy += this.weight;
    else this.vy = 0;
    //! sprite animation
    // control fps in the game
    if (this.frameTimer > this.frameInterval){
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;   
    } else {
      this.frameTimer += deltaTime;
    }
    // end

    //! end 
  }
  draw(context){
    // context.fillStyle = 'red';
    // context.fillRect(this.x, this.y, this.width, this.height);
    if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
  }
  onGround(){
    return this.y >= this.game.height - this.height - this.game.groundMargin;
  }
  setState(state, speed){
    this.currentState = this.states[state];
    this.game.speed = this.game.maxSpeed * speed;
    this.currentState.enter();
  }
  checkCollision(){
    this.game.enemies.forEach(enemy => {
      if (
        // collision detected
        enemy.x < this.x + this.width &&
        enemy.x + enemy.width > this.x && 
        enemy.y < this.y + this.height &&
        enemy.y + enemy.height > this.y
      ) {
        enemy.markedForDeletion = true;
        this.game.score++;
      } else {
        // no collision
      }

    });
  }
  
}
