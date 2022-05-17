import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ApiService} from '../../_services/api.service';
import {FormService} from '../../_services/form.service';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../_services/data.service';
import {HttpParams} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  base = 'users';
  bankBase = 'bank_accounts';
  panBase = 'pan_cards';
  adminrole=0;
  userId;
  user;

  basicForm = new FormGroup({});
  basicFields: FormlyFieldConfig[] = [];
  basicOptions: FormlyFormOptions = {};
  model: any = {};

  bankForm = new FormGroup({});
  bankFields: FormlyFieldConfig[] = [];
  bankOptions: FormlyFormOptions = {};
  bankModel: any = {};

  panForm = new FormGroup({});
  panFields: FormlyFieldConfig[] = [];
  panOptions: FormlyFormOptions = {};
  panModel: any = {};
  isSystemUser='';

  states = [];
  refrel_total='';
  bankAccount;
  panCard;
  imageSrc: any;
  @ViewChild('imageTemplate') imageTemplate: TemplateRef<HTMLElement>;

  constructor(private api: ApiService,
              private formService: FormService,
              private activatedRoute: ActivatedRoute,
              public dataService: DataService,
              private matDialog: MatDialog) {
    this.activatedRoute.paramMap.subscribe(value => {
      this.userId = value.get('userId');
      this.init().then();
      this.initBankStatements().then();
      this.initPanStatements().then();
    });
  }

  ngOnInit(): void {
  }

  async init() {
    const params = new HttpParams();

    const value = await this.api.get(this.base + '/' + this.userId, {params}).toPromise();
    if (value.status) {
      this.user = value.data.user;
      this.adminrole=value.data.role_id;
      this.states = value.data.states;
      this.refrel_total = value.data.refrel_total;
      this.isSystemUser=value.data.user.is_sys_user;
      this.model = value.data.user;
      this.initBasic();
    }
  }

  initBasic() {
    this.basicFields = [
      {
        template: '<h3>Basic</h3>'
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-12 col-md-3',
            key: 'name',
            type: 'input',
            templateOptions: {
              label: 'Name'
            }
          },
          // {
          //   hideExpression: this.user.is_sys_user===true,
          //   className: 'col-12 col-md-3',
          //   key: 'username',
          //   type: 'input',
          //   templateOptions: {
          //     label: 'Usernamemmmmmm',
          //     disabled: true
          //   },
          // },
          {
            className: 'col-12 col-md-3',
            key: 'username',
            type: 'input',
            templateOptions: {
              label: 'Username',
            },
          },
          {
            className: 'col-12 col-md-3',
            key: 'referral_code',
            type: 'input',
            templateOptions: {
              label: 'Referral Code',
            },
          },
          {
            className: 'col-12 col-md-3',
            key: 'email',
            type: 'input',
            templateOptions: {
              label: 'Email',
              type: 'email'
            }
          },
          {
            className: 'col-12 col-md-3',
            key: 'phone',
            type: 'input',
            templateOptions: {
              label: 'Phone',
              type: 'tel',
            }
          },
          {
            className: 'col-12 col-md-3',
            key: 'date_of_birth',
            type: 'input',
            templateOptions: {
              label: 'Date of birth',
              type: 'date'
            }
          }
        ]
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-12 col-md-3',
            key: 'gender',
            type: 'select',
            templateOptions: {
              label: 'Gender',
              options: [
                {value: 'm', label: 'Male'},
                {value: 'f', label: 'Female'},
              ]
            }
          },
          {
            className: 'col-12 col-md-3',
            key: 'city',
            type: 'input',
            templateOptions: {
              label: 'City',
            }
          },
          {
            className: 'col-12 col-md-3',
            key: 'state_id',
            type: 'select-search',
            templateOptions: {
              label: 'State',
              options: this.states
            }
          },
          {
            className: 'col-12 col-md-3',
            key: 'address',
            type: 'textarea',
            templateOptions: {
              label: 'Address',
            }
          }
        ]
      },
      {
        template: '<h3>Verification</h3>'
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-12 col-md-3',
            key: 'phone_verified',
            type: 'select',
            templateOptions: {
              label: 'Phone Verified?',
              options: [
                {value: true, label: 'Yes'},
                {value: false, label: 'No'},
              ]
            }
          },
          {
            className: 'col-12 col-md-3',
            key: 'email_verified',
            type: 'select',
            templateOptions: {
              label: 'Email Verified?',
              options: [
                {value: true, label: 'Yes'},
                {value: false, label: 'No'},
              ]
            }
          },
          // {
          //   className: 'col-12 col-md-3',
          //   key: 'document_verified',
          //   type: 'select',
          //   templateOptions: {
          //     label: 'Document Verified?',
          //     options: [
          //       {value: true, label: 'Yes'},
          //       {value: false, label: 'No'},
          //     ]
          //   }
          // },
        ]
      },
      {
        template: '<h3>Lock/Unlock</h3>'
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-12 col-md-3',
            key: 'is_locked',
            type: 'select',
            templateOptions: {
              label: 'Lock',
              options: [
                {value: true, label: 'Yes'},
                {value: false, label: 'No'},
              ]
            }
          },
          {
            className: 'col-12 col-md-3',
            key: 'is_sys_user',
            type: 'select',
            templateOptions: {
              label: 'System User',
              options: [
                {value: false, label: 'No'},
                {value: true, label: 'Yes'},
              ]
            }
          },
          {
            className: 'col-12 col-md-3',
            key: 'promoter_type',
            type: 'select',
            defaultValue: 0,
            templateOptions: {
              label: 'Promoter type',
              options: [
                {value: 0, label: 'Normal User'},
                {value: 1, label: 'Promoter'},
                {value: 2, label: 'Master Promoter'},
              ]
            }
          },
        ]
      },
    ];
  }

  async save() {
    const value: any = await this.api.put(this.base + '/' + this.userId, this.basicForm.value).toPromise();
    if (value.status) {
      await this.init();
    }
  }

  async initBankStatements() {
    let params = new HttpParams();
    params = params.set('user_id', this.userId);
    const value = await this.api.get(this.bankBase, {params}).toPromise();
    if (value.status) {
      this.bankAccount = value.data.bank_account;
    }
  }

  async initPanStatements() {
    let params = new HttpParams();
    params = params.set('user_id', this.userId);
    const value = await this.api.get(this.panBase, {params}).toPromise();
    if (value.status) {
      this.panCard = value.data.pan_cards;
    }
  }

  async panSave() {

    const fields: FormlyFieldConfig[] =
      [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              key: 'status',
              type: 'select-search',
              className: 'col-12',
              templateOptions: {
                label: 'Status',
                required: true,
                options: [
                  {id: 'PENDING', name: 'PENDING'},
                  {id: 'VERIFIED', name: 'VERIFIED'},
                  {id: 'REJECTED', name: 'REJECTED'}
                  // { id: 'UNLINKED', name: 'UNLINKED' }
                ]
              }
            },
            {
              className: 'col-12',
              key: 'message',
              type: 'textarea',
              templateOptions: {
                label: 'Message',
              }
            }
          ]
        },
      ];

    const value: any = await this.formService.show(fields, this.panBase + '/' + this.panCard.id, 'PUT',
      Object.assign({}, this.panCard),
      {
        title: 'Update Pan Status',
        width: '360px'
      });
    if (value) {
      await this.initPanStatements();
    }
  }

  async bankSave() {

    const fields: FormlyFieldConfig[] =
      [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              key: 'status',
              type: 'select-search',
              className: 'col-12',
              templateOptions: {
                label: 'Status',
                required: true,
                options: [
                  {id: 'PENDING', name: 'PENDING'},
                  {id: 'VERIFIED', name: 'VERIFIED'},
                  {id: 'REJECTED', name: 'REJECTED'}
                  // { id: 'UNLINKED', name: 'UNLINKED' }
                ]
              }
            },
            {
              className: 'col-12',
              key: 'message',
              type: 'textarea',
              templateOptions: {
                label: 'Message',
              }
            }
          ]
        },
      ];

    const value: any = await this.formService.show(fields, this.bankBase + '/' + this.bankAccount.id, 'PUT',
      Object.assign({}, this.bankAccount),
      {
        title: 'Update Bank Status',
        width: '360px'
      });
    if (value) {
      await this.initBankStatements();
    }
  }

  async bankEdit() {

    const fields: FormlyFieldConfig[] =
      [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-12',
              key: 'name',
              type: 'input',
              templateOptions: {
                label: 'Account Holder Name',
                required: true,

              }
            },
            {
              className: 'col-12',
              key: 'bankName',
              type: 'input',
              templateOptions: {
                label: 'Bank Name',
                required: true,

              }
            },
            {
              className: 'col-12',
              key: 'account_number',
              type: 'input',
              templateOptions: {
                label: 'Account Number',
                required: true,

              }
            },
            {
              className: 'col-12',
              key: 'branch',
              type: 'input',
              templateOptions: {
                label: 'Branch',
                required: true,

              }
            },
            {
              className: 'col-12',
              key: 'ifsc_code',
              type: 'input',
              templateOptions: {
                label: 'IFSC',
                required: true,

              }
            }
          ]
        },
      ];

    const value: any = await this.formService.show(fields, this.bankBase + '/' + this.bankAccount.id, 'PUT',
      Object.assign({}, this.bankAccount),
      {
        title: 'Edit Bank Detail',
        width: '360px'
      });
    if (value) {
      await this.initBankStatements();
    }
  }

  async panEdit() {

    const fields: FormlyFieldConfig[] =
      [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-12',
              key: 'name',
              type: 'input',
              templateOptions: {
                label: 'Name',
                required: true,

              }
            },
            {
              className: 'col-12',
              key: 'pan_number',
              type: 'input',
              templateOptions: {
                label: 'Pan number',
                required: true,

              }
            },
            {
              className: 'col-12',
              key: 'date_of_birth',
              type: 'input',
              templateOptions: {
                label: 'Date of Birth',
                required: true,

              }
            }
          ]
        },
      ];

    const value: any = await this.formService.show(fields, this.panBase + '/' + this.panCard.id, 'PUT',
      Object.assign({}, this.panCard),
      {
        title: 'Edit Bank Detail',
        width: '360px'
      });
    if (value) {
      await this.initPanStatements();
    }
  }

  async viewImage($event: MouseEvent, d: any) {
    $event.preventDefault();
    $event.stopPropagation();
    this.imageSrc = d.image_path;
    await this.matDialog.open(this.imageTemplate, {panelClass: 'selection-dialog', minWidth: '520px'});
  }

  backBtn() {
    window.history.go(-1);
  }


}
