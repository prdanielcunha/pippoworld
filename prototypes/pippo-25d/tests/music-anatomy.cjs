const assert=require('node:assert/strict');
const fs=require('node:fs'),A=require('../dist/music-anatomy.js');
for(const scale of [.4,.65,1,1.4]){
 const r=A.pawRadius(scale);
 assert.ok(r>=7&&r<=17,'compact paw stays within a fixed size band');
 const shoulder={x:100,y:100},far={x:700,y:400};
 const hand=A.reach(shoulder,far,140*scale);
 assert.ok(Math.hypot(hand.x-100,hand.y-100)<=140*scale+1e-8,'prop grip never stretches wing to a distant target');
 assert.deepEqual(A.reach(shoulder,{x:115,y:117},140*scale),{x:115,y:117},'near targets preserve exact contact');
 const scene={left:20,top:50,width:420,height:540},kick={right:240,bottom:515,top:385,height:130};
 const rest=A.pedal(kick,scene,220,450,scale,0),hit=A.pedal(kick,scene,220,450,scale,1);
 assert.ok(rest.x>kick.right-scene.left,'pedal stays beside rather than on the face of the bass drum');
 assert.ok(rest.x<scene.width&&rest.y<scene.height,'pedal visible inside the stage');
 assert.ok(hit.toe.y>rest.toe.y,'downstroke compresses the same connected foot and rocker');
 for(const p of [rest,hit])for(const key of ['hip','heel','toe','beater'])assert.ok(Number.isFinite(p[key].x)&&Number.isFinite(p[key].y));
}
const rig=fs.readFileSync('dist/music-rig.js','utf8'),html=fs.readFileSync('dist/index.html','utf8');
assert.ok(!rig.includes('ctx.scale(stretch'),'the painted duck wing must never be stretched by target distance');
assert.ok(rig.includes('PippoMusicAnatomy.reach('),'long prop reaches use the bounded grip');
assert.ok(rig.includes("dataset.hands='compact-26'"),'compact hands are identifiable in runtime evidence');
assert.ok(html.indexOf('music-anatomy.js')<html.indexOf('music-rig.js'),'anatomy loads before rig');
console.log('PASS: fixed compact paws, bounded instrument grips, side pedal with animated connected foot, dependency order');
