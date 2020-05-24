import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grade } from './grade';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.css']
})
export class ProductComponentComponent implements OnInit {

  myForm: FormGroup;
  Name: AbstractControl;
  id:AbstractControl;
  chengji: AbstractControl;
  grades$: Observable<Grade>;
  baseUrl = 'http://127.0.0.1:8080/';
  currentGrade: Grade;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) { 
    this.myForm = this.fb.group({
      'Name': [''],
      'chengji': [''],
      'id': ['']
    });

    this.Name = this.myForm.controls['Name'];
    this.id= this.myForm.controls['id'];
    this.chengji = this.myForm.controls['chengji'];
   }

  ngOnInit(): void {
    this.grades$ = <Observable<Grade>>this.httpClient.get(this.baseUrl + 'grades');
  }

  search1(){
    if(this.id.value) {
      this.grades$ = <Observable<Grade>>this.httpClient.get(this.baseUrl + 'grades/'+this.id.value);
    }else{
      this.grades$ = <Observable<Grade>>this.httpClient.get(this.baseUrl + 'grades');
    }
  }

  add1(){
    console.log(this.myForm.value);
    this.httpClient.post(this.baseUrl + 'grade', this.myForm.value).subscribe(
      (val: any) => {
        if(val.succ) {
          alert('添加成功');
        }
      }
    )
  }

  select1(u: Grade){
    this.currentGrade = u;
    this.myForm.setValue(this.currentGrade);
  }

  delete1(){
    if(!this.currentGrade){
      alert('必须先选择用户');
    }
    else{
      this.httpClient.delete(this.baseUrl + 'grade/' + this.currentGrade.id).subscribe(
        (val: any) => {
          alert('删除成功');
        }
      )
    }
  }

  update1(){
    if(!this.currentGrade){
      alert('必须先选择用户');
    }
    else{
      this.httpClient.put(this.baseUrl + 'grade', this.myForm.value).subscribe(
        (val: any) => {
          alert('修改成功');
        }
      )
    }
  }
}
