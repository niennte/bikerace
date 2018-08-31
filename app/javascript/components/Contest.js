import React, { Component, Fragment } from "react"

class Contest extends Component {
    render() {
        return (
            <Fragment>
                <section className="py-5 container d-flex justify-content-center">
                    <div className="card crud" style={{
                        width: "25rem"
                    }}>

                        <div className="card-body">

                            <h3 className="card-title text-center pb-2">Suggest the Slogan:</h3>

                        </div>

                    </div>
                </section>
            </Fragment>
        );
    }
}

export default Contest