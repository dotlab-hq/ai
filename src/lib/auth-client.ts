import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient( {
    baseURL: process.env.VITE_BETTER_AUTH_URL || 'http://localhost:3000',
    basePath: '/api/auth',
} )

// Export auth methods
export const signUp = authClient.signUp
export const signIn = authClient.signIn
export const signOut = authClient.signOut
export const useSession = authClient.useSession
export const listSessions = authClient.listSessions
export const changePassword = authClient.changePassword
export const resetPassword = authClient.resetPassword
export const sendVerificationEmail = authClient.sendVerificationEmail
export const verifyEmail = authClient.verifyEmail
export const changeEmail = authClient.changeEmail
export const deleteUser = authClient.deleteUser

// Alias for password reset - used in forgot-password flow
export const forgetPassword = async ( data: { email: string } ) => {
    try {
        // Send password reset email
        const response = await ( authClient as any ).forgetPassword?.( data ) ||
            await ( authClient as any ).sendPasswordResetEmail?.( data ) ||
            { error: { message: 'Password reset functionality not available' } }
        return response
    } catch ( error ) {
        return { error: { message: error instanceof Error ? error.message : 'Failed to send reset email' } }
    }
}
export const updateUser = authClient.updateUser
