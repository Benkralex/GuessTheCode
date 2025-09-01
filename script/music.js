var playing = false;

function music() {
  playing = !playing;
  sync();
  saveValue("music", playing);
}

function play() {
  document.getElementById("music-control").innerHTML = "pause_circle";
  document.getElementById("music").play();
}

function pause() {
  document.getElementById("music-control").innerHTML = "play_circle";
  document.getElementById("music").pause();
}

function setPlaying(bool) {
  playing = bool;
  sync();
}

function sync() {
  if (playing) {
    play();
  } else if (!playing) {
    pause();
  }
  document.getElementById("music").volume = 0.25;
}
document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener("click", () => {
    setPlaying(getValue("music"));
  });
});
