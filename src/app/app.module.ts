import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchClearanceComponent } from './search-clearance/search-clearance.component';
import { FixedPersonalDataComponent } from './fixed-personal-data/fixed-personal-data.component';
import { ChangeablePersonalDataComponent } from './changeable-personal-data/changeable-personal-data.component';
import { EngagementComponent } from './engagement/engagement.component';
import { MarriageComponent } from './marriage/marriage.component';
import { ChildrensComponent } from './childrens/childrens.component';


const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'homePage', component: HomePageComponent},
  {path: 'searchClearance', component: SearchClearanceComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    SearchClearanceComponent,
    FixedPersonalDataComponent,
    ChangeablePersonalDataComponent,
    EngagementComponent,
    MarriageComponent,
    ChildrensComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
