import React from "react";
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Button, Table, TableBody, TableRow } from 'semantic-ui-react'



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: true,
      sortType: "",
      search: "" 
    };
   
  }

  componentDidMount = () => {
    fetch("https://mindfuleducation-cdn.s3.eu-west-1.amazonaws.com/misc/data.json")
      .then(res => res.json())
      .then(res => {
        this.setState({
          items: res.getColleges,
        });
      });

  }

  onSort(sortType){
    this.setState({sortType})
  }

  searchFilter(event) {
    console.log(event.target.value);
    this.setState({search : event.target.value});
  }


  render() {
    var { items, sortType, search } = this.state;

    items.sort((a,b) => {
      if(sortType === "asc") {
        var isReversed = 1;
      }

      else if(sortType === "desc") {
        var isReversed = -1;
      }
      
      return isReversed * a.name.localeCompare(b.name)
      })

      var filteredCollege = items.filter((item) => {
        return item.name.indexOf(search) !== -1;
      })

    var itemInfo = filteredCollege.map(item => (
      <TableRow key={item.id}>
        <Table.Cell>{item.name}</Table.Cell>
        <Table.Cell>{item.groupPrefix}</Table.Cell>
        <Table.Cell><img src={item.logo}/></Table.Cell>
        <Table.Cell>{item.ofstedRating}</Table.Cell>
      </TableRow>
    )); 

      return(
        <div className="App">
          <h1>Partners</h1>
        <a href="search" className="search">Name</a>
        <div class="ui input" id="searchBox"><input type="text" onChange={this.searchFilter.bind(this)}/></div>

        <a href="search" className="search">Prefix</a>
        <div class="ui input" id="searchBox"><input type="text"/></div>

        <a href="search" className="search">Ofsted Rating</a>
        <div class="ui input" id="searchBox"><input type="text" id="rating" placeholder="Ofsted Rating"/></div>

        <Table celled>
        <Table.Header>
            {<Table.Row>
              <Table.HeaderCell onClick={()=>this.onSort(this.state.sortType==="asc"?"desc":"asc")}>Partner</Table.HeaderCell>
              <Table.HeaderCell onClick={()=>this.onSort(this.state.sortType==="asc"?"desc":"asc")}>Prefix</Table.HeaderCell>
              <Table.HeaderCell>Logo/Preroll</Table.HeaderCell>
              <Table.HeaderCell>Ofsted Rating</Table.HeaderCell>
            </Table.Row>}
          </Table.Header>

          <TableBody>
            {itemInfo}
          </TableBody>
        </Table>
        </div>
      );
    }
  }


export default App;