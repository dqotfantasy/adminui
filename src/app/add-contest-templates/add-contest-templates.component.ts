import { Component,Input,OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { FormService } from '../_services/form.service';
import { DataService } from '../_services/data.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from "@angular/forms";


@Component({
  selector: 'app-add-contest-templates',
  templateUrl: './add-contest-templates.component.html',
  styleUrls: ['./add-contest-templates.component.scss']
})

export class AddContestTemplatesComponent  implements OnInit {
  base='contest-templates';
  data = [];
  selected_cat = [];
  checked = true;
  masterSelected:boolean;
  childSelected:boolean;
  cat:string;
  page = 0;
  def_inning = 0;
  
  innings=[
    {id:0,name:'Full Inning'},
    {id:2,name:'Second Inning'},
    {id:3,name:'Third Inning'},
    {id:4,name:'Fourth Inning'},
  ];

  @Input('userId') userId = '';
  @Input('fixtureId') fixtureId = '';

  perPage = 0;
  constructor(private api: ApiService,
    private formService: FormService,
    public dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

      this.activatedRoute.paramMap.subscribe(value => {
        if(value.get('fixtureId')) {
          this.fixtureId = value.get('fixtureId');
          this.init().then();
          this.dataService.setTitle('Fixtures');
        }
      });
      this.masterSelected = false;
      this.childSelected = false;
  }

  ngOnInit() {
    this.cat = null;
  }

  async init() {
    let params = new HttpParams();
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('fixtureId', this.fixtureId);
    params = params.set('def_inning', this.def_inning);

    const value = await this.api.get(this.base, { params }).toPromise();
    this.data = value.data.contest_templates;
    this.selected_cat = value.data.selected_data;

  }

  async findcontest(getValue){
    this.def_inning = getValue;
    let params = new HttpParams();
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('fixtureId', this.fixtureId);
    params = params.set('def_inning', this.def_inning);
    params = params.set('category_temp', "category");

    const value = await this.api.get(this.base, { params }).toPromise();
    this.selected_cat = value.data.selected_data
  }

  changeCt(ctName){
    this.cat=ctName;
    return true;
  }

  valueExists(id){
    return this.selected_cat.some(function(el) {
      return el.contest_template_id === id;
    });
  }

  contestDataSubmit (contestDataSubmit){

    let _int = {}
    let _string = {}
    Object.keys(contestDataSubmit).map(key=>{
      let num = parseInt(key) + 1
      if(isNaN(num)){
        _string[key] = contestDataSubmit[key]
      }else{
        _int[key] = contestDataSubmit[key]
      }

    })
    let _data ={
      fixtureId:this.fixtureId,
      contData:_int,
      inningData:_string
    }
    this.api.post(this.base, _data).subscribe((value) => {
      if (value.status) {
        console.log("success");
        this.router.navigate(['/fixtures']);
      }else{
        console.log("error");
      }
    });
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll() {
    for (var i = 0; i < this.data.length; i++) {
      this.data[i].isSelected = this.masterSelected;
    }
  }


  childCheckUncheckAll(categorey) {
    for (var i = 0; i < this.data.length; i++) {
      if(categorey==this.data[i].ct_name) {
        this.data[i].isSelected = this.childSelected;
      }
    }
    this.childSelected=false;
  }

}
