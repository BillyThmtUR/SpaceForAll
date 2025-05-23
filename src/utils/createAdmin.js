const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://odkawbjuwndlbrjllrts.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ka2F3Ymp1d25kbGJyamxscnRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxMTU1NjIsImV4cCI6MjA2MjY5MTU2Mn0.9kt_nK4P4nYNHvKYyfk9IOasDq-jpr_Z2ZbYCHPdoNM'
);

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



