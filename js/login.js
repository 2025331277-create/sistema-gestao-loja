import {
    createClient
} from 'https://esm.sh/@supabase/supabase-js';

const supabase = createClient(
    'https://iqjsahuamgzskbktupci.supabase.co',
    'sb_publishable_ScRr0vEWNUa6861mQg8lsg_wsj_FRxv'
);

const formulario = document.getElementById("form-login");

formulario.addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const {
        data,
        error
    } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha
    });

    if (error) {
        alert("Email ou senha incorretos!");
        console.log(error);
        return;
    }

    window.location.href = "../pages/pag_inicio.html";
});