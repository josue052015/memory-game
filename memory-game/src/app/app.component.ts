import { Component, OnInit } from '@angular/core';
import { GameDifficulty } from './shared/enums/game-difficulty.enum';
import { GameStatus } from './shared/enums/game-status.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'memory-game';
  attempsRemaining = 3
  difficulty = GameDifficulty.Normal;
  gameStatus = GameStatus.GameOver;
  currentScore = 0;
  highScore = localStorage.getItem('highScore')

  startGame() {
    this.gameStatus = GameStatus.GameStarted;
  }

  endGame() {
    this.gameStatus = GameStatus.GameOver;
    this.attempsRemaining = 3
    this.currentScore = 0
  }

  handleAttempFailed() {
    this.attempsRemaining -= 1
    if (this.attempsRemaining == 0) this.endGame()
  }

  handleStageCompleted() {
    this.currentScore += 50
    const highScore = localStorage.getItem('highScore')
    if (this.currentScore > Number(highScore)) {
      localStorage.setItem('highScore', this.currentScore.toString())
    }
  }
}


