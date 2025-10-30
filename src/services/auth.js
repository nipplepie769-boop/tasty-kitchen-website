// Auth service for managing authentication state and API calls
const AuthService = {
  token: localStorage.getItem('token'),
  userRole: localStorage.getItem('userRole'),

  async login(email, password) {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      this.token = data.token;
      this.userRole = data.role;
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.role);
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async register(name, email, password) {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      this.token = data.token;
      this.userRole = 'user';
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', 'user');
      
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  async requestOtp(email) {
    try {
      const response = await fetch('http://localhost:5000/api/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (!response.ok) {
        const txt = await response.text().catch(()=>null);
        throw new Error(txt || 'OTP request failed');
      }
      return response.json();
    } catch (err) {
      // Network or CORS error
      console.error('requestOtp error', err);
      throw new Error((err && err.message) || 'Unable to contact auth server');
    }
  },

  async verifyOtp(email, otp, password) {
    const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, password })
    });
    if (!response.ok) throw new Error('OTP verification failed');
    const data = await response.json();
    this.token = data.token;
    this.userRole = data.role;
    localStorage.setItem('token', data.token);
    localStorage.setItem('userRole', data.role);
    return data;
  },

  async googleLogin(idToken) {
    const response = await fetch('http://localhost:5000/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken })
    });
    if (!response.ok) throw new Error('Google login failed');
    const data = await response.json();
    this.token = data.token;
    this.userRole = data.role;
    localStorage.setItem('token', data.token);
    localStorage.setItem('userRole', data.role);
    return data;
  },

  logout() {
    this.token = null;
    this.userRole = null;
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  },

  isAuthenticated() {
    return !!this.token;
  },

  isAdmin() {
    return this.userRole === 'admin';
  },

  getAuthHeader() {
    return this.token ? { 'Authorization': `Bearer ${this.token}` } : {};
  }
};

export default AuthService;

// Phone OTP APIs
AuthService.requestPhoneOtp = async function(phone) {
  try {
    const response = await fetch('http://localhost:5000/api/auth/request-otp-phone', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    });
    if (!response.ok) {
      const txt = await response.text().catch(()=>null);
      throw new Error(txt || 'Phone OTP request failed');
    }
    return response.json();
  } catch (err) {
    console.error('requestPhoneOtp error', err);
    throw new Error((err && err.message) || 'Unable to contact auth server');
  }
}

AuthService.verifyPhoneOtp = async function(phone, otp) {
  const response = await fetch('http://localhost:5000/api/auth/verify-otp-phone', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, otp })
  });
  if (!response.ok) throw new Error('Phone OTP verification failed');
  const data = await response.json();
  this.token = data.token;
  this.userRole = data.role;
  localStorage.setItem('token', data.token);
  localStorage.setItem('userRole', data.role);
  return data;
}