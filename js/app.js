

//默认数据
var defaultdata = {

    enemylocy:[130,215,295,380,460,],
    enemyspeed:[100,150,190,250,300],
    enemylocx:[-100,-130,-150,-200,-220],

    stonelocx:[205,305,405,505],
    stonelocy:[132,215,298,381,464],
    playerlocx:300,
    playerlocy:545,
    collision: true //默认true
}



// 这是我们的玩家要躲避的敌人
var Enemy = function(x,y,speed,img) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.shuffle();
    this.img = img;
    this.sprite = `images/${img}`;


};
Enemy.prototype.shuffle = function(){
    this.x = randomXY(defaultdata.enemylocx);
    this.y =  randomXY(defaultdata.enemylocy);
    this.speed = randomXY(defaultdata.enemyspeed);
}
// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    //判断enemy坐标是否大于canvas画布
if(this.x > 707){
    //新一轮打乱坐标
    this.shuffle();

}else{
    //如果没有则匀速运行
    this.x += dt * this.speed;
}

    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的

};




// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};




//固定石头


var Stone = function(x,y){
    this.x = randomXY(defaultdata.stonelocx);
    this.y = randomXY(defaultdata.stonelocy);

    this.sprite = 'images/nstone.png';
}
Stone.prototype = Object.create(Enemy.prototype);
Stone.prototype.update = function(){
}
var stone =[(new Stone()),(new Stone()),(new Stone()),(new Stone())]




// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
//新增Player类
var Player = function(x,y){
    /*Enemy.call(this,x,y)*/
    this.x = defaultdata.playerlocx;
    this.y = defaultdata.playerlocy;

    this.sprite = 'images/nflw.png';
}
Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(){

}
/*Player.prototype.render = function(){

}*/
Player.prototype.handleInput = function(keycode){

    var kt = this;

    switch (keycode){
        case 'left':
                if(kt.x>=100){
                    kt.x -= 100;
                }

            stone.forEach(function(stone){
                if(kt.x+5 == stone.x && kt.y+2 == stone.y){
                    kt.x+=100;
                }
            })
            break;

        case 'right':
                if (kt.x <= 500) {
                    kt.x += 100;
                }
            stone.forEach(function(stone){
                if(kt.x+5 == stone.x && kt.y+2 == stone.y){
                    kt.x-=100;
                }
            })
                break;
        case 'up':
                if (kt.y >= 83) {
                    kt.y -= 83;
                }
            stone.forEach(function(stone){
                if(kt.x+5 == stone.x && kt.y+2 == stone.y){
                    kt.y+=83;
                }
            })
                 break;
        case 'down':
                if (kt.y <= 471) {
                    kt.y += 83;
                }
            stone.forEach(function(stone){
                if(kt.x+5 == stone.x && kt.y+2 == stone.y){
                    kt.y-=83;
                }
            })
                break;
    }

}


Player.prototype.reset = function(){
    this.x = defaultdata.playerlocx;
    this.y = defaultdata.playerlocy;
    defaultdata.collision = true;//退回原位清除状态
}




// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面

var allEnemiesall = [
    (new Enemy(-110,60,100,"nhd.png")),
    (new Enemy(-130,140,170,"npc.png")),
    (new Enemy(-100,220,210,"nsj.png")),
    (new Enemy(-200,300,130,"nxz.png")),
    (new Enemy(-210,380,250,"nyy.png")),
    (new Enemy(-210,380,250,"nsj.png")),
];


var array = allEnemiesall;
//随机显示敌人
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
var allshu = shuffle(array);
var allEnemies = allshu;



// 把玩家对象放进一个叫 player 的变量里面

//实例化player对象 并且设置其实位置x,1 y,1
var player = new Player();

//随机生成

function randomXY(arr,tag){
    tag = arr[ Math.floor(Math.random()*arr.length)];
    return tag;
}

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
