
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    

    @property
    moveSpeed:number = 0;

    @property
    life:number = 3;
    

    moveRight: number;
    moveLeft: number;
    
    

    
//Move Left and Right 
    onKeyDown(event){
        switch(event.keyCode){
            case cc.macro.KEY.a:
                this.moveLeft= 1;
                console.log('press a')
                break;
            case cc.macro.KEY.d:
                this.moveRight = 1;
                console.log('press d')
                break;
        }
    }
    onKeyUp(event){
        switch(event.keyCode){
            case cc.macro.KEY.a:
                this.moveLeft = 0;
                break;
            case cc.macro.KEY.d:
                this.moveRight = 0;
                break;
        }
    }
    onCollisionEnter(other, self)
    {
        if(other.tag == 3)
        {
            other.node.destroy();
            this.life -= 1;
            this.node.parent.getComponent('Game').showLife(this.life);
            if(this.life == 0)
            {
                this.node.destroy();
                this.node.getComponent('Game').gameOver();
                return;
            }
        }
    }
    
    onLoad () {

        var manager = cc.director.getCollisionManager();
        manager.enabled = true;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
    }
    start () {
        this.node.parent.getComponent('Game').showLife(this.life);

    } 

    update (dt) {
        if(this.moveLeft == 1){
            this.node.setPosition(this.node.position.x -= 100*dt,this.node.position.y);
        }
        if(this.moveRight == 1){
            this.node.setPosition(this.node.position.x += 100*dt,this.node.position.y);
        }
    }
}
