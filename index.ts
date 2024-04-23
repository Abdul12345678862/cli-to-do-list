import inquirer from "inquirer";
import chalk from "chalk";

async function createtodo() {
  let check = "n";
  while (check === "n") {
    let todolist: string[] = ["Chai", "Coffe", "coldrink"];
    let Select = await inquirer.prompt([
      {
        name: "operation",
        type: "list",
        choices: ["add", "delete", "view", "update"],
        message: "Select your operation",
      },
    ]);

    if (Select.operation === "add") {
      const element = await inquirer.prompt([
        {
          name: "add",
          type: "input",
          message: "Enter your item",
        },
      ]);

      // Trim whitespace from start and end
      const input = element.add.trim();

      if (input === "") {
        console.log(chalk.redBright("You didn't type anything"));
      } else if (input.includes(" ")) {
        console.log(chalk.redBright("No spaces allowed"));
      } else {
        todolist.push(input);
        console.log(todolist);
        console.log(chalk.greenBright("Item added successfully"));
      }
    } else if (Select.operation === "delete") {
      console.log(todolist);
      //select item from todolist array then delete it
      const element = await inquirer.prompt([
        {
          name: "delete",
          type: "list",
          choices: todolist,
          message: "Select your item",
        },
      ]);
      const index = todolist.indexOf(element.delete);
      todolist.splice(index, 1);
      console.log(chalk.greenBright("Desired Item deleted successfully"));
      console.log(todolist);
    } else if (Select.operation === "view") {
      console.log("MY TODO LIST");
      todolist.forEach((element) => {
        console.log(element);
      });
    } else if (Select.operation === "update") {
      console.log(todolist);
      const element = await inquirer.prompt([
        {
          name: "update",
          type: "list",
          choices: todolist,
          message: "Select your item",
        },
      ]);
      const index = todolist.indexOf(element.update);
      const updates = await inquirer.prompt([
        {
          name: "update",
          type: "input",
          message: "Enter your item",
        },
      ]);
      const input = updates.update.trim();
      if (input === "") {
        console.log(chalk.redBright("You didn't type anything"));
      } else if (input.includes(" ")) {
        console.log(chalk.redBright("No spaces allowed"));
      } else {
        todolist[index] = updates.update;
        console.log(chalk.greenBright("Selected Item updated successfully"));
        console.log(todolist);
      }
    }

    const recreate = await inquirer.prompt([
      {
        name: "trying",
        type: "input",
        message: `Do you want to exit? (y/n): `,
      },
    ]);
    check = recreate.trying;
  }
  console.log(`You exited successfully`);
}
createtodo();
