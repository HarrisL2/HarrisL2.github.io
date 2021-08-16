function AddEvent(html_element, event_name, event_function) 
{
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
	
	Game.date = new Date();
	Game.timeRaw = this.date.getTime();
	Game.timeLast = this.date.getTime();
	Game.BleedCost = 10;
	Game.Blood = 0;
	Game.BloodGainPerSecond = 1;


	/*==============================================================
	  BUTTON ASSIGNMENT
	==============================================================*/
	AddEvent(l("sacrifice"), "click", Game.Bleed);
	Game.Loop();

}
/*==============================================================
  DRAW
==============================================================*/
Game.Draw = function()
{
	l("blood").innerHTML = "You have "+Game.Blood+" Blood.";
	l("flow").innerHTML = "You create "+Game.BloodGainPerSecond+" Blood per second.";
	l("cost").innerHTML = "It costs "+Game.BleedCost+" Blood to appease Him.";
}
/*==============================================================
  GAME LOOP
==============================================================*/
Game.Loop = function () {
	Game.date = new Date();
	Game.timeRaw = Game.date.getTime();
	
	if (Game.timeRaw - Game.timeLast > 1000) {
		Game.Blood += Game.BloodGainPerSecond;
		Game.timeLast = Game.date.getTime();
	}
	
	Game.Draw();
	setTimeout(Game.Loop, 33);
}
/*==============================================================
  FUNCTIONS
 ============================================================*/
Game.Bleed = function() {
	if (Game.Blood >= Game.BleedCost) {
		Game.Blood -= Game.BleedCost;
		Game.BloodGainPerSecond *= 2;
		Game.BleedCost *= 3;
		Game.Draw();
	}
}

/*==============================================================
  LAUNCH
==============================================================*/
window.onload = function() {
	Game.Launch();
}