// pages/getinfo/getinfo.js
Page({
  data: {
    Explain: "用于支付请慎重填写，最多4个字哦~~",
    flag :true,
  },
  // 创建一个字典对象
  info: {
    role:"业务介绍人"
  },
  laternext: function (e) {
    this.info.role = e.detail.value;//获取radio值，类型：字符串
    console.log(this.info.role)
  },
  // 获取输入的内容
  handleinfo(e) {
    this.info.myname = e.detail.value
    console.log(this.info.myname)
  },

  /**获取手机号js代码 -------------------------------------------------------------------------------------------*/
  getPhoneNumber: function (e) {
    var ivObj = e.detail.iv
    var telObj = e.detail.encryptedData
    var codeObj = "";
    console.log(e.detail.encryptedData)
    console.log(ivObj)
    var that = this;
    // ------执行Login---------
    wx.login({
      success: res => {
        console.log('code转换', res.code);
　　　　  //用code传给服务器调换session_key
        wx.request({
          url: 'https://你的接口文件路径', //接口地址
          data: {
            appid: "wx40398f38c7130ad2",
            secret: "3c19a04cd1c5d3d430a984e9d116a9cd",
            code: res.code,
            encryptedData: telObj,
            iv: ivObj
          },
          success: function (res) {
            phoneObj = res.data.phoneNumber;
            console.log("手机号=", phoneObj)
            wx.setStorage({   //存储数据并准备发送给下一页使用
              key: "phoneObj",
              data: res.data.phoneNumber,
            })
          },
          fail: function (res) {
            console.log("请求接口失败fail")
            wx.redirectTo({
              url: '../getinfo/getinfo',
            })
          }
        })

        //-----------------是否授权，授权通过进入主页面，授权拒绝则停留在登陆界面
        if (e.detail.errMsg == 'getPhoneNumber:user deny') { //用户点击拒绝
          wx.redirectTo({
            url: '../getinfo/getinfo',
          })
        } else { //允许授权执行跳转
          console.log(e.detail.errMsg)
          if (!that.info.myname) {
            console.log('名字未填写：',that.info.myname)
            wx.showToast({
              title: '名字不能为空',
              icon: 'info',
              duration: 3000
            })
          } else {
            wx.request({
              url: '上传数据的接口',
              data:{
                role: that.info.role,
                myname: that.info.myname
              }
            })
            wx.redirectTo({
              url: '../index/index',
            })
          }
        }
      }
    });
  },
  /**
   * 页面的初始数据
   */


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

  },
})