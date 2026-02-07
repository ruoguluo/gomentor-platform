import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  private authService = new AuthService();

  register = async (req: Request, res: Response) => {
    try {
      const result = await this.authService.register(req.body);
      res.status(201).json({
        success: true,
        data: result
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);
      res.json({
        success: true,
        data: result
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        error: error.message
      });
    }
  };

  refreshToken = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;
      const result = await this.authService.refreshToken(refreshToken);
      res.json({
        success: true,
        data: result
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        error: error.message
      });
    }
  };

  forgotPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      await this.authService.forgotPassword(email);
      res.json({
        success: true,
        message: 'Password reset email sent'
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  };

  resetPassword = async (req: Request, res: Response) => {
    try {
      const { token, password } = req.body;
      await this.authService.resetPassword(token, password);
      res.json({
        success: true,
        message: 'Password reset successful'
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  };

  // OAuth handlers
  googleAuth = async (req: Request, res: Response) => {
    // Implementation
    res.json({ message: 'Google OAuth initiated' });
  };

  googleCallback = async (req: Request, res: Response) => {
    // Implementation
    res.json({ message: 'Google OAuth callback' });
  };

  linkedinAuth = async (req: Request, res: Response) => {
    // Implementation
    res.json({ message: 'LinkedIn OAuth initiated' });
  };

  linkedinCallback = async (req: Request, res: Response) => {
    // Implementation
    res.json({ message: 'LinkedIn OAuth callback' });
  };
}
