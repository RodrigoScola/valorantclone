import express from "express";
import path from "path";
import { currentPlayer } from "../types";
import { Characters, CharactersSelectList, RoleHandler } from "./data";
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

// routers
app.get("/", (req, res) => {
  console.log(characterSelectList);
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
  res.render("index", {
    team: currentPlayer.army,
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

// server listening
app.listen(PORT, () => {
  console.log(`The app start on http://localhost:${PORT}`);
});
