import React from "react";
import styled from "styled-components";

const TitleWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
  &:after {
    position: absolute;
    content: "";
    height: 2px;
    width: 100%;
    bottom: -2px;
    left: 0;
    background: ${(props) => props.color};
  }
`;

const WidgetTitle = ({ title, color }) => (
  <TitleWrapper color={color}>
    <div className="widget-title" style={{ backgroundColor: color }}>
      {title}
    </div>
  </TitleWrapper>
);
export default WidgetTitle;
