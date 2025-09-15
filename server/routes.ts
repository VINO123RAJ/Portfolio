import type { Express } from "express";
import { createServer, type Server } from "http";
import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const data = contactSchema.parse(req.body);
      
      // Create nodemailer transporter
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: false,
        auth: {
          user: process.env.SMTP_USER || process.env.EMAIL_USER,
          pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
        },
      });

      // Email content
      const mailOptions = {
        from: process.env.FROM_EMAIL || "noreply@alexchen.dev",
        to: process.env.TO_EMAIL || "alex.chen@example.com",
        subject: `Portfolio Contact: ${data.subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
        `,
        replyTo: data.email,
      };

      // Auto-reply to sender
      const autoReplyOptions = {
        from: process.env.FROM_EMAIL || "noreply@alexchen.dev",
        to: data.email,
        subject: "Thanks for reaching out!",
        html: `
          <h2>Thank you for your message!</h2>
          <p>Hi ${data.firstName},</p>
          <p>Thank you for reaching out through my portfolio. I've received your message and will get back to you as soon as possible.</p>
          <p>Best regards,<br>Alex Chen</p>
        `,
      };

      // Send both emails
      await Promise.all([
        transporter.sendMail(mailOptions),
        transporter.sendMail(autoReplyOptions),
      ]);

      res.json({ 
        success: true, 
        message: "Message sent successfully!" 
      });
    } catch (error) {
      console.error("Contact form error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error",
          errors: error.errors 
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: "Failed to send message. Please try again." 
      });
    }
  });

  // Resume download endpoint
  app.get("/api/resume/download", (req, res) => {
    // In a real application, this would serve the actual resume file
    res.json({ 
      success: true, 
      message: "Resume download initiated",
      downloadUrl: "/resume.pdf" 
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
