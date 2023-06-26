import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { GameStatus } from 'src/app/shared/enums/game-status.enum';
import { GameDifficulty } from '../../shared/enums/game-difficulty.enum';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnChanges {

  gameStatusEnum = GameStatus
  currentCounter = 0
  setTimeoutsIds: any[] = []
  @Input() gameStatus: any;
  @Input() attempsRemaining: any;
  @Input() gameDifficulty: any;
  @Input() counter: any;
  @Input() score: any;
  @Input() highScore: any;
  @Output() onStartGame = new EventEmitter()
  @Output() onGameOver = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes)
    if (changes['counter']?.currentValue || changes['score']?.currentValue) {
      this.currentCounter = this.counter
      this.clearSetTimeoutsRemaining()
      this.discountCounter()
    }

  }

  startGame() {
    this.onStartGame.emit()
  }

  endGame() {
    this.currentCounter = 0
    this.onGameOver.emit()
  }

  discountCounter() {
    const timeoutId = setTimeout(() => {
      if (this.currentCounter == 0) {
        this.endGame()
      }
      else {
        this.currentCounter -= 1
        this.discountCounter()
      }
    }, 1000);
    this.setTimeoutsIds.push(timeoutId)
  }

  clearSetTimeoutsRemaining(){
    for (let i = 0; i <  this.setTimeoutsIds.length; i++) {
      clearTimeout(this.setTimeoutsIds[i]);
    }
    this.setTimeoutsIds = []
  }

}
