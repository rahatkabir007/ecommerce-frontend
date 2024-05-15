import Link from "next/link";
import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
interface Props {}
const PaymentSuccess: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-col items-center mt-[5%] h-screen ">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
        <div className="flex items-center justify-center mb-4">
          <AiFillCheckCircle className="h-10 w-10 text-green-500" />
          <h2 className="text-2xl font-bold ml-2">Payment Successful</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Thank you for your payment! Your transaction has been processed
          successfully.
        </p>
        <Link href="/">
          <button className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors duration-300">
            Return to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
