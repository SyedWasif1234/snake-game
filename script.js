//NOTE : In JS  orogin starts from top left corner so when i have to move my snake up i have to subtract y-axis

const body = document.querySelector('body')
const  board = document.querySelector('#board')
let direction = { x: 0 , y: 0}
const foodSound = new Audio("food.mp3" )
const moveSound = new Audio("move.mp3")
const music = new Audio("music.mp3")
const gameOverSound = new Audio("gameover.mp3")
let lastPainttime = 0;
let speed = 6;

//snake me uska head aayga
let snakeArr = [   {x:15, y:8}    ]
let food = {x:8 , y:12}
let SnakeElement ;
let FoodElement;

let point = 0
let score = document.createElement('div')
score.innerHTML = "Score : 0"
score.classList.add('scoreBox')
body.appendChild(score)

let HighScore = document.createElement('div')
HighScore.innerHTML= `HighScore :`
HighScore.classList.add('hiscoreBox')
body.appendChild(HighScore)

let max=point;
function maxScore (Point){
    console.log("point inside maxscore funtion",Point);
    if(Point > max){
        HighScore.innerHTML = `HighScore :${Point }`
        max= Point 
        console.log("value of max inside function:",max);
    }
    else {
        HighScore.innerHTML = `HighScore :${max}`
    }
}





function Game_Function (current_time ){
    window.requestAnimationFrame(Game_Function)
    if((current_time - lastPainttime)/1000 < 1/speed){
        return;
    }
    lastPainttime = current_time;
    GameEngine();
}


function CreatingSnake_Head(){
    board.innerHTML = " ";
    snakeArr.forEach((e,index)=>{
        SnakeElement = document.createElement('div')
        SnakeElement.style.gridRowStart = e.y;
        SnakeElement.style.gridColumnStart = e.x;
        if(index=== 0){
            SnakeElement.classList.add('head')
        }
        else {
            SnakeElement.classList.add('snake')
        }
        board.appendChild(SnakeElement)
        
    });
}

function Creating_Snake_Food(){
     //for food
     FoodElement = document.createElement('div')
     FoodElement.style.gridRowStart = food.y;
     FoodElement.style.gridColumnStart = food.x;
     FoodElement.classList.add('food')
     board.appendChild(FoodElement)
}


function isCollide(snake){
    for(let i=1 ; i<snakeArr.length ; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x >19 || snake[0].x <0 || snake[0].y > 19 || snake[0].y < 0 ){
        return true;
    }
    return false;
}

function isSnakeEatFood(){
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        snakeArr.unshift({
            x: snakeArr[0].x + direction.x , y: snakeArr[0].y + direction.y
        });
        return true;
    }
    return false;
}


function MovingSnake(){
    for(let i= snakeArr.length -2 ; i>=0 ; i--){
        snakeArr[i+1] =  {...snakeArr[i]}
    }
    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;
}



function GameEngine(){

    CreatingSnake_Head()
    Creating_Snake_Food()

//when snake eats the food means coordinates food(x,y) = head(x,y)

   if(isSnakeEatFood()){
    let a=2;
    let b=16;
    // now again i food must come in some random position
    foodSound.play();
    food = {x:Math.floor(Math.random()*(b-a +1)) + a  , y: Math.floor(Math.random()*(b-a +1)) + a } ;   
    score.innerHTML =`Score:${point +1}`
    point++;
   }
    
   
    //MOVING SNAKE
    MovingSnake()

    //IF COLLIDES 
    if(isCollide(snakeArr)){
        
        maxScore(point)

        gameOverSound.play();
        music.pause();
        direction = { x: 0 , y: 0};
        alert("snake collided restart the game");
        score.innerHTML = `Score : 0`
        point = 0
        snakeArr = [   {x:15, y:8}    ];
        food = {x:8 , y:12};
        music.play();
    
    }
}


 window.requestAnimationFrame(Game_Function)
window.addEventListener('keydown',(e)=>{
    
    music.play()
    direction = {x:0 , y:1}
    moveSound.play();
    switch (e.key) {
        case 'ArrowUp':
            console.log("ArrowUp");
            direction.x=0;
            direction.y=-1;
            break;

        case 'ArrowDown':
                console.log("ArrowDown");
                direction.x=0;
                direction.y=1;
                break;

        case 'ArrowRight':
                    console.log("ArrowRight");
                    direction.x=1;
                    direction.y=0;
                    break;  
        
        case 'ArrowLeft':
                        console.log("ArrowLeft");
                        direction.x=-1;
                        direction.y=0;
                        break;            
        default:
            break;
    }
});
