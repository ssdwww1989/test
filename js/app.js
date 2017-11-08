// 这是我们的玩家要躲避的敌人
var Enemy = function(x,y,speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';

};


// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {



if(this.x > 707){
    this.x = -150;
}else{
    this.x += dt * this.speed;
}

    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的

};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function(){
    if(this.y === player.y){
        console.log("撞上了")
    }
}


// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数



//新增Player类
var Player = function(x,y){
    Enemy.call(this,x,y)
    this.sprite = 'images/char-boy.png';
}
Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(){

}
/*Player.prototype.render = function(){

}*/



Player.prototype.handleInput = function(keycode){
    switch (keycode){
        case 'left':

            if(this.x>=100){
                this.x -= 100;
                console.log(this.x)
            }
            break;
        case 'right':
            if(this.x<=500){
                this.x +=100;
                console.log(this.x)
            }
            break;
        case 'up':
            if(this.y>=83){
                this.y -= 83;
                console.log(this.y);
            }
            break;
        case 'down':
            if(this.y<=471){
                this.y += 83;
                console.log(this.y)
            }

    }

}


// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面

var allEnemies = [
    (new Enemy(0,60,100)),
    (new Enemy(0,140,200)),
    (new Enemy(0,220,300)),
    (new Enemy(0,300,150)),
    (new Enemy(0,380,190)),
    (new Enemy(0,60,350)),
    (new Enemy(0,140,300)),
    (new Enemy(0,220,400)),
];












// 把玩家对象放进一个叫 player 的变量里面

//实例化player对象 并且设置其实位置x,1 y,1
var player = new Player(300,472);






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
