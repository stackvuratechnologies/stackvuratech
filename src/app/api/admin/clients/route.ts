import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(req: NextRequest) {
  try {
    // 1. Strict Custom Password Check
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_UPLOAD_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized: Invalid Admin Secret.' }, { status: 403 });
    }

    // 2. Initialize the God-Mode Supabase Admin Client
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 3. Fetch the list of registered users directly from the Auth system
    const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 1000
    });

    if (error) throw error;

    // 4. Clean the data to only send necessary fields back to the frontend
    const safeUsers = users.map(user => ({
      id: user.id,
      email: user.email,
      fullName: user.user_metadata?.full_name || 'N/A',
      company: user.user_metadata?.company || '',
      clientType: user.user_metadata?.client_type || 'individual'
    }));

    return NextResponse.json({ clients: safeUsers });

  } catch (error: any) {
    console.error('Fetch Clients Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}