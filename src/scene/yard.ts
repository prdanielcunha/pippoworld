import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera.js';
import { Camera } from '@babylonjs/core/Cameras/camera.js';
import type { Engine } from '@babylonjs/core/Engines/engine.js';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight.js';
import { DirectionalLight } from '@babylonjs/core/Lights/directionalLight.js';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial.js';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color.js';
import { Vector3 } from '@babylonjs/core/Maths/math.vector.js';
import { CreateSphere } from '@babylonjs/core/Meshes/Builders/sphereBuilder.js';
import { CreateBox } from '@babylonjs/core/Meshes/Builders/boxBuilder.js';
import { CreateCylinder } from '@babylonjs/core/Meshes/Builders/cylinderBuilder.js';
import { CreateTorus } from '@babylonjs/core/Meshes/Builders/torusBuilder.js';
import { CreateGround } from '@babylonjs/core/Meshes/Builders/groundBuilder.js';
import { TransformNode } from '@babylonjs/core/Meshes/transformNode.js';
import type { Mesh } from '@babylonjs/core/Meshes/mesh.js';
import { Scene } from '@babylonjs/core/scene.js';
import type { WorldState, Place } from '../game/state';

export interface Target { id: string; node: TransformNode; point: Vector3; size: number; }
/** Fábrica de modelos procedurais provisórios. Substituir por GLB/rigs mantendo IDs e alvos. */
export function createYard(engine: Engine, state: WorldState) {
  const scene = new Scene(engine); scene.clearColor = Color4.FromHexString('#DCECF0FF');
  const camera = new FreeCamera('yard_camera', new Vector3(0, 7, -15), scene);
  camera.setTarget(new Vector3(0, 1.3, 0)); camera.mode = Camera.ORTHOGRAPHIC_CAMERA; camera.minZ = .1; camera.maxZ = 80;
  new HemisphericLight('sky_fill', new Vector3(0, 1, 0), scene).intensity = .85;
  new DirectionalLight('soft_sun', new Vector3(-1, -2, 1), scene).intensity = .55;
  const materials = new Map<string, StandardMaterial>();
  function material(hex: string) {
    if (!materials.has(hex)) { const m = new StandardMaterial(hex, scene); m.diffuseColor = Color3.FromHexString(hex); m.specularColor = new Color3(.06, .06, .06); materials.set(hex, m); } return materials.get(hex)!;
  }
  let root: TransformNode; let targets: Target[] = []; const pulses = new Map<string, number>();
  let ball: TransformNode | undefined; let petals: TransformNode[] = []; let water: TransformNode | undefined;
  let keys: Mesh[] = []; const held = new Set<number>(); let can: TransformNode | undefined; let flower: TransformNode | undefined;
  let phase = 0; let bloom = state.flowerOpen ? 1 : 0;
  function group(id: string, x: number, y: number, z: number, parent: TransformNode = root) { const n = new TransformNode(id, scene); n.parent = parent; n.position.set(x, y, z); return n; }
  function shape(kind: 'sphere' | 'box' | 'cylinder' | 'torus', id: string, parent: TransformNode, p: number[], s: number[], color: string) {
    const n = kind === 'sphere' ? CreateSphere(id, { diameter: 1, segments: 20 }, scene) : kind === 'box' ? CreateBox(id, { size: 1 }, scene) : kind === 'torus' ? CreateTorus(id, { diameter: 1, thickness: .14, tessellation: 24 }, scene) : CreateCylinder(id, { height: 1, diameter: 1, tessellation: 32 }, scene);
    n.parent = parent; n.position.set(p[0], p[1], p[2]); n.scaling.set(s[0], s[1], s[2]); n.material = material(color); n.isPickable = false; return n;
  }
  const sphere = (id: string, p: TransformNode, pos: number[], size: number[], c: string) => shape('sphere', id, p, pos, size, c);
  function target(id: string, node: TransformNode, point: Vector3, size: number) { targets.push({ id, node, point, size }); }
  function eyes(parent: TransformNode, y: number, z: number, spacing: number) {
    for (const side of [-1, 1]) { sphere('eye', parent, [side * spacing, y, z], [.13, .18, .1], '#293F42'); sphere('glint', parent, [side * spacing - .025, y + .045, z - .045], [.035, .045, .025], '#FFFFFF'); }
  }
  function bird(id: string, x: number, z: number, scale = 1) {
    const g = group(id, x, 0, z); g.scaling.setAll(scale);
    sphere('body', g, [0, .8, 0], [1.3, 1.3, 1.1], '#F2C94C');
    sphere('head', g, [0, 1.65, -.12], [1.05, 1.05, 1], '#F9D568');
    sphere('beak', g, [0, 1.4, -.67], [.66, .22, .5], '#E99945');
    eyes(g, 1.78, -.57, .27);
    for (const side of [-1, 1]) { sphere('wing', g, [side * .6, .95, -.1], [.35, .7, .7], '#E9B943'); sphere('foot', g, [side * .32, .13, -.25], [.48, .22, .62], '#E99945'); }
    const tuft = sphere('tuft', g, [0, 2.2, -.08], [.19, .4, .22], '#F2C94C'); tuft.rotation.z = -.3;
    target(id, g, new Vector3(0, 1.2, 0), scale * 1.6); return g;
  }
  function cow(x: number, z: number) {
    const g = group('cow_friend', x, 0, z);
    sphere('body', g, [0, 1.05, .25], [1.75, 1.5, 1.5], '#FFFAF0');
    sphere('patch', g, [-.52, 1.45, -.3], [.65, .6, .34], '#6A6258');
    for (const a of [-.52, .52]) for (const b of [-.3, .65]) { shape('cylinder', 'leg', g, [a, .45, b], [.28, .8, .28], '#FFFAF0'); sphere('hoof', g, [a, .13, b - .04], [.35, .25, .4], '#6A6258'); }
    sphere('head', g, [0, 1.8, -.5], [1.32, 1.4, .95], '#FFFAF0'); sphere('muzzle', g, [0, 1.44, -.99], [1, .55, .45], '#DCA59B');
    eyes(g, 1.98, -.94, .3);
    for (const s of [-1, 1]) { const ear = sphere('ear', g, [s * .8, 2.05, -.42], [.6, .24, .36], '#DCA59B'); ear.rotation.z = s * .3; shape('cylinder', 'horn', g, [s * .4, 2.57, -.3], [.17, .4, .17], '#C9B895'); sphere('nostril', g, [s * .22, 1.5, -1.2], [.1, .08, .035], '#805E5A'); }
    target('cow_friend', g, new Vector3(0, 1.3, -.4), 1.9);
  }
  function rabbit(x: number, z: number) {
    const g = group('rabbit_friend', x, 0, z);
    sphere('body', g, [0, .72, 0], [1.1, 1.3, 1], '#D5D1E1'); sphere('belly', g, [0, .75, -.44], [.65, .78, .17], '#FFFAF0');
    sphere('head', g, [0, 1.6, -.1], [1.1, 1, .9], '#D5D1E1'); eyes(g, 1.73, -.51, .27);
    sphere('nose', g, [0, 1.48, -.59], [.2, .14, .15], '#C58392');
    for (const s of [-1, 1]) { const ear = sphere('ear', g, [s * .3, 2.45, -.05], [.35, 1.35, .36], '#D5D1E1'); ear.rotation.z = s * -.15; const inner = sphere('ear_inner', g, [s * .3, 2.45, -.2], [.17, .94, .08], '#DCA6B7'); inner.rotation.z = s * -.15; sphere('foot', g, [s * .37, .15, -.25], [.5, .26, .65], '#FFFAF0'); }
    target('rabbit_friend', g, new Vector3(0, 1.5, 0), 1.5); return g;
  }
  function tree(x: number, z: number) { const g = group('tree', x, 0, z); shape('cylinder', 'trunk', g, [0, 1.1, 0], [.28, 2.2, .28], '#A77C55'); sphere('crown', g, [0, 2.7, 0], [2.1, 2.6, 1.9], '#80A986'); sphere('crown_side', g, [.7, 2.3, .1], [1.4, 1.6, 1.4], '#93B797'); }
  function drum(x: number, z: number, scale: number, interactive = true) {
    const g = group('drum_single', x, 0, z); g.scaling.setAll(scale);
    shape('cylinder', 'drum_body', g, [0, .65, 0], [1.9, 1.1, 1.9], '#CF7068'); shape('cylinder', 'skin', g, [0, 1.22, 0], [2, .12, 2], '#F6EEDC');
    shape('torus', 'rim', g, [0, 1.26, 0], [1.9, 1, 1.9], '#A77C55');
    for (const a of [-.75, .75]) shape('box', 'tension', g, [a, .65, -.63], [.12, .95, .1], '#F6EEDC');
    if (interactive) target('drum_single', g, new Vector3(0, 1, 0), scale * 2); return g;
  }
  function build(place: Place) {
    if (root) { for (const m of root.getChildMeshes()) m.dispose(); root.dispose(); }
    root = new TransformNode(place, scene); targets = []; keys = []; petals = []; bloom = state.flowerOpen ? 1 : 0; pulses.clear(); ball = undefined; can = undefined; flower = undefined; water = undefined; held.clear();
    const ground = CreateGround(place + '_floor', { width: 100, height: 100 }, scene); ground.parent = root; ground.material = material(place === 'music_house' ? '#D8BC96' : '#91B58A'); ground.isPickable = false;
    if (place !== 'music_house') {
      tree(-4.6, 4); tree(4.7, 5);
      shape('sphere', 'path', root, [0, -.02, -1], [5, .08, 14], '#DCCB9F');
      for (let i = 0; i < 7; i++) { const x = -5 + i * 1.7; shape('box', 'fence_post', root, [x, .65, 6], [.18, 1.3, .2], '#F6EEDC'); } shape('box', 'fence_rail', root, [0, .8, 6], [11, .16, .16], '#F6EEDC');
      for (const x of [-3.6, 3.6]) for (const z of [-3, 1, 3]) sphere('stone', root, [x, .1, z], [.35, .2, .5], '#B7BEAA');
    } else {
      shape('box', 'back_wall', root, [0, 2.3, 5], [13, 4.6, .2], '#EEDCC2');
      shape('box', 'window_frame', root, [0, 2.8, 4.83], [2.8, 2, .18], '#A77C55'); shape('box', 'window_sky', root, [0, 2.8, 4.7], [2.5, 1.7, .12], '#A9D2DA'); shape('box', 'window_cross', root, [0, 2.8, 4.6], [.12, 1.8, .1], '#F6EEDC');
      shape('sphere', 'rug', root, [0, .03, -.5], [8.3, .08, 7], '#C3C1A5');
      for (const x of [-3, 3]) shape('box', 'wall_panel', root, [x, 2.5, 4.7], [1, 1.2, .18], '#D2A786');
    }
    if (place === 'yard') {
      bird('duck_main', -.95, .25);
      ball = group('ball_main', 1.6, .48, -1.6); sphere('blue_ball', ball, [0, 0, 0], [1.05, 1.05, 1.05], '#3985BB'); shape('torus', 'ball_band', ball, [0, 0, 0], [.95, .65, .95], '#B5DCE8'); target('ball_main', ball, Vector3.Zero(), 1.5);
      const house = group('music_house', 2.2, 0, 4); shape('box', 'house', house, [0, 1, 0], [2.2, 2, 1.3], '#EAD9B8'); const roof = shape('cylinder', 'roof', house, [0, 2.35, 0], [3.15, 1, 2.1], '#CF7068'); roof.scaling.y = .65; shape('box', 'door', house, [0, .65, -.7], [.65, 1.3, .12], '#A77C55'); target('music_house', house, new Vector3(0, 1, 0), 2.2);
      const garden = group('garden', -2.65, 0, 3.4);
      sphere('garden_bed', garden, [0, .12, 0], [1.7, .25, 1.1], '#A77C55');
      for (const x of [-.45, .45]) { shape('cylinder', 'garden_stem', garden, [x, .5, 0], [.1, .85, .1], '#527F57'); sphere('garden_bloom', garden, [x, .95, 0], [.65, .55, .3], '#E8A5AA'); }
      target('garden', garden, new Vector3(0, .7, 0), 1.8);
    }
    if (place === 'garden') {
      bird('duck_main', -2.8, 2.6, .7); cow(-1.75, .2); bird('chick_friend', 1.9, .3, .63);
      flower = group('flower_main', .8, 0, -2.1); shape('cylinder', 'stem', flower, [0, .6, 0], [.13, 1.2, .13], '#527F57');
      sphere('leaf', flower, [-.3, .55, 0], [.65, .2, .3], '#527F57');
      for (let i = 0; i < 7; i++) { const a = i * Math.PI * 2 / 7; const p = sphere('petal', flower, [Math.cos(a) * .42, 1.3 + Math.sin(a) * .42, -.05], [.52, .58, .2], '#E8A5AA'); petals.push(p); }
      sphere('flower_center', flower, [0, 1.3, -.2], [.48, .48, .23], '#F2C94C'); target('flower_main', flower, new Vector3(0, 1, 0), 1.5);
      can = group('watering_can', -1.65, 0, -2.6); shape('cylinder', 'can_body', can, [0, .4, 0], [.8, .8, .7], '#5F9FAD'); const spout = shape('cylinder', 'spout', can, [.55, .58, 0], [.22, 1.05, .22], '#5F9FAD'); spout.rotation.z = -.9; const handle = shape('torus', 'handle', can, [-.4, .55, 0], [.85, 1, .9], '#5F9FAD'); handle.rotation.x = Math.PI / 2; target('watering_can', can, new Vector3(0, .6, 0), 1.4);
      water = group('water', .8, 0, -2.1); for (let i = 0; i < 6; i++) sphere('drop', water, [(i % 3 - 1) * .12, 1.4 + i * .17, -.1], [.08, .18, .08], '#83BBD0'); water.setEnabled(false);
      const shaker = group('shaker_story', 2.8, 0, -2.6); shape('cylinder', 'shaker_handle', shaker, [0, .4, 0], [.16, .7, .16], '#A77C55'); sphere('shaker_head', shaker, [0, .95, 0], [.65, .8, .65], '#CF7068'); target('shaker_story', shaker, new Vector3(0, .75, 0), 1.2);
    }
    if (place === 'music_house') {
      const focus = state.focus;
      bird('duck_main', -2.9, focus === 'room' ? 2.3 : 3.5, .72); rabbit(focus === 'room' ? 0 : 1.8, 1.7);
      if (focus !== 'keyboard_eight') drum(focus === 'room' ? -1.9 : -.5, -1.8, focus === 'room' ? 1 : 1.5);
      if (focus !== 'drum_single') {
        const g = group('keyboard_eight', focus === 'room' ? 1.9 : 0, .2, -2.5); const scale = focus === 'room' ? .4 : 1; g.scaling.setAll(scale);
        shape('box', 'keyboard_case', g, [0, .4, 0], [8.25, .6, 1.9], '#A77C55');
        for (let i = 0; i < 8; i++) {
          const k = shape('box', 'key_' + i, g, [i - 3.5, .8, -.1], [.93, .22, 1.65], i % 2 ? '#F1E5CA' : '#FFFAF0'); keys.push(k);
          if (focus === 'keyboard_eight') target('key_' + i, k, Vector3.Zero(), .95);
        }
        if (focus === 'room') target('keyboard_eight', g, new Vector3(0, .8, 0), 2.8);
      }
    }
    resize();
  }
  function resize() {
    const aspect = engine.getRenderWidth() / engine.getRenderHeight();
    const h = Math.max(3.6, (state.focus === 'keyboard_eight' ? 4.15 : 4.45) / aspect);
    camera.orthoTop = h; camera.orthoBottom = -h; camera.orthoLeft = -h * aspect; camera.orthoRight = h * aspect;
  }
  function pulse(id: string) { pulses.set(id, 1); }
  function update(dt: number, reduced: boolean) {
    phase += dt;
    for (const t of targets) {
      const p = pulses.get(t.id) ?? 0; if (p > 0) pulses.set(t.id, Math.max(0, p - dt * 2.8));
      t.node.rotation.z = reduced ? 0 : Math.sin(p * Math.PI * 2) * .085;
    }
    if (ball) {
      const t = state.ball / 2.4; const travel = Math.sin(t * Math.PI);
      ball.position.set(1.6 - 2.3 * travel, .48 + .35 * travel + (reduced ? .1 : .6) * Math.abs(Math.sin(t * Math.PI * 2)), -1.6 + 1.5 * travel);
      ball.rotation.x = t * Math.PI * 4;
    }
    if (flower) {
      bloom += ((state.flowerOpen ? 1 : 0) - bloom) * Math.min(1, dt * (reduced ? 20 : 5));
      petals.forEach((p, i) => { const a = i * Math.PI * 2 / 7; const radius = .12 + .4 * bloom; p.position.set(Math.cos(a) * radius, 1.3 + Math.sin(a) * radius, -.05); p.scaling.set(.24 + .28 * bloom, .32 + .26 * bloom, .2); });
      if (water) { water.setEnabled(state.water > 0); water.position.y = state.water ? -.15 * (phase * 5 % 1) : 0; }
      if (can) { can.rotation.z = state.selected ? -.2 : 0; can.position.y = state.selected ? .15 : 0; }
    }
    keys.forEach((k, i) => { k.position.y += ((held.has(i) ? .69 : .8) - k.position.y) * Math.min(1, dt * 25); });
  }
  function project(t: Target) {
    t.node.computeWorldMatrix(true);
    const point = Vector3.Project(t.point, t.node.getWorldMatrix(), scene.getTransformMatrix(), camera.viewport.toGlobal(engine.getRenderWidth(), engine.getRenderHeight()));
    return { x: point.x / engine.getRenderWidth() * 100, y: point.y / engine.getRenderHeight() * 100, width: t.size / ((camera.orthoRight ?? 4.45) * 2) * 100 };
  }
  build(state.place); resize();
  return { scene, resize, build, update, project, get targets() { return targets; }, pulse, held, camera, get meshCount() { return scene.meshes.length; } };
}
