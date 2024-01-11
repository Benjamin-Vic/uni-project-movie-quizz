import { Routes } from '@angular/router';

import { DashboardComponent } from './views/dashboard/dashboard.component';
import { QuizComponent } from './views/quiz/quiz.component';
// import { UserComponent } from './views/user/user.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'quiz', component: QuizComponent },
    // { path: 'user', component: UserComponent },
    { path: '**', redirectTo: 'dashboard' },
];
