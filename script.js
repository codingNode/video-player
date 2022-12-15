const player = document.querySelector('.player');
const video=document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentT = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');
const fullscreenIcon = document.getElementById('fullscreen-icon')
const speed = document.querySelector('.player-speed')

// Play & Pause ----------------------------------- //
function togglePlay()
{

    if(video.paused)
    {
        video.play();
        playBtn.classList.replace('fa-play','fa-pause');
        playBtn.setAttribute('title','Pause');
    }
    else
    {
        video.pause();
        playBtn.classList.replace('fa-pause','fa-play');
        playBtn.setAttribute('title','Play');
    }
}

// Progress Bar ---------------------------------- //

function displaTime(time)
{
    const minutes = Math.floor(time/60);
    let seconds = Math.floor(time%60);

    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
}
// update progress bar as video continue
function progressTime()
{
    progressBar.style.width = `${(video.currentTime/video.duration)*100}%`;
    
    currentT.textContent = `${displaTime(video.currentTime)} /`;
    duration.textContent = `${displaTime(video.duration)}`;
}

function setProgress(e)
{
    // console.log(e.offsetX);
    // console.log(progressRange.offsetWidth);
    const position = e.offsetX/progressRange.offsetWidth;
    progressBar.style.width = `${position*100}%`;
    let newTime = position * video.duration;
    video.currentTime = newTime;
    
    // console.log(video.currentTime = position * video.duration)
} 

// Volume Controls --------------------------- //
let lastVolume = 1;
function changeVolume(e)
{
    let volume = e.offsetX/volumeRange.offsetWidth;
    if(volume>0.9) {volume = 1}
    if(volume<0.1) {volume = 0}
    video.volume = volume;

    volumeBar.style.width = `${volume*100}%`;

    volumeIcon.className = ''
    if(volume>0.6)
    {
        volumeIcon.classList.add('fa-solid', 'fa-volume-high');
    }
    if(volume<=0.6 && volume>0)
    {
        volumeIcon.classList.add('fa-solid', 'fa-volume-low');
    }
    if(volume === 0)
    {
        volumeIcon.classList.add('fa-solid', 'fa-volume-off');
    }
    lastVolume = volume;
}

function toggleMute()
{
    volumeIcon.className =''
    if(video.volume)
    {
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width =0;
        volumeIcon.classList.add('fa-solid', 'fa-volume-xmark');
        volumeIcon.setAttribute('title', 'Unmute');
    }
    else
    {
        video.volume = lastVolume;
        volumeBar.style.width =`${lastVolume * 100}%`;
                if(lastVolume>0.6)
                {
                    volumeIcon.classList.add('fa-solid', 'fa-volume-high');
                }
                if(lastVolume<=0.6 && lastVolume>0)
                {
                    volumeIcon.classList.add('fa-solid', 'fa-volume-low');
                }
                if(lastVolume === 0)
                {
                    volumeIcon.classList.add('fa-solid', 'fa-volume-off');
                }
                volumeIcon.setAttribute('title', 'Mute');
    }
    
}

// Change Playback Speed -------------------- //

function speedRate(e)
{
 console.log(e.target.value)
 video.playbackRate = e.target.value;
}

// Fullscreen ------------------------------- //
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
    
  }
  
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  }
let fullscreen = false;

  function toggleFullscreen()
  {
    if (!fullscreen)
    {
        openFullscreen(player);
        video.classList.add('video-fullscreen');
        fullscreenIcon.classList.replace('fa-expand', 'fa-compress');
    }
    else
    {
        closeFullscreen();
        video.classList.remove('video-fullscreen');
        fullscreenIcon.classList.replace('fa-compress', 'fa-expand');
    }
    fullscreen = ! fullscreen;
  }

// Event Listner
video.addEventListener('click',togglePlay);
playBtn.addEventListener('click',togglePlay);
video.addEventListener('timeupdate',progressTime);
video.addEventListener('canplay',progressTime);
progressRange.addEventListener('click',setProgress);
volumeRange.addEventListener('click',changeVolume);
volumeIcon.addEventListener('click',toggleMute);
speed.addEventListener('change', speedRate);
fullscreenBtn.addEventListener('click',toggleFullscreen);
video.addEventListener('ended',()=>{
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
})