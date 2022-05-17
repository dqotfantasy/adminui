import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { FormService } from '../_services/form.service';
import { DataService } from '../_services/data.service';
import { HttpParams } from '@angular/common/http';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contest-templates',
  templateUrl: './contest-templates.component.html',
  styleUrls: ['./contest-templates.component.scss']
})
export class ContestTemplatesComponent {
  base = 'contest-templates';
  data = [];
  search = '';
  total = 0;
  newGlobalPercentage=0;
  globalPercentage=0;
  page = 0;
  rfrom = 0;
  rto = 0;
  perPage = 0;
  fields: FormlyFieldConfig[] = [];
  @ViewChild('prizeBreakupTemplate') prizeBreakupTemplate: TemplateRef<HTMLElement>;
  prizeBreakups = [];
  categories: any;
  rankCategories: any;
  formPrize = 0;

  constructor(private api: ApiService,
    private formService: FormService,
    public dataService: DataService,
    public matDialog: MatDialog) {
    this.dataService.setTitle('Contest Templates');
    Promise.all([this.getCategories(), this.getRankCategories()]).then(() => {
      this.init().then();
    });

  }

  async init() {
    let params = new HttpParams();
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('search', this.search.toString());
    const value = await this.api.get(this.base, { params }).toPromise();
    if (value.status) {
      this.data = value.data.contest_templates.data;
      this.total = value.data.contest_templates.total;
      this.perPage = value.data.contest_templates.per_page;
      this.page = value.data.contest_templates.current_page - 1;
    }

    this.fields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'name',
            type: 'input',
            className: 'col-12 col-md-5',
            templateOptions: {
              label: 'Name',
              required: true
            }
          },
          {
            key: 'description',
            type: 'textarea',
            className: 'col-12 col-md-7',
            templateOptions: {
              label: 'Description',
            }
          },
        ]
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'type',
            type: 'select-search',
            className: 'col-12 col-md-3 col-lg-2',
            templateOptions: {
              label: 'Contest Type',
              options: [
                { id: 'PAID', name: 'PAID' },
                { id: 'DISCOUNT', name: 'DISCOUNT' },
                { id: 'FREE', name: 'FREE' },
                { id: 'PRACTICE', name: 'PRACTICE' },
              ],
              required: true
            }
          },
          {
            hideExpression: (model, formState) => model.type === 'PRACTICE',
            key: 'commission',
            type: 'input',
            className: 'col-12 col-md-3 col-lg-3',
            templateOptions: {
              label: 'Commission',
              required: true,
              type: 'number',
              min: 0
            }
          },
          {
            key: 'total_teams',
            type: 'input',
            className: 'col-12 col-md-3 col-lg-3',
            templateOptions: {
              label: 'Total Teams',
              required: true,
              type: 'number',
              min: 2
            }
          },
          {
            hideExpression: (model, formState) => model.type === 'PRACTICE',
            key: 'prize',
            type: 'input',
            className: 'col-12 col-md-3 col-lg-3',
            templateOptions: {
              label: 'Total Prize',
              required: true,
              type: 'number'
            },
            expressionProperties: {
              'model.prize': (model: any) => {
                this.formPrize = model.prize;
                return model.prize;
              }
            }
          },
          {
            hideExpression: (model, formState) => model.type === 'PRACTICE',
            key: 'entry_fee',
            type: 'input',
            className: 'col-12 col-md-3 col-lg-3',
            templateOptions: {
              label: 'Entry fee',
              required: true,
              readonly: true,
              type: 'number',
              min: 0
            },
            expressionProperties: {
              'model.entry_fee': (model: any) => {
                // tslint:disable-next-line:radix max-line-length
                if(model.type != 'FREE'){
                  return Math.ceil((parseInt(model.prize) / parseInt(model.total_teams)) + (parseInt(model.commission) * parseInt(model.prize) / 100) / model.total_teams);
                }else{
                  return 0;
                }
              },
              'templateOptions.description': (model: any) => {
                return 'Profit will ' + ((model.total_teams * model.entry_fee) - model.prize);
              },
            }
          },
          {
            key: 'is_confirmed',
            type: 'select-search',
            className: 'col-12 col-md-3 col-lg-3',
            templateOptions: {
              label: 'Is Confirmed?',
              required: true,
              options: [
                { id: true, name: 'Yes' },
                { id: false, name: 'No' },
              ]
            }
          },
          {
            key: 'max_team',
            type: 'input',
            className: 'col-12 col-md-3 col-lg-3',
            templateOptions: {
              label: 'Max teams per user',
              required: true,
              type: 'number',
              min: 1
            }
          },
          {
            key: 'auto_add',
            type: 'select-search',
            className: 'col-12 col-md-3 col-lg-3',
            templateOptions: {
              label: 'Auto Add',
              required: true,
              options: [
                { id: true, name: 'Yes' },
                { id: false, name: 'No' },
              ]
            }
          },
          {
            key: 'auto_create_on_full',
            type: 'select-search',
            className: 'col-12 col-md-3 col-lg-3',
            templateOptions: {
              label: 'Auto Create When Contest Full',
              required: true,
              options: [
                { id: true, name: 'Yes' },
                { id: false, name: 'No' },
              ]
            }
          },
          {
            key: 'contest_category_id',
            type: 'select-search',
            className: 'col-12 col-md-3 col-lg-3',
            templateOptions: {
              label: 'Contest Category',
              required: true,
              options: this.categories
            }
          },
          {
            hideExpression: (model, formState) => model.type !== 'DISCOUNT',
            key: 'discount',
            type: 'input',
            className: 'col-12 col-md-3 col-lg-3',
            defaultValue: 0,
            templateOptions: {
              label: 'Discount',
              required: true,
              type: 'number',
              min: 0
            },

          },
          {
            key: 'bonus',
            type: 'input',
            className: 'col-12 col-md-3 col-lg-3',
            templateOptions: {
              label: 'Bonus',
              required: true,
              type: 'number',
              min: 0
            }
          },
          {
            key: 'is_mega_contest',
            type: 'select-search',
            className: 'col-12 col-md-3 col-lg-2',
            templateOptions: {
              label: 'Is Mega Contest',
              options: [
                { id: true, name: 'Yes' },
                { id: false, name: 'No' },
              ],
              required: true
            }
          },
          {
            key: 'is_dynamic',
            //type: 'input',
            type: 'select-search',
            className: 'col-12 col-md-3 col-lg-3',
            defaultValue: 0,
            templateOptions: {
              label: 'Dynamic Contest',
              required: true,
              options: [
                {id:0,name:'Normal'},
                {id:1,name:'Dynamic'},
              ]
            },
            expressionProperties: {
              'model.is_dynamic': (model: any) => {
                return model.is_dynamic;
              }
            },
            //hideExpression: '!model.is_dynamic',
          },
          {
            key: 'dynamic_min_team',
            type: 'input',
            className: 'col-12 col-md-3 col-lg-3',
            defaultValue: 0,
            templateOptions: {
              label: 'Dynamic miniume team',
              type: 'number',
              min: 0
            },
            hideExpression: '!model.is_dynamic',
          },
        ]
      },
      {
        hideExpression: (model, formState) => model.type === 'PRACTICE',

        fieldGroupClassName: 'row',
        fieldGroup: [{
          key: 'prize_breakup',
          type: 'repeat',
          className: 'col-12',
          templateOptions: {
            addText: 'Add Rank'
          },
          fieldArray: {
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                key: 'from',
                type: 'input',
                className: 'col-12 col-md-1',
                templateOptions: {
                  label: 'From',
                  required: true,
                  type: 'number',
                  min: 1
                },
                expressionProperties: {
                  'model.from': (model: any) => {
                    this.rfrom = model.from;
                    return model.from;
                  }
                }
              },
              {
                key: 'to',
                type: 'input',
                className: 'col-12 col-md-1',
                templateOptions: {
                  label: 'To',
                  required: true,
                  type: 'number',
                  min: 1
                },
                expressionProperties: {
                  'model.to': (model: any) => {
                    this.rto = model.to;
                    return model.to;
                  }
                }
              },
              {
                key: 'percentage',
                type: 'input',
                className: 'col-12 col-md-2',
                templateOptions: {
                  label: 'Percentage',
                  required: true,
                  type: 'number',
                },
                expressionProperties: {
                  'model.showtotalpercentage': (model: any) => {
                    this.rto =parseInt(model.to)+1;
                    return ((this.rto - this.rfrom) * model.percentage);
                  },
                  'model.globaltotalpercentage': (model: any) => {

                    if (isNaN(this.globalPercentage)){
                      this.globalPercentage=0;
                    }

                    if (!model.globaltotalpercentage){
                      this.newGlobalPercentage = this.globalPercentage+(this.rto - this.rfrom) * model.percentage;
                      return this.newGlobalPercentage;
                    }
                  },
                  'model.prize': (model: any) => {
                    return ((this.formPrize * model.percentage) / 100);
                  }
                }
              },
              {
                key: 'showtotalpercentage',
                type: 'input',
                className: 'col-12 col-md-2',
                templateOptions: {
                  label: 'Total Percentage',
                  readonly: true,
                }
              },
              {
                key: 'globaltotalpercentage',
                type: 'input',
                className: 'col-12 col-md-2',
                templateOptions: {
                  label: 'Global Percentage',
                  readonly: true,
                },
                expressionProperties: {
                  'model.globaltotalpercentage': (model: any) => {
                    this.globalPercentage=model.globaltotalpercentage;
                    return model.globaltotalpercentage;
                  }
                }
              },
              {
                key: 'prize',
                type: 'input',
                className: 'col-12 col-md-2',
                templateOptions: {
                  label: 'Prize',
                  readonly: true,
                  type: 'number',
                },
                expressionProperties: {
                  'model.showtotalprize': (model: any) => {
                    this.rto =parseInt(model.to)+1;
                    return ((this.rto - this.rfrom) * model.prize);
                  },
                }
              },
              {
                key: 'showtotalprize',
                type: 'input',
                className: 'col-12 col-md-2',
                templateOptions: {
                  label: 'Total Prize',
                  readonly: true,
                  type: 'number',
                }
              },
            ]
          }
        }]
      },
    ];
  }

  async getRankCategories() {
    let params = new HttpParams();
    params = params.set('type', 'list');
    const value = await this.api.get('rank_categories', { params }).toPromise();
    if (value.status) {
      this.rankCategories = value.data.rank_categories;
    }
  }

  async getCategories() {
    const value = await this.api.get('contests/categories').toPromise();
    if (value.status) {
      this.categories = value.data.contest_categories;
    }
  }

  async add(model = {
    max_team: 1,
    is_confirmed: false,
    commission: 0,
    bonus: 0,
    prize_breakup: [{
      from: 1,
      to: 1,
      prize: 1,
      prize_percentage: 1
    }]
  }) {

    const value: any = await this.formService.show(this.fields, this.base, 'POST', model, {
      title: 'Add Contest Template',
      minWidth: '50vw',
      maxWidth: '90vw'
    });

    if (value) {
      await this.init();
    }
  }

  async edit(d) {

    const value: any = await this.formService.show(this.fields, this.base + '/' + d.id, 'PUT', Object.assign({}, d), {
      title: 'Edit Contest Template',
      minWidth: '50vw',
      maxWidth: '90vw'
    });

    if (value) {
      await this.init();
    }
  }

  async remove(d) {

    const value: any = await this.formService.confirm();

    if (value) {
      const v: any = await this.api.delete(this.base + '/' + d.id).toPromise();
      if (v.status) {
        await this.init();
      }
    }
  }

  async showPrizeBreakup(d) {
    this.prizeBreakups = d.prize_breakup;
    await this.matDialog.open(this.prizeBreakupTemplate, { panelClass: 'selection-dialog', minWidth: '320px' });
  }
}
