import { Component } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { FormService } from '../_services/form.service';
import { DataService } from '../_services/data.service';
import { HttpParams } from '@angular/common/http';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-subadmin-create',
  templateUrl: './subadmin-create.component.html',
  styleUrls: ['./subadmin-create.component.scss']
})
export class SubadminCreateComponent {
  base = 'subadmin-user';
  data = [];
  search = '';
  total = 0;
  page = 0;
  perPage = 0;
  admin=true;

  constructor(private api: ApiService,
    private formService: FormService,
    public dataService: DataService) {
    this.init().then();
    this.dataService.setTitle('SubAdmin Data');
  }

  async init() {
    let params = new HttpParams();
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    const value = await this.api.get(this.base,{ params }).toPromise();
    if (value.status) {
      const getdata = value.data.userdata;
      this.data=getdata.data;
      if(value.data.role_id!=1){
        this.admin=false;
      }
      this.total = getdata.total;
      this.perPage = getdata.per_page;
      this.page = getdata.current_page - 1;
      //console.log(this.data);
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
              key: 'email',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Email',
                required: true
              }
            },
            {
              key: 'password',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Password',
                required: true
              }
            },
            {
              key: 'pin',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Pin',
                required: true
              }
            },
          ]
        },
      ];


    const value: any = await this.formService.show(fields, this.base, 'POST', {}, {
      title: 'Add SubAdmin',
      width: '500px'
    });

    if (value) {
      await this.init();
    }
  }

  async remove(d) {
    const value: any = await this.formService.confirm();

    if (value) {
      let params = new HttpParams();
      params = params.set('deleteid', d.id);
      const v: any = await this.api.get(this.base ,{ params }).toPromise();
      if (v.status) {
        await this.init();
      }
    }
  }
}
