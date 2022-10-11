import { Component, OnInit } from '@angular/core';
import {OrderService} from "../service/order.service";
import {Orders} from "../model/Order";


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  listOrder: Orders[] = []
  displayedColumns: string[] = ['name', 'image', 'price', 'quantity', 'action'];
  // dataSource = ELEMENT_DATA;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.displayAllOrder()
    this.findAllOrderByCustomer()
  }

  displayAllOrder(){
    this.orderService.findAllOrder().subscribe(value => {
      this.listOrder= value
      console.log(value)
    })
  }

  // tim kiem order theo nguoi dung
  findAllOrderByCustomer(){
    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    this.orderService.findAllOrderByCustomer(idCustomer).subscribe(value => {
      this.listOrder = value
    })
  }



}

// export interface Order {
//   customer_id:string,
//   status_order: number,
//   status_exist: number,
//   status_pay: number
// }


// export interface Order_Detail {
//   image: string;
//   name: string;
//   quantity: number;
//   symbol: string;
// }

// const ELEMENT_DATA: Order_Detail[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

