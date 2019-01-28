import { Camera, Permissions, BarCodeScanner } from 'expo'
import React from 'react'
import { Mutation } from 'react-apollo'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Vibration,
} from 'react-native'
import gql from 'graphql-tag'

/* Style */

const style = StyleSheet.create({
  camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    position: 'absolute',
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  success: {
    backgroundColor: 'white',
    borderRadius: 50,
    borderColor: '#44C285',
    borderWidth: 3,
    color: '#44C285',
    fontSize: 14,
    textAlign: 'center',
    padding: 20,
  },
  error: {
    backgroundColor: 'white',
    borderRadius: 50,
    borderColor: '#FF5E85',
    borderWidth: 3,
    color: '#FF5E85',
    fontSize: 14,
    textAlign: 'center',
    padding: 20,
  },
})

const SuccessMark = ({ children }) => (
  <View style={style.success}>
    <Text style={{ fontFamily: 'worksans-regular' }}>{children}</Text>
  </View>
)

const ErrorMark = ({ childern }) => (
  <View style={style.error}>
    <Text style={{ fontFamily: 'worksans-regular' }}>{children}</Text>
  </View>
)

/* Scanner */

const validateMutation = gql`
  mutation Validate($id: ID!) {
    validateTicket(id: $id) {
      id
      owner {
        id
        email
      }
      event {
        id
        name
      }
    }
  }
`

/* Cache */
const cache = []

export default ({ children }) => (
  <Mutation mutation={validateMutation} errorPolicy="none">
    {(validate, { data, error, loading }) => (
      <React.Fragment>
        <Camera
          style={style.camera}
          type={Camera.Constants.Type.back}
          onBarCodeScanned={async ({ data }) => {
            if (loading || cache.includes(data)) return

            Vibration.vibrate(5)

            try {
              await validate({ variables: { id: data } })
              cache.push(data)
            } catch (err) {}
          }}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
        >
          {!loading && data && (
            <SuccessMark>{data.validateTicket.owner.email}</SuccessMark>
          )}
          {!loading && error && <ErrorMark>Nekaj je šlo narobe.</ErrorMark>}
        </Camera>
        <View style={style.container}>{children}</View>
      </React.Fragment>
    )}
  </Mutation>
)
