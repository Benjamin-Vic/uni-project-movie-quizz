import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
})
export class AuthComponent {

    constructor(
        private http: HttpClient,
        private cookieService: CookieService
    ) { }

    public isRegister: boolean = false;

    public login_form = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.email,
        ]),
        password: new FormControl('', [
            Validators.required,
        ]),
    });

    public register_form = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.email,
        ]),
        password: new FormControl('', [
            Validators.required,
        ]),
        password_confirmation: new FormControl('', [
            Validators.required,
        ]),
        username: new FormControl('', [
            Validators.required,
        ]),
        key: new FormControl('', [
            Validators.required,
        ]),
    });

    public loginSubmit(): void {
        this.http.post('http://localhost:8000/auth/signin', {
            email: this.login_form.value.email,
            password: this.login_form.value.password,
        })
            .subscribe({
                next: (response: any) => {
                    this.cookieService.set('token', response.token);
                    window.location.reload();
                },
                // TODO: add notification
                error: (error: any) => console.log('error', error),
            });
    }

    public registerSubmit(): void {
        if (this.register_form.value.password !== this.register_form.value.password_confirmation) {
            console.log('passwords do not match');
            return;
        }

        this.http.post('http://localhost:8000/auth/signup', {
            email: this.register_form.value.email,
            password: this.register_form.value.password,
            username: this.register_form.value.username,
            omdbKey: this.register_form.value.key,
        })
            .subscribe({
                next: (response: any) => {
                    this.cookieService.set('token', response.token);
                    window.location.reload();
                },
                // TODO: add notification
                error: (error: any) => console.log('error', error),
            });
    }
}
