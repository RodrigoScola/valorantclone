const grayscaleTeam = () => {
  const ids = [];
  const elemnts = document.querySelectorAll("#team [data-agent-id]");
  elemnts.forEach((element) => {
    ids.push(element.getAttribute("data-agent-id"));
  });
  ids.forEach((id) => {
    $(`*[data-selecting-agent-id="${id}"]`).attr("disabled", true);
  });
};

const checkIfTeamIsFull = () => {
  const team = document.querySelectorAll("#team [data-agent-id]").length > 2;
  console.log(team);
  return team;
};
const changeToSubmitButton = () => {
  $("#team_select_button").replaceWith(`<a href="/map">
  Start Game
  </a>
  `);
};
function setup() {
  document.querySelectorAll(".agent").forEach((node) => {
    const color = node.getAttribute("data-bg-color");
    node.addEventListener("click", (e) => {
      document.getElementById("body").style.backgroundColor = color;
    });
  });
  // Select the target node.
  var teamObserverTarget = document.querySelector("#team");
  grayscaleTeam();
  if (checkIfTeamIsFull()) {
    changeToSubmitButton();
  }
  // Create an observer instance.
  var observer = new MutationObserver(function (mutations) {
    grayscaleTeam();
    if (checkIfTeamIsFull()) {
      changeToSubmitButton();
    }
  });

  // Pass in the target node, as well as the observer options.
  observer.observe(teamObserverTarget, {
    attributes: true,
    childList: true,
    characterData: true,
  });
}

window.onload = setup;
