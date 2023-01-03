import React from 'react'
import Menu from './Menu'

export default function Base({
    title="My Title",
    description="My desription",
    className="bg-dark text-white py-2",
    children
}) {
  return (
    <div>
        <Menu></Menu>
        <div className='container-fluid'>
            <div className='jumbotron bg-dark text-white text-center'>
                <h2 className='display-4'>{title}</h2>
                <p className='lead'>{description}</p>
            </div>
        </div>
        
        <div className={className}>{children}</div>
        
        
       
    </div>
  )
}
