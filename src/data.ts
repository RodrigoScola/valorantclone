import path from "path";
import { CharacterName } from "../types";

type ImageFormat = "full" | "icon";
class Characters {
  static getImagePath(name: CharacterName, format: ImageFormat) {
    return path.join(
      __dirname,
      "public",
      "images",
      format,
      `${name}_${format}.png`
    );
  }
}

export const CharactersInfo = [
  {
    name: "brimstone",
    id: 0,
    description: `Joining from the USA, Brimstone's orbital arsenal ensures his squad always has the advantage. His ability to deliver utility precisely and from a distance makes him an unmatched boots-on-the-ground commander.`,
    images: {
      icon: Characters.getImagePath(CharacterName.BRIMSTONE, "icon"),
      full: {
        image: Characters.getImagePath(CharacterName.BRIMSTONE, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
  {
    name: "phoenix",
    id: 1,
    description: `Hailing from the U.K., Phoenix's star power shines through in his fighting style, igniting the battlefield with flash and flare. Whether he's got backup or not, he'll rush into a fight on his own terms.`,
    images: {
      icon: Characters.getImagePath(CharacterName.PHOENIX, "icon"),
      full: {
        image: Characters.getImagePath(CharacterName.PHOENIX, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
  {
    id: 2,
    name: "sage",
    description: `The stronghold of China, Sage creates safety for herself and her team wherever she goes. Able to revive fallen friends and stave off aggressive pushes, she provides a calm center to a hellish fight.`,
    images: {
      icon: Characters.getImagePath(CharacterName.Sage, "icon"),
      full: {
        image: Characters.getImagePath(CharacterName.Sage, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
  {
    name: "sova",
    id: 3,
    description: `Born from the eternal winter of Russia's tundra, Sova tracks, finds, and eliminates enemies with ruthless efficiency and precision. His custom bow and incredible scouting abilities ensure that even if you run, you cannot hide.`,
    images: {
      icon: Characters.getImagePath(CharacterName.SOVA, "icon"),
      full: {
        image: Characters.getImagePath(CharacterName.SOVA, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
  {
    name: "viper",
    id: 4,
    description: `The American chemist, Viper deploys an array of poisonous chemical devices to control the battlefield and cripple the enemy's vision. If the toxins don't kill her prey, her mind games surely will.`,
    images: {
      icon: Characters.getImagePath(CharacterName.VIPER, "icon"),
      full: {
        image: Characters.getImagePath(CharacterName.VIPER, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
  {
    name: "cypher",
    id: 5,
    description: `The Moroccan information broker, Cypher is a one-man surveillance network who keeps tabs on the enemy's every move. No secret is safe. No maneuver goes unseen. Cypher is always watching.`,
    images: {
      icon: Characters.getImagePath(CharacterName.CYPHER, "icon"),
      full: {
        image: Characters.getImagePath(CharacterName.CYPHER, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
  {
    name: "reyna",
    id: 6,
    description: `Forged in the heart of Mexico, Reyna dominates single combat, popping off with each kill she scores. Her capability is only limited by her raw skill, making her highly dependent on performance.`,
    images: {
      icon: Characters.getImagePath(CharacterName.REYNA, "icon"),
      full: {
        image: Characters.getImagePath(CharacterName.REYNA, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 50,
      },
    },
  },
  {
    name: "killjoy",
    id: 7,
    description: `The genius of Germany. Killjoy secures the battlefield with ease using her arsenal of inventions. If the damage from her gear doesn't stop her enemies, her robots' debuff will help make short work of them.`,
    images: {
      icon: Characters.getImagePath(CharacterName.KILLJOY, "icon"),
      full: {
        image: Characters.getImagePath(CharacterName.KILLJOY, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
  {
    name: "breach",
    id: 8,
    description: `Breach, the bionic Swede, fires powerful, targeted kinetic blasts to aggressively clear a path through enemy ground. The damage and disruption he inflicts ensures no fight is ever fair.`,
    images: {
      icon: Characters.getImagePath(CharacterName.BREACH, "icon"),
      full: {
        image: Characters.getImagePath(CharacterName.BREACH, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
  {
    name: "omen",
    id: 9,
    description: `A phantom of a memory, Omen hunts in the shadows. He renders enemies blind, teleports across the field, then lets paranoia take hold as his foe scrambles to learn where he might strike next.`,
    images: {
      icon: Characters.getImagePath(CharacterName.OMEN, "icon"),
      full: {
        image: Characters.getImagePath(CharacterName.OMEN, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },

  {
    name: "jett",
    id: 10,
    description: `Representing her home country of South Korea, Jett's agile and evasive fighting style lets her take risks no one else can. She runs circles around every skirmish, cutting enemies before they even know what hit them.`,
    images: {
      icon: Characters.getImagePath(CharacterName.JETT, "icon"),
      full: {
        image: Characters.getImagePath(CharacterName.JETT, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
  {
    name: "raze",
    id: 11,
    description:
      "Raze explodes out of Brazil with her big personality and big guns. With her blunt-force-trauma playstyle, she excels at flushing entrenched enemies and clearing tight spaces with a generous dose of “boom.”",
    images: {
      icon: Characters.getImagePath(CharacterName.RAZE, "icon"),
      full: {
        image: Characters.getImagePath(CharacterName.RAZE, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 25,
      },
    },
  },
  {
    name: "skye",
    id: 12,
    description:
      "Hailing from Australia, Skye and her band of beasts trail-blaze the way through hostile territory. With her creations hampering the enemy, and her power to heal others, the team is strongest and safest by Skye’s side.",
    images: {
      icon: Characters.getImagePath(CharacterName.SKYE, "icon"),
      full: {
        image: Characters.getImagePath(CharacterName.SKYE, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
  {
    name: "yoru",
    id: 13,
    description:
      "Japanese native, Yoru, rips holes straight through reality to infiltrate enemy lines unseen. Using deception and aggression in equal measure, he gets the drop on each target before they know where to look.",
    images: {
      icon: Characters.getImagePath(CharacterName.YORU, "icon"),
      full: {
        image: Characters.getImagePath(CharacterName.YORU, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
  {
    name: "astra",
    id: 14,
    description:
      "Ghanaian Agent Astra harnesses the energies of the cosmos to reshape battlefields to her whim. With full command of her astral form and a talent for deep strategic foresight, she's always eons ahead of her enemy's next move.",
    images: {
      icon: Characters.getImagePath(CharacterName.ASTRA, "icon"),
      full: {
        image: Characters.getImagePath(CharacterName.ASTRA, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 25,
      },
    },
  },
  {
    name: "kayo",
    id: 15,
    description: `KAY/O is a machine of war built for a single purpose: neutralizing radiants. His power to suppress enemy abilities cripples his opponents' capacity to fight back, securing him and his allies the ultimate edge.`,
    images: {
      icon: Characters.getImagePath(CharacterName.KAYO, "icon"),
      full: {
        image: Characters.getImagePath(CharacterName.KAYO, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
  {
    name: "chamber",
    id: 16,
    description:
      "Well dressed and well armed, French weapons designer Chamber expels aggressors with deadly precision. He leverages his custom arsenal to hold the line and pick off enemies from afar, with a contingency built for every plan.",
    images: {
      icon: Characters.getImagePath(CharacterName.CHAMBER, "icon"),
      full: {
        image: Characters.getImagePath(CharacterName.CHAMBER, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
  {
    name: "neon",
    id: 17,
    description:
      "Filipino Agent Neon surges forward at shocking speeds, discharging bursts of bioelectric radiance as fast as her body generates it. She races ahead to catch enemies off guard, then strikes them down quicker than lightning.",
    images: {
      icon: Characters.getImagePath(CharacterName.NEON, "icon"),
      full: {
        image: Characters.getImagePath(CharacterName.NEON, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 25,
      },
    },
  },
  {
    name: "fade",
    id: 18,
    description:
      "Turkish bounty hunter, Fade, unleashes the power of raw nightmares to seize enemy secrets. Attuned with terror itself, she hunts targets and reveals their deepest fears—before crushing them in the dark.",
    images: {
      icon: Characters.getImagePath(CharacterName.FADE, "icon"),
      full: {
        image: Characters.getImagePath(CharacterName.FADE, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },

  {
    name: "harbor",
    id: 19,
    description:
      "Hailing from India’s coast, Harbor storms the field wielding ancient technology with dominion over water. He unleashes frothing rapids and crushing waves to shield his allies and pummel those that oppose him.",

    images: {
      icon: Characters.getImagePath(CharacterName.HARBOR, "icon"),
      full: {
        image: Characters.getImagePath(CharacterName.HARBOR, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
  {
    name: "gekko",
    id: 20,
    description:
      "Gekko the Angeleno leads a tight-knit crew of calamitous creatures. His buddies bound forward, scattering enemies out of the way, with Gekko chasing them down to regroup and go again.",
    images: {
      icon: Characters.getImagePath(CharacterName.GEKKO, "icon"),
      full: {
        image: Characters.getImagePath(CharacterName.GEKKO, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
];
export const classInfo = {
  duelist: {
    id: 4,
    name: "duelist",
    description:
      "Duelists are the most versatile agents in the game. They can hold their own in a 1v1, but they also have the tools to support their team. They are the most balanced class in the game.",
    agents: [1, 10, 6, 11, 13, 17],
  },
  initiator: {
    id: 1,
    name: "initiator",
    description:
      "Initiators are the most aggressive agents in the game. They are the first to engage the enemy and are the most likely to die. They are the most aggressive class in the game.",
    agents: [8, 18, 20, 15, 12, 3],
  },
  controller: {
    id: 2,
    name: "controller",
    description:
      "Controllers are the most supportive agents in the game. They are the most likely to keep their team alive. They are the most supportive class in the game.",
    agents: [0, 14, 19, 4, 9],
  },
  sentinel: {
    id: 3,
    name: "sentinel",
    description:
      "Sentinels are the most defensive agents in the game. They are the most likely to keep their team alive. They are the most defensive class in the game.",
    agents: [16, 5, 2, 7],
  },
};
