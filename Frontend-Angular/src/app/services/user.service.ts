import { Injectable } from '@angular/core';
import {Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import  { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  authToken:any;
  user:any;


  constructor(private http:Http, private route:Router) { }
  
  registerService(user) {
    let headers =  new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register',user,{headers:headers})
    .pipe(map(res => res.json()));
  }

  // Login Service
  loginService(credentials) {    
    let headers =  new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate',credentials,{headers:headers})
    .pipe(map(res => res.json()));
  } 

  storeUserData(token,user) {
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getProfile(){
    let headers =  new Headers();
    headers.append('Content-Type','application/json');
    this.loadToken();
    headers.append('Authorization',this.authToken);
    return this.http.get('http://localhost:3000/users/profile',{headers:headers})
    .pipe(map(res => res.json()));
  }


  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }



}
