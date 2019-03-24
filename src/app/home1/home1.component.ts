import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { SlideInOutAnimation } from '../animations';
import { SessionstorageService } from '../services/sessionstorage.service';
import * as CryptoJS from 'crypto-js';
declare var $ :any;

@Component({
  selector: 'app-home1',
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.css'],
  animations: [SlideInOutAnimation]
})
export class Home1Component implements OnInit {
  isScollDown: boolean = false;
  animationState = 'in';
  constructor(private _eref: ElementRef, private sessionstorageService: SessionstorageService) { }
  user: any;
  ngOnInit() {
    $('#home-carousel').carousel('cycle')

    this.user = JSON.parse(this.sessionstorageService.getUserDetails() + "");
    // const key = CryptoJS.enc.Utf8.parse('7061737323313233');
    // const iv = CryptoJS.enc.Utf8.parse('7061737323313233');
    // const encrypted = CryptoJS.AES.encrypt('Kishore am sudipta', key, {
    //   keySize: 16,
    //   iv: iv,
    //   mode: CryptoJS.mode.ECB,
    //   padding: CryptoJS.pad.Pkcs7
    // });
    // console.log('encrypted :' + encrypted);

    // const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    //   keySize: 16,
    //   iv: iv,
    //   mode: CryptoJS.mode.ECB,
    //   padding: CryptoJS.pad.Pkcs7
    // });
    // console.log('decrypt :' + decrypted.toString(CryptoJS.enc.Utf8));
    
  }

  bgColorchange = false;
  toggleShowDiv(divName: string) {
    if (divName === 'divA') {
      debugger;
      this.bgColorchange = true;
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
      console.log(this.animationState);

    }
  }
  closeSidebar(divName: string) {
    this.bgColorchange = false;
    this.animationState = this.animationState === 'out' ? 'in' : 'out';

  }

  // @HostListener('document:click', ['$event']) 
  // clickedOutside($event){

  //   if (!this._eref.nativeElement.contains(event.target)){
  //   this.bgColorchange = false;
  //   this.animationState = this.animationState === 'out' ? 'in' : 'out';
  //   }
  // }


  @HostListener('window:scroll', ['$event'])
  headerStick(event) {
    if (window.pageYOffset > 100) {
      this.isScollDown = true;
    }
    else {
      this.isScollDown = false;
    }
  }
}
