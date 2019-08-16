export class ItemobjComponent{

    name;
    type;
    desc;
    keep;
    leave;
    item:any;
    itemObject: any;

    constructor(){
        this.setItemObject('test', 'test', 'test', false, false);
    }

    setItemObject(name: string, type: string, desc: string, keep: boolean, leave: boolean){
        //this.item = new Item();
    }

    getItem(): Map<string, any>{
        return this.itemObject;
    }
}