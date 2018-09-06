import React, { Component } from "react";

class RiderRow extends Component {
    constructor(props) {
        super(props);
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

                        <button className="btn btn-light ">
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