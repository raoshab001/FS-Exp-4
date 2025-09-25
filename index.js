const readline = require('readline');
const EmployeeManager = require('./employeeManager');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (question) => new Promise(res => rl.question(question, ans => res(ans)));

async function main() {
  const manager = new EmployeeManager();
  console.log('Welcome to the Employee Management System (in-memory array)\n');

  while (true) {
    console.log('Employee Management System');
    console.log('1. Add Employee');
    console.log('2. List Employees');
    console.log('3. Remove Employee');
    console.log('4. Exit\n');

    const choice = (await ask('Enter your choice: ')).trim();

    if (choice === '1' || /^add$/i.test(choice)) {
      const name = (await ask('Enter name: ')).trim();
      const id = (await ask('Enter ID: ')).trim();
      try {
        manager.add({ name, id });
        console.log(`\nAdded: ${name}, ID: ${id}\n`);
      } catch (err) {
        console.log(`\nError: ${err.message}\n`);
      }
    } else if (choice === '2' || /^list$/i.test(choice)) {
      const employees = manager.list();
      console.log('\nEmployee List:');
      if (employees.length === 0) {
        console.log('No employees found.\n');
      } else {
        employees.forEach((e, i) => {
          console.log(`${i + 1}. Name: ${e.name}, ID: ${e.id}`);
        });
        console.log('');
      }
    } else if (choice === '3' || /^remove$/i.test(choice)) {
      const id = (await ask('Enter ID to remove: ')).trim();
      if (!id) { console.log('\nID is required.\n'); continue; }
      const emp = manager.findById(id);
      if (!emp) {
        console.log(`\nNo employee found with ID "${id}".\n`);
        continue;
      }
      const confirm = (await ask(`Are you sure you want to remove ${emp.name} (ID: ${emp.id})? (y/N): `)).trim().toLowerCase();
      if (confirm === 'y' || confirm === 'yes') {
        manager.removeById(id);
        console.log('\nEmployee removed.\n');
      } else {
        console.log('\nCancelled.\n');
      }
    } else if (choice === '4' || /^exit$/i.test(choice)) {
      console.log('\nGoodbye!\n');
      rl.close();
      process.exit(0);
    } else {
      console.log('\nInvalid choice — please enter 1, 2, 3, or 4.\n');
    }
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  rl.close();
  process.exit(1);
});
