let canvas;
let ctx;
let particles = [];


function Particle(_x, _y, _vx, _vy,_color,_num){
    this.x = _x;
    this.y = _y;
    this.vx = _vx;
    this.vy = _vy;
    this.color = _color;
    this.num = _num;
}

function main(){
    canvas = document.getElementById("canvas");
    canvas.width = $(window).get(0).innerWidth;
    canvas.height = $(window).get(0).innerHeight;
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    init();
    setInterval(loop,1000/30);
}

$(window).resize(resizeCanvas);
function resizeCanvas() {
    canvas.width = $(window).get(0).innerWidth;
    canvas.height = $(window).get(0).innerHeight;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

};

function init(){
    const a = Math.random()*3.14/2; //velocity
    const r = Math.random()*20; // radius
    const vx = Math.cos(a)*r / 4; //velocity of x
    const vy = Math.sin(a)*r / 4; //velocity of y
    let newColor = 0;
    let myRandom = 0;
    // random a color
    while(newColor < 240){
        myRandom = Math.floor(Math.random() * 0xffffff);
        let red = myRandom >> 16;
        let green = (myRandom >> 8) & 0xff;
        let blue = myRandom & 0xff;
        newColor = Math.sqrt(red * red + green * green + blue * blue);
    }
    const p = new Particle(50,50,vx,vy,"#"+myRandom.toString(16),1);
    particles.push(p);
}

function myClick(){
    const x = event.clientX;
    const y = event.clientY;
    for(let i = 0; i < particles.length; i++){
        let p = particles[i];
        let mx = x - p.x;
        let my = y - p.y;
        if(mx >= 0 && mx <= 50 && my >= 0 && my <= 50 ){
            let tot = p.vx * p.vx + p.vy * p.vy + Math.floor(Math.random() * 4);
            let nvx = (2 * ((tot | 0)% 2) - 1) * Math.sqrt(Math.floor(Math.random() * tot))
            let nvy = (2 * (((Math.random() * tot)| 0)% 2) - 1) * Math.sqrt(tot - nvx * nvx);
            let np = 0;
            if(p.num * 2 > 1000){
                np = new Particle(x,y,nvx,nvy,"green",(p.num/3.1415926|0));
            }else{
                np = new Particle(x,y,nvx,nvy,"pink",p.num*2);
            }
            particles.push(np);
            break;
        }
    }
}

function clean(){
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function render(){
    clean();
    for(let i = 0; i < particles.length ; i++){
        const p = particles[i];
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x,p.y,50,50);
        ctx.fillStyle = "Black";
        ctx.fillText(p.num,p.x+10,p.y+32)
        ctx.font="20px Verdana";
        ctx.fill();
    }
}

function update(){
    let i = particles.length;
    while(i--){
        const p = particles[i];
        if(p.x < 0){
            p.x = 0;
            p.vx *= -1;
        }
        if(p.x > canvas.width-50){
            p.x = canvas.width-50;
            p.vx *= -1;
        }
        if(p.y < 0){
            p.y = 0
            p.vy *= -1;
        }
        if(p.y > canvas.height-50){
            p.y = canvas.height - 50;
            p.vy *= -1;
        }
        p.x += p.vx;
        p.y += p.vy;
    }
}

function loop(){
    update();
    render();
}
