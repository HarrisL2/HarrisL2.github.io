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
	Game.bossDamage = [2, 10, 100]
	Game.bossHealth = [200, 2000, 20000]
	Game.currBossDamage = 0;
	Game.currBossHealth = 0;
	Game.mana = 0;
	Game.manaGainPerSecond = 5;
	/*==============================================================
	  BUTTON ASSIGNMENT
	==============================================================*/
	AddEvent(l("sacrifice"), "click", Game.Bleed);
	AddEvent(l("dmgup"), "click", Game.DamageUp);
	AddEvent(l("fightDemon"), "click", Game.FightNextBoss);
	AddEvent(l("leaveHell"), "click", Game.LeaveHell);
	AddEvent(l("spellAttack"), "click", Game.Scythe);
	AddEvent(l("spellDefence"), "click", Game.Shield);
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
	l("costDmgup").innerHTML = "It costs "+Game.DamageUpCost+" Blood to increase your damage.";
	
	l("hellDamage").innerHTML = "You are dealing "+Game.DamagePerSecond+" damage to "+Game.bossNames[Game.bossID]+" per second.";
	l("hellBlood").innerHTML = "You have "+Game.Blood+" Blood.";
	l("bossDamage").innerHTML = Game.bossNames[Game.bossID]+" deals "+Game.currBossDamage+" damage per second to you.";
	l("bossHealth").innerHTML = Game.bossNames[Game.bossID]+" has "+Game.currBossHealth+" health remaining.";
	l("mana").innerHTML = "You have "+Game.mana+" mana."
	l("manaGain").innerHTML = "You are gaining "+Game.manaGainPerSecond+" mana per second."
}
/*==============================================================
  GAME LOOP
==============================================================*/
Game.Loop = function () {
	Game.date = new Date();
	Game.timeRaw = Game.date.getTime();
	if(!Game.isFighting) { //Altar Gains
		if (Game.timeRaw - Game.timeLast > 1000) {
			Game.Blood += Game.BloodGainPerSecond;
			Game.timeLast = Game.date.getTime();
			Game.Draw();
		}
	} else if (Game.isFighting) {
		if (Game.Blood <= 0) { //If player loses
			l("altar").style.display = "block";
			l("hell").style.display = "none";
			Game.isFighting = false;
			Game.Draw();
		} 
		if (Game.currBossHealth <= 0) { //If player wins
			l("altar").style.display = "block";
			l("hell").style.display = "none";
			Game.bossID += 1;
			l("fightDemon").innerHTML = "Fight "+Game.bossNames[Game.bossID];
			l("bossStats").innerHTML = Game.bossNames[Game.bossID]+" - Health: "+Game.bossHealth[Game.bossID]+", Damage per Second: "+Game.bossDamage[Game.bossID];
			Game.BloodGainPerSecond *= 3;
			Game.isFighting = false;
			Game.Draw();
		}
		if (Game.timeRaw - Game.timeLast > 1000) { //Running the combat
			Game.Blood -= Game.currBossDamage;
			Game.currBossHealth -= Game.DamagePerSecond;
			Game.mana += Game.manaGainPerSecond;
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
	l("currentlyFighting").innerHTML = "You are fighting "+Game.bossNames[Game.bossID]+".";
	Game.isFighting = true;
	Game.mana = 0;
	Game.currBossDamage = Game.bossDamage[Game.bossID];
	Game.currBossHealth = Game.bossHealth[Game.bossID];
	l("altar").style.display = "none";
	l("hell").style.display = "block";
	Game.Draw();
}
Game.LeaveHell = function() {
	l("leaveHell").innerHTML = "There is no escape."
}
Game.Scythe = function() {
	if(Game.mana >= 25) {
		Game.mana -= 25;
		Game.currBossHealth -= Game.DamagePerSecond * 10
		Game.Draw();
	}
}
Game.Shield = function() {
	if(Game.mana >= 50) {
		Game.mana -= 50;
		Game.currBossDamage /= 2;
		Game.Draw();
		setTimeout(Game.ShieldCleanup, 5000);
	}
}
Game.ShieldCleanup = function() {
	Game.currBossDamage *= 2;
	Game.Draw();
}

/*==============================================================
  LAUNCH
==============================================================*/
window.onload = function() {
	Game.Launch();
}