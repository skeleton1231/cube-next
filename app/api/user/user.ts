import { getCsrfToken } from "../cors/csrf";

export async function registerUser(userData: any) {
  // 获取 CSRF token
  await getCsrfToken();

  await fetch('http://localhost:8000/api/v1/user/register', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
  .then(response => response.json())
  .then(data => {
      console.log('Success:', data);
  })
  .catch((error) => {
      console.error(error);
  });
}
