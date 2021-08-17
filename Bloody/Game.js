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
	Game.Blood = 200;
	Game.DamagePerSecond = 1;
	Game.DamageUpCost = 10;
	Game.BloodGainPerSecond = 1;
	Game.isFighting = false;
	Game.bossID = 0;
	Game.bossNames = ["Lesser Demon", "Demon", "Greater Demon"]
	Game.bossDamage = [1, 10, 100]
	Game.bossHealth = [200, 5000, 250000]
	Game.currBossHealth = 0;
	/*==============================================================
	  BUTTON ASSIGNMENT
	==============================================================*/
	AddEvent(l("sacrifice"), "click", Game.Bleed);
	AddEvent(l("dmgup"), "click", Game.DamageUp);
	AddEvent(l("fightDemon"), "click", Game.FightNextBoss);
	AddEvent(l("leaveHell"), "click", Game.LeaveHell);
	Game.Loop();

}
/*==============================================================
  DRAW
==============================================================*/
Game.Draw = function()
{
	l("blood").innerHTML = "You have "+Game.Blood+" Blood.";
	l("flow").innerHTML = "You create "+Game.BloodGainPerSecond+" Blood per second.";
	l("costBleed").innerHTML = "It costs "+Game.BleedCost+" Blood to appease Him.";
	l("damage").innerHTML = "You deal "+Game.DamagePerSecond+" damage to enemies per second.";
	l("hellDamage").innerHTML = "You are dealing "+Game.DamagePerSecond+" damage to "+Game.bossNames[Game.bossID]+" per second.";
	l("costDmgup").innerHTML = "It costs "+Game.DamageUpCost+" Blood to increase your damage.";
	l("hellBlood").innerHTML = "You have "+Game.Blood+" Blood.";
	l("bossDamage").innerHTML = Game.bossNames[Game.bossID]+" deals "+Game.bossDamage[Game.bossID]+" damage per second to you.";
	l("bossHealth").innerHTML = Game.bossNames[Game.bossID]+" has "+Game.currBossHealth+" health remaining.";
}
/*==============================================================
  GAME LOOP
==============================================================*/
Game.Loop = function () {
	Game.date = new Date();
	Game.timeRaw = Game.date.getTime();
	if(!Game.isFighting) {
		if (Game.timeRaw - Game.timeLast > 1000) {
			Game.Blood += Game.BloodGainPerSecond;
			Game.timeLast = Game.date.getTime();
			Game.Draw();
		}
	} else if (Game.isFighting) {
		if (Game.Blood <= 0) {
			l("altar").style.display = "block";
			l("hell").style.display = "none";
			Game.isFighting = false;
		} 
		if (Game.currBossHealth <= 0) {
			l("altar").style.display = "block";
			l("hell").style.display = "none";
			Game.bossID += 1;
			l("fightDemon").innerHTML = "Fight "+Game.bossNames[Game.bossID]
			Game.isFighting = false;
		}
		if (Game.timeRaw - Game.timeLast > 1000) {
			Game.Blood -= Game.bossDamage[Game.bossID];
			Game.currBossHealth -= Game.DamagePerSecond;
			Game.timeLast = Game.date.getTime();
			Game.Draw();
		}
	}
	
	setTimeout(Game.Loop, 33);
}
/*==============================================================
  FUNCTIONS
 ============================================================*/
Game.Bleed = function() {
	if (Game.Blood >= Game.BleedCost) {
		Game.Blood -= Game.BleedCost;
		Game.BloodGainPerSecond *= 2;
		Game.BleedCost *= 10;
		Game.Draw();
	}
}
Game.DamageUp = function() {
	if (Game.Blood >= Game.DamageUpCost) {
		Game.Blood -= Game.DamageUpCost;
		Game.DamagePerSecond *= 2;
		Game.DamageUpCost *= 10;
		Game.Draw();
	}
}

Game.FightNextBoss = function() {
	l("altar").style.display = "none";
	l("hell").style.display = "block";
	l("currentlyFighting").innerHTML = "You are fighting "+Game.bossNames[Game.bossID]+".";
	Game.isFighting = true;
	Game.currBossHealth = Game.bossHealth[Game.bossID];
}
Game.LeaveHell = function() {
	l("altar").style.display = "Block";
	l("hell").style.display = "none";
	Game.isFighting = false;
	Game.currBossHealth = Game.bossHealth[Game.bossID];
}

/*==============================================================
  LAUNCH
==============================================================*/
window.onload = function() {
	Game.Launch();
}