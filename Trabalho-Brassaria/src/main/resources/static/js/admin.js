// Painel administrativo: abas Eventos e Bebidas (requer login de administrador)
const $ = (id) => document.getElementById(id);

function formatarData(iso) {
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}
// Se a sessão expirar, o servidor redireciona para o login: volta para lá.
async function chamar(url, opcoes) {
  const r = await fetch(url, opcoes);
  if (r.redirected && r.url.includes("login")) { location.href = "login.html"; throw new Error("sessao"); }
  return r;
}
function aviso(id, texto, ok) { const m = $(id); m.textContent = texto; m.className = ok ? "ok" : "erro"; }
function linha(texto, sub, aoExcluir) {
  const l = document.createElement("div"); l.className = "linha-evento";
  const t = document.createElement("span"); t.textContent = texto;
  if (sub) { const s = document.createElement("small"); s.textContent = sub; t.appendChild(s); }
  const b = document.createElement("button"); b.type = "button"; b.className = "btn-excluir"; b.textContent = "Excluir";
  b.addEventListener("click", aoExcluir);
  l.append(t, b); return l;
}

/* ---------- Abas ---------- */
function abrirAba(nome) {
  ["eventos", "bebidas"].forEach(n => {
    $("painel-" + n).hidden = n !== nome;
    $("aba-" + n).setAttribute("aria-selected", n === nome);
  });
  history.replaceState(null, "", "#" + nome);
}
document.querySelectorAll(".aba").forEach(b => b.addEventListener("click", () => abrirAba(b.dataset.aba)));
$("btn-sair").addEventListener("click", async () => { await fetch("/logout", { method: "POST" }); location.href = "index.html"; });

/* ---------- Eventos ---------- */
async function listarEventos() {
  const c = $("lista-admin");
  const eventos = await (await chamar("/eventos")).json();
  c.innerHTML = "";
  if (!eventos.length) { c.textContent = "Nenhum evento cadastrado."; return; }
  eventos.sort((a, b) => b.id - a.id).forEach(e =>
    c.appendChild(linha(e.titulo, formatarData(e.dataEvento), () => excluirEvento(e.id, e.titulo))));
}
async function excluirEvento(id, titulo) {
  if (!confirm(`Excluir o evento "${titulo}"?`)) return;
  await chamar("/eventos/" + id, { method: "DELETE" });
  listarEventos();
}
$("form-evento").addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const dados = { titulo: $("titulo").value.trim(), descricao: $("descricao").value.trim(), dataEvento: $("dataEvento").value };
  const r = await chamar("/eventos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(dados) });
  if (r.ok) { aviso("mensagem", "Evento cadastrado com sucesso!", true); ev.target.reset(); listarEventos(); }
  else aviso("mensagem", "Não foi possível cadastrar o evento.", false);
});

/* ---------- Bebidas ---------- */
async function carregarCategorias(selecionar) {
  const cats = await (await chamar("/categorias")).json();
  const s = $("categoriaBebida"); s.innerHTML = "";
  if (!cats.length) s.innerHTML = '<option value="">Cadastre uma categoria primeiro</option>';
  cats.forEach(c => { const o = document.createElement("option"); o.value = c.id; o.textContent = c.nome; s.appendChild(o); });
  if (selecionar) s.value = selecionar;
  if (!cats.length) $("bloco-cat").hidden = false;
}
async function listarBebidas() {
  const c = $("lista-bebidas");
  const bebidas = await (await chamar("/bebidas")).json();
  c.innerHTML = "";
  if (!bebidas.length) { c.textContent = "Nenhuma bebida cadastrada."; return; }
  bebidas.sort((a, b) => b.id - a.id).forEach(b =>
    c.appendChild(linha(b.nome, b.categoriaNome, () => excluirBebida(b.id, b.nome))));
}
async function excluirBebida(id, nome) {
  if (!confirm(`Excluir a bebida "${nome}"?`)) return;
  await chamar("/bebidas/" + id, { method: "DELETE" });
  listarBebidas();
}
$("btn-nova-cat").addEventListener("click", () => { $("bloco-cat").hidden = !$("bloco-cat").hidden; $("nomeCategoria").focus(); });
$("btn-salvar-cat").addEventListener("click", async () => {
  const nome = $("nomeCategoria").value.trim();
  if (!nome) return;
  const r = await chamar("/categorias", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ nome }) });
  if (r.ok) { const nova = await r.json(); $("nomeCategoria").value = ""; await carregarCategorias(nova.id); aviso("mensagem-bebida", `Categoria "${nome}" criada.`, true); }
  else aviso("mensagem-bebida", "Não foi possível criar a categoria.", false);
});
$("form-bebida").addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const dados = { nome: $("nomeBebida").value.trim(), categoriaId: Number($("categoriaBebida").value) };
  if (!dados.categoriaId) return aviso("mensagem-bebida", "Escolha ou crie uma categoria.", false);
  const r = await chamar("/bebidas", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(dados) });
  if (r.ok) { aviso("mensagem-bebida", "Bebida cadastrada com sucesso!", true); $("nomeBebida").value = ""; listarBebidas(); }
  else aviso("mensagem-bebida", "Não foi possível cadastrar a bebida.", false);
});

abrirAba(location.hash === "#bebidas" ? "bebidas" : "eventos");
listarEventos(); carregarCategorias(); listarBebidas();
