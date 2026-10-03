/**
 * 3D Interactive Three.js Particle Universe & Cyber Geometry
 * Subiksen V S Portfolio
 */

(function () {
  const canvas = document.getElementById('bg3dCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 40;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Particle Constellation
  const particleCount = window.innerWidth < 768 ? 600 : 1400;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const colorPalette = [
    new THREE.Color(0x00f2fe), // Cyan
    new THREE.Color(0xa855f7), // Purple
    new THREE.Color(0x38bdf8), // Light Blue
    new THREE.Color(0x10b981)  // Emerald
  ];

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 120;
    positions[i3 + 1] = (Math.random() - 0.5) * 120;
    positions[i3 + 2] = (Math.random() - 0.5) * 80;

    const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i3] = chosenColor.r;
    colors[i3 + 1] = chosenColor.g;
    colors[i3 + 2] = chosenColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Custom particle point material
  const material = new THREE.PointsMaterial({
    size: 1.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });

  const particleMesh = new THREE.Points(geometry, material);
  scene.add(particleMesh);

  // Floating Cyber Icosahedron Wireframe
  const icoGeometry = new THREE.IcosahedronGeometry(14, 1);
  const icoMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f2fe,
    wireframe: true,
    transparent: true,
    opacity: 0.08
  });
  const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial);
  icoMesh.position.set(30, 0, -20);
  scene.add(icoMesh);

  // Floating Cyber Torus
  const torusGeometry = new THREE.TorusGeometry(18, 1.2, 16, 100);
  const torusMaterial = new THREE.MeshBasicMaterial({
    color: 0xa855f7,
    wireframe: true,
    transparent: true,
    opacity: 0.06
  });
  const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
  torusMesh.position.set(-35, -10, -30);
  scene.add(torusMesh);

  // Mouse Interaction Physics
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // Resize Handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Smooth camera inertia
    targetX += (mouseX * 5 - targetX) * 0.04;
    targetY += (mouseY * 5 - targetY) * 0.04;

    camera.position.x = targetX;
    camera.position.y = targetY;
    camera.lookAt(0, 0, 0);

    // Rotate particle system
    particleMesh.rotation.y = elapsedTime * 0.03;
    particleMesh.rotation.x = elapsedTime * 0.015;

    // Rotate wireframe meshes
    icoMesh.rotation.x = elapsedTime * 0.15;
    icoMesh.rotation.y = elapsedTime * 0.2;

    torusMesh.rotation.x = elapsedTime * 0.1;
    torusMesh.rotation.z = elapsedTime * 0.15;

    renderer.render(scene, camera);
  }

  animate();
})();
