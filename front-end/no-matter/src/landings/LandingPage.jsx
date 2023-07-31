import React from 'react'
import { isMobile } from 'react-device-detect'
import MoblieLanding from './MoblieLanding'
import PCLanding from './PCLanding'

function LandingPage() {
    const renderItems = () => {
        if(isMobile) {
          return <MoblieLanding />
        }
          return <PCLanding />
      }
    
      return(
        <div>
          {renderItems()}
        </div>
      )
}

export default LandingPage