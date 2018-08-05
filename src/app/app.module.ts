import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QuestionsComponent } from './questions/questions.component';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TopanswersComponent } from './topanswers/topanswers.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { UsersComponent } from './users/users.component';
import { AnswersComponent } from './answers/answers.component';
import { AnswerComponent } from './answer/answer.component';
import { VideosComponent } from './videos/videos.component';
import { MessageComponent } from './message/message.component';

import { AnswerService } from '../services/answer.service';
import { MessageService } from '../services/message.service';
import { VideoService } from '../services/video.service';
import { QuestionService } from '../services/question.service';
import { CountryService } from '../services/country.service';
import { UserService } from '../services/user.service';
import { Service } from '../services/service.service';
import { LoginService } from '../services/login.service';
import { AuthGuard } from '../services/auth-guard.service';


const appRoutes: Routes = [
  { path: 'questions', component: QuestionsComponent ,canActivate: [AuthGuard] },
  { path: 'questions/:id', component: QuestionsComponent ,canActivate: [AuthGuard]},
  { path: 'topanswers', component:TopanswersComponent ,canActivate: [AuthGuard]},
  { path: 'visitors', component:VisitorsComponent ,canActivate: [AuthGuard]},
  { path: 'users', component:UsersComponent ,canActivate: [AuthGuard]},
  { path: 'answers', component:AnswersComponent ,canActivate: [AuthGuard]},
  { path: 'answer', component:AnswerComponent ,canActivate: [AuthGuard]},
  { path: 'answer/:id', component:AnswerComponent ,canActivate: [AuthGuard]},
  { path: 'videos', component:VideosComponent ,canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/questions', pathMatch: 'full' ,canActivate: [AuthGuard]},
  
];

@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    LoginComponent,
    TopanswersComponent,
    VisitorsComponent,
    UsersComponent,
    AnswersComponent,
    AnswerComponent,
    VideosComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthGuard,LoginService,Service,QuestionService,AnswerService,VideoService,MessageService,CountryService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
