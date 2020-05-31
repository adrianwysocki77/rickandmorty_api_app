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
    renderedCharacters: [],
    date: []
  };

  componentDidMount() {
    this.fetchCharacters(this.activePage);
  }

  fetchCharacters = (queryParameter, activePage) => {
    if (activePage === undefined) {
      activePage = this.state.activePage;
    }
    let page = queryParameter ? queryParameter : this.state.activePage;
    let queryUrl = "";
    let renderedCharacters;

    if (this.state.filter[0] === "All" && this.state.filter[1] === "All") {
      fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
        .then(response => response.json())
        .then(data => {
          this.fetchThen(data, activePage, renderedCharacters);
        });
    } else if (
      this.state.filter[0] !== "All" &&
      this.state.filter[1] !== "All"
    ) {
      fetch(
        `https://rickandmortyapi.com/api/character/?species=${
          this.state.filter[0]
        }&&status=${this.state.filter[1]}&&page=${page}`
      )
        .then(response => response.json())
        .then(data => {
          this.fetchThen(data, activePage, renderedCharacters);
        });
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////
    else if (this.state.filter[0] !== "All" || this.state.filter[1] !== "All") {
      if (this.state.filter[0] !== "All") {
        queryUrl = `?species=${this.state.filter[0]}&&page=${page}`;
        fetch(`https://rickandmortyapi.com/api/character/${queryUrl}`)
          .then(response => response.json())
          .then(data => {
            this.fetchThen(data, activePage, renderedCharacters);
          });
      } else {
        queryUrl = `?status=${this.state.filter[1]}&&page=${page}`;
        fetch(`https://rickandmortyapi.com/api/character/${queryUrl}`)
          .then(response => response.json())
          .then(data => {
            this.fetchThen(data, activePage, renderedCharacters);
          });
      }
      ///////////////////////////////////////////////////////////////////////////////////////////////
    }
  };

  fetchThen(data, activePage, renderedCharacters) {
    if (activePage % 2 === 0) {
      renderedCharacters = data.results.slice(10, 20);
    } else {
      renderedCharacters = data.results.slice(0, 10);
    }

    this.setState({
      ...this.state,
      totalCharacters: data.info.count,
      renderedCharacters: renderedCharacters,
      characters: data.results,
      activePage: activePage
    });
  }

  handlePageChange(pageNumber) {
    let queryParameter =
      (pageNumber / 2 === 0 ? pageNumber - 1 : pageNumber) / 2;

    console.log("pageNumber:", pageNumber);
    console.log("queryParameter:", queryParameter.toFixed(0));

    this.fetchCharacters(queryParameter.toFixed(0), pageNumber);
  }

  render() {
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
        />
        <br />
        <button onClick={this.fetchCharacters}>Search</button>

        <Characters characters={this.state.renderedCharacters} />
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={this.state.totalCharacters}
          pageRangeDisplayed={30}
          itemClass={"page-item"}
          linkClass={"page-link"}
          onChange={this.handlePageChange.bind(this)}
          hideDisabled={true}
        />
        {this.state.filter && <>{this.state.filter}</>}
      </div>
    );
  }
}

export default App;
