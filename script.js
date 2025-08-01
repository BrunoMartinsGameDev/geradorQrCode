// Função para baixar o QR Code como imagem PNG
function baixarQRCode() {
    const qrcodeDiv = document.getElementById('qrcode');
    const canvas = qrcodeDiv.querySelector('canvas');
    if (!canvas) {
        alert('Gere um QR Code primeiro!');
        return;
    }
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qrcode.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Esconde a área do QR Code ao iniciar
document.getElementById('qrcode-area').style.display = 'none';
document.getElementById('baixar-btn').addEventListener('click', baixarQRCode);
// Gerador de QR Code - script.js
// Utiliza a biblioteca QRCode.js via CDN (index.html)

// Função para atualizar o formulário dinâmico
function atualizarFormulario(tipo) {
    const form = document.getElementById('dynamic-form');
    form.innerHTML = '';
    if (tipo === 'link') {
        form.innerHTML = `<label for="input-link">URL do Link:</label><input type="url" id="input-link" placeholder="https://exemplo.com" required>`;
    } else if (tipo === 'texto') {
        form.innerHTML = `<label for="input-texto">Texto:</label><textarea id="input-texto" rows="4" placeholder="Digite o texto aqui" required></textarea>`;
    } else if (tipo === 'email') {
        form.innerHTML = `
            <label for="input-email">E-mail:</label><input type="email" id="input-email" placeholder="destinatario@exemplo.com" required>
            <label for="input-assunto">Assunto:</label><input type="text" id="input-assunto" placeholder="Assunto">
            <label for="input-corpo">Corpo:</label><textarea id="input-corpo" rows="3" placeholder="Mensagem"></textarea>
        `;
    } else if (tipo === 'sms') {
        form.innerHTML = `
            <label for="input-sms-numero">Número:</label><input type="tel" id="input-sms-numero" placeholder="11999999999" required>
            <label for="input-sms-mensagem">Mensagem:</label><textarea id="input-sms-mensagem" rows="2" placeholder="Mensagem"></textarea>
        `;
    } else if (tipo === 'telefone') {
        form.innerHTML = `<label for="input-tel-numero">Número:</label><input type="tel" id="input-tel-numero" placeholder="11999999999" required>`;
    } else if (tipo === 'whatsapp') {
        form.innerHTML = `
            <label for="input-wa-numero">Número (com DDI):</label><input type="tel" id="input-wa-numero" placeholder="5511999999999" required>
            <label for="input-wa-mensagem">Mensagem:</label><textarea id="input-wa-mensagem" rows="2" placeholder="Mensagem opcional"></textarea>
        `;
    } else if (tipo === 'localizacao') {
        form.innerHTML = `
            <label for="input-loc">Endereço ou coordenadas:</label><input type="text" id="input-loc" placeholder="Av. Paulista, 1000, São Paulo ou -23.56,-46.65" required>
        `;
    } else if (tipo === 'wifi') {
        form.innerHTML = `
            <label for="input-wifi-ssid">SSID:</label><input type="text" id="input-wifi-ssid" placeholder="Nome da rede" required>
            <label for="input-wifi-tipo">Tipo de segurança:</label>
            <select id="input-wifi-tipo">
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">Sem senha</option>
            </select>
            <label for="input-wifi-senha">Senha:</label><input type="text" id="input-wifi-senha" placeholder="Senha">
        `;
    } else if (tipo === 'evento') {
        form.innerHTML = `
            <label for="input-evento-titulo">Título:</label><input type="text" id="input-evento-titulo" required>
            <label for="input-evento-local">Local:</label><input type="text" id="input-evento-local">
            <label for="input-evento-inicio">Início:</label><input type="datetime-local" id="input-evento-inicio" required>
            <label for="input-evento-fim">Fim:</label><input type="datetime-local" id="input-evento-fim" required>
            <label for="input-evento-desc">Descrição:</label><textarea id="input-evento-desc" rows="2"></textarea>
        `;
    } else if (tipo === 'vcard') {
        form.innerHTML = `
            <label for="input-vcard-nome">Nome:</label><input type="text" id="input-vcard-nome" required>
            <label for="input-vcard-tel">Telefone:</label><input type="tel" id="input-vcard-tel">
            <label for="input-vcard-email">E-mail:</label><input type="email" id="input-vcard-email">
            <label for="input-vcard-org">Empresa:</label><input type="text" id="input-vcard-org">
        `;
    }
}

document.getElementById('tipo').addEventListener('change', function(e) {
    atualizarFormulario(e.target.value);
});

// Inicializa com o campo de link
atualizarFormulario('link');

// Função para gerar QR Code
async function gerarQRCode() {
    const tipo = document.getElementById('tipo').value;
    let conteudo = '';
    if (tipo === 'link') {
        conteudo = document.getElementById('input-link').value.trim();
        if (!conteudo) return alert('Digite um link válido!');
    } else if (tipo === 'texto') {
        conteudo = document.getElementById('input-texto').value.trim();
        if (!conteudo) return alert('Digite um texto!');
    } else if (tipo === 'email') {
        const email = document.getElementById('input-email').value.trim();
        const assunto = encodeURIComponent(document.getElementById('input-assunto').value.trim());
        const corpo = encodeURIComponent(document.getElementById('input-corpo').value.trim());
        if (!email) return alert('Digite o e-mail!');
        conteudo = `mailto:${email}`;
        if (assunto || corpo) {
            conteudo += '?';
            if (assunto) conteudo += `subject=${assunto}`;
            if (assunto && corpo) conteudo += '&';
            if (corpo) conteudo += `body=${corpo}`;
        }
    } else if (tipo === 'sms') {
        const numero = document.getElementById('input-sms-numero').value.trim();
        const mensagem = encodeURIComponent(document.getElementById('input-sms-mensagem').value.trim());
        if (!numero) return alert('Digite o número!');
        conteudo = `sms:${numero}`;
        if (mensagem) conteudo += `?body=${mensagem}`;
    } else if (tipo === 'telefone') {
        const numero = document.getElementById('input-tel-numero').value.trim();
        if (!numero) return alert('Digite o número!');
        conteudo = `tel:${numero}`;
    } else if (tipo === 'whatsapp') {
        const numero = document.getElementById('input-wa-numero').value.trim();
        const mensagem = encodeURIComponent(document.getElementById('input-wa-mensagem').value.trim());
        if (!numero) return alert('Digite o número!');
        conteudo = `https://wa.me/${numero}`;
        if (mensagem) conteudo += `?text=${mensagem}`;
    } else if (tipo === 'localizacao') {
        const loc = document.getElementById('input-loc').value.trim();
        if (!loc) return alert('Digite o endereço ou coordenadas!');
        conteudo = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc)}`;
    } else if (tipo === 'wifi') {
        const ssid = document.getElementById('input-wifi-ssid').value.trim();
        const tipoWifi = document.getElementById('input-wifi-tipo').value;
        const senha = document.getElementById('input-wifi-senha').value;
        if (!ssid) return alert('Digite o SSID!');
        conteudo = `WIFI:T:${tipoWifi};S:${ssid};`;
        if (tipoWifi !== 'nopass') conteudo += `P:${senha};`;
        conteudo += ';';
    } else if (tipo === 'evento') {
        const titulo = document.getElementById('input-evento-titulo').value.trim();
        const local = document.getElementById('input-evento-local').value.trim();
        const inicio = document.getElementById('input-evento-inicio').value;
        const fim = document.getElementById('input-evento-fim').value;
        const desc = document.getElementById('input-evento-desc').value.trim();
        if (!titulo || !inicio || !fim) return alert('Preencha título, início e fim!');
        // Formato iCal
        conteudo = `BEGIN:VEVENT\nSUMMARY:${titulo}\nLOCATION:${local}\nDESCRIPTION:${desc}\nDTSTART:${inicio.replace(/[-:]/g, '').slice(0, 15)}\nDTEND:${fim.replace(/[-:]/g, '').slice(0, 15)}\nEND:VEVENT`;
    } else if (tipo === 'vcard') {
        const nome = document.getElementById('input-vcard-nome').value.trim();
        const tel = document.getElementById('input-vcard-tel').value.trim();
        const email = document.getElementById('input-vcard-email').value.trim();
        const org = document.getElementById('input-vcard-org').value.trim();
        if (!nome) return alert('Digite o nome!');
        conteudo = `BEGIN:VCARD\nVERSION:3.0\nFN:${nome}\n`;
        if (tel) conteudo += `TEL;TYPE=CELL:${tel}\n`;
        if (email) conteudo += `EMAIL:${email}\n`;
        if (org) conteudo += `ORG:${org}\n`;
        conteudo += 'END:VCARD';
    }
    // Limpa QRCode anterior
    document.getElementById('qrcode').innerHTML = '';
    // Exibe a área do QR Code
    document.getElementById('qrcode-area').style.display = 'flex';
    // Gera novo QRCode
    new QRCode(document.getElementById('qrcode'), {
        text: conteudo,
        width: 220,
        height: 220,
        correctLevel: 2 // H
    });
}

document.getElementById('gerar-btn').addEventListener('click', function(e) {
    e.preventDefault();
    gerarQRCode();
});
