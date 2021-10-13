import React from "react";
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Table } from 'semantic-ui-react'



class App extends React.Component {

  constructor() {
    super();
    this.state = {
      getColleges: []

    };
  }

  componentDidMount() {
    fetch("https://mindfuleducation-cdn.s3.eu-west-1.amazonaws.com/misc/data.json")
    .then(result => result.json())
    .then(getColleges => this.setState({getColleges : getColleges.value}))
    
  }

  toggleSort = () => {
    fetch("https://mindfuleducation-cdn.s3.eu-west-1.amazonaws.com/misc/data.json").then((res) => res.json())
    .then((data) => {
      data.sort((a,b) => a.title.localeCompare(b.title));
      this.setState({data: data});
    });

  };

  render() {
    return(
      <div>
        <h1>Partners</h1>
        <a href="search" className="search">Name</a>
        <div class="ui input" id="searchBox"><input type="text"/></div>

        <a href="search" className="search">Prefix</a>
        <div class="ui input" id="searchBox"><input type="text"/></div>

        <a href="search" className="search">Ofsted Rating</a>
        <div class="ui input" id="searchBox"><input type="text" id="rating" placeholder="Ofsted Rating"/></div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell onClick={() => this.toggleSort()}>Partner</Table.HeaderCell>
              <Table.HeaderCell onClick={() => this.toggleSort()}>Prefix</Table.HeaderCell>
              <Table.HeaderCell onClick={() => this.toggleSort()}>Logo/Preroll</Table.HeaderCell>
              <Table.HeaderCell onClick={() => this.toggleSort()}>Ofsted Rating</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
          {this.state.getColleges.map(item => {
            return (
              <Table.Row key={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.groupPrefix}</Table.Cell>
              <Table.Cell>{item.logo}</Table.Cell>
              <Table.Cell>{item.ofstedRating}</Table.Cell>
            </Table.Row>
            );
          })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default App;
