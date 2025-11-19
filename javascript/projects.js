const circle = document.querySelector('.circle');
const items = document.querySelectorAll('.item');
const radius = 200;
let currentRotation = 0;

items.forEach((item) => {
     item.addEventListener("click", function() {
          let contentBox = document.querySelector(`.contentBox#${item.id}`);
          let videos = contentBox.querySelectorAll('.video');
          
          if (item.classList.contains("active")) {
               item.classList.remove("active");
               contentBox.classList.remove("active");
               videos.forEach((video) => {
                    video.classList.remove('loaded');
               });
          } else {
               items.forEach((otherItem) => {
                    otherItem.classList.remove("active");
                    let otherContentBox = document.querySelector(`.contentBox#${otherItem.id}`);
                    otherContentBox.classList.remove("active");
                    let otherVideos = otherContentBox.querySelectorAll('.video');
                    otherVideos.forEach((video) => {
                         video.classList.remove('loaded');
                    });
               });
               
               item.classList.add("active");
               contentBox.classList.add("active");
               
               videos.forEach((video, index) => {
                    setTimeout(() => {
                         if (video.dataset.src && !video.src) {
                              video.src = video.dataset.src;
                         }
                         video.classList.add('loaded');
                    }, index * 100);
               });
          }
     });
});

function rotateToItem(index) {
     const baseAngle = 180 + (index * 180) / (items.length - 1);
     const targetAngle = 270;
     const targetRotation = targetAngle - baseAngle;
     
     const startRotation = currentRotation;
     const duration = 1000;
     const startTime = performance.now();
     
     function animate(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          
          currentRotation = startRotation + (targetRotation - startRotation) * easeProgress;
          updatePositions();
          
          if (progress < 1) {
               requestAnimationFrame(animate);
          }
     }
     
     requestAnimationFrame(animate);
}

function updatePositions() {
     items.forEach((item, index) => {
          const baseAngle = 180 + (index * 180) / (items.length - 1);
          let angle = baseAngle + currentRotation;
          
          angle = ((angle - 90) % 270 + 270) % 270 + 90;
          
          const radians = (-angle * Math.PI) / 180;
          
          const x = Math.cos(radians) * radius * 1.15;
          const y = Math.sin(radians) * radius;
          
          const tiltAngle = -angle - 90;
          
          item.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%)) rotate(${tiltAngle}deg)`;
     });
}

let touchStartX = 0;

circle.addEventListener('touchstart', (e) => {
     touchStartX = e.touches[0].clientX;
});

circle.addEventListener('touchmove', (e) => {
     e.preventDefault();
     const touchX = e.touches[0].clientX;
     const deltaX = touchStartX - touchX;
     currentRotation += deltaX * 0.75;
     touchStartX = touchX;
     updatePositions();
}, { passive: false });

circle.addEventListener('wheel', (e) => {
     e.preventDefault();
     currentRotation += e.deltaY * 0.2;
     updatePositions();
});

updatePositions();

if (items.length > 0) {
     items[0].click();
     setTimeout(() => {
          rotateToItem(0);
     }, 600);
}

let videoData = {};

fetch('src/config/videoData.json')
  .then(response => response.json())
  .then(data => {
    videoData = data;
    populateVideoInfo();
  });

function populateVideoInfo() {
  document.querySelectorAll('.videoContainer').forEach(container => {
    const video = container.querySelector('.video');
    const categoryId = container.closest('.contentBox').id;
    const videoId = video.id;
    
    const data = videoData[categoryId][videoId];
    
    container.querySelector('.dropdownGame').textContent = data.game;
    container.querySelector('.dropdownTime').textContent = data.timeTaken;
    container.querySelector('.dropdownContributor').textContent = data.contributors;
    container.querySelector('.dropdownGameLink').parentElement.href = data.gameLink;
    container.querySelector('.dropdownGameLink').textContent = data.gameLink;
    container.querySelector('.dropdownDate').textContent = data.date;
    container.querySelector('.dropdownDescription').textContent = data.description;
  });
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('infoToggle')) {
    const dropdown = e.target.nextElementSibling;
    const isActive = dropdown.classList.contains('active');
    
    dropdown.classList.toggle('active');
    e.target.style.transform = isActive ? 'rotate(0deg)' : 'rotate(180deg)';
  }
});