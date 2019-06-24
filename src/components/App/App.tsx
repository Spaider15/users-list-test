import * as React from 'react';
import './App.css';
import UsersList from '../../containers/UsersList';

export default class App extends React.Component {
    render() {
        return (
            <div className="App">
                <UsersList />
            </div>
        )
    }
}