
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import { User } from '../models';

// Load env vars
dotenv.config({ path: path.join(__dirname, '../../.env') });

async function checkAdmins() {
    console.log('Connecting to MongoDB:', process.env.MONGODB_URI);

    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('Connected to MongoDB');

        const admins = await User.find({ role: 'admin' }).select('email firstName lastName role isActive');

        console.log('\n--- ADMIN USERS FOUND ---');
        if (admins.length === 0) {
            console.log('No admin users found in this database!');
        } else {
            admins.forEach(admin => {
                console.log(`Email: ${admin.email}`);
                console.log(`Name: ${admin.firstName} ${admin.lastName}`);
                console.log(`Active: ${admin.isActive}`);
                console.log(`ID: ${admin._id}`);
                console.log('-------------------');
            });
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
}

checkAdmins();
