const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const appDir = path.join(__dirname, '..', 'src', 'app');

test('root route exists and renders through CMSPage', () => {
  const file = path.join(appDir, 'page.tsx');
  assert.equal(fs.existsSync(file), true);
  const content = fs.readFileSync(file, 'utf8');
  assert.ok(content.includes('CMSPage'));
});

test('catch-all route exists and does not call notFound()', () => {
  const file = path.join(appDir, '[...slug]', 'page.tsx');
  assert.equal(fs.existsSync(file), true);
  const content = fs.readFileSync(file, 'utf8');
  assert.ok(!content.includes('notFound('));
});
