//logs.js
// pages/publish/publish.js
var idx = require('../index/index.js')
var util = require('../../utils/util.js')
Page({
  data: {
    swiperIndex: 0,
    image: [],
    Explain: "标题最多显示50字！",
    Explain1:'地点请填写4字以内！',
    Explain2: '事件请填写4字以内！',
    Explain4: '名字方便备注哦',
    Explain5: '物美价廉nice!',
    Explain6: '请填写您的手机号！',
    flag:true,
  },
  swiperChange(e) {
    var that = this;
    that.setData({
      swiperIndex: e.detail.current,           /*定义当前数据的swiperIndex等于当前数据的current*/
    })
  },
  info: {
    pic:[]
  },
  handleinfo(e) {
    this.info.title = e.detail.value
  },
  handleinfo1(e) {
    this.info.address = e.detail.value
  },
  handleinfo2(e) {
    this.info.incident = e.detail.value
  },
  handleinfo4(e) {
    this.info.name = e.detail.value
  },
  handleinfo5(e) {
    var price = e.detail.value
    this.info.price=parseInt(price)
    console.log(typeof this.info.price)
  },
  handleinfo6(e) {
    this.info.tel = e.detail.value
  },
  handlepic(e) {
    this.info.pic.push(e)
  },
  handleClick() {
    var _this = this;
    // this.info.time = util.formatTime(new Date())
    // console.log(util.formatTime(new Date()))
    console.log(this.info)
    wx.request({
      url: 'http://192.168.13.128:8000/publication_info',
      data: this.info,
      method: "post",
      success: function(res){
        _this.handlePublishSuccess()
        console.log(res)
      },
      fail:function(){
        console.log("发布请求失败")
      }
    })
  }, 
  handlePublishSuccess(data) {
    this.setData({
      flag:false
    })
  },
  handleHome(){
    wx.navigateBack({
      url: '../index/index',
    })
  },
  uploadpic: function () {
    let that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },
  chooseWxImage: function (type) {
    var that = this;
    wx.chooseImage({
      count: 5,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        // console.warn(tempFilePaths, 'tempFilePaths')
        // console.warn(tempFilePaths.length)
        for (let i = 0; i < tempFilePaths.length; i++) {
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[i], //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
              that.handlepic(res.data)
            }
        })
        }
       
        that.setData({
          image: [...that.data.image, ...tempFilePaths]
        })
      }
    })
  },
  admin:function(e){
    wx.previewImage({
      current: "", // 当前显示图片的http链接
      urls: ['https://huzing2524.oss-cn-shenzhen.aliyuncs.com/tenement/test/default.jpg']// 需要预览的图片http链接列表
    })
  }
})
