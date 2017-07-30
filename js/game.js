let canvas = document.createElement("canvas");
let ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

let bgReady = false;
let bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};

bgImage.src = 'images/background.png';

let heroReady = false;
let heroImage = new Image();
heroImage.onload = function() {
  heroReady = true;
};

heroImage.src = 'images/hero.png';

let monsterReady = false;
let monsterImage = new Image();
monsterImage.onload = function() {
  monsterReady = true;
};

monsterImage.src = 'images/monster.png';

let keysDown = {};

addEventListener('keydown',(e)=>{
  keysDown[e.keyCode] = true;
}, false);

addEventListener('keyup', (e)=>{
  delete keysDown[e.keyCode];
}, false);

let hero = {speed: 256};
let monster = {};

let reset = () => {
  hero.x = canvas.width/2;
  hero.y = canvas.height/2;

  monster.x = 32 + (Math.random()*(canvas.width - 64));
  monster.y = 32 + (Math.random() * (canvas.height - 64));
};

let monstersCaught = 0;

let update = (modifier) => { //time based limit according to how often this function is called, making sure that hero moves as same speed regardless of how fast or slow script is running
  // console.log(keysDown);
  if ( 38 in keysDown) { //player holding up
    hero.y -= hero.speed * modifier;
  }

  if(40 in keysDown) { //player holding down
    hero.y += hero.speed * modifier;
  }

  if(37 in keysDown) { //playing holding left
    hero.x -= hero.speed * modifier;
  }

  if(39 in keysDown) { //player holding right
    hero.x += hero.speed * modifier;
  }

  //hero caught monster?
  if (
    hero.x <= (monster.x+32)
    && monster.x <= (hero.x + 32)
    && hero.y <= (monster.y + 32)
    && monster.y <= (hero.y + 32)
  ) {
    ++monstersCaught;
    reset();
  }
};

let render = () => {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }

  if (heroReady) {
    ctx.drawImage(heroImage,hero.x,hero.y);
  }

  if(monsterReady) {
    ctx.drawImage(monsterImage, monster.x, monster.y);
  }

  ctx.fillStyle = 'rgb(250,250,250)';
  ctx.font = '24px Helvetica';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('Monsters caught: ' + monstersCaught, 32,32);
};

let w = window;
let requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
//main game loop
let main = () => {
  let now = Date.now();
  let delta = now-then;
  update(delta/1000);
  render();
  then = now;
  requestAnimationFrame(main);
};

let then = Date.now();
reset();
main();
