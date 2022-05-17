import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { FormService } from '../_services/form.service';
import { DataService } from '../_services/data.service';
import { HttpParams } from '@angular/common/http';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-rank-categories',
  templateUrl: './rank-categories.component.html',
  styleUrls: ['./rank-categories.component.scss']
})
export class RankCategoriesComponent {
  base = 'rank_categories';
  data = [];
  search = '';
  total = 0;
  page = 0;
  perPage = 0;
  fields: FormlyFieldConfig[] = [];
  @ViewChild('prizeBreakupTemplate') prizeBreakupTemplate: TemplateRef<HTMLElement>;
  prizeBreakups = [];

  constructor(private api: ApiService,
    private formService: FormService,
    public dataService: DataService,
    public matDialog: MatDialog) {
    this.dataService.setTitle('Rank Categories');
    this.init().then();
  }

  async init() {
    let params = new HttpParams();
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('search', this.search.toString());
    const value = await this.api.get(this.base, { params }).toPromise();
    if (value.status) {
      this.data = value.data.rank_categories.data;
      this.total = value.data.rank_categories.total;
      this.perPage = value.data.rank_categories.per_page;
      this.page = value.data.rank_categories.current_page - 1;
    }

    this.fields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'name',
            type: 'input',
            className: 'col-12 col-md-6',
            templateOptions: {
              label: 'Name',
              required: true
            }
          },
          {
            key: 'winner',
            type: 'input',
            className: 'col-12 col-md-6',
            templateOptions: {
              label: 'Winner',
            }
          },
        ]
      },
      {
        template: `<h3><strong>Prize Breakup</strong></h3>`
      },
      {
        fieldGroup: [{
          key: 'prize_breakup',
          type: 'repeat',
          // className: 'col',
          templateOptions: {
            addText: 'Add Rank',
          },
          fieldArray: {
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                key: 'from',
                type: 'input',
                className: 'col-12 col-md-4',
                templateOptions: {
                  label: 'From',
                  required: true,
                  type: 'number',
                  min: 1
                }
              },
              {
                key: 'to',
                type: 'input',
                className: 'col-12 col-md-4',
                templateOptions: {
                  label: 'To',
                  required: true,
                  type: 'number',
                  min: 1
                }
              },
              {
                key: 'percentage',
                type: 'input',
                className: 'col-12 col-md-4',
                templateOptions: {
                  label: 'Prize Percentage',
                  required: true,
                  type: 'number',
                }
              }
            ]
          }
        }]
      }
    ];
  }

  async add(model = {
    prize_breakup: [{
      from: 1,
      to: 1,
      percentage: 1
    }]
  }) {

    const value: any = await this.formService.show(this.fields, this.base, 'POST', model, { title: 'Add Rank' });

    if (value) {
      await this.init();
    }
  }

  async edit(d) {
    const value: any = await this.formService.show(this.fields, this.base + '/' + d.id, 'PUT', Object.assign({}, d), { title: 'Edit Pool' });

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
