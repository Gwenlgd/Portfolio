// Scrambling Letters Effect
const app = {};

const Messenger = function(el){
  'use strict';
  let m = this;

  m.init = function(){
  m.codeletters = "&#*+%?£@-§$`";
  m.message = 0;
  m.current_length = 0;
  m.fadeBuffer = false;
  m.messages = [
      'Hi, I am Gwen!'
  ];

  setTimeout(m.animateIn, 2000);
  };

  m.generateRandomString = function(length){
  let random_text = '';
  while(random_text.length < length){
      random_text += m.codeletters.charAt(Math.floor(Math.random()*m.codeletters.length));
  }

  return random_text;
  };

  m.animateIn = function(){
  if(m.current_length < m.messages[m.message].length){
      m.current_length = m.current_length + 2;
      if(m.current_length > m.messages[m.message].length) {
      m.current_length = m.messages[m.message].length;
      }

      let message = m.generateRandomString(m.current_length);
      $(el).html(message);

      setTimeout(m.animateIn, 200);
  } else {
      setTimeout(m.animateFadeBuffer, 500);
  }
  };

  m.animateFadeBuffer = function(){
  if(m.fadeBuffer === false){
      m.fadeBuffer = [];
      for(let i = 0; i < m.messages[m.message].length; i++){
      m.fadeBuffer.push({c: (Math.floor(Math.random()*12))+1, l: m.messages[m.message].charAt(i)});
      }
  }

  let do_cycles = false;
  let message = '';

  for(let i = 0; i < m.fadeBuffer.length; i++){
      let fader = m.fadeBuffer[i];
      if(fader.c > 0){
      do_cycles = true;
      fader.c--;
      message += m.codeletters.charAt(Math.floor(Math.random()*m.codeletters.length));
      } else {
      message += fader.l;
      }
  }

  $(el).html(message);

  if(do_cycles === true){
      setTimeout(m.animateFadeBuffer, 100);
  } else {
      setTimeout(m.cycleText, 1000);
  }
  };

  m.cycleText = function(){
  m.message = m.message + 1;
  if(m.message >= m.messages.length){
      m.message = 0;
  }

  m.current_length = 0;
  m.fadeBuffer = false;
  $(el).html('');

  setTimeout(m.animateIn, 200);
  };

  m.init();
}
console.clear();
let messenger = new Messenger($('#messenger'));

app.menuSlide();

// Switch to Light Mode
app.switchLight = () => {
  const toggleLight = $('#light-dark');

  toggleLight.on('click', function(){
      $('body').toggleClass('light');

  })
}
