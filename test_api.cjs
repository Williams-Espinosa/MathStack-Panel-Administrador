const fetch = require('node-fetch');

async function test() {
  try {
    const res = await fetch('https://mathstack-backend-production.up.railway.app/api/v1/academic/subjects');
    console.log('Subjects Status:', res.status);
    const text = await res.text();
    console.log('Subjects:', text.substring(0, 100));
  } catch(e) {
    console.error(e);
  }
}
test();
