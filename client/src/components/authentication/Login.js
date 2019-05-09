import React from 'react'
import axios from '../../config/axios'
import { Redirect } from 'react-router-dom'

class UserLogin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '', 
            notice: '',
            redirect: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        const formData = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('/users/login', formData)
            .then(response => {
                console.log(axios.defaults.headers)
                axios.defaults.headers['x-auth'] = response.data.token
                localStorage.setItem('token', response.data.token)
                this.props.handleIsAuthenticated(true)
                this.setState(() => ({ redirect: true }))
                // this.props.history.push('/contacts')
            })
            .catch(err => {
                this.setState(() => ({
                    notice: err.response.data.notice 
                }))
            })

    }

    handleChange(e) {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }

    render() {
        console.log(this.props)
        if(this.state.redirect) {
            return <Redirect to="/contacts" />
        }
        return (
            <div>
                <h2 className = "registerHeading">Login</h2>
                { this.state.notice && <p> { this.state.notice } </p> }
                <form onSubmit={this.handleSubmit} className = "register">
                    <label><span className = "span">
                        email
                        <input className = "textbox" type="text" value={this.state.email} onChange={this.handleChange} name="email" />
                        </span></label> <br />

                    <label><span className = "span">
                        password
                        <input  className = "textbox" type="password" value={this.state.password} onChange={this.handleChange} name="password" />
                        </span></label> <br />

                    <input className = "button" type= "submit" value = "Login"/>
                </form>
            </div>
        )
    }
}

export default UserLogin