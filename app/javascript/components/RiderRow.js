import React, { Component } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";

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

        const { hasMap, hasLinks } = this.props;

        return(
            <tr>
                <td>
                    <nav className="nav justify-content-around actions">
                        { hasLinks && <button
                            className="btn btn-light "
                            data-id={this.props.rider.id}
                        >
                            <a href={`${this.props.service}/${this.props.rider.id}`}>
                            <i className="fa fa-eye"/>
                            </a>
                        </button> }

                        { hasMap && <AnchorLink offset={() => 50} href="#map"
                            className="btn btn-light"
                            data-id={this.props.rider.id}
                            onClick={this.handleHighlight} >

                            <i className="fa fa-map-marker"/>
                        </AnchorLink> }

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