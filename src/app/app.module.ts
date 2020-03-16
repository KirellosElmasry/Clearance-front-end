import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
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
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatToolbarModule,MatIconModule,MatCardModule,MatButtonModule,MatProgressBarModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TestComponent } from './test/test.component';
import { SocialStatusComponent } from './social-status/social-status.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'homePage', component: HomePageComponent },
  { path: 'fixedPersonalData', component: FixedPersonalDataComponent },
  { path: 'changeablePersonalData', component: ChangeablePersonalDataComponent },
  { path: 'marriage', component: MarriageComponent },
  { path: 'childrens', component: ChildrensComponent },
  { path: 'engagement', component: EngagementComponent },
  { path: 'test', component: TestComponent },
  { path: 'searchClearance', component: SearchClearanceComponent },
  { path: 'socialStatus', component: SocialStatusComponent }
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
    ChildrensComponent,
    TestComponent,
    SocialStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatRadioModule,
    BrowserModule,  
    AppRoutingModule,  
    HttpClientModule,  
    BrowserAnimationsModule,  
    MatToolbarModule,  
    MatIconModule,  
    MatButtonModule,  
    MatCardModule,  
    MatProgressBarModule, MatFormFieldModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
