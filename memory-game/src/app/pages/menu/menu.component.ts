import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameStatus } from 'src/app/shared/enums/game-status.enum';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  gameStatusEnum = GameStatus
  @Input() gameStatus: any;
  @Input()  attempsRemaining: any;
  @Output() onStartGame = new EventEmitter()
  @Output() onGameOver = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

}
