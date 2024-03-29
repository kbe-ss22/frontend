import React, { Component } from 'react';
import keycloak from "../auth/Keycloak";
import axiosInstance from '../auth/interceptor'
import TableTemplateProduct from './TableTemplateProduct';
import Cookies from 'js-cookie';
import Dropdown from 'react-bootstrap/Dropdown';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {message: [], currency: null};
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

        var config = {
            params: {
                currencyParam: cookieCurrency
            }
          };
        axiosInstance.get('http://localhost:8081/products', config)
        .then(response => this.setState({message: response.data}))
    }

    updateCurrencyAndFetch(item) {
        this.setState({currency: item})
        Cookies.set('currency', item)
        this.fetchData()
        this.setState({ state: this.state });
    }

    render() {
        const product = this.state.message;
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
                                <Dropdown.Item onClick={() => this.updateCurrencyAndFetch(item)}>
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
