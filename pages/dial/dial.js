// pages/dial/dial.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 创建一个字典对象
  info: {
    type: "老字号"
  },
  laternext: function (e) {
    this.info.type = e.detail.value;//获取radio值，类型：字符串
    console.log(this.info.type)
  },
  // 获取输入的内容
  handleinfo(e) {
    this.info.address = e.detail.value
    console.log(this.info.address)
  },
  // 拨打商户打电话
  phonecall: function (e) {
    console.log(this.info.type,this.info.address)
    if (!this.info.address) {
      console.log('地址未填写：', this.info.address)
      wx.showToast({
        title: '地址不能为空',
        icon: 'info',
        duration: 3000
      })
    } else {
      wx.request({
        url: '上传数据的接口',
        data: {
          type: this.info.type,
          address: this.info.address
        }
      })
      wx.makePhoneCall({
        phoneNumber: "13396089753"
        // phoneNumber: this.data.array[e.target.dataset.sss].contact
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})