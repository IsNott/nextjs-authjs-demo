const mysql2 = require("mysql2");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const { exit } = require("process");

dotenv.config();

const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "youKnowWho",
    email: "test@email.com",
    password: "123456"
  },
];

async function seedUsers(pool) {
  try {
    // Insert data into the "user" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return pool.execute(
          `
      INSERT INTO user (id, name, email, password)
      VALUES (?,?,?,?)`,
          [user.id, user.name, user.email, hashedPassword],
        );
      }),
    );
    return {
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding user:", error);
    throw error;
  }
}


async function main() {
  const pool = mysql2
    .createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      port: process.env.MYSQL_PORT,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    })
    .promise();
  await seedUsers(pool);
  exit();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err,
  );
});