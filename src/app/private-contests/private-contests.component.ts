import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {ApiService} from '../_services/api.service';
import {FormService} from '../_services/form.service';
import {DataService} from '../_services/data.service';
import {HttpParams} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-private-contests',
  templateUrl: './private-contests.component.html',
  styleUrls: ['./private-contests.component.scss']
})
export class PrivateContestsComponent implements OnInit {

  base = 'private-contests';
  data = [];
  fields: FormlyFieldConfig[];
  search = '';
  total = 0;
  page = 0;
  perPage = 0;
  categories = [];
  fixtures = [];
  prizeBreakups = [];
  statuses = [];
  formPrize = 0;
  filter: any = {
    fixture_id: '',
    status: ''
  };
  @Input() fixtureId = '';
  @Input() merchantId = '';
  @ViewChild('contestTemplate') contestTemplate: TemplateRef<HTMLElement>;
  @ViewChild('prizeBreakupTemplate') prizeBreakupTemplate: TemplateRef<HTMLElement>;

  constructor(private api: ApiService,
              private formService: FormService,
              public dataService: DataService,
              private matDialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.dataService.setTitle('Private Contests');
  }

  ngOnInit() {
    if (this.fixtureId) {
      this.filter.fixture_id = this.fixtureId;
    } else {
      this.activatedRoute.queryParamMap.subscribe(value => {
        this.filter = {
          status: value.get('status') ?? '',
          // tslint:disable-next-line:radix
          fixture_id: parseInt(value.get('fixture_id')) || '',
        };

        this.search = value.has('search') ? value.get('search') : '';

        // tslint:disable-next-line:radix
        this.page = value.has('page') ? parseInt(value.get('page')) : 0;
        // tslint:disable-next-line:radix
        this.perPage = value.has('perPage') ? parseInt(value.get('perPage')) : 0;
      });
    }

    this.init().then();
    this.getFixtures().then();
  }

  async init() {
    let params = new HttpParams();
    for (const f in this.filter) {
      if (this.filter.hasOwnProperty(f)) {
        params = params.set(f, this.filter[f]);
      }
    }

    if (this.fixtureId) {
      params = params.set('fixture_id', this.fixtureId);
    }

    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('search', this.search.toString());
    const value: any = await this.api.get(this.base, {params}).toPromise();
    if (value.status) {
      this.data = value.data.contests;
      this.statuses = value.data.statuses;
      this.total = value.data.contests.total;
      this.perPage = value.data.contests.per_page;
      this.page = value.data.contests.current_page - 1;
    }
  }

  async openFilter() {
    const fields: FormlyFieldConfig[] = [
      {
        defaultValue: this.fixtureId,
        key: 'fixture_id',
        hideExpression: !this.fixtureId
      },
      {
        key: 'fixture_id',
        type: 'select-search',
        templateOptions: {
          label: 'Fixture',
          options: this.fixtures
        },
        hideExpression: this.fixtureId
      },
      {
        key: 'status',
        type: 'select-search',
        templateOptions: {
          label: 'Status',
          options: this.statuses
        }
      }
    ];

    const newValue = await this.formService.filter(fields, this.filter, {
      width: '300px', reset: {
        fixture_id: this.fixtureId,
        status: ''
      }
    });

    if (newValue) {
      if (JSON.stringify(newValue) !== JSON.stringify(this.filter)) {
        this.filter = newValue;
        if (!this.fixtureId) {
          await this.setParams();
        } else {
          await this.init();
        }

      }
    }
  }

  async getFixtures() {
    if (!this.fixtureId) {
      const value = await this.api.get(this.base + '/fixtures').toPromise();
      if (value.status) {
        this.fixtures = value.data.fixtures;
      }
    }
  }

  async showPrizeBreakup($event: MouseEvent, d: any) {
    $event.preventDefault();
    $event.stopPropagation();

    this.prizeBreakups = d.prize_breakup;
    this.prizeBreakups.map((res) => {
      res.prize = (res.percentage * d.prize / 100);
    });

    await this.matDialog.open(this.prizeBreakupTemplate, {panelClass: 'selection-dialog', minWidth: '320px'});
  }

  async setParams() {
    const params = Object.assign(this.filter, {page: this.page, search: this.search, perPage: this.perPage});
    await this.router.navigate(['/private-contests'], {queryParams: params});
    await this.init();
  }
}
