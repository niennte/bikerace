import React, { Component, Fragment } from "react";
import axios from "axios";
import helpers from "./helpers";

class Contest extends Component {

    constructor(props) {
        super(props);
        this.service = props.service;
        this.validationService = props.validation;
        this.state = {
            errors: props.errors || [],
            model: props.model,
            validatedFields: [],
            created: null,
            form: true
        };
        this.callValidateField = this.callValidateField.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateField = this.validateField.bind(this);
        this.cssValidation = this.cssValidation.bind(this);
        this.submit = this.submit.bind(this)
    }

    handleChange(e) {
        const name = e.target.dataset.name;
        const value = e.target.value;
        this.setState((prevState) => {
            let model = prevState.model;
            let errors = prevState.errors
            delete errors[name]
            model[name] = value;
            return {
                model: model,
                errors: errors
            }
        });
    }

    validateField(e) {
        const name = e.currentTarget.dataset.name;
        const val = e.currentTarget.value;
        const search = "?" + name + "=" + val;
        this.callValidateField(search, name);
        this.setState((prevState) => {
            let validatedFields = prevState.validatedFields;
            if (validatedFields.indexOf(name) === -1) {
                validatedFields.push(name);
            }
            return {
                validatedFields: validatedFields
            }
        });
    }

    callValidateField(search, field) {
        const path = this.validationService + ".json" + search;
        axios.get(path)
            .then(response => {
                this.setState((prevState) => {
                    let errors = prevState.errors || [];
                    if (response.data[field]) {
                        errors[field] = response.data[field];
                    } else {
                        delete errors[field]
                    }
                    return {
                        errors: errors,
                    };
                });
            });
    }

    cssValidation(field) {
        let className = "";
        if (this.state.errors && this.state.errors[field]) {
            className += "is-invalid"
        } else if (this.state.validatedFields.includes(field)) {
            className += "is-valid"
        }
        return className;
    }

    validationMessage(field) {
        return `${this.state.model.labels[field]} ${this.state.errors[field]}`
    }

    submitReady() {
        let hasErrors = false;
        this.state.model.expected_fields.forEach((field) => {
            if ((this.state.errors && this.state.errors[field])) {
                hasErrors = true;
            }
        });
        // enable send button when there are no errors and all fields except the last have been validated
        // the last field will be validated when it loses focus (when the send button is clicked)
        return this.state.validatedFields.length >= this.state.model.expected_fields.length - 1 && !hasErrors
    }

    submit(e) {
        e.preventDefault();
        const path = this.service + ".json";

        axios.post(path,
            {
                authenticity_token: this.props.authenticity_token,
                slogan_idea: this.state.model
            })
            .then(response => {
                this.setState({
                    created: response.data,
                    form: false
                });
            });
    }

    render() {

        const { model, errors, created, form } = this.state

        return (
            <Fragment>
                { created &&
                    <div className="alert alert-success">
                        <h4 className="text-center">Thank you!</h4>
                        <ul className="">
                            <li>Author: {created.author}</li>
                            <li>Contact: {created.contact}</li>
                            <li>Slogan Idea: {created.idea}</li>
                        </ul>
                    </div>
                }
                { form &&
                <form action="/slogan_ideas" acceptCharset="UTF-8" method="post">
                    <h6 className="text-center">Suggest your idea to win a lolly-pop!</h6>
                    <input name="utf8" type="hidden" value="&#x2713;"/>
                    <input type="hidden" name="authenticity_token" value={this.props.authenticity_token}/>

                    <div className={ `field form-group first_name` }>
                        <label htmlFor="slogan_idea_first_name">{model.labels["first_name"]}</label>:
                        <input
                            className={`form-control ${this.cssValidation("first_name")}`}
                            type="text"
                            name="slogan_idea[first_name]"
                            id="slogan_idea_first_name"
                            data-name="first_name"
                            onBlur={this.validateField}
                            onChange={this.handleChange}
                            value={model["first_name"] || ""}/>
                        {
                            errors && errors.first_name &&
                            <div className="invalid-feedback">
                                {this.validationMessage("first_name")}
                            </div>
                        }
                    </div>

                    <div className={`field form-group last_name`}>
                        <label htmlFor="slogan_idea_last_name">{model.labels["last_name"]}</label>:
                        <input
                            className={`form-control ${this.cssValidation("last_name")}`}
                            type="text"
                            name="slogan_idea[last_name]"
                            id="slogan_idea_last_name"
                            data-name="last_name"
                            onBlur={this.validateField}
                            onChange={this.handleChange}
                            value={model["last_name"] || ""}/>
                        {
                            errors && errors.last_name &&
                            <div className="invalid-feedback">
                                {this.validationMessage("last_name")}
                            </div>
                        }
                    </div>

                    <div className="field form-group email">
                        <label htmlFor="slogan_idea_email">{model.labels["email"]}</label> address:
                        <input
                            className={`form-control ${this.cssValidation("email")}`}
                            type="text"
                            name="slogan_idea[email]"
                            id="slogan_idea_email"
                            data-name="email"
                            onBlur={this.validateField}
                            onChange={this.handleChange}
                            value={model["email"] || ""}/>
                        {
                            errors && errors.email &&
                            <div className="invalid-feedback">
                                {this.validationMessage("email")}
                            </div>
                        }
                    </div>

                    <div className="field form-group idea">
                        <label htmlFor="slogan_idea_idea">{model.labels["idea"]}</label>:
                        <textarea
                            className={`form-control ${this.cssValidation("idea")}`}
                            name="slogan_idea[idea]"
                            id="slogan_idea_idea"
                            data-name="idea"
                            onBlur={this.validateField}
                            onChange={this.handleChange}
                            value={model["idea"] || ""}>
                        </textarea>
                        {
                            errors && errors["idea"] &&
                            <div className="invalid-feedback">
                                {this.validationMessage("idea")}
                            </div>
                        }
                    </div>

                    <div className="actions text-center">
                        <input
                            className={`btn btn-success btn-lg ${helpers.cssDisabled(!this.submitReady())}`}
                            type="submit"
                            name="commit"
                            value="Send"
                            data-disable-with="Create Slogan idea"
                            onClick={this.submit}
                        />
                    </div>
                </form>
                }

            </Fragment>
        );
    }
}

export default Contest