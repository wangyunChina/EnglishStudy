//index.js
//获取应用实例
const app = getApp()
var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
   temp:"",
    temperature:"",
    weather: "",
    city: "",
    week: "",
    wind: "",
    select:false,
    cid:null,
  },
  getWeather:function(cid){
    var that=this;
    wx.request({
      url: 'https://sapi.k780.com/?app=weather.today&weaid='+cid+'&appkey=49970&sign=6211777879fabf24dbaa4a04117971be&format=json ',
      method:"GET",
      header: {
        'Content-Type': 'json'
      },
      success:function(res)
      {
        var data=res.data.result;
        console.log(data);
        that.setData({ temp:data.temp_curr });
        that.setData({temperature:data.temperature});
        that.setData({ weather: data.weather});
        that.setData({ week: data.week});
        that.setData({ wind: data.wind});
      }
    })
  },
  
  onShow:function(){
    var that=this;
    qqmapsdk = new QQMapWX({

      key: 'RPIBZ-X7IL4-BTUUB-DY3OS-S2SFF-TCFS4'

    });
    console.log("开始获取位置！");
    wx.getLocation({
      success: function(res) {
        console.log("定位成功！");
        console.log(res);
        var longitude = res.longitude;
        var latitude = res.latitude;
       
          let qqmapsdk = new QQMapWX({
            key: 'PKIBZ-PRXC4-ZRHUF-XQ6XH-AW2K7-F7FUM'
          })
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: latitude,
              longitude: longitude
            },
            success: function (res) {
              var city = res.result.address_component.district;
              console.log(city);
              var reg=new RegExp('区','gi');
              city=city.replace(reg,'');
              var reg = new RegExp('市', 'gi');
              city = city.replace(reg, '');
              var reg = new RegExp('自治区', 'gi');
              city = city.replace(reg, '');
              var reg = new RegExp('自治县', 'gi');
              city = city.replace(reg, '');
              console.log(city);
              that.setData({ cid: city});
              that.setData({ city: res.result.address_component.city +res.result.address_component.district})

              that.getWeather(city);
              console.log(res, 'success')

            },
            fail: function () {
              wx.hideLoading();
              console.log("获取位置失败！");
              wx.getSetting({
                success: function (res) {
                  if (!res.authSetting['scope.userLocation']) {
                    that.showModal({
                      title: '',
                      content: '请允许****获取您的定位',
                      confirmText: '授权',
                      success: function (res) {
                        if (res.confirm) {

                          that.openSetting();
                        } else {
                          console.log('get location fail');
                        }
                      }
                    })
                  } else {
                    //用户已授权，但是获取地理位置失败，提示用户去系统设置中打开定位
                    that.showModal({
                      title: '',
                      content: '请在系统设置中打开定位服务',
                      confirmText: '确定',
                      success: function (res) {
                      }
                    })
                  }
                }
              })
            }

      
          
          
          
          
          })
        
      
       

      },
    })



  },
  clikme:function(){
    console.log("clik me");
  },
  


  
})
