import React from "react";
import { SvgXml } from "react-native-svg";
import { widthToDp } from "../../utils/responsive";

export default (props: { width: number; height: number; fill?: string }) => (
  <SvgXml
    xml={`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.7589 9.77466L19.1865 16.2023L12.7589 22.6299" stroke=${
      props.fill ? props.fill : "#999CA0"
    }  stroke-width="0.952239" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `}
    width={widthToDp(props.width)}
    height={widthToDp(props.height)}
  />
);
