import express from "express";
import fs from "fs";
import path from "path";
import { InGamePlayer, currentPlayer } from "../types";
import { Character, PlayableCharacter } from "./Character";
import { gameState } from "./GameState";
import { HabilityFactory } from "./Habilities";
import {
  Characters,
  CharactersSelectList,
  RoleHandler,
  charactersinfo,
} from "./data";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// design file
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const characterSelectList = new CharactersSelectList(
  Array.from(Characters.allCharacters.values())
);

currentPlayer.army = [];

export const currentPlayingPlayer = new InGamePlayer([], -1);

// routers
app.get("/", (_, res) => {
  res.render("index", {
    characters: characterSelectList.allCharacters,
    team: currentPlayer.army,
    canSelectMore: currentPlayer.canSelectMore(),
  });
});
app.get("/add", (_, res) => {
  if (
    currentPlayer.canSelectMore() &&
    currentPlayer.selectedCharacter &&
    !currentPlayer.hasCharacter(currentPlayer.selectedCharacter.id)
  ) {
    currentPlayer.army.push(currentPlayer.selectedCharacter);
    characterSelectList.setUnavailable(currentPlayer.selectedCharacter.id);
    currentPlayer.selectedCharacter = null;
  }

  res.render("partials/team", {
    team: currentPlayer.army,
  });
});
app.get("/reset", (_, res) => {
  currentPlayer.army = [];
  currentPlayer.selectedCharacter = null;
  characterSelectList.reset();
  res.render("index", {
    team: currentPlayer.army,
    characters: characterSelectList.allCharacters,
  });
});
app.get("/select/:characterId", (req, res) => {
  console.log(req.params);
  const character: Character = Characters.getCharacter(
    parseInt(req.params.characterId)
  );

  currentPlayer.selectedCharacter = character;
  res.render("partials/selectedCharacter", {
    character: character.info,
    role: RoleHandler.getRole(character.info.roleType),
  });
});

app.get("/map", (_, res) => {
  gameState.reset();
  res.render("map", {
    tiles: gameState.map.tiles,
  });
});

app.get("/move/:x/:y", (req, res) => {
  console.log("ARMY:\n\n");
  if (currentPlayingPlayer.selectedCharacter) {
    currentPlayingPlayer.selectedCharacter.move(
      {
        x: parseInt(req.params.x),
        y: parseInt(req.params.y),
      },
      gameState.map.tiles
    );
  }

  console.log(
    gameState.map.tiles[parseInt(req.params.y)][parseInt(req.params.x)]
  );

  res.render("partials/map_component", {
    tiles: gameState.map.tiles,
  });
});
app.get("/select-character/:characterId", (req, res) => {
  console.log("HH");
  const character = currentPlayingPlayer.army.find(
    (x) => x.info.id == parseInt(req.params.characterId)
  ) as PlayableCharacter;

  currentPlayingPlayer.selectedCharacter = character;

  res.render("partials/habilities_tab", {
    habilities: character.info.habilities,
  });
});
app.get("/select-ability/:abilityId", (req, res) => {
  console.log("HHaAAAA");
  const ability = HabilityFactory.getHability(parseInt(req.params.abilityId));
  if (currentPlayingPlayer) {
    currentPlayingPlayer.selectedCharacter?.selectAbility(ability);
  }
  console.log("select");
  res.render("map", {
    tiles: gameState.map.tiles,
  });
});

app.get("/colors", (_, res) => {
  const colors = charactersinfo.map(
    (x) => `.bg-${x.name} {
    background-color: ${x.backgroundColor}
  }`
  );
  let file = "";

  colors.forEach((x) => {
    file += `${x}\n`;
  });

  fs.writeFileSync(__dirname + "/data/colors.txt", file);

  res.send();
});

// server listening
app.listen(PORT, () => {
  console.log(`The app start on http://localhost:${PORT}`);
});
