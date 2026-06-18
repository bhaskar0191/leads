import jwt from 'jsonwebtoken';
import dotenv, { config } from 'dotenv';

config()

const auth = (req, res, next) => {

    const tokenHeader = req.headers.authorization;
    const tokenCookie = req.cookies?.token;

    const token = tokenHeader?.split(" ")[1] || tokenCookie;

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.id || decoded.Id) {
            req.user = decoded;
            next();
        } else {
            return res.status(401).json({ message: 'Invalid token payload.' });
        }
    } catch (error) {
        console.error("JWT verification error:", error.message);
        res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

export default auth;