import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { RouterModule, Routes,Router }  from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  model: any = {};
   loading = false;

  form: FormGroup;

  constructor(public http: Http,  private router: Router) { }

  ngOnInit() {

    // this.form = this.formBuilder.group({
    //   email: [null, [Validators.required, Validators.email]],
    //   password: [null, Validators.required],
    // });

  }

  login(username:string,Paasword:string)
  {
    console.log("Hello Log in Module is ready!!");
    console.log(username,Paasword);
  }

   submitForm(form: any): void{
    console.log('Form Data: ');
    console.log(form);
    let body = form;
     this.http.post('http://localhost:3000/api/auth/login', body)
      .subscribe(
        response => {
          localStorage.setItem('id_token', response.json().token);

          //this.router.navigate(['home']);
          console.log(response.json().message);
          alert("Log in Successfully!");
            // console.log(response);
            this.router.navigate(['/user']);
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }


   save(form: any): void{
    console.log('Form Data: ');
    console.log(form);
    let body = form;
    this.http.post('http://localhost:3000/api/auth/register', body)
      .subscribe(
        response => {
          //localStorage.setItem('id_token', response.json().token);
          console.log(response);
           alert("Registration Successfully!");
          //  this.bs-login-sm.open();
          //  this.router.navigate(['/user']);

           console.log(body);
        },
    //     error => {
    //       alert(error.text());
    //       console.log(error.text());
    //     }
      );
   // console.log(body);


  }
// register() {
//         this.loading = true;
        
            
//}
 
  
}
