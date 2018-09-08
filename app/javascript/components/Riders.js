import React, { Component, Fragment } from "react";
import RiderTable from "./RiderTable";
import Filter from "./Filter";

class Riders extends Component {

    constructor(props) {
        super(props)

        this.state = {
            filterText: "",
            riders: props.riders
        };
        this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter(filterInput) {
        this.setState(filterInput);
    }

    render() {
        return(
            <Fragment>
                <div className="container">
                    <div className="row">
                    <h4 className="display-4 athletic-blue text-center col-12 col-sm-6 order-1 order-sm-2">Riders</h4>
                    <Filter
                        className="col-12 col-sm-6 pt-2 pt-sm-3 order-2 order-sm-1"
                        filterText={this.state.filterText}
                        onFilter={this.handleFilter}
                    />
                    </div>
                    <RiderTable
                        onHighlight={this.props.onHighlight}
                        riders={this.state.riders}
                        filterText={this.state.filterText}
                    >
                    </RiderTable>
                </div>
            </Fragment>
        )
    }
}

export default Riders;