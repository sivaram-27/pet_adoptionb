const register = async (formData) => {
  try {
    console.log('API URL:', API_BASE);
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    // ... existing code ...
  } catch (error) {
    // ... existing code ...
  }
}; 