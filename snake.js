function init(){
    var canvas = document.getElementById('mycanvas');
    W = canvas.width =800; 
    H = canvas.height = 600;
    cs = 67;
    game_over = false;
    score = 0;
    
    // to make fruit
    food_img = new Image();
    food_img.src = "Assets/apple.png";
    
    //score
    trophy_img = new Image();
    trophy_img.src = "Assets/trophy.png";
    // to make screen working
    pen = canvas.getContext('2d');
    
    food = getRandomFood();
    //snake json
    snake = {
        init_len:5,
        color:"blue",
        cells:[],
        direction:"right",
        
        createSnake:function(){
            for(var i = this.init_len; i>=0;i--){
                this.cells.push({x:i,y:0});
            }
        },
        drawSnake:function(){
            for(var i=0;i<this.cells.length;i++){
                pen.fillStyle = this.color;
        pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
        }
        },
        updateSnake:function(){
            //snake and fruit collision
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            
            if(headX == food.x && headY == food.y){
                console.log("food eaten");
                food = getRandomFood();
                score ++;
            }
            else{
                this.cells.pop();
            }
            
            //pop head and add it to tail
            
            var nextX,nextY;
            
            if(this.direction=="right"){
                nextX = headX +1;
                nextY = headY;
            }
            else if(this.direction=="left"){
                nextX = headX - 1;
                nextY = headY;
            }
            else if(this.direction=="down"){
                nextX = headX ;
                nextY = headY + 1;
            }
            else if(this.direction=="up"){
                nextX = headX ;
                nextY = headY - 1;
            }
            
            
            this.cells.unshift({x:nextX,y:nextY});
            
            var last_x = Math.round(W/cs);
            var last_y = Math.round(H/cs);
            
            if(this.cells[0].y<0 || this.cells[0].x<0 || this.cells[0].x > last_x ||this.cells[0].y > last_y){
                game_over = true;
            }
        }
    
    };
    snake.createSnake();
    //add event listener
    function keyPressed(e){
        //console.log(e.key);
        // to check key
        if(e.key=="ArrowRight"){
            snake.direction = "right";
        }
        else if(e.key=="ArrowLeft"){
            snake.direction = "left";
        }
        else if(e.key=="ArrowUp"){
            snake.direction = "up";
        }
        else if(e.key=="ArrowDown"){
            snake.direction = "down";
        }
        
    }
    document.addEventListener('keydown',keyPressed);
    
}

function draw(){
    //earse old screen
    pen.clearRect(0,0,W,H);
    //draw snake
    snake.drawSnake();
    
    //draw fruit
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
    //draw rect test
    //pen.fillRect(food.x*cs,food.y*cs,cs,cs);
    pen.drawImage(trophy_img,18,20,cs,cs);
    pen.fillStyle = "black";
    pen.font = "25px Roboto";
    pen.fillText(score,50,50);
    
    
    
    
}

function update(){
    snake.updateSnake();
    
    
    
}
function getRandomFood(){
    var foodX = Math.round(Math.random()*(W - cs)/cs);
    var foodY = Math.round(Math.random()*(H - cs)/cs);
    var food = {
        x:foodX,
        y:foodY,
        color:"red",
    }
    return food;
}

function gameloop(){
    if(game_over == true){
       clearInterval(f);
        alert("Game over");
        
       }
    draw();
    update();
    
}

init();
var f =setInterval(gameloop,100);