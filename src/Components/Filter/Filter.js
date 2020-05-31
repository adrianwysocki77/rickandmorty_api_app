import React from "react";

class Filter extends React.Component {
  filterHandler(e) {
    this.props.filterHandler(e.target.value);
    // this.props.filter();
  }
  render() {
    return (
      <>
        {this.props.species && (
          <>
            <br />
            <select id="species" onChange={e => this.filterHandler(e)}>
              <option value="All">All</option>
              <option value="Human">Human</option>
              <option value="Humanoid">Humanoid</option>
              <option value="Alien">Alien</option>
              <option value="Disease">Disease</option>
              <option value="Robot">Robot</option>
              <option value="Parasite">Parasite</option>
            </select>
            Species
          </>
        )}
        {this.props.status && (
          <>
            <br />
            <select id="species" onChange={e => this.filterHandler(e)}>
              <option value="All">All</option>
              <option value="Alive">Alive</option>
              <option value="Dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
            Status
          </>
        )}
      </>
    );
  }
}

export default Filter;
