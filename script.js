// Função para cálculo de dieta e treino com base no peso, altura e objetivo
document.getElementById('formCalculo').addEventListener('submit', function(event) {
    event.preventDefault();

    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const objetivo = document.getElementById('objetivo').value;

    let plano = '';

    if (objetivo === 'emagrecer') {
        plano = `Plano para emagrecimento: Com base no seu peso e altura, recomendamos um déficit calórico diário. Inclua atividades cardiovasculares e treinos de resistência.`;
    } else if (objetivo === 'ganhar') {
        plano = `Plano para ganho de massa: Com base no seu peso e altura, recomendamos um superávit calórico diário. Inclua treinos de força com foco em hipertrofia.`;
    }

    document.getElementById('resultadoPlano').innerHTML = plano;
});

// Função para salvar os dados de evolução
function salvarEvolucao(data, peso, altura) {
    let historico = localStorage.getItem('historicoEvolucao');
    if (!historico) {
        historico = [];
    } else {
        historico = JSON.parse(historico);
    }

    historico.push({ data, peso, altura });

    localStorage.setItem('historicoEvolucao', JSON.stringify(historico));
}

// Exibir histórico de progresso
function exibirHistorico() {
    const historico = localStorage.getItem('historicoEvolucao');
    if (historico) {
        const dados = JSON.parse(historico);
        const historicoContainer = document.getElementById('historicoEvolucao');
        historicoContainer.innerHTML = '';

        dados.forEach(dado => {
            const div = document.createElement('div');
            div.innerHTML = `<strong>Data:</strong> ${dado.data} <br>
                             <strong>Peso:</strong> ${dado.peso} kg <br>
                             <strong>Altura:</strong> ${dado.altura} cm <br><hr>`;
            historicoContainer.appendChild(div);
        });
    }
}

document.getElementById('formEvolucao').addEventListener('submit', function(event) {
    event.preventDefault();

    const data = document.getElementById('data').value;
    const peso = parseFloat(document.getElementById('pesoEvolucao').value);
    const altura = parseFloat(document.getElementById('alturaEvolucao').value);

    if (data && peso && altura) {
        salvarEvolucao(data, peso, altura);
        exibirHistorico();
});

// Carregar histórico ao abrir o site
window.onload = function() {
    exibirHistorico();
};
