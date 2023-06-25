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
  @Input() gameStatus: any;
  @Input() attempsRemaining: any;
  @Input() gameDifficulty: any;
  @Input() counter: any
  @Output() onStartGame = new EventEmitter()
  @Output() onGameOver = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  startGame() {
    this.onStartGame.emit()
    this.discountCounter()
  }

  discountCounter() {
    setTimeout(() => {
      if (this.counter == 0) {
        this.onGameOver.emit()
      }
      else {
        this.counter -= 1
        this.discountCounter()
      }
    }, 1000);
  }

}
