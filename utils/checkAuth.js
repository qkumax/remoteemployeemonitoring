import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("Authorization Header:", authHeader);

  if (!authHeader) {
    return res.status(403).json({ message: "Нет доступа (отсутствует токен)" });
  }

  const token = authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(403).json({ message: "Некорректный токен" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ используем env
    req.userId = decoded.id; // ✅ исправлено с _id на id
    next();
  } catch (e) {
    return res.status(403).json({ message: "Неверный или истёкший токен" });
  }
};
