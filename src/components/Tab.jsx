import React from 'react';

const Tab = ({children, onClick, isActive}) => {
  return (
    <li className="nav-item">
      <a className={"nav-link" + (isActive ? " active" : "")} href="" aria-current={isActive ? "page" : ""} onClick={(e)=>{
        e.preventDefault();
        onClick && onClick();
      }}>{isActive ? <strong>{children}</strong> : children}</a>
    </li>
  )
}

export default Tab;