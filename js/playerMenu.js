let blueMenu = document.getElementById('blueMenu');
let redMenu = document.getElementById('redMenu');


function deadOrAlive(soldier){
  if(soldier.blood > 0) {
    return "Blood: " + soldier.blood +"<br> Power: " + soldier.power;
  }
}

function renderMenu(menu) {
  let team;

  if(menu == blueMenu){
    team = teamBlue;
  } else {team = teamRed};

  for (soldier of team) {
 let $div = document.createElement('div');
 $div.setAttribute('class', 'soldierInMenu');
 let $img = document.createElement('img');
 $img.setAttribute('src', "images/" + soldier.type + ".png");
 let $span = document.createElement('span');
 $span.setAttribute('class', 'bloodResult');
 $span.innerText = deadOrAlive(soldier);
$div.appendChild($img);
$div.appendChild($span);
menu.appendChild($div);
  }
}
