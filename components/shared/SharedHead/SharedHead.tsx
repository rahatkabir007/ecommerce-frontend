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
          <title className="capitalize">{title + " - "}Shopo-E-Commerce</title>
          <meta
            property="og:title"
            content={title + " | Shopo-E-Commerce"}
            key="title"
          />
        </>
      ) : (
        <>
          <title className="capitalize">Shopo-E-Commerce</title>
          <meta property="og:title" content={"Shopo-E-Commerce"} key="title" />
        </>
      )}

      <meta name="description" content={desc} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Rich IT" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
  );
};

export default SharedHead;
