import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const script1 = document.createElement('title');
    script1.text = "404 HTML Template by Colorlib"
    document.body.appendChild(script1);
    const script2 = document.createElement('link');
    script2.href = "https://fonts.googleapis.com/css?family=Montserrat:500";
    script2.rel = "stylesheet"
    document.body.appendChild(script2);
    const script3 = document.createElement('link');
    script3.href = "https://fonts.googleapis.com/css?family=Titillium+Web:700,900";
    script3.rel = "stylesheet"
    document.body.appendChild(script3);
    const script4 = document.createElement('link');
    script4.rel = "stylesheet"
    script4.type = "text/css"
    script4.href = "./assets/page_not_found/css/style.css";
    document.body.appendChild(script4);
    const script5 = document.createElement('script');
    script5.src = "https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"
    document.body.appendChild(script5);
    const script6 = document.createElement('script');
    script6.src = "https://oss.maxcdn.com/respond/1.4.2/respond.min.js"
    document.body.appendChild(script6);
  }

}
