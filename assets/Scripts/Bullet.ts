
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    

    // LIFE-CYCLE CALLBACKS:
    
    onCollisionEnter(other, self)
    {
        if(other.tag == 7)
        {
            this.node.destroy();
        }
    }
    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
