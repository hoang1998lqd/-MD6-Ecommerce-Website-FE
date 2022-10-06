import {Component, OnInit} from '@angular/core';
import {ProductDTO} from "../model/ProductDTO";
import {ProductService} from "../service/product.service";
import {Brand} from "../model/Brand";
import {Category} from "../model/Category";
import {CartService} from "../service/cart.service";
import {Item} from "../model/Item";
import Swal from "sweetalert2";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products: ProductDTO [] = []
  brands: Brand [] = []
  categories: Category [] = []
  roles: any[] = []
  brandsLaptop: Brand [] = []
  brandsPhone: Brand [] = []
  brandsTv: Brand [] = []
  brandsCamera: Brand [] = []
  brandsFridge: Brand [] = []
  brandsTablet: Brand [] = []
  items: Item [] = []
  listProduct: ProductDTO [] = []
  // @ts-ignore
  idCustomerCurrent!: number
  constructor(private productService: ProductService,
              private cartService: CartService
  ) {
  }

  ngOnInit(): void {
    const script1 = document.createElement('script');
    script1.src = './assets/js/vendor/modernizr-2.8.3.min.js';
    document.body.appendChild(script1);
    // this.displayProducts()
    this.displayBrands();
    this.displayCategories()
    this.findBrandByFridge()
    this.findBrandByCamera()
    this.findBrandByTv()
    this.findBrandByLaptop()
    this.findBrandByPhone()
    this.findBrandByTablet()
    this.displayItem()
    this.findProductByCustomerId()
  }

  ngAfterContentInit() {
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

  // Product của người bán hàng
  // displayProducts() {
  //   // @ts-ignore
  //   let idCustomer = parseInt(localStorage.getItem("idCustomer"))
  //   this.productService.findAllProductByCustomerId(idCustomer).subscribe(value => {
  //     this.products= value
  //   })
  // }

  displayProductsByValue(value: ProductDTO []){
    // @ts-ignore
    this.listProduct = value
  }
  //Products của người mua hàng gồm cả người bán hàng nhưng không có sản phẩm của người bán đó
  // Đấy là list Product hiển thị trên trang bán hàng
  findProductByCustomerId(){
    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    this.productService.findAllProductNotCustomerId(idCustomer).subscribe(value => {
      this.listProduct = value
    })
  }


  displayItem(){
    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    this.cartService.findAllItemByCustomerId(idCustomer).subscribe(value => {
      this.items = value;
    })
  }

  addToCart(idProduct?: number) {

    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    this.cartService.findAllItemByCustomerId(idCustomer).subscribe(value => {
      this.items = value;
      let flag = false;
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].product!.id == idProduct) {
          flag = true;
          // @ts-ignore
          let quantity = this.items[i].quantity + 1;
          // @ts-ignore
          if (quantity > this.items[i].product.amount) {
            // @ts-ignore
            quantity = this.items[i].product.amount
          }
          let item= {
            id : this.items[i].id,
            quantity : quantity,
            cart:{
              id: idCustomer
            },
            product:{
              id: idProduct
            }
          }
          this.cartService.updateItemToCart(item).subscribe(value1 => {
            console.log(value1)
            this.addItemToCartSuccess()
            setTimeout(() => {
              this.ngOnInit()
            } ,2000)
          })
        }
      }
      if (!flag){
        let quantity = 1;
        let item = {
          quantity : quantity,
          cart:{
            id: idCustomer
          },
          product:{
            id: idProduct
          }
        }
        this.cartService.saveItemToCart(item).subscribe(value1 => {
          console.log(value1);
          this.addItemToCartSuccess()
          setTimeout(() => {
            this.ngOnInit()
          } ,2000)
        })
      }
    })

  }

  deleteItem(idItem?: number){
    Swal.fire({
      title: 'Xóa sản phẩm',
      text: "Xóa sản phẩm khỏi giỏ hàng",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý!',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.deleteItem(idItem).subscribe(value => {

        }, error => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Xóa thất bại',
            showConfirmButton: false,
            timer: 1500
          })
        })
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Xóa sản phẩm thành công',
          showConfirmButton: false,
          timer: 1500
        })
      }
      this.ngOnInit()
      // @ts-ignore
      document.getElementById('cart').style.display = "none"

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

  findBrandByLaptop() {
    this.productService.findBrandByCategory(1).subscribe(value => {
      this.brandsLaptop = value
    })
  }

  findBrandByPhone() {
    this.productService.findBrandByCategory(1).subscribe(value => {
      this.brandsPhone = value
    })
  }

  findBrandByTv() {
    this.productService.findBrandByCategory(1).subscribe(value => {
      this.brandsTv = value
    })
  }

  findBrandByCamera() {
    this.productService.findBrandByCategory(1).subscribe(value => {
      this.brandsCamera = value
    })
  }

  findBrandByFridge() {
    this.productService.findBrandByCategory(1).subscribe(value => {
      this.brandsFridge = value
    })
  }

  findBrandByTablet() {
    this.productService.findBrandByCategory(1).subscribe(value => {
      this.brandsTablet = value
    })
  }
  findImageURLFirst(idProduct: any): any {
    let imageURL: any;
    let flag = false;
    if (idProduct != null){
      for (let i = 0; i < this.listProduct.length; i++) {
        // @ts-ignore
        if (this.listProduct[i].product.id == idProduct){
          flag = true
          // @ts-ignore
          imageURL = this.listProduct[i].imageURLS[0]
          return imageURL;
        }
      }
    }
  }


  addItemToCartSuccess() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Thêm vào giỏ hàng thành công',
      showConfirmButton: false,
      timer: 1500
    })
  }

  changePrice(money?: number) : any {
    const formatter = new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'VND',
    })
    if (money != null){
      return formatter.format(money);
    }

  }

  searchByNameProduct() {
    let idCustomer = localStorage.getItem("idCustomer")
    // @ts-ignore
    let name = document.getElementById("searchByName").value
    if (name == null){
        this.findProductByCustomerId()
    }else {
      this.productService.findProductByName(idCustomer,name).subscribe(value => {
        this.displayProductsByValue(value)
      })
    }
  }

  searchByPrice(){
    let idCustomer = localStorage.getItem("idCustomer")
    // @ts-ignore
    let priceMin = document.getElementById("priceMin").value
    // @ts-ignore
    let priceMax = document.getElementById("priceMax").value
    this.productService.findProductByPrice(idCustomer, priceMin, priceMax).subscribe(value => {
      this.displayProductsByValue(value)
    })
  }

  // searchByIdCategory() {
  //   let idCustomer = localStorage.getItem("idCustomer")
  //   // @ts-ignore
  //   let idCategory = document.getElementById("{{category.id}}").value
  //     this.productService.findProductByCategory(idCustomer, idCategory).subscribe(value => {
  //       this.displayProductsByValue(value)
  //     })
  // }
}
