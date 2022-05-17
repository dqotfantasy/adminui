import {Component} from '@angular/core';
import {ApiService} from '../_services/api.service';
import {FormService} from '../_services/form.service';
import {DataService} from '../_services/data.service';
import {HttpParams} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent {
  base = 'users';
  data = [];
  total = 0;
  page = 0;
  perPage = 0;
  search = '';
  filter: any = {};

  constructor(private api: ApiService,
              private formService: FormService,
              public dataService: DataService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.activatedRoute.queryParamMap.subscribe(value => {
      this.filter = {
        from_date: value.has('from_date') ?
          moment(value.get('from_date')).format('YYYY-MM-DD') :
          moment().add(-1, 'day').format('YYYY-MM-DD'),
        to_date: value.has('to_date') ?
          moment(value.get('to_date')).format('YYYY-MM-DD') : '',
        status: value.get('status') ?? ''
      };
      this.search = value.has('search') ? value.get('search') : '';

      // tslint:disable-next-line:radix
      this.page = value.has('page') ? parseInt(value.get('page')) : 0;
      // tslint:disable-next-line:radix
      this.perPage = value.has('perPage') ? parseInt(value.get('perPage')) : 0;

      this.init().then();
    });
    this.dataService.setTitle('Users');
    // this.init().then();
  }

  async init() {
    let params = new HttpParams();
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('search', this.search.toString());
    params = params.set('verification', 'false');
    const value = await this.api.get(this.base, {params}).toPromise();
    if (value.status) {
      const data = value.data;
      data.users.map((el) => {
        if (!el.document_verified) {
          this.data.push(el);
        }
      });
      this.total = data.total;
      this.perPage = data.per_page;
      this.page = data.current_page - 1;
    }
  }

  async setParams() {
    const params = Object.assign(this.filter, {page: this.page, search: this.search, perPage: this.perPage});
    await this.router.navigate(['/users'], {queryParams: params});
  }

}
