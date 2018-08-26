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
            loaderId: null
        }
        this.handleLink = this.handleLink.bind(this)
        this.handleLayoutChange = this.handleLayoutChange.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState((prevState) => {
            return {
                loaderId: nextProps.AJAXCallInProgress ? prevState.loaderId : null
            }
        });
    }

    handleLink(e) {
        e.preventDefault();
        let page = e.currentTarget.dataset.page || this.props.collection.page
        const pageSize = e.currentTarget.dataset.pageSize || this.props.collection.page_size
        if (pageSize > this.props.collection.page_size) {
            page = 1
        }
        this.setState({
            loaderId: e.currentTarget.dataset.loaderId
        });
        this.props.getPage(page, pageSize);
    }

    handleLayoutChange(e) {
        e.preventDefault();
        this.props.handleLayoutChange(e.currentTarget.dataset.layout);
    }

    render () {

        const { collection, layout } = this.props;
        const { loaderId } = this.state;

        return (
            <React.Fragment>
                <div className="row py-3">
                    <div className="col-md-6">
                    <h4 className="display-4 text-center athletic-red justify-content-center align-items-center">
                        <span className="">Flickr gallery</span>
                    </h4>
                        <p class="text-muted">Searching terms:
                        {
                            collection.terms.map( (term, i) => {
                                return(
                                    <span
                                        key={i}
                                        className="badge badge-light mx-2">
                                        {term}
                                    </span>
                                );
                            })
                        }
                        </p>
                </div>
                <div className="col-md-6">

                        <div className="row mb-2">
                        <nav className="col-6 m-0 p-0" aria-label="Page size controls" >
                            <ul className="pagination pagination justify-content-start h-100 align-items-center mb-0">
                                <li className={ `page-item ${helpers.cssActive(12 === collection.page_size)}` }>
                                    <a
                                        href={ `?page=1&page_size=12` }
                                        className={ `page-link ${helpers.cssShowLoader(loaderId === "loader-page-size" + 12)}` }
                                        data-loader-id={`loader-page-size-12`}
                                        data-page-size={`12`}
                                        onClick = {this.handleLink}
                                    >x12
                                        <span className="loader">
                                            <LoadWheel />
                                        </span>
                                    </a>
                                </li>
                                <li className={ `page-item ${helpers.cssActive(24 === collection.page_size)}` }>
                                    <a
                                        href={ `?page=1&page_size=24` }
                                        className={ `page-link ${helpers.cssShowLoader(loaderId === "loader-page-size" + 24)}` }
                                        data-loader-id={`loader-page-size-24`}
                                        data-page-size={`24`}
                                        onClick = {this.handleLink}
                                    >x24
                                        <span className="loader">
                                            <LoadWheel />
                                        </span>
                                    </a>
                                </li>
                                <li className={ `page-item ${helpers.cssActive(36 === collection.page_size)}` }>
                                    <a
                                        href={ `?page=1&page_size=36` }
                                        className={ `page-link ${helpers.cssShowLoader(loaderId === "loader-page-size" + 36)}` }
                                        data-loader-id={`loader-page-size-36`}
                                        data-page-size={`36`}
                                        onClick = {this.handleLink}
                                    >x36
                                        <span className="loader">
                                            <LoadWheel />
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </nav>

                            <nav className="col-6 m-0 p-0" aria-label="Page size controls" >
                                <ul className="pagination pagination justify-content-end h-100 align-items-center mb-0 ">
                                    <li className={ `page-item ${helpers.cssActive("masonry" === layout)}` }>
                                        <a
                                            href="#masonry"
                                            className="page-link"
                                            data-layout={`masonry`}
                                            onClick = {this.handleLayoutChange}
                                        >Masonry
                                        </a>
                                    </li>
                                    <li className={ `page-item ${helpers.cssActive("boxed" === layout)}` }>
                                        <a
                                            href="#boxed"
                                            className="page-link"
                                            data-layout={`boxed`}
                                            onClick = {this.handleLayoutChange}
                                        >Boxed
                                        </a>
                                    </li>
                                    <li className={ `page-item ${helpers.cssActive("square" === layout)}` }>
                                        <a
                                            href="#boxed"
                                            className="page-link"
                                            data-layout={`square`}
                                            onClick = {this.handleLayoutChange}
                                        >Square
                                        </a>
                                    </li>

                                </ul>
                            </nav>
                        </div>

                        <nav className="" aria-label="Page navigation for a collection of results" >
                            <ul className="pagination pagination-lg justify-content-center h-100 align-items-center mb-0">

                                <li className={ `page-item ${helpers.cssDisabled(!collection.has_previous_page)}` }>
                                    <a
                                        className={ `page-link ${helpers.cssShowLoader(loaderId === "loader-previous")}` }
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
                                            className={ `page-link ${helpers.cssShowLoader(loaderId === "loader-page-" + page)}` }
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
                                        className={ `page-link ${helpers.cssShowLoader(loaderId === "loader-next")}` }
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
                </div>
            </React.Fragment>
        );
    }
}

export default Pagination
