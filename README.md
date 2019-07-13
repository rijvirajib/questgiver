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
    position: {
      x: 0,
      y: 0
    },
    rank: number,
  },
  inventory: [...Item],
  quests: [...Quest],
  heroes: [...Hero],
  locations: { // location position stored as key for easy filtering
    posXposY: Location
  }
}
```

```typescript
class Quest() {
  name: string
  description: string
  location: Location
  currentPosition: {
    x: number
    y: number
  }

  addedTime: number
  acceptedTime: number
  arriveTime: number // how long it will take to complete mission
  completedTime: number

  type: enum // bounty? hunting? delivery? search?
  requirements: {
    level?: number // sum total of all hero levels (ie 500 means at least 5 heroes at 100 level)
    monsters?: [...Monster] // any monsters that will be fought
  }

  rewards: {
    gold?: number
    items?: [...Item]
    heros?: [...Hero]
    quests?: [...Quest] // Follow up quests!
  }

  status: {
    time: number // for search, hunting, or delivery quests
    monsters: [...Monster],
  }

  heroes?: [...Hero] // assigned heroes
  items?: [...Item] // assigned items
  log: [...Event] // this that happened in the quest

  async onStart() // sets acceptedTime
  async onTick() // roll for random events, check arriveTime, fight Monsters
  combat() // based on tick, who attacks whom
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
  salary: number

  rarity: number // chance to successfully win as reward

  type: enum // brawler? archer? types define generic skills
  skills: [...Skill]

  health: number // (0, 100)
  attack: number // [0, 100)
  defense: number // [0, 100)
  accuracy: number // Chance of successfully hitting
  speed: number // default 1, .5 means 2x attack

  gear: {
    rightHand: Item
    leftHand: Item
    armor: Item
    helm: Item
    trinket: Item
  }

  onAttack() // attack + ATTACK items
  onDefend() // armor + DEFENSE items
  onDeath() // roll for gear recovery
}

class Item() {
  name: string
  description: string
  rarity: number // chance of success as reward and how item is colored

  type: enum // one hand, two hand, armor, helm, trinket
  skills?: [...Skill] // character modifiers

  quality: number // (0, 100) keeps track of damage and usage

  isSellable = true
  sellValue: number

  isStoreItem: boolean
  buyValue: number

  requirements: {
    skills?: [...Skill] // hero must have these skills
    items?: [...Item] // hero must have these items
  }

  // run through each skill and update character
  onEquip()
  onDrop()
}

class Skill() {
  name: string
  description: string
  type: enum // item, magic, hero, quest, monster
  rarity: number // chance of success as reward
  element?: enum // normal, fire, water, electric, rock, ice, poison, psychic, ghost, dark
  health?: number // change in health
  attack?: number // change in attack
  defense?: number // change in defense
  accuracy?: number // % change in accuracy
  speed?: number // % change in speed
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

  // Items could be rewarded to
  rarity: number // used to generate random rewards and their qualities onDeath
  rewards: {
    gold: number
    items?: [...Item]
  }

  onAttack() // attack + type modifier
  onDefend() // armor + type modifier
  onDeath()
}

class Location() {
  name: string
  description: string
  type: enum // city, cave, underwater, jungle, forest, plains, etc
  // The center of the map is player location: 0,0
  position: {
    x: number
    y: number
  }
  requirements: {
    skills: [...Skills] // perhaps you need a flying hero
  }
}
```
