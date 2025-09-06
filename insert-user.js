const { createClient } = require('@supabase/supabase-js');

// Replace these with your actual Supabase credentials
const supabaseUrl = 'YOUR_SUPABASE_URL_HERE';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY_HERE';

const supabase = createClient(supabaseUrl, supabaseKey);

async function insertUser() {
  try {
    const userData = {
      userName: 'testuser123',
      fullName: 'Test User',
      email_address: 'test@example.com',
      phoneNumber: null,
      userPassword: null
    };

    console.log('Attempting to insert user:', userData);

    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select();

    if (error) {
      console.error('Error inserting user:', error);
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
    } else {
      console.log('User inserted successfully:', data);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

insertUser();
