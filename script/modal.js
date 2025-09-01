var modal = document.getElementById("explenationModal");
var closeBtn = document.getElementById("closeModal");

function manual() {
  modal.style.display = "block";
}

closeBtn.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
