import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { m } from '@/paraglide/messages'
import { forgetPassword } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Loader2, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

function ForgotPasswordComponent() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState( false )
  const [error, setError] = useState<string | null>( null )
  const [success, setSuccess] = useState( false )
  const [successEmail, setSuccessEmail] = useState<string>( '' )

  const form = useForm( {
    defaultValues: {
      email: '',
    },
    onSubmit: async ( data ) => {
      const values = data.value
      setIsLoading( true )
      setError( null )

      try {
        const response = await forgetPassword( {
          email: values.email,
        } )

        if ( response.error ) {
          setError( response.error.message || 'Failed to send reset email' )
          return
        }

        setSuccess( true )
        setSuccessEmail( values.email )
      } catch ( err ) {
        setError( 'Failed to send reset email. Please try again.' )
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
        <Card className="border-border/50 shadow-lg" id="forgot_password_card">
          <CardHeader className="space-y-2">
            <motion.div variants={itemVariants}>
              <CardTitle className="text-2xl font-bold">{m.auth_forgot_password_title()}</CardTitle>
            </motion.div>
            <motion.div variants={itemVariants}>
              <CardDescription>
                Enter your email address and we'll send you a link to reset your password.
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
            ) :
              (
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Alert className="border-green-500/50 bg-green-50 dark:bg-green-950">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800 dark:text-green-200">
                      {m.auth_password_reset_sent( { email: successEmail } )}
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>{m.auth_check_email()}</p>
                    <p>The link will expire in 24 hours.</p>
                  </div>

                  <Button
                    className="w-full h-10"
                    onClick={() => navigate( { to: '/$lang/auth/signin', params: { lang: 'en' } } )}
                  >
                    {m.auth_back_to_signin()}
                  </Button>
                </motion.div>
              )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export const Route = createFileRoute( '/$lang/auth/forgot-password/' )( {
  component: ForgotPasswordComponent,
} )













































































































































































