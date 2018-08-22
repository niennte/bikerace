import React from "react"
import helpers from "./helpers";

class Pagination extends React.Component {
    constructor(props) {
        super(props)
        this.handleLink = this.handleLink.bind(this)
    }

    handleLink(e) {
        e.preventDefault();
        this.props.getPage(e.currentTarget.href);
    }

    render () {

        const { collection } = this.props;

        return (
            <React.Fragment>
                <nav aria-label="Page navigation for a collection of results bg-dark">
                    <ul className="pagination pagination justify-content-center mb-5">

                        <li className={ `page-item ${helpers.cssDisabled(!collection.has_previous_page)}` }>
                            <a
                                className="page-link"
                                href={`?page=${collection.page - 1}&page_size=${collection.page_size}`}
                                aria-label="Previous"
                                onClick = {this.handleLink}
                            >
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </a>
                        </li>
                        
                        { collection.paginator.map((page) => {
                            return (
                            <li key={page} className={ `page-item ${helpers.cssActive(page == collection.page)}` }>
                                <a 
                                    href={ `?page=${page}&page_size=${collection.page_size}` }
                                    className="page-link"
                                    onClick = {this.handleLink}
                                >{page}</a>
                            </li>
                            )
                        }) }

                        <li className={ `page-item ${helpers.cssDisabled(!collection.has_next_page)}` }>
                            <a
                                className="page-link"
                                href={`?page=${collection.page + 1}&page_size=${collection.page_size}`} aria-label="Next"
                                onClick = {this.handleLink}
                            >
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </a>
                        </li>

                    </ul>
                </nav>
            </React.Fragment>
        );
    }
}

export default Pagination
