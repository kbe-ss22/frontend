import React, { Component,useState } from 'react';
import { Collapse, Container,Table, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

class TableTemplateHardware extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }

    render() { 
        console.log("TableTemplate: ", this.props);

        return ( 
            <Container>        
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Add to Product</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.props.hardwarelist?.map(
                            item => (<TableRow key={item.id} prop={item}/>)
                        )}
                    </tbody>
                </Table>
                
            </Container>
         );
    }
}

function TableRow(prop)
{
    const [open, setOpen] = useState(false);
    console.log("TableRow: ", prop.prop)

    return(
        <>
            <tr onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open} >
                <td>{prop.prop.id}</td>
                <td>{prop.prop.name}</td>
                <td>{(prop.prop.price).toFixed(2)}</td>
                <td onClick={() => setOpen(open)}><Form.Check key={prop.prop.id} aria-label="option 1" /></td>
            </tr>
            <Collapse in={open}>
                    <tr>
                        <td colSpan={4}>{prop.prop.description}</td>
                    </tr>
            </Collapse>
        </>
   );
}
export default TableTemplateHardware;