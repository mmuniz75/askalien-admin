import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
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
import { QuestionDetailComponent } from './question-detail/question-detail.component';

const appRoutes: Routes = [
  { path: 'questions', component: QuestionsComponent },
  { path: 'question-detail/:id', component: QuestionDetailComponent },
  { path: 'topanswers', component:TopanswersComponent},
  { path: 'visitors', component:VisitorsComponent},
  { path: 'users', component:UsersComponent},
  { path: 'answers', component:AnswersComponent},
  { path: 'answer', component:AnswerComponent},
  { path: 'videos', component:VideosComponent},
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/questions', pathMatch: 'full' },
  
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
    QuestionDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
