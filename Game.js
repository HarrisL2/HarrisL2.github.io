function AddEvent(html_element, event_name, event_function) 
{
   if(html_element.attachEvent) //Internet Explorer
      html_element.attachEvent("on" + event_name, function() {event_function.call(html_element);}); 
   else if(html_element.addEventListener) //Firefox & company
      html_element.addEventListener(event_name, event_function, false); //don't need the 'call' trick because in FF everything already works in the right way          
}

function l(what) {return document.getElementById(what);}

var Game = {};
/*==============================================================
  GAME INITIALIZATION
==============================================================*/
Game.Launch = function()
{
/*==============================================================
  VARIABLES
==============================================================*/
//BABY
Game.Air = 0;
Game.Nutrients = 0;

/*==============================================================
  BABY STAGE
==============================================================*/

Game.Breathe = function() {
	Game.Air += 1;
}
Game.HeartBeat = function() {
	Game.Nutrients += 1;
}
/*==============================================================
  BUTTON ASSIGNMENT
==============================================================*/
AddEvent(breathe,"click",Game.Breathe);
AddEvent(beat,"click",Game.HeartBeat);
Game.Loop;
Game.Draw;
}
/*==============================================================
  DRAW
==============================================================*/
Game.Draw = function()
{
l("statement").innerHTML = "You have "+Game.Air+" air and "+Game.Nutrients+"nutrients";
}
/*==============================================================
  GAME LOOP
==============================================================*/
Game.Loop = function() {
	Game.Draw;
	setTimeout(Game.Loop,33);
}

/*==============================================================
  LAUNCH
==============================================================*/
Game.Launch;