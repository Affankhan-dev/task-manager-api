
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: node cli.js "Task title"');
  process.exit(1);
}

const title = args.join(' ');
const task = {
  id: 1,
  title: title,
  completed: false,
  createdAt: new Date().toISOString(),
};

console.log('New task created:');
console.log(task);
