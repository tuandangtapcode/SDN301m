import { Button, Result } from "antd"
import { useNavigate } from "react-router-dom"
import ModalCustom from "src/components/ModalCustom"

const SuccessByPremium = ({ open, onCancel }) => {

  const navigate = useNavigate()

  return (
    <ModalCustom
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <Result
        status="success"
        title={`Bạn đã mua gói Premium ${open?.Title} thành công`}
        subTitle="Cảm ơn bạn vì đã sử dụng gói Premium của chúng tôi. Chúc bạn có những trải nghiệm đọc truyện thật tuyệt vời!"
        extra={[
          <Button
            type="primary"
            onClick={() => navigate('/')}
          >
            Về trang chủ
          </Button>,
        ]}
      />
    </ModalCustom>
  )
}

export default SuccessByPremium