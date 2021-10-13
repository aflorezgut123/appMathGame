import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogicGameComponent } from '../logic-game/logic-game.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}
  startGame(){
    this.router.navigate(['/logic-game'])      
  }
}
