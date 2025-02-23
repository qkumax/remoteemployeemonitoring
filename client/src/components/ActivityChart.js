import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
    { name: "Пн", время: 4 },
    { name: "Вт", время: 5 },
    { name: "Ср", время: 6 },
    { name: "Чт", время: 7 },
    { name: "Пт", время: 5 },
    { name: "Сб", время: 3 },
    { name: "Вс", время: 2 },
];

const ActivityChart = () => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="время" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default ActivityChart;
