import React from 'react'
import { useSelector } from 'react-redux'
import { controller } from '../../../src/state/StateController'
import PageHeader from '../../shared/SharedPageHeader/PageHeader'

interface Props {
}

const SellerTermsAndCondition: React.FC<Props> = (props) => {

    const states = useSelector(() => controller.states)

    return (
        <div className='bg-white'>
            <PageHeader slug="Seller Terms And Conditions" link="/sellertermsandconditions" title="Seller Terms and Condition" />
            <div className='w-full min-h-screen mt-10 pt-0 pb-0'>
                <div className='container-x mx-auto'>
                    <p className='text-sm text-qgray leading-8 '>
                        <span className='text-sm text-qgray py-2 leading-8 font-bold'>“Terms and Conditions</span>
                        ” means these “General Terms and Conditions for the Sale of Products or Services”, together with any modifications or additional provisions specifically stated in Seller’s final quotation or specifically agreed upon by Seller in writing.
                        <br />
                        <span>2. Delivery and Shipping Terms.</span>
                        <br />
                        <span>(a) For shipments that do not involve export Seller shall deliver Products to Buyer F.O.B. shipping point. For export shipments, Seller shall deliver Products to Buyer EXW Seller’s facility or warehouse (Incoterms 2010). Buyer shall pay all delivery costs and charges or pay Seller’s standard shipping charges plus handling. Partial deliveries are permitted. Seller may deliver Products in advance of the delivery schedule. Delivery times are approximate and are dependent upon prompt receipt by Seller of all information necessary to proceed with the work without interruption. If Products delivered do not correspond in quantity, type or price to those itemized in the shipping invoice or documentation, Buyer shall so notify Seller within ten (10) days after receipt.</span>
                        <br />
                        <span>(b) For shipments that do not involve export, title to Products shall pass to Buyer upon delivery in accordance with Section 2(a). For export shipments from a Seller facility or warehouse outside the U.S., title shall pass to Buyer upon delivery in accordance with Section 2(a). For shipments from the U.S. to another country, title shall pass to Buyer immediately after each item departs from the territorial land, seas and overlying airspace of the U.S. The 1982 United Nations Convention of the law of the Sea shall apply to determine the U.S. territorial seas. For all other shipments, title to Products shall pass to Buyer the earlier of (i) the port of export immediately after Products have been cleared for export or (ii) immediately after each item departs from the territorial land, seas and overlying airspace of the sending country. When Buyer arranges the export shipment, Buyer will provide Seller evidence of exportation acceptable to the relevant tax and custom authorities.</span>
                        <br />
                        <span>
                            (c) Risk of loss shall pass to Buyer upon delivery pursuant to Section 2(a), except that for export shipments from the U.S., risk of loss shall transfer to Buyer upon title passage.
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SellerTermsAndCondition