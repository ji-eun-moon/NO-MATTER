import React from 'react'
import { isMobile } from 'react-device-detect'
import MoblieLanding from './MoblieLanding.jsx'
import PCLanding from './PCLanding.jsx'

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