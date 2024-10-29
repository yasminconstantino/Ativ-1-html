// Api de previsão do tempo
const apiKey = 'f9e9deb52a12c7876a858b759b6c4260';
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Giverny,fr&units=metric&appid=${apiKey}&lang=pt`;

async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();
        
        if (data.main) {
            const { temp, humidity } = data.main;
            const description = data.weather[0].description;
            document.getElementById('weather').innerHTML = `
                <strong>${temp}°C</strong> com ${description}. Umidade: ${humidity}%
            `;
        } else {
            document.getElementById('weather').innerHTML = "Clima não disponível no momento.";
        }
    } catch (error) {
        document.getElementById('weather').innerHTML = "Erro ao buscar o clima.";
        console.error("Erro ao obter dados de clima:", error);
    }
}

fetchWeather();



//Api das imagenss
const accessKey = 'XY3RS2Mb0-zPs2SbaRu8QqVmdylY1YXQs45hnA6Ez_o';
const query = 'garden'; // Tema de busca
const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&per_page=2`;

async function fetchImages() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Erro ao buscar imagens');
        }

        const data = await response.json();

        // Monta o HTML para exibir as imagens
        const imagesHTML = data.results.map(image => `
            <figure>
                <img src="${image.urls.small}" alt="${image.alt_description}" />
                <figcaption>${image.description || 'Imagem Inspiradora'}</figcaption>
            </figure>
        `).join('');

        document.getElementById('imagesContainer').innerHTML = imagesHTML;
    } catch (error) {
        document.getElementById('imagesContainer').innerHTML = "Não foi possível carregar as imagens.";
        console.error("Erro ao obter imagens:", error);
    }
}

fetchImages();



//Validação do form
function validarFormulario(event) {
    event.preventDefault(); // pra n enviar o form até q tudo seja validado

    // elementos do form
    const nome = document.getElementById('nome');
    const sobrenome = document.getElementById('sobrenome');
    const rg = document.getElementById('rg');
    const cpf = document.getElementById('cpf');
    const email = document.getElementById('email');
    const pintura = document.getElementById('pintura');
    const color = document.getElementById('color');
    const birthday = document.getElementById('birthday');
    const appt = document.getElementById('appt');
    const quantity = document.getElementById('quantity');
    const range = document.getElementById('range');
    const website = document.getElementById('website');

    limparMensagensErro();

    // p controlar a validacao final
    let formularioValido = true;

    // valida nome
    if (nome.value.trim() === "") {
        exibirErro(nome, "O nome é obrigatório.");
        formularioValido = false;
    }

    // valida sobrenome
    if (sobrenome.value.trim() === "") {
        exibirErro(sobrenome, "O sobrenome é obrigatório.");
        formularioValido = false;
    }

    // valida rg
    const rgRegex = /^\d{2}\.\d{3}\.\d{3}-\d{1}$/;
    if (rg.value && !rgRegex.test(rg.value)) {
        exibirErro(rg, "O RG deve estar no formato 00.000.000-0.");
        formularioValido = false;
    }

    // valida cpf
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(cpf.value)) {
        exibirErro(cpf, "O CPF deve estar no formato 000.000.000-00.");
        formularioValido = false;
    }

    // valida email
    if (!email.checkValidity()) {
        exibirErro(email, "Por favor, insira um endereço de email válido.");
        formularioValido = false;
    }

    // valida pintura
    if (pintura.value.trim() === "") {
        exibirErro(pintura, "Por favor, selecione sua pintura favorita.");
        formularioValido = false;
    }

    // valida cor
    if (!color.value) {
        exibirErro(color, "Por favor, escolha uma cor.");
        formularioValido = false;
    }

    // valida a data
    if (!birthday.checkValidity()) {
        exibirErro(birthday, "Por favor, selecione uma data de visita válida.");
        formularioValido = false;
    }

    // valida a hr
    if (!appt.value) {
        exibirErro(appt, "Por favor, selecione o horário da visita.");
        formularioValido = false;
    }

    // valida a quantia
    if (quantity.value < 1 || quantity.value > 8) {
        exibirErro(quantity, "A quantidade deve estar entre 1 e 8.");
        formularioValido = false;
    }

    // valida o valor do nivel
    if (range.value < 1 || range.value > 100) {
        exibirErro(range, "O valor deve estar entre 1 e 100.");
        formularioValido = false;
    }

    // valida url
    if (website.value && !website.checkValidity()) {
        exibirErro(website, "Insira uma URL válida (Exemplo: instagram.com/seuperfil).");
        formularioValido = false;
    }

    // ver se o form ta td valido
    if (formularioValido) {
        alert("Formulário enviado com sucesso!");
        document.querySelector('form').reset(); // reseta se tiver td certo
    }
}

// msgs de erro
function exibirErro(elemento, mensagem) {
    const erro = document.createElement('span');
    erro.classList.add('erro');
    erro.style.color = 'red';
    erro.innerText = mensagem;
    elemento.parentNode.insertBefore(erro, elemento.nextSibling);
}

// limpar msgs de erro
function limparMensagensErro() {
    const mensagensErro = document.querySelectorAll('.erro');
    mensagensErro.forEach(mensagem => mensagem.remove());
}

// add evento no botao
document.getElementById('submitBtn').addEventListener('click', validarFormulario);
