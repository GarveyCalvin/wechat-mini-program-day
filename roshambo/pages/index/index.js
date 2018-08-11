//index.js
//获取应用实例
let timer
let numAI = 0
let winNumKey = 'winNum'
Page({
  data: {
    againBtnState:  false, // 按钮是否可点击
    prompt: '',
    winNum: 0,
    imageAIScr: '',
    imageUserScr: '/pages/image/question.png',
    srcs: [
      '/pages/image/shitou.png',
      '/pages/image/jiandao.png',
      '/pages/image/bu.png'
    ]
  },
  onLoad: function(options) {
    let oldWinNum = wx.getStorageSync(winNumKey)
    if (oldWinNum != null && oldWinNum != '') {
      this.setData({
        winNum: oldWinNum
      })
    }

    this.timerGo()
  },
  changeForChoose(e) {
    console.log(e)
    if (this.data.againBtnState) {
      return;
    }

    this.setData({
      imageUserScr: this.data.srcs[e.currentTarget.id]
    })

    let ai = this.data.imageAIScr
    console.log(ai)
    let user = this.data.imageUserScr
    console.log(user)
    let str = '你输了'
    if (ai == user) {
      str = '平局'
    } else if (user == '/pages/image/shitou.png' && ai == '/pages/image/jiandao.png') {
      str = '你赢了'
      this.data.winNum++
      wx.setStorageSync(winNumKey, this.data.winNum)
    } else if (user == '/pages/image/jiandao.png' && ai == '/pages/image/bu.png') {
      str = '你赢了'
      this.data.winNum++
      wx.setStorageSync(winNumKey, this.data.winNum)
    } else if (user == '/pages/image/bu.png' && ai == '/pages/image/shitou.png') {
      str = '你赢了'
      this.data.winNum++
      wx.setStorageSync(winNumKey, this.data.winNum)
    }
    this.setData({
      prompt: str
    })
    clearTimeout(timer)

    this.setData({
      againBtnState: true,
      winNum: this.data.winNum
    })
  },
  again(e) {
    console.log(e)
    if (this.data.againBtnState) {
      this.timerGo()
      this.setData({
        prompt: '',
        againBtnState: false,
        imageUserScr: '/pages/image/question.png'
      })
    }
  },
  timerGo() {
    // let thispage = this
    timer = setInterval(this.move, 200)
  },
  move() {
    if (numAI >= 3) {
      numAI = 0
    }
    this.setData({
      imageAIScr: this.data.srcs[numAI]
    })
    numAI++
  }
})