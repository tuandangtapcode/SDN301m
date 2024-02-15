import styled from "styled-components"

export const LayoutAdminStyled = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
.menu-container {
  border: 1px solid #ddd;
  margin-right: 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.content-container {
  padding: 12px;
  /* height: 100%; */
}
.collapsed-menu {
  padding: 12px 20px;
}
`
