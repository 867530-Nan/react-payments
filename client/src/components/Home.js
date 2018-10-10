import React, { Component } from 'react';
import { 
  Header,
  Segment, 
  Input, 
  Label,
  Divider,
  Image
  } from 'semantic-ui-react';
import BraintreeDrop from './BraintreeDrop'


class Home extends Component {
  state = { 
    amount: 150.52
  }


  render() {
    return (
      <Segment
        basic
        textAlign="center"
      >
        <Header as="h1" textAlign="center">React Payments</Header>
        <Image
          centered
          size="small"
          src="http://www.homedeliveryscript.com/uploads/general-store.png"
        />
        <Label color="green">Payment Amount</Label>
        <Input value={this.state.amount} disabled style={{fontSize: '18px'}}/>
        <Divider/>
        <BraintreeDrop amount={this.state.amount} />
      </Segment>
    );
  }
}

export default Home;

