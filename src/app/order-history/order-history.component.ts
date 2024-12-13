import { Component } from '@angular/core';
import { OrderHistoryListComponent } from '../order-history-list/order-history-list.component';
@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [OrderHistoryListComponent],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent {

}
