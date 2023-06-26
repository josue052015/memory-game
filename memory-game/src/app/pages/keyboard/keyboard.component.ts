import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { GameStatus } from 'src/app/shared/enums/game-status.enum';
import { IKeyboardElement } from 'src/app/shared/models/keyboard-element.model';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit, OnChanges {

  @Input() gameStatus: any;
  @Input() attempsRemaining: any;
  @Output() onAttempFailed = new EventEmitter();
  @Output() onStageCompleted = new EventEmitter();
  @Output() onStageGenerationCompleted = new EventEmitter();

  constructor() { }

  elements: IKeyboardElement[] = [];
  combinationCounter = 1
  keyboardActive = false;
  keysCombination: number[] = []
  attempsCombination: number[] = []
  keyboardError = false
  keyboardSuccess = false;


  ngOnInit(): void {
    this.generateKeyboardElements()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      switch (changes['gameStatus']?.currentValue) {
        case GameStatus.GameStarted:
          this.generateGameStage()
          break;
        case GameStatus.GameOver:
          this.endChallenge()
          break;
      }
    }

  }

  generateKeyboardElements() {
    for (let index = 0; index < 9; index++) {
      this.elements.push({ position: index, isActive: false })
    }
  }

  endChallenge() {
    this.keysCombination = []
    this.attempsCombination = []
    this.combinationCounter = 1
    this.keyboardActive = false
  }

  generateGameStage(combinationsLength = 4, displayColorTime = 500) {
    this.keyboardActive = false
    let randomItem = this.getRandomInt()
    this.keysCombination.push(randomItem)
    setTimeout(() => {
      this.elements[randomItem].isActive = true
    }, 100);

    setTimeout(() => {
      this.elements[randomItem].isActive = false
      const stageGenerationInProgress = this.combinationCounter < combinationsLength
      if (stageGenerationInProgress) {
        this.combinationCounter += 1
        this.generateGameStage()
      }
      else {
        this.combinationCounter = 1
        this.keyboardActive = true
        this.onStageGenerationCompleted.emit()
      }
    }, displayColorTime);
  }


  onKeyboardPressed(key: IKeyboardElement) {
    this.activateKey(key);
    this.attempsCombination.push(key.position)
    switch (this.isARightAnswer()) {
      case true:
        const isStageCompleted = this.attempsCombination.length == this.keysCombination.length;
        if (isStageCompleted) {
          this.keyboardSuccess = true;
          setTimeout(() => {
            this.onStageCompleted.emit()
            this.keyboardSuccess = false;
            this.generateGameStage()
          }, 1000);
        }
        break;
      case false:
        this.keyboardError = true;
        this.onAttempFailed.emit()
        setTimeout(() => {
          this.attempsCombination = []
          this.keyboardError = false
        }, 1000);
        break;
    }

  }

  activateKey(key: IKeyboardElement) {
    key.isActive = true
    setTimeout(() => {
      key.isActive = false
    }, 300);
  }

  isARightAnswer() {
    let isValid = true
    this.attempsCombination.forEach((element, index) => {
      if (this.keysCombination[index] !== this.attempsCombination[index]) isValid = false
    })
    return isValid
  }

  getRandomInt(max: number = 9) {
    return Math.floor(Math.random() * max);
  }
}
