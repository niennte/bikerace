import React, { Component } from "react";

class RiderRow extends Component {
    constructor(props) {
        super(props);
        this.handleHighlight = this.handleHighlight.bind(this);
    }

    handleHighlight(e) {
        const id = e.currentTarget.dataset.id;
        this.props.onHighlight(id)
    }

    render() {
        return(
            <tr>
                <td>
                    <nav className="nav justify-content-around actions">
                        <button
                            className="btn btn-light "
                            data-toggle="modal"
                            data-target="#productFormModal"
                            data-id={this.props.rider.id}
                        >
                            <i className="fa fa-eye"/>
                        </button>

                        <button
                            className="btn btn-light"
                            data-id={this.props.rider.id}
                            onClick={this.handleHighlight} >
                            <i className="fa fa-map-marker"/>
                        </button>
                    </nav>
                </td>
                <td>
                    <span className="">
                        {this.props.rider.id}
                    </span>
                </td>
                <td>
                    <span className="">
                        {this.props.rider.name}
                    </span>
                </td>
                <td>
                    {this.props.rider.origin}
                </td>
            </tr>
        );
    }
}

export default RiderRow;