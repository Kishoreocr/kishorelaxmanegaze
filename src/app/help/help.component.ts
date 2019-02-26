import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  public data: any[] = [{ "id": "tab1", "key": "What does property monitoring service mean?", "va": "It means we will check & validate the encumbrance certificate of your property, inspect your property at least once a month, and do maintenance as per your instructions." },
  { "id": "tab2", "key": "Do I need to come once to my property or your office to register?", "va": "Not at all, unless you want to. You can directly register online and we will contact you to understanding your requirements." },
  { "id": "tab3", "key": "I cannot find a package that suits me", "va": "Please select custom package and our Admin team will work with you to create a suitable package based on your requirements" },
  { "id": "tab4", "key": "Do you offer management services?", "va": "Yes property management services are provided upon request. However, do take a look at our Additional Services under the Services page to get an idea." },
  { "id": "tab5", "key": "Is my data secure?", "va": "Yes, you may rest assured that any kind of data related to you or your property is secure with us. We will send you a written contract that makes us legally liable to protect and secure your data." },
  { "id": "tab6", "key": "Do you offer legal services/document verification?", "va": "Yes, we can verify any kind of property document or provide legal services as per demand. " },
  { "id": "tab7", "key": "How long does it take for initial feedback on my property?", "va": "The initial feedback is provided after 3-4 working days from the day of document verification. Our Support team will be in touch during the process." },
  { "id": "tab8", "key": "Can I monitor a property that does not belong to me?", "va": "No, we only offer services for properties belonging to you or your family members." },
  { "id": "tab9", "key": "How frequently does eGAZEteam visit the property?", "va": "As a minimum requirement, we inspect your property once a month. We also offer additional visits as add-on services." },
  { "id": "tab10", "key": "Do you offer services in rural areas?", "va": "Rural areas are our main center of focus in monitoring properties. We also cover suburban areas." },
  { "id": "tab11", "key": "Do you offer property verification/quality check services on handover from builders?", "va": "Yes, we have a detailed checklist that we follow to verify/quality check of properties during handover from builders" },


  { "id": "tab12", "key": "Can I buy a package offline?", "va": "Yes, through our support team" },
  { "id": "tab13", "key": "Do you offer help during registration formalities on my behalf?", "va": "Yes." },
  { "id": "tab14", "key": "I need help in understanding the various prevailing laws and regulations about property monitoring and maintenance.", "va": "We can provide consultation for the same." },
  { "id": "tab15", "key": "I need some basic services such as electricity maintenance, parking lot and garden maintenance. ", "va": "We can appoint a caretaker on your behalf and undertake upkeep ourselves. " },
  { "id": "tab16", "key": "I am in Mumbai and my property is in Bangalore suburbs. Can I get monitoring services?", "va": "Yes, we can monitor any property situated in Bangalore, Mangalore and Andhra Pradesh & Telangana. We are opening in other cities soon." },

];
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
