import { Component, OnInit } from '@angular/core';
import {OrderService} from "../service/order.service";
import {Orders} from "../model/Order";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderList: Orders[] = []
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.displayAllOrder()
  }

  displayAllOrder(){
    this.orderService.findAllOrder().subscribe(value => {
      this.orderList= value
      console.log(value)
    })
  }



}
