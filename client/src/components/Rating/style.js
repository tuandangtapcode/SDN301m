import styled from "styled-components";

export const PageStyles = styled.div`
  .ant-table td {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  :where(.css-dev-only-do-not-override-i1mju1).ant-tabs
    .ant-tabs-tab.ant-tabs-tab-active
    .ant-tabs-tab-btn {
    color: #ff5079;
    font-size: large;
    font-weight: 600;
  }
  :where(.css-dev-only-do-not-override-i1mju1).ant-tabs-card
    > .ant-tabs-nav
    .ant-tabs-tab,
  :where(.css-dev-only-do-not-override-i1mju1).ant-tabs-card
    > div
    > .ant-tabs-nav
    .ant-tabs-tab {
    padding: 8px 29px;
  }
`;
