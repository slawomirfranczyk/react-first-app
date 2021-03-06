import React, { Component } from 'react';
import uniqid from 'uniqid';
import Countdown from './Countdown';
import EditEvent from './EditEvent';

import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            events: [
                { id: 0, name: 'śniadanie', hour: '07', minute: '00' },
                { id: 1, name: 'obiad', hour: '16', minute: '00' },
                { id: 2, name: 'kolacja', hour: '20', minute: '00' }
            ],
            editedEvent: { id: uniqid(), name: '', hour: '', minute: '' }
        };
        
        this.handleEditEvent = this.handleEditEvent.bind(this);
        this.handleSaveEvent = this.handleSaveEvent.bind(this);
        this.handleRemoveEvent = this.handleRemoveEvent.bind(this);
        this.handleEditInit = this.handleEditInit.bind(this);
    }
    
    handleEditEvent(val) {
        this.setState(prevState => {
            return {
                editedEvent: Object.assign(prevState.editedEvent, val)
            }
        })
    }
    
    handleSaveEvent() {
        this.setState(prevState => {
            const editedEventExist = prevState.events.find(
                el => el.id === prevState.editedEvent.id
            );
            
//            console.log(editedEventExist);
            
            let updatedEvents;
            
            if( editedEventExist ) {
                updatedEvents = prevState.events.map( el => {
                    if ( el.id === prevState.editedEvent.id ) 
                        return prevState.editedEvent;
                    else
                        return el;
                })
            } else {
                updatedEvents = [...prevState.events, prevState.editedEvent];
            }
            
            return {
                events: updatedEvents, 
                editedEvent: { id: uniqid(), name: '', hour: '', minute: '' }
            }
            
        })
    }
    
    handleRemoveEvent(id) {
        this.setState(prevState => ({
            events: prevState.events.filter( el => el.id !== id )
        }));
    }
    
    handleEditInit(id) {
        this.setState(prevState => ({
            editedEvent: {...prevState.events[id]}
        }))
    }
    
    render() {
        const events = this.state.events.map( el => {
            return (
                <Countdown 
                key={ el.id } 
                id={ el.id }
                name={ el.name } 
                hour={ el.hour } 
                minute={ el.minute } 
                onRemove={ id => this.handleRemoveEvent(id) }
                onEditInit={ id => this.handleEditInit(id) }
                />
            );
        });
        
        return (
            <div className="app">
                { events }
                <EditEvent
                name={ this.state.editedEvent.name } 
                hour={ this.state.editedEvent.hour } 
                minute={ this.state.editedEvent.minute } 
                onInputChange={ val => this.handleEditEvent(val) } 
                onSave={ () => this.handleSaveEvent() }
                />
            </div>
        );
    }
}

export default App;