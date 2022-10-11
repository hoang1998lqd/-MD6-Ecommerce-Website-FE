import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {Customer} from "../model/Customer";
import {Role} from "../model/Role";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../service/customer.service";
import {data, error} from "jquery";
import {first} from "rxjs";
import {Router} from "@angular/router";
import {F} from "@angular/cdk/keycodes";
@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  customer!: Customer
  role!: Role
  customerForm!: FormGroup
  loginForm!: FormGroup

  constructor(private customerService: CustomerService,
              private formGroup: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = './assets/js/ajax-mail.js';
    document.body.appendChild(script);
    const script1 = document.createElement('script');
    script1.src = './assets/js/vendor/modernizr-2.8.3.min.js';
    document.body.appendChild(script1);

    this.customerForm = this.formGroup.group({
      id: new FormControl(""),
      name: new FormControl("", Validators.compose([Validators.required, Validators.minLength(8)])),
      emailAddress: new FormControl("", Validators.compose([Validators.required, Validators.email])),
      password: new FormControl("", Validators.compose([Validators.required, Validators.pattern("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$")])),
      phoneNumber: new FormControl("", Validators.compose([Validators.required, Validators.pattern("^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$")])),
      address: new FormControl("", Validators.compose([Validators.required, Validators.minLength(5)])),
      image: new FormControl(""),
      status: new FormControl(""),
      role: new FormControl(""),
    });

    this.loginForm = new FormGroup({
      usename: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    })
  }

  createCustomer(){
    // @ts-ignore
    const repassword = document.getElementById("repassword").value
    let customer = {
      id: this.customerForm.value.id,
      name: this.customerForm.value.name,
      emailAddress: this.customerForm.value.emailAddress,
      password: this.customerForm.value.password,
      phoneNumber: this.customerForm.value.phoneNumber,
      address: this.customerForm.value.address,
      image: this.customerForm.value.image,
      status: 1,
      role:[
        {
          id: 1
        }
      ]
    }
    if (repassword == this.customerForm.value.password){
      this.customerService.createCustomer(customer).subscribe(value => {
        let idCustomer = value.id
        let cart = {
          customer :{
            id : idCustomer
          }
        }
        return this.customerService.createCart(cart).subscribe(value1 => {
          console.log(value1)
          this.createSuccess()
          this.customerForm.reset()
        })
        }, error1 => {
          this.createFail()
        }
      )
    }else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Mật khẩu nhập lại không đúng',
        showConfirmButton: false,
        timer: 1500
      })
    }

  }

  createSuccess() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Tạo mới thành công',
      showConfirmButton: false,
      timer: 1500
    })
  }

  loginSuccess() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Đăng nhập thành công',
      showConfirmButton: false,
      timer: 1500
    })
    return true;
  }

  createFail(){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Tạo mới thất bại',
      showConfirmButton: false,
      timer: 1500
    })
  }

  loginFail(){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Đăng nhập thất bại',
      showConfirmButton: false,
      timer: 1500
    })
  }

  loginCustomer(){
    console.log(this.loginForm.value.usename)
    console.log(this.loginForm.value.password)

    this.customerService.loginCustomer(this.loginForm.value.usename, this.loginForm.value.password)
      .pipe(first())
      .subscribe(value => {
        console.log(value)
        // @ts-ignore
        localStorage.setItem("username", value.username);
        // @ts-ignore
        localStorage.setItem("roles",value.roles[0].authority);
        // @ts-ignore
        localStorage.setItem("idCustomer",value.id);
        // @ts-ignore
        localStorage.setItem("token",value.token);
          // @ts-ignore
          this.directCustomer(value.roles[0].authority)
      }, error =>{
        this.loginFail()
      })
  }
  directCustomer(roles?: string){
    if (roles == "ADMIN"){
     this.router.navigate(['admin'])
    }
    if (roles == "SELLER"){
      this.router.navigate(['shop'])
    }
    if (roles == "CUSTOMER"){
      this.router.navigate(['shop'])
    }
  }

  ngAfterContentChecked(){
    const script2 = document.createElement('script');
    script2.src = './assets/js/vendor/jquery-1.12.4.min.js';
    document.body.appendChild(script2);
    const script3 = document.createElement('script');
    script3.src = './assets/js/vendor/popper.min.js';
    document.body.appendChild(script3);
    const script4 = document.createElement('script');
    script4.src = './assets/js/bootstrap.min.js';
    document.body.appendChild(script4);
    const script5 = document.createElement('script');
    script5.src = './assets/js/ajax-mail.js';
    document.body.appendChild(script5);
    const script6 = document.createElement('script');
    script6.src = './assets/js/jquery.meanmenu.min.js';
    document.body.appendChild(script6);
    const script7 = document.createElement('script');
    script7.src = './assets/js/wow.min.js';
    document.body.appendChild(script7);
    const script8 = document.createElement('script');
    script8.src = './assets/js/slick.min.js';
    document.body.appendChild(script8);
    const script9 = document.createElement('script');
    script9.src = './assets/js/owl.carousel.min.js';
    document.body.appendChild(script9);
    const script10 = document.createElement('script');
    script10.src = './assets/js/jquery.magnific-popup.min.js';
    document.body.appendChild(script10);
    const script11 = document.createElement('script');
    script11.src = './assets/js/isotope.pkgd.min.js';
    document.body.appendChild(script11);
    const script12 = document.createElement('script');
    script12.src = './assets/js/imagesloaded.pkgd.min.js';
    document.body.appendChild(script12);
    const script13 = document.createElement('script');
    script13.src = './assets/js/jquery.mixitup.min.js';
    document.body.appendChild(script13);
    const script14 = document.createElement('script');
    script14.src = './assets/js/jquery.countdown.min.js';
    document.body.appendChild(script14);
    const script15 = document.createElement('script');
    script15.src = './assets/js/jquery.counterup.min.js';
    document.body.appendChild(script15);
    const script16 = document.createElement('script');
    script16.src = './assets/js/waypoints.min.js';
    document.body.appendChild(script16);
    const script17 = document.createElement('script');
    script17.src = './assets/js/jquery.barrating.min.js';
    document.body.appendChild(script17);
    const script18 = document.createElement('script');
    script18.src = './assets/js/jquery-ui.min.js';
    document.body.appendChild(script18);
    const script19 = document.createElement('script');
    script19.src = './assets/js/venobox.min.js';
    document.body.appendChild(script19);
    const script20 = document.createElement('script');
    script20.src = './assets/js/jquery.nice-select.min.js';
    document.body.appendChild(script20);
    const script21 = document.createElement('script');
    script21.src = './assets/js/scrollUp.min.js';
    document.body.appendChild(script21);
    const script22 = document.createElement('script');
    script22.src = './assets/js/main.js';
    document.body.appendChild(script22);
  }

}
