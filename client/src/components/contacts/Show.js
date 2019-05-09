import React from 'react'
import { Link } from 'react-router-dom'
import axios from '../../config/axios'


class ContactShow extends React.Component{
    constructor(){
        super()
        this.state = {
            contact :{}
        }
        this.handleDelete = this.handleDelete.bind(this)
    }
    handleDelete(){
        const confirmDelete = window.confirm('Are you sure ??:(')
        if(confirmDelete){
            //api call to delete
            axios.delete(`/contacts/${this.state.contact._id}`)
                .then(() => this.props.history.push('/contacts'))
                .catch((err) => window.alert(err))
        } 
    }

    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/contacts/${id}`)
            .then((Response) => this.setState(()=> ({contact:Response.data})))
    }
    render(){
        return(
            <div>
                
                <p>{this.state.contact.name}</p>
                <p>Email - {this.state.contact.email}</p>
                <p>Mobile - {this.state.contact.mobile}</p>

               
                <Link to = {`/contacts/edit/${this.props.match.params.id}`}> Edit</Link>

                <button onClick = {this.handleDelete}>
                    Delete
                </button><br/>
                <Link to = "/contacts"> Back </Link>
            </div>
        )
    }
}
export default ContactShow