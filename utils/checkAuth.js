import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    console.log("Authorization Header:", authHeader); // Лог для отладки

    if (!authHeader) {
        return res.status(403).json({ message: "Нет доступа (отсутствует токен)" });
    }

    const token = authHeader.split(' ')[1]; // Достаём сам токен из "Bearer token_here"

    if (!token) {
        return res.status(403).json({ message: "Некорректный токен" });
    }

    try {
        const decoded = jwt.verify(token, "diplomka"); // Убедитесь, что ключ совпадает с /auth/login
        req.userId = decoded._id;
        next(); // Передаём управление дальше
    } catch (e) {
        return res.status(403).json({ message: "Неверный или истёкший токен" });
    }
};
