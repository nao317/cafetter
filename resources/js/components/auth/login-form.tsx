import { useState } from 'react'
import { auth } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoaderCircle } from 'lucide-react'

interface LoginFormProps {
    onSuccess?: () => void
    onSwitchToSignup?: () => void
}

export default function LoginForm({ onSuccess, onSwitchToSignup }: LoginFormProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { data, error } = await auth.signIn(email, password)

        if (error) {
            setError(error.message)
        } else if (data.user) {
            onSuccess?.()
        }

        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
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
                />
            </div>

            {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
                    {error}
                </div>
            )}

            <Button type="submit" disabled={loading} className="w-full">
                {loading && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                Sign In
            </Button>

            <div className="text-center">
                <button
                    type="button"
                    onClick={onSwitchToSignup}
                    className="text-sm text-blue-600 hover:text-blue-800"
                >
                    Don't have an account? Sign up
                </button>
            </div>
        </form>
    )
}