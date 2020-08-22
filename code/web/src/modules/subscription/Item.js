// Imports
import React, { PureComponent, useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// UI Imports
import Card from '../../ui/card/Card'
import Button from '../../ui/button/Button'
import H4 from '../../ui/typography/H4'
import Icon from '../../ui/icon'
import { white, grey2, black } from '../../ui/common/colors'

// App Imports
import { APP_URL } from '../../setup/config/env'
import { messageShow, messageHide } from '../common/api/actions'
import { remove, getListByUser } from '../subscription/api/actions'

// Component
class Item extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      isLoading: false
    }
  }

  onClickUnsubscribe = (id) => {
    // opens a confirm window to check if the user really wants to unsubscribe 
    let check = confirm('Are you sure you want to unsubscribe to this crate?')

    // if the user says yes to unsubscribe, sets the state to loading while the api call happens  
    if(check) {
      this.setState({
        isLoading: true
      })

      // calls the messageShow method to show the following message while loading 
      this.props.messageShow('Subscribing, please wait...')

      // calls the remove method to remove the subscription based on its id (api call)
      this.props.remove({id})
        .then(response => {
          // if it is unsuccessful, show an error message 
          // if it is successful, show successful unsubscribe message 
          if (response.data.errors && response.data.errors.length > 0) {
            this.props.messageShow(response.data.errors[0].message)
          } else {
            this.props.messageShow('Unsubscribed successfully.')

            // calls the getListByUser action 
            this.props.getListByUser()
          }
        })
        // if there is an error from the api call, shows an error message using messageShow 
        .catch(error => {
          this.props.messageShow('There was some error subscribing to this crate. Please try again.')
        })
        // once the api call is complete, changes the state so the component is loaded 
        .then(() => {
          this.setState({
            isLoading: false
          })

          // after 5000 milliseconds, calls the messageHide action 
          window.setTimeout(() => {
            this.props.messageHide()
          }, 5000)
        })
    }
  }

  render() {

    // things from the store that the component needs access to to render 
    const { id, crate, createdAt } = this.props.subscription
    const { isLoading } = this.state

    return (
      <Card style={{ width: '18em', backgroundColor: white }}>
        <p style={{ padding: '2em 3em 0 3em' }}>
          <img src={`${ APP_URL }/images/crate.png`} alt={ crate.name } style={{ width: '100%' }}/>
        </p>

        <div style={{ padding: '1em 1.2em' }}>
          <H4 font="secondary" style={{ color: black }}>{ crate.name }</H4>

          <p style={{ color: grey2, marginTop: '1em' }}>{ crate.description }</p>

          <p style={{ textAlign: 'center', marginTop: '1.5em', marginBottom: '1em' }}>
            <Button
              theme="secondary"
              // not 100% clear on why this is bound, but on click this calls the method above 
              // and if the component is loading, it is disabled 
              onClick={this.onClickUnsubscribe.bind(this, id)}
              type="button"
              disabled={ isLoading }
            >
              <Icon size={1.2} style={{ color: white }}>remove_circle_outline</Icon> Unsubscribe
            </Button>
          </p>

          <p style={{ color: grey2, marginTop: '1em', fontSize: '0.8em', textAlign: 'center' }}>
            Subscribed on { new Date(parseInt(createdAt)).toDateString() }
          </p>
        </div>
      </Card>
    )
  }
}

// Component Properties
Item.propTypes = {
  subscription: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
  getListByUser: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired,
  messageHide: PropTypes.func.isRequired
}

// Component State
function itemState(state) {
  return {
    user: state.user
  }
}
/*
connects the component to the store:
itemState is mapStateToProps
the object is mapDispatchToProps
*/
export default connect(itemState, { remove, getListByUser, messageShow, messageHide })(withRouter(Item))
