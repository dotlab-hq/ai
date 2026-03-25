import { createFileRoute } from '@tanstack/react-router'
import { m } from '@/paraglide/messages'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

function VerifyEmailComponent() {
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
                <Card className="border-border/50 shadow-lg" id="verify_email_card">
                    <CardHeader className="space-y-2">
                        <motion.div variants={itemVariants} className="flex justify-center">
                            <div className="bg-primary/10 p-3 rounded-lg">
                                <Mail className="h-6 w-6 text-primary" />
                            </div>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <CardTitle className="text-2xl font-bold text-center">{m.auth_verify_email()}</CardTitle>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <CardDescription className="text-center">
                                {m.auth_verification_sent( {
                                    email: "user@example.com"
                                } )}
                            </CardDescription>
                        </motion.div>
                    </CardHeader>

                    <CardContent>
                        <motion.div className="space-y-4" variants={containerVariants}>
                            <motion.div className="space-y-3" variants={itemVariants}>
                                <p className="text-sm text-muted-foreground">
                                    {m.auth_check_email()}
                                </p>
                            </motion.div>

                            <motion.div className="space-y-3" variants={itemVariants}>
                                <Alert className="border-blue-500/50 bg-blue-50 dark:bg-blue-950">
                                    <AlertCircle className="h-4 w-4 text-blue-600" />
                                    <AlertDescription className="text-blue-800 dark:text-blue-200">
                                        Check your email for the verification link.
                                    </AlertDescription>
                                </Alert>
                            </motion.div>
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

export const Route = createFileRoute( '/$lang/auth/verify-email/' )( {
    component: VerifyEmailComponent,
} )
