import React from "react";
import classes from "./Character.module.css";

const showCharacter = props => (
  <div className={classes.Character}>
    <div className={classes.ImageContainer}>
      <img
        className={classes.Img}
        alt="character"
        src={props.character.image}
      />
    </div>
    <div className={classes.CharacterName}>{props.character.name}</div>
  </div>
);

export default showCharacter;
