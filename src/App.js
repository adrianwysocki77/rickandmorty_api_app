import React, { Component } from "react";
import Pagination from "react-js-pagination";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Characters from "./Containers/Characters/Characters";
import Filter from "./Components/Filter/Filter";

class App extends Component {
  state = {
    filter: ["All", "All"],
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
    this.setState({ noResults: false, totalCharacters: 0 });
    if (activePage === undefined) {
      activePage = this.state.activePage;
    }
    let page = queryParameter ? queryParameter : this.state.activePage;
    let queryUrl = "";
    let renderedCharacters;
    let url;
    let request = [];

    if (this.state.dateFilterActive) {
      console.log("this.state.dateFilterActive!!");
      if (this.state.filter[0] === "All" && this.state.filter[1] === "All") {
        url = `https://rickandmortyapi.com/api/character/?page=`;
        request.push(
          fetch(`https://rickandmortyapi.com/api/character/`)
            .then(response => response.json())
            .then(data => {
              return data.info.pages;
            })
        );
      } else if (
        this.state.filter[0] !== "All" &&
        this.state.filter[1] !== "All"
      ) {
        url = `https://rickandmortyapi.com/api/character/?species=${
          this.state.filter[0]
        }&&status=${this.state.filter[1]}&&page=`;

        request.push(
          fetch(
            `https://rickandmortyapi.com/api/character/?species=${
              this.state.filter[0]
            }&&status=${this.state.filter[1]}`
          )
            .then(response => response.json())
            .then(data => {
              // if (data.info.pages) {
              return data.info.pages;
              // } else {
              //   return false;
              // }
            })
            .catch(err => this.setState({ ...this.state, noResults: true }))
        );
      } else if (
        this.state.filter[0] !== "All" ||
        this.state.filter[1] !== "All"
      ) {
        if (this.state.filter[0] !== "All") {
          url = `https://rickandmortyapi.com/api/character/?species=${
            this.state.filter[0]
          }&&page=`;

          request.push(
            fetch(
              `https://rickandmortyapi.com/api/character/?species=${
                this.state.filter[0]
              }`
            )
              .then(response => response.json())
              .then(data => {
                // if (data.info.pages) {
                return data.info.pages;
                // } else {
                //   return false;
                // }
              })
              .catch(err => this.setState({ ...this.state, noResults: true }))
          );
        } else if (this.state.filter[1] !== "All") {
          url = `https://rickandmortyapi.com/api/character/?status=${
            this.state.filter[1]
          }&&page=`;

          request.push(
            fetch(
              `https://rickandmortyapi.com/api/character/?status=${
                this.state.filter[1]
              }`
            )
              .then(response => response.json())
              .then(data => {
                // if (data.info.pages) {
                return data.info.pages;
                // } else {
                //   return false;
                // }
              })
              .catch(err => this.setState({ ...this.state, noResults: true }))
          );
        }
      }
      Promise.all(request).then(pages => {
        if (pages[0]) {
          this.setState({ ...this.state, pages: pages[0] });
          if (this.state.date[0] && this.state.date[1]) {
            this.fetchCharactersWithDateFilter(url, true, true);
          } else if (this.state.date[0]) {
            this.fetchCharactersWithDateFilter(url, true, false);
          } else if (this.state.date[1]) {
            this.fetchCharactersWithDateFilter(url, false, true);
          }
        } else {
          this.setState({ ...this.state, dateFilterActive: true });
        }
      });
      /////////////////////////////////////////////////////////////////////////
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
      (this.state.filter[0] !== "All" || this.state.filter[1] !== "All") &&
      !this.state.dateFilterActive
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
      this.state.filter[1] === "All" &&
      !this.state.dateFilterActive
    ) {
      console.log("last else if in fetchCharacters");
      fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.fetchThen(data, activePage, renderedCharacters);
        });
    }
  };

  fetchThen(data, activePage, renderedCharacters) {
    // console.log(data);
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

      // let dateFilterLimit = [...this.state.dateFilterLimit];
      // dateFilterLimit[0] = data;

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

    console.log("this.state.dateFilterActive:", this.state.dateFilterActive);

    if (this.state.dateFilterActive) {
      console.log("date filter active");

      let sliceRange = (pageNumber - 1) * 10;
      console.log("sliceRange:", sliceRange);
      console.log("pageNumber:", pageNumber);
      console.log("renderedCharacters", this.state.renderedCharacters);
      this.setState({
        ...this.state,
        renderedCharacters: this.state.characters.slice(
          sliceRange,
          pageNumber * 10
        ),
        activePage: pageNumber
      });
    } else {
      this.fetchCharacters(queryParameter.toFixed(0), pageNumber);
    }
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

    this.setState({
      ...this.state,
      dateFilterLimit: dateFilterLimit,
      dateFilterActive: true
    });
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

    this.setState({
      ...this.state,
      dateFilterLimit: dateFilterLimit,
      dateFilterActive: true
    });
  }

  fetchCharactersWithDateFilter = (url, startDate, endDate) => {
    console.log("fetch with date filter!!!");
    console.log("this.state.pages:", this.state.pages);
    const requests = [];
    for (let i = 1; i < this.state.pages + 1; i++) {
      requests.push(
        fetch(url + i)
          .then(data => data.json())
          .then(data => {
            // console.log("data", data);
            return data.results;
          })
      );
    }

    Promise.all(requests)
      .then(arrayWithData => {
        // console.log("arrayWithData:", arrayWithData);
        // console.log("fetch with date filter 1 promise all!!!");
        let characters = arrayWithData.reduce(function(arrayOne, arrayTwo) {
          return arrayOne.concat(arrayTwo);
        }, []);

        let filteredCharacters = [];

        if (startDate && endDate) {
          for (let i = 0; i < characters.length; i++) {
            let createdDate = new Date(characters[i].created);
            let startFilterDate = new Date(this.state.date[0]);
            let endFilterDate = new Date(this.state.date[1]);
            if (
              createdDate >= startFilterDate &&
              createdDate <= endFilterDate
            ) {
              filteredCharacters.push(characters[i]);
            }
          }

          // console.log("filteredCharacters: ", filteredCharacters);
        } else if (startDate && !endDate) {
          for (let i = 0; i < characters.length; i++) {
            let createdDate = new Date(characters[i].created);
            let startFilterDate = new Date(this.state.date[0]);
            if (createdDate >= startFilterDate) {
              filteredCharacters.push(characters[i]);
            }
          }
        } else if (!startDate && endDate) {
          for (let i = 0; i < characters.length; i++) {
            let createdDate = new Date(characters[i].created);
            let endFilterDate = new Date(this.state.date[1]);
            if (createdDate <= endFilterDate) {
              filteredCharacters.push(characters[i]);
            }
          }
        }

        Promise.all(filteredCharacters).then(filteredCharacters => {
          if (filteredCharacters.length === 0) {
            console.log(
              "filteredCharacters.length: ",
              filteredCharacters.length
            );
            this.setState({
              noResults: true
            });
          } else {
            console.log("filteredCharacters.length", filteredCharacters.length);
            this.setState({
              characters: filteredCharacters,
              totalCharacters: filteredCharacters.length,
              renderedCharacters: filteredCharacters.slice(0, 10)
            });
          }
        });
      })
      .catch(err => console.log(err));
  };

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
          <>
            <br />
            No Results
          </>
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
