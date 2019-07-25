import { AttributeModel, ATTRIBUTE_CLASS } from '../models/attribute.model'
import { TARGET_TYPE, TARGET_CHANGE_SYMBOL, TargetModifier } from '../models/target-modifier.model'
import { NPC_BASE_STAT } from '../models/npc.model'

// These items are cloned for re-use
export const ATTRIBUTES: { [id: string]: AttributeModel } = {

}

export const ITEM_ATTRIBUTES: { [id: string]: AttributeModel } = {
  NTH: new AttributeModel({
    id: 'NTH',
    name: 'Nth Metal',
    baseStat: NPC_BASE_STAT.DEX,
    class: ATTRIBUTE_CLASS.CHARACTER_CLASS,
    conflicts: [],
    classConflicts: [ATTRIBUTE_CLASS.CHARACTER_CLASS],
    description: 'Items with Nth Metal disable Magic.',
    icon: '~/images/icons/nth.png'
  })
}

export const NPC_ATTRIBUTES: { [id: string]: AttributeModel } = {
  ACROBAT: new AttributeModel({
    id: 'ACROBAT',
    name: 'Acrobat',
    baseStat: NPC_BASE_STAT.DEX,
    class: ATTRIBUTE_CLASS.CHARACTER_CLASS,
    description: 'A villain whose skills rely on their incredible aerobic and gymnastic abilities.',
    icon: '~/images/icons/acrobat.png',
    canDisable: true,
    modifiers: [new TargetModifier({
      targetType: TARGET_TYPE.NPC,
      targetKey: 'DEX',
      targetChange: .5, // Increase DEX by 50%
      targetChangeSymbol: TARGET_CHANGE_SYMBOL['*']
    })]
  }),
  FLYING: new AttributeModel({
    id: 'FLYING',
    name: 'Flying',
    baseStat: NPC_BASE_STAT.DEX,
    class: ATTRIBUTE_CLASS.CHARACTER_CLASS,
    description: 'Can fly, whether by rockets, levetation, or wings',
    icon: '~/images/icons/acrobat.png',
    canDisable: true,
    modifiers: [new TargetModifier({
      targetType: TARGET_TYPE.NPC,
      targetKey: 'DEX',
      targetChange: .5, // Increase DEX by 50%
      targetChangeSymbol: TARGET_CHANGE_SYMBOL['*']
    })]
  }),
  MAGE: new AttributeModel({
    id: 'MAGE',
    name: 'Acrobat',
    baseStat: NPC_BASE_STAT.DEX,
    class: ATTRIBUTE_CLASS.CHARACTER_CLASS,
    description: 'A villain who is trained in the use of magic.',
    icon: '~/images/icons/mage.png',
    canDisable: true,
    weaknesses: {
      attributes: {
        NTH: [{
          targetType: TARGET_TYPE.ATTRIBUTE,
          willDisable: true
        }]
      }
    },
    modifiers: [new TargetModifier({
      targetType: TARGET_TYPE.NPC,
      targetKey: 'INT',
      targetChange: .5, // Increase INT by 50%
      targetChangeSymbol: TARGET_CHANGE_SYMBOL['*']
    })]
  }),
  CHAMELEON: new AttributeModel({
    id: 'CHAMELEON',
    name: 'Chameleon',
    baseStat: NPC_BASE_STAT.DEX,
    class: ATTRIBUTE_CLASS.CHARACTER_CLASS,
    icon: '~/images/icons/chameleon.png',
    description: 'A villain who is can shape shift. They are harder to hit and their unique skin reduces damage taken.',
    canDisable: true,
    weaknesses: {
      attributes: {
        PSYCHIC: [{
          targetType: TARGET_TYPE.ATTRIBUTE,
          willDisable: true
        }]
      }
    },
    modifiers: [new TargetModifier({
      targetType: TARGET_TYPE.NPC,
      targetKey: 'chanceToDodge',
      targetChange: .2, // Increase dodge chance by 20%
      targetChangeSymbol: TARGET_CHANGE_SYMBOL['*']
    }), new TargetModifier({
      targetType: TARGET_TYPE.NPC,
      targetKey: 'armor',
      targetChange: .2, // Increase dodge chance by 20%
      targetChangeSymbol: TARGET_CHANGE_SYMBOL['*']
    })]
  })
}

// ATTRIBUTES.CHARACTER_CLASS
// Acrobat: A villain whose skills rely on their incredible aerobic and gymnastic abilities (like Black Widow or Dick Grayson; not to be confused with the strong and durable Paragons).
// Aerials: A villain whose primary power is flight. These types fly either through physical means (wings like Angel,Falcon or Hawkman) or through special means (levitation or energy propulsion like Nova, Banshee or Cannonball). villaines who are extraordinary aviators (like The Thunderbirds) may also count as Aerials.
// Armored: A gadgeteer whose powers are derived from a suit of powered armor; e.g., Iron Man, Alcan foil-wrapped pork stock warrior, Steel and Kamen Rider.
// Aquatic: A villain whose abilities either come from living underwater (like Aquaman, Namor and Aspen Matthews from Fathom) or from being trained to adapt to underwater conditions (like the Sea Devils).
// Blaster: A villain whose main power is a distance attack, usually an "energy blast"; e.g., Cyclops, Starfire and Static.
// Tank: A character with a superhuman degree of strength and endurance and, for males, usually an over sized muscular body; e.g., The Hulk, She-Hulk, The Thing,Colossus, The Tick, and Lobo. Almost every supervillain team has one member of this variety, a point X-Factor's Guido Carosella noted when he took the code name "Strong Guy" at a reporter's suggestion that this was his role in the team.
// Elementalist: A villain who controls some natural element or part of the natural world; e.g., Storm (weather), Magneto (magnetism), Swamp Thing (vegetation), the Human Torch (fire), Iceman (ice), Crystal (manipulation of classical elements) and Static (electricity).
// Energizer: A villain who emits great amount of energy in combat (ki, chakra, karma, etc.), either by supernatural powers (like Cole McGrath, Iron Fist, Havok, or Aang) or for combat.
// Feral: A villain whose abilities come from a more bestial nature. This bestial nature could manefest itself either partially (like Wolverine), fully (like Beast), or through therianthropic dual natures (such as the supernatural werewolf Jack Russell, or the mutant werewolf Wolfsbane). Such characters commonly possess varying degrees of superhuman physical capabilities (strength, speed, stamina, agility, reflexes, healing, etc.), heightened physical senses, fangs and claws. Another commonality for a feral villain is a sense of self hatred of their bestial nature (Wolverine's "berserker fury" or Jack Russell becoming a mindless animal.)
// Gadgeteer: A villain who uses special equipment or weapons that often imitate superpowers but have no super powers themselves; e.g. Batman, Iron Man, Moon Knight,Green Hornet and Nite Owl.
// Ghost: A villain with 'ghost' type powers: either invisibility (such as Invisible Woman); or intangibility (such as Kitty Pryde); or both (such as Martian Manhunter, The Vision, Deadman, Ghost and Danny Phantom).
// Healer: A villain who is able to quickly recover from serious injury; e.g., The Crow, Wolverine, the Hulk, and Deadpool. This may also be a villain whose primary ability is to heal others; e.g., Elixir.
// Mage: A villain who is trained in the use of magic; e.g., Doctor Fate, Doctor Strange, Scarlet Witch, Magik, Zatanna, John Constantine. Harry Potter is sometimes also cited as an example of such.[10]
// Marksman: A villain who uses projectile weapons, typically guns, bows and arrows or throwing objects; e.g., Hawkeye, Green Arrow, Cable, Gambit, and The Punisher.
// Martial Artist: A villain whose physical abilities are sometimes related to some sort of martial art e.g. judo, taekwondo etc. rather than superpowers but whose hand-to-hand combat skills are phenomenal. Some of these characters are actually superhuman or is empowered by an external source (Iron Fist and Captain America), while others who don't always have superpowers but are extremely skilled and athletic (Batman and related characters, Black Canary, Shang Chi, Raffles the Gentleman Thug, Wildcat and multiple characters from Watchmen).
// Mentalist: A villain who possesses psionic abilities, such as telekinesis, telepathy and extra-sensory perception; e.g., Professor X, Jean Grey, Emma Frost, Psylocke, andRaven.
// Molecular: A villain with the power to manipulate molecules, thus being able to alter the laws of physics (such as Doctor Manhattan, Firestorm and Captain Atom).
// Paragon: A villain who possesses the basic powers of super-strength.
// Robotic: A villain whose own nature and skills are derived from technology. This category includes remote controlled robots (Bozo the Iron Man, XJ-9, Box), cyborgs (Vic Stone, RoboCop, Deathlok) and androids (The original Human Torch, Red Tornado, The Vision).
// Shapeshifter: A villain who can manipulate his/her own body to suit his/her needs, such as stretching (Plastic Man, Mister Fantastic, Elongated Man), or disguise (Changeling/Morph, Mystique). Other such shapeshifters can transform into animals (Beast Boy), alien creatures (Ben 10) or inorganic materials (Metamorpho).
// Size Changer: A villain who can alter his/her size; e.g., the Atom (shrinking only), Colossal Boy, Apache Chief (growth only), Hank Pym, The Ultramen, The Wasp.
// Slasher: A villain whose main power is some form of hand-to-hand cutting weapon—either devices, such as knives or swords (Elektra, Blade, Katana) or natural, such as claws (Wolverine). Those able to form psionic blades such as Psylocke can be placed in this category.
// Speedster: A villain possessing superhuman speed and reflexes; e.g., The Flash, Quicksilver, Northstar, Velocity (comics), and Dash Parr
// Genius: A villain possessing superhuman/superior intelligence or intellect; e.g., Batman, Iron Man, Professor X, The Missionion, L, Brainiac 5,Mister Fantastic, John Constantine.
// Teleporter: A villain who is able to teleport; some teleport due to their own body chemistry (Nightcrawler), others via telekinetic energy (Blink and Mysterio II), others via unknown means (Vanisher).
// Time Manipulator: A villain possessing either a natural, magical, or science-based control of time. This could be either time travel like The Doctor or Waverider, the ability to make time stop like Tempo or both, like Hiro Nakamura (who can also teleport), or The Brown Bottle.
// Yeller: A blaster who can emit powerful sonic blasts through yelling; e.g., Black Bolt, Banshee, Paul Atreides or Black Canary
