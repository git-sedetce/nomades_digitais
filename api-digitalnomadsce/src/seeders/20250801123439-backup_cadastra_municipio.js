"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "cadastra_municipios",
      [
        {
          cidade: "Trairi",
          regiao: "Grande Fortaleza",
          email_prefeitura: "setur.trairi@hotmail.com",
          contato_prefeitura: "85991018517",
          link_prefeitura: "https://www.trairi.ce.gov.br/",
          historia_cidade: "De origem Tupi, a palavra Trairi significa Rio das Traíras, um peixe típico da região. Trairi nasceu como aldeia em 1608, com a chegada do povo Pitiguara às margens do rio que dá nome à cidade. Oficialmente município desde 1951, Trairi possui uma extensa costa marítima, além de lagoas, dunas, paisagens paradisíacas e uma rica cultura que inclui o artesanato, como a renda de bilro, e a fabricação de produtos regionais, como a rapadura.",
          wifi_service: "nao",
          wifi_cidade: "",
          service_estrangeiro: "O município de Trairi oferece serviços de atendimento ao turista junto à Secretaria de Turismo (Setur), serviços públicos gerais e atividades turísticas privadas mediante contratação.",
          service_cidade: "Setur: Rua Dr. José da Silveira, 0522, térreo – Centro.",
          service_empresario: "O município dispõe da Sala do Empreendedor, que oferece suporte ao profissional empreendedor, por meio de serviços como a emissão de nota fiscal e afins. Seu endereço fica na Av. Padre Tomás Feliu Amengual, 476.",
          service_seguranca: "O município, na área de segurança pública, está amparado pela Guarda Municipal (Av. Miguel Pinto, 145 – Planalto Norte), Polícia Militar (Av. Salvador Martins - Planalto Norte, próximo ao Estádio Manuel Barroso Neto) e Polícia do Turista (atua no policiamento da orla e das ruas, sem uma sede fixa no município).",
          pontos_turisticos: "As praias de Mundaú, Emboaca, Cana Brava, Guajiru, Flecheiras e seus respectivos atrativos (piscinas naturais, dunas, orla etc.); Lagoa das Almécegas, Igreja de Nossa Senhora do Livramento (Sede) e Calçadão às margens do Rio Trairi (Sede).",
          espacos_culturais: "",
          espacos_lazer: "Praça dos Mártires, Praça José Edson Filho, Praça da Matriz, Biblioteca José Silva Novo – Sede do Município, Mirante do Estuário do Rio Mundaú, Praças de Flecheiras e do Guajiru, Orlas das praias de Mundaú, Emboaca, Cana Brava, Guajiru e Flecheiras",
          tipo_turismo: "Praiano",
          rota: "sim",
          qual_rota: "Rota Costa dos Ventos",
          tourism_ecologico: "",
          tourism_praiano: "As praias de Mundaú, Emboaca, Cana Brava, Guajiru, Flecheiras, com suas piscinas naturais, dunas, orla, entre outros atrativos.",
          tourism_radical: "",
          tourism_religioso: "",
          tourism_serrano: "",
          tourism_sertanejo: "",
          createdAt: "2022-11-29 19:05:54.509+00",
          updatedAt: "2022-11-29 19:05:54.509+00",
          cod_ibg: "2313500",
        },

        {
          cidade: "Fortaleza",
          regiao: "Grande Fortaleza",
          email_prefeitura: "promocao@setfor.fortaleza.ce.gov.br",
          contato_prefeitura: "8531051513",
          link_prefeitura: "https://www.fortaleza.ce.gov.br/",
          historia_cidade: "Fortaleza é a capital do estado do Ceará, no nordeste do Brasil. A cidade foi fundada em 1726 pelo português Francisco Sá de Miranda e teve sua economia baseada na agricultura, com destaque para a produção de algodão. No século 19, Fortaleza passou por um processo de urbanização e industrialização, com a construção de ferrovias e a chegada de imigrantes europeus. Durante o século 20, a cidade se desenvolveu ainda mais com a construção de infraestrutura e a chegada de indústrias. ",
          wifi_service: "sim",
          wifi_cidade: "62 praças e pontos turísticos da cidade de Fortaleza.",
          service_estrangeiro: "Nas Casas do Turista você consegue informações sobre transporte, praias, hotéis, e outros. Tem também serviço de internet e atendimento bilíngue.",
          service_cidade: "As Casas do Turista estão no Aeroporto Pinto Martins (Av. Senador Carlos Jereissati, 3000 - Serrinha), no Estoril (Rua dos Tabajaras, 397 - Praia de Iracema), no Mercado Central (Av. Alberto Nepomuceno, 199 - Centro), na 10ª Região Militar (v. Alberto Nepomuceno, s/n - Centro) e na Parque da Liberdade (R. Pedro 1, s/n - Centro). ",
          service_empresario: "São ofertados serviços em parceria com Sebrae e Fecomércio",
          service_seguranca: "A Células de Proteção Comunitária são técnicas preditivas e ostensivas por meio da vigilância eletrônica e sistemática, com patrulhamento em motocicletas e viaturas, além de um sistema de vigilância eletrônica que monitora 24 horas toda a área assistida pela Célula. Atualmente as células estão localizadas no Jangurussu, Vila Velha, Canindezinho, Barra do Ceará, Goiabeiras, Caça e Pesca, Bonsucesso, Pôr do Sol, Pan Americano, Mondubim, Vicente Pizon e Beira Mar, Praia de Iracema e Centro.",
          pontos_turisticos: "Praia do Futuro, Praia de Iracema, Calçadão da Avenida Beira Mar, Mercado Central, Catedral Metropolitana de Fortaleza, Centro Dragão do Mar de Arte e Cultura, Passeio Público, Theatro José de Alencar, Museu da Imagem e do Som, Estação das Artes, Parque do Cocó, Mercado dos Peixes, Feirinha da Beira Mar, Museu da Fotografia, Estoril, Museu do Bode Ioiô e Centro Histórico.",
          espacos_culturais: "",
          espacos_lazer: "Biblioteca Pública Estadual do Ceará, Parque Adahil Barreto, Parque Rachel de Queiroz, Zoológico Municipal Sargento Prata e Parque da Liberdade Fortaleza",
          tipo_turismo: "Praiano",
          rota: "nao",
          qual_rota: "",
          tourism_ecologico: "",
          tourism_praiano: "Praia de Iracema, Praia do Mucuripe, Praia do Meireles, Praia do Futuro, Barra do Ceará e Sabiaguaba.",
          tourism_radical: "",
          tourism_religioso: "",
          tourism_serrano: "",
          tourism_sertanejo: "",
          createdAt: "2023-01-20 18:18:47.492+00",
          updatedAt: "2023-01-20 18:18:47.492+00",
          cod_ibg: "2304400",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("cadastra_municipios", null, {});
  },
};
