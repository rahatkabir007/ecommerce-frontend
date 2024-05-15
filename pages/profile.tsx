import React from 'react'
import { useSelector } from 'react-redux'
import { controller } from '../src/state/StateController'
import ProfilePage from '../components/pages/ProfilePage/ProfilePage';

interface Props {
}

const profile: React.FC<Props> = (props) => {

  const states = useSelector(() => controller.states)
  
  return (
    <ProfilePage />
  )
}

export default profile