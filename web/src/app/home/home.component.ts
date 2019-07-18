import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { MapOptions } from 'angular2-baidu-map';
declare var BMap: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  isLoading: boolean = false;
  options: MapOptions;
  deviceMap: any;
  ip: string;
  result = {
    success:true,
    msg:'解析成功',
    data: {
      ip: '',
      country: '',
      province: '',
      city: '',
      isp: ''
    }
  };
  constructor(
    private http: HttpClient,
    private msg: NzMessageService
  ) {
    this.options = {
      centerAndZoom: {
        lat: 39.920116,
        lng: 116.403703,
        zoom: 16
      },
      enableKeyboard: false
    };
  }

  ngOnInit() {

  }

  getIp() {
    this.isLoading = true;
    this.http.get(environment.api + 'getIp').subscribe((r: any) => {
      this.result = r;
      this.deviceMap.centerAndZoom(this.result.data.city);
      this.ip = this.result.data.ip;
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
      this.msg.error(err.message, { nzDuration: 4000 });
    })

  }

  lookUp() {
    if (!this.isValidIP(this.ip)) {
      this.msg.info("无效IP");
      return;
    }
    this.isLoading = true;
    this.http.get(environment.api + 'lookUp', {
      params: {
        ip: this.ip
      }
    }).subscribe((r: any) => {
      this.result = r;
      this.deviceMap.centerAndZoom(this.result.data.city);
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
      this.msg.error(err.message, { nzDuration: 4000 });
    })
  }

  initData(map) {
    this.deviceMap = map;
    this.deviceMap.enableScrollWheelZoom(false);
    this.getIp();
  }

  isValidIP(ip) {
    var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    return reg.test(ip);
  }
}
