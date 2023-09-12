import Player from '@vimeo/player';
import throttle from "lodash.throttle";
const LOCALSTORAGE_KEY = "videoplayer-current-time";
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function () {
    console.log('played the video!');
});
player.on('timeupdate', throttle(recordCurrentTime, 1000));

function recordCurrentTime(currentTime) {
    //console.log('currentTime:', currentTime.seconds);
    let videoTime = JSON.stringify(currentTime.seconds);
    localStorage.setItem(LOCALSTORAGE_KEY,videoTime);
}

console.log(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
player.setCurrentTime((JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)))|| 0);