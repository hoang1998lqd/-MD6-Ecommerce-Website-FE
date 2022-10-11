import {AfterContentChecked, Component, Inject, Injectable, OnInit} from '@angular/core';

import {Brand} from "../model/Brand";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../service/product.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import Swal from "sweetalert2";
// @ts-ignore
import {AngularFireStorage, AngularFireStorageReference} from "@angular/fire/compat/storage";
import {finalize, Observable} from "rxjs";

import {ProductDTO} from "../model/ProductDTO";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AdminTableComponent} from "../admin-table/admin-table.component";
import {Product} from "../model/Product";


@Component({
  selector: 'app-form-create-product',
  templateUrl: './form-create-product.component.html',
  styleUrls: ['./form-create-product.component.css']
})
export class FormCreateProductComponent implements OnInit, AfterContentChecked {
  actionBtn : string = "Create"
  idBrandUpdate !: number
  idCategoryUpdate !: number
  customerCurrentId!: any
  idProductUpdate!: number
  fb: any;
  listURL: any [] = []
  selectedImages: any[] = []
  products: ProductDTO [] = []
  brands: Product [] = []
  categories: Product [] = []
  listBrandByCategory: Brand [] = []
  productForm!: FormGroup;
  category_id!: number
  constructor(private productService: ProductService,
              private formGroup: FormBuilder,
              private dialog: MatDialog,
              private storage : AngularFireStorage,
              @Inject(MAT_DIALOG_DATA) public editData : any,
              private router: Router,
              private dialogRef : MatDialogRef<FormCreateProductComponent>
  ) { }
  ngOnInit(): void {
    console.log(this.editData)
    localStorage.setItem("idCustomer", "1")
    // @ts-ignore
    this.customerCurrentId = parseInt(localStorage.getItem("idCustomer"))
    // @ts-ignore
    this.category_id = document.getElementById("category_id").value
    const script1 = document.createElement('link');
    script1.href = "./assets/admin/vendor/fontawesome-free/css/all.min.css";
    script1.rel = "stylesheet";
    script1.type = "text/css";
    document.body.appendChild(script1);
    const script2 = document.createElement('link');
    script2.href = "https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i";
    script2.rel = "stylesheet";
    document.body.appendChild(script2);
    const script3 = document.createElement('link');
    script3.href = "./assets/admin/css/sb-admin-2.min.css";
    script3.rel = "stylesheet";
    document.body.appendChild(script3);
    const script = document.createElement('link');
    script.href = "./assets/admin/vendor/datatables/dataTables.bootstrap4.min.css";
    script.rel = "stylesheet";
    document.body.appendChild(script);
    const script4 = document.createElement('body');
    script4.id = "page-top"
    document.body.appendChild(script4);
    this.displayProducts()
    this.displayBrands()
    this.displayCategories()
    this.productForm = this.formGroup.group({
      id: [''],
      name: ['',Validators.required],
      price: ['',[Validators.required,Validators.pattern("[1-9]")]],
      amount: ['',Validators.required],
      color: ['',Validators.required],
      description: [''],
      status: [''],
      discount: ['',Validators.pattern("[0-9]")],
      brand: ['',Validators.required],
      category: ['',Validators.required],
      customer: [''],
    })
    if (this.editData){
      this.actionBtn = "Update"
      this.productForm.patchValue(this.editData)
      this.productForm.controls['color'].setValue(this.editData.color)
      this.productForm.controls['description'].setValue(this.editData.description)
      this.productForm.controls['discount'].setValue(this.editData.discount)
      this.idBrandUpdate = this.editData.brand.id;
      this.idCategoryUpdate = this.editData.category.id;
      this.idProductUpdate = this.editData.id;
    }
  }
  ngAfterContentChecked(){
    const script5 = document.createElement('script');
    script5.src = "./assets/admin/vendor/jquery/jquery.min.js";
    document.body.appendChild(script5);
    const script6 = document.createElement('script');
    script6.src = "./assets/admin/vendor/bootstrap/js/bootstrap.bundle.min.js";
    document.body.appendChild(script6);
    const script7 = document.createElement('script');
    script7.src = "./assets/admin/vendor/jquery-easing/jquery.easing.min.js";
    document.body.appendChild(script7);
    const script8 = document.createElement('script');
    script8.src = "./assets/admin/js/sb-admin-2.min.js";
    document.body.appendChild(script8);
    const script9 = document.createElement('script');
    script9.src = "./assets/admin/vendor/datatables/jquery.dataTables.min.js";
    document.body.appendChild(script9);
    const script10 = document.createElement('script');
    script10.src = "/assets/admin/vendor/datatables/dataTables.bootstrap4.min.js";
    document.body.appendChild(script10);
    const script11 = document.createElement('script');
    script11.src = "./assets/admin/js/demo/datatables-demo.js";
    document.body.appendChild(script11);
  }

  displayProducts() {
    this.productService.findAllProducts().subscribe(value => {
      this.products = value;
    })
  }
  displayBrands() {
    this.productService.findAllBrands().subscribe(value => {
      this.brands = value;
    })
  }

  displayCategories() {
    this.productService.findAllCategories().subscribe(value => {
      this.categories = value;
    })
  }

  findBrandByCategory(){
    let id = this.productForm.value.category
    this.productService.findBrandByCategory(id).subscribe(value => {
      this.listBrandByCategory = value;
    })

  }
  saveProduct(){
    if (!this.editData){
      // @ts-ignore
      let id = parseInt(localStorage.getItem("idCustomer"))
      let product = {
        name: this.productForm.value.name,
        price: this.productForm.value.price,
        amount: this.productForm.value.amount,
        color: this.productForm.value.color,
        description: this.productForm.value.description,
        discount: this.productForm.value.discount,
        brand: {
          id: this.productForm.value.brand
        },
        category: {
          id: this.productForm.value.category
        },
        customer: {
          id: id
        }
      }
      this.productService.createProduct(product).subscribe(value => {
        if (this.selectedImages.length !== 0){
          if (this.selectedImages.length <= 4){
            console.log(this.selectedImages.length)
            for (let i = 0; i < this.selectedImages.length; i++) {
              let selectedImage = this.selectedImages[i];
              var n = Date.now();
              const filePath = `Images/${n}`;
              const fileRef = this.storage.ref(filePath);
              this.storage.upload(filePath, selectedImage).snapshotChanges().pipe(
                finalize(() =>{
                  fileRef.getDownloadURL().subscribe(url => {
                    console.log(url)
                    this.listURL.push(url)
                    let image= {
                      name: url,
                      product :{
                        id:value.id
                      }
                    }
                    this.productService.saveImage(image).subscribe(() => {
                      console.log("Create Successfully")
                    })
                  });
                })
              ).subscribe()
            }
          }else if (this.selectedImages.length > 4){
            console.log(this.selectedImages.length)
            for (let i = 0; i < 4; i++) {
              let selectedImage = this.selectedImages[i];
              var n = Date.now();
              const filePath = `Images/${n}`;
              const fileRef = this.storage.ref(filePath);
              this.storage.upload(filePath, selectedImage).snapshotChanges().pipe(
                finalize(() =>{
                  fileRef.getDownloadURL().subscribe(url => {
                    console.log(url)
                    this.listURL.push(url)
                    let image= {
                      name: url,
                      product :{
                        id:value.id
                      }
                    }
                    this.productService.saveImage(image).subscribe(() => {
                      console.log("Create Successfully")
                    })
                  });
                })
              ).subscribe()
            }
          }
        }
        console.log(value)
        this.productForm.reset()
        this.dialogRef.close('Create')
        this.createSuccess()
      }, error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Tạo mới thất bại',
          showConfirmButton: false,
          timer: 1500
        })
      })
    }else {
      this.updateProduct()
    }
  }

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

  createImage() {
    if (this.selectedImages.length !== 0){
      for (let i = 0; i < this.selectedImages.length; i++) {
        let selectedImage = this.selectedImages[i];
        var n = Date.now();
        const filePath = `Images/${n}`;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, selectedImage).snapshotChanges().pipe(
          finalize(() =>{
            fileRef.getDownloadURL().subscribe((url: any) => {
              console.log(url)
              this.listURL.push(url)

            });
          })
        ).subscribe()
      }
    }
  }

  showPreview(event: any){
    if (event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImages = event.target.files;
      console.log(this.selectedImages)
    }else {
      this.selectedImages = []
    }
    this.createImage();

  }

  updateProduct(){
    // @ts-ignore
    let id = parseInt(localStorage.getItem("idCustomer"))
    let product = {
      id: this.idProductUpdate,
      name: this.productForm.value.name,
      price: this.productForm.value.price,
      amount: this.productForm.value.amount,
      color: this.productForm.value.color,
      description: this.productForm.value.description,
      discount: this.productForm.value.discount,
      brand: {
        id: this.productForm.value.brand
      },
      category: {
        id: this.productForm.value.category
      },
      customer: {
        id: id
      }
    }
    this.productService.updateProduct(product).subscribe(value => {
      if (this.selectedImages.length !== 0){
        if (this.selectedImages.length <= 4){
          console.log(this.selectedImages.length)
          this.productService.getIdImageUpdate(this.idProductUpdate).subscribe(value1 => {
            for (let j = 0; j < value1.length; j++) {
              for (let i = 0; i < this.selectedImages.length; i++) {
                let selectedImage = this.selectedImages[i];
                var n = Date.now();
                const filePath = `Images/${n}`;
                const fileRef = this.storage.ref(filePath);
                this.storage.upload(filePath, selectedImage).snapshotChanges().pipe(
                  finalize(() =>{
                    fileRef.getDownloadURL().subscribe(url => {
                      console.log(url)
                      this.listURL.push(url)
                      let image= {
                        id: value1[j],
                        name: url,
                        product :{
                          id:value.id
                        }
                      }
                      this.productService.updateImage(image).subscribe(() => {
                        console.log("Create Successfully")
                      })
                    });
                  })
                ).subscribe()
              }
            }
          })
          }
        }else if (this.selectedImages.length > 4){
          console.log(this.selectedImages.length)
        this.productService.getIdImageUpdate(this.idProductUpdate).subscribe(value1 => {
          for (let j = 0; j < value1.length; j++) {
            for (let i = 0; i < 4; i++) {
              let selectedImage = this.selectedImages[i];
              var n = Date.now();
              const filePath = `Images/${n}`;
              const fileRef = this.storage.ref(filePath);
              this.storage.upload(filePath, selectedImage).snapshotChanges().pipe(
                finalize(() =>{
                  fileRef.getDownloadURL().subscribe(url => {
                    console.log(url)
                    this.listURL.push(url)
                    let image= {
                      id: value1[j],
                      name: url,
                      product :{
                        id:value.id
                      }
                    }
                    this.productService.updateImage(image).subscribe(() => {
                      console.log("Create Successfully")
                    })
                  });
                })
              ).subscribe()
            }
          }
        })
        }
      console.log(value)
      this.productForm.reset()
      this.dialogRef.close('Update')
      this.updateSuccess()
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Cập nhật thất bại',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }


}


