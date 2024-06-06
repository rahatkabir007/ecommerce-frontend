import Head from "next/head";
import React from "react";
// import { useSelector } from 'react-redux'

interface Props {
  title?: string;
  desc?: string;
  keyword?: string;
}

const SharedHead: React.FC<Props> = ({ title, desc, keyword: keywords }) => {
  // const states = useSelector(() => controller.states)

  return (
    <Head>
      {title ? (
        <>
          <title className="capitalize">{title + " - "}Shop Holic-E-Commerce</title>
          <meta
            property="og:title"
            content={title + " | Shop Holic-E-Commerce"}
            key="title"
          />
        </>
      ) : (
        <>
          <title className="capitalize">Shop Holic-E-Commerce</title>
          <meta property="og:title" content={"Shop Holic-E-Commerce"} key="title" />
        </>
      )}

      <meta name="description" content={desc} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Rahat" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
  );
};

export default SharedHead;
