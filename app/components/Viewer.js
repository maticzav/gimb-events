import React from 'react'
import { Query } from 'react-apollo'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import gql from 'graphql-tag'

const style = StyleSheet.create({
  container: {
    flex: 1,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  notification: {
    backgroundColor: 'white',
    borderRadius: 50,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 20,
    paddingBottom: 20,
  },
  info: {
    fontFamily: 'worksans-regular',
    fontSize: 15,
  },
})

const viewerQuery = gql`
  query Viewer {
    viewer {
      id
      email
      isModerator
    }
  }
`

export default () => (
  <View style={style.container}>
    <View style={style.notification}>
      <Query
        query={viewerQuery}
        fetchPolicy="network-only"
        notifyOnNetworkStatusChange
      >
        {({ loading, error, data, refetch }) => (
          <TouchableOpacity onPress={() => refetch()} disabled={loading}>
            <Text style={style.info}>
              {(() => {
                if (loading) return 'Nalagam...'
                if (error) return 'Nekaj je šlo narobe.'
                if (!data.viewer) return 'Najprej se vpiši!'
                if (!data.viewer.isModerator) return 'Moraš biti moderator.'

                return data.viewer.email
              })()}
            </Text>
          </TouchableOpacity>
        )}
      </Query>
    </View>
  </View>
)
