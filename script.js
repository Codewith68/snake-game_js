document.addEventListener('DOMContentLoaded', function () {
    const gamearena = document.getElementById('game-arena');
    const arenasize = 600;
    const cellsize = 20;
    let score = 0;
    let gamestarted = false; // Correct spelling
    let food = { x: 300, y: 200 }; // Initial food position 
    let snake = [
        { x: 160, y: 200 },
        { x: 140, y: 200 },
        { x: 120, y: 200 }
    ]; //[head, body1, body2,tail]


    function Drawdiv(x, y, className) {
        const divElement = document.createElement('div');
        divElement.classList.add(className);
        divElement.style.top = `${y}px`;
        divElement.style.left = `${x}px`;
        return divElement;
    }




    function drawfoodandSnake(){
     gamearena.innerHTML = ''; // Clear the game arena
     // wipeout everything and redraw the position of food and snake



     snake.forEach(segment => {
         const snakeElement = Drawdiv(segment.x, segment.y, 'snake');
           gamearena.appendChild(snakeElement);
     });





     const foodElement = Drawdiv(food.x, food.y, 'food');
     gamearena.appendChild(foodElement);

    }

    function rungame(){
     if(!gamestarted){
          gamestarted =true;
          drawfoodandSnake();

          Gameloop(); // Start the game loop
     }

    }

    function initiateGame() {
        const scoreboard = document.createElement('div');
        scoreboard.id = 'score-board';
        scoreboard.textContent = `Score: ${score}`;
        document.body.insertBefore(scoreboard, gamearena);

        const startButton = document.createElement('button');
        startButton.textContent = 'Start Game';
        startButton.classList.add('start-button');


        startButton.addEventListener('click', function () {
            startButton.style.display = 'none';

               rungame();
            });

        document.body.appendChild(startButton);
    }

    initiateGame();
});
