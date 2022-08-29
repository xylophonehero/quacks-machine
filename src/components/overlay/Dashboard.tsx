import React from 'react'

interface Props {
  children: React.ReactNode
}

const Dashboard = ({ children }: Props) => {
  return (
    <div className='dashboard'>
      {children}
    </div>
  )
}

export default Dashboard