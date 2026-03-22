import seedUsers from "./users";

const seedDatabase = async () => {
  await seedUsers();
};

seedDatabase();
