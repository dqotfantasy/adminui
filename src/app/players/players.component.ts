import {Component} from '@angular/core';
import {ApiService} from '../_services/api.service';
import {FormService} from '../_services/form.service';
import {DataService} from '../_services/data.service';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent {

  base = 'players';
  data = [];
  total = 0;
  page = 0;
  perPage = 0;
  search = '';
  positions = [];

  constructor(private api: ApiService,
              private formService: FormService,
              public dataService: DataService) {
    this.init().then();
    this.dataService.setTitle('Players');
  }

  async init() {
    let params = new HttpParams();
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('search', this.search.toString());
    const value: any = await this.api.get(this.base, {params}).toPromise();
    if (value.status) {
      const data = value.data;
      this.data = data.players;
      this.total = data.total;
      this.perPage = data.per_page;
      this.page = data.current_page - 1;
      this.positions = data.positions;
    }
  }

  async edit(d) {
    const fields: FormlyFieldConfig[] =
      [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              key: 'name',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Name',
                required: true
              }
            },
            {
              key: 'credit',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Credit',
                type: 'number'
              }
            },
            {
              key: 'position',
              type: 'select-search',
              className: 'col-12',
              templateOptions: {
                label: 'Position',
                options: this.positions
              }
            },
            {
              key: 'image',
              type: 'file',
              className: 'col-12',
              templateOptions: {
                label: 'Image',
                floatLabel: 'always'
              }
            },
            {
              key: 'is_active',
              type: 'toggle',
              className: 'col-12',
              templateOptions: {
                label: 'Is active?',
                appearance: 'none'
              }
            },
          ]
        },
      ];

    const value: any = await this.formService.show(fields, this.base + '/' + d.id, 'PUT', Object.assign({}, d), {
      title: 'Edit Player',
      width: '350px'
    });

    if (value) {
      await this.init();
    }
  }

  async remove(d) {
    const value = await this.formService.confirm();

    if (value) {
      const v: any = await this.api.delete(this.base + '/' + d.id).toPromise();
      if (v.status) {
        await this.init();
      }
    }
  }


}
