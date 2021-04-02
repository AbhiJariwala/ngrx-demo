import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {login} from '../auth.actions';
import {noop} from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {

    this.form = fb.group({
      email: ['test@test.com', [Validators.required]],
      password: ['test', [Validators.required]]
    });

  }

  ngOnInit() {

  }

  login() {
    const formValue = this.form.value;

    this.auth.login(formValue.email, formValue.password).pipe(
      tap(user => {
        console.log('user information : ', user);
        this.store.dispatch(login({user}));
        this.router.navigateByUrl('/courses');
      })
    ).subscribe(
      noop,
      error => alert(error)
    );
  }

}

