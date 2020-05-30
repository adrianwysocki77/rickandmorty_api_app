import React, { Component } from "react";
import Pagination from "react-js-pagination";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Characters from "./Containers/Characters/Characters";
import Filter from "./Components/Filter/Filter";

class App extends Component {
  state = {
    filter: ["All", "All"],
    nextCharacters: "",
    prevCharacters: "",
    totalCharacters: 0,
    pages: 30,
    activePage: 1,
    characters: [],
    renderedCharacters: []
  };

  componentDidMount() {
    this.fetchCharacters(this.activePage);

    // console.log("modulus: ", modulus);
  }

  fetchCharacters = (queryParameter, activePage) => {
    console.log("fetchCharacters!!");

    if (activePage === undefined) {
      activePage = this.state.activePage;
    }
    let page = queryParameter ? queryParameter : this.state.activePage;
    let queryUrl = "";

    if (this.state.filter[0] === "All" && this.state.filter[1] === "All") {
      console.log(
        `this.state.filter[0] === "All" && this.state.filter[1] === "All"`
      );

      fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
        .then(response => response.json())
        .then(data => {
          // console.log(data);

          this.setState({
            ...this.state,
            totalCharacters: data.info.count,
            renderedCharacters: data.results.slice(0, 10),
            characters: data.results,
            activePage: activePage
          });
        });
    } else if (
      this.state.filter[0] !== "All" &&
      this.state.filter[1] !== "All"
    ) {
      console.log(`this.state.filter[0] !== "All" &&
      this.state.filter[1] !== "All"`);
    } else if (
      this.state.filter[0] !== "All" ||
      this.state.filter[1] !== "All"
    ) {
      console.log(`this.state.filter[0] !== "All" ||
        this.state.filter[1] !== "All"`);
      if (this.state.filter[0] !== "All") {
        console.log("first filter changed");
        // fetch(`https://rickandmortyapi.com/api/character/${queryUrl}`)
        //   .then(response => response.json())
        //   .then(data => {
        //     // console.log(data);
        //
        //     this.setState({
        //       ...this.state,
        //       totalCharacters: data.info.count,
        //       renderedCharacters: data.results.slice(0, 10),
        //       characters: data.results,
        //       activePage: activePage
        //     });
        //   });
      } else {
      }
      // queryUrl = `?page=${page}`;
    }
  };

  handlePageChange(pageNumber) {
    console.log("handlePageChange!!");
    let qeryParameter =
      0.5 + (pageNumber / 2 === 0 ? pageNumber - 1 : pageNumber) / 2;
    this.fetchCharacters(qeryParameter, pageNumber);
  }

  render() {
    console.log(this.state.filter);
    return (
      <div className="App">
        <h1>Characters API</h1>
        <Filter
          filterHandler={filter =>
            this.setState({
              ...this.state,
              filter: [filter, this.state.filter[1]],
              activePage: 1
            })
          }
          species
          filter={this.fetchCharacters}
        />
        <Filter
          filterHandler={filter =>
            this.setState({
              ...this.state,
              filter: [this.state.filter[0], filter],
              activePage: 1
            })
          }
          status
          fetchCharacters={this.fetchCharacters}
        />
        <Characters characters={this.state.renderedCharacters} />
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={this.state.totalCharacters - 10}
          pageRangeDisplayed={5}
          itemClass={"page-item"}
          linkClass={"page-link"}
          onChange={this.handlePageChange.bind(this)}
          hideDisabled={true}
        />
      </div>
    );
  }
}

export default App;
