import { Component } from '@angular/core';
import { GameDifficulty } from './shared/enums/game-difficulty.enum';
import { GameStatus } from './shared/enums/game-status.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'memory-game';
  attemps = 3
  difficulty = GameDifficulty.Normal;
  gameStatus = GameStatus.GameOver;

  startGame(){
    this.gameStatus = GameStatus.GameStarted;
  }

  endGame(){
    this.gameStatus = GameStatus.GameOver;
  }

}


