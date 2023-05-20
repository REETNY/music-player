const musicPlayerCont = document.querySelector(".music-player-cont");
const songCover = document.querySelector("#img_cover");
const songCoverRoller = document.querySelector("#img_roller");
const rollerCont = document.querySelector(".roller-cont");
const songTitle = document.querySelector(".song_title");
const authorName = document.querySelector(".author");
const colorchanger = document.querySelector(".colorchanger");
const audioTag = document.querySelector("#audio");
const progressBar = document.querySelector(".progress_bar");
const progress = document.querySelector(".progress");
const prevBtn = document.querySelector("#prev");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");
const sliderVolBtn = document.querySelector("#sliderVol");
const volumeCond = document.querySelector(".volumeCondt");
const body = document.body;

// song array
const songData = [
    {
        songFile: "Cry Me a River",
        songTitle: "Cry Me a River",
        author: "Justin Timberlake",
        back_cover: "JSTM"
    },
    {
        songFile: "Fall",
        songTitle: "Fall",
        author: "Eminem",
        back_cover: "Fall"
    },
    {
        songFile: "in The Night",
        songTitle: "in The Night",
        author: "Weekend",
        back_cover: "inTheNight"
    },
    {
        songFile: "Lucky You",
        songTitle: "Lucky You",
        author: "Eminem Ft. Lucas Joyner",
        back_cover: "LuckyYou"
    },
    {
        songFile: "in Your Eyes",
        songTitle: "in Your Eyes",
        author: "Weekend",
        back_cover: "weekend"
    },
    {   songFile: "Can We Kiss Forever",
        songTitle: "Can We Kiss Forever",
        author: "Kina",
        back_cover: "kina"
    },
    {   songFile: "my life",
        songTitle: "my life",
        author: "Jcole",
        back_cover: "jcole"
    },
    {   songFile: "pride is the devil",
        songTitle: "pride is the devil",
        author: "Jcole",
        back_cover: "jcole"
    },
    {   songFile: "Take Me To Church",
        songTitle: "Take Me To Church",
        author: "Hozier",
        back_cover: "TMTC"
    },
    {   songFile: "Blinding Lights",  
        songTitle: "Blinding Lights",
        author: "Weekend",
        back_cover: "weekend"
    },
    {
        songFile: "Ramen & OJ",
        songTitle: "Ramen & OJ",
        author: "Joyner Lucas Ft. Lil Baby",
        back_cover: "R&O"
    },
]

// song index
let songIndex = 0;

// intially load song
loadSong(songData[songIndex]);

//functions
function loadSong(song, loaded) {
    songCover.src = `/backImgs/${song.back_cover}.jpg`;
    songCoverRoller.src = `/backImgs/${song.back_cover}.jpg`;
    audioTag.src = `/music/${song.songFile === null ? loaded : song.songFile}.mp3`;
    songTitle.textContent = `${song.songTitle}`;
    authorName.textContent = `${song.author}`;
    body.style.backgroundImage = `url(/backImgs/${song.back_cover}.jpg)`;
    body.style.backgroundSize = `fill`;
    body.style.backgroundPosition = `center center`;
    body.style.backgroundRepeat = `no-repeat`;
}

function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songData.length - 1;
    }

    loadSong(songData[songIndex]);
    label.style.color = `darkcyan`;
    playSong();
}

function nextSong(){
    songIndex++;
    if(songIndex > songData.length - 1){
        songIndex = 0;
    }

    loadSong(songData[songIndex]);
    label.style.color = `darkcyan`;
    playSong();
}

function playSong(){
    musicPlayerCont.classList.add("play");
    playBtn.innerHTML = `<i class="fa fa-pause" aria-hidden="true"></i>`;
    colorchanger.style.animation = `colorchanger 4s linear infinite`
    audioTag.addEventListener("timeupdate", timeupdate)
    audioTag.play()
}

function pauseSong(){
    addRoller(false)
    audioTag.removeEventListener("timeupdate", timeupdate)
    musicPlayerCont.classList.remove("play");
    playBtn.innerHTML = `<i class="fa fa-play" aria-hidden="true"></i>`;
    colorchanger.style.animation = `colorchanger 4s linear infinite`
    colorchanger.style.animationPlayState = `paused`;
    audioTag.pause()
}

function timeupdate(e){
    const {currentTime, duration} = e.srcElement;
    const currentPercent = (currentTime / duration)  * 100;
    progress.style.width = `${currentPercent}%`
    if(rollerCont.classList.contains("roll")){
        return
    }else{
        addRoller(true)
    }
}

function setTime(e){
    const width = this.clientWidth;
    const offsetX = e.offsetX;
    const duration = audioTag.duration;
    audioTag.currentTime = (offsetX / width) * duration;
}

function draggableProgress(e) {
    const width = this.clientWidth;
    const offset = e.offsetX
    const duration = audioTag.duration;
    audioTag.currentTime = (offset / width) * duration;
}

function setVolume(e, audioTag){
    
    let muteBtn = `
        <i class="fa fa-volume-off" aria-hidden="true"></i>
    `

    let lowBtn = `
        <i class="fa fa-volume-down" aria-hidden="true"></i>
    `

    let highBtn = `
        <i class="fa fa-volume-up" aria-hidden="true"></i>
    `

    const auidoEl = document.querySelector("#audio");
    let {value: volume} = e.target;
    let volumePer = (parseFloat(volume) / 100);
    auidoEl.volume = volumePer;

    if(volume == 0){
        volumeCond.innerHTML = muteBtn;
    }else if(volume > 0 && volume <= 35){
        volumeCond.innerHTML = lowBtn;
    }else{
        volumeCond.innerHTML = highBtn;
    }
}

function changeIcon(e){
    let muteBtn = `
        <i class="fa fa-volume-off" aria-hidden="true"></i>
    `

    let lowBtn = `
        <i class="fa fa-volume-down" aria-hidden="true"></i>
    `

    let highBtn = `
        <i class="fa fa-volume-up" aria-hidden="true"></i>
    `

    let {className} = e.target 
    
    if(className === "fa fa-volume-up" || className === "fa fa-volume-down"){
        volumeCond.innerHTML = muteBtn;
        audioTag.volume = 0;
        sliderVolBtn.value = 0;
    }else{
        volumeCond.innerHTML = highBtn;
        audioTag.volume = 1;
        sliderVolBtn.value = 100;
    }
}

function checkPlay(e){
    audioTag.removeEventListener("timeupdate", timeupdate)
    addRoller(false)
}

function checkPlay2(e){
    console.log("deen")
    audioTag.addEventListener("timeupdate", timeupdate)
    addRoller(true)
}

function addRoller(bool){
    if(bool){
        rollerCont.classList.add("roll")
    }else{
        rollerCont.classList.remove("roll")
    }
}

//event listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
playBtn.addEventListener("click", () => {
    const isPlaying = musicPlayerCont.classList.contains("play");
    
    if(isPlaying){
        pauseSong();
    }else{
        playSong();
    }

});

audioTag.addEventListener("timeupdate", timeupdate);
audioTag.addEventListener("ended", nextSong);
audioTag.addEventListener("waiting", checkPlay);
audioTag.addEventListener("playing", checkPlay2);
progressBar.addEventListener("click", setTime);
sliderVolBtn.addEventListener("change", (e) => {
    setVolume(e)
})
volumeCond.addEventListener("click", (e) => {
    changeIcon(e)
})

window.onload = () => {
    audioTag.volume = 1;
    sliderVolBtn.value = 100;
}


// functions for uploading data from user machine!
var input = document.querySelector("#openFile");
var label = document.querySelector(".label");
input.addEventListener("change", function() {
    const ranImgs = ["one", "two", "three"];
    const generatedNum = genRandomNum(ranImgs.length);
    label.style.color = `crimson`;
    const songName = input.files[0].name;

    console.log(generatedNum)
    songTitle.textContent = `${songName}`;
    authorName.textContent = ``;
    songCover.src = `/ranImg/${ranImgs[generatedNum]}.jpg`;
    songCoverRoller.src = `/ranImg/${ranImgs[generatedNum]}.jpg`;
    body.style.backgroundImage = `url(/ranImg/${ranImgs[generatedNum]}.jpg)`;
    body.style.backgroundSize = `fill`;
    body.style.backgroundPosition = `center center`;
    body.style.backgroundRepeat = `no-repeat`;

    var reader = new FileReader();
    reader.readAsDataURL(document.getElementById("openFile").files[0]);
    reader.onload = function (event) {
        document.getElementById("audio").src = event.target.result;

        if(document.getElementById("audio").src != "" || document.getElementById("audio").src != undefined || document.getElementById("audio").src != null){
           document.getElementById("audio").addEventListener("loadeddata", playSong);
        };



        document.getElementById("audio").addEventListener("timeupdate", timeupdate)
    };
})

function genRandomNum(num){
    return Math.floor(Math.random() * (num));
}