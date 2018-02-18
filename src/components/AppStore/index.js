import React from 'react';
import styles from '../App/styles.scss';
import Carousel from '../Tools/carousel'
import { connect, Provider, bindActionCreators } from 'react-redux'


class AppStore extends React.Component {
    render() {
        return (
            <section>
                <h1> AppStore </h1>
                <Carousel/>
            </section>
        )
    }
}

export default AppStore;