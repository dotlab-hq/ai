import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { m } from '@/paraglide/messages'
import { signIn } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'
import { AlertCircle, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

function SignInComponent() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState( false )
    const [error, setError] = useState<string | null>( null )

    const form = useForm( {
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: async ( values ) => {
            setIsLoading( true )
            setError( null )

            try {
                const response = await signIn.email( {
                    email: values.value.email,
                    password: values.value.password,
                } )

                if ( response.error ) {
                    setError( response.error.message || m.auth_invalid_credentials() )
                    return
                }

                // Redirect to dashboard or home page
                navigate( { to: '/' } )
            } catch ( err ) {
                setError( m.auth_invalid_credentials() )
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
                <Card className="border-border/50 shadow-lg" id="signin_card">
                    <CardHeader className="space-y-2">
                        <motion.div variants={itemVariants}>
                            <CardTitle className="text-2xl font-bold">{m.auth_sign_in()}</CardTitle>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <CardDescription>
                                {m.auth_no_account()} <span className="cursor-pointer text-primary hover:underline" onClick={() => navigate( { to: '/$lang/auth/signup', params: { lang: 'en' } } )}>{m.auth_sign_up_link()}</span>
                            </CardDescription>
                        </motion.div>
                    </CardHeader>

                    <CardContent>
                        <motion.form
                            onSubmit={( e ) => form.handleSubmit( e )}
                            className="space-y-4"
                            variants={containerVariants}
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
                                <Label htmlFor="email">{m.auth_email()}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={form.state.values.email}
                                    onChange={( e ) => form.setFieldValue( 'email', e.target.value )}
                                    disabled={isLoading}
                                    className="h-10"
                                    required
                                />
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
                                    className="h-10"
                                    required
                                />
                            </motion.div>

                            <motion.div className="flex items-center justify-between" variants={itemVariants}>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="rememberMe"
                                        checked={form.state.values.rememberMe}
                                        onCheckedChange={( checked ) =>
                                            form.setFieldValue( 'rememberMe', checked as boolean )
                                        }
                                        disabled={isLoading}
                                    />
                                    <Label
                                        htmlFor="rememberMe"
                                        className="text-sm font-normal cursor-pointer"
                                    >
                                        {m.auth_remember_me()}
                                    </Label>
                                </div>
                                <span
                                    className="text-sm text-primary hover:underline cursor-pointer"
                                    onClick={() => navigate( { to: '/$lang/auth/forgot-password', params: { lang: 'en' } } )}
                                >
                                    {m.auth_forgot_password()}
                                </span>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Button
                                    type="submit"
                                    className="w-full h-10 font-semibold"
                                    disabled={isLoading}
                                >
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {isLoading ? m.auth_loading() : m.auth_sign_in()}
                                </Button>
                            </motion.div>
                        </motion.form>
                    </CardContent>
                </Card>

                <motion.p
                    className="text-center text-sm text-muted-foreground mt-8"
                    variants={itemVariants}
                >
                    By signing in, you agree to our Terms of Service and Privacy Policy
                </motion.p>
            </motion.div>
        </div>
    )
}

export const Route = createFileRoute( '/$lang/auth/signin/' )( {
    component: SignInComponent,
} )
