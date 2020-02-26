Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },
  onLoad: function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    })
  },
  data: {
    imgs: ['../show_img/4.jpg', '../show_img/5.jpg', '../show_img/6.jpg', '../show_img/7.jpg', '../show_img/8.jpg'],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    title:"我是广告位，敬请关注"
  },
  loadad:function(){
    wx.request({
      url: 'http://192.168.13.128:8000/page_list',
      method:'get',
      success:function(res){
        this.setData({
          title: res.data
        })
      }
    })
  }
})
