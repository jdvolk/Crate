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
import { updateUser } from './api/actions'

// Component
class ProfileForm extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      name: props.user.details.name,
      email: props.user.details.email,
      image: props.user.details.image,
      shipping_address: props.user.details.shipping_address,
      city: props.user.details.city,
      state: props.user.details.state,
      zip: props.user.details.zip,
      description: props.user.details.description
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    updateUser(this.state)
    this.props.toggleModal()
  }

  render() {
    return (
      <GridCell style={{ padding: '2em', textAlign: 'center' }}>
        <form onSubmit={this.onSubmit}>
          <H4>Edit My Profile</H4>
          <p style={{ color: grey2 }}>Email:</p>
          <input 
            type='email' 
            placeholder={this.props.user.details.email}
            onChange={this.handleChange}
            value={this.state.email || ''}
            name='email'
          />
          <br />
          <p style={{ color: grey2 }}>Profile Image:</p>
          <input 
            type='text' 
            placeholder={this.props.user.details.image}
            onChange={this.handleChange}
            value={this.state.image || ''}
            name='image'
          />
          <br />
          <p style={{ color: grey2 }}>Address:</p>
          <input 
            type='text' 
            placeholder={this.props.user.shipping_address}
            onChange={this.handleChange}
            value={this.state.shipping_address || ''}
            name='shipping_address'
          />
          <br />
          <p style={{ color: grey2 }}>City:</p>
          <input 
            type='text' 
            placeholder={this.props.user.city}
            onChange={this.handleChange}
            value={this.state.city || ''}
            name='city'
          />
          <br />
          <p style={{ color: grey2 }}>State:</p>
          <input 
            type='text' 
            placeholder={this.props.user.state}
            onChange={this.handleChange}
            value={this.state.state || ''}
            name='state'
          />
          <br />
          <p style={{ color: grey2 }}>Zip Code:</p>
          <input 
            type='text' 
            placeholder={this.props.user.zip}
            onChange={this.handleChange}
            value={this.state.zip || ''}
            name='zip'
          />
          <br />
          <p style={{ color: grey2 }}>Description:</p>
          <textarea 
            placeholder={this.props.user.description}
            onChange={this.handleChange}
            value={this.state.description || ''}
            name='description'>
          </textarea>
          <br />
          <Button theme="secondary" style={{ marginRight: '1em' }} onClick={this.props.toggleModal}>Cancel</Button>
          <Button type="submit" theme="primary">Save</Button>
        </form>
      </GridCell>
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

//export default connect(profileFormState)(ProfileForm)
export default connect(profileFormState, { updateUser })(ProfileForm)