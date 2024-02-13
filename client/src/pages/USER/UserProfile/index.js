import { useState, React, useEffect } from "react";
import { ToggleButton } from "primereact/togglebutton";
import { Divider } from "primereact/divider";
import { Badge } from "primereact/badge";
import UserService from "src/services/UserService";
import { jwtDecode } from "jwt-decode";
import { InputText } from "primereact/inputtext";

const UserProfile = () => {
  const [checked, setChecked] = useState(true);
  const [user, setUser] = useState();
  const [newName, setNewName] = useState("");

  useEffect(() => {
    getUserInfo();
  }, [checked]);

  const getUserInfo = async () => {
    // Lấy userId theo token
    const token = localStorage.getItem("token");
    const id = jwtDecode(token).payload.id;
    console.log(id);
    const res = await UserService.getDetailProfile(id);
    setUser(res.data);
  };

  const updateProfile = async () => {
    const token = localStorage.getItem("token");
    const id = jwtDecode(token).payload.id;
    const res = await UserService.updateProfile({ id: id, newName: newName });
    if (res.isError) return;
    getUserInfo();
  };
  return (
    <>
      {user && (
        <div className="flex flex-row">
          <div className="col-4 ">
            <img style={{ width: "10rem" }} src={user.AvatarPath} />
            {/* Info */}
            <div className="flex flex-row gap-2 mt-0 align-items-center">
              {checked ? (
                <p>{user.FullName}</p>
              ) : (
                <InputText
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  style={{ width: "10rem", padding: "0.2rem" }}
                />
              )}
              {checked ? (
                <ToggleButton
                  style={{ padding: "0.2rem" }}
                  onLabel="Chỉnh sửa"
                  checked={checked}
                  onChange={(e) => {
                    setChecked(e.value);
                  }}
                />
              ) : (
                <ToggleButton
                  style={{ padding: "0.2rem" }}
                  offLabel="Thay đổi"
                  checked={checked}
                  onChange={(e) => {
                    updateProfile();
                    setChecked(e.value);
                  }}
                />
              )}
            </div>
            <p>{user.Email}</p>
          </div>
          <div className="col-8">
            <h3 className="mb-2">Thông tin khác</h3>
            <Divider />
            <p className="flex flex-row mt-2 gap-1">
              Trạng thái hoạt động:{" "}
              {user.IsActive ? (
                <Badge
                  className="align-items-center w-2 justify-content-center"
                  style={{ padding: "0.2rem" }}
                  value="Đang hoạt động"
                  severity="success"
                ></Badge>
              ) : (
                <Badge
                  className="align-items-center w-2 justify-content-center"
                  style={{ padding: "0.2rem" }}
                  value="Tạm khóa"
                  severity="warning"
                ></Badge>
              )}
            </p>
            <p>Số lượng theo dõi: {user.Follows.length}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
