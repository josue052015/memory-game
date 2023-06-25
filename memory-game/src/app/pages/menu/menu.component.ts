import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameStatus } from 'src/app/shared/enums/game-status.enum';
import { GameDifficulty } from '../../shared/enums/game-difficulty.enum';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  gameStatusEnum = GameStatus
  counter = 0;
  @Input() gameStatus: any;
  @Input() attempsRemaining: any;
  @Input() gameDifficulty: any;
  @Output() onStartGame = new EventEmitter()
  @Output() onGameOver = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  startGame() {
    this.onStartGame.emit()
    this.startCounter()
  }

  endGame() {
    this.counter = 0;
    this.onGameOver.emit()
  }

  startCounter() {
    switch (this.gameDifficulty) {
      case GameDifficulty.Easy:
        this.counter = 30
        break;
      case GameDifficulty.Normal:
        this.counter = 40
        break;
      case GameDifficulty.Hard:
        this.counter = 50
        break;
      case GameDifficulty.Insane:
        this.counter = 60
        break;
    }
    this.discountCounter()

  }

  discountCounter() {
    setTimeout(() => {
      if (this.counter == 0) {
        this.endGame()
      }
      else {
        this.counter -= 1
        this.discountCounter()
      }
    }, 1000);
  }

}
