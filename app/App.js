import { Font, ScreenOrientation, AppLoading, Linking, Permissions } from 'expo'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { AsyncStorage } from 'react-native'

import Scanner from './components/Scanner'
import Viewer from './components/Viewer'

import { create } from './lib/initApollo'

export default class App extends React.Component {
  state = { ready: false }
  apolloClient = null
  token = null

  constructor(props) {
    super()

    this.apolloClient = create({
      getToken: () => this.token,
    })

    this.handleAppLink = this.handleAppLink.bind(this)
  }

  /* Events */

  async componentDidMount() {
    /* Listeners */

    Linking.addEventListener('url', this.handleAppLink)

    /* Load token from storage */

    const token = await AsyncStorage.getItem('token')

    if (token) {
      this.token = token
    }

    /* Load token from URL */

    const url = await Linking.getInitialURL()
    this.handleAppLink({ url })
  }

  componentWillUnmount() {
    /* Listeners */
    Linking.removeEventListener('url', this.handleAppLink)
  }

  /* App Setup */

  _handleAppReady = () => {
    this.setState({ ready: true })
  }

  async _setup() {
    const fonts = Font.loadAsync({
      'worksans-regular': require('./assets/fonts/WorkSans-Regular.ttf'),
    })
    const orientation = ScreenOrientation.allowAsync(
      ScreenOrientation.Orientation.PORTRAIT_UP,
    )
    const camera = Permissions.askAsync(Permissions.CAMERA)

    await Promise.all([fonts, orientation, camera])
  }

  /* Linking */

  async handleAppLink(event) {
    const data = Linking.parse(event.url)
    const token = data.queryParams.token

    /* Write to storage */
    if (token) {
      await AsyncStorage.setItem('token', token)
      this.token = token
    }
  }

  /* Render */

  render() {
    if (!this.state.ready) {
      return (
        <AppLoading
          startAsync={this._setup}
          onFinish={this._handleAppReady}
          onError={console.error}
        />
      )
    }

    return (
      <ApolloProvider client={this.apolloClient}>
        <Scanner>
          <Viewer />
        </Scanner>
      </ApolloProvider>
    )
  }
}
