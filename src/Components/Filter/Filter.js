import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classes from "./Filter.module.css"


class Filter extends React.Component {
  filterHandler(e) {
    this.props.filterHandler(e.target.value);
    // this.props.filter();
  }
  render() {
    return (
      <>
      <div className={classes.SelectContainer}>
          {this.props.species && (
            <>
              <select className={classes.Select} onChange={e => this.filterHandler(e)}>
                <option value="All">All Species</option>
                <option value="Human">Human</option>
                <option value="Humanoid">Humanoid</option>
                <option value="Alien">Alien</option>
                <option value="Disease">Disease</option>
                <option value="Robot">Robot</option>
                <option value="Parasite">Parasite</option>
              </select>
            </>
          )}
          {this.props.status && (
            <>
              <select className={classes.Select} onChange={e => this.filterHandler(e)}>
                <option value="All">All Statuses</option>
                <option value="Alive">Alive</option>
                <option value="Dead">Dead</option>
                <option value="unknown">Unknown</option>
              </select>
            </>
          )}
      </div>




        {this.props.date && (
          <>
            <br />
            {this.props.date === "Start Date" && (
              <>
                {/*{this.props.date}*/}
                <DatePicker
                  selected={this.props.selected}
                  onChange={e => this.props.dateHandler(e)}
                  dateFormat="dd/MM/yy"
                  maxDate={
                    this.props.dateLimit
                      ? new Date(this.props.dateLimit)
                      : false
                  }
                  placeholderText="Start Date"
                  className={classes.Input}
                />
              </>
            )}
            {this.props.date === "End Date" && (
              <>
                {/*{this.props.date}*/}
                <DatePicker
                  selected={this.props.selected}
                  onChange={e => this.props.dateHandler(e)}
                  dateFormat="dd/MM/yy"
                  minDate={new Date(this.props.dateLimit)}
                  placeholderText="End Date"
                  className={classes.Input}
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
