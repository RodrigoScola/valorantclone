import express from "express";
import path from "path";
import { CharacterSelect, currentPlayer } from "../types";
import { Characters, RoleHandler } from "./data";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// design file
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// routers
app.get("/", (req, res) => {
  const characters: CharacterSelect[] = [];

  Characters.allCharacters.forEach((char) =>
    characters.push(
      new CharacterSelect(char.info, currentPlayer.hasCharacter(char.info.id))
    )
  );

  res.render("index", {
    characters: characters,
    team: currentPlayer.army,
  });
});
app.get("/add", (req, res) => {
  if (
    currentPlayer.canSelectCharacter() &&
    currentPlayer.selectedCharacter &&
    !currentPlayer.hasCharacter(currentPlayer.selectedCharacter.id)
  ) {
    currentPlayer.army.push(currentPlayer.selectedCharacter);
    currentPlayer.selectedCharacter = undefined;
  }

  console.log(currentPlayer.army);
  res.render("partials/team", {
    team: currentPlayer.army,
  });
});
app.get("/reset", (req, res) => {
  currentPlayer.army = [];
  currentPlayer.selectedCharacter = undefined;
  res.render("partials/team", {
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
