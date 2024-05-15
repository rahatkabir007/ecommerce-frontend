import React from 'react'
import { useSelector } from 'react-redux'
import Contact from '../components/pages/ContactPage/Contact'
import { controller } from '../src/state/StateController'

interface Props {
}

const contactPage: React.FC<Props> = (props) => {

    const states = useSelector(() => controller.states)

    return <Contact />
}

export default contactPage