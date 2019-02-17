import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { TrySignup } from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const { email, password } = form.value;
    this.store.dispatch(new TrySignup({ email, password }));
  }

}
