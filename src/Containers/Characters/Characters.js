import React, { Component } from "react";
import Character from "../../Components/Character/Character";
import ShowCharacter from "../../Components/ShowCharacter/ShowCharacter";

class Characters extends Component {
  state = {
    character: null
  };

  characterHandler = character => {
    console.log("character!!");
    this.setState({ character: character });
  };

  close = () => {
    this.setState({ character: null });
  };

  render() {
    console.log(this.state.character);
    return (
      <>
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
      </>
    );
  }
}

export default Characters;
