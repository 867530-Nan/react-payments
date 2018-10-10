import React from 'react'
import {
  Dimmer, 
  Loader,
  Segment
} from 'semantic-ui-react'
import { setFlash } from '../reducers/flash'
import { connect } from 'react-redux'
import braintree from 'braintree-web-drop-in'
import BraintreeDropin from 'braintree-dropin-react'
import BraintreeSubmitButton from './BraintreeSubmitButton'
import axios from 'axios' 
import { Redirect } from 'react-router-dom'

class BraintreeDrop extends React.Component {
  state = {
    loaded: false,
    token: '',
    redirect: false, 
    transactionId: ''
  }

  componentDidMount(){
    axios.get('/api/braintree_token')
    .then( response => this.setState({ token: response.data, loaded: true }))
    .catch(res => this.props.dispatch(setFlash('Error With Payment', 'red')))
  }

  handlePaymentMethod = (payload) => {
    debugger
    const { amount } = this.props
    axios.post('/api/payment', {amount, ...payload})
    .then( response => {
      const { data: transactionId } = response
      this.setState({ redirect: true, transactionId })
    })
    .catch( response => {
      this.props.dispatch(setFlash('Error Posting Payment', 'red'))
      window.location.reload()
    })
  }

  render(){
    if (this.state.redirect){
      return(
        <Redirect 
          to={{
            pathname: "/successful_payment",
            state:{ amount: this.props.amount, transactionId: this.state.transactionId}
          }}
        />
      )
    }
    if (this.state.loaded){
      return(
        <Segment basic textAlign="center">
          <BraintreeDropin
            braintree={braintree}
            authorizationToken={this.state.token}
            handlePaymentMethod={this.handlePaymentMethod}
            renderSubmitButton={BraintreeSubmitButton}
          />
        </Segment>
      )
    } else {
      return(
        <Dimmer active>
          <Loader>Loading Payment Experience. Please wait...</Loader>
        </Dimmer>
      )
    }
  }
}

export default connect()(BraintreeDrop)