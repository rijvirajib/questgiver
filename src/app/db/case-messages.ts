import { AttributeModel } from '../models/attribute.model'
import { NPCModel } from '../models/npc.model'
import { ObstacleModel, OBSTACLE_TYPE } from '../models/obstacle.model'

export const CASEMESSAGES = {
  [OBSTACLE_TYPE.UNKNOWN]: {
    case: [
      `Need to figure out what this unknown could be.`,
      `Hope it's not Captain Sunshine...`,
    ],
    casing: [
      `Looking into the blueprints.`,
      `Digging some tunnels to check out what it could be.`,
      `Hacking security company for layout.`,
      `Eating some pizza, we're hungry.`,
    ],
    casingClose: (type: OBSTACLE_TYPE) => {
      return `It looks like a type of ${OBSTACLE_TYPE}. Not sure...`
    },
    cased: (type: OBSTACLE_TYPE, obstacle: ObstacleModel) => {
      return CASEMESSAGES[type].cased[Math.floor(Math.random() * CASEMESSAGES[type].cased.length)]
    },
    attributeDisables: (attribute: AttributeModel) => {
      return `Who cares what it was? ${attribute.name} takes care of all.`
    }
  },
  [OBSTACLE_TYPE.KEYPAD]: {
    case: [
      `There's a keypad, looking for a way in.`,
      `Keypad found! I wonder what's behind...`,
    ],
    casing: [
      `Waiting for someone to unhide the keypad.`,
      `Using some fancy forensics to find the code.`,
      `Scanning security company for code.`,
    ],
    cased: [
      `Someone used the keypad!`,
      `Powder forensics revealed the keypad.`,
    ],
    caught: [
      `They must have used anti-powder fingerprints!`,
      `The code was not 80085!`,
    ],
    attributeDisables: (attribute: AttributeModel) => {
      return `Using the powers of ${attribute.name},  the keypad is disabled!`
    }
  },
  [OBSTACLE_TYPE.CCTV]: {
    case: [
      `There's a CCTV, looking for a way around.`,
      `CCTV found! I wonder if I can limbo low enough...`,
    ],
    casing: [
      `Waiting for security to leave the CCTV room.`,
      `Using some fancy tools, I'll try to find all the CCTVs.`,
      `Contacting security company for CCTV info.`,
    ],
    cased: [
      `Found all the CCTV cameras!`,
      `Found the last of the CCTV cameras`,
    ],
    caught: [
      `I knew clown pattern wouldn't work!`,
      `Crap, they see me... should I wave?`,
    ],
    attributeDisabled: (attribute: AttributeModel) => {
      return `Using ${attribute.name}, the CCTV is disabled!`
    }
  },
  [OBSTACLE_TYPE.NPC]: {
    case: [
      `Saw a shadow in the back.`,
      `Heard some noises in the back.`,
    ],
    casing: [
      `Waiting for someone to come out.`,
      `Looking through a window`,
      `Scanning employee list.`,
    ],
    cased: [
      `Found his Hero file.`,
      `Look at those stats!`,
    ],
    caught: [
      `Crap... that Hero saw me.`,
      `I knew clown pattern wouldn't work!`,
    ],
    npcDisabled: (npc: NPCModel, attribute?: AttributeModel) => {
      if (attribute) {
        return `Seeing an enemy with ${attribute.name}, ${npc.name} has run away!`
      }

      return `${npc.name} has run away!`
    }
  }
}
