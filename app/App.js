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

    this._handleAppReady = this._handleAppReady.bind(this)
  }

  /* Events */

  async componentDidMount() {
    /* Listeners */

    Linking.addEventListener('url', this.handleAppLink)

    /* Setup */

    const token = await AsyncStorage.getItem('token')
    this.token = token
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

    /* Write to storage */
    const token = await AsyncStorage.setItem('token', data.token)
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
        <Scanner>{/* <Viewer /> */}</Scanner>
      </ApolloProvider>
    )
  }
}
