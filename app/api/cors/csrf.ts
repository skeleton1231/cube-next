export async function getCsrfToken() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

    await fetch(apiUrl + '/sanctum/csrf-cookie');
}
  