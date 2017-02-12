import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<button (click)='toggleState()'>My Button</button>
  <ul>
    <li *ngFor="let item of items" [@myTrigger]='state'>{{ item }}</li>
  </ul>
  `,
  styles: [],
  animations:[
    trigger('myTrigger', [
      state('small', style({
        transform:'scale(1)'
      })),
      state('large', style({
        transform:'scale(1.4)'
      })),
      state('fadeIn', style({
        opacity: '1'
      })),
      transition('void => *', [
        style({ opacity: '0', transform: 'translateY(20px)' }),
        animate('500ms')
      ])
    ])
  ]
})
export class AppComponent  {
  state: string = 'small';
  items: string[] = [];
  toggleState() {
    //this.state = (this.state === 'small' ? 'large' : 'small');
    this.items.push("Another item");
    this.state = "fadeIn";
  }
}
