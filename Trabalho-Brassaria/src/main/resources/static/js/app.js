const MESES = ["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"];
const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };
const $ = (id) => document.getElementById(id);

async function api(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(r.status);
  return r.json();
}
function carregando(c, n = 3) { c.innerHTML = ""; for (let i = 0; i < n; i++) c.appendChild(el("div", "card esqueleto")); }
function vazio(c, txt) { c.innerHTML = ""; c.appendChild(el("div", "aviso", txt)); }
function erro(c, tentar) {
  c.innerHTML = "";
  const caixa = el("div", "aviso");
  caixa.appendChild(el("p", null, "Não foi possível carregar agora. Confira se o servidor está no ar."));
  const b = el("button", "btn", "Tentar de novo");
  b.type = "button"; b.addEventListener("click", tentar);
  caixa.appendChild(b); c.appendChild(caixa);
}

function cardEvento(ev, i) {
  const [ano, mes, dia] = ev.dataEvento.split("-");
  const card = el("article", "card evento");
  card.style.setProperty("--i", i);
  const selo = el("div", "selo-data");
  selo.append(el("strong", null, dia), el("span", null, `${MESES[+mes - 1]} ${ano}`));
  card.append(selo, el("h3", null, ev.titulo), el("p", null, ev.descricao));
  return card;
}

async function carregarEventos(limite) {
  const c = $("lista-eventos");
  carregando(c);
  try {
    let eventos = await api("/eventos/ultimos");
    if (limite) eventos = eventos.slice(0, limite);
    if (!eventos.length) return vazio(c, "Nenhum evento cadastrado ainda. Volte em breve!");
    c.innerHTML = "";
    eventos.forEach((e, i) => c.appendChild(cardEvento(e, i)));
  } catch { erro(c, () => carregarEventos(limite)); }
}

async function carregarPortfolio() {
  const c = $("lista-portfolio"), filtros = $("filtros");
  carregando(c);
  try {
    const bebidas = await api("/bebidas");
    if (!bebidas.length) return vazio(c, "Nenhuma bebida cadastrada ainda.");
    const grupos = {};
    bebidas.forEach(b => (grupos[b.categoriaNome] = grupos[b.categoriaNome] || []).push(b));
    const nomes = Object.keys(grupos);
    let ativo = "Todas";

    const desenhar = () => {
      c.innerHTML = "";
      filtros.querySelectorAll(".chip").forEach(b => b.setAttribute("aria-pressed", b.dataset.cat === ativo));
      let n = 0;
      nomes.filter(nome => ativo === "Todas" || nome === ativo).forEach(nome => {
        const bloco = el("section", "categoria");
        bloco.appendChild(el("h3", null, nome));
        const grade = el("div", "grade");
        grupos[nome].forEach(b => {
          const card = el("div", "card bebida");
          card.style.setProperty("--i", n++);
          card.innerHTML = ICONES.caneca;
          card.appendChild(el("span", null, b.nome));
          grade.appendChild(card);
        });
        bloco.appendChild(grade); c.appendChild(bloco);
      });
    };
    filtros.innerHTML = "";
    ["Todas", ...nomes].forEach(nome => {
      const b = el("button", "chip", nome);
      b.type = "button"; b.dataset.cat = nome;
      b.addEventListener("click", () => { ativo = nome; desenhar(); });
      filtros.appendChild(b);
    });
    desenhar();
  } catch { erro(c, carregarPortfolio); }
}

async function carregarTexto(campo) {
  const c = $("texto");
  try {
    const dados = await api("/institucional");
    c.textContent = dados[campo];
  } catch {
    c.textContent = "Não foi possível carregar este conteúdo agora. Tente novamente em instantes.";
  }
}

async function carregarValores() {
  const c = $("lista-valores");
  carregando(c, 5);
  try {
    const dados = await api("/institucional");
    c.innerHTML = "";
    dados.valores.forEach((nome, i) => {
      const v = VALORES.find(x => x.titulo === nome);
      const card = el(v ? "a" : "div", `card tile ${v ? v.tema : "t-1"}`);
      card.style.setProperty("--i", i);
      if (v) card.href = v.pagina;
      const bol = el("div", "bol"); bol.innerHTML = ICONES[v ? v.icone : "estrela"];
      card.append(bol, el("h3", null, nome));
      if (v) { card.append(el("p", null, v.resumo), el("span", "ir", "Saiba mais →")); }
      c.appendChild(card);
    });
  } catch { erro(c, carregarValores); }
}

async function carregarNumeros() {
  const [ev, be] = await Promise.allSettled([api("/eventos/ultimos"), api("/bebidas")]);
  const n = (r, f) => r.status === "fulfilled" ? f(r.value) : "–";
  $("n-bebidas").textContent = n(be, v => v.length);
  $("n-eventos").textContent = n(ev, v => v.length);
}

const pagina = document.body.dataset.page;
if (pagina === "home") { carregarEventos(3); carregarNumeros(); }
if (pagina === "eventos") carregarEventos();
if (pagina === "portfolio") carregarPortfolio();
if (pagina === "missao") carregarTexto("missao");
if (pagina === "visao") carregarTexto("visao");
if (pagina === "valores" && $("lista-valores")) carregarValores();
