import React, { Component } from "react";

class RiderTableHeader extends Component {

    constructor(props) {
        super(props);
        this.handleSort = this.handleSort.bind(this);
    }

    handleSort(e) {
        this.props.onSort(this.props.column, e.target.name || e.target.dataset.name);
    }

    render() {

        let currentSort = this.props.currentSort.column === this.props.column ?
            this.props.currentSort.direction : false;

        return(
            <th className={` ${this.props.className}`} colSpan={this.props.colSpan}>
                <span className="d-none pt-3 pr-3 d-sm-inline-block text-muted">
                    {this.props.label}
                </span>

                <nav className="d-inline-block">
                    <button
                        onClick={this.handleSort}
                        className={`btn btn-sm ${currentSort === 'asc' ? "btn-secondary" : "btn-light"}`}
                        name='asc'
                    >
                        <i className="fa fa-arrow-down" data-name='asc'/>
                    </button>
                    <button
                        onClick={this.handleSort}
                        className={`btn btn-sm ${currentSort === 'desc' ? "btn-secondary" : "btn-light"}`}
                        name='desc'
                    >
                        <i className="fa fa-arrow-up" data-name="desc"/>
                    </button>

                </nav>
            </th>
        );
    }
}

export default RiderTableHeader;