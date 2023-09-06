import {
  Character,
  CharacterInfo,
  CharacterName,
  CharacterRole,
  RoleType,
} from "../types";

export const classInfo: Record<CharacterRole, RoleType> = {
  DUELIST: {
    id: 4,
    name: CharacterRole.DUELIST,
    description:
      "Duelists are the most versatile agents in the game. They can hold their own in a 1v1, but they also have the tools to support their team. They are the most balanced class in the game.",
  },
  INITIATOR: {
    id: 1,
    name: CharacterRole.INITIATOR,
    description:
      "Initiators are the most aggressive agents in the game. They are the first to engage the enemy and are the most likely to die. They are the most aggressive class in the game.",
  },
  CONTROLLER: {
    id: 2,
    name: CharacterRole.CONTROLLER,
    description:
      "Controllers are the most supportive agents in the game. They are the most likely to keep their team alive. They are the most supportive class in the game.",
  },
  SENTINEL: {
    id: 3,
    name: CharacterRole.SENTINEL,
    description:
      "Sentinels are the most defensive agents in the game. They are the most likely to keep their team alive. They are the most defensive class in the game.",
  },
};

type ImageFormat = "full" | "icon";
export class Characters {
  public static allCharacters: Map<number, Character> = new Map();
  static getImagePath(name: CharacterName, format: ImageFormat) {
    const imagesavedFormat = format == "full" ? "png" : "webp";
    return `images/${format}/${name}_${format}.${imagesavedFormat}`;
  }
  public static getCharacter(id: number): Character {
    console.log(id);
    if (!Characters.allCharacters.has(id)) {
      throw Error("character dosnt exist");
    }

    return Characters.allCharacters.get(id) as Character;
  }
}
export class RoleHandler {
  static roles = new Map<string, RoleType>([
    ["DUELIST", classInfo.DUELIST],
    ["INITIATOR", classInfo.INITIATOR],
    ["CONTROLLER", classInfo.CONTROLLER],
    ["SENTINEL", classInfo.SENTINEL],
  ]);
  static getRole(roleType: CharacterRole): RoleType {
    if (RoleHandler.roles.has(roleType)) {
      return this.roles.get(roleType) as RoleType;
    }
    throw new Error("role not found");
  }
}

export const charactersinfo: CharacterInfo[] = [
  {
    name: CharacterName.BRIMSTONE,
    roleType: CharacterRole.CONTROLLER,
    id: 0,
    backgroundColor: "#f39353",
    description: `Joining from the USA, Brimstone's orbital arsenal ensures his squad always has the advantage. His ability to deliver utility precisely and from a distance makes him an unmatched boots-on-the-ground commander.`,
    images: {
      icon: {
        url: Characters.getImagePath(CharacterName.BRIMSTONE, "icon"),
      },
      full: {
        url: Characters.getImagePath(CharacterName.BRIMSTONE, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
  {
    name: CharacterName.PHOENIX,
    roleType: CharacterRole.DUELIST,
    id: 1,
    backgroundColor: "#febe64",
    description: `Hailing from the U.K., Phoenix's star power shines through in his fighting style, igniting the battlefield with flash and flare. Whether he's got backup or not, he'll rush into a fight on his own terms.`,
    images: {
      icon: {
        url: Characters.getImagePath(CharacterName.PHOENIX, "icon"),
      },
      full: {
        url: Characters.getImagePath(CharacterName.PHOENIX, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
  {
    id: 2,
    name: CharacterName.SAGE,
    roleType: CharacterRole.SENTINEL,
    backgroundColor: "#75cdf0",
    description: `The stronghold of China, Sage creates safety for herself and her team wherever she goes. Able to revive fallen friends and stave off aggressive pushes, she provides a calm center to a hellish fight.`,
    images: {
      icon: {
        url: Characters.getImagePath(CharacterName.SAGE, "icon"),
      },
      full: {
        url: Characters.getImagePath(CharacterName.SAGE, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
  {
    name: CharacterName.SOVA,
    roleType: CharacterRole.INITIATOR,
    id: 3,
    backgroundColor: "#4c80ba",
    description: `Born from the eternal winter of Russia's tundra, Sova tracks, finds, and eliminates enemies with ruthless efficiency and precision. His custom bow and incredible scouting abilities ensure that even if you run, you cannot hide.`,
    images: {
      icon: {
        url: Characters.getImagePath(CharacterName.SOVA, "icon"),
      },
      full: {
        url: Characters.getImagePath(CharacterName.SOVA, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
  {
    name: CharacterName.VIPER,
    roleType: CharacterRole.CONTROLLER,
    id: 4,
    backgroundColor: "#19c55d",
    description: `The American chemist, Viper deploys an array of poisonous chemical devices to control the battlefield and cripple the enemy's vision. If the toxins don't kill her prey, her mind games surely will.`,
    images: {
      icon: {
        url: Characters.getImagePath(CharacterName.VIPER, "icon"),
      },
      full: {
        url: Characters.getImagePath(CharacterName.VIPER, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
  {
    name: CharacterName.CYPHER,
    roleType: CharacterRole.SENTINEL,
    id: 5,
    backgroundColor: "#919298",
    description: `The Moroccan information broker, Cypher is a one-man surveillance network who keeps tabs on the enemy's every move. No secret is safe. No maneuver goes unseen. Cypher is always watching.`,
    images: {
      icon: {
        url: Characters.getImagePath(CharacterName.CYPHER, "icon"),
      },
      full: {
        url: Characters.getImagePath(CharacterName.CYPHER, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
  {
    name: CharacterName.REYNA,
    roleType: CharacterRole.DUELIST,
    id: 6,
    backgroundColor: "#b35dfa",
    description: `Forged in the heart of Mexico, Reyna dominates single combat, popping off with each kill she scores. Her capability is only limited by her raw skill, making her highly dependent on performance.`,
    images: {
      icon: {
        url: Characters.getImagePath(CharacterName.REYNA, "icon"),
      },
      full: {
        url: Characters.getImagePath(CharacterName.REYNA, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 50,
      },
    },
  },
  {
    name: CharacterName.KILLJOY,
    roleType: CharacterRole.SENTINEL,
    id: 7,
    backgroundColor: "#ffee32",
    description: `The genius of Germany. Killjoy secures the battlefield with ease using her arsenal of inventions. If the damage from her gear doesn't stop her enemies, her robots' debuff will help make short work of them.`,
    images: {
      icon: {
        url: Characters.getImagePath(CharacterName.KILLJOY, "icon"),
      },
      full: {
        url: Characters.getImagePath(CharacterName.KILLJOY, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
  {
    name: CharacterName.BREACH,
    roleType: CharacterRole.INITIATOR,
    backgroundColor: "#e15720",
    id: 8,
    description: `Breach, the bionic Swede, fires powerful, targeted kinetic blasts to aggressively clear a path through enemy ground. The damage and disruption he inflicts ensures no fight is ever fair.`,
    images: {
      icon: {
        url: Characters.getImagePath(CharacterName.BREACH, "icon"),
      },
      full: {
        url: Characters.getImagePath(CharacterName.BREACH, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
  {
    name: CharacterName.OMEN,
    roleType: CharacterRole.CONTROLLER,
    id: 9,
    backgroundColor: "#7c7eb8",
    description: `A phantom of a memory, Omen hunts in the shadows. He renders enemies blind, teleports across the field, then lets paranoia take hold as his foe scrambles to learn where he might strike next.`,
    images: {
      icon: {
        url: Characters.getImagePath(CharacterName.OMEN, "icon"),
      },
      full: {
        url: Characters.getImagePath(CharacterName.OMEN, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
  {
    name: CharacterName.JETT,
    roleType: CharacterRole.DUELIST,
    id: 10,
    backgroundColor: "#c2d1ea",
    description: `Representing her home country of South Korea, Jett's agile and evasive fighting style lets her take risks no one else can. She runs circles around every skirmish, cutting enemies before they even know what hit them.`,
    images: {
      icon: {
        url: Characters.getImagePath(CharacterName.JETT, "icon"),
      },
      full: {
        url: Characters.getImagePath(CharacterName.JETT, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
  {
    name: CharacterName.RAZE,
    roleType: CharacterRole.DUELIST,
    id: 11,
    backgroundColor: "#fedf72",
    description:
      "Raze explodes out of Brazil with her big personality and big guns. With her blunt-force-trauma playstyle, she excels at flushing entrenched enemies and clearing tight spaces with a generous dose of “boom.”",
    images: {
      icon: {
        url: Characters.getImagePath(CharacterName.RAZE, "icon"),
      },
      full: {
        url: Characters.getImagePath(CharacterName.RAZE, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 25,
      },
    },
  },
  {
    name: CharacterName.SKYE,
    roleType: CharacterRole.INITIATOR,
    backgroundColor: "70883c",
    id: 12,
    description:
      "Hailing from Australia, Skye and her band of beasts trail-blaze the way through hostile territory. With her creations hampering the enemy, and her power to heal others, the team is strongest and safest by Skye’s side.",
    images: {
      icon: {
        url: Characters.getImagePath(CharacterName.SKYE, "icon"),
      },
      full: {
        url: Characters.getImagePath(CharacterName.SKYE, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
  {
    name: CharacterName.YORU,
    roleType: CharacterRole.DUELIST,
    backgroundColor: "#4986fe",
    id: 13,
    description:
      "Japanese native, Yoru, rips holes straight through reality to infiltrate enemy lines unseen. Using deception and aggression in equal measure, he gets the drop on each target before they know where to look.",
    images: {
      icon: {
        url: Characters.getImagePath(CharacterName.YORU, "icon"),
      },
      full: {
        url: Characters.getImagePath(CharacterName.YORU, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
  {
    name: CharacterName.ASTRA,
    roleType: CharacterRole.CONTROLLER,
    backgroundColor: "#9844c2",
    id: 14,
    description:
      "Ghanaian Agent Astra harnesses the energies of the cosmos to reshape battlefields to her whim. With full command of her astral form and a talent for deep strategic foresight, she's always eons ahead of her enemy's next move.",
    images: {
      icon: {
        url: Characters.getImagePath(CharacterName.ASTRA, "icon"),
      },
      full: {
        url: Characters.getImagePath(CharacterName.ASTRA, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 25,
      },
    },
  },
  {
    name: CharacterName.KAYO,
    roleType: CharacterRole.INITIATOR,
    backgroundColor: "#9770f3",
    id: 15,
    description: `KAY/O is a machine of war built for a single purpose: neutralizing radiants. His power to suppress enemy abilities cripples his opponents' capacity to fight back, securing him and his allies the ultimate edge.`,
    images: {
      icon: {
        url: Characters.getImagePath(CharacterName.KAYO, "icon"),
      },
      full: {
        url: Characters.getImagePath(CharacterName.KAYO, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
  {
    name: CharacterName.CHAMBER,
    roleType: CharacterRole.SENTINEL,
    id: 16,
    backgroundColor: "#b89a67",
    description:
      "Well dressed and well armed, French weapons designer Chamber expels aggressors with deadly precision. He leverages his custom arsenal to hold the line and pick off enemies from afar, with a contingency built for every plan.",
    images: {
      icon: {
        url: Characters.getImagePath(CharacterName.CHAMBER, "icon"),
      },
      full: {
        url: Characters.getImagePath(CharacterName.CHAMBER, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
  {
    name: CharacterName.NEON,
    roleType: CharacterRole.DUELIST,
    backgroundColor: "#679aff",
    id: 17,
    description:
      "Filipino Agent Neon surges forward at shocking speeds, discharging bursts of bioelectric radiance as fast as her body generates it. She races ahead to catch enemies off guard, then strikes them down quicker than lightning.",
    images: {
      icon: {
        url: Characters.getImagePath(CharacterName.NEON, "icon"),
      },
      full: {
        url: Characters.getImagePath(CharacterName.NEON, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 25,
      },
    },
  },
  {
    name: CharacterName.FADE,
    roleType: CharacterRole.INITIATOR,
    id: 18,
    backgroundColor: "#325b73",
    description:
      "Turkish bounty hunter, Fade, unleashes the power of raw nightmares to seize enemy secrets. Attuned with terror itself, she hunts targets and reveals their deepest fears—before crushing them in the dark.",
    images: {
      icon: {
        url: Characters.getImagePath(CharacterName.FADE, "icon"),
      },
      full: {
        url: Characters.getImagePath(CharacterName.FADE, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
  {
    name: CharacterName.HARBOR,
    roleType: CharacterRole.CONTROLLER,
    id: 19,
    backgroundColor: "#535452",
    description:
      "Hailing from India’s coast, Harbor storms the field wielding ancient technology with dominion over water. He unleashes frothing rapids and crushing waves to shield his allies and pummel those that oppose him.",
    images: {
      icon: {
        url: Characters.getImagePath(CharacterName.HARBOR, "icon"),
      },
      full: {
        url: Characters.getImagePath(CharacterName.HARBOR, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
  {
    name: CharacterName.GEKKO,
    roleType: CharacterRole.INITIATOR,
    id: 20,
    backgroundColor: "#b4d349",
    description:
      "Gekko the Angeleno leads a tight-knit crew of calamitous creatures. His buddies bound forward, scattering enemies out of the way, with Gekko chasing them down to regroup and go again.",
    images: {
      icon: {
        url: Characters.getImagePath(CharacterName.GEKKO, "icon"),
      },
      full: {
        url: Characters.getImagePath(CharacterName.GEKKO, "full"),
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
    },
  },
];
charactersinfo.forEach((character) => {
  Characters.allCharacters.set(
    character.id,
    new Character(
      character.name,
      character.roleType,
      character.id,
      character.description,
      character.images.icon,
      character.images.full,
      character.backgroundColor
    )
  );
});
