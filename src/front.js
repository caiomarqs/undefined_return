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

const playMusic = () => {
    firstClick = firstClick + 1;

    const sound = new Audio("src/audios/miss_you.mp3")
    sound.loop = true;
    
    if(firstClick == 1) {
        sound.volume = 0.25
        sound.play();

        document.getElementById('music-name').innerHTML = "miss_you.mp3";
        return
    }
}

document.body.addEventListener("mousemove", (event) => {
    playMusic();
})

document.getElementById("myThreeJsCanvas").addEventListener("mousemove", (event) => {
    playMusic();
})


window.addEventListener("mousemove", (event) => {
    playMusic();
})

document.getElementById("myThreeJsCanvas").addEventListener("mousemove", (event) => {
    playMusic();
})

startTime()
printTimeZone()