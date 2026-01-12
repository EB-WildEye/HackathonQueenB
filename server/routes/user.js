import express from 'express';
import { supabaseAdmin } from '../services/supabaseServerClient.js';

const router = express.Router();

// Middleware to verify user token
const verifyUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing or invalid authorization header' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

        if (error || !user) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth verification error:', error);
        return res.status(500).json({ error: 'Authentication failed' });
    }
};

// DELETE /api/user/chat-history - Delete all chat history for the user
router.delete('/chat-history', verifyUser, async (req, res) => {
    const userId = req.user.id;

    try {
        const { error } = await supabaseAdmin
            .from('chat_messages')
            .delete()
            .eq('user_id', userId);

        if (error) {
            console.error('Error deleting chat history:', error);
            return res.status(500).json({ error: 'Failed to delete chat history' });
        }

        res.json({ success: true, message: 'Chat history deleted successfully' });
    } catch (error) {
        console.error('Error deleting chat history:', error);
        res.status(500).json({ error: 'Failed to delete chat history' });
    }
});

// DELETE /api/user/account - Delete user account and all associated data
router.delete('/account', verifyUser, async (req, res) => {
    const userId = req.user.id;

    try {
        // First, delete all chat messages
        const { error: chatError } = await supabaseAdmin
            .from('chat_messages')
            .delete()
            .eq('user_id', userId);

        if (chatError) {
            console.error('Error deleting chat history:', chatError);
            // Continue anyway - user deletion is more important
        }

        // Then delete the user from Supabase Auth
        const { error: userError } = await supabaseAdmin.auth.admin.deleteUser(userId);

        if (userError) {
            console.error('Error deleting user:', userError);
            return res.status(500).json({ error: 'Failed to delete user account' });
        }

        res.json({ success: true, message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Error deleting account:', error);
        res.status(500).json({ error: 'Failed to delete account' });
    }
});

// GET /api/user/profile - Get user profile info
router.get('/profile', verifyUser, async (req, res) => {
    const user = req.user;

    res.json({
        id: user.id,
        email: user.email,
        createdAt: user.created_at,
        lastSignIn: user.last_sign_in_at
    });
});

export default router;
