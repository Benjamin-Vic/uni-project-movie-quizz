import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CookieService } from 'ngx-cookie-service';
import { MatCardModule } from '@angular/material/card';
import moment from 'moment';

@Component({
    selector: 'app-user',
    standalone: true,
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss',
    imports: [
        CommonModule,
        MatProgressBarModule,
        MatCardModule,
        // ReactiveFormsModule,
        // MatFormFieldModule,
        // MatInputModule,
        // MatButtonModule,
        // RouterLink,
        // RouterLinkActive
    ],
})
export class UserComponent {

    constructor(
        private http: HttpClient,
        private cookieService: CookieService
    ) { }

    public isLoaded: boolean = false;

    public quizzes: any[] = [];

    ngOnInit() {
        const token = this.cookieService.get('token');

        this.http.get('http://localhost:8000/user/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .subscribe({
                next: (data: any) => {
                    this.quizzes = data.quizzes;
                    this.quizzes.sort((a, b) => b.createdAt - a.createdAt);

                    for (const quiz of this.quizzes) {
                        quiz.score = this.score(quiz);
                        quiz.createdAt = moment(quiz.createdAt).format('DD/MM/YYYY HH:mm');

                        this.http.get('http://www.omdbapi.com', {
                            params: {
                                apikey: localStorage.getItem('omdbKey') as string,
                                i: quiz.movieId as string,
                            }
                        })
                            .subscribe({
                                next: (response: any) => {
                                    if (response.Response === 'True') {
                                        quiz.movie = response;
                                    }
                                }
                            });

                    }

                },
                error: () => this.cookieService.delete('token'),
            })
            .add(() => this.isLoaded = true);
    }

    score(quiz: any) {
        let count = 0;

        if (quiz.released)
            count++;
        if (quiz.runtime)
            count++;
        if (quiz.writer)
            count++;
        if (quiz.actors)
            count++;
        if (quiz.boxOffice)
            count++;

        return count;
    }
}
