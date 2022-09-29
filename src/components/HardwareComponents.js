import React, { Component } from 'react';
import keycloak from "../auth/Keycloak";
import axiosInstance from '../auth/interceptor';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableTemplateHardware from './TableTemplateHardware';
import Cookies from 'js-cookie';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class HardwareComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {clients: [], message: [], currency: null, authenticated: false, name: '',inputValue: ''};
        this.items = ['EUR', 'MXN', 'USD', 'CAD', 'YEN', 'PND'];
    }

    componentDidMount() {
        if(this.state.currency == null) {
            this.setState( {currency: Cookies.get('currency') ?? 'EUR'} )
        }
        this.fetchData()
        sessionStorage.setItem("emptyLists","true");
    }

    fetchData() {
        let cookieCurrency = Cookies.get('currency') ?? 'EUR';

        var config = {
            params: {
                currencyParam: cookieCurrency
            }
          };
        axiosInstance.get('http://localhost:8081/hardwarecomponents', config)
        .then(response => this.setState({message: response.data}))
    }

    updateInputValue(evt) {
        const val = evt.target.value;
        // ...       
        this.setState({
          inputValue: val
        });
      }
    
    setSelectedItemWrapper(item) {
        this.setState({currency: item})
        // console.log("typeof(item): ",typeof(item))
        Cookies.set('currency', item)
        this.fetchData()
        this.setState({ state: this.state });
    }

    submit() {
        let hardwareidsStrings = sessionStorage.getItem("hardwareIDs")
        let arrOfStr = hardwareidsStrings.split(",")
        const arrOfNum = arrOfStr.map(str => Number(str));
        let nameProd
        if(this.state.inputValue == '') {
            nameProd = "Unnamed"
        } else {
            nameProd = this.state.inputValue;
        }
        this.sendData(nameProd,arrOfNum)
        sessionStorage.setItem("hardwareIDs","[]")
        sessionStorage.setItem("emptyLists","true");
        let alertString = "new Product with name "+nameProd+" has been sent to Server";
        alert(alertString)
    }

    sendData(productName, harddwareIDs) {
        // productName String
        // hardwareID int array
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+keycloak.token,
                'Access-Control-Allow-Origin': '*',
                'withCredentials': true
            }
          };

        var payload = {
            name: productName,
            hardwareIDs: harddwareIDs
        }
        axiosInstance.post('http://localhost:8081/products/create', payload, config)
        .then(response => { 
            console.log(response)
        })
        .catch(error => {
            console.log(error.response)
        });
    } 

    handleNameInputChange(e) {
        console.log(e);
    }


    render() {
        const {clients, isLoading} = this.state;
        const hardware = this.state.message;
        //const cpus = hardware?.filter(value => value.type === "CPU");
        //console.log("filter: ",cpus)
        //console.log(hardware)
        let selectedCurrency = this.state.currency;
        

        if(keycloak.authenticated) {

            if (isLoading) {
                return <p>Loading...</p>;
            } else {
                return (
                    <div>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Currency
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {this.items.map((item) => (
                                    <Dropdown.Item onClick={() => this.setSelectedItemWrapper(item)}>
                                        {item}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <pre> Selected Currency: {selectedCurrency}</pre>
                        <Form.Control type="name" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} placeholder="set name of product here" />
                        <Button variant="outline-primary" onClick={ () => this.submit() }>Submit</Button>{' '}
                        <TableTemplateHardware props={hardware}/>
                        <Button variant="outline-primary" onClick={ () => this.submit() }>Submit</Button>{' '}

                    </div>
                );
            }
        } else {
            return <div>Unable to authenticate!</div>
        }
    }
}
export default HardwareComponents;
