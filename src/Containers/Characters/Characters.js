import React from "react";
import Character from "../../Components/Character/Character";
const characters = props => (
  <>
    {props.characters &&
      props.characters.map(character => {
        return <Character key={character.id} character={character} />;
      })}
  </>
);

export default characters;
