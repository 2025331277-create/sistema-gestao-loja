import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  "https://iqjsahuamgzskbktupci.supabase.co",
  "sb_publishable_ScRr0vEWNUa6861mQg8lsg_wsj_FRxv",
);

const formulario = document.querySelector("#form-login");

if (formulario) {
  formulario.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const email = document.querySelector("#email").value.trim();
    const senha = document.querySelector("#senha").value;

    try {
      const loginAuth = await supabase.auth.signInWithPassword({
        email: email,
        password: senha,
      });

      if (!loginAuth.error) {
        localStorage.setItem("usuario", JSON.stringify({ email: email }));
        window.location.href = "pages/inicio.html";
        return;
      }

      const resposta = await fetch(
        `https://iqjsahuamgzskbktupci.supabase.co/rest/v1/usuarios_acesso?select=id_usuarios,id_loja,cargo,email&email=eq.${encodeURIComponent(email)}&senha=eq.${encodeURIComponent(senha)}&limit=1`,
        {
          method: "GET",
          headers: {
            apikey: "sb_publishable_ScRr0vEWNUa6861mQg8lsg_wsj_FRxv",
            "Content-Type": "application/json",
          },
        },
      );

      const usuarios = await resposta.json();

      if (usuarios.length === 0) {
        alert("E-mail ou senha incorretos.");
        return;
      }

      localStorage.setItem("usuario", JSON.stringify(usuarios[0]));
      window.location.href = "pages/inicio.html";
    } catch (erro) {
      console.log(erro);
      alert("Erro ao entrar no sistema.");
    }
  });
}
