import { Col, Row } from "antd"
import { FooterContainerStyled, FooterStyled } from "./styled"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <FooterContainerStyled>
      <FooterStyled>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <p className="text-matte fs-18 mb-18">Library</p>
            <p className="mb-10">
              <Link to={'/genres'}>Genres</Link>
            </p>
            <p className="mb-12">
              <Link>Languages</Link>
            </p>
            <p className="mb-10">
              <Link to={'/authors'}>Authors</Link>
            </p>
          </Col>
          <Col span={6}>
            <p className="text-matte fs-18 mb-18">Community</p>
            <p className="mb-10">
              <Link>Articles</Link>
            </p>
            <p className="mb-10">
              <Link>Authors Interviews</Link>
            </p>
            <p className="mb-10">
              <Link>Newsletter</Link>
            </p>
          </Col>
          <Col span={6}>
            <p className="text-matte fs-18 mb-18">Company</p>
            <p className="mb-10">
              <Link>Authors Services</Link>
            </p>
            <p className="mb-10">
              <Link>About / Contact</Link>
            </p>
            <p className="mb-10">
              <Link>Accessibility Statement</Link>
            </p>
          </Col>

          <Col span={6}>
            <p className="text-matte fs-18 mb-18">Folow</p>
            <p className="mb-10">
              <Link>Facebook</Link>
            </p>
            <p className="mb-10">
              <Link>Twitter</Link>
            </p>
            <p className="mb-12">
              <Link>Instagram</Link>
            </p>
          </Col>
        </Row>
        <hr></hr>
        <div className="d-flex-sb">
          <div className="d-flex-sb">
            <img style={{ width: '20px', height: '20px' }} src="logoApp.png" alt="" />
            <span className="text-matte">
              © 2024 Advertical Media LLC. All Rights Reserved.
            </span>
          </div>
          <div>
            <Link className="text-matte">Term</Link>
            <span className="text-matte">-</span>
            <Link className="text-matte">Privacy</Link>
          </div>
        </div>
      </FooterStyled>
    </FooterContainerStyled>
  );
}

export default Footer;