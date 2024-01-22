import { Input } from "antd"
import styled from "styled-components"

export const HeaderContainerStyled = styled.div`
  background-image: linear-gradient(to right,#FF7854 0%,#FF5079 100%);
  line-height: 90px;
  a {
    color: black;
  }
`

export const HeaderStyled = styled.div`
  max-width: 70%;
  margin: auto;
`

export const InputHeaderStyled = styled(Input)`
background-color: white;
width: 400px;
border-color: transparent;
border-radius: 12px;
&:hover {
  border-color: white !important;
}
&:focus-within {
  border-color: white !important;
}
.ant-input {
  background-color: #242424;
  margin-left: 8px;
  color: white;
}
.ant-input::placeholder {
  color: #999 !important;
}
.ant-input:focus {
  caret-color: black;
}
`