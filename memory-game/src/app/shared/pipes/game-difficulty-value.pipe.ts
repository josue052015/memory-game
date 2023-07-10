import { Pipe, PipeTransform } from '@angular/core';
import { GameDifficulty } from '../enums/game-difficulty.enum';

@Pipe({
  name: 'gameDifficultyValue'
})
export class GameDifficultyValuePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {

    for (let item in GameDifficulty) {
      if (Number(GameDifficulty[item]) == value) return item
    }

  }

}
