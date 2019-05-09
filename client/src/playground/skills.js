const person = {
    name : 'rakesh' ,
    skills : ['js' , 'rb'] ,
    //inside a method , the value of this still refers to the cureent object
    detailsWithoutBind : function(){
        this.skills.forEach(function(skill){
            console.log(`${this.name} knows ${skill}`)
        })
    },
    detailsWithBind : function(){
        this.skills.forEach(function(skill){
            console.log(`${this.name} knows ${skill}`)
        }.bind(this))
    } ,
//inside a mthod , if there is a function , inside taht function, value of this is the global object not the current object
    profile: function(){
        function someFunction(){
            console.log(this.name)    //this prints as undefined , cpoz the value of this keyword here is global object -on which name antha property yenu ilve illa
        }
        someFunction()
        return this                // it return the full person object
    }
}

console.log(person.detailsWithoutBind())
console.log(person.detailsWithBind())
console.log(person.profile())