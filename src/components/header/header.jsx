import React from "react";
import styles from './header.module.css';
import {Container} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';


function Header(props) {

    let mode = props.mode ? styles.dark: styles.light;
    return (
      <div className={mode}>
        <Container>
          <div className={styles.content}>
            <span onClick={()=> props.history.push("/")} className={styles.main}>Where in the World?</span>
            <span className={styles.mode} onClick={props.changeMode}>
              {props.mode ? "Dark Mode" : "light Mode"}
            </span>
        </div>
          </Container>
      </div>
    );
}

// export default Header;
export default withRouter (Header);