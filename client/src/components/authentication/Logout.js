import React from 'react'
import axios from '../../config/axios'

class UserLogout extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            notice : ''
            
        }
    }
    
    render(){
        return(
            <div>
                
                <h2>Logging out</h2>
                

            </div>
        )
    }
}
export default UserLogout