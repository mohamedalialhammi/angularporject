import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { AddsubjectComponent } from './components/addsubject/addsubject.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { ForumComponent } from './components/forum/forum.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SubjectDetailComponent } from './components/subject-detail/subject-detail.component';

const routes: Routes = [
{ path: 'login', component: LoginComponent},
{ path: 'aboutus', component:AboutusComponent},
{ path: 'contactus', component:ContactusComponent},
{ path: 'forum', component:ForumComponent},
{ path: 'subjectDetail/:id', component:SubjectDetailComponent},
{ path: 'signup', component:SignupComponent},
{ path: '', component: HomeComponent},
{ path: 'addsubject', component: AddsubjectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AppComponent, LoginComponent]
