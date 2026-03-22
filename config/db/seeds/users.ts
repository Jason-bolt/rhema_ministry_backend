import db from "..";
import { usersTable } from "../schemas/User";
import bcrypt from "bcrypt";
import { GenericHelper } from "../../../utils/helpers/generic.helpers";

const seedUsers = async () => {
  const hashedPassword = await bcrypt.hash("password", 10);
  const usersSeed = [
    {
      id: GenericHelper.generateUUID(),
      name: "admin",
      email: "eternalrhemaministries24@gmail.com",
      password: hashedPassword,
    },
  ];
  const result = await db.insert(usersTable).values(usersSeed).returning();
  console.log(`Seeded users tabe, ${result}`);
};

export default seedUsers;
