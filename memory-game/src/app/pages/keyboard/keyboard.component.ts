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

  ngOnInit(): void {
    this.generateKeyboardElements()
  }

  generateKeyboardElements() {
    for (let index = 0; index < 9; index++) {
      this.elements.push({ position: index, isActive: false })
    }
  }

  startChallenge() {
    
    let randomItem = this.getRandomInt()
    this.elements[randomItem].isActive = true
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

  getRandomInt(max: number = 9) {
    return Math.floor(Math.random() * max);
  }
}
