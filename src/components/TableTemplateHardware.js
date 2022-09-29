import React, { Component,useState } from 'react';
import { Collapse, Container,Table, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

class TableTemplateHardware extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }

    render() { 
        //console.log("TableTemplate: ", this.props);

        return ( 
            <Container>        
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Type</th>
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

let hardwareComponents = []
let types = []

function addItem(element) {
    let resetLists = sessionStorage.getItem("emptyLists")

    if(resetLists == "true") {
        sessionStorage.setItem("emptyLists","false");
        hardwareComponents = [];
        types = [];
    }

    if(types.includes(element.type)) {
        if(hardwareComponents.includes(element.id)) {
            hardwareComponents.pop(element.id)
            types.pop(element.type)
        } else {
            alert("Type already choosen")
            document.getElementById(element.id).checked = false;
        }
    } else {
        types.push(element.type)
        hardwareComponents.push(element.id)
    }

    sessionStorage.setItem("hardwareIDs",hardwareComponents.join())
}

function TableRow(prop)
{
    const [open, setOpen] = useState(false);

    return(
        <>
            <tr onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open} >
                <td>{prop.prop.id}</td>
                <td>{prop.prop.name}</td>
                <td>{prop.prop.type}</td>
                <td>{(prop.prop.price).toFixed(2)}</td>
                <td onClick={() => setOpen(open)}><Form.Check 
                    id={prop.prop.id} 
                    key={prop.prop.id} 
                    onChange={e => addItem(prop.prop)} 
                    aria-label="option 1" />
                </td>
            </tr>
            <Collapse in={open}>
                    <tr>
                        <td colSpan={5}>{prop.prop.description}</td>
                    </tr>
            </Collapse>
        </>
   );
}
export default TableTemplateHardware;
