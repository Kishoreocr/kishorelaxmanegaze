import { Component, OnInit } from '@angular/core';
import { EgazeService } from '../services/egaze.service';
import { SessionstorageService } from '../services/sessionstorage.service';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { AppConstants } from '../services/constants';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  public payuform: any = {};
  res: any;
  disablePaymentButton: boolean = true;
  user: any;
  package: any;
  isLoading: boolean = false;
  public payPalConfig?: PayPalConfig;
  amt:any;
  constructor(private route: ActivatedRoute, private EgazeService: EgazeService, private sessionstorageService: SessionstorageService) {

  }
  pres: any;

  ngOnInit() {
   // this.initConfig();

    this.user = JSON.parse(this.sessionstorageService.getUserDetails() + "");
    console.log("user=" + JSON.stringify(this.user));
    this.route.queryParamMap.subscribe(params => {
      if (params.get('package')) {
        this.package = params.get('package');
      }
    });
    this.isLoading = true;

    this.EgazeService.getPackage(this.package).subscribe(data => {
      this.isLoading = false;

      this.pres = data;
      this.payuform.productinfo = this.pres.packageName;
      this.payuform.amount = parseInt(this.pres.price) + (parseInt(this.pres.price) * 18 / 100);
this.amt=this.payuform.amount;
      //this.payuform.amount = 1;
      this.payuform.packageId = this.pres.id;
    });
    this.payuform.custId = this.user.loginId;
    this.payuform.email = this.user.email;
    this.payuform.firstname = this.user.firstName;
    this.payuform.phone = this.user.mobile;
    // if(this.package === 1){
    //   this.payuform.productinfo = "MONTHLY";
    // }else{
    //   this.payuform.productinfo = "YEARLY";
    // }
    //this.payuform.amount = "11.00";
    this.payuform.salt = AppConstants.paymentSalt;
    this.payuform.serviceprovider = AppConstants.paymentServiceProvider;
    this.payuform.paymentaction = AppConstants.paymentActionurl;
  }
  confirmPayment() {
    const paymentPayload = {
      email: this.payuform.email,
      name: this.payuform.firstname,
      phone: this.payuform.phone,
      productInfo: this.payuform.productinfo,
      amount: this.payuform.amount,
      custId: this.payuform.custId,
      packageId: this.payuform.packageId
    }
    //alert(paymentPayload)
    this.isLoading = true;
    this.EgazeService.sendpaymnet(paymentPayload).subscribe(data => {
      console.log(data);
      this.isLoading = false;
      this.res = data;
      this.payuform.txnid = this.res.txnId;
      this.payuform.surl = AppConstants.paymentSurl;
      this.payuform.furl = AppConstants.paymentFurl;
      this.payuform.key = AppConstants.paymentKey;
      this.payuform.hash = this.res.hash;
      this.disablePaymentButton = false;

    },
      error => {

      });
    
     
    //this.initConfig();
  }
  initConfig() {
    this.payuform.amount=1;
    this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Production, {
      commit: true,
      client: {
       // sandbox: 'ATDBazd-7r4sYy2MjJQeIjjZIY9KV04PlTax_nRXoBKIns2t0QvF1JwF2AIlmpGs8K4v_t1DJwjTiR_i',
        production: 'Aa9yS2ZZBaO_seaVnVxV1axVGOoYSVRpbJ1Orc6jVoW_vf3-yzXRxXcIR58LudVv0y7FxFnKXuvm924F'
      },
      button: {
        label: 'paypal',
      },
      onPaymentComplete: (data, actions) => {
        console.log('OnPaymentComplete' + JSON.stringify(data));
      },
      onCancel: (data, actions) => {
        console.log('OnCancel'+ JSON.stringify(data));
      },
      onError: (err) => {
        console.log('OnError' + err);
      },
      transactions: [
        {
          amount: {
            total: this.payuform.amount,
            currency: 'INR',
            // details: {
            //   subtotal: 30.00,
            //   tax: 0.07,
            //   shipping: 0.03,
            //   handling_fee: 1.00,
            //   shipping_discount: -1.00,
            //   insurance: 0.01
            // }
          },
          custom: 'Custom value',
          item_list: {
            items: [
              {
                name: 'Package',
                description: this.payuform.productinfo,
                quantity: 1,
                price:this.payuform.amount ,
                // tax: 0.01,
                sku: '1',
                currency: 'INR'
              }],
            shipping_address: {
              recipient_name: this.payuform.firstname,
              line1: 'egaze',
              line2: 'egaze',
              city: 'Hyd',
              country_code: 'in'.toUpperCase(),
              postal_code: '000',
              phone: this.payuform.phone,
              state: 'egaze'
            },
          },
        }
      ],
      note_to_payer: 'Contact us if you have troubles processing payment'
    });
 }

}
