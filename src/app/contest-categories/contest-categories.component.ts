import { Component } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { FormService } from '../_services/form.service';
import { DataService } from '../_services/data.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-contest-categories',
  templateUrl: './contest-categories.component.html',
  styleUrls: ['./contest-categories.component.scss']
})
export class ContestCategoriesComponent {

  base = 'contest-categories';
  data = [];
  search = '';
  total = 0;
  page = 0;
  perPage = 0;
  constructor(private api: ApiService,
    private formService: FormService,
    public dataService: DataService) {
    this.init().then();
    this.dataService.setTitle('Contest Categories');
  }

  async init() {
    let params = new HttpParams();
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('search', this.search.toString());
    const value: any = await this.api.get(this.base, { params }).toPromise();
    if (value.status) {
      this.data = value.data.contest_categories.data;
      this.total = value.data.contest_categories.total;
      this.perPage = value.data.contest_categories.per_page;
      this.page = value.data.contest_categories.current_page - 1;
    }
  }

  async add() {
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
              key: 'tagline',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Tagline',
                required: true
              }
            },
            {
              key: 'sequence_by',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Sequence',
                required: true,
                type: 'number',
                min: 1
              }
            },
          ]
        },
      ];


    const value: any = await this.formService.show(fields, this.base, 'POST', {}, {
      title: 'Create Contest Category',
      width: '350px'
    });

    if (value) {
      await this.init();
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
              key: 'tagline',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Tagline',
                required: true
              }
            },
            {
              key: 'sequence_by',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Sequence',
                required: true,
                type: 'number',
                min: 1
              }
            },
            {
              key: 'is_active',
              type: 'toggle',
              className: 'col-12',
              templateOptions: {
                label: 'Is active?',
                required: true,
                appearance: 'none'
              }
            },
          ]
        },
      ];

    const value: any = await this.formService.show(fields, this.base + '/' + d.id, 'PUT', Object.assign({}, d), {
      title: 'Edit Contest Category',
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
