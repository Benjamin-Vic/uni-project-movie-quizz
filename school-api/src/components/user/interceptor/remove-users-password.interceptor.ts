import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../user.entity';

import { OutFindAllInterface } from '../../../interfaces/out-find-all.interface';

@Injectable()
export class RemoveUsersPasswordInterceptor<T> implements NestInterceptor<T, OutFindAllInterface<User>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<OutFindAllInterface<User>> {
        return next.handle().pipe(map(data => {
            for (const user of data.data) {
                delete user.password;
            }

            return data;
        }));
    }
}
