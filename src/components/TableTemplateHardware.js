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

let bla = []
let types = []

function addItem(element) {
    let resetLists = sessionStorage.getItem("emptyLists")

    if(resetLists == "true") {
        console.log("resetList == true")
        sessionStorage.setItem("emptyLists","false");
        bla = [];
        types = [];
    } else {
        console.log("resetList != true")
    }
    console.log("bla.length: ",bla.length)
    console.log("types.length: ",types.length)
    // check type
    //console.log("element: ",element)
    let e = element.id

    if(types.includes(element.type)) {
        if(bla.includes(e)) {
            bla.pop(e)
            types.pop(element.type)
        } else {
            alert("Type already choosen")
            document.getElementById(e).checked = false;
        }
    } else {
        types.push(element.type)
        bla.push(e)
    }
    console.log("elemente: ",bla.join())
    console.log("types: ",types)
    
    //check if item needs to be removed
    // if(bla.includes(e)) {
    //     bla.pop(e)
    // } else {
    //     bla.push(e)
    // }
    sessionStorage.setItem("hardwareIDs",bla.join())
}

function TableRow(prop)
{
    const [open, setOpen] = useState(false);
    //console.log("TableRow: ", prop.prop)
   
    return(
        <>
            <tr onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open} >
                <td>{prop.prop.id}</td>
                <td>{prop.prop.name}</td>
                <td>{prop.prop.type}</td>
                <td>{(prop.prop.price).toFixed(2)}</td>
                <td onClick={() => setOpen(open)}><Form.Check id={prop.prop.id} key={prop.prop.id} onChange={e => addItem(prop.prop)} aria-label="option 1" /></td>
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