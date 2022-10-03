import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {Product} from "../model/Product";
import {Brand} from "../model/Brand";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductService} from "../service/product.service";
import {MatDialog} from "@angular/material/dialog";
import Swal from "sweetalert2";
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {finalize, Observable} from "rxjs";
import {ProductDTO} from "../model/productDTO";

@Component({
  selector: 'app-form-create-product',
  templateUrl: './form-create-product.component.html',
  styleUrls: ['./form-create-product.component.css']
})
export class FormCreateProductComponent implements OnInit, AfterContentChecked {
  downloadURL: Observable<string> | undefined;
  fb: any;
  listURL: any [] = []
  selectedImages: any[] = []
  products: ProductDTO[] = []
  brands: Product [] = []
  categories: Product [] = []
  listBrandByCategory: Brand [] = []
  productForm!: FormGroup;
  category_id!: number
  constructor(private productService: ProductService,
              private formGroup: FormBuilder,
              private dialog: MatDialog,
              private storage : AngularFireStorage) { }
  ngOnInit(): void {
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
      name: [''],
      price: [''],
      amount: [''],
      color: [''],
      description: [''],
      status: [''],
      discount: [''],
      brand: [''],
      category: [''],
      customer: [''],
    })
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
  createProduct(){
    let product = {
      id: this.productForm.value.id,
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
        id: this.productForm.value.customer
      }
    }
    this.productService.createProduct(product).subscribe(value => {
      console.log(value)
      this.createSuccess()
      // @ts-ignore
      this.displayProducts()
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Tạo mới thất bại',
        showConfirmButton: false,
        timer: 1500
      })
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
            fileRef.getDownloadURL().subscribe(url => {
              console.log(url)
              this.listURL.push(url)

            });
          })
        ).subscribe()
      }    }
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
}
