import React, { Component } from 'react';
import axios from 'axios';
import { Card, Button, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { AuthConsumer } from '../../providers/AuthProvider';
import { withRouter, } from 'react-router-dom';
import EventForm from './EventForm';
import EventCalendar from './EventCalendar';



const Left = styled.div`
  margin-right: 30%;
`
const Right = styled.div`
  width: 30%;
  float: right;
  top: 0;
  padding: 20px;
`


class EventIndex extends Component {

  state = { events: [], editing: false }

  toggleEdit = () => this.setState({ editing: !this.state.editing })

  componentDidMount(){
    axios.get('/api/events')
    .then(res => {
      this.setState({ events: res.data })
    })
    .catch(err => {
      console.log(err)
    })
  }

  addEvent = (event) => {
     axios.post('/api/events', { event })
       .then( res => {
         const { events } = this.state
         this.setState({ events: [...events, res.data] })
       })
       .catch( err => {
         console.log(err)
       })
   }

   updateEvent = (id, event) => {
     axios.put(`/api/events/${id}`, { event } )
       .then( res => {
         const e = this.state.events.map( e => {
           if (e.id === id)
             return res.data
           return e
         })
         this.setState({ e })
       })
       .catch( err => {
         console.log(err)
       })
   }

   deleteEvent = (id) => {
     axios.delete(`/api/events/${id}`)
       .then( res => {
         alert(res.data.message)
         const { events } = this.state
         this.setState({ events: events.filter( e => e.id !== id) })
       })
   }

  renderEvents = () => {
    const { events, editing } = this.state
    const { auth: { user } } = this.props
    return(
      <Left>
        {events.map(e =>
          <div key={e.id}>
            {
              editing ?
                <EventForm
                update={this.updateEvent}
                toggleEdit={this.toggleEdit}
                id={e.id}
                />
              :
              <Card>
                <p>{e.title}</p>
                <p>{e.date}</p>
                <p>{e.location}</p>
                <a href={e.link} target="_blank" rel="noopener noreferrer">Website</a>
                {
                  user ?
                    user.role === 'admin' ?
                    <div>
                      <Button onClick={this.toggleEdit}>
                        <Icon name='pencil' />
                      </Button>
                      <Button onClick={ () => this.deleteEvent(e.id) }>
                        <Icon name='trash' />
                      </Button>
                    </div>
                    :
                    <div></div>
                  :
                  <div></div>
                }

              </Card>
            }
          </div>
        )}
      </Left>
    )
  }

	render() {
    const { auth: { user } } = this.props
		return(
      <div>
        {
          user ?
            user.role === 'admin' ?
              <div>
              <Right>
                <h1>Add Event</h1>
                <EventForm add={this.addEvent}/>
              </Right>
              </div>
            :
            <div></div>
          :
          <div></div>
        }
        <div style={{
        height: '550px',
        backgroundColor: 'white',
        boxShadow: '5px 5px 5px 5px #000000',
        color: 'white'}}>
          <EventCalendar events={this.state.events} />
        </div>
      </div>
    )
	}

}

export class ConnectedEvents extends Component {
  render() {
    return (
      <AuthConsumer>
        { auth =>
          <EventIndex { ...this.props } auth={auth} />
        }
      </AuthConsumer>
    )
  }
}
export default withRouter(ConnectedEvents);
