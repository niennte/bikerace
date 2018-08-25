import React from "react"
import helpers from "./helpers";
import styled from "styled-components";

const LoadWheel = styled.span`
  display: block;
  background: #ff0000;
  border: 15px solid #f3f3f3;
  border-top: 15px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
`;

class Pagination extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: props.pageLoaded
        }
        this.handleLink = this.handleLink.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            loading: nextProps.pageLoaded
        });
    }

    handleLink(e) {
        e.preventDefault();
        this.setState({
            loading: e.currentTarget.dataset.loaderId
        });
        this.props.getPage(e.currentTarget.dataset.page);
    }

    render () {

        const { collection } = this.props;
        const { loading } = this.state;

        return (
            <React.Fragment>
                <div className="row py-3">
                    <h4 className="display-4 text-center athletic-red col-md-6 justify-content-center h-100 align-items-center">
                        <span className="">Flickr gallery</span>
                    </h4>
                    <nav aria-label="Page navigation for a collection of results" className="col-md-6">
                        <ul className="pagination pagination-lg justify-content-center h-100 align-items-center mb-0">

                            <li className={ `page-item ${helpers.cssDisabled(!collection.has_previous_page)}` }>
                                <a
                                    className={ `page-link ${helpers.cssLoading(loading === "loader-previous")}` }
                                    data-loader-id="loader-previous"
                                    data-page={collection.page - 1}
                                    href={ `?page=${collection.page - 1}&page_size=${collection.page_size}` }
                                    aria-label="Previous"
                                    onClick = {this.handleLink}
                                >
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">Previous</span>
                                    <span className="loader">
                                        <LoadWheel />
                                    </span>
                                </a>
                            </li>

                            { collection.paginator.map((page) => {
                                return (
                                <li key={page} className={ `page-item ${helpers.cssActive(page === collection.page)}` }>
                                    <a
                                        href={ `?page=${page}&page_size=${collection.page_size}` }
                                        className={ `page-link ${helpers.cssLoading(loading === "loader-page-" + page)}` }
                                        data-loader-id={`loader-page-${page}`}
                                        data-page={page}
                                        onClick = {this.handleLink}
                                    >{page}
                                        <span className="loader">
                                            <LoadWheel />
                                        </span>
                                    </a>
                                </li>
                                )
                            }) }

                            <li className={ `page-item ${helpers.cssDisabled(!collection.has_next_page)}` }>
                                <a
                                    className={ `page-link ${helpers.cssLoading(loading === "loader-next")}` }
                                    data-loader-id="loader-next"
                                    data-page={collection.page + 1}
                                    href={`?page=${collection.page + 1}&page_size=${collection.page_size}`} aria-label="Next"
                                    onClick = {this.handleLink}
                                >
                                    <span aria-hidden="true">&raquo;</span>
                                    <span className="sr-only">Next</span>
                                    <span className="loader">
                                        <LoadWheel />
                                    </span>
                                </a>
                            </li>

                        </ul>
                    </nav>
                </div>
            </React.Fragment>
        );
    }
}

export default Pagination
