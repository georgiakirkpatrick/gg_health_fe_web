import React from "react";
import Store from "./js/store/index.js";
import { connect } from "react-redux";

// The purpose of this Component
// is to display the Logged in user's
// practice and locations, and allow them to update
// that information, if needed.

// In the future it will allow them to check their calender
// Payments, client notes et c.

class ManagerDash extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    // dispatch(fetchUserLocations());
  }
  render() {
    return (
      <div>
        <h3>Manager Dashboard!</h3>
        <p>Practice Information</p>
        <p>Your Locations</p>
        <p>View/Manage Practitioners</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { locations } = state.locations;

  return { locations };
}

export default connect(mapStateToProps)(ManagerDash);