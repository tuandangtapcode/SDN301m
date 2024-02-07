import { useState } from "react"
import ButtonCustom from "src/components/ButtonCustom/MyButton"
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import { Popover } from "antd"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"

const LinkStyled = styled(Link)`
color: black;
`

const PopoverMain = () => {

  const [arrowDropdownMain, setArrowDropdownMain] = useState(false)
  const navigate = useNavigate()

  const content = (
    <div style={{ width: '600px', padding: '12px' }} className="d-flex-sb">
      <div>
        <p className="fs-25 fw-700">Genres</p>
        <div className="d-flex-sb">
          <div className="mr-30">
            <p
              className="fs-18 cursor-pointer"
              onClick={() => {
                setArrowDropdownMain(false)
                navigate('/genres/1')
              }}
            >
              Action & Adventure
            </p>
            <p
              className="fs-18 cursor-pointer"
              onClick={() => {
                setArrowDropdownMain(false)
                navigate('/genres/1')
              }}
            >
              Bios & History
            </p>
            <p
              className="fs-18 cursor-pointer"
              onClick={() => {
                setArrowDropdownMain(false)
                navigate('/genres/1')
              }}
            >
              Children's
            </p>
            <p
              className="fs-18 cursor-pointer"
              onClick={() => {
                setArrowDropdownMain(false)
                navigate('/genres/1')
              }}
            >
              Fantasy
            </p>
            <p
              className="fs-18 cursor-pointer"
              onClick={() => {
                setArrowDropdownMain(false)
                navigate('/genres/1')
              }}
            >
              Historical Fiction
            </p>
            <p
              className="fs-18 cursor-pointer"
              onClick={() => {
                setArrowDropdownMain(false)
                navigate('/genres/1')
              }}
            >
              Horror
            </p>
          </div>
          <div>
            <p
              className="fs-18 cursor-pointer"
              onClick={() => {
                setArrowDropdownMain(false)
                navigate('/genres/1')
              }}
            >
              Literay Fiction
            </p>
            <p
              className="fs-18 cursor-pointer"
              onClick={() => {
                setArrowDropdownMain(false)
                navigate('/genres/1')
              }}
            >
              Mystery & Thriller
            </p>
            <p
              className="fs-18 cursor-pointer"
              onClick={() => {
                setArrowDropdownMain(false)
                navigate('/genres/1')
              }}
            >
              Non-Fiction
            </p>
            <p
              className="fs-18 cursor-pointer"
              onClick={() => {
                setArrowDropdownMain(false)
                navigate('/genres/1')
              }}
            >
              Romance
            </p>
            <p
              className="fs-18 cursor-pointer"
              onClick={() => {
                setArrowDropdownMain(false)
                navigate('/genres/1')
              }}
            >
              Science Fiction
            </p>
            <p
              className="fs-18 cursor-pointer"
              onClick={() => {
                setArrowDropdownMain(false)
                navigate('/genres/1')
              }}
            >
              Young Adult
            </p>
          </div>
        </div>
      </div>

      <div>
        <p className="fs-25 fw-700">Resoures</p>
        <div>
          <p
            className="fs-18 cursor-pointer"
            onClick={() => {
              setArrowDropdownMain(false)
              navigate('/authors')
            }}
          >
            Authors
          </p>
          <p className="fs-18 cursor-pointer">
            Languages
          </p>
          <p
            className="fs-18 cursor-pointer"
            onClick={() => {
              setArrowDropdownMain(false)
              navigate('/genres')
            }}
          >
            Genres
          </p>
          <p className="fs-18 cursor-pointer">
            Articles
          </p>
          <p className="fs-18 cursor-pointer">
            Author Interviews
          </p>
          <p className="fs-18 cursor-pointer">
            Discuss
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <Popover
      content={content}
      // trigger={["click"]}
      placement="bottomLeft"
      arrow={false}
      className="mt-15"
      open={arrowDropdownMain}
    >
      <ButtonCustom
        className="noBackground"
        icon={arrowDropdownMain ? <CaretUpOutlined /> : <CaretDownOutlined />}
        onMouseOver={() => setArrowDropdownMain(true)}
        onMouseOut={() => setArrowDropdownMain(false)}
      >
        DISCOVER
      </ButtonCustom>
    </Popover>
  );
}

export default PopoverMain;