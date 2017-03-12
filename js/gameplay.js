(function() {



  let blueMarineOne = new Marine('blue', 'marine', 100, 20, 1, 'i:0j:1');
  let blueMarineTwo =  new Marine('blue', 'marine', 100, 20, 1, 'i:1j:0');
  let blueMarineThree = new Marine('blue', 'marine', 100, 20, 1, 'i:0j:2');
  let blueSniperOne = new Sniper('blue', 'sniper', 100, 40, 4, 'i:1j:1');
  let blueSniperTwo = new Sniper('blue', 'sniper', 100, 40, 4, 'i:1j:2');
  let bluePresident = new President('blue', 'president', 200, 0, 0, 'i:0j:0');

  let redMarineOne = new Marine('red', 'marine', 100, 20, 1, 'i:7j:6');
  let redMarineTwo =  new Marine('red', 'marine', 100, 20, 1, 'i:7j:5');
  let redMarineThree = new Marine('red', 'marine', 100, 20, 1, 'i:6j:7');
  let redSniperOne = new Sniper('red', 'sniper', 100, 40, 4, 'i:6j:5');
  let redSniperTwo = new Sniper('red', 'sniper', 100, 40, 4, 'i:6j:6');
  let redPresident = new President('red', 'president', 200, 0, 0, 'i:7j:7');

  let teamBlue = [blueMarineOne, blueMarineTwo, blueMarineThree, blueSniperOne, blueSniperTwo, bluePresident];
  let teamRed = [redMarineOne, redMarineTwo, redMarineThree, redSniperOne, redSniperTwo, redPresident];


  let currentPlayer = "blue";
  let currentSoldier; //to mark the object
  let firstTap = true; // to mark soldier or to make action
  let currentTeam = null;


  let blueMenu = document.getElementById('blueMenu');
  let redMenu = document.getElementById('redMenu');
  let $board = document.querySelector('.board');


render();

//functions:

  function render() {
    deleteBoard(); //in board.js
    createBoard(); //in board.js
    putSoldiers();
    deleteMenus();
    renderMenu(blueMenu);
    renderMenu(redMenu);
    win();

  };

 function putSoldiers() {
   for (soldier of teamBlue) {
     $div = document.getElementById(soldier.position);
     $div.className += " " + "blue " + soldier.type;

   }

   for (soldier of teamRed) {
     $div = document.getElementById(soldier.position);
     $div.className += " " + "red " + soldier.type;

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
  $span.innerText = "Blood: " + soldier.blood;
 $div.appendChild($img);
 $div.appendChild($span);
 menu.appendChild($div);
   }
 }; //renderMenu


 function deleteMenus() {
   blueMenu.innerHTML = '';
   redMenu.innerHTML = '';
 }

 function putRange(soldier){
   let str = soldier.position;
   let positionVertical = parseInt(str.charAt(2));
   let positionHorizontal = parseInt(str.charAt(5));

   if(soldier.type == 'sniper') {
     for (let i = -(soldier.range); i <= soldier.range; i++) {

         let changedID = str.substr(0,2) + (positionVertical + i) + str.substr(3);
         if(document.getElementById(changedID)) { //if the soldier is in the corner :)
         $markedDiv = document.getElementById(changedID);
          console.log(changedID);

            $markedDiv.className += " " + 'inRange';
          } //if
       } //for vertical

      for (let i = -(soldier.range); i <= soldier.range; i++) {

           let changedID = str.substr(0,5) + (positionHorizontal + i) + str.substr(6);
           if(document.getElementById(changedID)) { //if the soldier is in the corner :)
           $markedDiv = document.getElementById(changedID);
            console.log(changedID);

              $markedDiv.className += " " + 'inRange';
            } //if
         } //for horizontal
   } //if sniper

   if(soldier.type == 'marine') {
     let str = soldier.position;
     let positionVertical = parseInt(str.charAt(2));
     let positionHorizontal = parseInt(str.charAt(5));

for (var i = -(soldier.range); i <= soldier.range; i++) {
   let changedRow = str.substr(0,2) + (positionVertical + i) + str.substr(3);
          for (var y = -(soldier.range); y <= soldier.range; y++)  {
            let changedID = changedRow.substr(0,5) + (positionHorizontal + y) + changedRow.substr(6);
            if(document.getElementById(changedID)) { //if the soldier is in the corner :)
            $markedDiv = document.getElementById(changedID);


               $markedDiv.className += " " + 'inRange';
           }
        }
  } //for
   }//if marine

 }; // for putRange()

 function changePlayer(){
   if(currentPlayer == 'blue') {
     currentPlayer = 'red';
   } else {
     currentPlayer = 'blue';
   }
 }

 function putMarks(soldier) {

   let str = soldier.position;
   let positionVertical = parseInt(str.charAt(2));
   let positionHorizontal = parseInt(str.charAt(5));

for (let i = -2; i <= 2; i++) {

   let changedID = str.substr(0,2) + (positionVertical + i) + str.substr(3);
   if(document.getElementById(changedID)) { //if the soldier is in the corner :)
   $markedDiv = document.getElementById(changedID);
    console.log(changedID);

      $markedDiv.className += " " + 'marked';
    } //if
 } //for vertical

 for (let i = -2; i <= 2; i++) {

     let changedID = str.substr(0,5) + (positionHorizontal + i) + str.substr(6);
     if(document.getElementById(changedID)) { //if the soldier is in the corner :)
     $markedDiv = document.getElementById(changedID);
      console.log(changedID);

        $markedDiv.className += " " + 'marked';
      } //if
   } //for horizontal

};

 function shoot(shooter, target){

   let takenBlood = shooter.power + Math.floor((Math.random()*10)+1);
   target.blood -= takenBlood;
   console.log(target);

   if(target.blood <= 0){
     let targetTeam;
      if(target.team == 'red'){
        targetTeam = teamRed;
      }else {
        targetTeam = teamBlue;
      }

      targetTeam.splice(targetTeam.indexOf(target), 1);
   }
 }//shoot

 function win() {
   let redIsAlive = false;
   let blueIsAlive = false;

if (teamBlue[teamBlue.length-1].type == 'president') {
  blueIsAlive = true;
};

if (teamRed[teamRed.length-1].type == 'president') {
  redIsAlive = true;
};

if(!redIsAlive) {
  document.getElementById('blueMenu').className = "hide";
  document.getElementById('redMenu').className = "hide";
  let $span = document.createElement('span');
  debugger;
  $span.className = "final-message";
  $span.innerText = "Team Blue WIN";
  $board.appendChild($span);
  $board.remoremoveEventListener("click");
};

if (!blueIsAlive) {
  document.getElementById('blueMenu').className = "hide";
  document.getElementById('redMenu').className = "hide";
  let $span = document.createElement('span');
  $span.className = "final-message";
  $span.innerText = "Team Red WIN";
  $board.appendChild($span);
  $board.remoremoveEventListener("click");
};

 };


 //EventListeners:

$board.addEventListener('click', function(e) {
   render(); // that way you cant`t click two soldiers in same time

if (firstTap) {
    if( (e.target.classList.contains('red') && currentPlayer == 'red') || (e.target.classList.contains('blue') && currentPlayer == 'blue') ){
      firstTap = false; //it`s already tapped

       if (e.target.classList.contains('blue')) {
          currentTeam = teamBlue;
       } else {
         currentTeam = teamRed;
       }

      render();

    for (soldier of currentTeam) {
      if (soldier.position === e.target.id) { // find the soldier
        currentSoldier = soldier; // we got the object now
  console.log(currentSoldier);

  //now let mark the fields he could go

  putMarks(currentSoldier);

  //now let mark fields of his range
  putRange(currentSoldier);


    break; //we already found our soldier no need to loop over the others
   }
  }

  } //for mark soldier;

} //for first tap


//for move the soldier

else {

   if (e.target.classList.contains ('marked') && (!e.target.classList.contains('blue') && !e.target.classList.contains('red')) ) {
    firstTap = true; // back on first tap
    currentSoldier.position = e.target.id;
    render();
    changePlayer();

  } //moving

//for shooting

if((e.target.classList.contains('blue') && e.target.classList.contains('inRange') && currentTeam == teamRed ) || (e.target.classList.contains('red') && e.target.classList.contains('inRange') && currentTeam == teamBlue)){
firstTap = true; // back on first tap
let target;

if (currentTeam == teamRed){
for (soldier of teamBlue) {
  if(e.target.id == soldier.position) {

    target = soldier;
    console.log(target);
  }
};
} else{

for (soldier of teamRed) {
  if(e.target.id == soldier.position) {

    target = soldier;
    console.log(target);
  }
};
};

shoot(currentSoldier, target);
render();
changePlayer();
} //shooting

  //click somewhere on the board
  else {
    firstTap = true; // back on first tap
    render();
    currentSoldier = null;
  };

} //second tap
}, false);

}) ();
