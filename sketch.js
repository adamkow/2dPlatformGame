/*

The Game Project 6 - Side scrolling

*/
//declaring variables
var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var scrollPos;

var gameChar_world_x;

var isPlummeting;
var isFalling;
var withinCanyon;
var aboveCanyon;

var clouds;
var mountains;
var trees_x;
var collectable;
var t_canyon;
var isFound;

var game_score;
var lives;
var livesicon;
var enemy;
var flagpole;

var audio = new Audio('assets/theme.mp3'); //plays music
audio.play();

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;

	lives = 5;
	game_score = 0;
	
	livesicon = [ //life icons
		{x_pos: 70, y_pos: 16, size: 10},
		{x_pos: 90, y_pos: 16, size: 10},
		{x_pos: 110, y_pos: 16, size: 10},
		{x_pos: 130, y_pos: 16, size: 10}
	]


	collectable = [ //collectable positions
		{x_pos: 700, y_pos: 410, size: 50, isFound: false},
		{x_pos: 1000, y_pos: 410, size: 50, isFound: false},
		{x_pos: 2000, y_pos: 410, size: 50, isFound: false},
		{x_pos: 3000, y_pos: 410, size: 50, isFound: false},
		{x_pos: 4000, y_pos: 410, size: 50, isFound: false},
		{x_pos: 5000, y_pos: 410, size: 50, isFound: false}
	]
	startGame();
}

function drawClouds() //function to draw clouds
{	
	for(var i = 0; i < cloud.length; i++)
	{
		fill(255,255,255);
		ellipse(40+cloud[i].x_pos,cloud[i].y_pos,10+cloud[i].size,10+cloud[i].size);	
		ellipse(20+cloud[i].x_pos,cloud[i].y_pos,10+cloud[i].size,10+cloud[i].size);
		ellipse(cloud[i].x_pos,cloud[i].y_pos,cloud[i].size,cloud[i].size);
		ellipse(60+cloud[i].x_pos,cloud[i].y_pos,cloud[i].size,cloud[i].size);
		ellipse(40+cloud[i].x_pos,cloud[i].y_pos,10+cloud[i].size,10+cloud[i].size);
		ellipse(20+cloud[i].x_pos,cloud[i].y_pos,10+cloud[i].size,10+cloud[i].size);
		fill(255,255,255,100);
		ellipse(40+cloud[i].x_pos,cloud[i].y_pos,20+cloud[i].size,20+cloud[i].size);
		ellipse(20+cloud[i].x_pos,cloud[i].y_pos,0+cloud[i].size,20+cloud[i].size);
		ellipse(cloud[i].x_pos,cloud[i].y_pos,10+cloud[i].size,10+cloud[i].size);
		ellipse(60+cloud[i].x_pos,cloud[i].y_pos,10+cloud[i].size,10+cloud[i].size);
		ellipse(40+cloud[i].x_pos,cloud[i].y_pos,20+cloud[i].size,20+cloud[i].size);
		ellipse(20+cloud[i].x_pos,cloud[i].y_pos,+20+cloud[i].size,20+cloud[i].size);
	}
}

function drawTrees() //function to draw trees
{
	for(var i = 0; i < trees_x.length; i++)
	{
		fill('white');
		rect(trees_x[i],-100+floorPos_y,30,100);
		push();
		translate(165+trees_x[i],-40+floorPos_y)
		rotate(radians(180))
		fill(200,0,0)
		arc(150, 55, 180, 100, 0, PI);  
		pop();
	}
}

function drawMountains() //function to draw mountains
{
	for(var i = 0; i < mountain.length; i++)
	{

		fill('grey');
		triangle(mountain[i].x_pos,
			mountain[i].y_pos,
			200+mountain[i].x_pos,
			-200+mountain[i].y_pos,
			400+mountain[i].x_pos,
			mountain[i].y_pos)
		fill(0,0,0,60);
		triangle(50+mountain[i].x_pos,
			mountain[i].y_pos,
			200+mountain[i].x_pos,
			-200+mountain[i].y_pos,
			400+mountain[i].x_pos,
			mountain[i].y_pos)
	}
}

function drawCanyon(t_canyon) //function to draw canyon
	{	
		for(var i = 0; i < t_canyon.length; i++)
		{
			fill('red');
			rect(t_canyon[i].posX,t_canyon[i].posY,100,145);

			fill(100, 155, 255);

			fill(0,0,0,60); 
			rect(t_canyon[i].posX,60+t_canyon[i].posY,100,145);
			rect(t_canyon[i].posX,80+t_canyon[i].posY,100,145);
			rect(t_canyon[i].posX,100+t_canyon[i].posY,100,145);
			rect(t_canyon[i].posX,120+t_canyon[i].posY,100,145);
			//function to make game character fall
			if(gameChar_world_x > t_canyon[i].posX && gameChar_world_x < 100+ t_canyon[i].posX && gameChar_y == 432)
			{
				isPlummeting = true;
				gameChar_y += 195;	
				var audio = new Audio('assets/death.mp3'); //plays music
				audio.play();
			
							
			}
		
		}
	}

function drawScore()
{	
	pop(); 
	fill(255)
	text("Score: " + game_score, 12, 50)
	push();
}

function drawLives()
{	
	pop(); 
	fill(255)
	text("Lives:  " + lives, 12, 20)
	for(var i = 0; i < lives; i++)   //decrements lives
	{
		fill(255,0,0);
		ellipse(livesicon[i].x_pos,livesicon[i].y_pos,livesicon[i].size,livesicon[i].size);
		ellipse(livesicon[i].x_pos,livesicon[i].y_pos,livesicon[i].size,livesicon[i].size);
		ellipse(livesicon[i].x_pos,livesicon[i].y_pos,livesicon[i].size,livesicon[i].size);
		ellipse(livesicon[i].x_pos,livesicon[i].y_pos,livesicon[i].size,livesicon[i].size);		
	}
	push();
}

function renderFlagpole() 
{	
	fill(255)
	rect(x_pos,floorPos_y,10,-1000)
	if (isReached == true)		//if flagpole is reached changes flag to red
	{
		fill(random(255),random(255),random(255))
		rect(x_pos,floorPos_y,10,-1000)
	}

	if (isReached == false)		//if flagpole isn't reached remains white
	{
		fill(255)
		rect(x_pos,floorPos_y,10,-1000)
	}
}

function cheakFlagpole()
{
	
	if (gameChar_world_x > 4700)  //when character x pos more than 4700								
	{							//when character reaches the flagpole
		isReached = true;		//is reached value changed to true
	}

	else						//if flagpole isn't reached, remains false
	{
		isReached = false;
	}
	
}

function drawCollectable(t_collectable)  //function to draw colletable
{

	fill(255 ,215 ,  0);
	ellipse(t_collectable.x_pos,t_collectable.y_pos,t_collectable.size,t_collectable.size);

}

function cheakcollectable(t_collectable)
{
	var distance = dist(gameChar_world_x, gameChar_y , t_collectable.x_pos, t_collectable.y_pos);
	if(distance <= 30)
	{
		t_collectable.isFound = true;		
		game_score += 1; 
		var audio = new Audio('assets/item.mp3'); //plays music
		audio.play();
		
	}	
}

function drawenemy()
{	
	for (var i = 0; i < enemy.length; i++)
	{
		fill(255, 165, 0)
		ellipse(enemy[i].x_pos,enemy[i].y_pos,60,100)	
		fill(128,128 ,128)
		ellipse(enemy[i].x_pos,20+enemy[i].y_pos,60,60)	
	
		enemy[i].y_pos +=2;
			
		if (enemy[i].y_pos == 630)
		{
			enemy[i].y_pos = -100;
		}

		var distance = dist(gameChar_world_x, gameChar_y , enemy[i].x_pos, enemy[i].y_pos);
		if(distance <= 80) //if enemy touched life lost
		{
			var audio = new Audio('assets/item.mp3'); //plays music
			audio.play();
			startGame(); 		
		}			
	}
}

function startGame()
{	

	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	isFalling = false;
	isPlummeting = false;
	flagpole = [x_pos = 4700, isReached = false];

	aboveCanyon = false;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	
	// Variable to control the background scrolling.
	scrollPos = 0;

	// Initialise arrays of scenery objects.

	trees_x = [ //mushroom positions
		random(5000),
		random(5000),
		random(5000),
		random(5000),
		random(5000),
		random(5000),
		random(5000),
		random(5000),
		random(5000),
		random(5000),
		random(5000),
		random(5000),
		random(5000),
		random(5000),
		random(5000),
		random(5000),
		random(5000),
		random(5000),
		random(5000)
	];

	t_canyon = [ //canyon positions
		{posX: 800, posY: 432,withinCanyon: false},
		{posX: 1900, posY: 432,withinCanyon: false},
		{posX: 2000, posY: 432,withinCanyon: false},
		{posX: 2400, posY: 432,withinCanyon: false},
		{posX: 1400, posY: 432,withinCanyon: false},
		{posX: 2670, posY: 432,withinCanyon: false},
		{posX: 3450, posY: 432,withinCanyon: false},
		{posX: 2300, posY: 432,withinCanyon: false},
		{posX: 3700, posY: 432,withinCanyon: false},
		{posX: 3900, posY: 432,withinCanyon: false},
		{posX: 4300, posY: 432,withinCanyon: false},
		{posX: 4500, posY: 432,withinCanyon: false}
		
	]
	
	cloud = [ //cloud positions
		{x_pos: random(5000), y_pos: 100, size: 50},
		{x_pos: random(5000), y_pos: 120, size: 50},
		{x_pos: random(5000), y_pos: 160, size: 50},
		{x_pos: random(5000), y_pos: 130, size: 50},
		{x_pos: random(5000), y_pos: 150, size: 50},
		{x_pos: random(5000), y_pos: 120, size: 50},
		{x_pos: random(5000), y_pos: 110, size: 50},
		{x_pos: random(5000), y_pos: 160, size: 50},
		{x_pos: random(5000), y_pos: 150, size: 50},
		{x_pos: random(5000), y_pos: 150, size: 50},
		{x_pos: random(5000), y_pos: 150, size: 50},
		{x_pos: random(5000), y_pos: 150, size: 50},
		{x_pos: random(5000), y_pos: 150, size: 50},
		{x_pos: random(5000), y_pos: 150, size: 50},
		{x_pos: random(5000), y_pos: 150, size: 50},
		{x_pos: random(5000), y_pos: 150, size: 50},
		{x_pos: random(5000), y_pos: 150, size: 50},
		{x_pos: random(5000), y_pos: 150, size: 50},
		{x_pos: random(5000), y_pos: 150, size: 50},
		{x_pos: random(5000), y_pos: 150, size: 50},
		{x_pos: random(5000), y_pos: 150, size: 50},
		{x_pos: random(5000), y_pos: 150, size: 50},
		{x_pos: random(5000), y_pos: 150, size: 50},
		{x_pos: random(5000), y_pos: 150, size: 50},
		{x_pos: random(5000), y_pos: 140, size: 50}
	]

	mountain = [ //mountain positions
		{x_pos: random(5000), y_pos: 432},
		{x_pos: random(5000), y_pos: 432},
		{x_pos: random(5000), y_pos: 432},
		{x_pos: random(5000), y_pos: 432},
		{x_pos: random(5000), y_pos: 432},
		{x_pos: random(5000), y_pos: 432},
		{x_pos: random(5000), y_pos: 432},
		{x_pos: random(5000), y_pos: 432},
		{x_pos: random(5000), y_pos: 432},
		{x_pos: random(5000), y_pos: 432},
		{x_pos: random(5000), y_pos: 432},
		{x_pos: random(5000), y_pos: 432},
		{x_pos: random(5000), y_pos: 432}
	]

	enemy = [
		{x_pos: 851, y_pos: 400},
		{x_pos: 1451, y_pos: 300},
		{x_pos: 1951, y_pos: 200},
		{x_pos: 2051, y_pos: 600},
		{x_pos: 2351, y_pos: 600},
		{x_pos: 2451, y_pos: 600},
		// {x_pos: 2501, y_pos: 600},
		{x_pos: 2721, y_pos: 500}
	]

	lives -= 1;

}

function draw()
{
		// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
	background('purple'); // fill the sky blue

	noStroke();
	fill('pink');
	rect(0, floorPos_y, width, height/4); // draw some green ground

	push(); //function to achieve scrolling effect
	translate(scrollPos, 0);

	drawClouds();   //calling draw functions
	drawMountains();
	drawTrees();
	
	for (var i = 0; i < collectable.length; i++)
	{
		if(!collectable[i].isFound)
		{
			drawCollectable(collectable[i]);
			cheakcollectable(collectable[i]);
		}
	}

	drawCollectable(collectable);

	drawCanyon(t_canyon);
	drawenemy();
	renderFlagpole();
	cheakFlagpole();
	drawScore();
	drawLives();
	// renderFlagpole();
	// cheakFlagpole();
	// drawenemy();
	pop(); 

	if(lives < 1) //when lives are less than 1 displays text
	{
		pop(); 
		background(0,0,0,50)
		fill(255)
		text("Game over. Press space to continue", 420, height/2)
		push();		
		return
	}

	if(isReached == true) //when flagpole is reached displays text
	{
		pop(); 
		background(0,0,0,50)
		fill(255)
		text("Level complete. Press space to continue", 420, height/2)
		push();
		return
	}

	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}

	if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5; // negative for moving against the background
		}
	}

	if(isLeft && isFalling)
	{
		// add your jumping-left code

		//tail
		fill("white")
		stroke(0)
		ellipse(gameChar_x+10, gameChar_y-10,18,18)

		//left leg
		fill(255);
		stroke(0);
		push();
		translate(gameChar_x, gameChar_y-31);
		rotate(radians(40));
		ellipse(13,25,7,13)
		pop();

		//right arms
		fill(255);
		stroke(0);
		push();
		translate(gameChar_x-13, gameChar_y-19);
		rotate(radians(130));
		ellipse(0,0,7,16)
		pop();

		//body
		stroke(0);
		fill("white")
		ellipse(gameChar_x, gameChar_y-15, 25, 25)  
		//ears
		push();
		translate(gameChar_x-10, gameChar_y-55);
		rotate(radians(170));
		ellipse(0,0, 10, 30) 
		fill("pink")
		noStroke()
		ellipse(0, 0, 5, 20) 
		pop();

		stroke(0)
		fill("white")
		push();
		translate(gameChar_x+9, gameChar_y-55);
		rotate(radians(190));
		ellipse(0, 0, 10, 30) 
		fill("pink")
		noStroke()
		ellipse(0, 0, 5, 20)
		pop(); 

		//head
		stroke(0)
		fill("white")
		ellipse(gameChar_x, gameChar_y-35, 30, 30) 
		
		//blush
		noStroke()
		fill("pink")
		ellipse(gameChar_x-13, gameChar_y-31, 8, 8) 
		ellipse(gameChar_x+3, gameChar_y-31, 8, 8) 

		//eyes
		noStroke()
		fill("black")
		ellipse(gameChar_x-12, gameChar_y-35, 4, 4) 
		ellipse(gameChar_x, gameChar_y-35, 4, 4) 


		//left arm
		fill(255);
		stroke(0);
		push();
		translate(gameChar_x+10, gameChar_y-14);
		rotate(radians(310));
		ellipse(0,0,7,13)
		pop();

		//right leg
		fill(255);
		stroke(0);
		push();
		translate(gameChar_x-18, gameChar_y-14);
		rotate(radians(320));
		ellipse(13,25,7,13)
		pop();	

		//mouth
		stroke(0)
		line(gameChar_x-6,gameChar_y-31,gameChar_x-6,gameChar_y-33);
		line(gameChar_x-8,gameChar_y-30,gameChar_x-6,gameChar_y-31);
		line(gameChar_x-4,gameChar_y-30,gameChar_x-6,gameChar_y-31);

	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code

		//tail
		fill("white")
		stroke(0)
		ellipse(gameChar_x-10, gameChar_y-10,18,18)

		//right arms
		fill(255);
		stroke(0);
		push();
		translate(gameChar_x-6, gameChar_y-10);
		rotate(radians(230));
		ellipse(-5,20,7,16)
		pop();
		
		//right leg
		fill(255);
		stroke(0);
		push();
		translate(gameChar_x-18, gameChar_y-14);
		rotate(radians(320));
		ellipse(13,25,7,13)
		pop();

		//body
		stroke(0);
		fill("white")
		ellipse(gameChar_x, gameChar_y-15, 25, 25)  
		//ears
		push();
		translate(gameChar_x-10, gameChar_y-55);
		rotate(radians(170));
		ellipse(0,0, 10, 30) 
		fill("pink")
		noStroke()
		ellipse(0, 0, 5, 20) 
		pop();

		stroke(0)
		fill("white")
		push();
		translate(gameChar_x+9, gameChar_y-55);
		rotate(radians(190));
		ellipse(0, 0, 10, 30) 
		fill("pink")
		noStroke()
		ellipse(0, 0, 5, 20)
		pop(); 
		//head
		stroke(0)
		fill("white")
		ellipse(gameChar_x, gameChar_y-35, 30, 30) 
		
		//blush
		noStroke()
		fill("pink")
		ellipse(gameChar_x+13, gameChar_y-31, 8, 8) 
		ellipse(gameChar_x-3, gameChar_y-31, 8, 8) 

		//eyes
		noStroke()
		fill("black")
		ellipse(gameChar_x+12, gameChar_y-35, 4, 4) 
		ellipse(gameChar_x, gameChar_y-35, 4, 4) 

		//right arms
		fill(255);
		stroke(0);
		push();
		translate(gameChar_x, gameChar_y-32);
		rotate(radians(50));
		ellipse(7,20,7,13)
		pop();

		//left leg
		fill(255);
		stroke(0);
		push();
		translate(gameChar_x, gameChar_y-31);
		rotate(radians(40));
		ellipse(13,25,7,13)
		pop();

		//mouth
		stroke(0)
		line(gameChar_x+7,gameChar_y-31,gameChar_x+7,gameChar_y-33);
		line(gameChar_x+9,gameChar_y-30,gameChar_x+7,gameChar_y-31);
		line(gameChar_x+5,gameChar_y-30,gameChar_x+7,gameChar_y-31);

	}
	else if(isLeft)
	{
		// add your walking left code
		//tail
		fill("white")
		stroke(0)
		ellipse(gameChar_x+10, gameChar_y-10,18,18)

		//left leg
		fill(255);
		stroke(0);
		push();
		translate(gameChar_x, gameChar_y-31);
		rotate(radians(40));
		ellipse(13,25,7,13)
		pop();

		//right arms
		fill(255);
		stroke(0);
		push();
		translate(gameChar_x, gameChar_y-32);
		rotate(radians(50));
		ellipse(5,20,7,13)
		pop();

		//body
		stroke(0);
		fill("white")
		ellipse(gameChar_x, gameChar_y-15, 25, 25)  

		//ears
		push();
		translate(gameChar_x-10, gameChar_y-55);
		rotate(radians(170));
		ellipse(0,0, 10, 30) 
		fill("pink")
		noStroke()
		ellipse(0, 0, 5, 20) 
		pop();

		stroke(0)
		fill("white")
		push();
		translate(gameChar_x+9, gameChar_y-55);
		rotate(radians(190));
		ellipse(0, 0, 10, 30) 
		fill("pink")
		noStroke()
		ellipse(0, 0, 5, 20)
		pop(); 

		//head
		stroke(0)
		fill("white")
		ellipse(gameChar_x, gameChar_y-35, 30, 30) 
		
		//blush
		noStroke()
		fill("pink")
		ellipse(gameChar_x-13, gameChar_y-31, 8, 8) 
		ellipse(gameChar_x+3, gameChar_y-31, 8, 8) 

		//eyes
		noStroke()
		fill("black")
		ellipse(gameChar_x-12, gameChar_y-35, 4, 4) 
		ellipse(gameChar_x, gameChar_y-35, 4, 4) 


		//left arm
		fill(255);
		stroke(0);
		push();
		translate(gameChar_x+10, gameChar_y-14);
		rotate(radians(310));
		ellipse(0,0,7,13)
		pop();

		//right leg
		fill(255);
		stroke(0);
		push();
		translate(gameChar_x-18, gameChar_y-14);
		rotate(radians(320));
		ellipse(13,25,7,13)
		pop();

		//mouth
		stroke(0)
		line(gameChar_x-6,gameChar_y-31,gameChar_x-6,gameChar_y-33);
		line(gameChar_x-8,gameChar_y-30,gameChar_x-6,gameChar_y-31);
		line(gameChar_x-4,gameChar_y-30,gameChar_x-6,gameChar_y-31);

	}
	else if(isRight)
	{
		// add your walking right code
		//tail
		fill("white")
		stroke(0)
		ellipse(gameChar_x-10, gameChar_y-10,18,18)
		//right arms
		fill(255);
		stroke(0);
		push();
		translate(gameChar_x, gameChar_y-32);
		rotate(radians(310));
		ellipse(-5,20,7,13)
		pop();
		
		//right leg
		fill(255);
		stroke(0);
		push();
		translate(gameChar_x-18, gameChar_y-14);
		rotate(radians(320));
		ellipse(13,25,7,13)
		pop();

		//body
		stroke(0);
		fill("white")
		ellipse(gameChar_x, gameChar_y-15, 25, 25)  
		//ears
		push();
		translate(gameChar_x-10, gameChar_y-55);
		rotate(radians(170));
		ellipse(0,0, 10, 30) 
		fill("pink")
		noStroke()
		ellipse(0, 0, 5, 20) 
		pop();

		stroke(0)
		fill("white")
		push();
		translate(gameChar_x+9, gameChar_y-55);
		rotate(radians(190));
		ellipse(0, 0, 10, 30) 
		fill("pink")
		noStroke()
		ellipse(0, 0, 5, 20)
		pop(); 
		//head
		stroke(0)
		fill("white")
		ellipse(gameChar_x, gameChar_y-35, 30, 30) 
		
		//blush
		noStroke()
		fill("pink")
		ellipse(gameChar_x+13, gameChar_y-31, 8, 8) 
		ellipse(gameChar_x-3, gameChar_y-31, 8, 8) 

		//eyes
		noStroke()
		fill("black")
		ellipse(gameChar_x+12, gameChar_y-35, 4, 4) 
		ellipse(gameChar_x, gameChar_y-35, 4, 4) 

		//right arms
		fill(255);
		stroke(0);
		push();
		translate(gameChar_x, gameChar_y-32);
		rotate(radians(50));
		ellipse(7,20,7,13)
		pop();

		//left leg
		fill(255);
		stroke(0);
		push();
		translate(gameChar_x, gameChar_y-31);
		rotate(radians(40));
		ellipse(13,25,7,13)
		pop();

		//mouth
		stroke(0)
		line(gameChar_x+7,gameChar_y-31,gameChar_x+7,gameChar_y-33);
		line(gameChar_x+9,gameChar_y-30,gameChar_x+7,gameChar_y-31);
		line(gameChar_x+5,gameChar_y-30,gameChar_x+7,gameChar_y-31);

	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
		//left leg
		fill(255);
		stroke(0);
		push();
		translate(gameChar_x-6, gameChar_y-4);
		rotate(radians(30));
		ellipse(0,0,7,13)
		pop();

		//right leg
		fill(255);
		stroke(0);
		push();
		translate(gameChar_x+6, gameChar_y-4);
		rotate(radians(325));
		ellipse(0,0,7,13)
		pop();

		//right arm
		fill(255);
		stroke(0);
		push();
		translate(gameChar_x+12, gameChar_y-16);
		rotate(radians(240));
		ellipse(0,0,7,13)
		pop();

		//left arm
		fill(255);
		stroke(0);
		push();
		translate(gameChar_x-12, gameChar_y-16);
		rotate(radians(120));
		ellipse(0,0,7,13)
		pop();	

		stroke(0);
		fill("white")
		//body
		ellipse(gameChar_x, gameChar_y-14, 25, 25)  
		//ears
		push();
		translate(gameChar_x-10, gameChar_y-55);
		rotate(radians(170));
		ellipse(0,0, 10, 30) 
		fill("pink")
		noStroke()
		ellipse(0, 0, 5, 20) 
		pop();

		stroke(0)
		fill("white")
		push();
		translate(gameChar_x+9, gameChar_y-55);
		rotate(radians(190));
		ellipse(0, 0, 10, 30) 
		fill("pink")
		noStroke()
		ellipse(0, 0, 5, 20)
		pop(); 
		//head
		stroke(0)
		fill("white")
		ellipse(gameChar_x, gameChar_y-34, 35, 30) 

		//blush
		noStroke()
		fill("pink")
		ellipse(gameChar_x-9, gameChar_y-30, 8, 8) 
		ellipse(gameChar_x+9, gameChar_y-30, 8, 8)

		//eyes
		noStroke()
		fill("black")
		ellipse(gameChar_x-6, gameChar_y-34, 4, 4) 
		ellipse(gameChar_x+6, gameChar_y-34, 4, 4) 

		//mouth
		stroke(0)
		line(gameChar_x,gameChar_y-31,gameChar_x,gameChar_y-33);
		line(gameChar_x-2,gameChar_y-30,gameChar_x,gameChar_y-31);
		line(gameChar_x+2,gameChar_y-30,gameChar_x,gameChar_y-31);
	}

	else
	{
		// add your standing front facing code
		//left leg
		fill(255);
		stroke(0);
		push();
		translate(gameChar_x-5, gameChar_y-4);
		rotate(radians(10));
		ellipse(0,0,7,13)
		pop();

		//right leg
		fill(255);
		stroke(0);
		push();
		translate(gameChar_x+5, gameChar_y-4);
		rotate(radians(350));
		ellipse(0,0,7,13)
		pop();

		//right arm
		fill(255);
		stroke(0);
		push();
		translate(gameChar_x+12, gameChar_y-15);
		rotate(radians(320));
		ellipse(0,0,7,13)
		pop();

		//left arm
		fill(255);
		stroke(0);
		push();
		translate(gameChar_x-12, gameChar_y-15);
		rotate(radians(40));
		ellipse(0,0,7,13)
		pop();

		stroke(0);
		fill("white")
		//body
		ellipse(gameChar_x, gameChar_y-15, 25, 25)  

		//ears
		push();
		translate(gameChar_x-10, gameChar_y-55);
		rotate(radians(170));
		ellipse(0,0, 10, 30) 
		fill("pink")
		noStroke()
		ellipse(0, 0, 5, 20) 
		pop();

		stroke(0)
		fill("white")
		push();
		translate(gameChar_x+9, gameChar_y-55);
		rotate(radians(190));
		ellipse(0, 0, 10, 30) 
		fill("pink")
		noStroke()
		ellipse(0, 0, 5, 20)
		pop(); 

		//head
		stroke(0)
		fill("white")
		ellipse(gameChar_x, gameChar_y-35, 35, 30) 

		//blush
		noStroke()
		fill("pink")
		ellipse(gameChar_x-9, gameChar_y-31, 8, 8) 
		ellipse(gameChar_x+9, gameChar_y-31, 8, 8) 

		//eyes
		noStroke()
		fill("black")
		ellipse(gameChar_x-6, gameChar_y-35, 4, 4) 
		ellipse(gameChar_x+6, gameChar_y-35, 4, 4)  
		
		//mouth
		stroke(0)
		line(gameChar_x,gameChar_y-31,gameChar_x,gameChar_y-33);
		line(gameChar_x-2,gameChar_y-30,gameChar_x,gameChar_y-31);
		line(gameChar_x+2,gameChar_y-30,gameChar_x,gameChar_y-31);
	}

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
	

	if(isLeft){
        gameChar_x -= 0.3;
    }

    if(isRight){
        gameChar_x += 0.3;
    }

	if (gameChar_y < floorPos_y){
		gameChar_y += 2;
		isFalling = true;

	}

	else{
		isFalling = false;
	}

	if(gameChar_y > 432 && lives > 0)
	{	
		pop(); 
		background(0,0,0,50)
		fill(255)
		text("minus life", 450, height/2)
		push();
		startGame();
	}		

}

function keyPressed() //movement keys
{

	if(key == 'A' || keyCode == 37)
	{
		isLeft = true;
	}

	if(key == 'D' || keyCode == 39)
	{
		isRight = true;
	}

	if (keyCode == 87 && gameChar_y == floorPos_y){
		gameChar_y -= 100
		// isFalling = true;
	
	}

}

function keyReleased() //stop movement in direction when released
{
	if(key == 'A' || keyCode == 37)
	{
		isLeft = false;
	}

	if(key == 'D' || keyCode == 39)
	{
		isRight = false;
	}
	
}