import React from 'react'
import { useSelector } from 'react-redux'
import FAQ from '../components/pages/FAQPage/FAQ'

import { controller } from '../src/state/StateController'

interface Props {
}

const faqPage: React.FC<Props> = (props) => {

    const states = useSelector(() => controller.states)

    return <FAQ />
}

export default faqPage