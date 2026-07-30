import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcryptjs';
import { connectDB, disconnectDB } from '../config/database.js';
import User from '../models/User.js';
import Admin from '../models/Admin.js';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_NAME = process.env.ADMIN_NAME || 'Administrator';
const ADMIN_ROLE = 'superadmin';

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in backend/.env');
}

async function seedAdmin() {
  console.log('\n🔧 Admin Seed Script');
  console.log('====================\n');

  // Connect to MongoDB
  console.log('📡 Connecting to MongoDB...');
  const connection = await connectDB();

  if (!connection.connected) {
    console.error('❌ Failed to connect to MongoDB. Aborting.');
    console.log('   Make sure MONGODB_URI is set in backend/.env');
    process.exit(1);
  }

  console.log('✅ Connected to MongoDB\n');

  try {
    // Check if admin user already exists
    const existingUser = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() });

    if (existingUser && existingUser.role === 'admin') {
      console.log(`👤 Admin user already exists: ${ADMIN_EMAIL}`);
      console.log('   Role:', existingUser.role);
      console.log('   Status:', existingUser.isActive ? 'Active' : 'Inactive');

      // Ensure password is updated
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, salt);
      existingUser.passwordHash = passwordHash;
      existingUser.emailVerified = true;
      existingUser.isActive = true;
      existingUser.role = 'admin';
      await existingUser.save();

      console.log('✅ Admin password and status refreshed\n');
    } else {
      // Delete the user if it exists with wrong role, then recreate
      if (existingUser) {
        await User.findByIdAndDelete(existingUser._id);
        console.log('🗑️  Removed existing user record to recreate as admin\n');
      }

      // Hash password
      console.log('🔐 Hashing password...');
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, salt);

      // Create admin user
      console.log('👤 Creating admin user...');
      const user = await User.create({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL.toLowerCase(),
        passwordHash,
        role: 'admin',
        emailVerified: true,
        isActive: true,
        lastLogin: new Date(),
      });

      console.log(`   ✅ User created with ID: ${user._id}`);

      // Create admin profile
      console.log('📋 Creating admin profile...');
      const adminProfile = await Admin.create({
        userId: user._id,
        name: ADMIN_NAME,
        email: ADMIN_EMAIL.toLowerCase(),
        role: ADMIN_ROLE,
        permissions: {
          manageUsers: true,
          managePredictions: true,
          managePayments: true,
          manageSubscriptions: true,
          viewAnalytics: true,
          manageSettings: true,
        },
        isActive: true,
        lastActive: new Date(),
      });

      console.log(`   ✅ Admin profile created with ID: ${adminProfile._id}\n`);
    }

    // Verify the admin user exists and login works
    const verifyUser = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() }).select('name email role isActive emailVerified');

    console.log('📊 Admin Summary:');
    console.log('   Name:', verifyUser.name);
    console.log('   Email:', verifyUser.email);
    console.log('   Role:', verifyUser.role);
    console.log('   Active:', verifyUser.isActive ? '✅ Yes' : '❌ No');
    console.log('   Email Verified:', verifyUser.emailVerified ? '✅ Yes' : '❌ No');
    console.log('');

    console.log('🎉 Admin setup complete!');
    console.log('─────────────────────');
    console.log('   Login URL:  http://localhost:3000/login');
    console.log('   Email:      calebyegon19@gmail.com');
    console.log('   Admin URL:  http://localhost:3000/admin');
    console.log('─────────────────────\n');

  } catch (err) {
    console.error('\n❌ Error creating admin user:', err.message);
    console.error(err.stack);
    process.exit(1);
  } finally {
    await disconnectDB();
    console.log('🔌 Disconnected from MongoDB\n');
  }
}

seedAdmin();

