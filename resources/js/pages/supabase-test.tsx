import { Head } from '@inertiajs/react'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function SupabaseTest() {
    const [connectionStatus, setConnectionStatus] = useState<'testing' | 'success' | 'error'>('testing')
    const [error, setError] = useState<string | null>(null)
    const [supabaseInfo, setSupabaseInfo] = useState<any>(null)

    useEffect(() => {
        testSupabaseConnection()
    }, [])

    const testSupabaseConnection = async () => {
        try {
            console.log('Testing Supabase connection...')
            
            // Test 1: Check if supabase client is initialized
            console.log('Supabase client:', supabase)
            
            // Test 2: Try to get session (this will test auth connection)
            const { data: { session }, error: sessionError } = await supabase.auth.getSession()
            console.log('Session test:', { session, sessionError })
            
            // Test 3: Try a simple database query (if it fails, it might be due to RLS policies)
            const { data, error: dbError } = await supabase
                .from('users')
                .select('count(*)')
                .limit(1)
            
            console.log('Database test:', { data, dbError })
            
            setSupabaseInfo({
                sessionTest: { session: !!session, error: sessionError?.message },
                dbTest: { data, error: dbError?.message },
                clientInitialized: !!supabase
            })
            
            setConnectionStatus('success')
        } catch (err: any) {
            console.error('Supabase connection error:', err)
            setError(err.message)
            setConnectionStatus('error')
        }
    }

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <Head title="Supabase Connection Test" />
            <h1>Supabase Connection Test</h1>
            
            <div style={{ marginBottom: '20px' }}>
                <h2>Environment Variables</h2>
                <div style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
                    <p><strong>VITE_SUPABASE_URL:</strong> {import.meta.env.VITE_SUPABASE_URL || 'NOT_SET'}</p>
                    <p><strong>VITE_SUPABASE_ANON_KEY:</strong> {import.meta.env.VITE_SUPABASE_ANON_KEY ? 'SET (hidden)' : 'NOT_SET'}</p>
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h2>Connection Status</h2>
                <div style={{ 
                    background: connectionStatus === 'success' ? '#d4edda' : 
                               connectionStatus === 'error' ? '#f8d7da' : '#fff3cd',
                    padding: '10px', 
                    borderRadius: '5px',
                    border: `1px solid ${connectionStatus === 'success' ? '#c3e6cb' : 
                                       connectionStatus === 'error' ? '#f5c6cb' : '#ffeaa7'}`
                }}>
                    {connectionStatus === 'testing' && '⏳ Testing connection...'}
                    {connectionStatus === 'success' && '✅ Connection successful!'}
                    {connectionStatus === 'error' && `❌ Connection failed: ${error}`}
                </div>
            </div>

            {supabaseInfo && (
                <div style={{ marginBottom: '20px' }}>
                    <h2>Test Results</h2>
                    <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '5px' }}>
                        <pre style={{ overflow: 'auto' }}>
                            {JSON.stringify(supabaseInfo, null, 2)}
                        </pre>
                    </div>
                </div>
            )}

            <div>
                <button 
                    onClick={testSupabaseConnection}
                    style={{ 
                        padding: '10px 20px', 
                        backgroundColor: '#007bff', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px', 
                        cursor: 'pointer' 
                    }}
                >
                    Retry Connection Test
                </button>
            </div>
        </div>
    )
}