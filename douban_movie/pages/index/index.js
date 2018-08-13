//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    movingDatas: null // 正在上映
  },
  onLoad: function() {
    this.loadMovie();
  },
  loadMovie() {
    wx.showLoading({
      title: '正在请求',
    })
    let thispage = this
    wx.request({
      url: 'http://op.juhe.cn/onebox/movie/pmovie?city=广州&key=d2fe46b173d137854c3be89244d0202d',
      header: {
        "content-type": 'json'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log('success: ' + res)
        if (res.data.error_code != 0) {
          wx.showToast({
            title: res.data.reason,
            icon: 'none',
            duration: 1500
          })
          return
        }

        let datas = res.data.result.data[0].data
        thispage.setData({
          movingDatas: datas
        })
      },
      fail: function(res) {
        console.log('fail: ' + res)
        wx.showToast({
          title: '请求失败',
          icon: 'none',
          duration: 1500
        })
      },
      complete: function(res) {
        wx.hideLoading()
      },
    })
  }
})