import React from 'react'

import checkLoggedIn from '../../../lib/checkLoggedIn'
import redirect from '../../../lib/redirect'

class EditEvent extends React.Component {
  static async getInitialProps(ctx) {
    const { loggedInUser } = await checkLoggedIn(ctx.apolloClient)

    if (!loggedInUser.viewer || !loggedInUser.viewer.isAdministrator) {
      redirect(ctx, '/')
    }

    return {}
  }

  render() {
    return <React.Fragment>hey</React.Fragment>
  }
}

export default EditEvent
