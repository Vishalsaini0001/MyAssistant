const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');


const data = [

    {
        image: './img/drink.jpg',
        text: "I'm Thirsty"
    },
   {
        image: './img/food.jpeg',
        text: "I'm Hungry"
    },
    {
        image: './img/angry.jpeg',
        text: "I'm Angry"
    },
    {
        image: './img/happy.jpeg',
        text: "I'm Happy"
    },
    {
        image: './img/tired.jpeg',
        text: "I'm Tired"
    },
    {
        image: './img/hurt.avif',
        text: "I'm Hurt"
    },
    {
        image: './img/sad.jpeg',
        text: "I'm Sad"
    },
   
    {
        image: './img/scared.png',
        text: "I'm Scared"
    },
    {
        image: './img/outside.jpeg',
        text: "I Want To Go Outside"
    },
    {
        image: './img/home.avif',
        text: "I Want To Go Home"
    },
    {
        image: './img/gym.jpeg',
        text: "I Want To Go Gym"
    },
    {
        image: './img/dnd.jpeg',
        text: "Please Do Not Disturb Me"
    },
];

data.forEach(createBox);

// Create speech boxes
function createBox(item){
    const box = document.createElement('div');

    const { image, text } = item;

    box.classList.add('box');
    box.innerHTML=`<img src="${image}" alt="${text}" /><p class="info">${text}</p>`;

    box.addEventListener('click', () => {
      setTextMessage(text);
      speakText()

      // Add active effect
      box.classList.add('active');
      setTimeout(() => box.classList.remove('active'), 800);

    });

    main.appendChild(box);
}

//Init speach synthesis
const message = new SpeechSynthesisUtterance();

//store voices
let voices = [];

function getVoices() {
    voices = speechSynthesis.getVoices();

    voices.forEach(voice => {
        const option = document.createElement('option');

        option.value = voice.name;
        option.innerText=`${voice.name} ${voice.lang}`;

        voicesSelect.appendChild(option);

    });
}


//set text
function setTextMessage(text) {
  message.text = text;
}

//speak text
function speakText(){
  speechSynthesis.speak(message);
}

//set voice
function setVoice(e){
  message.voice = voices.find(voice => voice.name === e.target.value);

}

//voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices)

//toggle text box

toggleBtn.addEventListener('click', () => 
    document.getElementById('text-box').classList.toggle('show')
);

//close button

closeBtn.addEventListener('click', () => 
    document.getElementById('text-box').classList.remove('show')
);

//change voice
voicesSelect.addEventListener('change', setVoice);

//read text button
readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
})

getVoices();





/*
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const startBtn = document.querySelector('#startBtn');
const stopBtn = document.querySelector('#stopBtn');
const result = document.querySelector('#result');

recognition.continuous = true;

recognition.onstart = () => {
  console.log('Speech recognition service has started');
  startBtn.disabled = true;
  stopBtn.disabled = false;
};

recognition.onresult = (event) => {
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  result.textContent += transcript;
};

recognition.onerror = (event) => {
  console.log('Error occurred in recognition: ' + event.error);
};

startBtn.addEventListener('click', () => {
  recognition.start();
});

stopBtn.addEventListener('click', () => {
  recognition.stop();
  startBtn.disabled = false;
  stopBtn.disabled = true;
});*/



const startBtn = document.querySelector('#startBtn');
const stopBtn = document.querySelector('#stopBtn');
const clearBtn = document.querySelector('#clearBtn');
const result = document.querySelector('#result');
let recognition;

if (annyang) {
  const commands = {
    '*text': (text) => {
      result.textContent += text;
    }
  };

  recognition = annyang;
  recognition.addCommands(commands);

  recognition.onSoundStart = () => {
    console.log('Speech recognition service has started');
    startBtn.disabled = true;
    stopBtn.disabled = false;
  };

  recognition.onSoundEnd = () => {
    console.log('Speech recognition service has stopped');
    startBtn.disabled = false;
    stopBtn.disabled = true;
  };

  recognition.onError = (event) => {
    console.log('Error occurred in recognition: ' + event.error);
  };
}

startBtn.addEventListener('click', () => {
  if (recognition) {
    recognition.start({ autoRestart: false });
  }
});

stopBtn.addEventListener('click', () => {
  if (recognition) {
    recognition.abort();
  }
});

clearBtn.addEventListener('click', () => {
  result.textContent = ' ';
});








