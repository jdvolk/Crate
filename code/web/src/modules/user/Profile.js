// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H3, H4 } from '../../ui/typography'
import Button from '../../ui/button'
import { grey, grey2 } from '../../ui/common/colors'

import ProfileForm from './ProfileForm'

// App Imports
import userRoutes from '../../setup/routes/user'
import { logout } from './api/actions'

// Component
class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalDisplay: false,
      user : props.user.details
    }
  }

  toggleModal = () => {
    let user = localStorage.getItem('user')
    this.setState((prevState) => {
      return {
        modalDisplay: !prevState.modalDisplay,
        user : JSON.parse(user)
      }
    })
  }

  render() {
    return (
      <div>
    {/* SEO */}
    <Helmet>
      <title>My Profile - Crate</title>
    </Helmet>

    {/* Top title bar */}
    <Grid style={{ backgroundColor: grey }}>
      <GridCell style={{ padding: '2em', textAlign: 'center' }}>
        <H3 font="secondary">My profile</H3>
      </GridCell>
    </Grid>

    {!this.state.modalDisplay ?
    <Grid>
      <GridCell style={{ padding: '2em', textAlign: 'center' }}>
        <H4 style={{ marginBottom: '0.5em' }}>{this.props.user.details.name}</H4>
        <div 
          style={{ height: '200px', width: '200px', overflow: 'hidden', margin: '0 auto'}}
        >
          <img src={this.state.user.image || this.props.user.details.image} alt='your profile image' style={{height: '200px', borderRadius: '15px'}}/><br />
        </div>
        <p style={{ color: grey2, marginBottom: '2em', marginTop: '2em' }}>{this.props.user.details.email}</p>
        <p style={{ color: grey2, marginBottom: '2em' }}>{this.props.user.details.shipping_address}</p>
        <p style={{ color: grey2, marginBottom: '2em' }}>{this.props.user.details.city}, {this.props.user.details.state} {this.props.user.details.zip}</p>
        <p style={{ color: grey2, marginBottom: '2em' }}>{this.props.user.details.description}</p>
        <Button theme="primary" style={{ marginRight: '1em' }} onClick={this.toggleModal}>Update Profile</Button>

        <Link to={userRoutes.subscriptions.path}>
          <Button theme="primary">Subscriptions</Button>
        </Link>

        <Button theme="secondary" onClick={this.props.logout} style={{ marginLeft: '1em' }}>Logout</Button>
      </GridCell>
    </Grid> : null}
    {this.state.modalDisplay ? 
    <Grid>
      <ProfileForm 
        submit={this.submit}
        toggleModal={this.toggleModal}
      />
    </Grid> 
    : null}
  </div>
    )
  }
}

// Component Properties
Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

// Component State
function profileState(state) {
  return {
    user: state.user
  }
}

export default connect(profileState, { logout })(Profile)
