import React from 'react'
import {
  Segment,
  Header
} from 'semantic-ui-react'
import { 
  Link,
  Redirect
} from 'react-router-dom'

const SuccessfulPayment = ({location: {state} }) => {
  if (state && state.transactionId){
    return(
      <Segment basic textAlign="center">
        <Header as="h1" color="green">Thanks a bunch for the purchase</Header>
        <p>You have been successfully charged: {state.amount}</p>
        <p>Your transaction ID is:</p>
        <Link to="/">Start Over</Link>
      </Segment>
    )
  } else { 
    return(<Redirect to="/" />)
  }
}

export default SuccessfulPayment