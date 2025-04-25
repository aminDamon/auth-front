// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try {
        // 1. دریافت توکن از کوکی
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'دسترسی غیرمجاز - توکن ارائه نشده'
            });
        }

        // 2. بررسی اعتبار توکن
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. ذخیره اطلاعات کاربر برای استفاده در روت‌ها
        req.user = decoded;

        next();
    } catch (err) {
        console.error('خطای احراز هویت:', err);

        // پاک کردن کوکی نامعتبر
        res.clearCookie('token');

        res.status(401).json({
            success: false,
            error: 'دسترسی غیرمجاز - توکن نامعتبر'
        });
    }
};

module.exports = authenticate;