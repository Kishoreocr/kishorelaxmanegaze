import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  public data: any[] = [{ "id": "tab1", "key": "I cannot find a package that suits me", "va": "Please select custom package and our Admin team will work with you to create a suitable package based on your requirements" },
  { "id": "tab2", "key": "Do you offer management services?", "va": "Management services will be provided upon request" },
  { "id": "tab3", "key": "Is My Data Secure…?", "va": "Yes" },
  { "id": "tab4", "key": "Do you offer legal services/document verification?", "va": " Yes, as an additional service." },
  { "id": "tab5", "key": "How long does it take for initial feedback on my property?", "va": "Initial feedback will be provided after 3-4 working days based on document verification. Our Support team will be in touch during the process." },
  { "id": "tab6", "key": "Can I monitor a property that does not belong to me?", "va": "No, we only offer services for properties belonging to you or your family members." },
  { "id": "tab7", "key": "How frequently does eGaze team visit the property?", "va": "We do it on a monthly basis. We do offer additional visits as add-on services." },
  { "id": "tab8", "key": "Do you offer services in rural areas?", "va": "Yes" },
  { "id": "tab9", "key": "Do you offer property verification/quality check services on handover from builders?", "va": "Yes, we have a detailed checklist that we follow to verify/quality check of properties during handover from builders" },
  { "id": "tab10", "key": "Can I buy a package offline?", "va": "Yes, through our support team" },
  { "id": "tab11", "key": "Do you offer help during registration formalities on my behalf?", "va": "Yes" }];
  showIcon: any;
  hForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.hForm = this.fb.group({
      searchkey: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() { return this.hForm.controls; }
  filterdata: any;
  kadata: any = this.data;
  datachange() {
    if (this.hForm.value.searchkey === '') {
      this.data = this.kadata;

    }
  }
  saveUser(form) {
    this.filterdata = [];
    this.data = this.kadata;
    this.data = this.data.filter(
      item => {
        if (item.key.toLowerCase().indexOf(this.hForm.value.searchkey.toLowerCase()) > -1) {
          this.filterdata.push(item);
        }
      });
    this.data = this.filterdata;
  }
  // chaneIcon(item){
  //    item.id = !item.id;
  // }
}
