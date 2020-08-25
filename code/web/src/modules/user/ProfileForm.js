// Imports
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H3, H4 } from '../../ui/typography'
import Button from '../../ui/button'
import { grey, grey2 } from '../../ui/common/colors'

// App Imports 
import userRoutes from '../../setup/routes/user'

// Component
class ProfileForm extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      email: props.user.details.email,
      address: props.user.details.shippingAddress,
      city: props.user.details.city,
      state: props.user.details.state,
      zip: props.user.details.zip
    }
  }

  render() {
    return (
      <Grid style={{ padding: '2em', textAlign: 'center' }}>
        <form style={{ padding: '2em', textAlign: 'center' }}>
          <H4>Edit My Profile</H4>
          <p>Email:</p>
          <input 
            type='email' 
            placeholder={this.props.user.details.email}
          />
          <br />
          <p>Address:</p>
          <input 
            type='text' 
            placeholder={this.props.user.shippingAddress}
          />
          <br />
          <p>City:</p>
          <input 
            type='text' 
            placeholder={this.props.user.city}
          />
          <br />
          <p>State:</p>
          <input 
            type='text' 
            placeholder={this.props.user.state}
          />
          <br />
          <p>Zip Code:</p>
          <input 
            type='text' 
            placeholder={this.props.user.zip}
          />
          <br />
          <p>Description:</p>
          <textarea placeholder={this.props.user.description}></textarea><br />
          <Button theme="secondary" style={{ marginRight: '1em' }} onClick={this.props.toggleModal}>Cancel</Button>
          <Button theme="primary" onClick={this.props.submit}>Save</Button>
        </form>
      </Grid>
    )
  }
}

// export default ProfileForm

// Component Properties
ProfileForm.propTypes = {
  user: PropTypes.object.isRequired
}

// Component State
function profileFormState(state) {
  return {
    user: state.user
  }
}

export default connect(profileFormState)(ProfileForm)