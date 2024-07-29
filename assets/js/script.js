'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
}

navToggleEvent(navElemArr);
navToggleEvent(navLinks);



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});





class Destino {
  constructor(nome, regiao, descricao, fotos, atrativos, coordenadas) {
      this.nome = nome;
      this.regiao = regiao;
      this.descricao = descricao;
      this.fotos = fotos; // Array de URLs de fotos
      this.atrativos = atrativos; // Array de objetos Atrativo
      this.coordenadas = coordenadas; // {lat: x, lng: y}
  }
}

class Atrativo {
  constructor(nome, tipo, descricao, dicas) {
      this.nome = nome;
      this.tipo = tipo; // e.g., "praia", "monumento", "museu"
      this.descricao = descricao;
      this.dicas = dicas; // Array de strings com dicas de visitação
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const destinos = [
      new Destino(
          'São Luís',
          'Norte',
          'A capital do Maranhão, conhecida por seu centro histórico e cultura vibrante.',
          ['foto1.jpg', 'foto2.jpg'],
          [
              new Atrativo('Centro Histórico', 'monumento', 'Patrimônio Mundial da UNESCO.', ['Visite à noite para uma experiência mágica.']),
              new Atrativo('Praia do Calhau', 'praia', 'Uma das praias mais famosas de São Luís.', ['Melhor visitar no verão.'])
          ],
          { lat: -2.5297, lng: -44.3028 }
      ),
      // Adicione mais destinos aqui, como Alcântara, Lençóis Maranhenses, etc.
      new Destino(
          'Alcântara',
          'Oeste',
          'Famosa pela Festa do Divino e seu centro histórico.',
          ['alcantara1.jpg', 'alcantara2.jpg'],
          [
              new Atrativo('Festa do Divino', 'festa', 'Uma das mais tradicionais festas religiosas do Maranhão.', ['Visite durante o mês de maio.']),
              new Atrativo('Casa de Cultura Aeroespacial', 'museu', 'Um museu dedicado à história aeroespacial.', ['Verifique os horários de funcionamento antes de visitar.'])
          ],
          { lat: -2.4059, lng: -44.4158 }
      ),
      // Continue adicionando outros destinos como Lençóis Maranhenses, Chapada das Mesas, etc.
  ];

  const map = L.map('map').setView([-2.5297, -44.3028], 10);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  destinos.forEach(destino => {
      const marker = L.marker(destino.coordenadas).addTo(map);
      marker.on('click', () => {
          showDestinoDetails(destino);
      });
  });

  function showDestinoDetails(destino) {
      document.getElementById('destino-nome').innerText = destino.nome;
      document.getElementById('destino-descricao').innerText = destino.descricao;

      const fotosContainer = document.getElementById('destino-fotos');
      fotosContainer.innerHTML = '';
      destino.fotos.forEach(foto => {
          const img = document.createElement('img');
          img.src = foto;
          fotosContainer.appendChild(img);
      });

      const atrativosList = document.getElementById('destino-atrativos');
      atrativosList.innerHTML = '';
      destino.atrativos.forEach(atrativo => {
          const li = document.createElement('li');
          li.innerText = `${atrativo.nome} (${atrativo.tipo}): ${atrativo.descricao}`;
          atrativo.dicas.forEach(dica => {
              const p = document.createElement('p');
              p.innerText = dica;
              li.appendChild(p);
          });
          atrativosList.appendChild(li);
      });

      document.getElementById('destino-details').style.display = 'block';
  }

  window.searchDestinos = function() {
      const query = document.getElementById('search-input').value.toLowerCase();
      const filteredDestinos = destinos.filter(destino => 
          destino.nome.toLowerCase().includes(query) || 
          destino.regiao.toLowerCase().includes(query)
      );

      if (filteredDestinos.length > 0) {
          showDestinoDetails(filteredDestinos[0]);
      } else {
          alert('Nenhum destino encontrado.');
      }
  };
});


const destinos = [
  new Destino(
      'Ilha de São Luís',
      'Norte',
      'Inclui São Luís, Raposa, São José de Ribamar e Paço do Lumiar. Conhecida pelo centro histórico, praias, fronhas maranhenses, bumba-meu-boi, tambor de crioula, tambor de mina e cacuriá.',
      ['sao_luis1.jpg', 'sao_luis2.jpg'],
      [
          new Atrativo('Centro Histórico', 'monumento', 'Patrimônio Mundial da UNESCO.', ['Visite à noite para uma experiência mágica.']),
          new Atrativo('Praias', 'praia', 'Belezas naturais e locais perfeitos para relaxar.', ['Melhor visitar no verão.']),
          new Atrativo('Fronhas Maranhenses', 'paisagem', 'Paisagem natural única.', ['Leve água e protetor solar.']),
          new Atrativo('Bumba-Meu-Boi', 'cultura', 'Festa popular tradicional.', ['Aproveite durante as festas juninas.']),
          new Atrativo('Tambor de Crioula', 'cultura', 'Dança afro-brasileira.', ['Visite durante as festas culturais.']),
          new Atrativo('Tambor de Mina', 'cultura', 'Religião afro-brasileira.', ['Respeite as tradições locais.']),
          new Atrativo('Cacuriá', 'cultura', 'Dança típica maranhense.', ['Visite durante o São João.'])
      ],
      { lat: -2.5297, lng: -44.3028 }
  ),
]
  new Destino(
      'Alcântara',
      'Oeste',
      'Famosa pela Festa do Divino e seu centro histórico.',
      ['alcantara1.jpg', 'alcantara2.jpg'],
      [
          new Atrativo('Festa do Divino', 'festa', 'Uma das mais tradicionais festas religiosas do Maranhão.', ['Visite durante o mês de maio.']),
          new Atrativo('Casa de Cultura Aeroespacial', 'museu', 'Um museu dedicado à história aeroespacial.', ['Verifique os horários de funcionamento antes de visitar.']),
          new Atrativo('Centro Histórico', 'monumento', 'Arquitetura colonial preservada.', ['Caminhe pelas ruas de pedra e aprecie os casarões históricos.'])
      ],
      { lat: -2.4059, lng: -44.4158 }
  ),
  new Destino(
      'Parque Nacional dos Lençóis Maranhenses',
      'Nordeste',
      'Inclui Barreirinhas, Santo Amaro e Primeira Cruz. Conhecido por suas dunas de areia e lagoas cristalinas.',
      ['lencois1.jpg', 'lencois2.jpg'],
      
          new Atrativo('Dunas de Areia', 'paisagem', 'Dunas de areia branca que se estendem por quilômetros.', ['Visite durante a temporada de lagoas cheias, entre maio e setembro.']),
          new Atrativo('Lagoas Cristalinas', 'paisagem', 'Lagoas de água doce formadas pelas chuvas.', ['Leve roupa de banho']),
  )