import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || ''

console.log('Supabase Config Debug:', {
    url: supabaseUrl,
    key: supabaseKey ? supabaseKey.substring(0, 20) + '...' : 'NOT_SET',
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseKey
})

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables:', { supabaseUrl, supabaseKey })
    throw new Error(`Missing Supabase environment variables: URL=${!!supabaseUrl}, KEY=${!!supabaseKey}`)
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Auth helpers
export const auth = {
    async signUp(email: string, password: string, metadata = {}) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: metadata
            }
        })
        return { data, error }
    },

    async signIn(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })
        return { data, error }
    },

    async signOut() {
        const { error } = await supabase.auth.signOut()
        return { error }
    },

    async getSession() {
        const { data: { session } } = await supabase.auth.getSession()
        return session
    },

    async getUser() {
        const { data: { user } } = await supabase.auth.getUser()
        return user
    },

    onAuthStateChange(callback: (event: string, session: any) => void) {
        return supabase.auth.onAuthStateChange(callback)
    }
}

// Database helpers
export const db = {
    // Users table operations
    users: {
        async create(userData: any) {
            const { data, error } = await supabase
                .from('users')
                .insert([userData])
                .select()
            return { data, error }
        },

        async getById(id: string) {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', id)
                .single()
            return { data, error }
        },

        async update(id: string, updates: any) {
            const { data, error } = await supabase
                .from('users')
                .update(updates)
                .eq('id', id)
                .select()
            return { data, error }
        }
    },

    // Posts table operations (example for SNS functionality)
    posts: {
        async create(postData: any) {
            const { data, error } = await supabase
                .from('posts')
                .insert([postData])
                .select()
            return { data, error }
        },

        async getAll() {
            const { data, error } = await supabase
                .from('posts')
                .select(`
          *,
          users (
            id,
            name,
            email
          )
        `)
                .order('created_at', { ascending: false })
            return { data, error }
        },

        async getByUserId(userId: string) {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false })
            return { data, error }
        }
    }
}

export default supabase