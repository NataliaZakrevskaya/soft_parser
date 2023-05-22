import React, {useEffect, useState} from 'react'
import './static/css/global.scss'
import {useWindowSize} from "./utils/hooks/useWindowSize";
import Pc from "./components/Versions/PC/PC";
import {Helmet} from "react-helmet";
import Mobile from "./components/Versions/Mobile/Mobile";

export const App: React.FC = () => {

  const [isMobile, setIsMobile] = useState(false)
  const [fullVersion, setFullVersion] = useState(false)

  const {width} = useWindowSize()
  const changeVersion = () => setFullVersion(!fullVersion)

  useEffect(() => {
    width > 639 ? setIsMobile(false) : setIsMobile(true)
  }, [width])

  return (
    <div className="appContainer">
      <Helmet>
        <meta name="viewport"
              content={fullVersion ? "width=device-1920, initial-scale=0.25, min-scale=0.2, max-scale=1" : "width=device-width, initial-scale=1"}/>
        <title>{fullVersion ? 'full version' : 'mobile version'}</title>
      </Helmet>
      {isMobile && !fullVersion ? (
        <Mobile changeVersion={changeVersion} fullVersion={fullVersion}/>
      ) : (
        <Pc
          changeVersion={changeVersion}
          fullVersion={fullVersion}
          isMobile={isMobile}
        />
      )}
    </div>
  )
}

export default App