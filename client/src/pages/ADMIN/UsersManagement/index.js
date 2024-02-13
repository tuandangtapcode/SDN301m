import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import UserService from "src/services/UserService";
import { Button } from "primereact/button";

export default function CustomFilterDemo() {
  const [loading, setLoading] = useState(true);
  const [listCustomer, setListCustomer] = useState();

  useEffect(() => {
    getList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getList = async () => {
    try {
      setLoading(true);
      const res = await UserService.getListCustomer();
      setListCustomer(res.data);
    } finally {
      setLoading(false);
    }
  };
  const avtTemplate = (option) => {
    return (
      <img key={option.id} style={{ width: "5rem" }} src={option.AvatarPath} />
    );
  };
  const apiDeactiveAccount = async (userId) => {
    // Define the apiDeactiveAccount function
    try {
      setLoading(true);
      const res = await UserService.deActiveAccount(userId);
      if (res.isError) return;
      getList();
    } finally {
      setLoading(false);
    }
  };

  const isDeactiveTemplate = (option) => {
    const handleDeactivate = () => {
      apiDeactiveAccount(option._id);
    };

    return option.IsActive ? (
      <Button
        key={`activeButton-${option.id}`}
        style={{ padding: "1rem", margin: "0.5rem", backgroundColor: "blue" }}
        label="Active"
        severity="secondary"
        onClick={() => apiDeactiveAccount(option._id)} // Use arrow function to call apiDeactiveAccount
      />
    ) : (
      <Button
        key={`inactiveButton-${option.id}`}
        style={{ padding: "1rem", margin: "0.5rem", backgroundColor: "red" }}
        label="Deactive"
        severity="secondary"
      />
    );
  };

  return (
    <div className="card">
      {listCustomer && (
        <DataTable value={listCustomer} paginator rows={10}>
          <Column
            field="FullName"
            header="Name"
            style={{ minWidth: "12rem" }}
          />
          <Column field="Email" header="Email" style={{ minWidth: "12rem" }} />
          <Column
            field="AvatarPath"
            header="Avatar"
            style={{ minWidth: "12rem" }}
            body={avtTemplate}
          />
          <Column
            field="IsActive"
            header="IsActive"
            style={{ minWidth: "12rem" }}
            body={isDeactiveTemplate}
          />
        </DataTable>
      )}
    </div>
  );
}
