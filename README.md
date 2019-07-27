# Villains for Hire

I thought more about the tavern idea and I think it'd be more unique to GIVE out quests.. so what if you're a clerk of the Hero's Guild. Your job is to find the appropriate heroes in the most efficient way given your department's budget. Completing quests gives you rewards in the form of money and items. You select your heroes, outfit your heroes, and (maybe) select the potential location [which changes how long a misison will take].
The game would give you a queue of quests to selecft from. As your successful quests rack up, you gain promotions which unlocks higher difficulty quests and more unique gear and heroes.
The map will give you some 'story' quests which are high tier and have item requirements .. you could find out the hard way by sending ill prepared heroes first or research the monsters that you are going after to find the best party composition.

[Games-Icons](https://game-icons.net/)
[OpenGameArt](https://opengameart.org)


A text adventure RPG
==

Plot
====
You are an employee of a defeated Guild of Villains; The Guild of Heroes have defeated your greated members and now they are all in hiding. Since most Expendables in the Department of Efficient Adversary Deployment, also known as DEAD, are now... well.. dead, we are on a hiring spree! As a new Expendable, you will begin by setting up what's left of our Villains (the old, the weak, and the newbies) with some basic missions. As you complete missions and gain more exp, you will get access to more Villains of reknown. We are getting back at the Heroes Guild and we have to start small.

The plot can go in a few directions:

1. You complete all the Guild missions becoming a Mastermind of the Guild, winning the game as a pawn of the Guild of Villains.
2. You complete Guild of Hero missions instead of following the Villain path. During your regular story quest, you will get a side quest mission from an UNKNOWN. If you ACCEPT This entails hitting story quest targets that are of 'GOOD' for the heroes. Eventually it goes into taking down the Heroes Guild location. The Guild of Villains will not award you EXP for these missions but the Guild of Heroes will pay you handsomely for completing them. At completion, you get a choice if you want to join the Guild of Heroes or be the new Mastermind of The Guild of Villains.
3. You go rogue and take down both Villains and Heroes by following a quest line of a mysterious guild, the Tiny Anonymouse Corp. This will be another optional quest line that you could go through but the targets will be both Heroes and Villains locations (no rewards at all for any story quests)

What happens along the way.. is going to be interesting to work on. The way the quests are set up though, I can focus on just one quest line, finish it to completion, then add new quest lines.

GAMEPLAY
====
In either case, you are given a list of targets/missions/quests
You source your villains, equipment, and plan (routes, escapes). Some equipment or villain powers will help overcome 'obstacles' like cameras, lasers, traps, guards (who are also super heroes with their own special traits). Failure to overcome compltely will result in higher combat difficulty through more NPCs and buffs for existing NPCs (these are randomized, quests can fail hard with bad luck).
You have no direct control of your villains. Only the prep and plan.

Examples of randomization:

1. During ESCAPE phase, a random event caused you to lose 10% of your loot.
2. During PREP phase, a villain with the `Talkative` trait was arrested. You can choose to replace him or release them from prison.
3. During PREP phase, you discover that an obstacle can be disabled for a price/free
4. During COMBAT phase, NPCs can miss, damage is random between min/max, turns are based on 'speed', so some NPCs would attack more often than others.
5a. Before COMBAT, Obstacles are tackled. If your obstacle is Cameras, you could use a jammer
5b. device OR hire a villain that is Anti-Cameras (like Invisible, Electric Powers, or Hacker), maybe your Jammer fails, oops, equipment can be fickle sometimes. If it fails, we then do a chance to be detected which would result in a few more NPCs to address.

If you have at least one standing villain after the combat, you 'win' rewards. Losses are never permanent (TBD!!!), they will be out of stock for N time and they will be available again - items will be recovered by a more capable team, NPCs return after recovering from running away. If you lose the combat, each villain will roll for escape, you lose all items for failed villains and if no villains escape, you lose all quest items.

Rewards are money, villains, items, and even new missions/target locations.

There is a LOSE to the game... money?
There is an END to the game, just don't know what.


Quests are in 3 phases
====
* Phase 1 - PREP - This phase tells you how much time to get to 100% prep is left, and any notices that come in that you may want to address before DEPLOY (Phase 2). During the PREP phasee, you can hire the right crew, equip the right items, and set up escape routes as you see fit. You can also do things with money or items to affect the Quest like bribe enemy NPCs, buff your NPCs, disable OBSTACLES, prevent backup, etc.
* Phase 2 - DEPLOY/COMBAT, if there are any enemy NPC remaining, COMBAT begins. We go through the motions of combat which isn't fleshed out yet and I can use help with that logic. Eventually if there are no more enemy NPCs, you win. Otherwise, you lose. This is definitely an area that can have way more interaction but as long as I am using the TICK() as the timer, I am not sure how else to support combat that isn't totally realtime (and will require way more effort).
* Phase 3 - ESCAPE - If you didn't survive the encounter, escape rolls happen for every living character. Having at least 1 Villain escape means you get all your quest items back along with the items that Villain had equipped. Characters who cannot escape lose all the items you equipped them. Random events may happen here out of Character stats or Unfortunate Events.


So the MAIN screen show your character stats and a news ticker that shows you world events (when your guys are completing quests, side effects of quests, etc)
The MISSIONS screen has a map and also shows a list of active quests below it. See their latest status and DISCOVERIES and support them by giving them more manpower, address an issue like "Hey boss, we just found out they added 3 more guards and we need a neutralizer gun", etc
The MISSION BOARD section shows list of available quests.
When you select a quest, you can read the description, potential issues, and generic stats like locaiton, dificulty, etc
If you accept, you get a screen with several boxes:

PREP PHASE:
During this phase, as time passes, you learn more about your target. There could be hidden Obstacles you didn't know ahead of time. Giving the PREP phase time to research the location means you lose an active quest slot but also a higher chance of succeeding in a quest.

* The Crew - you select your crew and their gear (if you want to swap out the defaults, but be wary - signature gear cannot be unequipped). Here is where most of the item stat modifiers will come into play. Having an Invisible man gives you the ability to address an Obstacle (Cameras) (as you'd use the Invisible man to disable cameras as needed). Having a hacker would let you address the Obstacle, ID Card Access.
* The Obstacles - see addressed obstacles via skills and items.
* Orders - This shows the objectives of the Quest and once Prep is complete. Optionally, I am thinking this is where you could select specific traits to be used on NPC enemies. Ie, Invisible Man could probably take out all the guards but at a huge risk to him (chance of failure almost certainlyt means death with this OP action).
* The Escape - How you plan to escape if things go south. Using an item or hero skill here will give you a much higher chance of both your villains surviving and your quest items coming back.

Once you Deploy, your heroes will begin the COMBAT phase until one side runs away completely. The more prepping you do, the less combat you have, the less injury you have. After all, paying for villain health insurance is expensive (losses increase the cost of hiring Villains in the future). During the prep phase, you may get alerts of new developments like Cameras are actually off, you no longer need to address the Camera obstacle or one of the Heroes defending this location is susceptible to a bribe, pay him off and reduce your NPC guard count.

During Combat phase (after the Prep is complete and all obstacles are addressed - unaddressed obstacles make NPCs harder), your Villains will auto battle the enemy NPC based on speed, accuracy, power, traits, and items.

Traits
====
A list of stats a NPC Villain or Hero can have. NPCs can have 0 to N number of traits. Some traits conflict, so they are on the same line they conflict with. Traits can affect Obstacles like a trait Electric would disable non-CCTV cameras by default. Traits can also be negative, and might need to be addressed to assure success. Some traits are a chance to happen, for example a Clumsy trait doesn't necessarily mean a bad thing but they have a low chance of getting caught during the prep or go phase. If they get caught, they are removed from the Villain pool for a while, all their equipment is lost. This does not mean you lose the mission and usually the only other negative thing will be a few more enemy NPCs for heightened security.

* Undead/Vampire/Animal-based(SpiderGuy and SquidBitch)/Dragon/Human/Alien/Robot
* Magic/Physical
* Fire/Water/Electric/Earth/Ice/None
* Flying/Jumping/Normal
* Strong
* Stretch
* Speedster
* Illusion
* Invulnerable - Vulnerable: ITEM, Vulnerable: TRAIT (You can never be neigh invulnerable and also Magic)
* Duplicate (split into more than one)
* Invisible
* Magnet
* Telepath
* Insane (unpredictable)
* Coward (may run away during combat, leaving the area)
* Talkative (may get caught during prep time)
* Hacker
* Neurotic
* Healer
* Pacifist (will not participate in combat)
* Robotics
* Regeneration
* 4 handed (adds 2 more slots)
* Eagle Vision
* Immortal (will always be available after a quest)
* Reality Warper (this is probably going to be only seen figthing a Scientology god)
* Aggressive (may get caught during ORDERS phase)
* Clumsy (may get caught during PREP or ORDERS phase)
* Time (this is an OP trait and will probably have major weaknesses)
* Portals
* Necromancer - More dead NPCs means a stronger Necromancer, use wisely
* Causes Fear - Can force an NPC to run away during combat.
* Teleport
* Claws (lololol)
* Eye Lasers
* Premonition


COMBAT
====
I need to add some sort of stamina thing.. Im working out how combat math will work and realized it'll have infinite loops if not enough damage vs survivability. Need a way to get NPCs to become tired (which increases chance of fleeing?). Maybe a MORALE rating that is derived by some math enemy total power level/current power level + HP loss? Power Level being the major factor in how a Villain is 'built'(generated).

I need to also figure out how to handle the stats.. I'm thinking I will use the tried and true generic stats STR/DEX/INT and derive the more complex stats.
* STR- HP, Base Damage, Block Damage Mitigation
* DEX - Armor, Attack Speed, Block Chance, Accuracy, Dodge Chance
* INT - Mana, Mana Regen, Accuracy

A character can be one of 3 classes above.
Adding items that modify that primary attribute will also increase base damage of the hero.
