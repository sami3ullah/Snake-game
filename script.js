
// =============== GLOBAL VAR ==============
// player 1 & player 2
let player1=0;
let player2=0;
// red turn first
let turn=1;

let player1go = 0;
let player2go = 0;

// Elements
let tag = $(".heading");
let tagSpecial = $(".headingSpecial");
let win = $('.win');

//check if won
let winCheck = false;

// let SnakeLadder = new Array(10);
let SnakeLadder = [new snakeLadder(99, -33),new snakeLadder(74, 14), new snakeLadder(13, -7),new snakeLadder(11, 44),new snakeLadder(64, -45),new snakeLadder(25, 34), new snakeLadder(68, -18)];

// snake ladder, args => where this ladder is and how much increment the player will get
function snakeLadder(where, pmq) {
    this.where = where;
    this.pmq=pmq;

}
// randomization, s=>start, e=>end
function rand(s,e){
  var r=Math.floor(Math.random() * e) + s;

  if(s==e){
    return e;
  }
  else{
    return r;
  }

}

// change the special text based on the snake and ladder position
function specialText(pmq){
  
        if(pmq < 0){
          tagSpecial.css("display", "block")
          tagSpecial.html("Delicious! HEHEHE");
        }else{
          tagSpecial.css("display", "block")
          tagSpecial.html("You got lucky there!");
        }
}


// if there's a ladder or snake at the current pos of the player, it will add or dec accordingly
function specialMove(){
  let i=0;
  if(turn==1){
    while(i<7)
    {
      if(player1==SnakeLadder[i].where)
      {
        player1=player1+SnakeLadder[i].pmq;
        movePallet();
        specialText(SnakeLadder[i].pmq);
        break;
      }
      i=i+1;
    }
  }
  else{
      while(i<7)
      {
        if(player2==SnakeLadder[i].where)
        {
          player2=player2+SnakeLadder[i].pmq;
          movePallet();
          specialText(SnakeLadder[i].pmq);
          break;
        }
        i=i+1;
    }
  }
}

function srcharray(where,j)
{

  var i=0;
  while(i<j-1){
    if(SnakeLadder[i].where==where)
    {
      return 1;
    }
    else if (SnakeLadder[i].where==undefined){return 0;}
    i++;
  }
  return 0;
}
// randomize snake ladder
function randsnakeLadder(){
  var i=0;
  var pmq=0;
  var pn=-1;
  while(i<10){
    var where =rand(2,99)
    while(srcharray(where,i)==1){
    where =rand(2,99)}
    if(Math.pow(pn,i+1)>0){
    pmq =Math.pow(pn,i+1)*rand(1,100-where)}
    else{
      pmq =Math.pow(pn,i+1)*rand(1,where-1)
    }
    SnakeLadder[i]=new snakeLadder(where,pmq)
    i=i+1;
  }
}

function chkwin(){
  if (turn==1){
    if(player1>=100){player1=100;
      movePallet()
      win.html("Red Won :P");
      win.css("color", "#FF030B");
      win.addClass("winAnimation");
      winCheck = true;
    }
  }
  else {
    if(player2>=100){player2=100;
      movePallet()
      win.html("Yellow Won :P");
      win.css("color", "#E3B959");
      win.addClass("winAnimation");
      winCheck = true;
    }
  }
}



// this function rolls the dice, with randomization

function diceRoll(){

    let i, faceValue, output = ''

    faceValue = rand(0,6)
    output += "&#x268" + faceValue + "; ";

    document.getElementById('dice').innerHTML = output;
    return faceValue+1;

}


function movePallet(){
  let number=0
  let pallete=""
  if(turn==1){
    
    number= player1;
    pallete=".red"
  
  }
  
  else{
  number= player2;
  pallete=".yellow"
 }

  if(number>100){
    number=100;
  }

  let formulaLeft = (((number-1) % 10) * 62) + 7.5;
  let formulaRight =((9) * 62 + 7.5)-(((number-1) % 10) * 62);
  let formulaBottom = (Math.floor(number/10))*(69.5-7.5)+7.5*2;

  if((Math.floor(number/10))>0 && number%10!=0){
      $(pallete).css("bottom", `${formulaBottom}px`);
  }

  // will not run give any extra bottom margin to multiples of 10
  else if(number%10==0){
    formulaBottom = (Math.floor((number/10))-1)*(69.5-7.5)+7.5*2;
    $(pallete).css("bottom", `${formulaBottom}px`);
  }

  // Resetting the margin back, if snake bite
  else if (Math.floor(number/10)<=0)
  {
    $(pallete).css("bottom", "6px");
  }

  if((number)%10 == 0){
    // check if even or odd
    if(Math.floor(number/10)%2==1)
    {
      $(pallete).css("left", `${formulaLeft}px`);
    }
    else{
      $(pallete).css("left", `${formulaRight}px`);
    }
    return
}

  if((number-1)%10 == 0){
    if(Math.floor(number/10)%2==1)
    {
      $(pallete).css("left", `${formulaRight}px`);
    }
    else {
        $(pallete).css("left", `${formulaLeft}px`);
    }
  }
  else if((number-1)%10 != 0){
    if(Math.floor(number/10)%2==0)
    {
      $(pallete).css("left", `${formulaLeft}px`);
    }
    else {
        $(pallete).css("left", `${formulaRight}px`);
    }
  }

}

// ********** here we will add the required element to call these functions upon ***********
$(document).ready(function(){
    // randsnakeLadder()

    

    $('input[type=button]').bind('click',function(){

      let dice=diceRoll();
      // check if any player already won
      if(winCheck == false){
      
        // changing the text based on the turn
        if(turn == 1){

          tag.css("color", "#E3B959");
          tag.html("Yellow to move");

          if(dice == 6){
            tag.css("color", "#FF030B");
            tag.html("Red got another <br/> move")
          }

        }else{
          tag.css("color", "#FF030B");
          tag.html("Red to move");

          
          if(dice == 6){
            tag.css("color", "#E3B959");
            tag.html("Yellow got another <br/> move")
          }

        }


        
        if(dice==6 && turn==1 && player1==0){player1go=1;player1=-5}
        else if (dice==6 && turn==2 && player2==0){player2go=1;player2=-5}
        if (turn==1){

          tagSpecial.css("display", "none");

          if(player1go){
            
            
            player1=player1+dice;
            
            if(player1>100){if(dice==6){turn=2;}player1=player1-dice;}
            movePallet();
          specialMove();
        chkwin();
          if(dice!=6)
          {turn=2;}}
          else{
            turn=2;
            
          }

        }
        else{
          tagSpecial.css("display", "none");
          if(player2go){
          player2=player2+dice;
        
          if(player2>100){if(dice==6){turn=1;}player2=player2-dice;}
          movePallet();
        specialMove();
      chkwin();
          if(dice!=6)
          {turn=1;}}
          else{
            turn=1;
          }
        }
      }
      });
  });
