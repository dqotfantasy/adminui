import { Component } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { FormService } from '../_services/form.service';
import { DataService } from '../_services/data.service';
import { HttpParams } from '@angular/common/http';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss']
})
export class BannersComponent {

  base = 'banners';
  data = [];
  couponCode = [];
  fixtureId = '';
  search = '';
  total = 0;
  page = 0;
  fixtures = [];
  competition=[];
  perPage = 0;
  constructor(private api: ApiService,
    private formService: FormService,
    public dataService: DataService) {
      Promise.all([this.init(), this.getFixtures() , this.getCompetition()]);
    //this.init().then();
    this.dataService.setTitle('Banners');
  }

  async init() {
    let params = new HttpParams();
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('search', this.search.toString());
    const value: any = await this.api.get(this.base, { params }).toPromise();
    if (value.status) {
      this.data = value.data.banners.data;
      this.couponCode = value.data.coupon;
      this.total = value.data.banners.total;
      this.perPage = value.data.banners.per_page;
      this.page = value.data.banners.current_page - 1;
    }
  }

  async getFixtures() {
    if (!this.fixtureId) {
      const value = await this.api.get(this.base + '/fixtures').toPromise();
      if (value.status) {
        this.fixtures = value.data.fixtures;

        this.fixtures= this.fixtures.map((m)=>{
            let _m = m

            _m["name"] = _m.names
            _m["names"] = _m.name
             return _m

          })
      }
    }
  }

  async getCompetition() {
    if (!this.fixtureId) {
      const value = await this.api.get(this.base + '/competition').toPromise();
      if (value.status) {
        this.competition = value.data.competitions;
      }
    }
  }

  async edit(d) {
    const fields: FormlyFieldConfig[] =
      [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            // {
            //   key: 'link',
            //   type: 'input',
            //   className: 'col-12',
            //   templateOptions: {
            //     label: 'Link',
            //     required: true
            //   }
            // },
            {
              key: 'type',
              type: 'select-search',
              className: 'col-sm-12',
              templateOptions: {
                label: 'Banner Type',
                required: true,
                options: [
                  { id: 'MATCH', name: 'Match Type' },
                  { id: 'INVITE', name: 'Invite Type' },
                  { id: 'OFFER', name: 'Offer Type' },
                  { id: 'LEADERBOARD', name: 'LEADERBOARD'}
                ]
              }
            },
            {
            hideExpression: (model, formState) => model.type != 'OFFER',
              key: 'offer',
              type: 'select-search',
              className: 'col-12',
              templateOptions: {
                label: 'Coupon Code',
                required: true,
                options: this.couponCode
              }
            },
            {
              hideExpression: (model, formState) => model.type != 'LEADERBOARD',
              key: 'competition_id',
              type: 'select-search',
              className: 'col-12',
              templateOptions: {
                label: 'Competition',
                options: this.competition
              },
            },
            {
              hideExpression: (model, formState) => model.type != 'MATCH',
              key: 'fixture_id',
              type: 'select-search',
              className: 'col-12',
              templateOptions: {
                label: 'Fixture',
                options: this.fixtures
              },
            },
            {
              key: 'photo',
              type: 'file',
              className: 'col-12',
              templateOptions: {
                label: 'Banner Image',
                required: true,
                floatLabel: 'always'
              }
            },
            // {
            //   key: 'is_active',
            //   type: 'select-search',
            //   className: 'col-12',
            //   templateOptions: {
            //     label: 'Status',
            //     required: true,
            //     options: [
            //       { id: true, name: 'Yes' },
            //       { id: false, name: 'No' },
            //     ]
            //   }
            // },
          ]
        },
      ];


    const data: any = await this.api.get(this.base + '/' + d.id).toPromise();

    if (data.status) {
      const value: any = await this.formService.show(fields, this.base + '/' + d.id, 'PUT', data.data, {
        title: 'Edit Banner',
        minWidth: '50vw'
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
            // {
            //   key: 'link',
            //   type: 'input',
            //   className: 'col-12',
            //   templateOptions: {
            //     label: 'Link',
            //     required: true
            //   }
            // },
            {
              key: 'type',
              type: 'select-search',
              className: 'col-sm-12',
              templateOptions: {
                label: 'Banner Type',
                required: true,
                options: [
                  { id: 'MATCH', name: 'Match Type' },
                  { id: 'INVITE', name: 'Invite Type' },
                  { id: 'OFFER', name: 'Offer Type' },
                  { id: 'LEADERBOARD', name: 'LEADERBOARD'}
                ]
              }
            },
            {
            hideExpression: (model, formState) => model.type != 'OFFER',
              key: 'offer',
              type: 'select-search',
              className: 'col-12',
              templateOptions: {
                label: 'Coupon Code',
                required: true,
                options: this.couponCode
              }
            },
            {
              hideExpression: (model, formState) => model.type != 'LEADERBOARD',
              key: 'competition_id',
              type: 'select-search',
              className: 'col-12',
              templateOptions: {
                label: 'Competition',
                options: this.competition
              },
            },
            {
              hideExpression: (model, formState) => model.type != 'MATCH',
              key: 'fixture_id',
              type: 'select-search',
              className: 'col-12',
              templateOptions: {
                label: 'Fixture',
                options: this.fixtures
              },
            },
            {
              key: 'photo',
              type: 'file',
              className: 'col-12',
              templateOptions: {
                label: 'Banner Image',
                required: true,
                floatLabel: 'always'
              }
            },
            // {
            //   key: 'is_active',
            //   type: 'select-search',
            //   className: 'col-12',
            //   templateOptions: {
            //     label: 'Status',
            //     required: true,
            //     options: [
            //       { id: true, name: 'Yes' },
            //       { id: false, name: 'No' },
            //     ]
            //   }
            // },
          ]
        },
      ];


    const value: any = await this.formService.show(fields, this.base, 'POST', {}, {
      title: 'Add Banner',
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

}
