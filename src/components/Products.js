import React, { Component } from 'react';
import Keycloak from 'keycloak-js';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import keycloak from "../Keycloak";
import axiosInstance from '../keycloak/interceptor'
import TableTemplateProduct from './TableTemplateProduct';
import Cookies from 'js-cookie';
import Dropdown from 'react-bootstrap/Dropdown';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {clients: [], message: [], currency: null, authenticated: false};
        this.items = ['EUR', 'MXN', 'USD', 'CAD', 'YEN', 'PND'];
    }

    componentDidMount() {
        if(this.state.currency == null) {
            this.setState( {currency: Cookies.get('currency') ?? 'EUR'} )
        }
        this.fetchData()
    }

    fetchData() {
        let cookieCurrency = Cookies.get('currency') ?? 'EUR';
        console.log("cookieCurrency = ",cookieCurrency)

        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+keycloak.token,
                'Access-Control-Allow-Origin': '*',
                'withCredentials': true
            },
            params: {
                currencyParam: cookieCurrency
            }
          };
        axiosInstance.get('http://localhost:8081/products', config)
        .then(response => this.setState({message: response.data}))
        console.log("fetch of products returned: ",this.state.message)
    }

    setSelectedItemWrapper(item) {
        this.setState({currency: item})
        console.log("typeof(item): ",typeof(item))
        Cookies.set('currency', item)
        this.fetchData()
        this.render()
    }

    render() {
        const {clients, isLoading} = this.state;
        console.log("Products product: ", this.state.message)
        const product = this.state.message;
        console.log("this.state.message: ",this.state.message)
        let selectedCurrency = this.state.currency;
        if(keycloak.authenticated) {
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
                
                    <TableTemplateProduct props={product}/>
                </div>
            );
        } else {
            return <div>Unable to authenticate!</div>
        }
    }
}
export default Products;
