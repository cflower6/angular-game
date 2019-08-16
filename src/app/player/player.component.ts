import { Component } from '@angular/core';
import { Stats } from '../stats';
import { EnemyComponent } from '../enemy/enemy.component';
import { Monsters } from '../monsters';
import { delay, async } from 'q';
import { ItemComponent } from '../item/item.component';



@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  providers: [EnemyComponent, Monsters]
})
export class PlayerComponent {
  name = '';
  HP;
  ATK;
  critChance = 5;
  dodgeRate = 15;

  showEnemy = false;
  enemy: Stats;
  eName: string;
  eHP: number;
  eATK: number;

  turn = 1;
  battleText = 'Not Started';
  battleTextBool = false;
  enemyComponenetHolder;

  show = true;
  isAtk = true;
  isEAtk = true;
  isGameOver = false;
  isDamaged = true;
  isDamaged2 = true;
  isDodging = true;
  isDodging2 = true;
  isCritical = true;
  isCriticalE = true;
  isCriticalPB = true;
  isDead = false;
  isCritDeath = false;
  isDrop = false;

  inventory = new Array();
  item;
  i;

  constructor() {
    this.HP = 100;
    this.ATK = 10;

    for(this.i = 0; this.i < 10; this.i++){
      this.addToInventory();
    }
    console.log(this.inventory);
  }

  onSave(Name: string) {
    if (this.name.length >= 1) {
      this.name = Name;
      this.show = !this.show;
      
    }

  }

  startBattle(event: any) {
    if (this.isGameOver === false) {
      this.showEnemy = !this.showEnemy;
      this.battleTextBool = !this.battleTextBool;
      this.enemyComponenetHolder = new EnemyComponent();

      this.eHP = this.enemyComponenetHolder.HP;
      this.eATK = this.enemyComponenetHolder.ATK;
      this.eName = this.enemyComponenetHolder.name;

      if (this.battleTextBool) {
        this.battleText = 'Started';
      } else {
        this.battleText = 'Not Started';
      }

      (async () => {

        while (this.HP > 0 || this.eHP > 0) {
          if (this.eHP <= 0 || this.HP <= 0) {
            if (this.HP < 0) {
              this.HP = 0;
            }
            this.isDead = !this.isDead;
            await delay(1000);
            if(this.getRandomNumber(50) <= 50){
              this.isDrop = !this.isDrop;
            }
            break;
          }
          if (this.turn % 2 === 1) {
            console.log(this.name + ' turn');
            console.log(this.turn);

            if (this.getRandomNumber(20) <= this.critChance) {
              this.isCritical = !this.isCritical;
              await delay(800);
              if (this.enemyComponenetHolder.getDodgeChance()) {
                this.isDodging2 = !this.isDodging2;
                await delay(1000);
                this.isDodging2 = !this.isDodging2;
                this.isCritical = !this.isCritical;
              } else {
                this.isDamaged2 = !this.isDamaged2;
                this.eHP -= (this.ATK * 10);
                if (this.eHP <= 0) {
                  await delay(300);
                  this.isCritDeath = !this.isCritDeath;
                  await delay(800);
                  if(this.getRandomNumber(50) <= 50){
                    this.isDrop = !this.isDrop;
                  }
                  this.isCritDeath = !this.isCritDeath;
                  break;
                } else {
                  this.isCriticalPB = !this.isCriticalPB;
                  await delay(2000);
                  this.isDamaged2 = !this.isDamaged2;
                  this.isCritical = !this.isCritical;
                  this.isCriticalPB = !this.isCriticalPB;
                  this.enemyComponenetHolder.setUpdatedStats(this.eHP, this.eATK);
                  console.log('HP: ' + this.eHP);
                }
              }
            } else {
              this.isAtk = !this.isAtk;
              await delay(800);
              if (this.enemyComponenetHolder.getDodgeChance()) {
                this.isDodging2 = !this.isDodging2;
                await delay(1200);
                this.isDodging2 = !this.isDodging2;
                this.isAtk = !this.isAtk;

              } else {
                this.isDamaged2 = !this.isDamaged2;
                this.eHP -= this.ATK;
                await delay(1200);
                this.isDamaged2 = !this.isDamaged2;
                this.isAtk = !this.isAtk;
                this.enemyComponenetHolder.setUpdatedStats(this.eHP, this.eATK);
                console.log('HP: ' + this.eHP);
              }

            }
            await delay(500);
            this.turn++;
          } else {
            console.log(this.eName + ' turn');
            console.log(this.turn);

            if (this.enemyComponenetHolder.getCritChance()) {
              this.isCriticalE = !this.isCriticalE;
              await delay(800);
              if (this.getRandomNumber(20) <= this.dodgeRate) {
                this.isDodging = !this.isDodging;
                await delay(1000);
                this.isDodging = !this.isDodging;
                this.isCriticalE = !this.isCriticalE;
              } else {
                this.isDamaged = !this.isDamaged;
                this.HP -= (this.eATK * 2);
                await delay(1000);
                this.isDamaged = !this.isDamaged;
                this.isCriticalE = !this.isCriticalE;
              }
            } else {
              this.isEAtk = !this.isEAtk;
              await delay(800);
              if (this.getRandomNumber(20) <= this.dodgeRate) {
                this.isDodging = !this.isDodging;
                await delay(1200);
                this.isDodging = !this.isDodging;
                this.isEAtk = !this.isEAtk;
              } else {
                this.isDamaged = !this.isDamaged;
                this.HP -= this.eATK;
                await delay(1200);
                this.isDamaged = !this.isDamaged;
                this.isEAtk = !this.isEAtk;
              }
            }


            this.turn++;

          }
          await delay(1000);
        }
        if (this.HP <= 0 || this.eHP <= 0) {
          console.log('End of battle');
          this.battleTextBool = !this.battleTextBool;
          this.showEnemy = !this.showEnemy;

          if (this.battleTextBool) {
            this.battleText = 'Started';
          } else {
            this.battleText = 'Not Started';
          }
          this.isGameOver = !this.isGameOver;
        }

      })();
    } else {
      console.log('Game stopped');
    }

  }

  private getRandomNumber(num: number): number {
    return Math.floor(Math.random() * num);
  }

  addToInventory(){
    this.item = new ItemComponent;

    this.inventory.push(this.item.getItem());
  }
}
