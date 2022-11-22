export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Creepster';
        this.livesImage = document.getElementById('lives');
       
    }
    draw(context){
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        // score
        context.fillText('Score: ' + this.game.score, 20, 50);
        // timer
        context.font = this.fontSize * .8 + 'px ' + this.fontFamily;
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80);
        // lives
        for (let i = 0; i < this.game.lives; i++) {
            context.drawImage(this.livesImage, 20 * i + 20, 95, 25, 25);

        }
        // end
        if (this.game.gameOver) {
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            if (this.game.score > 5) {
                context.fillText('BRAVO ANDREEA', this.game.width * .5, this.game.height * .5 - 30);
                context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
                context.fillText('What are creature of the night afraid? YOU!!!', this.game.width * .5, this.game.height * .5 + 80);
                
            } else {
                context.fillText('Love at first bite?', this.game.width * .5, this.game.height * .5 - 30);
                context.font = this.fontSize * 1.5 + 'px ' + this.fontFamily;
                context.fillText('Nope. Better luck next time!!!', this.game.width * .5, this.game.height * .5 + 80);

            }
        } 
        context.restore();
    }
}