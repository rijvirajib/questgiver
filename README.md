# QuestGiver

I thought more about the tavern idea and I think it'd be more unique to GIVE out quests.. so what if you're a clerk of the Hero's Guild. Your job is to find the appropriate heroes in the most efficient way given your department's budget. Completing quests gives you rewards in the form of money and items. You select your heroes, outfit your heroes, and (maybe) select the potential location [which changes how long a misison will take].
The game would give you a queue of quests to selecft from. As your successful quests rack up, you gain promotions which unlocks higher difficulty quests and more unique gear and heroes.
The map will give you some 'story' quests which are high tier and have item requirements .. you could find out the hard way by sending ill prepared heroes first or research the monsters that you are going after to find the best party composition.

[Games-Icons](https://game-icons.net/) 
[OpenGameArt](https://opengameart.org)


```typescript
const gameState = {
  time: number,
  gold: number,
  player: {
    rank: number,
  },
  inventory: [...Item],
  quests: [...Quest],
  heroes: [...Hero],
}
```

```typescript
class Quest() {
  name: string
  description: string
  location: Location

  addedTime: number
  acceptedTime: number
  arriveTime: number // how long it will take to complete mission
  completedTime: number
  
  type: enum // bounty? hunting? delivery?
  requirements: {
    level?: number // sum total of all hero levels (ie 500 means at least 5 heroes at 100 level)
    monsters?: [...Monster] // any monsters that will be fought
  }
  
  rewards: {
    gold?: number
    items?: [...Item]
    heros?: [...Hero]
  }
  
  status: {
    monsters: [...Monster],
  }
  
  heroes?: [...Hero] // assigned heroes
  items?: [...Item] // assigned items
  log: [...Event] // this that happened in the quest
  
  async onStart() // sets acceptedTime
  async onTick() // roll for random events, check arriveTime, fight Monsters
  async onComplete() // heroes/items could be lost, rewards if possible
}

class Event() {
  type: string // quest? world? player?
  message: string // any message we display to the user
  async effects() // changes the quest state
}
```

```typescript
class Hero() {
  name: string
  description: string // not sure if I'll have this
  gold: number
  
  type: enum // brawler? archer? types define generic skills
  skills: [...Skill]
  
  health: number // (0, 100)
  level: number // [0, 100)
  accuracy: number // Chance of successfully hitting
  
  gear: {
    rightHand: Item
    leftHand: Item
    armor: Item
    helm: Item
  }
  
  onAttack() // run through all ATTACK items
  onDefend() // run through all DEFEND items
  onDeath() // roll for gear recovery
}

class Item() {
  name: string
  isQuestItem: boolean // Quest Items are global and do not need a hero to hold it
  
  type: enum // ATTACK or DEFEND or PASSIVE
  damage?: number // if ATTACK
  armor?: number // if DEFEND
  skills?: [...Skill] // passive stuff
  quality: number // (0, 100) keeps track of damage 

  description: string
  
  isSellable = true
  sellValue: number
  
  isStoreItem: boolean
  buyValue: number
  
  rarity: .1 // must score > 90% to get this item as reward

  requirements: {
    questType?: enum
    skills?: [...Skill]
    items?: [...Item]
  }
  
  onEquip()
  onUse() // uses hero level + item modifiers
  onDrop()
}

class Monster() {
  name: string
  type: enum // what type of monster
  health: number // 100 * number of required hero levels
  attack: number // default damage
  armor: number // default armor reduction
  accuracy: number // default accuracy to successfully hit
 
  beastiary: string // description of the monster and weaknesses
  weaknesses: [...Skill] 
  
  onAttack() // attack + type modifier
  onDefend() // armor + type modifier
  onDeath()
}

class Skill() {
  name: string
  description: string
  type: enum // item, magic, hero, quest, monster
  modifier() // ie. + .3 to accuracy, + Poison Damage
}
```
