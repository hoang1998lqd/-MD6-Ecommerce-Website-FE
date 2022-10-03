import {AfterContentChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ProductService} from "../service/product.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Product} from "../model/Product";
import {Brand} from "../model/Brand";import Swal from 'sweetalert2'
import {FormCreateProductComponent} from "../form-create-product/form-create-product.component";
import {ProductDTO} from "../model/ProductDTO";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {LiveAnnouncer} from "@angular/cdk/a11y";


@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.css']
})
export class AdminTableComponent implements OnInit, AfterContentChecked , AfterViewInit{
  listProduct!: MatTableDataSource<ProductDTO>
  products: ProductDTO [] = []
  brands: Product [] = []
  categories: Product [] = []
  idProductUpdate!: number;
  productForm!: FormGroup;

  // displayedColumns: string[] = ['name','price','amount','color','description','image']
  displayedColumns: string[] = ['stt','name', 'price', 'amount', 'color','image','edit','delete'];

  constructor(private productService: ProductService,
              private formGroup: FormBuilder,
              private dialog: MatDialog ,
              private _liveAnnouncer: LiveAnnouncer) { }

  ngAfterViewInit(): void {
        // @ts-ignore
    this.listProduct.sort = this.sort
    }
  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort ;
  @ViewChild('empTbSort') empTbSort = new MatSort();
  @ViewChild('empTbSortWithObject') empTbSortWithObject = new MatSort();

  ngOnInit(): void {
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
    const script5 = document.createElement('link');
    script2.href = "https://use.fontawesome.com/releases/v5.2.0/css/all.css\" integrity=\"sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ\" crossorigin=\"anonymous";
    script2.rel = "stylesheet";
    document.body.appendChild(script5);
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
  openDialog() {
    const dialogRef = this.dialog.open(FormCreateProductComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Create'){
        this.displayProducts();
      }
    });
  }

  displayProducts() {
    this.productService.findAllProducts().subscribe(value => {
      // @ts-ignore
      this.listProduct = new MatTableDataSource(value)
      // @ts-ignore
      this.listProduct.paginator = this.paginator
      this.listProduct.connect()


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

  deleteProduct(id: number){
    // this.productService.deleteProduct(id)
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: "Dữ liệu sẽ không thể khôi phục!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý!',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe(value => {
          this.displayProducts()
        }, error => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Xóa thất bại',
            showConfirmButton: false,
            timer: 1500
          })
        })
        Swal.fire(
          'Xóa thành công!',
          'Dữ liệu đã bị xóa bỏ',
          'success'
        )
      }
    })

  }

  getProductUpdate(id: number){
    this.productService.getProductById(id).subscribe(value => {
      this.dialog.open(FormCreateProductComponent,{width : '30%', data : value}).afterClosed().subscribe(value1 => {
        if (value1 === 'Update'){
          this.displayProducts()
        }
      })
    })
  }


}
