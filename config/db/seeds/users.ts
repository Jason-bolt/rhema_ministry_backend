import db from "..";
import { usersTable } from "../schemas/User";
import bcrypt from "bcrypt";
import { GenericHelper } from "../../../utils/helpers/generic.helpers";
import { eq } from "drizzle-orm";

const ADMIN_EMAIL = "eternalrhemaministries24@gmail.com";

const seedUsers = async () => {
  const existing = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, ADMIN_EMAIL))
    .limit(1);

  if (existing[0]) {
    console.log("Users already seeded, skipping...");
    return;
  }

  const hashedPassword = await bcrypt.hash("password", 10);
  const usersSeed = [
    {
      id: GenericHelper.generateUUID(),
      name: "admin",
      email: ADMIN_EMAIL,
      password: hashedPassword,
    },
  ];
  const result = await db.insert(usersTable).values(usersSeed).returning();
  console.log(`Seeded users table: ${JSON.stringify(result)}`);
};

export default seedUsers;
