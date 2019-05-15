App.room = App.cable.subscriptions.create("RoomChannel", {
  connected: function() {
    console.log('connected')
    // Called when the subscription is ready for use on the server
  },

  disconnected: function() {
    // Called when the subscription has been terminated by the server
  },

  received: function(message) {
    const messages = document.getElementById('messages')
    messages.innerHTML += '<p>${message}</P>'
    // 入力フォームで入力したmessageをビューに表示させる
    // 送信されてきたデータをalertで知らせる。testでalert使用
    // Called when there's incoming data on the websocket for this channel
  },

  speak: function(content) {
    return this.perform('speak', {message: content});
  }
  // content情報を送る
});

// DOMContentLoadedが実行されたタイミングで
document.addEventListener('DOMContentLoaded', function(){
  const input = document.getElementById('chat-input')
  // inputフォーム取得
  //chat-inputはrooms.shownのid指定から持っでくる
  const button = document.getElementById('button')
  // buttonを定義
  button.addEventListener('click', function(){
    // buttonがクリックされた時に実行
    const content = input.value
    // inputののvalue(値)を取得
    App.room.speak(content)
    // サーバー側に送る
    input.value = ''
    // inputのvalue(値)がビューの入力フォームに残ってしまうため消えるようにする
  })
})

