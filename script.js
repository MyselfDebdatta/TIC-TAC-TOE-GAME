//ACCESS OF ALL INDIVIDUAL BOXES AND RESET BUTTON
let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGame = document.querySelector(".newGame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


//PLAYER DEFINE
let turnO = true; //PlayerX, PlayerO 
let count = 0;   // COUNTS HOW MANY BOXES ARE CLICKED



//WINNER PATTERN STORED IN THE FORM OF 2-D ARRAY
const winPatterns = [
    [0,1,2], [0,3,6], [0,4,8],
    [1,4,7],
    [2,5,8], [2,4,6],
    [3,4,5],
    [6,7,8]
];


//AFTER GETTING THE WINNER ONCE,TO RESTART THE GAME AGAIN
const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText ="";
    }
};

//RESET THE GAME
const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes(); //CALL FOR ENABLING ALL THE BOXES AGAIN FOR A NEW GAME
    msgContainer.classList.add("hide");
    newGame.classList.add("hide");
}
newGame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);



//AFTER GETTING THE WINNER ONCE,ALL THE BOXES GET DISABLED
const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};



//TO SHOW THE WINNER MESSAGE
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    newGame.classList.remove("hide");
    disableBoxes(); // CALL FOR DISABLING ALL THE BOXES
}
//TO SHOW THE DRAW MESSAGE
const showDraw = () => {
    msg.innerText = `It's a Draw, Start a new Game`;
    msgContainer.classList.remove("hide");
    newGame.classList.remove("hide");
}


//CHECK WINNER USING ARROW FUNCTION
const checkWinner = () => {
    for (let pattern of winPatterns) {
            //BOX'S LOCATION STORED INTO SPECIFIC VARIABLE
            let pos1val =  boxes[pattern[0]].innerText;
            let pos2val =  boxes[pattern[1]].innerText;
            let pos3val =  boxes[pattern[2]].innerText;

            //CONDITION FOR WINNER
            if(pos1val != "" && pos2val != "" && pos3val != "") {
                if(pos1val === pos2val && pos2val === pos3val) {
                    showWinner(pos1val);  //CALL FOR TO SHOW THE WINNER NAME 
                    return; 
                }
            }
            if(count === 9) { //AFTER CLICKING ALL THE BOXES IF THERE IS NO WINNER
                showDraw();
            }
        };
   };



//PLAYERS CAN ENTER X AND O ACCORDING TO THEM
boxes.forEach ((box) => {
    box.addEventListener("click", () => {
        if(turnO) {
            box.innerText = "O";
            turnO = false;
        }
        else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++; // COUNT THAT 9 BOXEX ARE CLICKED
        checkWinner (); //CALL FOR CHECKING THE WINNER
    });
});



