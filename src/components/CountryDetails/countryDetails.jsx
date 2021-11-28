import React, { Component} from 'react';
import {Button} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import {getData} from '../../apis/countries';


class  CountryDetails extends Component {

    constructor(props) {
        super(props);
        this.url = 'https://restcountries.com/v3.1/alpha/';
        this.error = false;
        this.state = {
            country: [],
            countriesLoaded: false,
            reload: false,
        };
    }

    async componentDidMount() {
        this.setState({country: await getData(this.url+this.props.match.params.code)},
            () => this.setState({countriesLoaded: true})
        )
    }

    printLanguages = (obj) => {
        return Object.entries(obj).map(
            ([key, value], i) => <span key={i}>{`${value} `}</span>
        )
    }

    printCurrencies = (obj) => {
        return Object.entries(obj).map(
            ([key, value], i) => <span key={i}>{`${value.name} ${value.symbol}`}</span>
        ) 
    }

    componentWillUnmount() {
        
    }

    render(){

        
        if (this.state.countriesLoaded) {

            // if 404 is the response return this instead.
                if ('status' in this.state.country) {
                    return <h1>Country does not exist</h1>
                }

            return(
                
                <div>
                    <Button onClick={this.handleBack}> Back </Button>
                    <div>
                        <img src={`${this.state.country[0].flags.svg}`} alt=""/>
                        <div>
                            
                            {/* LeftSide */}
                            <div>
                                <div>
                                    <h3>{this.state.country[0].name.official}</h3>
                                </div>
                                {/* left */}
                                <div>
                                    <p><span>Native Name: </span> {this.state.country[0].name.official}</p>
                                    <p> <span>Population: </span>{this.state.country[0].population}</p>
                                    <p> <span>Region: </span> {this.state.country[0].region}</p>
                                    <p> <span>Sub Region: </span> {this.state.country[0].subregion}</p>
                                    <p> <span>Capital:</span>{this.state.country[0].capital[0]}</p>
                
                                </div>
                                {/* Right */}
                                <div>
                                    <p><span>Top Level Domain: </span>{this.state.country[0].tld.map((domain, i) => <span key={i}>{domain}</span>)}</p>
                                    <p><span>Currencies: </span>{this.printCurrencies(this.state.country[0].currencies)}</p>
                                    <p><span>Languages: </span>{this.printLanguages(this.state.country[0].languages)}</p>
                                </div>
                                {/* broder */}
                                <div>
                                    <span>Bodering Countries: </span>
                                    {
                                        this.state.country[0].borders ?

                                        this.state.country[0].borders.map((border, i) =>
                                            <Button key={i} onClick={() => this.reload(border)}>{border} </Button>
                                            // <Link to={`detail/${border}`} > {border}</Link>
                                        ) : <span> This country has no borders</span>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            );
        }
    else {
        return <h1>Getting data</h1>
    }
    }

    // button 
    reload = (border) => {
        this.props.history.push(`/detail/${border}`)
    }

    // goes back to the previous page
    handleBack = () => {
        this.props.history.goBack();
    }
    
    componentDidUpdate(prevProps) {
        if(prevProps.match.params.code.valueOf() !== this.props.match.params.code) {
            getData(this.url + this.props.match.params.code).then(data => this.setState({country:data}));
            
        }
    }
}

export default withRouter(CountryDetails);