import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

import { LayoutComponent } from './layout/layout.component';
import { AuthComponent } from './views/auth/auth.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, LayoutComponent, AuthComponent],
    providers: [CookieService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

    constructor(
        private http: HttpClient,
        private cookieService: CookieService
    ) { }

    public isLoaded: boolean = false;
    public isAuth: boolean = false;

    ngOnInit(): void {
        const token = this.cookieService.get('token');

        if (!token || token.length === 0) {
            this.isLoaded = true;
        } else {
            this.http.get('http://localhost:8000/user/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .subscribe({
                    next: (data: any) => {
                        localStorage.setItem('omdbKey', data.omdbKey);
                        this.isAuth = true;
                    },
                    error: () => this.cookieService.delete('token'),
                })
                .add(() => this.isLoaded = true);
        }
    }

}
