import styled from "styled-components"

export const GenresStyled = styled.div`
border: 1px solid #ddd;
.title-header {
  color: #2980b9;
  font-size: 20px;
  font-weight: 600;
  padding: 12px 8px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}
.title-header-2 {
  color: #db6784;
  font-weight: 600;
  padding: 12px 8px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}
.active {
  color: #db6784;
}
`
export const RowStyled = styled.div`
padding: 12px 8px;
border-bottom: 1px solid #ddd;
cursor: pointer;
&:hover {
  color: #db6784;
}
`

export const DivBorder = styled.div`
padding: 12px 8px;
border: 1px solid #ddd;
margin-bottom: 30px;
`