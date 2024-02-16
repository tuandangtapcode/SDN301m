import Footer from "src/components/Footer"
import MainHeader from "src/components/Header"
import styled from "styled-components"


const ContentStyled = styled.div`
max-width: 70%;
margin: auto;
`

const MainLayout = ({ children }) => {
  return (
    <div>
      <MainHeader />
      <ContentStyled>
        {children}
      </ContentStyled>
      <Footer />
    </div>
  )
}

export default MainLayout