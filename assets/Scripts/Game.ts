
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    bullet:cc.Prefab = null;
    //spGameOver: cc.Sprite = null;

    

    @property
    score:number = 0;
    @property(cc.Label)
    scoreLable:cc.Label = null;
    @property(cc.Label)
    lifeLable:cc.Label = null;

    numberOfEnemies:number = 0;

    // LIFE-CYCLE CALLBACKS:
    enemyDestroy()
    {
        this.numberOfEnemies--;
        if(this.numberOfEnemies <= 0)
        {
            var delay = cc.delayTime(5);
            this.node.runAction(delay);
            cc.director.loadScene("Game");
        }
    }

    gameOver() {
        //this.spGameOver.node.active = true;
    }
    bulletSpawn()
    {
        var newBullet = cc.instantiate(this.bullet);
        newBullet.setPosition(this.node.getChildByName('Tank').position.x, this.node.getChildByName('Tank').position.y + 50);
        this.node.addChild(newBullet);

        var action = cc.moveTo(4, cc.v2(this.node.getChildByName('Tank').position.x, this.node.height));
        newBullet.runAction(action);
    }


    onLoad () {
        this.node.on('mousedown', this.bulletSpawn, this);

        //this.spGameOver = this.node.getChildByName("GameOver").getComponent(cc.Sprite);
        //this.spGameOver.node.active = false;
    }
   
    addScore(valueToAdd){
        this.score += valueToAdd;
        this.scoreLable.string = 'SCORE : ' + this.score.toString();
    }
    enemies()
    {
        this.numberOfEnemies++;
    }
    showLife(lifeLeft)
    {
        this.lifeLable.string = 'LIFE : ' + lifeLeft.toString();
    }


    start () {
        this.score= 0;
    }

    // update (dt) {}
}
