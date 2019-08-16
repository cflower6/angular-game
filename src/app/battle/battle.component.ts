import { Component, OnInit, ɵaddPlayer } from '@angular/core';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  num = 10;
  public HP = 100;
  public ATK = 10;

  constructor() { }

  ngOnInit() {
  }

  startFight(){

  }
  gameLoop(){
    while(this.num > 100){
      this.num++;
    }
  }

}
