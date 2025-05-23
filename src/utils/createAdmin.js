const { createClient } = require('@supabase/supabase-js');

async function createAdmin() {
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'billy.thomont@univ-reunion.fr',
    password: 'test',
    email_confirm: true,
  });

  if (error) {
    console.error('❌ Erreur création admin :', error.message);
  } else {
    console.log('✅ Admin créé :', data.user.id);
  }
}

createAdmin();



