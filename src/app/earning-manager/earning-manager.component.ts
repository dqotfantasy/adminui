import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { FormService } from '../_services/form.service';
import { DataService } from '../_services/data.service';
import { HttpParams } from '@angular/common/http';
import { ToastService } from '../_component/toast/toast.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import * as moment from 'moment/moment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-earning-manager',
  templateUrl: './earning-manager.component.html',
  styleUrls: ['./earning-manager.component.scss']
})
export class EarningMangerComponent implements OnInit {

  base = 'earning-manager';
  competition=[];
  search = '';
  page = 0;
  perPage=0;
  data =[];
  total_earning=0;
  total=0;
  filter: any = {
    user_type: ''
  };

  constructor(private api: ApiService,
    private formService: FormService,
    public dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private router: Router) {

      this.activatedRoute.paramMap.subscribe(value => {
          this.init().then();
          this.getCompetition().then();
      });




    this.dataService.setTitle('Earning Manager');
  }

  async getCompetition() {
      const value = await this.api.get(this.base + '/competition').toPromise();
      if (value.status) {
        this.competition = value.data.competitions;
      }
  }

  async init() {
    let params = new HttpParams();
    let gettype='';
    for (const f in this.filter) {
      if (this.filter.hasOwnProperty(f)) {
          params = params.set(f, this.filter[f]);
          if(f=='user_type'){
            gettype=this.filter[f];
          }
      }
    }
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('status', "COMPLETED,CANCELED");
    params = params.set('search', this.search.toString());

    const value = await this.api.get(this.base, { params }).toPromise();

    if (value.status) {
      this.data = value.data.fixtures.data;

      if(gettype=='all_user'){
        this.data = this.data.map((m)=>{
          let _m = m
          _m["payment_data"] = _m.payment_data_all
          _m["payment_data_all"] = _m.payment_data
          return _m
        });
      }
      this.total = value.data.fixtures.total;
      this.perPage = value.data.fixtures.per_page;
      this.page = value.data.fixtures.current_page - 1;
    }
  }

  async openFilter() {
    const fields: FormlyFieldConfig[] = [
      {
        key: 'user_type',
        type: 'select-search',
        templateOptions: {
          label: 'User Type',
          options: [
            {'id':'all_user','name':"All User"},
            {'id':'normal_user','name':"Normal User"},
          ],
        }
      },
      {
        key: 'competition_id',
        type: 'select-search',
        templateOptions: {
          label: 'Competition',
          options: this.competition,

        },
      },
    ];

    const newValue = await this.formService.filter(fields, this.filter, {
      width: '500px', reset: {
        status: ''
      }
    });

    if (newValue) {
      if (JSON.stringify(newValue) !== JSON.stringify(this.filter)) {
        this.filter = newValue;
          await this.init();
      }
    }
  }

  convert(data){
    if(data){
      let converData=JSON.parse(data);
      return converData;
    }else{
      return 0;
    }
  }

  earningTotal(data){
    if(data){
      let converData=JSON.parse(data);
      let earning=converData.total_amount-converData.used_cash_bonus-converData.total_winning_distributed;
      return earning;
    }else{
      return 0;
    }
  }

  ngOnInit(): void {
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
          required: true,
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
          required: true,
        },
        expressionProperties: {
          'templateOptions.datepickerOptions.min': 'model.from_date',
        }
      },
      {
        key: 'competition_id',
        type: 'select-search',
        templateOptions: {
          label: 'Competition',
          options: this.competition,

        },
      },
      {
        key: 'user_type',
        type: 'select-search',
        templateOptions: {
          label: 'Type',
          options: [
            {'id':'all_user','name':"All User"},
            {'id':'normal_user','name':"Normal User"}
          ],
          required: true,
        }
      },
      {
        key: 'type',
        type: 'select',
        templateOptions: {
          label: 'Type',
          options: [
            { value: 'CSV', label: 'CSV' },
            { value: 'XLS', label: 'XLS' }
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
        //params = params.set('user_id', this.userId.toString());
      }

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('responseType', 'arrayBuffer');

      const value = await this.api.get('export-earning-manager', { params, responseType: 'blob' }).toPromise();
      //console.log(value);
      let type = 'application/vba.ms-excel';
      if (this.filter.type === 'CSV') {
        type = 'application/csv';
      }
      this.downLoadFile(value, type);
    }
  }

  downLoadFile(data: any, type: string) {
    const blob = new Blob([data], { type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    if (type === 'application/vba.ms-excel') {
      a.download = 'payment.xlsx';
    } else {
      a.download = 'payment.csv';
    }
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

}
