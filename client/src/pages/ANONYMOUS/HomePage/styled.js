import styled from "styled-components"

export const SildeStyled = styled.div`
  position: relative;
  .slick-prev:before,
  .slick-next:before {
    display: block;
    color: black;
  }
  .slick-prev:after,
  .slick-next:after {
    display: block;
    color: black;
  }
  .slick-prev {
    left: 0px;
    z-index: 10;
    background: transparent;
    display: block;
  }
  .slick-next {
    right: 0;
    z-index: 10;
    background: transparent;
  }
`