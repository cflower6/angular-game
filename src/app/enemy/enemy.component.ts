import { Component } from '@angular/core';
import { Monsters } from '../monsters';


@Component({
  selector: 'app-enemy',
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.css'],
  providers: [Monsters]
})
export class EnemyComponent {

  name = '';
  HP = 100;
  ATK = 10;
  dodgeChance = 5;
  critChance = 12;
  statsMap = new Map();
  myMonster = new Monsters();
  isCrit = false;
  isDodge = false;

  constructor() {
    this.setRandomEnemy();
  }

  private getRandomNumber(num: number): number {
    return Math.floor(Math.random() * num);
  }
  setRandomEnemy() {
    this.name = this.myMonster.MonsterNames[this.getRandomNumber(this.myMonster.MonsterNames.length)];
  }
  getDodgeChance(): boolean {
    if (this.getRandomNumber(100) <= this.dodgeChance) {
      return this.isDodge = true;
    } else {
      return this.isDodge = false;
    }
  }
  getCritChance(): boolean {
    if (this.getRandomNumber(100) <= this.critChance) {
      return this.isCrit = true;
    } else {
      return this.isCrit = false;
    }
  }
  setUpdatedStats(eHP: number, eAtk: number) {
    this.statsMap.set('NAME', this.name);
    this.statsMap.set('HP', eHP);
    this.statsMap.set('ATK', eAtk);

    this.HP = this.statsMap.get('HP');
    this.ATK = this.statsMap.get('ATK');
  }
}
