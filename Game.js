function AddEvent(html_element, event_name, event_function) 
{
	html_element.addEventListener(event_name, event_function, false); //don't need the 'call' trick because in FF everything already works in the right way          
}

function l(what) {return document.getElementById(what);}
function random(min, max) {return (min + Math.floor(Math.random() * (max - min + 1)))}

function openGroup(evt, groupName) {
	// Declare all variables
	var i, groupcontent, grouptabbuttons;

	// Get all elements with class="tabcontent" and hide them
	groupcontent = document.getElementsByClassName("groupcontent");
	for (i = 0; i < groupcontent.length; i++) {
		groupcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	grouptabbuttons = document.getElementsByClassName("grouptabbuttons");
	for (i = 0; i < grouptabbuttons.length; i++) {
		grouptabbuttons[i].className = grouptabbuttons[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(groupName).style.display = "block";
	evt.currentTarget.className += " active";
}

function openElement(evt, groupName, elementName) {
	var i, groupcontent, grouptabbuttons;

	// Get all elements with class="tabcontent" and hide them
	groupcontent = document.getElementsByClassName("groupcontent");
	for (i = 0; i < groupcontent.length; i++) {
		groupcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	grouptabbuttons = document.getElementsByClassName("grouptabbuttons");
	for (i = 0; i < grouptabbuttons.length; i++) {
		grouptabbuttons[i].className = grouptabbuttons[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(groupName).style.display = "block";
	evt.currentTarget.className += " active";

	var elementcontent, elementtabbuttons;

	elementcontent = document.getElementsByClassName("elementcontent");
	for (i = 0; i < elementcontent.length; i++) {
		elementcontent[i].style.display = "none";
	}

	elementtabbuttons = document.getElementsByClassName("elementtabbuttons");
	for (i = 0; i < elementtabbuttons.length; i++) {
		elementtabbuttons[i].className = elementtabbuttons[i].className.replace(" active", "");
	}

	document.getElementById(elementName).style.display = "block";
	evt.currentTarget.className += " active";
}

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
	Game.VX = 0;
	Game.VXVerbs = ["Stablize", "Energize", "Calibrate", "Discharge", "Charge", "Replace", "Clean", "Tune", "Harmonize"];
	Game.VXNouns1 = ["Proton", "Electron", "Neutron"];
	Game.VXNouns2 = ["Core", "Barrier", "Stabilizer", "Calibrator", "Energizer", "Charger", "Field", "Regulator"];


	/*==============================================================
	  BUTTON ASSIGNMENT
	==============================================================*/
	AddEvent(l("MakeVX"), "click", Game.generateVX);
	Game.Loop();

	Game.renameVX();
}
/*==============================================================
  DRAW
==============================================================*/
Game.Draw = function()
{
	l("VX").innerHTML = Game.VX;
}
/*==============================================================
  GAME LOOP
==============================================================*/
Game.Loop = function () {
	Game.date = new Date();
	Game.timeRaw = Game.date.getTime();
	
	Game.Draw();
	setTimeout(Game.Loop, 33);
}

/*==============================================================
  FUNCTIONS
 ============================================================*/

Game.generateVX = function () {
	Game.VX++;
	Game.renameVX();
}

Game.renameVX = function () {
	l("MakeVX").innerHTML = Game.VXVerbs[random(0, Game.VXVerbs.length - 1)]
		+ " " + Game.VXNouns1[random(0, Game.VXNouns1.length - 1)]
		+ " " + Game.VXNouns2[random(0, Game.VXNouns2.length - 1)];
}


/*==============================================================
  LAUNCH
==============================================================*/
window.onload = function() {
	Game.Launch();
}