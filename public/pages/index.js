import React from 'react'

import HeroMessage from '../components/HeroMessage'

import Feed from '../sections/Feed'
import Footer from '../sections/Footer'

export default () => (
  <React.Fragment>
    <HeroMessage success>
      Za rezervacijo kart se moraš najprej prijavit. To narediš tako, da
      izpolniš spodnji obrazec in nato odpreš svoj šolski email račun, kamor je
      bil poslan url s katerim se lahko vpišeš.
    </HeroMessage>
    <HeroMessage warning>
      Pred rezervacijo kart moraš pridobiti dovoljenje profesorja. Zaradi
      nameren izostanek od predavanja lahko dobiš tudi neopravičene ure.
    </HeroMessage>
    <Feed />
    <Footer />
  </React.Fragment>
)
