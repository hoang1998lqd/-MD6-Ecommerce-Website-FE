import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ProductService} from "../service/product.service";
import {CartService} from "../service/cart.service";
import {Item} from "../model/Item";
import Swal from "sweetalert2";
import {ProductDTO} from "../model/ProductDTO";
import {ThemePalette} from "@angular/material/core";
import {CustomerService} from "../service/customer.service";
import {Customer} from "../model/Customer";
import {DTOItem} from "../model/DTOItem";

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  items: Item [] = []
  discountItem: number = 0;
  voucherItem: number = 0;
  // Những tài khoản có quyền bán hàng
  listCustomerHaveShop: Customer [] = []
  listProduct: ProductDTO [] = []
  subtotal: number = 0;
  total: number = 0;
  DTOItems: DTOItem [] = []
  idCurrentCustomer : number = 0
  // @ts-ignore
  idCustomerCurrent: number
  // List Shop in Cart
  listShopCurrent: Customer [] = []
  subtasks = {name: 'Warn', completed: false, color: 'warn'}

  constructor(private productService: ProductService,
              private cartService: CartService,
              private customerService: CustomerService,
  ) {
  }

  ngOnInit(): void {
    const script1 = document.createElement('script');
    script1.src = './assets/js/vendor/modernizr-2.8.3.min.js';
    document.body.appendChild(script1);
    this.displayItem()
    this.findProductByCustomerId()
    this.findAllCustomerHaveShop()
    this.findShopInCart()
    this.findAllDTOItem()

  }

  ngAfterContentChecked() {
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
    script22.src = '/assets/js/main.js';
    document.body.appendChild(script22);

  }

  // Hiển thị danh sách sản phẩm được thêm vào giỏ hàng nhưng chưa được hình thành đơn hàng
  displayItem() {
    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    this.cartService.findAllItemByCustomerId(idCustomer).subscribe(value => {
      console.log(value)
      this.items = value;
      this.subtotal = 0;
      for (let i = 0; i < value.length; i++) {
        // @ts-ignore
        this.subtotal += value[i].quantity * value[i].product.price
        this.getTotalMoney(this.subtotal)
      }
    })
  }

  // Xóa sản phẩm khỏi Giỏ hàng trước khi được thanh toán (Xóa từng sản phẩm )
  deleteItem(idItem?: number) {
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
      this.displayItem()
      // @ts-ignore
      document.getElementById('cart').style.display = "none"
    })
  }


  changePrice(money?: number): any {
    const formatter = new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'VND',
      // minimumFractionDigits: 2
    })
    if (money != null) {
      return formatter.format(money);
    }
  }

  //Products của người mua hàng gồm cả người bán hàng nhưng không có sản phẩm của người bán đó
  // Đấy là list Product hiển thị trên trang bán hàng
  findProductByCustomerId() {
    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    this.productService.findAllProductNotCustomerId(idCustomer).subscribe(value => {
      this.listProduct = value
    })
  }


  // Cập nhật số lượng mua hàng
  updateQuantityItem() {
    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    this.cartService.findAllItemByCustomerId(idCustomer).subscribe(value => {
      for (let i = 0; i < value.length; i++) {
        // @ts-ignore
        let quantity = document.getElementById('' + value[i].product.id).value

        if (quantity != value[i].quantity) {
          // @ts-ignore
          let idCustomer = parseInt(localStorage.getItem("idCustomer"))
          this.cartService.findAllItemByCustomerId(idCustomer).subscribe(value1 => {
            for (let j = 0; j < value1.length; j++) {
              // @ts-ignore
              if (quantity > value1[i].product.amount) {
                // @ts-ignore
                quantity = value1[i].product.amount
              } else { // @ts-ignore
                if (quantity <= 0) {
                  this.cartService.deleteItem(value1[i].id).subscribe()
                }
              }
              // @ts-ignore
              let idProduct = value1[i].product.id
              let item = {
                id: value1[i].id,
                quantity: quantity,
                cart: {
                  id: idCustomer
                },
                product: {
                  id: idProduct
                }
              }
              this.cartService.updateItemToCart(item).subscribe(value1 => {
                this.updateQuantityToCartSuccess()
                // this.displayItem()
                setTimeout(() => {
                  window.location.reload()
                  // this.displayItem()
                }, 1700)
              })
            }
          })
        }
      }
    })

  }

  addItemToCartSuccess() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)

      }
    })
    Toast.fire({
      icon: 'success',
      title: 'Thêm vào giỏ hàng thành công'
    })
  }

  updateQuantityToCartSuccess() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cập nhật giỏ hàng thành công',
      showConfirmButton: false,
      timer: 1500
    })
  }


  selectItem(idItem: any) {
    let listItem: any[] = []
    listItem.push(idItem)
    console.log(listItem)
  }

  // Lấy tổng tiền cho sản phẩm trong Cart
  getTotalItem(idItem: any): any {
    let totalMoney: any;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id == idItem) {
        // @ts-ignore
        totalMoney = this.items[i].quantity * this.items[i].product.price
        return totalMoney
      }
    }
  }


  // Lấy tổng tiền cần thanh toán khi đặt hàng
  getTotalMoney(subtotal: any) {
    if (subtotal > 100000000) {
      this.total = subtotal - subtotal * this.voucherItem / 100 - subtotal * 0.3
      this.discountItem = 30
    } else if (subtotal > 50000000) {
      this.total = subtotal - subtotal * this.voucherItem / 100 - subtotal * 0.15
      this.discountItem = 15
    } else if (subtotal > 30000000) {
      this.total = subtotal - subtotal * this.voucherItem / 100 - subtotal * 0.1
      this.discountItem = 10
    } else {
      this.total = subtotal - subtotal * this.voucherItem / 100
      this.discountItem = 0
    }

  }


  findImageURLFirst(idProduct: any): any {
    let imageURL: any;
    let flag = false;
    if (idProduct != null) {
      for (let i = 0; i < this.listProduct.length; i++) {
        // @ts-ignore
        if (this.listProduct[i].product.id == idProduct) {
          flag = true
          // @ts-ignore
          imageURL = this.listProduct[i].imageURLS[0]
          return imageURL;
        }
      }
    }
  }

  // CheckBox

  task: Task = {
    name: 'Chọn tất cả',
    completed: false,
    color: 'primary'
  };

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.subtasks != null && this.subtasks.completed;
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.subtasks.completed && !this.allComplete;

  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.subtasks == null) {
      return;
    }
    this.subtasks.completed = completed;
  }


  // Hiển thị danh sách Item theo ID của Shop

  // Tìm kiếm người dùng có quyền bán hàng
  findAllCustomerHaveShop() {
    return this.customerService.findAllCustomerHaveShop().subscribe(value => {
      this.listCustomerHaveShop = value;
    })
  }

  // Tìm ra list người bán hàng có sản phẩm tồn tại trong Cart của người đang đăng nhập
  findShopInCart() {
    // @ts-ignore
    this.idCustomerCurrent = parseInt(localStorage.getItem("idCustomer"))
    // let shopCurrent: Customer[] = []
    return this.cartService.findListIdShop(this.idCustomerCurrent).subscribe(value => {
      console.log(value)
      for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < this.listCustomerHaveShop.length; j++) {
          if (value[i] == this.listCustomerHaveShop[j].id) {
            this.listShopCurrent.push(this.listCustomerHaveShop[j])
          }
        }
      }
    })
  }

  //Find All DTOItem.ts theo id của người đang đăng nhập
  findAllDTOItem() {
    // @ts-ignore
    this.idCurrentCustomer = parseInt(localStorage.getItem("idCustomer"))
    return this.cartService.findAllDTOItem(this.idCustomerCurrent).subscribe(value => {
      console.log(value)
      this.DTOItems = value
    })
  }

  // Tìm từng Item theo ID của từng cửa hàng có tồn tại trong Cart
  findItemByShopId(idShop ?: number): any {
    let DTOItems: DTOItem[] = [];
    for (let i = 0; i < this.DTOItems.length; i++) {
      if (this.DTOItems[i].shop_id == idShop) {
        DTOItems.push(this.DTOItems[i])
      }
    }
    return DTOItems;
  }

  subtotalMoney(idShop ?: number): any {
    let DTOItems: DTOItem[] = [];
    let subtotal = 0;
    for (let i = 0; i < this.DTOItems.length; i++) {
      if (this.DTOItems[i].shop_id == idShop) {
        DTOItems.push(this.DTOItems[i])
      }
    }
    for (let i = 0; i < DTOItems.length; i++) {
      // @ts-ignore
      subtotal += DTOItems[i].item.product.price * DTOItems[i].item.quantity
    }
    return subtotal

  }

  totalMoney(idShop ?: number): any {
    let total = 0
    let DTOItems: DTOItem[] = [];
    let subtotal = 0;
    for (let i = 0; i < this.DTOItems.length; i++) {
      if (this.DTOItems[i].shop_id == idShop) {
        DTOItems.push(this.DTOItems[i])
      }
    }
    for (let i = 0; i < DTOItems.length; i++) {
      // @ts-ignore
      subtotal += DTOItems[i].item.product.price * DTOItems[i].item.quantity
    }
    if (subtotal > 100000000) {
      total = subtotal - subtotal * this.voucherItem / 100 - subtotal * 0.3
      this.discountItem = 30
    } else if (subtotal > 50000000) {
      total = subtotal - subtotal * this.voucherItem / 100 - subtotal * 0.15
      this.discountItem = 15
    } else if (subtotal > 30000000) {
      total = subtotal - subtotal * this.voucherItem / 100 - subtotal * 0.1
      this.discountItem = 10
    } else {
      total = subtotal - subtotal * this.voucherItem / 100
      this.discountItem = 0
    }
    return total;
  }

  discountAutomatic(subtotal: number): any {
    let discountItem = 0
    if (subtotal > 100000000) {
      discountItem = 30
    } else if (subtotal > 50000000) {
      discountItem = 15
    } else if (subtotal > 30000000) {
      discountItem = 10
    } else {
      discountItem = 0
    }
    return discountItem
  }
  // Lưu Id Cửa hàng khi cần thanh toán
  saveIdShop(idShop ?: any){
    localStorage.setItem("idShop",idShop)
  }
  logOut(){
    this.customerService.logOutCustomer();
    window.location.replace("http://localhost:4200/login-register")
  }

}
