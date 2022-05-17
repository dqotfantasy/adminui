import { Component } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { FormService } from '../_services/form.service';
import { DataService } from '../_services/data.service';
import { HttpParams } from '@angular/common/http';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {

  base = 'pages';
  data = [];
  search = '';
  total = 0;
  page = 0;
  perPage = 0;
  constructor(private api: ApiService,
    private formService: FormService,
    public dataService: DataService) {
    this.init().then();
    this.dataService.setTitle('Pages');
  }

  async init() {
    let params = new HttpParams();
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('search', this.search.toString());
    const value: any = await this.api.get(this.base, { params }).toPromise();
    if (value.status) {
      this.data = value.data.pages.data;
      this.total = value.data.pages.total;
      this.perPage = value.data.pages.per_page;
      this.page = value.data.pages.current_page - 1;
    }
  }

  async edit(d) {
    const fields: FormlyFieldConfig[] =
      [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              key: 'content',
              type: 'editor',
              className: 'col-12',
              templateOptions: {
                label: 'Content',
                required: true,
                floatLabel: 'always'
              }
            }
          ]
        },
      ];

    const data: any = await this.api.get(this.base + '/' + d.slug).toPromise();

    if (data.status) {
      const value: any = await this.formService.show(fields, this.base + '/' + d.slug, 'PUT', data.data, {
        title: 'Edit Page',
        minWidth: '50vw'
      });

      if (value) {
        await this.init();
      }
    }

  }

}
