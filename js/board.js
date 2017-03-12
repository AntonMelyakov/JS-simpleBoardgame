function createBoard() {

$divBoard = document.getElementById("boardID");

for (var i = 0; i < 8; i++) {
  for (var j = 0; j < 8; j++) {

    let idCell = "i:" + i + "j:" + j;
    $divCell = document.createElement('div');
    $divCell.setAttribute('class', 'cell');
    $divCell.setAttribute('id', idCell);
    $divBoard.appendChild($divCell);


  }
}
};

function deleteBoard() {
  $divBoard = document.getElementById('boardID');
  $divBoard.innerHTML = " ";
}
