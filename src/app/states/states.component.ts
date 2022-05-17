import {Component} from '@angular/core';
import {ApiService} from '../_services/api.service';
import {DataService} from '../_services/data.service';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class StatesComponent {

  base = 'states';
  data = [];
  authUser;

  constructor(private api: ApiService,
              public dataService: DataService) {
    this.dataService.setTitle('States');
    this.init().then();

  }

  async init() {
    const params = new HttpParams();

    const value = await this.api.get(this.base, {params}).toPromise();
    if (value.status) {
      this.data = value.data.states;
    }
  }

  async update(d) {
    await this.api.put(this.base + '/' + d.id, d).toPromise();
    await this.init();
  }
}
