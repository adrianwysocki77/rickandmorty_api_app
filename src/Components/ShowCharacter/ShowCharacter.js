import React from "react";
import classes from "./ShowCharacter.module.css";

const showCharacter = props => (
  <div className={classes.ShowCharacterContainer}>
    <div className={classes.Character}>
      <div className={classes.closeModal} onClick={props.close}>
        X
      </div>
      <div className={classes.ImageContiner}>
        <img src={props.character.image} alt="show character graphic" />
      </div>
      <div className={classes.CharacterName}>{props.character.name}</div>
      <div className={classes.CharactersStatus}>
        {props.character.status === "Alive" ? (
          <div className={classes.StatusDotGreen}></div>
        ) : (
          <div className={classes.StatusDotRed}></div>
        )}
        {props.character.status} - {props.character.species}
      </div>

      {props.character.type !== "" && (
        <>
          <div className={classes.Description}>Type</div>
          <div className={classes.Information}>{props.character.type}</div>
        </>
      )}

      {props.character.gender !== "" && (
        <>
          <div className={classes.Description}>Gender</div>
          <div className={classes.Information}>{props.character.gender}</div>
        </>
      )}
      {props.character.location.name !== "" && (
        <>
          <div className={classes.Description}>Location</div>
          <div className={classes.Information}>
            {props.character.location.name}
          </div>
        </>
      )}
    </div>
  </div>
);

export default showCharacter;
