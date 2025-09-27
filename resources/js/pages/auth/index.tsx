import { useState } from 'react'
import { Head } from '@inertiajs/react'
import { useAuth } from '@/contexts/auth-context'
import LoginForm from '@/components/auth/login-form'
import SignupForm from '@/components/auth/signup-form'
import AuthLayout from '@/layouts/auth-layout'

export default function Auth() {
    const [mode, setMode] = useState<'login' | 'signup'>('login')
    const { user } = useAuth()

    // Redirect if already authenticated
    if (user) {
        window.location.href = '/dashboard'
        return null
    }

    const handleAuthSuccess = () => {
        window.location.href = '/dashboard'
    }

    return (
        <AuthLayout
            title={mode === 'login' ? 'Sign In' : 'Sign Up'}
            description={mode === 'login'
                ? 'Welcome back! Please sign in to your account.'
                : 'Create a new account to get started.'
            }
        >
            <Head title={mode === 'login' ? 'Sign In' : 'Sign Up'} />

            {mode === 'login' ? (
                <LoginForm
                    onSuccess={handleAuthSuccess}
                    onSwitchToSignup={() => setMode('signup')}
                />
            ) : (
                <SignupForm
                    onSuccess={() => setMode('login')}
                    onSwitchToLogin={() => setMode('login')}
                />
            )}
        </AuthLayout>
    )
}