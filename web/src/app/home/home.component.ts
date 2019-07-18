import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  isLoading: boolean = false;
  ip: string;
  result = {
    ip: '',
    country: '',
    province: '',
    city: '',
    isp: ''
  };
  constructor(
    private http: HttpClient,
    private msg: NzMessageService
  ) { }

  ngOnInit() {
    this.getIp();
  }

  getIp() {
    this.isLoading = true;
    this.http.get(environment.api + 'getIp').subscribe((r: any) => {
      this.result = r.data;
      this.ip=this.result.ip;
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
      this.msg.error(err.message, { nzDuration: 4000 });
    })

  }
  lookUp() {
    this.isLoading = true;
    this.http.get(environment.api + 'lookUp', {
      params: {
        ip: this.ip
      }
    }).subscribe((r: any) => {
      this.result = r.data;
      this.isLoading = false;
    }, (err) => {
      console.log(err);
      this.isLoading = false;
      this.msg.error(err.message, { nzDuration: 4000 });
    })

  }
}
