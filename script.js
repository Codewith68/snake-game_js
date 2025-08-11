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
   

    let dx= cellsize; // Horizontal movement
     let dy= 0; // Vertical movement
     let intervalid;
     let gamespeed = 200; // Speed of the game loop in milliseconds





     function generateFoodPosition() {
          // Generate a random position for the food
          let newX;
          let newY;
          do {
               newX = Math.floor(Math.random() * (arenasize / cellsize)) * cellsize;
               newY = Math.floor(Math.random() * (arenasize / cellsize)) * cellsize;
          } while (snake.some(segment => segment.x === newX && segment.y === newY)); 
          // Ensure food doesn't spawn on the snake
          food = { x: newX, y: newY }; // Update food position
     }


     function updatesnake(){
     // Update the snake's position
     const newhead = { x: snake[0].x + dx, y: snake[0].y + dy };
     snake.unshift(newhead); // Add new head to the front of the snake


     // Check if the snake has eaten the food
     if (newhead.x === food.x && newhead.y === food.y) {
          score += 10; // Increase score
          generateFoodPosition(); // Generate new food position

          if(gamespeed >50){
               clearInterval(intervalid); // Clear the previous interval
                gamespeed -= 10; // Increase game speed
               Gameloop(); // Restart the game loop with the new speed
          }

     } else {
          snake.pop(); // Remove the last segment of the snake

     }
}



    function changedirection(event) {
    console.log("key pressed:",event.key);

    const isgoinngUp = dy === -cellsize;
     const isgoinngDown = dy === cellsize;
     const isgoinngLeft = dx === -cellsize;
     const isgoinngRight = dx === cellsize;
     // Prevent the snake from moving in the opposite direction
     if (event.key === 'ArrowUp' && !isgoinngDown) {
          dx = 0;
          dy = -cellsize; // Move up
     } else if (event.key === 'ArrowDown' &&  !isgoinngUp) {
          dx = 0;
          dy = cellsize; // Move down
     } else if (event.key === 'ArrowLeft' && !isgoinngRight) {
          dx = -cellsize; // Move left
          dy = 0;
     } else if (event.key === 'ArrowRight' && !isgoinngLeft) {
          dx = cellsize; // Move right
          dy = 0;
     }
}

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
     // Draw the snake segments
     
     const foodElement = Drawdiv(food.x, food.y, 'food');
     gamearena.appendChild(foodElement);

    }

     function isGameover(){
          // Check for self-collision
          for (let i = 1; i < snake.length; i++) {
               if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
                    return true; // Game over
               }
          }

       

          // wall collision checks 
          const leftWall = snake[0].x < 0; // snake[0] -> head 
          const rightWall = snake[0].x >= arenasize-cellsize; // right wall
          const topWall = snake[0].y < 0;
          const bottomWall = snake[0].y >= arenasize-cellsize; // bottom wall
          return leftWall || rightWall || topWall || bottomWall; // Return true if any wall collision occurs

     }

    function Gameloop(){
           intervalid = setInterval(() => {
               if (isGameover()) {
                    clearInterval(intervalid); // Stop the game loop
                    alert(`Game Over! Your score is ${score}`);
                    gamestarted = false; // Reset game state
                    return;
               }
                updatesnake(); // Update the snake's position
                drawfoodandSnake(); // Draw the snake and food
                drawscoreboard(); // Update the scoreboard
         },gamespeed);
     }

    function rungame(){
     if(!gamestarted){
          gamestarted =true;
          document.addEventListener('keydown', changedirection); 
          Gameloop(); // Start the game loop
     }

    }


    function drawscoreboard() {
        const scoreboard = document.getElementById('score-board');
        if (scoreboard) {
            scoreboard.textContent = `Score: ${score}`;
        } else {
            const newScoreboard = document.createElement('div');
            newScoreboard.id = 'score-board';
            newScoreboard.textContent = `Score: ${score}`;
            document.body.insertBefore(newScoreboard, gamearena);
        }
    }





     // Initialize the game arena
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
