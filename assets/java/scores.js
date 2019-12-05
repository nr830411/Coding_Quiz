function high() {
    //GETTING HIGH SCORES JSONNNNNNN
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  
    highscores.sort(function(a, b) {

      return b.score - a.score;

    });
  
    highscores.forEach(function(score) {

      var list = document.createElement("li");
      list.textContent = score.initials + " - " + score.score;
  
      var oL = document.querySelector("#highscores");
      oL.appendChild(list);
    
    });
  }
  
  function noHigh() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  
  document.querySelector("#clear").onclick = noHigh;
  
  // run function when page loads
  high();
