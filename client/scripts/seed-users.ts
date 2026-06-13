import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is not set. Run with: MONGODB_URI=... npx tsx scripts/seed-users.ts");
  process.exit(1);
}

const users = [
  {
    id: "demo-ceo-001",
    email: "ceo@demo.local",
    password: "test1234",
    role: "ceo",
    name: "ceo",
  },
  {
    id: "demo-pm-001",
    email: "product.manager@demo.local",
    password: "test1234",
    role: "product_manager",
    name: "product.manager",
  },
  {
    id: "demo-marketer-001",
    email: "marketer@demo.local",
    password: "test1234",
    role: "marketer",
    name: "marketer",
  },
];

async function seed() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection("users");

    await collection.deleteMany({});
    const result = await collection.insertMany(users);
    console.log(`Inserted ${result.insertedCount} users into MongoDB`);
    console.log("Users:");
    for (const u of users) {
      console.log(`  ${u.email} (${u.role})`);
    }
  } finally {
    await client.close();
  }
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
