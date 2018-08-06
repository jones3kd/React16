import React, { Component } from 'react';
import classes from './App.css';

// must be upper case 
import Person from './Person/Person.js';

// inherit from react library
// must import React if u use render()
// react calls render() to render html code to the screen
class App extends Component {
  state = {
    people: [
      {id: 1, name: "Max", age: 28},
      {id: 2, name: "Chloe", age: 26},
    ],
    isShowPersons: false,
  }

deletePerson = (num) => {
  const people = [...this.state.people];
  people.splice(num, 1)
  this.setState({
    people: people,
  })
}

nameChanged = (event, id) => {
  const personIndex = this.state.people.findIndex(p => {
    return p.id === id
  });

  const person = {
    ...this.state.people[personIndex]
  };
  person.name = event.target.value
  const people = [...this.state.people]
  people[personIndex] = person

  this.setState({
    people: people
  });
}

togglePersonHandler = () => {
  this.setState(
    {
    isShowPersons: !this.state.isShowPersons
    }
  )
}

  render() {
    const buttonStyle = {
      backgroundColor: 'green',
      color: 'white',
      font: 'white',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
    };

    let people = null;
    if (this.state.isShowPersons) {
      people = <div>
        {this.state.people.map((person, index) => {
          return <Person 
            click={this.deletePerson.bind(this, index)} 
            name={person.name} 
            age={person.age}
            key={person.id}
            changed={(event) => this.nameChanged(event, person.id)}
            />
        })}
      </div>
      buttonStyle.backgroundColor = 'white';
      buttonStyle.color = 'black';
    }


    const assignedClasses = [];
    if (this.state.people.length <= 2) {
      assignedClasses.push(classes.red); 
    } 
    if (this.state.people.length <= 1) {
      assignedClasses(classes.bold);
    }
    return (
      <div className={classes.App}>
        <h1>Hi I'm a react app</h1>
        <p className={assignedClasses.join('')}>There are {this.state.people.length} people</p>
        <button 
        style={buttonStyle}
        onClick={this.togglePersonHandler}>Toggle person</button>
        {people}
      </div>
    );
  }
}

export default App; // higher order component
