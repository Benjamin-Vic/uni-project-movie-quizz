import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../../../components/user/user.entity';

@Injectable()
export class RemoveUserPasswordInterceptor<T> implements NestInterceptor<T, User> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<User> {
        return next.handle().pipe(map(data => {
            delete data.user.password;

            return data;
        }));
    }
}
