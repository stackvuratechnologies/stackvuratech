import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  try {
    // 1. Strict Custom Password Check
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_UPLOAD_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized: Invalid Admin Secret.' }, { status: 403 });
    }

    // 2. Parse the incoming form data
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const clientId = formData.get('clientId') as string;
    const category = formData.get('category') as string;

    if (!file || !clientId || !category) {
      return NextResponse.json({ error: 'Missing required upload fields.' }, { status: 400 });
    }

    // 3. Initialize the God-Mode Supabase Admin Client
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 4. Convert file to buffer and force the upload (bypassing RLS)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filePath = `${clientId}/${category}/${file.name}`;

    const { error } = await supabaseAdmin.storage
      .from('client-vault')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true
      });

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Asset secured in vault.' });

  } catch (error: any) {
    console.error('Vault Upload Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}