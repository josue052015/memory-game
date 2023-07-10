import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeyboardComponent } from './pages/keyboard/keyboard.component';
import { MenuComponent } from './pages/menu/menu.component';
import { GameDifficultyValuePipe } from './shared/pipes/game-difficulty-value.pipe';

@NgModule({
  declarations: [
    AppComponent,
    KeyboardComponent,
    MenuComponent,
    GameDifficultyValuePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
