import React from "react"
import helpers from "./helpers";

class Pagination extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {

        const { collection } = this.props;

        return (
            <React.Fragment>
                <nav aria-label="Page navigation for a collection of results">
                    <ul className="pagination pagination-lg justify-content-center mb-0">

                        <li className={ `page-item ${helpers.cssDisabled(!collection.has_previous_page)}` }>
                            <a className="page-link" href={`?page=${collection.page - 1}&perpage=${collection.perpage}`} aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </a>
                        </li>
                        
                        { collection.paginator.map((page) => {
                            return (
                            <li key={page} className={ `page-item ${helpers.cssActive(page == collection.page)}` }>
                                <a 
                                    href={ `?page=${page}&perpage=${collection.perpage}` }
                                    className="page-link">{page}</a>
                            </li>
                            )
                        }) }

                        <li className={ `page-item ${helpers.cssDisabled(!collection.has_next_page)}` }>
                            <a className="page-link" href={`?page=${collection.page + 1}&perpage=${collection.perpage}`} aria-label="Next">
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
