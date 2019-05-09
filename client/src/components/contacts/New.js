import React from 'react' 
import axios from '../../config/axios'
import ContactForm from './Form'

class ContactNew extends React.Component {
    constructor(){
        super() 
        this.handleSubmission = this.handleSubmission.bind(this)
    }

    handleSubmission(formData) {
        console.log('contact new component')
        axios.post('/contacts', formData)
            .then(() => this.props.history.push('/contacts'))
            .catch(err => console.log(err))
    }

    render(){
        return (
            <div>
                <h2 className = "registerHeading"> Add Contact </h2>
                <ContactForm handleSubmission={this.handleSubmission} /> 
            </div>
        )
    }
}

export default ContactNew