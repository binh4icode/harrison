let playpause_btn = document.getElementsByClassName("playpause-track")[0];
let current_track = document.getElementById("myAudio");
let track_art = document.getElementsByClassName("track-art")[0];
let track_name = document.getElementsByClassName("track-name")[0];
let track_author = document.getElementsByClassName("track-author")[0];
let now_playing = document.getElementsByClassName("now-playing")[0];

// An array is a list of objects
let track_list =[
    {
        name: "Being isolated",
        author: "Black-night",
        image: "images/blackandorangemusic.png",
        path: "Songs/alone.mp3",
        file: "alone.mp3"
    },

    {
        name: "Found happiness",
        author: "Loving-angel",
        image: "images/drakorangemusicalnote.png",
        path: "Songs/embrace.mp3",
        file: "embrace.mp3"
    }, 

    {
        name: "running from someone",
        author: "Dark-cloak",
        image: "images/orangemusiccalnote.png",
        path: "Songs/running.mp3",
        file: "running.mp3"
    }
];

// let track_index = 0 means start at 0
//double check
let track_index = 0;
let isPlaying = false;

function loadTrack(index) {
    current_track.src = track_list[index].path;

    track_art.src = track_list[index].image;
    track_name.textContent = track_list[index].name;
    track_author.textContent = track_list[index].author;
    now_playing.textContent = "Playing " + (track_index + 1) + " OF " + track_list.length;

    current_track.load();
}

loadTrack(track_index);



function playTrack() {
    current_track.play();
    isPlaying = true;
    playpause_btn.src = "pause.png";
}
 
function pauseTrack() {
    current_track.pause();
    isPlaying = false;
    playpause_btn.src = "play.png";
}

function playAndPause() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}
// addEventListener is a javascript function if not put in then you can't click.
playpause_btn.addEventListener("click", playAndPause);

let current_time = document.getElementsByClassName("current-time")[0];
let total_duration = document.getElementsByClassName("total-duration")[0];
let no_volume = document.getElementsByClassName("no-volume")[0];
let max_volume = document.getElementsByClassName("max-volume")[0];
let seek_slider = document.getElementsByClassName("seek_slider")[0];
let volume_slider = document.getElementsByClassName("volume_slider")[0];

function durationUpdate() {
    let currentMinutes = Math.floor(current_track.currentTime / 60);
    let currentSeconds = Math.floor(current_track.currentTime - currentMinutes * 60 );
    // Get the current duration to find minutes and get the remainder to find seconds.
    let durationMinutes = Math.floor(current_track.duration / 60);
    let durationSeconds = Math.floor(current_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10){
        currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
        durationMinutes = "0" + durationMinutes;
    }
    current_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
}

function updateSlider() {
    if (!isNaN(current_track.duration) && isPlaying) {
        let sliderPosition = 0;
        sliderPosition = current_track.currentTime * (100 / current_track.duration);
        seek_slider.value = sliderPosition;
        durationUpdate();
    }

}

function resetTimer () {
    current_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

let updateTimer;

function timer() {
    clearInterval(updateTimer);
    resetTimer();
    updateTimer = setInterval(updateSlider, 1000);
}

timer();
function changeTime() {
    current_track.currentTime = current_track.duration * (seek_slider.value / 100);
}

function changeVolume() {
    current_track.volume = volume_slider.value / 100;
}

function mute() {
    volume_slider.value = 0;
    changeVolume();
}

no_volume.addEventListener("click" , mute);


function loud() {
    volume_slider.value = 100;
    changeVolume();
}
max_volume.addEventListener("click", loud);

let download_btn = document.getElementsByClassName("download-track")[0];


function download_track(track_index) {
    download_btn.setAttribute("download", track_list[track_index].file);
    download_btn.setAttribute("href", track_list[track_index].path);
}

download_track(track_index);

function nextTrack () {
    if (track_index < track_list.length - 1) track_index += 1;
    else track_index = 0;
    loadTrack(track_index);
    download_track(track_index);
    timer();
    playTrack();
}

let next_btn = document.getElementsByClassName("next-track")[0];
next_btn.addEventListener("click", nextTrack);

function prevTrack() {
    if (track_index > 0) track_index -=1;
    else track_index = track_list.length-1;
    loadTrack(track_index);
    download_track(track_index);
    timer();
    playTrack();
}

let prev_btn = document.getElementsByClassName("prev-track")[0];
prev_btn.addEventListener("click", prevTrack);

current_track.addEventListener("ended", nextTrack);


