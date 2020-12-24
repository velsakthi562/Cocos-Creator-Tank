
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    maxHits:number= 1
    @property
    moveSpeedX:number= 100;
    @property
    moveSpeedY:number = 30;
    @property
    moveRight:boolean = true;
    
    @property
    currentHits: number= 0;
    @property
    scoreValue:number= 1;
    
    //@property(cc.Node)
    //gameOver:

    @property(cc.Prefab)
    bullet:cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:

    onCollisionEnter(other,self)
    {
        if(other.tag == 2)
        {
            other.node.destroy();
            this.currentHits++;
            if(this.currentHits >= this.maxHits)
            {
                this.node.destroy();
                this.node.parent.getComponent('Game').addScore(this.scoreValue);
                this.node.parent.getComponent('Game').enemyDestroy();
            }
        }
        else if(other.tag == 6)
        {
            this.moveRight = false;
            this.moveDown();
        }
        else if(other.tag == 5)
        {
            this.moveRight = true;
            this.moveDown();
        }
    }
    
    moveDown()
    {
        var moveY = cc.moveBy(1, cc.v2(0, -this.moveSpeedY));
        this.node.runAction(moveY);
    }
    bulletSpawn()
    {
        var newBullet = cc.instantiate(this.bullet);
        newBullet.setPosition(this.node.position.x, this.node.position.y - 50);
        this.node.parent.addChild(newBullet);

        var action = cc.moveTo(3, cc.v2(newBullet.position.x, -400));
     var destruct = cc.callFunc(function(){
            newBullet.destroy();
        }, this);
        var sequence = cc.sequence(action, destruct);
        newBullet.runAction(sequence);
    }
    
    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.moveRight = true;
        //this.gameOver = cc.find("GameOver");
    }

    start () {
        this.currentHits = 0;
        this.node.parent.getComponent('Game').enemies()
    }

    update (dt) {
        var chance = Math.random();
        if(chance < (0.3*dt))
        {
            this.bulletSpawn();
        }
        if(this.moveRight)
        {
            var moveX = cc.moveBy(2, cc.v2(this.moveSpeedX*dt, 0));
            this.node.runAction(moveX);            
        }
        else if(!this.moveRight)
        {
            var moveX = cc.moveBy(2, cc.v2(-this.moveSpeedX*dt, 0));
            this.node.runAction(moveX);
        }

    }
}
