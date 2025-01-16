export function logout() {
    localStorage.removeItem('Token');
    localStorage.removeItem('Profile');
  
    console.log('User logged out, localStorage cleared');
  
    window.location.href = '/';  
  }
  