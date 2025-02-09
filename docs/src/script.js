// Importando o Fabric.js
const canvas = new fabric.Canvas('canvas', {
  width: 300,
  height: 400,
  backgroundColor: '#f0f0f0',
});

// Upload de imagem no canvas
const uploadInput = document.getElementById('file-upload');
uploadInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      fabric.Image.fromURL(reader.result, (img) => {
        img.scaleToWidth(600);
        img.scaleToHeight(400);
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      });
    };
    reader.readAsDataURL(file);
  }
});

function updateFileName() {
  const fileInput = document.getElementById('file-upload');
  const fileNameDisplay = document.getElementById('file-name');
  const fileName = fileInput.files[0]?.name || 'Nenhum arquivo selecionado';
  fileNameDisplay.textContent = fileName;
}

document.addEventListener('DOMContentLoaded', () => {
  // Lista de cores disponíveis
  const colors = ['all','preto', 'branco', 'azul', 'verde', 'cinza', 'rosa'];

  // Função para carregar as imagens dinamicamente para uma cor específica
  async function loadBagsByColor(color) {
    try {
      const carousel = document.querySelector(`.carousel.${color}`);
      console.log("carrossel: "+carousel);
      console.log("cor "+color);

      if (!carousel) {
        console.warn(`Carrossel para a cor ${color} não encontrado.`);
        return;
      }

      // Fazer a requisição para a API correspondente à cor
      const response = await fetch(`https://18.117.138.102:3000/api/bolsas/${color}`);
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      const images = await response.json();

      // Adicionar cada imagem ao carrossel
      images.forEach(image => {
        const imgElement = document.createElement('img');
        // Caso a cor seja "all", usar o caminho completo; caso contrário, construir o caminho manualmente
        const src = color === 'all'
        ? `https://18.117.138.102:3000/bolsas/${image}` // Caminho completo fornecido pela API
        : `https://18.117.138.102:3000/bolsas/opcoes-${color}/${image}`; // Caminho para cor específica
        
        imgElement.src = src;
        imgElement.alt = image;
        imgElement.className = "accessory";
        imgElement.setAttribute('data-src', src);

        // Adicionar evento de clique
        imgElement.addEventListener('click', () => {
          const src = imgElement.getAttribute('data-src');
          addAccessory(src); // Chama a função para adicionar ao canvas
        });

        carousel.appendChild(imgElement);
      });
    } catch (error) {
      console.error(`Erro ao carregar imagens para a cor ${color}:`, error);
    }
  }

  // Iterar sobre cada cor e carregar as imagens dinamicamente
  colors.forEach(color => {
    loadBagsByColor(color);
  });

  // Configurar eventos de clique nos círculos de filtro
  const filterCircles = document.querySelectorAll('.filter-circle');
  filterCircles.forEach((circle) => {
    circle.addEventListener('click', () => {
      const color = circle.getAttribute('data-color');
      const carousels = document.querySelectorAll('.carousel');

      console.log(`Cor selecionada: ${color}`);

      // Ocultar todos os carrosséis
      carousels.forEach((carousel) => {
        carousel.classList.remove('active');
        carousel.style.display = 'none'; // Ocultar
      });

      // Exibir o carrossel correspondente
      if (color === 'all') {
        const allCarousel = document.querySelector('.carousel.all');
        if (allCarousel) {
          allCarousel.classList.add('active');
          allCarousel.style.display = 'flex'; // Mostrar como flex
        }
      } else {
        const selectedCarousel = document.querySelector(`.carousel.${color}`);
        if (selectedCarousel) {
          selectedCarousel.classList.add('active');
          selectedCarousel.style.display = 'flex'; // Mostrar como flex
        } else {
          console.warn(`Nenhum carrossel encontrado para a cor: ${color}`);
        }
      }
    });
  });
  
});


// Adiciona um acessório ao canvas
const addAccessory = (src) => {
  fabric.Image.fromURL(src, (img) => {
    img.scale(0.15);
    img.set({
      left: 100,
      top: 160,
      selectable: true,
    });

    // Adiciona evento de clique duplo para remover o acessório
    let clickCount = 0;
    img.on('mousedown', () => {
      clickCount++;
      setTimeout(() => {
        if (clickCount === 2) {
          canvas.remove(img); // Remove o objeto do canvas
        }
        clickCount = 0; // Reseta o contador de cliques
      }, 300); // Tempo para detectar clique duplo (300ms)
    });

    canvas.add(img);
    canvas.setActiveObject(img);
  });
};

// Lógica do Carrossel
const carousel = document.querySelector('.carousel');
// alert("teste");
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// Função para encontrar o carrossel ativo
function getActiveCarousel() {
  return document.querySelector('.carousel.active');
}

// Controle de rolagem do carrossel
prevBtn.addEventListener('click', () => {
  const activeCarousel = getActiveCarousel();
  if (activeCarousel) {
    activeCarousel.scrollBy({
      left: -100, // Ajuste a quantidade de rolagem
      behavior: 'smooth',
    });
  }
});

nextBtn.addEventListener('click', () => {
  const activeCarousel = getActiveCarousel();
  if (activeCarousel) {
    activeCarousel.scrollBy({
      left: 200, // Ajuste a quantidade de rolagem
      behavior: 'smooth',
    });
  }
});

// Referência aos círculos de filtro e carrosséis
const filterCircles = document.querySelectorAll('.filter-circle');

// Adicionar evento de clique para cada círculo
filterCircles.forEach((circle) => {
  circle.addEventListener('click', () => {
    const color = circle.getAttribute('data-color');
    const carousels = document.querySelectorAll('.carousel');

    console.log(color);

    // Ocultar todos os carrosséis
    carousels.forEach((carousel) => {
      carousel.classList.remove('active');
    });

    // Exibir o carrossel correspondente
    if (color === 'all') {
      document.querySelector('.carousel.all').classList.add('active');
    } else {
      document.querySelector(`.carousel.${color}`).classList.add('active');
    }
  });
});



