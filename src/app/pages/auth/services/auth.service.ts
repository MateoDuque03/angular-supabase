import { Injectable } from '@angular/core';
import {
  ApiError,
  createClient,
  SupabaseClient,
  User,
  UserCredentials,
} from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { USER_STORAGE_KEY } from 'src/app/shared/navbar/constants/constant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabaseClient!: SupabaseClient;
  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  constructor() {
    this.supabaseClient = createClient(
      environment.supabase.url,
      environment.supabase.publicKey
    );
    this.setUser();
  }

  get user$(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  async signIn(credentials: UserCredentials): Promise<any> {
    try {
      const { user, error, ...rest } = await this.supabaseClient.auth.signIn(
        credentials
      );
      return error ? error : user;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async signUp(credentials: UserCredentials): Promise<any> {
    try {
      const { user, error, ...rest } = await this.supabaseClient.auth.signUp(
        credentials
      );
      console.log('user', user);
      console.log('user', error);
      return error ? error : user;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  signOut(): Promise<{ error: ApiError | null }> {
    this.userSubject.next(null);
    return this.supabaseClient.auth.signOut();
  }

  private setUser(): void {
    const session = localStorage.getItem(USER_STORAGE_KEY) as unknown as User;
    this.userSubject.next(session);
  }
}
