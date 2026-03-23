import z from "zod";

export const contactFormSchema = z.object({
    senderName: z.string().min(1, "Name is required"),
    senderEmail: z.email("Invalid email address"),
    subject: z.string().min(1, "Invalid subject"),
    message: z.string().min(1, "Invalid message"),
    });