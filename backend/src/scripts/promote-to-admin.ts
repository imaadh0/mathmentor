
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import { User } from '../models';

// Load env vars
dotenv.config({ path: path.join(__dirname, '../../.env') });

async function promoteToAdmin() {
    // Force connection to mathmentor
    const uri = 'mongodb://localhost:27017/mathmentor';
    console.log('Connecting to:', uri);

    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');

        const email = 'imaadhifthikar789@gmail.com';
        const user = await User.findOne({ email });

        if (!user) {
            console.log(`❌ User ${email} not found!`);
            return;
        }

        console.log(`Found user: ${user.firstName} ${user.lastName}`);
        console.log(`Current Role: ${user.role}`);

        if (user.role === 'admin') {
            console.log('User is already an admin.');
        } else {
            user.role = 'admin';
            await user.save();
            console.log('✅ User successfully promoted to ADMIN role.');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
}

promoteToAdmin();
