import React from 'react'
import { useSelector } from 'react-redux'
import AdminLogin from '../components/pages/AdminPage/AdminLogin/AdminLogin'
import { controller } from '../src/state/StateController'

interface Props {
}

const adminlogin: React.FC<Props> = (props) => {

    const states = useSelector(() => controller.states)

    return <AdminLogin />
}

export default adminlogin