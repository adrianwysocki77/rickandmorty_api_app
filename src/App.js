import React, { Component } from "react";
import Pagination from "react-js-pagination";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Characters from "./Containers/Characters/Characters";
import Filter from "./Components/Filter/Filter";

import Logo from "./logo.svg";

class App extends Component {
  state = {
    filter: ["All", "All"],
    totalCharacters: 0,
    pages: null,
    activePage: 1,
    characters: [],
    renderedCharacters: [],
    date: [null, null],
    dateFilterLimit: [null, null],
    dateFilterActive: false,
    noResults: false,
    showCharacter: false
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
              return data.info.pages;
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
                return data.info.pages;
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
                return data.info.pages;
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
      fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
        .then(response => response.json())
        .then(data => {
          this.fetchThen(data, activePage, renderedCharacters);
        });
    }
  };

  fetchThen(data, activePage, renderedCharacters) {
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

  fetchCharactersWithDateFilter = (url, startDate, endDate) => {
    const requests = [];
    for (let i = 1; i < this.state.pages + 1; i++) {
      requests.push(
        fetch(url + i)
          .then(data => data.json())
          .then(data => {
            return data.results;
          })
      );
    }

    Promise.all(requests)
      .then(arrayWithData => {
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
            this.setState({
              noResults: true
            });
          } else {
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

  startDateHandler(e) {
    const date = this.state.date;
    date[0] = e;
    this.setState({ ...this.state, date: date });

    const dateLimit = new Date(this.state.date[0]);
    dateLimit.setDate(dateLimit.getDate() + 1);

    const dateFilterLimit = [...this.state.dateFilterLimit];
    dateFilterLimit[0] = dateLimit;

    this.setState({
      ...this.state,
      dateFilterLimit: dateFilterLimit,
      dateFilterActive: true
    });
  }

  endDateHandler(e) {
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

  handlePageChange(pageNumber) {
    let queryParameter =
      (pageNumber / 2 === 0 ? pageNumber - 1 : pageNumber) / 2;

    if (this.state.dateFilterActive) {
      let sliceRange = (pageNumber - 1) * 10;
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

  choosenCharacter(character) {
    console.log("character in choosen!!!: ", character);

    // this.setState({
    //   ...this.state,
    //   choosenCharacter: character
    // });
  }

  render() {
    return (
      <div className="App">
        <img src={Logo} className="Logo" alt="logo_rick_and_morty" />

        <div className="SelectFilterContainer">
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
        </div>

        <div className="SelectFilterContainer">
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
        </div>

        <div className="Container">
          <div className="Search" onClick={this.fetchCharacters}>
            Search
          </div>
        </div>

        {!this.state.noResults ? (
          <div className="CharactersContiner">
            <Characters
              characters={this.state.renderedCharacters}
              choosenCharacter={this.choosenCharacter}
            />
          </div>
        ) : (
          <>
            <div className="NoResults">No Results</div>
          </>
        )}

        <div className="PaginationContainer">
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={this.state.totalCharacters}
            pageRangeDisplayed={4}
            itemClass={"page-item"}
            linkClass={"page-link"}
            onChange={this.handlePageChange.bind(this)}
            hideDisabled={true}
          />
        </div>
      </div>
    );
  }
}

export default App;
