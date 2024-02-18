function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML = h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}

function printTimeZone() {
    document.getElementById('timezone').innerHTML = 
        "UTC - " + Intl.DateTimeFormat().resolvedOptions().timeZone   
}

const autoplayUnlock = (element) => {
    let context = new (window.AudioContext || window.webkitAudioContext)();

    return new Promise(function (resolve, reject) {
        if (context.state === 'suspended') {
            let unlock =  () => {
                context.resume()
                    .then(function () {
                        window.removeEventListener('keydown', unlock);
                        element.removeEventListener('click', unlock);
                        element.removeEventListener('touchstart', unlock);
                        element.removeEventListener('touchend', unlock);

                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
            };

            window.addEventListener('keydown', unlock, false);
            element.addEventListener('click', unlock, false);
            element.addEventListener('touchstart', unlock, false);
            element.addEventListener('touchend', unlock, false);

        } else {
            resolve();
        }
    });
}

let autoplayUnlockElement = document;

const playButton = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
<path 
  d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"
/>
</svg>`;

const pauseButton = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z"/>
</svg>`;

const soundsSources = [
    'céu..mp3', 
    'lights..mp3', 
    'miss_you.mp3', 
    'wind..mp3'
];

let index = Math.floor(Math.random() * soundsSources.length);
let sound = new Audio();

const playMusic = (index) => {
    sound.pause();
    sound = new Audio(`src/audios/${soundsSources[index]}`);
    sound.play();
    sound.volume = 0.2;
    document.getElementById('music-name').innerHTML = soundsSources[index];

    sound.addEventListener('ended', (_ => {
        index++;
        index = index >= soundsSources.length ? 0 : index; 
        playMusic(index);
    }))
}

autoplayUnlock(autoplayUnlockElement)
    .then(() => {
        playMusic(index);

        if(sound.paused) {
            document.querySelector('.play').innerHTML = playButton;
            return;    
        }

        document.querySelector('.play').innerHTML = pauseButton;
    }).catch(console.error);

document.querySelector('.play').addEventListener('click', _ => {
    if(sound.paused) {
        sound.play();
        document.querySelector('.play').innerHTML = pauseButton;
        return;
    }

    sound.pause();
    document.querySelector('.play').innerHTML = playButton;
    return;
})

document.querySelector('.prev').addEventListener('click', _ => {
    index--;
    index = index < 0 ? soundsSources.length - 1 : index;
    playMusic(index);
})

document.querySelector('.next').addEventListener('click', _ => {
    index++;
    index = index >= soundsSources.length ? 0 : index; 
    playMusic(index);
})
    
startTime();
printTimeZone();