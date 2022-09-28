import React, { Component,useState } from 'react';
import { Collapse, Container,Table, ListGroup } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

class TableTemplateProduct extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }

    render() { 
        return ( 
            <Container>        
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.props.productlist?.map(
                            item => (<TableRowP key={item.id} prop={item}/>)
                        )}
                    </tbody>
                </Table>
            </Container>
         );
    }
}

function TableRowP(prop)
{
    const [open, setOpen] = useState(false);
    console.log("TableRowProduct: ", prop.prop)

    return(
        <>
            <tr onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open} >
                <td>{prop.prop.id}</td>
                <td onClick={() => setOpen(open)}><p>{prop.prop.name}</p></td>
                <td>{(prop.prop.price).toFixed(2)}</td>
            </tr>
            <Collapse in={open}>
                    <tr>
                        <td colSpan={2}>
                            <ListGroup>
                                {prop.prop.hardware?.map(
                                    item => (<ListGroup.Item>{item.name}</ListGroup.Item>)
                                )}
                            </ListGroup>
                        </td>
                    </tr>
            </Collapse>
        </>
   );
}
export default TableTemplateProduct;