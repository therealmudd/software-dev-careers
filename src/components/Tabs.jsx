import React from 'react';

const Tabs = ({children}) => {
  return (
    <ul className="nav nav-tabs">
      {children}
  </ul>
  )
}

export default Tabs;