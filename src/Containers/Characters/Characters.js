import React, { Component } from "react";
import Character from "../../Components/Character/Character";
import ShowCharacter from "../../Components/ShowCharacter/ShowCharacter";

import classes from "./Characters.module.css";

class Characters extends Component {
  state = {
    character: null,
    episodes: []
  };

  characterHandler = character => {
    let episodes = [];
    for (let i = 0; i < character.episode.length; i++) {
      let startIndex;
      startIndex = character.episode[i].indexOf("episode/") + 8;
      episodes.push(character.episode[i].slice(startIndex));
    }

    character.episodes = episodes.toString();
    this.setState({ character: character });
  };

  close = () => {
    this.setState({ character: null });
  };

  render() {
    // console.log(this.state.character);
    return (
      <>
        <div className={classes.CharactersWrapper}>
          {this.props.characters &&
            this.props.characters.map(character => {
              return (
                <div
                  onClick={() => this.characterHandler(character)}
                  key={character.id}
                >
                  <Character character={character} />
                </div>
              );
            })}

          {this.state.character && (
            <>
              <ShowCharacter
                character={this.state.character}
                close={this.close}
              />
            </>
          )}
        </div>
      </>
    );
  }
}

export default Characters;
