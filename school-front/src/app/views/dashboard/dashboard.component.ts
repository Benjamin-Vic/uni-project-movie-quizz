import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatProgressBarModule
    ],
})
export class DashboardComponent {

    constructor(
        private http: HttpClient,
        private router: Router,
    ) { }

    public firstRequestSent: boolean = false;
    public isLoaded: boolean = false;

    public elements: any[] = [];

    public form = new FormGroup({
        search: new FormControl('', [
            Validators.required,
        ]),
    });

    submit(): void {
        this.isLoaded = false;
        this.firstRequestSent = true;

        this.http.get('http://www.omdbapi.com', {
            params: {
                apikey: localStorage.getItem('omdbKey') as string,
                s: this.form.value.search as string,
                type: 'movie',
            }
        })
            .subscribe({
                next: (response: any) => {
                    this.elements = response.Search;
                    this.isLoaded = true;
                },
                // TODO: add notification
                error: (error: any) => console.log('error', error),
            });
    }

    redirect(id: string) {
        this.router.navigate(['/quiz'], { queryParams: { id } });
    }

}
