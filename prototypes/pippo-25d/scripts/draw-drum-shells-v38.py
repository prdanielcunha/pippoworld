"""Original vector instrument surfaces. Exact playable skin stays at .14 height."""
from pathlib import Path
out=Path('dist/assets/drum-kit-v38');out.mkdir(exist_ok=True)
head='''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180"><defs><linearGradient id="shell"><stop stop-color="#1b403b"/><stop offset=".18" stop-color="#507970"/><stop offset=".4" stop-color="#86a69a"/><stop offset=".55" stop-color="#547e72"/><stop offset=".85" stop-color="#234b43"/><stop offset="1" stop-color="#14372f"/></linearGradient><linearGradient id="chrome"><stop stop-color="#4f635c"/><stop offset=".25" stop-color="#cdd6ca"/><stop offset=".48" stop-color="#f5f6e6"/><stop offset=".7" stop-color="#819890"/><stop offset="1" stop-color="#405b51"/></linearGradient><radialGradient id="skin" cx="38%" cy="28%"><stop stop-color="#fffdf0"/><stop offset=".75" stop-color="#e6e3cc"/><stop offset="1" stop-color="#bdc6b2"/></radialGradient></defs>'''
body='''<ellipse cx="120" cy="153" rx="114" ry="23" fill="#15372e" opacity=".4"/><path d="M7 25V151C7 184 233 184 233 151V25" fill="url(#shell)" stroke="#355c4c" stroke-width="2"/><path d="M8 146C8 179 232 179 232 146" fill="none" stroke="url(#chrome)" stroke-width="8"/>'''
for x in [25,58,182,215]:
 body+=f'<path d="M{x} 48V143" stroke="#193d34" stroke-width="11" opacity=".35"/><rect x="{x-4}" y="48" width="8" height="89" rx="4" fill="url(#chrome)"/><rect x="{x-7}" y="73" width="14" height="19" rx="4" fill="url(#chrome)"/>'
for y in [61,91,119]:body+=f'<path d="M77 {y}q42 8 86 0" fill="none" stroke="#b4c4a7" opacity=".1"/>'
body+='''<ellipse cx="120" cy="25" rx="115" ry="23" fill="url(#chrome)" stroke="#627a6a" stroke-width="2"/><ellipse cx="120" cy="25" rx="106" ry="17" fill="url(#skin)" stroke="#9aa994" stroke-width="2"/><path d="M18 19Q120-9 222 19" fill="none" stroke="#fcfced" stroke-width="2" opacity=".8"/>'''
for x,y in [(20,17),(64,5),(176,5),(220,17),(28,37),(73,46),(167,46),(212,37)]:body+=f'<rect x="{x-3}" y="{y-3}" width="6" height="6" rx="2" fill="#edf0dd" stroke="#6c8174"/>'
(out/'tom.svg').write_text(head+body+'</svg>')
(out/'snare.svg').write_text((head+body+'</svg>').replace('url(#shell)','url(#chrome)'))
# The front head is a vertical circle; visible rim depth and eight tension rods.
s='''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><defs><radialGradient id="head" cx="40%" cy="35%"><stop stop-color="#fff9df"/><stop offset=".8" stop-color="#e7e3c8"/><stop offset="1" stop-color="#c4ccb5"/></radialGradient><linearGradient id="ring"><stop stop-color="#abc0ad"/><stop offset=".2" stop-color="#f1f1dc"/><stop offset=".45" stop-color="#78978a"/><stop offset="1" stop-color="#284e41"/></linearGradient></defs><circle cx="127" cy="129" r="109" fill="#1d473b"/><circle cx="118" cy="127" r="109" fill="url(#ring)" stroke="#1e4336" stroke-width="3"/><circle cx="118" cy="127" r="98" fill="#315b49"/><circle cx="118" cy="127" r="91" fill="url(#head)" stroke="#a1b49a" stroke-width="3"/><circle cx="118" cy="127" r="84" fill="none" stroke="#d3d5bc" stroke-width="1"/><ellipse cx="159" cy="170" rx="15" ry="15" fill="#35574b" stroke="#98b09c" stroke-width="4"/>'''
import math
for i in range(8):
 a=i*math.pi/4;x=118+104*math.cos(a);y=127+104*math.sin(a)
 s+=f'<g transform="translate({x} {y}) rotate({i*45})"><rect x="-8" y="-4" width="16" height="8" rx="3" fill="url(#ring)" stroke="#607c69"/></g>'
s+='''<path d="M31 197L14 232M204 192L225 232" stroke="#a7b9a5" stroke-width="9" stroke-linecap="round"/><path d="M14 232H25M219 232H230" stroke="#3c5d4d" stroke-width="6" stroke-linecap="round"/></svg>'''
(out/'kick.svg').write_text(s)
# Hammered brass, raised bell and two separate hi-hat discs.
for name,double in [('crash',False),('hihat',True)]:
 s='''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 90"><defs><radialGradient id="brass" cx="40%" cy="30%"><stop stop-color="#f4de8e"/><stop offset=".35" stop-color="#d8bb64"/><stop offset=".75" stop-color="#b39645"/><stop offset="1" stop-color="#e2c86f"/></radialGradient></defs>'''
 if double:s+='<ellipse cx="140" cy="60" rx="135" ry="24" fill="#9c803c" stroke="#c4aa58" stroke-width="3"/>'
 s+='<ellipse cx="140" cy="43" rx="135" ry="31" fill="url(#brass)" stroke="#a18b43" stroke-width="3"/>'
 for r in range(25,130,11):s+=f'<ellipse cx="140" cy="43" rx="{r}" ry="{r*.22}" fill="none" stroke="#f6e4a0" stroke-width="1" opacity=".45"/>'
 s+='<ellipse cx="140" cy="36" rx="24" ry="13" fill="url(#brass)"/><path d="M140 14V33" stroke="#526e5b" stroke-width="7" stroke-linecap="round"/><ellipse cx="140" cy="15" rx="9" ry="4" fill="#859984"/></svg>'
 (out/(name+'.svg')).write_text(s)
print('Prepared original vector drum shells, tension rods, rims, skins and separate hi-hat discs')
