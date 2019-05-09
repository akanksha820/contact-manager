import React from 'react'
import axios from '../../config/axios'
import ContactForm from './Form';


class ContactEdit extends React.Component{
    constructor(){
        super()
        this.state = {
            contact : {}
        }
        this.handleSubmission = this.handleSubmission.bind(this)
    }
    componentDidMount(){
        const { id } = this.props.match.params
        axios.get(`/contacts/${id}`)
            .then((response) => { this.setState(() => ({ contact : response.data}))
            })
    }

    handleSubmission(formData){
        axios.put(`/contacts/${this.state.contact._id}` , formData)
            .then(() => this.props.history.push(`/contacts/${this.state.contact._id}`))
            .catch(err => console.log(err))
    }
    render(){
        console.log('render- edit' , this.state)
        return(
            <div>
                <h2>Edit Contact</h2>
                <ContactForm contact = {this.state.contact}
                handleSubmission = {this.handleSubmission}/>
            </div>
        )
    }
    
}
export default ContactEdit