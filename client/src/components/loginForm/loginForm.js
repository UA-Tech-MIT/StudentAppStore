import React from 'react';
import { Form, Message, Button, Input, Container, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../../actions/AsyncActionCreators';


const getDefaultState = () => {
    return {
        username: {value: '', error: ''},
        password: {value: '', error: ''},
    };
};

class LoginForm extends React.Component {
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

        this.props.login(args).then((response) => {
            const { ok, token, refreshToken } = response.data.login;

            if (ok) {
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);
                //TODO add success indicator, reroute and login?
                //TODO authentication
            } else {
                console.log(response.data.login.errors);
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
                        state[key].error = `${key} Required!`;
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
        let state = this.state;
        state[event.target.name].value = event.target.value;
        this.setState(state);
    };

    render() {
        const { username, password } = this.state;

        const errorList = [];
        for(const key in this.state) {
            const err = this.state[key].error;
            if(err) {
                errorList.push(err);
            }
        }

        return (
            <Container text className="page-template">
                <Header as="h2">Login</Header>
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
                    <Button  type="submit" primary fluid>Login</Button>
                </Form>
                {errorList.length ? (
                    <Message error header="There was some errors with your submission" list={errorList} />
                ) : null}
            </Container>
        );
    }
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired
};

const mapStateToProps = (state, { ownProps }) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        login
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);