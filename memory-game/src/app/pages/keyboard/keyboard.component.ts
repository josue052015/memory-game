import { Component, OnInit } from '@angular/core';
import { IKeyboardElement } from 'src/app/shared/models/keyboard-element.model';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {

  constructor() { }

  elements: IKeyboardElement[] = [];
  challengeCounter = 1
  keyboardActive = false;
  keysCombination: number[] = []
  attempsCombination: number[] = []
  keyboardError = false

  ngOnInit(): void {
    this.generateKeyboardElements()
  }

  generateKeyboardElements() {
    for (let index = 0; index < 9; index++) {
      this.elements.push({ position: index, isActive: false })
    }
  }

  startChallenge() {
    this.keysCombination = []
    this.attempsCombination = []
    this.setKeyboardSequence()
  }

  setKeyboardSequence(){
    let randomItem = this.getRandomInt()
    this.keysCombination.push(randomItem)
    setTimeout(() => {
      this.elements[randomItem].isActive = true
    }, 100);
    
    setTimeout(() => {
      this.elements[randomItem].isActive = false
      if (this.challengeCounter < 4) {
        this.challengeCounter += 1
        this.startChallenge()
      }
      else{
        this.challengeCounter = 1
      }
    }, 500);
  }

  onKeyboardPressed(key: IKeyboardElement){
    this.activateKey(key);
    this.attempsCombination.push(key.position)

    if(!(this.isARightAnswer())){
      this.keyboardError = true;
      setTimeout(() => {
        this.attempsCombination = []
        this.keyboardError = false
      }, 1000);
    }
  }

  activateKey(key: IKeyboardElement){
    key.isActive = true
    setTimeout(() => {
      key.isActive = false
    }, 300);
  }

  isARightAnswer(){
    let isValid = true
    this.attempsCombination.forEach((element,index) => {
      if(this.keysCombination[index] !== this.attempsCombination[index]) isValid = false
    })
    return isValid
  }

  getRandomInt(max: number = 9) {
    return Math.floor(Math.random() * max);
  }
}
