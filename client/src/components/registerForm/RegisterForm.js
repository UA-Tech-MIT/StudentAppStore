import React from 'react';
import { Form, Message, Button, Input, Container, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createUser } from '../../actions/AsyncActionCreators';


const getDefaultState = () => {
    return {
        username: {value: '', error: ''},
        email: {value: '', error: ''},
        password: {value: '', error: ''},
        firstName: {value: '', error: ''},
        lastName: {value: '', error: ''},
    };
};

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = getDefaultState();
    }

    createArgs = () => {
        let state = this.state;
        let args = {};
        for(let key in state) {
            if(key.indexOf('opt') !== -1)
                continue; // skip internal state params
            args[key] = state[key].value;
        }
        this.setState(state);
        return args;
    }


    handleSubmit = () => {
        let args = this.createArgs();



         //TODO(yaatehr) add client side varification

        this.props.createUser(args).then((response) => {
            const { ok, errors } = response.data.createUser;

            if (ok) {
                //do something
                //TODO add success indicator, reroute and login?
                //TODO authentication
            } else {
                let state = this.state;
                errors.forEach(({ path, message }) => {
                    // err['passwordError'] = 'too long..';
                    state[`${path}`].error = message;
                });
    
                this.setState(state);
            }
        });

       
    };

    formIsValid() {
        let state = this.state;
        let isValid = true;
        for (const key in state) {
            if (key.indexOf("opt") !== -1)
                continue; // skip all non form values

            let object = state[key];
            // clear old errors
            state[key].error = '';

            switch (key) {
                default: {
                    if (!object.value || object.value === '') {
                        state[key].error = 'Required Value';
                        isValid = false;
                    }
                    break;
                }
                case 'firstName': {
                    if(object.value.length > 25) {
                        state[key].error = "first name must be less than 25 characters";
                        isValid = false;
                    }
                    break;
                }
                case 'lastName': {
                    if(object.value.length > 25) {
                        state[key].error = "first name must be less than 25 characters";
                        isValid = false;
                    }
                    break;
                }
            }
        }
        this.setState(state);
        //TODO additional validation checks
        return isValid;
    }

    handleChange = (event) => {
        var state = this.state;
        state[event.target.name].value = event.target.value;
        this.setState(state);
    };

    render() {
        const {
            username, email, password, firstName, lastName
        } = this.state;

        const errorList = [];
        for(const key in this.state) {
            const err = this.state[key].error;
            if(err) {
                errorList.push(err);
            }
        }

        return (
            <Container text>
                <Header as="h2">Register</Header>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field error={!!username.error}>
                        <Input
                            name="username"
                            onChange={this.handleChange}
                            value={username.value}
                            placeholder="Username"
                            label="Username"
                            fluid
                        />
                    </Form.Field>
                    <Form.Field error={!!email.error}>
                        <Input name="email" onChange={this.handleChange} value={email.value} placeholder="Email" label="Email" fluid />
                    </Form.Field>
                    <Form.Field error={!!password.error}>
                        <Input
                            name="password"
                            onChange={this.handleChange}
                            value={password.value}
                            type="password"
                            placeholder="Password"
                            label="Password"

                            fluid
                        />
                    </Form.Field>
                    <Form.Group widths="equal">
                        <Form.Field error={!!firstName.error}>
                            <Input
                                name="firstName"
                                onChange={this.handleChange}
                                value={firstName.value}
                                placeholder="Optional"
                                label="First Name"

                                // inline="true"
                            />
                        </Form.Field>
                        <Form.Field error={!!lastName.error}>
                            <Input
                                name="lastName"
                                onChange={this.handleChange}
                                value={lastName.value}
                                placeholder="Optional"
                                label="Last Name"
                                // inline="true"
                            />
                        </Form.Field>
                    </Form.Group>
                    <Button  type="submit" primary>Submit</Button>
                    <Button type="reset" secondary>Clear</Button>
                </Form>
                {errorList.length ? (
                    <Message error header="There was some errors with your submission" list={errorList} />
                ) : null}
            </Container>
        );
    }
}

RegisterForm.propTypes = {
    createUser: PropTypes.func.isRequired
};

const mapStateToProps = (state, { ownProps }) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        createUser
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);