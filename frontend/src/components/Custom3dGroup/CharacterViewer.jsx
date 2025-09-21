import { useEffect, useRef } from "react";

// Lazy import inside effect to avoid SSR issues if any
const CharacterViewer = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    let scene;
    let camera;
    let renderer;
    let animationFrameId;
    let controls;

    const setup = async () => {
      const THREE = await import("three");
      const { OrbitControls } = await import(
        "three/examples/jsm/controls/OrbitControls.js"
      );
      const { GLTFLoader } = await import(
        "three/examples/jsm/loaders/GLTFLoader.js"
      );

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x111111);

      const container = containerRef.current;
      if (!container) return;

      const width =
        container.clientWidth ||
        container.parentElement?.clientWidth ||
        window.innerWidth;
      const height = container.clientHeight || 500;

      const PerspectiveCamera = THREE.PerspectiveCamera;
      camera = new PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.set(0, 1.6, 4);

      const WebGLRenderer = THREE.WebGLRenderer;
      renderer = new WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;

      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Lights
      const HemisphereLight = THREE.HemisphereLight;
      const hemiLight = new HemisphereLight(0xffffff, 0x444444, 1.0);
      hemiLight.position.set(0, 20, 0);
      scene.add(hemiLight);

      const DirectionalLight = THREE.DirectionalLight;
      const dirLight = new DirectionalLight(0xffffff, 1.0);
      dirLight.position.set(3, 10, 10);
      dirLight.castShadow = true;
      scene.add(dirLight);

      // Ground (optional visual reference)
      const Mesh = THREE.Mesh;
      const PlaneGeometry = THREE.PlaneGeometry;
      const MeshStandardMaterial = THREE.MeshStandardMaterial;
      const ground = new Mesh(
        new PlaneGeometry(50, 50),
        new MeshStandardMaterial({ color: 0x222222 })
      );
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -1.0;
      ground.receiveShadow = true;
      scene.add(ground);

      // Controls
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.target.set(0, 1.2, 0);

      // Load GLTF
      const loader = new GLTFLoader();
      loader.setPath("/humans_3d/");
      loader.load(
        "scene.gltf",
        (gltf) => {
          const model = gltf.scene;
          // Normalize/scale model to a reasonable size
          model.traverse((obj) => {
            if (obj.isMesh) {
              obj.castShadow = true;
              obj.receiveShadow = true;
            }
          });

          // Auto-center and fit to view
          const Box3 = THREE.Box3;
          const Vector3 = THREE.Vector3;
          const box = new Box3().setFromObject(model);
          const size = new Vector3();
          const center = new Vector3();
          box.getSize(size);
          box.getCenter(center);
          model.position.sub(center); // center the model

          const maxDim = Math.max(size.x, size.y, size.z);
          const fitHeightDistance =
            maxDim / (2 * Math.atan((Math.PI * camera.fov) / 360));
          const fitWidthDistance = fitHeightDistance / camera.aspect;
          const distance = Math.max(fitHeightDistance, fitWidthDistance);

          camera.position.set(0, center.y + maxDim * 0.1, distance * 1.25);
          controls.maxDistance = distance * 4;
          controls.minDistance = distance * 0.25;
          controls.target.copy(new THREE.Vector3(0, 1.2, 0));
          controls.update();

          scene.add(model);
        },
        undefined,
        (error) => {
          // eslint-disable-next-line no-console
          console.error("Failed to load GLTF:", error);
        }
      );

      const onResize = () => {
        if (!container || !renderer) return;
        const newWidth =
          container.clientWidth ||
          container.parentElement?.clientWidth ||
          window.innerWidth;
        const newHeight = container.clientHeight || 500;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      };

      window.addEventListener("resize", onResize);

      const tick = () => {
        controls.update();
        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(tick);
      };

      tick();

      // Cleanup function
      return () => {
        window.removeEventListener("resize", onResize);
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        if (renderer) {
          renderer.dispose();
          if (renderer.domElement && renderer.domElement.parentNode) {
            renderer.domElement.parentNode.removeChild(renderer.domElement);
          }
        }
        if (scene) {
          scene.traverse((obj) => {
            if (obj.isMesh) {
              obj.geometry?.dispose?.();
              if (obj.material) {
                const material = obj.material;
                if (Array.isArray(material)) {
                  material.forEach((m) => m.dispose?.());
                } else {
                  material.dispose?.();
                }
              }
            }
          });
        }
      };
    };

    let cleanup;
    setup().then((fn) => {
      cleanup = fn;
    });

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "70vh", position: "relative" }}
    />
  );
};

export default CharacterViewer;
