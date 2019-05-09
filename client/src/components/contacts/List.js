import React from 'react' 
import { Link } from 'react-router-dom'
import axios from '../../config/axios'

class ContactList extends React.Component {
    constructor(props){
        super(props) 
        this.state = {
            contacts: [],
            search : '',
            filteredContacts : []
        }
        this.handleSearchChange = this.handleSearchChange.bind(this)
    }

    handleSearchChange(e){
        const search = e.target.value.toLowerCase()
        this.setState((prevState)=>({search,
        filteredContacts : prevState.contacts.filter(contact => contact.name.toLowerCase().indexOf(search) >=0 )}))
    }

    componentDidMount() {
        axios.get('/contacts')
            .then(response => this.setState(() => ({ contacts: response.data,
            filteredContacts : response.data })))
    }
    render() {
        return (
            <div>
                {
                    this.state.contacts.length === 0 ? (<p> No contacts found. Add your first Contact</p>) : (
                        <div> 
                            <input className = "search" type = "text" placeholder = "search" value= {this.state.search} onChange = {this.handleSearchChange}/>
                            <h2 className = "registerHeading">Listing Contacts - {this.state.contacts.length} </h2>
                            <ul>
                                {
                                    this.state.filteredContacts.map(contact => {
                                        return (
                                            <li key={contact._id}><Link to = {`contacts/${contact._id}`}> {contact.name} </Link></li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    ) 
                }

                <Link className = "button" to="/contacts/new">Add Contact</Link>

            </div>
        )
    }
}

export default ContactList