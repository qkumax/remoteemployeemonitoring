import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const activities = [
    { id: 1, action: "Создана задача", time: "10:30" },
    { id: 2, action: "Завершена задача", time: "12:15" },
    { id: 3, action: "Создана задача", time: "14:45" },
];

const ActivityTable = () => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Действие</TableCell>
                        <TableCell>Время</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {activities.map((activity) => (
                        <TableRow key={activity.id}>
                            <TableCell>{activity.action}</TableCell>
                            <TableCell>{activity.time}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ActivityTable;
