import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
        {this.props.date && (
          <>
            <br />
            {this.props.date === "Start Date" && (
              <>
                {this.props.date}
                <DatePicker
                  selected={this.props.selected}
                  onChange={e => this.props.dateHandler(e)}
                  dateFormat="dd/MM/yy"
                  maxDate={
                    this.props.dateLimit
                      ? new Date(this.props.dateLimit)
                      : false
                  }
                />
              </>
            )}
            {this.props.date === "End Date" && (
              <>
                {this.props.date}
                <DatePicker
                  selected={this.props.selected}
                  onChange={e => this.props.dateHandler(e)}
                  dateFormat="dd/MM/yy"
                  minDate={new Date(this.props.dateLimit)}
                />
              </>
            )}

            <br />
          </>
        )}
      </>
    );
  }
}

export default Filter;
