import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4444/admin/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then((res) => setUsers(res.data))
    .catch((err) => console.error("Ошибка загрузки пользователей:", err));
  }, []);

  const handleEdit = (userId) => {
    console.log("Редактирование пользователя:", userId);
  };

  return (
    <div>
      <h1>Админ-панель</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>ФИО</TableCell>
            <TableCell>Должность</TableCell>
            <TableCell>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.position}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(user._id)}>Редактировать</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminPanel;
