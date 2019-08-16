import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { BattleComponent } from './battle/battle.component';
import { PlayerComponent } from './player/player.component';
import { EnemyComponent } from './enemy/enemy.component';
import { ItemComponent } from './item/item.component';


@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    BattleComponent,
    PlayerComponent,
    EnemyComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
