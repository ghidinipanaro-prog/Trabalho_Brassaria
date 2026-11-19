// Cabeçalho, menu e rodapé compartilhados por todas as páginas
const SVG = (d) => `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICONES = {
  alvo: SVG('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>'),
  olho: SVG('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
  agenda: SVG('<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/>'),
  caneca: SVG('<path d="M5 8h11v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"/><path d="M16 11h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2"/><path d="M5 8c0-2 1.5-3 3-3 .5-1.5 2-2 3.5-1.5C13 3 15 4 15 5.5c.8.3 1 1.2 1 2.5M9 12v5M12 12v5"/>'),
  estrela: SVG('<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>'),
  renova: SVG('<path d="M20 12a8 8 0 1 1-2.5-5.8"/><path d="M20 4v5h-5"/>'),
  escudo: SVG('<path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5L16 9.5"/>'),
  coracao: SVG('<path d="M12 20s-7.5-4.6-9-9.5A5 5 0 0 1 12 7a5 5 0 0 1 9 3.5C19.5 15.4 12 20 12 20z"/>'),
  folha: SVG('<path d="M5 19C5 10 10 5 20 4c0 10-5 15-14 15z"/><path d="M5 19c3-5 6-8 10-10"/>'),
  seta: SVG('<path d="M6 9l6 6 6-6"/>')
};
// Os 5 valores (os títulos devem ser iguais aos devolvidos por /institucional)
const VALORES = [
  { titulo: "Tradição que se renova", pagina: "tradicao-que-se-renova.html", icone: "renova", tema: "t-1", resumo: "780 anos de história como ponto de partida para inovar." },
  { titulo: "Consumo responsável", pagina: "consumo-responsavel.html", icone: "escudo", tema: "t-2", resumo: "Celebrar com consciência, moderação e informação clara." },
  { titulo: "Cuidado com a saúde dos clientes", pagina: "cuidado-com-a-saude.html", icone: "coracao", tema: "t-3", resumo: "Opções para todos os estilos de vida, com e sem álcool." },
  { titulo: "Qualidade em cada etapa da produção", pagina: "qualidade-na-producao.html", icone: "estrela", tema: "t-4", resumo: "Atenção ao ingrediente, ao processo e ao copo final." },
  { titulo: "Respeito às pessoas e ao meio ambiente", pagina: "respeito-pessoas-meio-ambiente.html", icone: "folha", tema: "t-5", resumo: "Gente e natureza vêm antes de qualquer receita." }
];
const MENU = [
  { t: "Início", h: "index.html", k: "home" },
  { t: "Últimos eventos", h: "eventos.html", k: "eventos" },
  { t: "Nosso portfólio", h: "portfolio.html", k: "portfolio" },
  { t: "Missão", h: "missao.html", k: "missao" },
  { t: "Visão", h: "visao.html", k: "visao" },
  { t: "Valores", h: "valores.html", k: "valores", sub: true }
];

function montarLayout() {
  const pagina = document.body.dataset.page;
  const atual = document.body.dataset.sub;
  const itens = MENU.map(i => i.sub
    ? `<li class="tem-sub"><a href="${i.h}"${pagina === "valores" && !atual ? ' aria-current="page"' : ''}>${i.t}</a>
        <button class="sub-toggle" type="button" aria-expanded="false" aria-label="Abrir lista de valores">${ICONES.seta}</button>
        <ul class="submenu">${VALORES.map(v => `<li><a href="${v.pagina}"${atual === v.pagina ? ' aria-current="page"' : ''}>${v.titulo}</a></li>`).join("")}</ul></li>`
    : `<li><a href="${i.h}"${i.k === pagina ? ' aria-current="page"' : ''}>${i.t}</a></li>`).join("");

  const cab = document.getElementById("cabecalho");
  if (cab) cab.innerHTML = `<header class="topo"><div class="wrap barra">
    <a class="marca" href="index.html" aria-label="Brassaria 780 anos, página inicial"><span class="selo">780</span><span>Brassaria<small>780 anos</small></span></a>
    <button class="burger" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu"><span></span></button>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${itens}</ul></nav></div></header>`;

  const rod = document.getElementById("rodape");
  if (rod) rod.innerHTML = `<footer class="rodape"><div class="wrap"><div class="rod-grid">
    <div><h3>Brassaria 780 anos</h3><p>Quase oito séculos de tradição, com sabor para todos os momentos.</p></div>
    <div><h3>Conheça</h3><ul>${MENU.slice(1, 5).map(i => `<li><a href="${i.h}">${i.t}</a></li>`).join("")}</ul></div>
    <div><h3>Nossos valores</h3><ul>${VALORES.map(v => `<li><a href="${v.pagina}">${v.titulo}</a></li>`).join("")}</ul></div></div>
    <p class="aviso-legal">Beba com moderação. Venda e consumo de bebidas alcoólicas proibidos para menores de 18 anos. Se beber, não dirija.</p></div></footer>`;

  const burger = document.querySelector(".burger"), menu = document.getElementById("menu");
  if (!burger) return;
  const alternar = (abrir) => { menu.classList.toggle("visivel", abrir); burger.setAttribute("aria-expanded", abrir); burger.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu"); };
  burger.addEventListener("click", () => alternar(!menu.classList.contains("visivel")));
  const sub = document.querySelector(".tem-sub"), tg = document.querySelector(".sub-toggle");
  tg.addEventListener("click", () => { const a = sub.classList.toggle("aberto"); tg.setAttribute("aria-expanded", a); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") { alternar(false); sub.classList.remove("aberto"); } });
  document.addEventListener("click", e => { if (!e.target.closest(".tem-sub")) sub.classList.remove("aberto"); });
  window.addEventListener("resize", () => { if (innerWidth > 960) alternar(false); });
}
montarLayout();

// Ícones declarados no HTML via data-ico
document.querySelectorAll("[data-ico]").forEach(e => { e.innerHTML = ICONES[e.dataset.ico] || ""; });

// Botão flutuante "voltar ao topo"
(function () {
  const b = document.createElement("button");
  b.type = "button"; b.className = "topo-btn"; b.setAttribute("aria-label", "Voltar ao topo");
  b.innerHTML = ICONES.seta;
  b.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  document.body.appendChild(b);
  addEventListener("scroll", () => b.classList.toggle("ver", scrollY > 500), { passive: true });
})();
