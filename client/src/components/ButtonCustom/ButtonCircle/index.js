import { ButtonCicleStyled } from "./styled";

const ButtonCircle = (props) => {
  return (
    <ButtonCicleStyled
      {...props}
    >
      {props?.children}
    </ButtonCicleStyled>
  );
}

export default ButtonCircle;