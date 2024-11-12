// Seleciona a área do céu e adiciona eventos para arrastar e clicar
const sky = document.getElementById('sky');

// Adiciona evento de arrastar para os planetas e estrelas
document.querySelectorAll('.celestial').forEach(element => {
    element.addEventListener('dragstart', (event) => {
        // Define o tipo de objeto que está sendo arrastado (estrela ou planeta)
        event.dataTransfer.setData('type', event.target.id);  // Use the id of the planet
    });
});

// Permite que o céu seja um alvo de "drop"
sky.addEventListener('dragover', (event) => {
    event.preventDefault();
});

// Função para verificar se há um planeta em um local específico
function isPlanetAtPosition(x, y) {
    const planets = document.querySelectorAll('.planet');
    return Array.from(planets).some(planet => {
        const rect = planet.getBoundingClientRect();
        return (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom);
    });
}

sky.addEventListener('drop', (event) => {
    event.preventDefault();

    // Obtém o tipo de corpo celeste a ser adicionado
    const type = event.dataTransfer.getData('type');
    const newCelestial = document.createElement('div');

    // Define as características do novo elemento
    if (type.startsWith('planet')) {  // Verifica se é um planeta
        // Verifica se já existe um planeta na posição onde o usuário quer soltar
        const rect = sky.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Se já houver um planeta nesse local, não permite colocar um novo
        if (isPlanetAtPosition(x, y)) {
            return;
        }

        newCelestial.classList.add('celestial', 'planet');
        newCelestial.classList.add(type); // Adiciona a classe específica do planeta (planet1, planet2, etc.)
        
        // Adiciona o evento de clique para excluir o planeta
        newCelestial.addEventListener('click', (event) => {
            // Impede que o evento de clique no planeta adicione uma estrela
            event.stopPropagation();
            newCelestial.remove();
        });
    } else if (type === 'star') {
        // Se for uma estrela, cria a estrela
        newCelestial.classList.add('celestial', 'star');
    }

    // Define a posição onde o jogador soltou o elemento
    const rect = sky.getBoundingClientRect();
    newCelestial.style.position = 'absolute';
    newCelestial.style.left = `${event.clientX - rect.left - newCelestial.offsetWidth / 2}px`;
    newCelestial.style.top = `${event.clientY - rect.top - newCelestial.offsetHeight / 2}px`;

    // Adiciona o novo elemento ao céu
    sky.appendChild(newCelestial);
});

// Evento para criar uma estrela ao clicar no céu
sky.addEventListener('click', (event) => {
    // Verifica se o clique não foi em um planeta
    const isPlanetClick = event.target.classList.contains('planet');

    if (isPlanetClick) {
        return; // Não cria uma estrela se o clique foi em um planeta
    }

    const star = document.createElement('div');
    star.classList.add('star');  // Adiciona a classe 'star' para estilização

    // Define a posição da estrela onde o usuário clicou
    const rect = sky.getBoundingClientRect();
    star.style.position = 'absolute';
    star.style.left = `${event.clientX - rect.left - 1.5}px`; // Ajusta para centralizar a estrela de 3px
    star.style.top = `${event.clientY - rect.top - 1.5}px`;

    // Adiciona a estrela ao céu
    sky.appendChild(star);
});
