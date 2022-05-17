import { Component } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { FormService } from '../_services/form.service';
import { DataService } from '../_services/data.service';
import { HttpParams } from '@angular/common/http';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent {

  base = 'blogs';
  data = [];
  search = '';
  total = 0;
  page = 0;
  perPage = 0;
  currentURL='';
  constructor(private api: ApiService,
    private formService: FormService,
    public dataService: DataService) {
    this.init().then();
    this.dataService.setTitle('Blogs');
  }

  async init() {
    let params = new HttpParams();
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('search', this.search.toString());
    const value: any = await this.api.get(this.base, { params }).toPromise();
    if (value.status) {
      this.data = value.data.blogs.data;
      this.currentURL = value.data.currentURL;
      this.total = value.data.blogs.total;
      this.perPage = value.data.blogs.per_page;
      this.page = value.data.blogs.current_page - 1;
    }
  }

  async edit(d) {
    const fields: FormlyFieldConfig[] =
      [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              key: 'title',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Title',
                required: true
              }
            },
            {
              key: 'meta_title',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Meta Title',
                required: true
              }
            },
            {
              key: 'meta_description',
              type: 'textarea',
              className: 'col-12',
              templateOptions: {
                label: 'Meta Description',
                required: true
              }
            },
            {
              key: 'meta_keyword',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Meta Keyword',
                required: true
              }
            },
            {
              key: 'description',
              type: 'editor',
              className: 'col-12',
              templateOptions: {
                label: 'Description',
                required: true
              }
            },
            {
              key: 'photo',
              type: 'file',
              className: 'col-12',
              templateOptions: {
                label: 'Blog Image',
                // required: true
              }
            },
            // {
            //   key: 'status',
            //   type: 'select-search',
            //   className: 'col-12',
            //   templateOptions: {
            //     label: 'Status',
            //     required: true,
            //     options: [
            //       {id: null, name: 'Select Status'},
            //       {id: true, name: 'Yes'},
            //       {id: false, name: 'No'},
            //     ]
            //   }
            // },
          ]
        },
      ];

    const data: any = await this.api.get(this.base + '/' + d.id).toPromise();

    if (data.status) {
      const value: any = await this.formService.show(fields, this.base + '/' + d.id, 'PUT', data.data, {
        title: 'Edit Blog',
        width: '1200px'
      });

      if (value) {
        await this.init();
      }
    }

  }

  async add() {
    const fields: FormlyFieldConfig[] =
      [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              key: 'title',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Title',
                required: true
              }
            },
            {
              key: 'meta_title',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Meta Title',
                required: true
              }
            },
            {
              key: 'meta_description',
              type: 'textarea',
              className: 'col-12',
              templateOptions: {
                label: 'Meta Description',
                required: true
              }
            },
            {
              key: 'meta_keyword',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Meta Keyword',
                required: true
              }
            },
            {
              key: 'description',
              type: 'editor',
              className: 'col-12',
              templateOptions: {
                label: 'Description',
                required: true
              }
            },
            {
              key: 'photo',
              type: 'file',
              className: 'col-12',
              templateOptions: {
                label: 'Blog Image',
                // required: true
              }
            },
            // {
            //   key: 'status',
            //   type: 'select-search',
            //   className: 'col-12',
            //   templateOptions: {
            //     label: 'Status',
            //     required: true,
            //     options: [
            //       {id: true, name: 'Yes'},
            //       {id: false, name: 'No'},
            //     ]
            //   }
            // },
          ]
        },
      ];


    const value: any = await this.formService.show(fields, this.base, 'POST', {}, {
      title: 'Add Blog',
      width: '1200px'
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
