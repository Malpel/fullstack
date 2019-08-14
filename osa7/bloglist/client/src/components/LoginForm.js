import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'semantic-ui-react'

const LoginForm = ({ handleLogin, username, password }) => {
    return (
        <Form onSubmit={handleLogin}>
            <Form.Field>
                Username
                <input data-cy='username' {...username} />
            </Form.Field>
            <Form.Field>
                Password
                <input data-cy='password' {...password} />
            </Form.Field>
            <Button primary type='submit' data-cy='login'>Login</Button>
        </Form>
    )
}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.object.isRequired,
    password: PropTypes.object.isRequired,
}

export default LoginForm