import { config } from 'dotenv';
config();

export const PORT =  process.env.PORT || 8010;
export const MONGODB_URL = process.env.MONGODB_URL || 'mongodb+srv://juanse:9lbJzKyxXPXmwOZx@usermanager.qoidlki.mongodb.net/?retryWrites=true&w=majority'
export const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
