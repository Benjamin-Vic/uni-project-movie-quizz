import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import moment from 'moment';
import { faker } from '@faker-js/faker';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-quiz',
    standalone: true,
    templateUrl: './quiz.component.html',
    styleUrl: './quiz.component.scss',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatProgressBarModule,
        RouterLink,
        RouterLinkActive
    ],
})
export class QuizComponent {

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private cookieService: CookieService,
    ) { }

    public isLoaded: boolean = false;

    public movie: any;

    public step: number = 0;

    public responses: any = {
        released: false,
        runtime: false,
        writer: false,
        actors: false,
        boxOffice: false,
    };

    public possible_answers: any[] = [];

    public score: number = 0;

    ngOnInit() {
        this.route.queryParamMap.subscribe(params => {

            if (!params.get('id')) {
                this.router.navigate(['/dashboard']);
            }

            this.http.get('http://www.omdbapi.com', {
                params: {
                    apikey: localStorage.getItem('omdbKey') as string,
                    i: params.get('id') as string,
                }
            })
                .subscribe({
                    next: (response: any) => {
                        if (response.Response === 'False') {
                            this.router.navigate(['/dashboard']);
                        }

                        this.movie = response;

                        this.possible_answers = [
                            [
                                { value: moment(this.movie.Released).format('YYYY-MM-DD'), correct: true },
                                { value: this.getFakeRealeased(), correct: false },
                                { value: this.getFakeRealeased(), correct: false },
                                { value: this.getFakeRealeased(), correct: false },
                            ],
                            [
                                { value: this.movie.Runtime, correct: true },
                                { value: this.getFakeRuntime(), correct: false },
                                { value: this.getFakeRuntime(), correct: false },
                                { value: this.getFakeRuntime(), correct: false },
                            ],
                            [
                                { value: this.movie.Writer, correct: true },
                                { value: this.getFakePerson(), correct: false },
                                { value: this.getFakePerson(), correct: false },
                                { value: this.getFakePerson(), correct: false },
                            ],
                            [
                                { value: this.movie.Actors, correct: true },
                                { value: this.getFakePerson(), correct: false },
                                { value: this.getFakePerson(), correct: false },
                                { value: this.getFakePerson(), correct: false },
                            ],
                            [
                                { value: this.movie.BoxOffice, correct: true },
                                { value: this.getFakeBoxOffice(), correct: false },
                                { value: this.getFakeBoxOffice(), correct: false },
                                { value: this.getFakeBoxOffice(), correct: false },
                            ]
                        ];

                        for (let i = 0; i < this.possible_answers.length; i++) {
                            this.possible_answers[i] = this.shuffle(this.possible_answers[i]);
                        }

                        this.isLoaded = true;

                    },
                    // TODO: add notification
                    error: (error: any) => {
                        console.log('error', error);
                        this.router.navigate(['/dashboard'])
                    },
                });
        });
    }

    shuffle(array: string[]) {
        return array.sort(() => Math.random() - 0.5);
    };

    getRandomInt(max: number) {
        return Math.floor(Math.random() * max) + 1;
    }

    getFakeRealeased() {
        return moment(faker.date.recent({ days: 30, refDate: this.movie.Released })).format('YYYY-MM-DD');
    }

    getFakeRuntime() {
        const runtime = +this.movie.Runtime.split(' ')[0];

        const min = Math.floor(runtime * 0.75);
        const max = Math.floor(runtime * 1.25);

        return faker.number.bigInt({ min, max }).toString() + ' min';
    }

    getFakePerson() {
        const r: number = this.getRandomInt(3);

        let fakePerson: string = '';

        for (let i = 0; i < r; i++) {
            fakePerson += `${faker.person.fullName()}${i === r - 1 ? '' : ', '}`;
        }

        return fakePerson;
    }

    getFakeBoxOffice() {
        const boxOffice: number = +this.movie.BoxOffice.slice(1).replaceAll(',', '');

        const min = Math.floor(boxOffice * 0.75);
        const max = Math.floor(boxOffice * 1.25);

        const fakeBoxOffice = faker.number.bigInt({ min, max }).toString().replace(/(.{3})/g, "$1,");

        if (fakeBoxOffice[fakeBoxOffice.length - 1] === ',') {
            return '$' + fakeBoxOffice.slice(0, -1);
        } else {
            return '$' + fakeBoxOffice;
        }
    }

    submit(correct: boolean): void {
        switch (this.step) {
            case 0:
                this.responses.released = correct;
                break;
            case 1:
                this.responses.runtime = correct;
                break;
            case 2:
                this.responses.writer = correct;
                break;
            case 3:
                this.responses.actors = correct;
                break;
            case 4:
                this.responses.boxOffice = correct;
                break;
        }

        this.step++;

        if (this.step === 5) {

            for (const key in this.responses) {
                if (this.responses[key]) {
                    this.score++;
                }
            }

            this.http.post('http://localhost:8000/quiz', {
                ...this.responses,
                movieId: this.movie.imdbID,
            }, {
                headers: { 'Authorization': `Bearer ${this.cookieService.get('token')}` }
            })
                .subscribe({
                    error: (error: any) => console.log('error', error)
                });

        }
    }
}