const person = {
    name : 'rakesh' ,
    skills : ['js' , 'rb'] ,
    //inside a method , the value of this still refers to the cureent object
    //inside a method , if there is an arrow function ,inside that function ,value of this will still be the current object
    detailsWithoutBind : function(){
        this.skills.forEach((skill) =>{
            console.log(`${this.name} knows ${skill}`)
        })
    },
    detailsWithBind : function(){
        this.skills.forEach(function(skill){
            console.log(`${this.name} knows ${skill}`)
        }.bind(this))
    } ,
//inside a mthod , if there is an arrow function , inside taht function, value of this will still be the current object
    profile: function(){
        const someFunction = () => {
            console.log(this.name)   
        }
        someFunction()
        return this             
    }
}

console.log(person.detailsWithoutBind())
console.log(person.detailsWithBind())
console.log(person.profile())