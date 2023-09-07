import express from "express";
import fs from "fs";
import path from "path";
import { InGamePlayer, currentPlayer } from "../types";
import { PlayableCharacter } from "./Character";
import { currentMap } from "./Map";
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

const currentPlayingPlayer = new InGamePlayer([], -1);

// routers
app.get("/", (req, res) => {
  console.log(currentPlayer.army);
  res.render("index", {
    characters: characterSelectList.allCharacters,
    team: currentPlayer.army,
    canSelectMore: currentPlayer.canSelectMore(),
  });
});
app.get("/add", (req, res) => {
  if (
    currentPlayer.canSelectMore() &&
    currentPlayer.selectedCharacter &&
    !currentPlayer.hasCharacter(currentPlayer.selectedCharacter.id)
  ) {
    currentPlayer.army.push(currentPlayer.selectedCharacter);
    characterSelectList.setUnavailable(currentPlayer.selectedCharacter.id);
    currentPlayer.selectedCharacter = undefined;
  }

  res.render("partials/team", {
    team: currentPlayer.army,
  });
});
app.get("/reset", (req, res) => {
  currentPlayer.army = [];
  currentPlayer.selectedCharacter = undefined;
  characterSelectList.reset();
  console.log(characterSelectList.allCharacters);
  res.render("index", {
    team: currentPlayer.army,
    characters: characterSelectList.allCharacters,
  });
});
app.get("/select/:characterId", (req, res) => {
  console.log(req.params);
  const character = Characters.getCharacter(parseInt(req.params.characterId));

  currentPlayer.selectedCharacter = character;

  res.render("partials/selectedCharacter", {
    character: character.info,
    role: RoleHandler.getRole(character.roleType),
  });
});
app.get("/select-character/:characterId", (req, res) => {
  console.log(req.params);
  const character = currentPlayingPlayer.army.find(
    (x) => x.id == parseInt(req.params.characterId)
  );

  currentPlayingPlayer.selectedCharacter = character;

  console.log(character?.habilities);

  res.render("partials/habilities_tab", {
    habilities: character?.habilities,
  });
});

app.get("/map", (req, res) => {
  currentPlayingPlayer.army = [];
  currentPlayer.army.forEach((char, i) => {
    currentPlayingPlayer.army.push(
      new PlayableCharacter(char.info, {
        x: i,
        y: 0,
      })
    );
  });

  currentPlayingPlayer.army.forEach((x) => {
    currentMap.tiles[x.position.x][x.position.y].contents.push(x);
  });
  res.render("map", {
    tiles: currentMap.tiles,
  });
});

app.get("/move/:x/:y", (req, res) => {
  currentPlayingPlayer.selectedCharacter.move(
    {
      x: parseInt(req.params.x),
      y: parseInt(req.params.y),
    },
    currentMap.tiles
  );

  res.render("map", {
    tiles: currentMap.tiles,
  });
});

app.get("/colors", (req, res) => {
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
