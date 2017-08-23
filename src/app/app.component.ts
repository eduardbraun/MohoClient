import { Component } from '@angular/core';
import { AuthGuard } from './_guards/index';
import '../assets/app.css';

@Component({
    moduleId: module.id.toString(),
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent {
    isLogedIn = false;


}