const dotenv = require('dotenv');
const fs = require('fs');
const mysql = require('mysql2/promise');
const path = require('path');

async function initDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'password',
  });

  try {
    // Create the database if it doesn't exist
    await connection.execute(
      `CREATE DATABASE IF NOT EXISTS ${
        process.env.DB_DATABASE || 'user_manager'
      }`
    );
    console.info('✅ Database created or verified');

    // Connect to the database
    await connection.query(`USE ${process.env.DB_DATABASE || 'user_manager'}`);

    // Execute the SQL scripts
    const sqlFiles = ['20250101-1.sql'];

    for (const file of sqlFiles) {
      const sqlPath = path.join(__dirname, '..', 'sql', file);

      // Check if file exists
      if (!fs.existsSync(sqlPath)) {
        console.warn(`⚠️  SQL file ${file} not found, skipping...`);
        continue;
      }

      const sql = fs.readFileSync(sqlPath, 'utf8');

      // Split the queries by semicolon and execute them one by one
      const queries = sql.split(';').filter((query) => query.trim());

      for (const query of queries) {
        if (query.trim()) {
          await connection.execute(query);
        }
      }

      console.info(`✅ Script ${file} executed successfully`);
    }

    console.info('🎉 Database initialized successfully!');
  } catch (error) {
    console.error('❌ Error during database initialization:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

// Load the environment variables
dotenv.config();

// Execute the script
initDatabase().catch(console.error);
