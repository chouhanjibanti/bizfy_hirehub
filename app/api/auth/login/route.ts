import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mock user database (in a real app, use a database with proper password hashing)
const users = [
  {
    id: 1,
    email: 'admin@hirehub.com',
    // For testing only - in production, always use proper password hashing
    password: 'admin123', // Plain text for testing
    name: 'Admin User',
    role: 'admin'
  }
];

// Simple password comparison for testing
function comparePasswords(plain: string, hashed: string): boolean {
  // In a real app, always use bcrypt.compare()
  return plain === hashed;
}

// In production, use environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    console.log('Login attempt for email:', email);
    
    // Find user by email (case-insensitive)
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      console.log('User not found for email:', email);
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Log password comparison details (remove in production)
    console.log('Comparing passwords...');
    console.log('Provided password (first 2 chars):', password.substring(0, 2) + '...');
    console.log('Stored hash (first 10 chars):', user.password.substring(0, 10) + '...');
    
    // Compare passwords (using simple comparison for testing)
    const isPasswordValid = comparePasswords(password, user.password);
    
    if (!isPasswordValid) {
      console.log('Invalid password for email:', email);
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    console.log('Password valid, generating token...');
    
    // Create JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        name: user.name, 
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Return user data and token (excluding password)
    const { password: _, ...userData } = user;
    
    console.log('Login successful for user:', userData.email);
    
    return NextResponse.json({
      success: true,
      user: userData,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { 
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
