import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
