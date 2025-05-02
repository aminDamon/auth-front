import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import crypto from 'crypto';
import { sendVerificationEmail } from '@/lib/emailService';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'ایمیل الزامی است' },
        { status: 400 }
      );
    }

    // Find user by email
    const userResult = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'کاربری با این ایمیل یافت نشد' },
        { status: 404 }
      );
    }

    const user = userResult.rows[0];

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpire = new Date(Date.now() + 3600000); // 1 hour from now

    // Update user with reset token
    await pool.query(
      `UPDATE users 
       SET verification_token = $1, 
           verification_token_expire = $2,
           updated_at = NOW()
       WHERE id = $3`,
      [resetToken, resetTokenExpire, user.id]
    );

    // Send reset email
    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;
    await sendVerificationEmail(
      user.email,
      'بازیابی رمز عبور',
      `برای بازیابی رمز عبور خود روی لینک زیر کلیک کنید:
      <a href="${resetUrl}">بازیابی رمز عبور</a>
      این لینک تا یک ساعت معتبر است.`
    );

    return NextResponse.json(
      { message: 'لینک بازیابی رمز عبور به ایمیل شما ارسال شد' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Password reset request error:', error);
    return NextResponse.json(
      { error: 'خطا در ارسال لینک بازیابی' },
      { status: 500 }
    );
  }
} 