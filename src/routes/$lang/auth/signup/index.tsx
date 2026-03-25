import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { m } from '@/paraglide/messages'
import { signUp } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

function SignUpComponent() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState( false )
    const [error, setError] = useState<string | null>( null )
    const [formError, setFormError] = useState<Record<string, string>>( {} )

    const form = useForm( {
        defaultValues: {
            name: '',
            email: '',
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

            if ( !values.name.trim() ) {
                errors.name = 'Full name is required'
            }

            if ( !values.email.trim() ) {
                errors.email = m.auth_email() + ' is required'
            } else if ( !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test( values.email ) ) {
                errors.email = m.auth_invalid_email()
            }

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
                const response = await signUp.email( {
                    email: values.email,
                    password: values.password,
                    name: values.name,
                } )

                if ( response.error ) {
                    setError( response.error.message || m.auth_user_exists() )
                    return
                }

                // Redirect to sign in or verify email page
                navigate( { to: '/$lang/auth/signin', params: { lang: 'en' } } )
            } catch ( err ) {
                setError( 'Sign up failed. Please try again.' )
            } finally {
                setIsLoading( false )
            }
        },
    } )

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
                <Card className="border-border/50 shadow-lg" id="signup_card">
                    <CardHeader className="space-y-2">
                        <motion.div variants={itemVariants}>
                            <CardTitle className="text-2xl font-bold">{m.auth_sign_up()}</CardTitle>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <CardDescription>
                                {m.auth_have_account()} <span className="cursor-pointer text-primary hover:underline" onClick={() => navigate( { to: '/$lang/auth/signin', params: { lang: 'en' } } )}>{m.auth_sign_in_link()}</span>
                            </CardDescription>
                        </motion.div>
                    </CardHeader>

                    <CardContent>
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
                                <Label htmlFor="name">{m.auth_full_name()}</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={form.state.values.name}
                                    onChange={( e ) => form.setFieldValue( 'name', e.target.value )}
                                    disabled={isLoading}
                                    className={`h-10 ${formError.name ? 'border-destructive' : ''}`}
                                    required
                                />
                                {formError.name && (
                                    <p className="text-xs text-destructive">{formError.name}</p>
                                )}
                            </motion.div>

                            <motion.div className="space-y-2" variants={itemVariants}>
                                <Label htmlFor="email">{m.auth_email()}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={form.state.values.email}
                                    onChange={( e ) => form.setFieldValue( 'email', e.target.value )}
                                    disabled={isLoading}
                                    className={`h-10 ${formError.email ? 'border-destructive' : ''}`}
                                    required
                                />
                                {formError.email && (
                                    <p className="text-xs text-destructive">{formError.email}</p>
                                )}
                            </motion.div>

                            <motion.div className="space-y-2" variants={itemVariants}>
                                <Label htmlFor="password">{m.auth_password()}</Label>
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
                                <Label htmlFor="confirmPassword">{m.auth_confirm_password()}</Label>
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

                            <motion.div variants={itemVariants}>
                                <Button
                                    type="submit"
                                    className="w-full h-10 font-semibold"
                                    disabled={isLoading}
                                >
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {isLoading ? m.auth_loading() : m.auth_sign_up()}
                                </Button>
                            </motion.div>
                        </form>
                    </CardContent>
                </Card>

                <motion.p
                    className="text-center text-sm text-muted-foreground mt-8"
                    variants={itemVariants}
                >
                    By signing up, you agree to our Terms of Service and Privacy Policy
                </motion.p>
            </motion.div>
        </div>
    )
}

export const Route = createFileRoute( '/$lang/auth/signup/' )( {
    component: SignUpComponent,
} )
