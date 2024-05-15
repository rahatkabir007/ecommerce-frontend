import React from "react";

interface Props {
  height?: string;
  width?: string;
  size?: number;
  path: string;
  viewBox?: string;
  fill?: string;
  xmlns?: string;
  style?: React.CSSProperties;
  pathFill?: string;
  className?: string;
  preserveAspectRatio?: string;
  stroke?: string;
  strokeLinecap?: string;
  ariaHidden?: boolean;
  focusable?: any;
  dataPrefix?: string;
  dataIcon?: string;
  role?: string;
  fillRule?: string;
  clipRule?: string;
}

const SvgIconRenderer: React.FC<Props> = (props) => {
  // const {} = useActions()
  // const {} = useAppState()
  const {
    width,
    height,
    path,
    style,
    viewBox,
    fill,
    xmlns,
    pathFill,
    className,
    preserveAspectRatio,
    stroke,
    ariaHidden,
    focusable,
    dataPrefix,
    dataIcon,
    role,
    fillRule,
    clipRule,
  } = props;

  return (
    <svg
      className={className}
      style={{ width: width, height: height, ...style }}
      viewBox={viewBox}
      fill={fill}
      xmlns={xmlns}
      stroke={stroke}
      preserveAspectRatio={preserveAspectRatio}
      aria-hidden={ariaHidden}
      focusable={focusable}
      data-prefix={dataPrefix}
      data-icon={dataIcon}
      role={role}>
      <path
        fill={pathFill ?? "#FFF"}
        d={path}
        fill-rule={fillRule}
        clip-rule={clipRule}
      />
    </svg>
  );
};

export default SvgIconRenderer;
