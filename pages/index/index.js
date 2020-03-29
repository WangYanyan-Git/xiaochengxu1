// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songs:[], //全部的歌曲
    tapsname:[],//点击拼接的歌名
    sindex:0, //从哪首开始的
    isdone:false //代表是否点击完了
  },
  //开始
 startopen:function(){
   //调取接口
   wx.request({
     url: 'https://7765-web36-gkc6x-1300893281.tcb.qcloud.la/mock/sons.json?sign=4aa1dff39f30655b766ec49c8664ae4c&t=1576134209', 
     success:(res) =>{
       let ylength = res.data.data[this.data.sindex].songname.length;
       for (let i = 0; i < ylength;i++){
         this.data.tapsname[i]="";
       }
        
        this.setData({
          songs: res.data.data,
          tapsname: this.data.tapsname
        })
       console.log(res.data.data);
     }
    
   })
 },
 //点击每个汉字
  tapview:function(e){
    let h = this.data.tapsname.length;
    for (let j = 0; j < h;j++){
      if (j === h-1){
        this.setData({
          isdone:true
        })
      }
      if (this.data.tapsname[j]==""){
        this.data.tapsname[j] = e.target.id;
        break;
      }
     }
    this.setData({
      tapsname: this.data.tapsname
    })
    this.isok();
  },
  //将已点击的数组清空
  y:function(){
   
    for (let i = 0; i < this.data.songs[this.data.sindex].songname.length; i++) {
      this.data.tapsname[i] = "";
    }
    this.setData({
      tapsname: this.data.tapsname
    })
  },
  //判断是否正确
  isok:function(){
    if (this.data.isdone){
       let tapsname = this.data.tapsname.join(''),
         sname = this.data.songs[this.data.sindex].songname;
    
       if (tapsname === sname) {
         wx.showModal({
           title: '提示',
           content: '正确，点击下一个',
           showCancel:false,
           success:(res) =>{
             if (res.confirm) {
               if (this.data.songs.length-1 == this.data.sindex){
                 wx.navigateTo({
                   url: '/pages/end/end',
                 })
              }else{
                 this.setData({
                   sindex: this.data.sindex + 1,
                   isdone: false
                 })
                this.y();
              }
             } 
           }
         })
       }else{
         wx.showToast({
           title: '错误',
           icon: 'none',
           duration: 2000
         })
       }
     }
     
  },
  //点击每一个input，去清空原有的值
  tapinput:function(e){
    this.data.tapsname[e.target.id]="";
    this.setData({
      tapsname: this.data.tapsname
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'seen',
      success:(res)=> {
        if (res.data){
          this.startopen();
        }
      },
      fail:()=>{
        wx.navigateTo({
          url: '/pages/start/start',
        })
      }
    })
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