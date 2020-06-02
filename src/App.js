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
    pages: null,
    activePage: 1,
    characters: [],
    charactersDate: [],
    renderedCharacters: [],
    date: [null, null],
    dateFilterLimit: [null, null],
    dateFilterActive: false,
    noResults: false
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
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //New Conditions

    if (
      this.state.filter[0] === "All" &&
      this.state.filter[1] === "All" &&
      (this.state.date[0] || this.state.date[1])
    ) {
      console.log(
        `(this.state.filter[0] === "All" && this.state.filter[1] === "All") && (this.state.date[0] || this.state.date[1])`
      );
      //Taking all characters from API
    } else if (
      (this.state.filter[0] !== "All" || this.state.filter[1] !== "All") &&
      (this.state.date[0] || this.state.date[1])
    ) {
      console.log(
        `(this.state.filter[0] === "All" || this.state.filter[1] === "All") && (this.state.date[0] || this.state.date[1])`
      );

      if (this.state.filter[0] !== "All") {
        console.log("this.state.filter[0] !== 'All'", this.state.filter[0]);
      } else {
        console.log("this.state.filter[0] !== 'All'", this.state.filter[1]);
      }
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
    } else if (
      this.state.filter[0] !== "All" ||
      this.state.filter[1] !== "All"
    ) {
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
    } else if (
      this.state.filter[0] === "All" &&
      this.state.filter[1] === "All"
    ) {
      fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
        // fetch(
        //   `https://rickandmortyapi.com/api/character/?created=2017-12-04T18:50:21.651Z&&page=${page}`
        // )
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.fetchThen(data, activePage, renderedCharacters);
        });
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // if (this.state.filter[0] === "All" && this.state.filter[1] === "All") {
    //   fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
    //     // fetch(
    //     //   `https://rickandmortyapi.com/api/character/?created=2017-12-04T18:50:21.651Z&&page=${page}`
    //     // )
    //     .then(response => response.json())
    //     .then(data => {
    //       console.log(data);
    //       this.fetchThen(data, activePage, renderedCharacters);
    //     });
    // }
    // else if (
    //   this.state.filter[0] !== "All" &&
    //   this.state.filter[1] !== "All"
    // ) {
    //   fetch(
    //     `https://rickandmortyapi.com/api/character/?species=${
    //       this.state.filter[0]
    //     }&&status=${this.state.filter[1]}&&page=${page}`
    //   )
    //     .then(response => response.json())
    //     .then(data => {
    //       this.fetchThen(data, activePage, renderedCharacters);
    //     });
    // }
    // ////////////////////////////////////////////////////////////////////////////////////////////////
    // else if (this.state.filter[0] !== "All" || this.state.filter[1] !== "All") {
    //   if (this.state.filter[0] !== "All") {
    //     queryUrl = `?species=${this.state.filter[0]}&&page=${page}`;
    //     fetch(`https://rickandmortyapi.com/api/character/${queryUrl}`)
    //       .then(response => response.json())
    //       .then(data => {
    //         this.fetchThen(data, activePage, renderedCharacters);
    //       });
    //   } else {
    //     queryUrl = `?status=${this.state.filter[1]}&&page=${page}`;
    //     fetch(`https://rickandmortyapi.com/api/character/${queryUrl}`)
    //       .then(response => response.json())
    //       .then(data => {
    //         this.fetchThen(data, activePage, renderedCharacters);
    //       });
    //   }
    //   ///////////////////////////////////////////////////////////////////////////////////////////////
    // }
    //
    // if (this.state.date[0]) {
    //   console.log("Date in fetchCharacters!!!");
    //
    //   // let emptyArr = [];
    //   let characters = [];
    //   let newCharacters = [];
    //
    //   async function asyncCall(characters, i) {
    //     const fetchResult = await fetch(
    //       `https://rickandmortyapi.com/api/character/?page=${page}`
    //     )
    //       .then(data => data.json())
    //       .then(async data => {
    //         await characters.push(data.results);
    //         await characters.concat(data.results);
    //         if (i === data.info.count - 1) {
    //           await this.setState({
    //             ...this.state,
    //             charactersDate: characters
    //           });
    //         }
    //       });
    //   }
    //
    //   for (let i = 0; i < this.state.pages; i++) {
    //     asyncCall(characters, i);
    //   }
    // }
  };

  fetchThen(data, activePage, renderedCharacters) {
    console.log(data);
    if (data.error) {
      this.setState({
        ...this.state,
        totalCharacters: 0,
        pages: null,
        activePage: 1,
        renderedCharacters: [],
        noResults: true
      });
    } else {
      if (activePage % 2 === 0) {
        renderedCharacters = data.results.slice(10, 20);
      } else {
        renderedCharacters = data.results.slice(0, 10);
      }

      let dateFilterLimit = [...this.state.dateFilterLimit];
      dateFilterLimit[0] = data;

      this.setState({
        ...this.state,
        totalCharacters: data.info.count,
        pages: data.info.pages,
        renderedCharacters: renderedCharacters,
        characters: data.results,
        activePage: activePage,
        noResults: false
      });
    }
  }

  handlePageChange(pageNumber) {
    let queryParameter =
      (pageNumber / 2 === 0 ? pageNumber - 1 : pageNumber) / 2;

    // console.log("pageNumber:", pageNumber);
    // console.log("queryParameter:", queryParameter.toFixed(0));

    this.fetchCharacters(queryParameter.toFixed(0), pageNumber);
  }

  startDateHandler(e) {
    // console.log("startDateHandler handler START");
    const date = this.state.date;
    date[0] = e;
    this.setState({ ...this.state, date: date });

    //    console.log("date[0]: ", date[0]);

    const dateLimit = new Date(this.state.date[0]);
    dateLimit.setDate(dateLimit.getDate() + 1);

    //    console.log("dateLimit:", dateLimit);

    const dateFilterLimit = [...this.state.dateFilterLimit];
    dateFilterLimit[0] = dateLimit;

    //    console.log("dateFilterLimit[0]", dateFilterLimit[0]);

    this.setState({ ...this.state, dateFilterLimit: dateFilterLimit });
  }

  endDateHandler(e) {
    // console.log("endDateHandler handler END");
    const date = this.state.date;
    date[1] = e;
    this.setState({ ...this.state, date: date });

    const dateLimit = new Date(this.state.date[1]);
    dateLimit.setDate(dateLimit.getDate() - 1);

    const dateFilterLimit = [...this.state.dateFilterLimit];
    dateFilterLimit[1] = dateLimit;

    this.setState({ ...this.state, dateFilterLimit: dateFilterLimit });
  }

  render() {
    console.log(this.state);
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

        <Filter
          date={"Start Date"}
          selected={this.state.date[0]}
          dateHandler={date => this.startDateHandler(date)}
          dateLimit={this.state.dateFilterLimit[1]}
        />
        <Filter
          date={"End Date"}
          selected={this.state.date[1]}
          dateHandler={date => this.endDateHandler(date)}
          dateLimit={this.state.dateFilterLimit[0]}
        />

        <br />
        <button onClick={this.fetchCharacters}>Search</button>

        {!this.state.noResults ? (
          <>
            <Characters characters={this.state.renderedCharacters} />
          </>
        ) : (
          <>No Results</>
        )}

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
      </div>
    );
  }
}

export default App;
