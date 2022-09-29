import React, { Component,useState } from 'react';
import { Collapse, Container,Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

class TableTamplateHardware extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }

    

    render() { 
        console.log("TableTemplate: ", this.props);

        return ( 
            <Container>        
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
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
                <td>{prop.prop.price}</td>
            </tr>
            <Collapse in={open}>
                    <tr>
                        <td colSpan={3}>{prop.prop.description}</td>
                    </tr>
            </Collapse>
        </>
   );
}
export default TableTamplateHardware;