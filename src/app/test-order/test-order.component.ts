import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {OrdersService} from "../service/orders.service";
import {Orders} from "../model/Orders";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import Swal from "sweetalert2";
import {CustomerService} from "../service/customer.service";
// @ts-ignore
import {OrderDetail} from "../model/OrderDetail";
import {ProductDTO} from "../model/ProductDTO";

@Component({
  selector: 'app-test-order',
  templateUrl: './test-order.component.html',
  styleUrls: ['./test-order.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class TestOrderComponent implements OnInit {
  // displayedColumns: string[] = ['stt', 'dateOrder', 'dateShip', 'description', 'customer', 'status_order', 'status_pay', 'action'];
  displayedColumns: string[] = ['nameShop', 'description', 'status_pay', 'status_order']
  displayedColumnsDetail: string[] = ['image', 'quantity', 'price', 'subtotal'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: OrderDetail;
  listOrderCustomer !: MatTableDataSource<Orders>
  idCurrentCustomer: number = 0
  listOrderDetail: OrderDetail [] = []
  listProduct: ProductDTO[] = []


  constructor(private orderService: OrdersService,
              private customerService: CustomerService) {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.findAllOrderByCustomerId()
    this.findAllOrderDetailByCustomerId()
    this.findAllOrderDetail()

  }

  logOut() {
    this.customerService.logOutCustomer();
    window.location.replace("http://localhost:4200/login-register")
  }

  findAllOrderByCustomerId() {
    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    return this.orderService.findAllOrderByCustomerId(idCustomer).subscribe(value => {
      this.listOrderCustomer = new MatTableDataSource(value)
      // @ts-ignore
      this.listOrderCustomer.paginator = this.paginator
    })
  }

  findAllOrderDetailByCustomerId(){
    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    return this.orderService.findAllOrderDetailByCustomerId(idCustomer).subscribe(value => {
      this.listOrderDetail = value
      console.log(value)
    })
  }

  // findAllOrderDetail

  findAllOrderDetail(idOrder ?: number): any {
    let orderDetails: OrderDetail [] = []
    for (let i = 0; i < this.listOrderDetail.length; i++) {
      if (idOrder == this.listOrderDetail[i].id) {
        // @ts-ignore
        orderDetails.push(this.listOrderDetail[idOrder])
      }
    }
    return orderDetails;
  }
}



