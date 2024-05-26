// Initialize scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create spaceship
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const spaceship = new THREE.Mesh(geometry, material);
scene.add(spaceship);
camera.position.z = 5;

// Create asteroids
const asteroids = [];
const asteroidGeometry = new THREE.SphereGeometry();
const asteroidMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
for (let i = 0; i < 10; i++) {
  const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
  asteroid.position.x = (Math.random() - 0.5) * 10;
  asteroid.position.y = (Math.random() - 0.5) * 10;
  asteroid.position.z = (Math.random() - 0.5) * 10;
  scene.add(asteroid);
  asteroids.push(asteroid);
}

let score = 0;

// Create score display
const scoreElement = document.createElement('div');
scoreElement.style.position = 'absolute';
scoreElement.style.top = '10px';
scoreElement.style.left = '10px';
scoreElement.style.color = 'white';
scoreElement.style.fontFamily = 'Arial, sans-serif';
scoreElement.style.fontSize = '24px';
document.body.appendChild(scoreElement);

// Handle window resize
window.addEventListener('resize', function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Handle touch events
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function (event) {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
});

document.addEventListener('touchmove', function (event) {
  const touchEndX = event.touches[0].clientX;
  const touchEndY = event.touches[0].clientY;

  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;

  spaceship.position.x += deltaX / 100;
  spaceship.position.y -= deltaY / 100;

  touchStartX = touchEndX;
  touchStartY = touchEndY;
});

// Game loop
function animate() {
  requestAnimationFrame(animate);

  // Update score
  scoreElement.textContent = 'Score: ' + score;

  // Move asteroids
  asteroids.forEach(asteroid => {
    asteroid.position.z += 0.05;
    if (asteroid.position.z > 5) {
      asteroid.position.z = -5;
      asteroid.position.x = (Math.random() - 0.5) * 10;
      asteroid.position.y = (Math.random() - 0.5) * 10;
    }
    // Check for collision
    const distance = spaceship.position.distanceTo(asteroid.position);
    if (distance < 1) {
      alert('Game Over! Your Score: ' + score);
      resetGame();
    }
  });

  renderer.render(scene, camera);
}
animate();

function resetGame() {
  score = 0;
  spaceship.position.set(0, 0, 0);
}
