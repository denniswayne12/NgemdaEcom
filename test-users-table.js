const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkUsersTableStructure() {
  try {
    console.log('Checking users table structure by trying different column names...\n');
    
    // Try different variations of column names
    const variations = [
      // Original schema from supabase-schema.sql
      {
        name: 'Original schema (from file)',
        user: {
          userName: 'testuser1',
          fullName: 'Test User',
          email_address: 'test1@example.com',
          phoneNumber: null,
          userPassword: null
        }
      },
      // All lowercase
      {
        name: 'All lowercase',
        user: {
          username: 'testuser2',
          fullname: 'Test User',
          email_address: 'test2@example.com',
          phonenumber: null,
          userpassword: null
        }
      },
      // snake_case
      {
        name: 'snake_case',
        user: {
          user_name: 'testuser3',
          full_name: 'Test User',
          email_address: 'test3@example.com',
          phone_number: null,
          user_password: null
        }
      },
      // Mixed case from error message
      {
        name: 'Mixed case (from error)',
        user: {
          username: 'testuser4',
          fullname: 'Test User',
          email_address: 'test4@example.com',
          phonenumber: null,
          userpassword: null
        }
      }
    ];
    
    for (const variation of variations) {
      console.log(`--- Trying ${variation.name} ---`);
      
      const { data, error } = await supabase
        .from('users')
        .insert([variation.user])
        .select();
        
      if (error) {
        console.log(`❌ Insert failed:`);
        console.log(`   Error code: ${error.code}`);
        console.log(`   Error message: ${error.message}`);
        if (error.hint) console.log(`   Hint: ${error.hint}`);
      } else {
        console.log(`✅ Insert successful`);
        console.log(`   Data:`, data);
        
        // Clean up test user
        if (data && data[0]) {
          await supabase
            .from('users')
            .delete()
            .eq('id', data[0].id);
          console.log('   Test user cleaned up');
        }
      }
      console.log('');
    }
    
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

checkUsersTableStructure();