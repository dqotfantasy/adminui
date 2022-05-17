import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { FormService } from '../_services/form.service';
import { DataService } from '../_services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpParams } from '@angular/common/http';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent {

  base = 'faqs';
  data = [];
  search = '';
  total = 0;
  page = 0;
  perPage = 0;
  faq: any;
  @ViewChild('infoTemplate') infoTemplate: TemplateRef<HTMLElement>;

  constructor(private api: ApiService,
    private formService: FormService,
    public dataService: DataService,
    public matDialog: MatDialog) {
    this.init().then();
    this.dataService.setTitle('Faqs');
  }

  async init() {
    const params = new HttpParams();
    const value: any = await this.api.get(this.base, { params }).toPromise();
    if (value.status) {
      this.data = value.data.faqs.data;
      this.total = value.data.faqs.total;
      this.perPage = value.data.faqs.per_page;
      this.page = value.data.faqs.current_page - 1;
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
              key: 'description',
              type: 'editor',
              className: 'col-12',
              templateOptions: {
                label: 'Description',
              }
            }
          ]
        },
      ];

    const value: any = await this.formService.show(fields, this.base, 'POST', {}, {
      title: 'Add Faq',
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
              key: 'title',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Title',
                required: true
              }
            },
            {
              key: 'description',
              type: 'editor',
              className: 'col-12',
              templateOptions: {
                label: 'Description',
              }
            }
          ]
        },
      ];

    const value: any = await this.formService.show(fields, this.base + '/' + d.id, 'PUT', Object.assign({}, d), {
      title: 'Edit Faq',
    });

    if (value) {
      await this.init();
    }
  }

  async show($event: MouseEvent, d: any) {
    $event.preventDefault();
    $event.stopPropagation();

    const data: any = await this.api.get(this.base + '/' + d.id).toPromise();

    if (data.status) {
      this.faq = d.description;
      await this.matDialog.open(this.infoTemplate);
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
