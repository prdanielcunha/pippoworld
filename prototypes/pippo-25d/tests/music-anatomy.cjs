const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const sandbox={module:{exports:{}}};vm.runInNewContext(fs.readFileSync('dist/music-anatomy.js','utf8'),sandbox);const A=sandbox.module.exports;
for(const scale of [.4,.65,1,1.4]){
 const r=A.pawRadius(scale);
 assert.ok(r>=7&&r<=17,'compact paw stays within a fixed size band');
 const shoulder={x:100,y:100},far={x:700,y:400};
 const hand=A.reach(shoulder,far,140*scale);
 assert.ok(Math.hypot(hand.x-100,hand.y-100)<=140*scale+1e-8,'prop grip never stretches wing to a distant target');
 assert.deepEqual(JSON.parse(JSON.stringify(A.reach(shoulder,{x:115,y:117},140*scale))),{x:115,y:117},'near targets preserve exact contact');
 const scene={left:20,top:50,width:420,height:540},kick={right:240,bottom:515,top:385,height:130};
 const rest=A.pedal(kick,scene,220,450,scale,0),hit=A.pedal(kick,scene,220,450,scale,1);
 assert.ok(rest.x>kick.right-scene.left,'pedal stays beside rather than on the face of the bass drum');
 assert.ok(rest.x<scene.width&&rest.y<scene.height,'pedal visible inside the stage');
 assert.ok(hit.toe.y>rest.toe.y,'downstroke compresses the same connected foot and rocker');
 for(const p of [rest,hit])for(const key of ['hip','heel','toe','beater'])assert.ok(Number.isFinite(p[key].x)&&Number.isFinite(p[key].y));
}
const rig=fs.readFileSync('dist/music-rig.js','utf8'),html=fs.readFileSync('dist/index.html','utf8');
assert.ok(!rig.includes('ctx.scale(stretch'),'the painted duck wing must never be stretched by target distance');
assert.ok(rig.includes('PippoMusicTorso.create('),'live music rig must use a connected painted torso');
assert.ok(rig.includes("dataset.hands='continuous-torso-32'"),'new construction has its own cache marker');
assert.ok(!rig.includes("load('assets/hands-approved-v27/hands.png')"),'detached hand sheet must not be loaded');
assert.ok(!rig.includes("load('assets/grips-v30/hands.png')"),'detached fist sheet must not be loaded');
assert.ok(html.indexOf('music-anatomy.js')<html.indexOf('music-rig.js'),'anatomy loads before rig');
console.log('PASS: fixed compact paws, bounded instrument grips, side pedal with animated connected foot, dependency order');

const crypto=require('node:crypto');
assert.equal(crypto.createHash('sha256').update(fs.readFileSync('dist/assets/hands-approved-v27/hands.png')).digest('hex'),'97224cf69d3da53375cac3c5acd7f3a99975370b67e7ec17d713e7f6c3fcc67c','the hand sheet must remain exactly the user-approved file');

assert.ok(!rig.includes("ctx.fillStyle='#f7d260'"),'rejected procedural hand renderer must not return');

for(const side of [0,1])for(const scale of [.4,.65,1,1.4])for(let i=0;i<120;i++){
 const shoulder={x:200,y:100},target={x:200+Math.sin(i)*180*scale,y:100+(60+i)*scale};
 const p=A.compact(shoulder,target,scale);
 assert.ok(Math.hypot(p.contact.x-shoulder.x,p.contact.y-shoulder.y)<=p.maximum+1e-7,'hand stays within compact reach');
 assert.ok(Math.abs(p.contact.x-shoulder.x)<=30*scale+1e-7,'far notes cannot detach the hand sideways');
 assert.ok(Object.values(p.contact).every(Number.isFinite),'no invalid hand at near/far targets');
}
assert.ok(rig.includes("footOverlay.id='musicFeet'"),'feet must be behind the music panel');
assert.ok(rig.includes('drumBodies.push(c);feet.push(foot)'),'the moving foot must be removed from the body to avoid duplication');
assert.ok(!rig.includes("fc.strokeStyle='#ce8330'"),'rejected procedural orange leg must not return');
console.log('PASS: 960 compact hand targets, source-foot extraction and separate pedal layer');

assert.ok(rig.includes("load('assets/music-body-v32/poses.png')"),'full torso and arms artwork must load');
assert.ok(html.indexOf('music-torso.js')<html.indexOf('music-rig.js'),'torso must be available before rig');
