import React, { Component } from 'react';

class Filter extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        let value = e.target["value"];
        let name = e.target.name;

        this.props.onFilter({
            [name]: value
        });
    }

    render() {
        return(
            <form className={`${this.props.className}`}>
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Filter by id, name, or city"
                        value={this.props.filterText}
                        onChange={this.handleChange}
                        name="filterText"
                    />
                </div>
            </form>
        );
    }
}

export default Filter;