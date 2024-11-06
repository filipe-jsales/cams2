import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import { CheckCircle, Cancel, Lock, LockOpen } from "@mui/icons-material";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  updatedAt: string;
  recoveryCode: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export default function UsersHome() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" gutterBottom component="div" sx={{ padding: 2 }}>
        Lista de Usuários
      </Typography>
      <Table aria-label="Tabela de usuários">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Acesso
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Nome
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              E-mail
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Código de recuperação
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Última atualização
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Ativo
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Ações
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell align="center">
                {user.isActive ? <LockOpen /> : <Lock />}
              </TableCell>
              <TableCell align="center">{`${user.firstName} ${user.lastName}`}</TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell align="center">{user.recoveryCode || "-"}</TableCell>
              <TableCell align="center">{formatDate(user.updatedAt)}</TableCell>
              <TableCell align="center">
                {user.isActive ? (
                  <CheckCircle color="success" />
                ) : (
                  <Cancel color="error" />
                )}
              </TableCell>

              <TableCell align="center">
                <IconButton color="primary">
                  <span role="img" aria-label="edit">
                    ✏️
                  </span>
                </IconButton>
                <IconButton color="secondary">
                  <span role="img" aria-label="delete">
                    🗑️
                  </span>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
