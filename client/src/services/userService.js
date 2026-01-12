import { supabase } from './supabaseClient';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Get the current user's access token
 */
const getAccessToken = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token;
};

/**
 * Delete all chat history for the current user
 */
export const deleteChatHistory = async () => {
    const token = await getAccessToken();

    if (!token) {
        throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE}/api/user/chat-history`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete chat history');
    }

    return response.json();
};

/**
 * Delete the user account and all associated data
 */
export const deleteUserAccount = async () => {
    const token = await getAccessToken();

    if (!token) {
        throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE}/api/user/account`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete account');
    }

    // Sign out locally after account deletion
    await supabase.auth.signOut();

    return response.json();
};

/**
 * Get the user's profile information
 */
export const getUserProfile = async () => {
    const token = await getAccessToken();

    if (!token) {
        throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE}/api/user/profile`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to get profile');
    }

    return response.json();
};

/**
 * Sign out the current user
 */
export const signOut = async () => {
    await supabase.auth.signOut();
};
