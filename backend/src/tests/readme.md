# Unit Testing in Jest

A brief overview of key concepts and practices for writing unit tests with Jest.

## 1. Basic Structure

- **`describe()`**: Used to group related test cases.
- **`test()` / `it()`**: Defines an individual test case.
- **`expect()`**: Assertion function used to verify the test results.

### Common Matchers:
- `toBe()`: Check for primitive equality.
- `toEqual()`: Check for deep equality (e.g., objects).
- `toBeTruthy()`: Check if a value is truthy.

```javascript
describe('User Authentication', () => {
  it('should authenticate with valid credentials', async () => {
    const isAuthenticated = await authenticateUser('user@example.com', 'password');
    expect(isAuthenticated).toBeTruthy();
  });
});
