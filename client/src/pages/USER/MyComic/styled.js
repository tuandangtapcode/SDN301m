import { Card } from "antd"
import styled from "styled-components"

export const ComicItemStyled = styled.div`
 /* background-color: white; */
 box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
 width: 300px;
 padding: 20px 16px;
 border-radius: 8px;
 cursor: pointer;
 &:hover {
  background-color: white;
 }
`

export const ImageStyled = styled.img`
border-radius: 8px;
width: 100%;
height: 300px;
`

export const CardStyled = styled(Card)`
position: relative;
background-color: transparent;
border-color: transparent;
.ant-card-body {
  margin-top: 20px;
  padding: 0;
}
.ant-card-meta-title {
  color: black;
  font-weight: 700;
}
.ant-card-meta-description {
  color: #8d8989;
  font-weight: 600;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}
.icon-preview {
  display: none;
}
&:hover .icon-preview {
  display: block;
  animation: iconFadeIn ease 0.5s;
}
`

