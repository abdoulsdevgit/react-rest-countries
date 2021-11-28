import React, { Component } from "react";
import { getData } from "../../apis/countries";
import { Switch, Route, withRouter} from "react-router-dom";


import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./countriesContainer.module.css";

// components
import Country from "../country/country";
import Header from "../header/header";
import Controls from "../controls/controls";


// Bootstrap
import Container from "react-bootstrap/Container";
import CountryDetails from "../CountryDetails/countryDetails";

class CountryContainer extends Component {
    constructor(props) {
        super(props);
        this.url = "https://restcountries.com/v3.1/all";
        this.codeUrl = "https://restcountries.com/v3.1/alpha/";
        this.state = {
            countries: [],
            mode: true,
            ready: false,
            search: "",
            regions: ["World", "Africa", "Americas", "Asia", "Europe", "Oceania"],
        };

        //this.ready = false;
        this.backup = [];
    }

    async componentDidMount() {
        this.setState({ countries: await getData(this.url) }, () => {
            this.setState({ ready: true });
            this.backup = [...this.state.countries];
        });
    }

    render() {
        let mode = this.state.mode ? styles.dark : styles.light;
        let path = this.props.history.location.pathname.valueOf() === "/" ?  
            <Controls
                handleSearch={this.handleSearch}
                search={this.state.search}
                regions={this.state.regions}
                handleSelect={this.handleSelect}
                visible={this.state.showControls}
            />
        : '';
        return (
            <Switch>
                <>
                    <div className={mode}>
                        <Header mode={this.state.mode} changeMode={this.changeMode} />
                    <Container>
                        {path}
                        <Route exact path="/detail/:code" render={({ match, history }) => <CountryDetails
                            country={match.params.code}
                            {...match}
                                codeUrl={this.codeUrl}
                            />}

                        />
                        
                    <Route exact path="/" component={(props) =>
                        <>
                        
                        <div className={styles.countries}>
                            
                        {this.state.ready
                            ? this.state.countries.map((country, index) => {
                                
                                return (
                                <Country
                                    key={index}
                                    image={country.flags.svg}
                                    name={country.name.common}
                                    population={country.population}
                                    region={country.region}
                                    capital={country.capital}
                                    mode={this.state.mode}
                                    showDetail={() => this.showDetail(country.cca3)}
                                    // key={index}
                                    // image={country.flag}
                                    // name={country.name}
                                    // population={country.population}
                                    // region={country.region}
                                    // capital={country.capital}
                                    // mode={this.state.mode}
                                    // showDetail={() => this.showDetail(country.alpha3Code)}
                                />
                                );
                            })
                            : null}

                    
                        </div>
                        </>
                    }/>
        </Container>
    </div>
    </>
</Switch>
    );
}

    changeMode = () => {
        this.setState((prevState) => ({ mode: !prevState.mode }));
    };

  //search
    handleSearch = async (event) => {
        await this.setState({ search: event.target.value });
            
            let temp = await getData(this.url);
           
            let result = temp.filter((country) =>
                //JSON.stringify(country).name
                country.name.common
                .toLowerCase()
                .includes(this.state.search.trim().toLowerCase())
            );
        
        if (result.length >= 1) {
            this.setState({ countries: [...result] });
        } else {
            this.setState({ countries: [...temp] });
        }
    };

    handleSelect = async (event) => {
        //Africa, Americas, Asia, Europe, Oceania
        let urls = "";
        switch (event.target.value) {
        case "World":
            urls = "https://restcountries.com/v3.1/all";
            break;
        default:
            urls = `https://restcountries.com/v3.1/region/${event.target.value}`;
            break;
        }
        this.setState({ countries: await getData(urls) });
    };

  // shows the details of the country.
    showDetail = (country) => {
        this.props.history.push(`/detail/${country}`);
    }

}

export default withRouter (CountryContainer);
// export default CountryContainer;
//TODO: The search is breaking when bogus numbers are put in.
/**
 *
 * Parent container passes mode to each child component
 * to tell it to render dark or light mode.
 */


/**
 * TODO: fix the api calls.j
 */