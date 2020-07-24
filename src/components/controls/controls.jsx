import React from 'react';
import {InputGroup, FormControl, Form} from 'react-bootstrap';
// import styles from './controls.module.css';


function Controls(props) {

    // if props.visible is true show it else change the class.
    return (
        
        <div>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">
                        <span> &#x1F50D;</span> 
                    </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
                placeholder="Search Country"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={props.search}
                onChange={props.handleSearch}
            />
            </InputGroup>

            <InputGroup>
                <Form.Control as="select" onChange={props.handleSelect}>
                {props.regions.map((region, index) => {
                return (
                    <option key={index} value={region}>
                    {region}
                    </option>
                );
                })}
            </Form.Control>
            
            </InputGroup>
        </div>
    );
}

export default Controls;