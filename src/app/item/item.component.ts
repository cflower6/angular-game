import { Component } from '@angular/core';
import { ItemobjComponent } from './itemobj.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  item: any;
  name;
  type;
  desc;
  itemObjComp;
  itemMap;
  isDrop = false;
  randomNum;
  constructor() { 
    this.setItem();
    if(this.rng() <= 50){
      this.isDrop = !this.isDrop;
      console.log(this.isDrop);
    }
  }
  setItem(){
    this.itemObjComp = new ItemobjComponent();
    this.itemMap = this.itemObjComp.getItem();
    this.name = this.itemMap.get('name'); 
    this.type = this.itemMap.get('type');
    this.desc = this.itemMap.get('desc');
  }

  getItem() : Map<string, any>{
    return this.itemMap;
  }

  private rng(): number{
    return Math.floor(Math.random() * 50) + 1;
  }

}
