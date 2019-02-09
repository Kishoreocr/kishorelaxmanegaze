import { Component, OnInit } from '@angular/core';
declare var $ :any;

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {
  constructor() { }

  ngOnInit() {
      $('#quote-carousel').carousel('cycle')
    }

}
