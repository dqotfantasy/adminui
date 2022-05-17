import {Component} from '@angular/core';
import {ApiService} from '../_services/api.service';
import {DataService} from '../_services/data.service';
import {SelectionModel} from '@angular/cdk/collections';
import {list} from '../animation';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [list]
})
export class DashboardComponent {
  base = 'dashboard';
  data: any;
  selection = new SelectionModel<any>(true, []);

  constructor(private api: ApiService,
              private dataService: DataService) {
    this.dataService.setTitle('Dashboard');
    this.init().then();
  }

  async init() {
    const value = await this.api.get(this.base).toPromise();
    this.data = value.data;
  }
}
