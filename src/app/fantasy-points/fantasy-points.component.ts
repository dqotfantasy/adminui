import {Component} from '@angular/core';
import {ApiService} from '../_services/api.service';
import {FormService} from '../_services/form.service';
import {DataService} from '../_services/data.service';
import {FormlyFieldConfig} from '@ngx-formly/core';

@Component({
  selector: 'app-fantasy-points',
  templateUrl: './fantasy-points.component.html',
  styleUrls: ['./fantasy-points.component.scss']
})
export class FantasyPointsComponent {

  base = 'fantasy_points';
  data = [];
  types = [];
  tab;

  constructor(private api: ApiService,
              private formService: FormService,
              public dataService: DataService) {
    this.init().then();
    this.dataService.setTitle('Fantasy Points');
  }

  async init() {
    const value: any = await this.api.get(this.base).toPromise();
    if (value.status) {
      this.data = value.data.fantasy_points;
      this.types = value.data.types;
      this.tab = this.types[0];
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
              key: 'note',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Note',
              }
            },
          ]
        },
      ];

    const value: any = await this.formService.show(fields, this.base + '/' + d.id, 'PUT', Object.assign({}, d), {
      title: 'Edit Fantasy Point',
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
