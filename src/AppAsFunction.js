import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import { Navbar,Form, FormControl, Button, Container, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import keycloak from "./Keycloak";
import axiosInstance from './keycloak/interceptor';
//import Keycloak from "keycloak-js";
//import Cookies from 'js-cookie';
import { useKeycloak } from '@react-keycloak/web'

function App() {


  
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  //const [keycloakAuthenticated, setKeyCloakAuthenticated] = useState([]);
  //const [keycloakData, setKeyCloakData] = useState(keycloak);
  const { keycloak, initialized } = useKeycloak()
  //const [buttonPressed, setButtonPressed] = useState(false)
  const [searchInput, setSearchInput] = useState("")
  const [cards, setCards] = useState([]);


  const defaultApiCall = "https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=Blue-Eyes"
  //const apiEndpoint = "https://db.ygoprodeck.com/api/v7/cardinfo.php?name="

  //const handleSearch = () => findCards()
  //const handleInput = e => setSearchInput(e.target.value)

  function findCards() {
    
    setCards( data.filter(res => res.name.toLowerCase().includes(searchInput.toLowerCase())))
  
  }
  
  function fetchData() {
    console.log("fetchData(): keycloak.token: ",keycloak.token)
    var config = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+keycloak.token,
          'Access-Control-Allow-Origin': '*',
          'withCredentials': true
      }
      //,
      //responseType: 'blob'
    };
    return (  
      axiosInstance.get('http://localhost:8081/anonymous',config)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result.data)
          setIsLoaded(true);
          setData(result.data)
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          console.log(error)
        }
      )
      // fetch(link)
      // .then(res => res.json())
      // .then(
      //   (result) => {
      //     setIsLoaded(true);
      //     setData(result.data);
      //     //setButtonPressed(false)
      //   },
      //   (error) => {
      //     setIsLoaded(true);
      //     setError(error);
      //     //setButtonPressed(false)
      //   }
      // )
    );
  }

  function SearchBar() {
    return (  
        <Navbar bg="light" variant='light' expand="lg" fill>
          <Container fluid>
            <Navbar.Brand href="#">Links Card Search</Navbar.Brand>
              <Form className="d-flex p-0">
                <FormControl
                  name='SearchInputBox'
                  type="text"
                  onChange={e => setSearchInput(e.target.value)} 
                  value={searchInput} />
                <Button 
                type='button'
                variant="outline-dark" 
                size="lg" 
                value='Submit'
                onClick={findCards}>Search</Button>
                </Form>
          </Container>
        </Navbar>
    );  
  }
  
  // Note: the empty deps array [] means this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    // keycloak = new Keycloak({
    //   url: "http://localhost:8080/",
    //   realm: "kbe",
    //   clientId: "react-web-app",
    //   });
    // setKeyCloakData(keycloak)
   
    // console.log("keycloakData:",keycloakData)
    // console.log("cookies: ", Cookies)
    //sessionStorage.setItem('keycloak',keycloak)
    console.log("keycloak.authenticated: ",keycloak.authenticated)
    
    //if(sessionStorage.getItem('keycloak'))
    //keycloakData.init({onLoad: 'login-required', checkLoginIframe: 'false'});
    //keycloak.init({onLoad: 'login-required', checkLoginIframe: 'false'});
    // console.log(keycloak)
    // sessionStorage.setItem('keycloak',keycloak)
    // console.log("keycloakString = ",sessionStorage.getItem('keycloak'))

    if(keycloak.authenticated) {
      console.log("User is logged in")
    } else {
      console.log("User is not logged in. Redirecting to Keycloak Server now..")
      //keycloak.init({onLoad: 'login-required', checkLoginIframe: 'false'});
    }
    
    // if(!keycloakData.authenticated) {
    //   console.log("keycloakData.authenticated is false")
      
    // } else {
    //   console.log("keycloakData.authenticated is true")
    // }
    
    
    //console.log("keycloak.token: ",keycloakData.token);
    //console.log("keycloak: ",keycloak);
    //console.log("before keycloak init: keycloak.token: ",keycloak.token);
    //let keycloakInstance = keycloak.init({onLoad: 'login-required', checkLoginIframe: 'false'})
    //keycloak.init({onLoad: 'login-required', checkLoginIframe: 'false'});
    // .then()
    // .then(authenticated => {
    //   //setKeyCloakAuthenticated(authenticated)
    //   setKeyCloakData(keycloakInstance)
    // })
    //console.log("after keycloak init: keycloak.token: ",keycloak.token);
    //console.log("after keycloak init: keycloak.instance: ",keycloakInstance);
    //console.log("after keycloak init: keycloakAuthenticated: ",keycloakAuthenticated);
    //console.log("after keycloak init: keycloakData: ",keycloakData);
    // console.log("useEffect(): keycloak.token: ",keycloak.token)
    // fetchData()
  }, [])

  if (error) return <div>Error: {error.message}</div>;
  else if (!isLoaded) return <div>Loading...</div>;
  else {
    return (
      {data}

      // <Container fluid>
      //   <SearchBar/>
      //   <Table striped hover>
      //     <TableHead />
      //     <tbody>
      //       {cards.map(
      //         item => (<TableRow card={item} key={item.id} />)
      //       )}
      //     </tbody>
      //   </Table>
      // </Container>
    );
  }
}

function AtkDef(prop)
{
  if(prop.card.hasOwnProperty('atk')) 
  {
    return <p>ATK {prop.card.atk} / DEF {prop.card.def}</p>
  }
}

function TableRow(props) {
  return (  
    <tr>
      <td> 
        <img src={props.card['card_images'][0].image_url_small} alt={props.card.name}/>
      </td>
      <td>
        <Alert variant="dark" fill>
          <Alert.Heading>{props.card.name}</Alert.Heading>
          <p>{props.card.desc}</p>
          <hr />
          <AtkDef card={props.card} className="mb-0"/>
        </Alert>
      </td>
    </tr>
  );
}

function TableHead() {
  return ( 
    <thead>
      <tr>
        <th>Picture</th>
        <th>Description</th>
      </tr>
    </thead>
   );
}

export default App;
