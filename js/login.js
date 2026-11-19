import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
    'https://iqjsahuamgzskbktupci.supabase.co',
    'sb_publishable_ScRr0vEWNUa6861mQg8lsg_wsj_FRxv'
);

document.getElementById("form-login").addEventListener("submit", async function(event) {
    event.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
        email: document.getElementById("email").value,
        password: document.getElementById("senha").value
    });

    if (error) {
        alert("Email ou senha incorretos");
        return;
    }

    window.location.href = "../pages/inicio.html";
});
