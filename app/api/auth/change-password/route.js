import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { message: 'لطفاً ابتدا وارد شوید' },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: 'رمز عبور فعلی و رمز عبور جدید الزامی هستند' },
        { status: 400 }
      );
    }

    // Get user's current password
    const userResult = await pool.query(
      'SELECT password FROM users WHERE id = $1',
      [session.user.id]
    );

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { message: 'کاربر یافت نشد' },
        { status: 404 }
      );
    }

    const user = userResult.rows[0];

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'رمز عبور فعلی نادرست است' },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    await pool.query(
      `UPDATE users 
       SET password = $1,
           updated_at = NOW()
       WHERE id = $2`,
      [hashedPassword, session.user.id]
    );

    return NextResponse.json(
      { message: 'رمز عبور با موفقیت تغییر یافت' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json(
      { message: 'خطای سرور' },
      { status: 500 }
    );
  }
} 