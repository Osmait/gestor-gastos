import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./config/db";

async function main() {
  try {
    const PORT = 3000;
    await AppDataSource.initialize();
    console.log("DataBase Ready");
    app.listen(PORT, () => {
      console.log(`Server on Port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
