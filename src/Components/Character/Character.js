import React from "react";
import classes from "./Character.module.css";

const character = props => (
  <div className={classes.Character}>
    <div className={classes.ImageContainer}>
        <img
          className={classes.Img}
          alt="character"
          src={props.character.image}
        />
    </div>
    <div className={classes.CharacterName}>
        {props.character.name}
    </div>
  </div>
);

export default character;


{/*<table>
  <tbody>
    <tr>
      <td>
        <img
          className={classes.Img}
          alt="character"
          src={props.character.image}
        />
      </td>
      <td></td>
      <td style={{ color: "green", fontWeight: "bold" }}>
        {props.character.species}
      </td>
      <td>{props.character.status}</td>
      <td>{props.character.created.slice(0, 10)}</td>
      <td style={{ color: "red" }}>id: {props.character.id}</td>
    </tr>
  </tbody>
</table>
</>*/}
