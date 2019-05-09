import React from 'react' 
import axios from '../../config/axios'

class UserRegister extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            userName: '', 
            email: '', 
            password: '', 
            notice: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }  


    handleSubmit(e) {
        e.preventDefault()
        const formData = {
            userName: this.state.userName, 
            email: this.state.email, 
            password: this.state.password
        }

        // todo client side validation

        axios.post('/users/register', formData)
            .then(() => {
                this.setState(() => ({
                    userName: '', email: '', password: '', notice: 'successfully registered, taking you to login screen'
                }))
                setTimeout(() => {
                    this.props.history.push('/users/login')
                }, 2000)
            })
            .catch(err => console.log(err))
    }
    
    handleChange(e) {
        e.persist()
        this.setState(() => ({
            [e.target.name] : e.target.value
        })) 
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <h2 className = "registerHeading">Register with us</h2>
                { this.state.notice && <p>{this.state.notice}</p>}
                <form onSubmit={this.handleSubmit} className = "register">
                    <label><span className = "span">
                        userName 
                        <input className= "textbox" type="text" value={this.state.userName} onChange={this.handleChange} name="userName"/>
                        </span></label> <br/>

                    <label className = "email"><span className = "spanEmail">
                        email
                        <input className = "textbox" type="text" value={this.state.email} onChange={this.handleChange} name="email" />
                        </span></label> <br />

                    <label><span className = "span">
                        password
                        <input className = "textbox"type="password" value={this.state.password} onChange={this.handleChange} name="password" />
                        </span></label> <br />

                    <input className = "button" type="submit" value = "Regsiter" />
                </form>
            </div>
        )
    }
}

export default UserRegister