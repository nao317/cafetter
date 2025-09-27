import { Head } from '@inertiajs/react'

export default function Test() {
    return (
        <div>
            <Head title="Test Page" />
            <h1>Test Page</h1>
            <p>This is a simple test page to check if the basic routing works.</p>
            <p>If you can see this, the basic Inertia.js setup is working.</p>
            
            <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
                <h2>Environment Variables:</h2>
                <pre>{JSON.stringify({
                    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || 'NOT_SET',
                    VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'SET' : 'NOT_SET',
                    APP_NAME: import.meta.env.VITE_APP_NAME || 'NOT_SET'
                }, null, 2)}</pre>
            </div>
        </div>
    )
}