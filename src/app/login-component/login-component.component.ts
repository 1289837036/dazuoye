import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';


function userNameValidator(control: FormControl): {[s: string]: boolean}{
  if( !control.value.match(/^a/)){
    return{invalidUser: true};
  }
}

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  //对应我们登陆的表单
  myForm: FormGroup;
  
  //输入用户名的输入控件
  userName:AbstractControl;

   //输入密码的输入控件
   password:AbstractControl;

   name$: Observable<string>;
   baseUrl = 'http://127.0.0.1:8080/';
  
   constructor(private fb: FormBuilder, private authService: AuthService, private httpClient: HttpClient, private router: Router){
    this.myForm = this.fb.group(
      {
        'userName' : ['aaa',Validators.compose([Validators.required,userNameValidator])],
        'password' : ['',Validators.compose([Validators.required, Validators.minLength(5)])]
    }
    );

    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
    this.name$ = this.userName.valueChanges;
    this.userName.valueChanges.subscribe(val =>{
      console.log(val);
    })
  }
  
  login() {
    console.log(this.myForm.value);
    this.httpClient.post(this.baseUrl + 'yanzheng',
      this.myForm.value).subscribe(
        (val: any) => {
          console.log(val);
          if (val.succ) {
            this.authService.login();
            this.router.navigate(['/management']);
          }
        });
  

  }

  onSubmit(value:any){
    if(this.myForm.invalid){
      alert('表单无效!');
      return;
    }
    console.log(value);
  }

  ngOnInit(): void {
  }

}
