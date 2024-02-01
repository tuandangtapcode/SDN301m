import { useState } from "react"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import { Popover } from "antd"
import { Link } from "react-router-dom"
import styled from "styled-components"

const LinkStyled = styled(Link)`
color: black;
`

const PopoverMain = () => {

  const [arrowDropdownMain, setArrowDropdownMain] = useState(false)

  const content = (
    <div style={{ width: '600px', padding: '12px' }} className="d-flex-sb">
      <div>
        <p className="fs-25 fw-700">Genres</p>
        <div className="d-flex-sb">
          <div className="mr-30">
            <p className="fs-18">
              <LinkStyled to={'/genres/1'}>Action & Adventure</LinkStyled>
            </p>
            <p className="fs-18">
              <LinkStyled to={'/genres/1'}>Bios & History</LinkStyled>
            </p>
            <p className="fs-18">
              <LinkStyled to={'/genres/1'}>Children's</LinkStyled>
            </p>
            <p className="fs-18">
              <LinkStyled to={'/genres/1'}>Fantasy</LinkStyled>
            </p>
            <p className="fs-18">
              <LinkStyled to={'/genres/1'}>Historical Fiction</LinkStyled>
            </p>
            <p className="fs-18">
              <LinkStyled to={'/genres/1'}>Horror</LinkStyled>
            </p>
          </div>
          <div>
            <p className="fs-18">
              <LinkStyled to={'/genres/1'}>Literay Fiction</LinkStyled>
            </p>
            <p className="fs-18">
              <LinkStyled to={'/genres/1'}>Mystery & Thriller</LinkStyled>
            </p>
            <p className="fs-18">
              <LinkStyled to={'/genres/1'}>Non-Fiction</LinkStyled>
            </p>
            <p className="fs-18">
              <LinkStyled to={'/genres/1'}>Romance</LinkStyled>
            </p>
            <p className="fs-18">
              <LinkStyled to={'/genres/1'}>Science Fiction</LinkStyled>
            </p>
            <p className="fs-18">
              <LinkStyled to={'/genres/1'}>Young Adult</LinkStyled>
            </p>
          </div>
        </div>
      </div>

      <div>
        <p className="fs-25 fw-700">Resoures</p>
        <div>
          <p className="fs-18">
            <LinkStyled to={'/authors'}>Authors</LinkStyled>
          </p>
          <p className="fs-18">
            <LinkStyled>Languages</LinkStyled>
          </p>
          <p className="fs-18">
            <LinkStyled to={'/genres'}>Genres</LinkStyled>
          </p>
          <p className="fs-18">
            <LinkStyled>Articles</LinkStyled>
          </p>
          <p className="fs-18">
            <LinkStyled>Author Interviews</LinkStyled>
          </p>
          <p className="fs-18">
            <LinkStyled>Discuss</LinkStyled>
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <Popover
      content={content}
      trigger='click'
      placement="bottomLeft"
      arrow={false}
      className="mt-15"
    >
      <ButtonCustom
        className="normal noBackground"
        icon={arrowDropdownMain ? <CaretUpOutlined /> : <CaretDownOutlined />}
        onClick={() => setArrowDropdownMain(!arrowDropdownMain)}
      >
        DISCOVER
      </ButtonCustom>
    </Popover>
  );
}

export default PopoverMain;