
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import { User } from '../models';

// Load env vars
dotenv.config({ path: path.join(__dirname, '../../.env') });

async function checkAdminInDb(dbName: string) {
    const uri = `mongodb://localhost:27017/${dbName}`;
    console.log(`\nChecking database: ${dbName}...`);

    try {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }
        await mongoose.connect(uri);

        const user = await User.findOne({ email: 'imaadhifthikar789@gmail.com' }).select('email firstName lastName role isActive');

        if (user) {
            console.log(`✅ FOUND USER IN ${dbName}:`);
            console.log(`   - Email: ${user.email}`);
            console.log(`   - Name: ${user.firstName} ${user.lastName}`);
            console.log(`   - Role: ${user.role}`);
            return true;
        } else {
            console.log(`❌ User 'imaadhifthikar789@gmail.com' not found in ${dbName}`);
            const admins = await User.find({ role: 'admin' }).select('email');
            if (admins.length > 0) {
                console.log(`   (But found ${admins.length} other admins: ${admins.map(a => a.email).join(', ')})`);
            }
            return false;
        }
    } catch (error) {
        console.error(`Error checking ${dbName}:`, error);
        return false;
    }
}

async function run() {
    await checkAdminInDb('mathmentor');
    await checkAdminInDb('mathmentor_prod');

    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }
    process.exit();
}

run();
