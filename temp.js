var c;
var ctx;
var particles = [];
var width = 0;
var height = 0;

function Particle(_x, _y, _vx, _vy,_color,_num){
    this.x = _x;
    this.y = _y;
    this.vx = _vx;
    this.vy = _vy;
    this.color = _color;
    this.num = _num;
}

function main(){
    c = document.getElementById("steven");
    width = document.body.clientWidth;
    height =document.body.scrollHeight ;
    c.width = width;
    c.height= height;
    ctx = c.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,width,height);
    init();
    setInterval(loop,1000/30);
}

function init(){
    var a = Math.random()*3.14/2;
    var r = Math.random()*20;
    var vx = Math.cos(a)*r / 4;
    var vy = Math.sin(a)*r / 4;
    var newColor = 0;
    // random a color
    while(newColor < 240){
        var myRandom = Math.floor(Math.random() * 0xffffff);
        var red = myRandom >> 16;
        var green = (myRandom >> 8) & 0xff;
        var blue = myRandom & 0xff;
        newColor = Math.sqrt(red * red + green * green + blue * blue);
    }
    var p = new Particle(50,50,vx,vy,"#"+myRandom.toString(16),1);
    particles.push(p);
}

function myClick(){
    var x = event.clientX - 10;
    var y = event.clientY + 30;
    for(var i = 0;i < particles.length; i++){
        var p = particles[i];
        var mx = x - p.x;
        var my = y - p.y;
        if(mx >= 0 && mx <= 50 && my >= 0 && my <= 50 ){
            var tot = p.vx * p.vx + p.vy * p.vy + Math.floor(Math.random() * 4);
            var nvx = (2 * ((tot | 0)% 2) - 1) * Math.sqrt(Math.floor(Math.random() * tot))
            var nvy = (2 * (((Math.random() * tot)| 0)% 2) - 1) * Math.sqrt(tot - nvx * nvx);
            var np = 0;
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
    ctx = c.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,width,height);
}

function render(){
    clean();
    for(var i = 0; i < particles.length ; i++){
        var p = particles[i];
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x,p.y,50,50);
        ctx.fillStyle = "Black";
        ctx.fillText(p.num,p.x+10,p.y+32)
        ctx.font="20px Verdana";
        ctx.fill();
    }
}
var ppt = 0;

function update(){
    var i = particles.length;
    while(i--){
        var p = particles[i];
        var min = 1;
        var vlc = 5;
        if(p.x < 0){
            p.x = 0;
            p.vx *= -1;
        }
        if(p.x > width-50){
            p.x = width-50;
            p.vx *= -1;
        }
        if(p.y < 0){
            p.y = 0
            p.vy *= -1;
        }
        if(p.y > height-50){
            p.y = height - 50;
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
