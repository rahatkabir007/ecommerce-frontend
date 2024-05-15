import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import Breadcrumb from "../SharedBreadcrumb/Breadcrumb";

interface Props {
  slug: string;
  link: string;
  title: string;
}

const PageHeader: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  const { slug, link, title } = props;

  return (
    <div className="w-full bg-[#FFFAEF] h-[173px] py-10">
      <div className="container-x mx-auto">
        <Breadcrumb slug={slug} link={link} />
        <div className="flex justify-center">
          <h1 className="text-3xl font-semibold text-qblack">{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
