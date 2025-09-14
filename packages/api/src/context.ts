import { Request, Response } from 'express';

export interface Context {
  req: Request;
  res: Response;
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export async function context({ req, res }: { req: Request; res: Response }): Promise<Context> {
  // TODO: Implement authentication middleware
  // For now, return basic context without user authentication

  return {
    req,
    res,
    // user: await authenticateUser(req),
  };
}
