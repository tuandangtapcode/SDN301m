import ModalCustom from "src/components/ModalCustom";

const InsertUpdateComic = ({ open, onCancel, onOk }) => {
  return (
    <ModalCustom
      open={open}
      onCancel={onCancel}
      title={open?._id ? "Chỉnh sửa truyện" : "Thêm mới truyện"}
    >
      <div>InsertUpdateComic</div>
    </ModalCustom>
  );
}

export default InsertUpdateComic;