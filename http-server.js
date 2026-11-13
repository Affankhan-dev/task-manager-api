const http = require('http');

const tasks = [
  { id: 1, title: 'Learn Node', completed: false },
  { id: 2, title: 'Build API', completed: false },
];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  // Route 1: home page
  if (method === 'GET' && url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to the Task Manager');

  // Route 2: list tasks as JSON
  } else if (method === 'GET' && url === '/tasks') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tasks));

  // Route 3: about
  } else if (method === 'GET' && url === '/about') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ app: 'Task Manager', version: '1.0' }));

  // Route 4 (bonus): create a task by reading the request body
  } else if (method === 'POST' && url === '/tasks') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        if (!data.title) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Title is required' }));
        }
        const task = { id: tasks.length + 1, title: data.title, completed: false };
        tasks.push(task);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(task));
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });

  // Anything else
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

server.listen(3000, () => console.log('Server running on http://localhost:3000'));