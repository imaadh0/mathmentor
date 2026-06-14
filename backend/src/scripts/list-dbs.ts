
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';

// Load env vars
dotenv.config({ path: path.join(__dirname, '../../.env') });

async function checkDbs() {
    console.log('Connecting to MongoDB...');

    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('Connected to MongoDB');

        // List all databases
        const admin = mongoose.connection.db!.admin();
        const result = await admin.listDatabases();

        console.log('\n--- AVAILABLE DATABASES ---');
        result.databases.forEach(db => {
            console.log(`- ${db.name} (Size: ${db.sizeOnDisk})`);
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
}

checkDbs();
