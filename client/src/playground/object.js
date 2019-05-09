const person = {
    name : 'rahul' ,
    greet : function(){
        return 'Hello my name is ' + this.name
    }
}

console.log(person.greet())    //'Hello my name is rahul

const sayName= person.greet
console.log(sayName())  //'hello my name is undefined'

console.log(sayName.bind(person)())   //'Hello my name is rahul'


//here this referes to global object , coz sayHello is a seperate normal function(not defined inside any object)
//What gets passed inside metod , will now become the value of this keyword. 
function sayHello(){
    return 'hello my name is '+this.name
}
console.log(sayHello())            // hello my name is undefined
console.log(sayHello.bind({name : 'akanksha'})())     //Hello my name is akanksha
