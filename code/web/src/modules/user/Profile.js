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

// App Imports
import userRoutes from '../../setup/routes/user'
import { logout } from './api/actions'

// Component
class Profile extends React.Component {
  constructor() {
    super()
    this.state = {}
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

    <Grid>
      <GridCell style={{ padding: '2em', textAlign: 'center' }}>
        <H4 style={{ marginBottom: '0.5em' }}>{this.props.user.details.name}</H4>

        <img src='' alt='your profile image'/><br />
        <Button theme="primary" style={{ margin: '0.5em' }}>Update Image</Button>


        <p style={{ color: grey2, marginBottom: '2em' }}>{this.props.user.details.email}</p>
        <p style={{ color: grey2, marginBottom: '2em' }}>{this.props.user.details.shippingAddress} address</p>
        <p style={{ color: grey2, marginBottom: '2em' }}>{this.props.user.details.city}city, {this.props.user.details.state}state {this.props.user.details.zip}zip</p>
        <p style={{ color: grey2, marginBottom: '2em' }}>{this.props.user.details.description}description</p>
        <Button theme="primary" style={{ marginRight: '1em' }} onClick={this.toggleModal}>Update Profile</Button>

        <Link to={userRoutes.subscriptions.path}>
          <Button theme="primary">Subscriptions</Button>
        </Link>

        <Button theme="secondary" onClick={this.props.logout} style={{ marginLeft: '1em' }}>Logout</Button>
      </GridCell>
    </Grid>
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
