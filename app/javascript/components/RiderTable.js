import React, { Component } from "react";
import RiderTableHeader from "./RiderTableHeader";
import RiderRow from "./RiderRow";

class RiderTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sort: {
                column: "id",
                direction: "asc"
            }
        };

        this.sortByColumnAndDirection = this.sortByColumnAndDirection.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }


    sortByColumnAndDirection(objectA, objectB) {
        let isDesc = this.state.sort.direction === "desc" ? -1 : 1;
        let [a, b] = [objectA[this.state.sort.column], objectB[this.state.sort.column]];
        if (a > b) {
            return isDesc;
        }
        if (a < b) {
            return -1 * isDesc;
        }
        return 0;
    }

    sortRiders() {
        let riderArray = this.props.riders.map((rider) => {
            return {
                id: rider.properties.riderId,
                name: rider.properties.full_name,
                origin: rider.properties.city_of_origin
            };
        });
        riderArray = riderArray.sort(this.sortByColumnAndDirection);
        return riderArray;
    }


    handleSort(column, direction) {
        this.setState({
            sort: {
                column: column,
                direction: direction
            }
        });
    }

    render() {
        let rows = [];
        this.sortRiders().forEach(
            (rider) => {

                const nameInFilter = rider.name.indexOf(this.props.filterText) > -1;
                const idInFilter = rider.id.toString().indexOf(this.props.filterText) > -1;
                const cityInFilter = rider.origin.indexOf(this.props.filterText) > -1;


                if ( nameInFilter || idInFilter || cityInFilter ) {
                    rows.push(
                        <RiderRow
                            hasMap={this.props.hasMap}
                            hasLinks={this.props.hasLinks}
                            service={this.props.service}
                            onHighlight={this.props.onHighlight}
                            rider={rider}
                            key={rider.id}
                        />
                    );
                }
            }
        );

        return(
            <div>
                <table className="table table-striped table-bordered mx-auto">
                    <thead className="thead-light">
                    <tr>
                        <RiderTableHeader
                            className="text-right"
                            colSpan="2"
                            label="Id"
                            onSort={this.handleSort}
                            column="id"
                            currentSort={this.state.sort}
                        />
                        <RiderTableHeader
                            className="text-center"
                            colSpan="1"
                            label="Name"
                            onSort={this.handleSort}
                            column="name"
                            currentSort={this.state.sort}
                        />
                        <RiderTableHeader
                            className="text-center"
                            colSpan="1"
                            label="City"
                            onSort={this.handleSort}
                            column="origin"
                            currentSort={this.state.sort}
                        />
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    }
}

export default RiderTable;