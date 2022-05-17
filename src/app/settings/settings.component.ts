import {Component} from '@angular/core';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {FormGroup} from '@angular/forms';
import {ApiService} from '../_services/api.service';
import {DataService} from '../_services/data.service';
import {AuthService} from '../_services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  base = 'settings';
  teamForm = new FormGroup({});
  teamFields: FormlyFieldConfig[] = [];
  teamModel = {};

  withdrawForm = new FormGroup({});
  withdrawFields: FormlyFieldConfig[] = [];
  withdrawModel = {};

  versionForm = new FormGroup({});
  versionFields: FormlyFieldConfig[] = [];
  versionModel = {};

  entityForm = new FormGroup({});
  entityFields: FormlyFieldConfig[] = [];
  entityModel = {};

  razorpayForm = new FormGroup({});
  razorpayFields: FormlyFieldConfig[] = [];
  razorpayModel = {};

  referralForm = new FormGroup({});
  referralFields: FormlyFieldConfig[] = [];
  referralModel = {};

  signupbonusForm = new FormGroup({});
  signupbonusFields: FormlyFieldConfig[] = [];
  signupbonusModel = {};



  tdsForm = new FormGroup({});
  tdsFields: FormlyFieldConfig[] = [];
  tdsModel = {};

  PCCForm = new FormGroup({});
  PCCFields: FormlyFieldConfig[] = [];
  PCCModel = {};

  lvlForm = new FormGroup({});
  lvlFields: FormlyFieldConfig[] = [];
  lvlModel = {};

  PCSForm = new FormGroup({});
  PCSFields: FormlyFieldConfig[] = [];
  PCSModel = {};

  isCosoleBlocked;
  user;

  constructor(private authService: AuthService, private api: ApiService,
              public dataService: DataService) {
    this.dataService.setTitle('Settings');

    this.authService.user.subscribe(value => {
      this.user = value;
    });

    this.initTeamSettings().then();
    this.initWithdrawSettings().then();
    this.initVersionSettings().then();
    this.initEntitySettings().then();
    this.initRazorpaySettings().then();
    this.initreferralSettings().then();
    this.inittdsSettings().then();
    this.inilvlSettings().then();
    this.initpcsSettings().then();
    this.signupBonusSettings().then();

  }

  async initTeamSettings() {
    const value = await this.api.get(this.base + '/teams').toPromise();
    if (value.status) {
      this.teamModel = value.data.teams;
      this.teamFields = [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              key: 'min_players',
              className: 'col-12 col-sm-6 col-md-3',
              type: 'input',
              templateOptions: {
                label: 'Min players',
                type: 'number',
                required: true,
                min: 1
              }
            },
            {
              key: 'max_players',
              className: 'col-12 col-sm-6 col-md-3',
              type: 'input',
              templateOptions: {
                label: 'Max players',
                type: 'number',
                required: true,
                min: 1
              }
            },
            {
              key: 'max_players_per_team',
              className: 'col-12 col-sm-6 col-md-3',
              type: 'input',
              templateOptions: {
                label: 'Max players per team',
                type: 'number',
                required: true,
                min: 1
              }
            },
            {
              key: 'min_wicket_keepers',
              className: 'col-12 col-sm-6 col-md-3',
              type: 'input',
              templateOptions: {
                label: 'Min Wicket Keepers',
                type: 'number',
                required: true,
                min: 1
              }
            },
            {
              key: 'max_wicket_keepers',
              className: 'col-12 col-sm-6 col-md-3',
              type: 'input',
              templateOptions: {
                label: 'Max Wicket Keepers',
                type: 'number',
                required: true,
                min: 1
              }
            },

            {
              key: 'min_batsmen',
              className: 'col-12 col-sm-6 col-md-3',
              type: 'input',
              templateOptions: {
                label: 'Min Batsmen',
                type: 'number',
                required: true,
                min: 1
              }
            },
            {
              key: 'max_batsmen',
              className: 'col-12 col-sm-6 col-md-3',
              type: 'input',
              templateOptions: {
                label: 'Max Batsmen',
                type: 'number',
                required: true,
                min: 1
              }
            },

            {
              key: 'min_all_rounders',
              className: 'col-12 col-sm-6 col-md-3',
              type: 'input',
              templateOptions: {
                label: 'Min all rounders',
                type: 'number',
                required: true,
                min: 1
              }
            },
            {
              key: 'max_all_rounders',
              className: 'col-12 col-sm-6 col-md-3',
              type: 'input',
              templateOptions: {
                label: 'Max all rounders',
                type: 'number',
                required: true,
                min: 1
              }
            },

            {
              key: 'min_bowlers',
              className: 'col-12 col-sm-6 col-md-3',
              type: 'input',
              templateOptions: {
                label: 'Min bowlers',
                type: 'number',
                required: true,
                min: 1
              }
            },
            {
              key: 'max_bowlers',
              className: 'col-12 col-sm-6 col-md-3',
              type: 'input',
              templateOptions: {
                label: 'Max bowlers',
                type: 'number',
                required: true,
                min: 1
              }
            },

          ]
        }
      ];
    }
  }

  async initWithdrawSettings() {
    const value = await this.api.get(this.base + '/withdraw').toPromise();
    if (value.status) {
      this.withdrawModel = value.data.withdraw;
      this.withdrawFields = [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              key: 'min_amount',
              className: 'col-12 col-sm-6 col-md-3',
              type: 'input',
              templateOptions: {
                label: 'Min amount',
                type: 'number',
                required: true,
                min: 1
              }
            },
            {
              key: 'max_amount',
              className: 'col-12 col-sm-6 col-md-3',
              type: 'input',
              templateOptions: {
                label: 'Max amount',
                type: 'number',
                required: true,
                min: 1
              }
            },
          ]
        }
      ];
    }
  }

  async initVersionSettings() {
    const value = await this.api.get('get?type=version').toPromise();
    if (value.status) {
      this.versionModel = value.data;
      this.versionFields = [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              key: 'type',
              defaultValue: 'version'
            },
            {
              key: 'name',
              className: 'col-12 col-sm-6 col-md-3',
              type: 'input',
              templateOptions: {
                label: 'Name',
                required: true,
              }
            },
            {
              key: 'code',
              className: 'col-12 col-sm-6 col-md-3',
              type: 'input',
              templateOptions: {
                label: 'Code',
                type: 'number',
                required: true,
                min: 0
              }
            },
            {
              key: 'force_update',
              className: 'col-12 col-sm-6 col-md-3',
              type: 'select-search',
              templateOptions: {
                label: 'Force Update?',
                options: [
                  {id: true, name: 'Yes'},
                  {id: false, name: 'No'},
                ]
              }
            },
            {
              key: 'description',
              className: 'col-12',
              type: 'textarea',
              templateOptions: {
                label: 'Description',
              }
            },
            {
              key: 'file',
              className: 'col-12',
              type: 'file',
              templateOptions: {
                label: 'APK file',
                floatLabel: 'always'
              }
            },
          ]
        }
      ];
    }
  }

  async initreferralSettings() {
    const value = await this.api.get(this.base + '/referral_price').toPromise();
    if (value.status) {
      this.referralModel = value.data;
      this.referralFields = [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              key: 'referral_price',
              className: 'col-12 col-sm-6 col-md-3',
              type: 'input',
              templateOptions: {
                label: 'Referral Bonus',
                type: 'number',
                required: true,
                min: 1
              }
            },
          ]
        }
      ];
    }
  }

  async inittdsSettings() {
    const value = await this.api.get(this.base + '/tds_deduction').toPromise();
    if (value.status) {
      this.tdsModel = value.data;
      this.tdsFields = [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              key: 'tds_deduction',
              className: 'col-12 col-sm-6 col-md-3',
              type: 'input',
              templateOptions: {
                label: 'TDS Deduction %',
                type: 'number',
                required: true,
                min: 1
              }
            },
          ]
        }
      ];
    }
  }

  async inilvlSettings() {
    const value = await this.api.get(this.base + '/level_limit').toPromise();
    if (value.status) {
      this.lvlModel = value.data.level_limit;
      this.lvlFields = [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              key: 'limit',
              className: 'col-12 col-sm-6 col-md-3',
              type: 'input',
              templateOptions: {
                label: 'Level Limit',
                type: 'number',
                required: true,
                min: 1
              }
            },
          ]
        },
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              key: 'bonus',
              className: 'col-12 col-sm-6 col-md-3',
              type: 'input',
              templateOptions: {
                label: 'Bonus',
                type: 'number',
                required: true,
                min: 1
              }
            },
          ]
        }
      ];
    }
  }

  async initpcsSettings() {
    const value = await this.api.get(this.base + '/private_contest').toPromise();
    if (value.status) {
      this.PCSModel = value.data.private_contest;
      this.PCSFields = [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              key: 'min_contest_size',
              className: 'col-12 col-sm-6 col-md-3',
              type: 'input',
              templateOptions: {
                label: 'Min Contest Size',
                type: 'number',
                required: true,
                min: 1
              }
            },
            {
              key: 'max_contest_size',
              className: 'col-12 col-sm-6 col-md-3',
              type: 'input',
              templateOptions: {
                label: 'Max Contest Size',
                type: 'number',
                required: true,
                min: 1
              }
            },
            {
              key: 'min_entry_fee',
              className: 'col-12 col-sm-6 col-md-3',
              type: 'input',
              templateOptions: {
                label: 'Min Entry Fee',
                type: 'number',
                required: true,
                min: 1
              }
            },
            {
              key: 'max_entry_fee',
              className: 'col-12 col-sm-6 col-md-3',
              type: 'input',
              templateOptions: {
                label: 'Max Entry Fee',
                type: 'number',
                required: true,
                min: 1
              }
            },
            {
              key: 'min_allow_multi',
              className: 'col-12 col-sm-6 col-md-3',
              type: 'input',
              templateOptions: {
                label: 'Min Allow Multi',
                type: 'number',
                required: true,
                min: 1
              }
            },
            {
              key: 'max_allow_multi',
              className: 'col-12 col-sm-6 col-md-3',
              type: 'input',
              templateOptions: {
                label: 'Max Allow Multi',
                type: 'number',
                required: true,
                min: 1
              }
            },
            {
              key: 'commission_value',
              className: 'col-12 col-sm-6 col-md-3',
              type: 'input',
              templateOptions: {
                label: 'Commission (%)',
                type: 'number',
                required: true,
                min: 1
              }
            },
            {
              key: 'commission_on_fee',
              className: 'col-12 col-sm-6 col-md-3',
              type: 'input',
              templateOptions: {
                label: 'Commission On Fee',
                type: 'number',
                required: true,
                min: 1
              }
            },
          ]
        }
      ];
    }
  }

  async initEntitySettings() {
    const value = await this.api.get('get?type=entity_sport').toPromise();
    if (value.status) {
      this.entityModel = value.data;
      this.entityFields = [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              key: 'token',
              className: 'col-12 col-sm-6',
              type: 'input',
              templateOptions: {
                label: 'Token',
                required: true,
                type: 'password'
              }
            }
          ]
        }
      ];
    }
  }

  async initRazorpaySettings() {
    const value = await this.api.get('get?type=razorpay').toPromise();
    if (value.status) {
      this.razorpayModel = value.data;
      this.razorpayFields = [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              key: 'type',
              defaultValue: 'razorpay'
            },
            {
              key: 'access_key',
              className: 'col-12 col-sm-6',
              type: 'input',
              templateOptions: {
                label: 'Access key',
                required: true,
                type: 'password'
              }
            },
            {
              key: 'secret_key',
              className: 'col-12 col-sm-6',
              type: 'input',
              templateOptions: {
                label: 'Secret key',
                required: true,
                type: 'password'
              }
            },
            {
              key: 'account_number',
              className: 'col-12 col-sm-6',
              type: 'input',
              templateOptions: {
                label: 'Bank Account Number',
                required: true,
                type: 'password',
                description: 'for withdrawal purpose'
              }
            },
            {
              key: 'webhook_secret',
              className: 'col-12 col-sm-6',
              type: 'input',
              templateOptions: {
                label: 'Webhook secret',
                required: true,
                type: 'password'
              }
            },
          ]
        }
      ];
    }
  }

  async signupBonusSettings() {
    const value = await this.api.get(this.base + '/signup_bonus').toPromise();
    if (value.status) {
      this.signupbonusModel = value.data;
      this.signupbonusFields = [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              key: 'signup_bonus',
              className: 'col-12 col-sm-6 col-md-3',
              type: 'input',
              templateOptions: {
                label: 'Signup Bonus',
                type: 'number',
                required: true,
                min: 1
              }
            },
          ]
        }
      ];
    }
  }

  async save(type) {
    let data;
    if (type === 'teams') {
      data = this.teamForm.value;
    } else if (type === 'withdraw') {
      data = this.withdrawForm.value;
    } else if (type === 'referral_price') {
      data = this.referralForm.value;
    } else if (type === 'tds_deduction') {
      data = this.tdsForm.value;
    } else if (type === 'level_limit') {
      data = this.lvlForm.value;
    } else if (type === 'personal_contest_commission') {
      data = this.PCCForm.value;
    } else if (type === 'entity_sport') {
      data = this.entityForm.value;
    } else if (type === 'razorpay') {
      await this.api.post('set', this.razorpayForm.value).toPromise();
      return;
    } else if (type === 'version') {
      await this.api.post('set', this.versionForm.value).toPromise();
      return;
    } else if (type === 'private_contest') {
      data = this.PCSForm.value;
    } else if (type === 'signup_bonus') {
      data = this.signupbonusForm.value;
    }

    await this.api.put(this.base + '/' + type, data).toPromise();

  }
}
