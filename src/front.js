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

let firstClick = 0;

// const playMusic = () => {
//         const sound = new Audio("src/audios/miss_you.mp3")
//         sound.loop = true;
//         sound.volume = 0.2
//         sound.play();
//         document.getElementById('music-name').innerHTML = "miss_you.mp3";
//         firstClick = firstClick + 1;
//         return
// }

// document.body.addEventListener("mousedown", (event) => {
//     if(firstClick < 1) {
//         playMusic();   
//     }
// })

// document.body.addEventListener("touchstart", (event) => {
//     if(firstClick < 1) {
//         playMusic();   
//     }
// })

function autoplayUnlock(element) {
    var context = new (window.AudioContext || window.webkitAudioContext)();

    return new Promise(function (resolve, reject) {
        if (context.state === 'suspended') {
            var unlock = function unlock() {
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

var autoplayUnlockElement = document;

autoplayUnlock(autoplayUnlockElement)
    .then(function () {
        const sound = new Audio("src/audios/miss_you.mp3")
        sound.loop = true;
        sound.volume = 0.2
        sound.play();
        document.getElementById('music-name').innerHTML = "miss_you.mp3";
    })
    .catch(function (error) {
        console.error(error);
    });

startTime()
printTimeZone()