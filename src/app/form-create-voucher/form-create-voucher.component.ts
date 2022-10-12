import {AfterContentChecked, Component, Inject, OnInit} from '@angular/core';
import {VoucherService} from "../service/voucher.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Router} from "@angular/router";
import {max} from "rxjs";
import {Voucher} from "../model/Voucher";
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-create-voucher',
  templateUrl: './form-create-voucher.component.html',
  styleUrls: ['./form-create-voucher.component.css']
})
export class FormCreateVoucherComponent implements OnInit, AfterContentChecked {
  customerCurrentId!: any
  voucherForm!: FormGroup;
  customer_id!: number | undefined
  idVoucherUpdate!: number
  vouchers: Voucher [] = []

  constructor(private voucherService: VoucherService,
              private formGroup: FormBuilder,
              private dialog: MatDialog,
              private storage: AngularFireStorage,
              @Inject(MAT_DIALOG_DATA) public editData: any,
              private router: Router,
              private dialogRef: MatDialogRef<FormCreateVoucherComponent>
  ) {
  }

  ngOnInit(): void {
    console.log(this.editData)
    localStorage.setItem("idCustomer", "1")
    // @ts-ignore
    this.customerCurrentId = parseInt(localStorage.getItem("idCustomer"))
    this.displayVoucher()
    this.voucherForm = this.formGroup.group({
      id: [''],
      name: ['', Validators.required],
      discount: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      quantity: ['', [Validators.required, Validators.max(20)]],
      customer: [''],
    })


  }

  ngAfterContentChecked(): void {
  }

  displayVoucher() {
    this.voucherService.findAllByStore_Id().subscribe(value => {
      this.vouchers = value;
    })
  }

  displayFormCreate() {
    let modal = document.getElementById("myModal");
    // @ts-ignore
    modal.style.display = "block";
    // @ts-ignore
    this.voucherForm()
  }


  closeFromCreate() {
    let modal = document.getElementById("myModal");
    // @ts-ignore
    modal.style.display = "none";
    // @ts-ignore
    document.getElementById("detailModal").style.display = "none"
  }

  createVoucher() {
    let voucher = {
      id: this.voucherForm.value.id,
      name: this.voucherForm.value.name,
      discount: this.voucherForm.value.discount,
      quantity: this.voucherForm.value.quantity,
    }
    this.voucherService.createVoucher(voucher).subscribe(value => {
      this.createSuccess()
      // @ts-ignore
      document.getElementById("mymodal").style.display = "none"
      this.displayVoucher()
      console.log(value)
    }, error => {
      Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Tạo mới thất bại',
          showConfirmButton: false,
          timer: 1500
        }
      )
    })
    // @ts-ignore
    document.getElementById("rest").click()
  }

  // saveVoucher() {
  //   if (!this.editData) {
  //     // @ts-ignore
  //     let id = parseInt(localStorage.getItem("idCustomer"))
  //     let voucher = {
  //       name: this.voucherForm.value.name,
  //       discount: this.voucherForm.value.discount,
  //       quantity: this.voucherForm.value.quantity,
  //       customer: {
  //         id: id
  //       }
  //     }
  //     this.voucherService.createVoucher(voucher).subscribe(value => {
  //       console.log(value)
  //       this.voucherForm.reset()
  //       this.dialogRef.close('Create')
  //       this.createSuccess()
  //     }, error => {
  //       Swal.fire({
  //         position: 'center',
  //         icon: 'error',
  //         title: 'Tạo mới thất bại',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //     })
  //   } else {
  //     this.updateVoucher()
  //   }
  // }

  updateSuccess() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cập nhật thành công',
      showConfirmButton: false,
      timer: 1500
    })
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


}
