// Simple in-memory Employee manager
class EmployeeManager {
  constructor() {
    this.employees = []; // { name: string, id: string }
  }

  // add an employee; throws if ID already exists
  add({ name, id }) {
    if (!name || !id) throw new Error('Name and ID are required.');
    const exists = this.employees.some(e => e.id.toLowerCase() === id.toLowerCase());
    if (exists) throw new Error(`Employee with ID "${id}" already exists.`);
    this.employees.push({ name, id });
  }

  // return a shallow copy of employees
  list() {
    return [...this.employees];
  }

  // find employee by id (case-insensitive) or null
  findById(id) {
    return this.employees.find(e => e.id.toLowerCase() === id.toLowerCase()) || null;
  }

  // remove by id; returns true if removed, false otherwise
  removeById(id) {
    const idx = this.employees.findIndex(e => e.id.toLowerCase() === id.toLowerCase());
    if (idx === -1) return false;
    this.employees.splice(idx, 1);
    return true;
  }
}

module.exports = EmployeeManager;
