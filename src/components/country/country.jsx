import React from 'react';
import styles from './country.module.css';

import Card from 'react-bootstrap/Card';
/**
 * image
 * Name 
 * Population
 * Region
 * Capital
 */


function Country(props) {
    let mode = props.mode? styles.dark: styles.light;
    return (
      <Card onClick={props.showDetail} style={{ width: "100%", cursor: "pointer" }} className={mode}>
        <Card.Img variant="top" src={props.image} />
        <Card.Body>
          <Card.Title >{props.name}</Card.Title>

          <Card.Text>
            <span className="font-weight-bold">Population:</span>
            {props.population}
          </Card.Text>
          <Card.Text>
            <span className="font-weight-bold">Region:</span> {props.region}
          </Card.Text>
          <Card.Text>
            <span className="font-weight-bold">Capital:</span> {props.capital}
          </Card.Text>
        </Card.Body>
      </Card>
    );
    
}

export default Country;