import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { WelcomeSectionComponent } from './components/welcome-section/welcome-section.component';
import { LandingComponent } from './landing/landing.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    WelcomeSectionComponent,
    LandingComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    WelcomeSectionComponent,
    LandingComponent,
    RouterModule
  ]
})
export class SharedModule { }
