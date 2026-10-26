import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera.js';
import { Camera } from '@babylonjs/core/Cameras/camera.js';
import type { Engine } from '@babylonjs/core/Engines/engine.js';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight.js';
import { DirectionalLight } from '@babylonjs/core/Lights/directionalLight.js';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial.js';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color.js';
import { Vector3 } from '@babylonjs/core/Maths/math.vector.js';
import { CreateSphere } from '@babylonjs/core/Meshes/Builders/sphereBuilder.js';
import { CreateGround } from '@babylonjs/core/Meshes/Builders/groundBuilder.js';
import { Scene } from '@babylonjs/core/scene.js';

/** Estudo geométrico local; não representa modelo/rig aprovados nem atividade. */
export function createYard(engine: Engine) {
  const scene = new Scene(engine);
  scene.clearColor = Color4.FromHexString('#DCECF0FF');
  const camera = new FreeCamera('yard_camera', new Vector3(0, 5, -10), scene);
  camera.setTarget(new Vector3(0, 1, 0));
  camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
  camera.minZ = 0.1;
  camera.maxZ = 50;
  // Sem attachControl: toque, arrasto e teclado não movimentam a câmera.
  const fill = new HemisphericLight('sky_fill', new Vector3(0, 1, 0), scene);
  fill.intensity = 0.85;
  fill.groundColor = Color3.FromHexString('#A77C55');
  const sun = new DirectionalLight('soft_sun', new Vector3(-1, -2, 1), scene);
  sun.intensity = 0.65;

  function material(id: string, hex: string) {
    const value = new StandardMaterial(id, scene);
    value.diffuseColor = Color3.FromHexString(hex);
    value.specularColor = new Color3(0.08, 0.08, 0.08);
    return value;
  }
  const yellow = material('placeholder_yellow', '#F2C94C');
  const orange = material('placeholder_orange', '#E99945');
  const eyes = material('placeholder_eyes', '#293F42');
  const green = material('placeholder_ground', '#7FAE78');
  const blue = material('placeholder_ball', '#3985BB');
  const ground = CreateGround('yard', { width: 200, height: 200 }, scene);
  ground.material = green;

  function sphere(id: string, position: Vector3, scale: Vector3, surface: StandardMaterial) {
    const mesh = CreateSphere(id, { diameter: 1, segments: 24 }, scene);
    mesh.position = position;
    mesh.scaling = scale;
    mesh.material = surface;
    mesh.isPickable = false; // Atividades serão implementadas separadamente.
    return mesh;
  }
  sphere('duck_main_body_placeholder', new Vector3(-0.5, 0.95, 0), new Vector3(1.6, 1.5, 1.3), yellow);
  sphere('duck_main_head_placeholder', new Vector3(-0.5, 1.95, -0.15), new Vector3(1.2, 1.2, 1.1), yellow);
  sphere('duck_main_beak_placeholder', new Vector3(-0.5, 1.73, -0.8), new Vector3(0.75, 0.3, 0.65), orange);
  for (const x of [-0.82, -0.18]) {
    sphere(`eye_${x}_placeholder`, new Vector3(x, 2.07, -0.64), new Vector3(0.13, 0.18, 0.1), eyes);
    sphere(`foot_${x}_placeholder`, new Vector3(x, 0.15, -0.3), new Vector3(0.52, 0.3, 0.72), orange);
  }
  sphere('ball_main_placeholder', new Vector3(1.25, 0.48, -0.8), new Vector3(0.96, 0.96, 0.96), blue);
  ground.isPickable = false;

  function resize() {
    const aspect = engine.getRenderWidth() / engine.getRenderHeight();
    const halfHeight = Math.max(2.7, 2.7 / aspect);
    camera.orthoTop = halfHeight;
    camera.orthoBottom = -halfHeight;
    camera.orthoLeft = -halfHeight * aspect;
    camera.orthoRight = halfHeight * aspect;
  }
  resize();
  return { scene, resize };
}
