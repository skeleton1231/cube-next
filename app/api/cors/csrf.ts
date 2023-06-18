export async function getCsrfToken() {
    await fetch('http://localhost:8000/sanctum/csrf-cookie');
}
  