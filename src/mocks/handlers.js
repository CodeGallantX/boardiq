import { rest } from 'msw';

export const handlers = [
  rest.post('/api/login', (req, res, ctx) => {
    const { email, password } = req.body;
    
    if (email === 'user@example.com' && password === 'password') {
      return res(
        ctx.delay(150),
        ctx.json({
          user: {
            id: '1',
            email,
            fullName: 'John Doe'
          },
          token: 'mock-jwt-token'
        })
      );
    }
    
    return res(
      ctx.delay(150),
      ctx.status(401),
      ctx.json({ error: 'Invalid email or password' })
    );
  }),
  
  rest.post('/api/register', (req, res, ctx) => {
    const { email, password, fullName } = req.body;
    
    return res(
      ctx.delay(150),
      ctx.json({
        user: {
          id: '2',
          email,
          fullName
        },
        token: 'mock-jwt-token'
      })
    );
  }),
  
  rest.post('/api/logout', (req, res, ctx) => {
    return res(
      ctx.delay(50),
      ctx.json({ success: true })
    );
  }),
  
  rest.get('/api/verify', (req, res, ctx) => {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    
    if (token === 'mock-jwt-token') {
      return res(
        ctx.delay(50),
        ctx.json({ valid: true })
      );
    }
    
    return res(
      ctx.delay(50),
      ctx.status(401),
      ctx.json({ valid: false })
    );
  })
];