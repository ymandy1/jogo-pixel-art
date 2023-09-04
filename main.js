import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy, ClimbingEnemy , GroundEnemy} from "./enemies.js";
window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;

    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.speed = 3;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler();
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
        }
        
        update(deltaTime){
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            if(this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
            })
        }
        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            })

        }
        addEnemy() {
            this.enemies.push(new FlyingEnemy(this))
            console.log(this.enemies);
        }
    }
    const game = new Game(canvas.width, canvas.height);
    console.log(game);

    let lastTimestamp = 0;
        
    function animate(timestamp){
        const deltaTime = (timestamp - lastTimestamp) / 1000;
        ctx.clearRect(0,0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);

        lastTimestamp = timestamp;
        requestAnimationFrame(animate);
    }
        requestAnimationFrame(animate);
});