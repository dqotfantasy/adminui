import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { FormService } from '../_services/form.service';
import { DataService } from '../_services/data.service';
import { HttpParams } from '@angular/common/http';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ToastService} from '../_component/toast/toast.service';
import * as moment from 'moment/moment';


import readXlsxFile from 'read-excel-file';

@Component({
  selector: 'app-listsystem-user',
  templateUrl: './listsystem-user.component.html',
  styleUrls: ['./listsystem-user.component.scss']
})
export class ListsystemUserComponent {

  base = 'system-user-detail';
  data = [];
  filter: any = {};
  search = '';
  total = 0;
  page = 0;
  perPage = 0;

  constructor(private api: ApiService,
    private formService: FormService,
    public dataService: DataService,
    private toastService: ToastService,
    private router: Router) {
      this.filter = {
        from_date: '',
        to_date: '',
        type: ''
      };
    this.init().then();
    this.dataService.setTitle('System User');
  }


  async init() {
    let params = new HttpParams();
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    const value = await this.api.get(this.base,{ params }).toPromise();
    if (value.status) {
      const getdata = value.data.user_data;
      this.data=getdata.data;
      this.total = getdata.total;
      this.perPage = getdata.per_page;
      this.page = getdata.current_page - 1;

    }

  }
  excelData:any=[];
  excelRead(e){
    let fileReaded:any;
    fileReaded = e.target.files[0];
    let type = e.target.files[0].name.split('.').pop();
    this.excelData=[];
    const schema ={
      "Name": {
        prop:'name',
        type: String,
        require:false
      }
    };
    readXlsxFile(e.target.files[0],{schema}).then((getdata)=>{
      if(getdata.rows){
        for(let i of getdata.rows){
          this.excelData.push(i);
        }
      }
      var stringData=JSON.stringify({key:this.excelData});
      let _data={
        data:JSON.stringify(this.excelData),
      }
      if(_data){
        this.api.post(this.base, _data).subscribe((value) => {
          this.router.navigate(['/listsystem-user']);
        });
      }
    })
    //console.log(this.excelData);

  }

  async add() {
    const fields: FormlyFieldConfig[] =
      [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              key: 'system_user',
              type: 'file',
              className: 'col-12',
              templateOptions: {
                label: 'Name',
                required: true
              }
            },
            {
              key: 'name',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Name',
                required: true
              }
            },
          ]
        },
      ];


    const value: any = await this.formService.show(fields, this.base, 'POST', {}, {
      title: 'Add System User',
      width: '500px'
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

  async exportData() {
    const fields: FormlyFieldConfig[] = [
      {
        key: 'from_date',
        type: 'datepicker',
        templateOptions: {
          label: 'From',
          type: 'date',
          datepickerOptions: {
            max: moment().format('YYYY-MM-DD')
          },
          //required: true,
        },
        expressionProperties: {
          'templateOptions.datepickerOptions.max': 'model.to_date'
        }
      },
      {
        key: 'to_date',
        type: 'datepicker',
        templateOptions: {
          label: 'To',
          type: 'date',
          datepickerOptions: {
            max: moment().format('YYYY-MM-DD')
          },
          //required: true,
        },
        expressionProperties: {
          'templateOptions.datepickerOptions.min': 'model.from_date',
        }
      },
      {
        key: 'type',
        type: 'select',
        templateOptions: {
          label: 'Type',
          options: [
            {value: 'CSV', label: 'CSV'},
            {value: 'XLS', label: 'XLS'}
          ],
          required: true,
        }
      },
    ];

    const newValue = await this.formService.filter(fields, this.filter, {
      width: '300px', reset: {
        from_date: '',
        to_date: '',
        type: '',
      }
    });

    if (newValue) {

      this.filter = newValue;
      let params = new HttpParams();
      for (const f in this.filter) {
        if (this.filter.hasOwnProperty(f)) {
          if (['from_date', 'to_date'].indexOf(f) > -1) {
            const date = moment(this.filter[f]);
            if (date.isValid()) {
              params = params.set(f, date.format('YYYY-MM-DD'));
            } else {
              await this.toastService.error('Invalid Filter Selection');
            }
          } else {
            params = params.set(f, this.filter[f]);
          }
        }
      }

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('responseType', 'arrayBuffer');

      const value = await this.api.get('export-system-user', {params, responseType: 'blob'}).toPromise();

      let type = 'application/vba.ms-excel';
      if (this.filter.type === 'CSV') {
        type = 'application/csv';
      }
      this.downLoadFile(value, type);
    }
  }

  downLoadFile(data: any, type: string) {
    const blob = new Blob([data], {type});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    if (type === 'application/vba.ms-excel') {
      a.download = 'system_user.xlsx';
    } else {
      a.download = 'system_user.csv';
    }
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}
