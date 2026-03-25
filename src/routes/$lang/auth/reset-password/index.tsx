import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useForm } from '@tanstack/react-form'
import { m } from '@/paraglide/messages'
import { resetPassword } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Loader2, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface ResetPasswordSearch {
    token?: string
}

function ResetPasswordComponent() {
    const navigate = useNavigate()
    const search = useSearch( { from: '/$lang/auth/reset-password/' } )
    const [isLoading, setIsLoading] = useState( false )
    const [error, setError] = useState<string | null>( null )
    const [success, setSuccess] = useState( false )
    const [formError, setFormError] = useState<Record<string, string>>( {} )

    const form = useForm( {
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
        onSubmit: async ( data ) => {
            const values = data.value
            setIsLoading( true )
            setError( null )
            setFormError( {} )

            // Validation
            const errors: Record<string, string> = {}

            if ( !values.password ) {
                errors.password = m.auth_password() + ' is required'
            } else if ( values.password.length < 8 ) {
                errors.password = m.auth_password_requirements()
            }

            if ( values.password !== values.confirmPassword ) {
                errors.confirmPassword = m.auth_password_mismatch()
            }

            if ( Object.keys( errors ).length > 0 ) {
                setFormError( errors )
                setIsLoading( false )
                return
            }

            try {
                const token = ( search as any )?.token
                if ( !token ) {
                    setError( 'Invalid reset token. Please request a new password reset.' )
                    return
                }

                const response = await resetPassword( {
                    token,
                    newPassword: values.password,
                } )

                if ( response.error ) {
                    setError( response.error.message || 'Failed to reset password' )
                    return
                }

                setSuccess( true )
            } catch ( err ) {
                setError( 'Failed to reset password. Please try again.' )
            } finally {
                setIsLoading( false )
            }
        },
    } )

    useEffect( () => {
        const token = ( search as any )?.token
        if ( !token ) {
            setError( 'No reset token provided. Please request a new password reset.' )
        }
    }, [search] )

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background to-secondary/10 px-4">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="w-full max-w-md"
            >
                <Card className="border-border/50 shadow-lg" id="reset_password_card">
                    <CardHeader className="space-y-2">
                        <motion.div variants={itemVariants}>
                            <CardTitle className="text-2xl font-bold">{m.auth_reset_password()}</CardTitle>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <CardDescription>
                                Enter your new password below to reset your account password.
                            </CardDescription>
                        </motion.div>
                    </CardHeader>

                    <CardContent>
                        {!success ? (
                            <form
                                onSubmit={( e ) => form.handleSubmit( e as any )}
                                className="space-y-4"
                            >
                                {error && (
                                    <motion.div variants={itemVariants}>
                                        <Alert variant="destructive" className="border-destructive/50">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertDescription>{error}</AlertDescription>
                                        </Alert>
                                    </motion.div>
                                )}

                                <motion.div className="space-y-2" variants={itemVariants}>
                                    <Label htmlFor="password">{m.auth_new_password()}</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={form.state.values.password}
                                        onChange={( e ) => form.setFieldValue( 'password', e.target.value )}
                                        disabled={isLoading}
                                        className={`h-10 ${formError.password ? 'border-destructive' : ''}`}
                                        required
                                    />
                                    {formError.password && (
                                        <p className="text-xs text-destructive">{formError.password}</p>
                                    )}
                                    <p className="text-xs text-muted-foreground">{m.auth_password_requirements()}</p>
                                </motion.div>

                                <motion.div className="space-y-2" variants={itemVariants}>
                                    <Label htmlFor="confirmPassword">{m.auth_confirm_new_password()}</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        value={form.state.values.confirmPassword}
                                        onChange={( e ) => form.setFieldValue( 'confirmPassword', e.target.value )}
                                        disabled={isLoading}
                                        className={`h-10 ${formError.confirmPassword ? 'border-destructive' : ''}`}
                                        required
                                    />
                                    {formError.confirmPassword && (
                                        <p className="text-xs text-destructive">{formError.confirmPassword}</p>
                                    )}
                                </motion.div>

                                <motion.div className="flex gap-3" variants={itemVariants}>
                                    <Button
                                        type="submit"
                                        className="flex-1 h-10 font-semibold"
                                        disabled={isLoading}
                                    >
                                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {isLoading ? m.auth_loading() : m.auth_reset_password()}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="flex-1 h-10"
                                        onClick={() => navigate( { to: '/$lang/auth/signin', params: { lang: 'en' } } )}
                                        disabled={isLoading}
                                    >
                                        {m.auth_back_to_signin()}
                                    </Button>
                                </motion.div>
                            </form>
                        ) : (
                            <motion.div
                                className="space-y-4"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <Alert className="border-green-500/50 bg-green-50 dark:bg-green-950">
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                    <AlertDescription className="text-green-800 dark:text-green-200">
                                        {m.auth_success()} Your password has been reset successfully.
                                    </AlertDescription>
                                </Alert>

                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <p>You can now sign in with your new password.</p>
                                </div>

                                <Button
                                    className="w-full h-10"
                                    onClick={() => navigate( { to: '/$lang/auth/signin', params: { lang: 'en' } } )}
                                >
                                    {m.auth_sign_in()}
                                </Button>
                            </motion.div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

export const Route = createFileRoute( '/$lang/auth/reset-password/' )( {
    component: ResetPasswordComponent,
    validateSearch: ( search: any ): ResetPasswordSearch => ( {
        token: search.token,
    } ),
} )
