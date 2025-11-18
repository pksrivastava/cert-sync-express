import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-webhook-signature',
};

interface CompletionPayload {
  user_id: string;
  course_id: string;
  external_course_id?: string;
  completion_status: 'completed' | 'failed' | 'in_progress';
  progress: number;
  score?: number;
  certificate_url?: string;
  completed_at?: string;
  partner_id?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Verify webhook signature (optional but recommended)
    const signature = req.headers.get('x-webhook-signature');
    const webhookSecret = Deno.env.get('WEBHOOK_SECRET');
    
    if (webhookSecret && signature) {
      const payload = await req.text();
      const expectedSignature = await crypto.subtle.digest(
        'SHA-256',
        new TextEncoder().encode(webhookSecret + payload)
      );
      const expectedSig = Array.from(new Uint8Array(expectedSignature))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      
      if (signature !== expectedSig) {
        console.error('Invalid webhook signature');
        return new Response(
          JSON.stringify({ error: 'Invalid signature' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    const body: CompletionPayload = typeof req.body === 'string' 
      ? JSON.parse(await req.text()) 
      : await req.json();

    console.log('Received completion webhook:', body);

    // Validate required fields
    if (!body.user_id || !body.course_id) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: user_id and course_id' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Find or create enrollment record
    const { data: existingEnrollment, error: fetchError } = await supabaseClient
      .from('course_enrollments')
      .select('*')
      .eq('user_id', body.user_id)
      .eq('course_id', body.course_id)
      .maybeSingle();

    if (fetchError) {
      console.error('Error fetching enrollment:', fetchError);
      return new Response(
        JSON.stringify({ error: 'Database error', details: fetchError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let enrollmentId: string;

    if (existingEnrollment) {
      // Update existing enrollment
      const updateData: any = {
        progress: body.progress,
      };

      if (body.completion_status === 'completed') {
        updateData.completed_at = body.completed_at || new Date().toISOString();
      }

      const { data: updated, error: updateError } = await supabaseClient
        .from('course_enrollments')
        .update(updateData)
        .eq('id', existingEnrollment.id)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating enrollment:', updateError);
        return new Response(
          JSON.stringify({ error: 'Failed to update enrollment', details: updateError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      enrollmentId = updated.id;
      console.log('Updated enrollment:', enrollmentId);
    } else {
      // Create new enrollment
      const { data: created, error: insertError } = await supabaseClient
        .from('course_enrollments')
        .insert({
          user_id: body.user_id,
          course_id: body.course_id,
          progress: body.progress,
          completed_at: body.completion_status === 'completed' 
            ? (body.completed_at || new Date().toISOString()) 
            : null,
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error creating enrollment:', insertError);
        return new Response(
          JSON.stringify({ error: 'Failed to create enrollment', details: insertError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      enrollmentId = created.id;
      console.log('Created new enrollment:', enrollmentId);
    }

    // Update course enrollment count if completed
    if (body.completion_status === 'completed') {
      // Try to get current course data and increment
      const { data: courseData } = await supabaseClient
        .from('courses')
        .select('enrollment_count')
        .eq('id', body.course_id)
        .single();

      if (courseData) {
        await supabaseClient
          .from('courses')
          .update({ 
            enrollment_count: (courseData.enrollment_count || 0) + 1 
          })
          .eq('id', body.course_id);
      }
    }

    // Update user karma if completed
    if (body.completion_status === 'completed') {
      // Get existing karma or create new
      const { data: karmaData } = await supabaseClient
        .from('user_karma')
        .select('*')
        .eq('user_id', body.user_id)
        .maybeSingle();

      if (karmaData) {
        await supabaseClient
          .from('user_karma')
          .update({
            total_points: (karmaData.total_points || 0) + 10,
            current_year_enrollments: (karmaData.current_year_enrollments || 0) + 1,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', body.user_id);
      } else {
        await supabaseClient
          .from('user_karma')
          .insert({
            user_id: body.user_id,
            total_points: 10,
            current_year_enrollments: 1,
          });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        enrollment_id: enrollmentId,
        message: 'Course completion processed successfully',
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Webhook error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        details: errorMessage 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
