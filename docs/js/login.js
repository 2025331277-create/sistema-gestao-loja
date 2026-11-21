import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
    'https://iqjsahuamgzskbktupci.supabase.co',
    'sb_publishable_ScRr0vEWNUa6861mQg8lsg_wsj_FRxv'
);

const formulario = document.getElementById("form-login");

formulario.addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha
    });

    if (error) {
        alert("E-mail ou senha incorretos.");
        return;
    }

    window.location.href = "pages/inicio.html";
});
