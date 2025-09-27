import { useState } from 'react'
import { auth } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoaderCircle } from 'lucide-react'

interface SignupFormProps {
    onSuccess?: () => void
    onSwitchToLogin?: () => void
}

export default function SignupForm({ onSuccess, onSwitchToLogin }: SignupFormProps) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            setLoading(false)
            return
        }

        const { data, error } = await auth.signUp(email, password, { name })

        if (error) {
            setError(error.message)
        } else {
            setSuccess(true)
            onSuccess?.()
        }

        setLoading(false)
    }

    if (success) {
        return (
            <div className="text-center space-y-4">
                <div className="text-green-600 bg-green-50 p-4 rounded">
                    <h3 className="font-semibold">Check your email!</h3>
                    <p className="text-sm mt-1">
                        We've sent you a confirmation link to verify your email address.
                    </p>
                </div>
                <button
                    onClick={onSwitchToLogin}
                    className="text-sm text-blue-600 hover:text-blue-800"
                >
                    Back to sign in
                </button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={loading}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    minLength={6}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={loading}
                    minLength={6}
                />
            </div>

            {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
                    {error}
                </div>
            )}

            <Button type="submit" disabled={loading} className="w-full">
                {loading && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                Sign Up
            </Button>

            <div className="text-center">
                <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-sm text-blue-600 hover:text-blue-800"
                >
                    Already have an account? Sign in
                </button>
            </div>
        </form>
    )
}