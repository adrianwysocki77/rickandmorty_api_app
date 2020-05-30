import React from "react";
import classes from "./Character.module.css";

const character = props => (
  <>
    <table>
      <tbody>
        <tr>
          <td>
            <img
              className={classes.Img}
              alt="character"
              src={props.character.image}
            />
          </td>
          <td>{props.character.name}</td>
          <td style={{ color: "green", fontWeight: "bold" }}>
            {props.character.species}
          </td>
          <td>{props.character.status}</td>
          <td>{props.character.id}</td>
          <td>{props.character.created.slice(0, 10)}</td>
          <td style={{ color: "red" }}>id: {props.character.id}</td>
        </tr>
      </tbody>
    </table>
  </>
);

export default character;
