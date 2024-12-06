import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppliancesListComponent } from "./appliances-list/appliances-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppliancesListComponent], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-project';
}
