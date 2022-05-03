import styled from "@emotion/styled";
import React from "react";

function MainContainer({ content, sidebar, children }) {
  return (
    <Container className="main-container container">
      <div className="content-wrapper padding-top-half padding-bottom-2">
        {content || children}
      </div>
      <div className="sidebar-wrapper padding-top-half padding-bottom-2">
        {sidebar}
      </div>
    </Container>
  );
}

const Container = styled.section`
  --sidebar-desktop-width: 330px;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  overflow-x: hidden;
  .content-wrapper {
    width: 100%;
  }
  .sidebar-wrapper {
    width: 100%;
  }
  @media (min-width: 1000px) {
    flex-direction: row;
    .content-wrapper {
      padding-right: 3rem;
      border-right: 1px solid #ececec;
      width: calc(100% - var(--sidebar-desktop-width));
    }
    .sidebar-wrapper {
      padding-left: 3rem;
      width: var(--sidebar-desktop-width);
    }
  }
`;

export default MainContainer;
