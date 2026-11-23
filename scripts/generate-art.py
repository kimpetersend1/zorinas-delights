"""Original, fully local decorative SVG assets. Run with python3 scripts/generate-art.py."""
from pathlib import Path
from html import escape
OUT = Path(__file__).resolve().parents[1] / 'public' / 'images'
OUT.mkdir(parents=True, exist_ok=True)

COMMON = '''
<defs>
 <radialGradient id="pastry" cx="37%" cy="30%" r="70%"><stop offset="0" stop-color="#efb663"/><stop offset=".37" stop-color="#cf8240"/><stop offset=".77" stop-color="#aa582c"/><stop offset="1" stop-color="#7d3b20"/></radialGradient>
 <radialGradient id="gloss" cx="22%" cy="18%"><stop offset="0" stop-color="#fff0af" stop-opacity=".85"/><stop offset=".6" stop-color="#e8aa61" stop-opacity=".03"/><stop offset="1" stop-color="#763819" stop-opacity=".15"/></radialGradient>
 <linearGradient id="syrup" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f4cc67"/><stop offset=".48" stop-color="#b46a2e"/><stop offset="1" stop-color="#7b351e"/></linearGradient>
 <linearGradient id="paper" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fffaf0"/><stop offset="1" stop-color="#e8d3b8"/></linearGradient>
 <filter id="shadow" x="-40%" y="-50%" width="180%" height="220%"><feGaussianBlur stdDeviation="17"/></filter>
 <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".5" numOctaves="3" stitchTiles="stitch" result="noise"/><feColorMatrix in="noise" type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".08"/></feComponentTransfer></filter>
 <pattern id="sprinkles" width="37" height="39" patternUnits="userSpaceOnUse"><circle cx="7" cy="17" r="2" fill="#fff2cd" opacity=".78"/><path d="M26 7l4 3" stroke="#ffe5a7" stroke-width="3" stroke-linecap="round"/></pattern>
</defs>
'''

def wrap(w,h,body,bg):
  return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" aria-label="Decorative illustrative product artwork">{COMMON}<rect width="{w}" height="{h}" fill="{bg}"/>{body}<rect width="{w}" height="{h}" filter="url(#grain)" opacity=".56" pointer-events="none"/></svg>'''

def pastry(x,y,scale=1,angle=0):
  # Deliberately stylized rather than photorealistic: no misrepresentation of an actual product.
  return f'''<g transform="translate({x} {y}) rotate({angle}) scale({scale})">
 <ellipse cx="8" cy="34" rx="120" ry="86" fill="#482417" opacity=".22" filter="url(#shadow)"/>
 <path d="M-115 -12 C-124 -82 -47 -115 22 -105 C103 -105 134 -48 115 25 C104 93 28 112 -48 95 C-111 79 -128 36 -115 -12Z" fill="url(#pastry)" stroke="#9b4d26" stroke-width="5"/>
 <path d="M-113 -12 C-124 -82 -47 -115 22 -105 C103 -105 134 -48 115 25 C104 93 28 112 -48 95 C-111 79 -128 36 -115 -12Z" fill="url(#gloss)"/>
 <path d="M-76 -56 C-36 -86 11 -81 45 -68" fill="none" stroke="#ffe6a7" stroke-linecap="round" stroke-width="12" opacity=".46"/>
 <path d="M-76 52q36 20 78 22m39-150q34 15 40 42" stroke="#7d4023" stroke-width="7" fill="none" stroke-linecap="round" opacity=".29"/>
 <path d="M-110 -8 C-124 19 -89 74 -55 82 C9 109 66 72 89 52" fill="none" stroke="#e9ad65" stroke-width="8" opacity=".38"/>
 <path d="M-53 -87q17 -8 24 -6M43 84l10 -4M98 -18l4 11" stroke="#f9dfb0" stroke-linecap="round" stroke-width="5" opacity=".65"/>
 </g>'''

def small_burst(x,y,s=1,color='#74432d'):
 return f'<g transform="translate({x} {y}) scale({s})" fill="none" stroke="{color}" stroke-width="2.6" stroke-linecap="round"><path d="M0 -26V-39M0 26v13M-26 0h-13M26 0h13M-18 -18l-10 -10M18 18l10 10M18 -18l10 -10M-18 18l-10 10"/><circle r="7" fill="{color}" stroke="none"/></g>'

# Primary artwork and gallery lead: custom drawn plate, syrup bottle, coconut pot.
art = '''<ellipse cx="460" cy="850" rx="390" ry="185" fill="#81502f" opacity=".17" filter="url(#shadow)"/>
<path d="M-56 183q385-220 1006 40v750q-422 207-1006 -15Z" fill="#d8ad76" opacity=".42"/>
<circle cx="705" cy="180" r="128" fill="none" stroke="#f5e1ba" stroke-width="2" opacity=".85"/>
<circle cx="705" cy="180" r="106" fill="none" stroke="#f5e1ba" stroke-width="2" opacity=".5"/>
<path d="M100 160q150-105 293 0" fill="none" stroke="#8d5436" stroke-width="2" opacity=".5"/>
''' + small_burst(790,420,0.9,'#fff0d4') + '''
<g transform="translate(475 680) rotate(-12)">
 <ellipse rx="310" ry="230" fill="#855139" opacity=".28" filter="url(#shadow)"/>
 <ellipse rx="310" ry="230" fill="#f7e8d0" stroke="#b47d54" stroke-width="11"/>
 <ellipse rx="282" ry="204" fill="#faefd9" stroke="#d9b38c" stroke-width="5"/>
 <ellipse rx="260" ry="184" fill="#eee0c5" opacity=".5"/>
</g>
''' + pastry(355,585,.79,-24) + pastry(540,570,.78,18) + pastry(265,728,.7,21) + pastry(450,756,.80,-8) + pastry(632,730,.71,-13) + pastry(440,916,.64,12) + '''
<g transform="translate(135 290) rotate(-8)">
 <ellipse cx="0" cy="245" rx="85" ry="27" fill="#64432b" opacity=".2" filter="url(#shadow)"/>
 <rect x="-78" y="-3" width="156" height="247" rx="29" fill="#e4be79" opacity=".64" stroke="#f5e9cc" stroke-width="8"/>
 <rect x="-67" y="18" width="134" height="212" rx="20" fill="url(#syrup)" opacity=".94"/>
 <rect x="-33" y="-54" width="66" height="63" rx="8" fill="#e0caab"/>
 <rect x="-43" y="-69" width="86" height="32" rx="9" fill="#fff8ea" stroke="#dfc6a7" stroke-width="4"/>
 <rect x="-52" y="89" width="104" height="87" rx="43" fill="#f8edd8"/>
 <text x="0" y="120" fill="#70402b" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="20">a little</text>
 <text x="0" y="148" fill="#70402b" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="19">syrup</text>
 <path d="M-49 25q-19 102-2 175" fill="none" stroke="#fff4cf" stroke-width="11" stroke-linecap="round" opacity=".5"/>
</g>
<g transform="translate(754 838)">
 <ellipse rx="118" ry="64" fill="#9e684a" opacity=".3" filter="url(#shadow)"/>
 <path d="M-124 -22Q-110 89 -65 101Q8 123 77 91Q112 59 125 -24Z" fill="#e9e0d0" stroke="#c39b72" stroke-width="6"/>
 <ellipse cy="-24" rx="125" ry="49" fill="#f6efe3" stroke="#d1b59a" stroke-width="6"/>
 <ellipse cy="-24" rx="98" ry="32" fill="#faf7ef"/>
 <path d="M-70 -23q70-30 138 1M-45 -14q50 -10 85 3" stroke="#e5d8c7" stroke-width="10" fill="none" stroke-linecap="round"/>
 <circle cx="-37" cy="-22" r="8" fill="#fff"/><circle cx="17" cy="-35" r="9" fill="#fff"/><circle cx="55" cy="-13" r="7" fill="#fff"/>
</g>
<path d="M750 300q18 37 43 41m-6-74q-19 26-16 50" stroke="#7d523a" fill="none" stroke-width="5" stroke-linecap="round" opacity=".6"/>
'''
# DIY Kit is now a client-supplied photograph. Do not overwrite /images/koesister-kit.svg.
# The live /images/koesisters-diy-kit-client-20261123.webp and compatibility
# aliases are intentionally maintained outside this illustrative-art generator.

# Hero variation with similar recognisable ingredients, stronger negative space.
hero = '''<circle cx="550" cy="545" r="430" fill="#f5d6aa" opacity=".48"/>
<circle cx="550" cy="545" r="352" fill="none" stroke="#fbedd7" stroke-width="3"/>
<g transform="translate(20 -65) rotate(-3 440 575)">
<ellipse cx="505" cy="809" rx="383" ry="155" fill="#563524" opacity=".19" filter="url(#shadow)"/>
<ellipse cx="525" cy="645" rx="371" ry="277" fill="#f6e8d0" stroke="#b98961" stroke-width="12"/>
<ellipse cx="525" cy="645" rx="334" ry="248" fill="#fff4e0" stroke="#dfbb94" stroke-width="7"/>
</g>
''' + pastry(375,525,.88,-16) + pastry(620,540,.91,15) + pastry(310,741,.9,-8) + pastry(560,771,.91,10) + '''
<g transform="translate(802 330) rotate(13)">
 <rect x="-75" y="-18" width="142" height="250" rx="30" fill="#f0e3c9" stroke="#fff5e3" stroke-width="9"/>
 <rect x="-62" y="-2" width="117" height="218" rx="24" fill="url(#syrup)"/>
 <path d="M-38 2v195" stroke="#ffe6af" stroke-width="9" opacity=".55" stroke-linecap="round"/>
 <rect x="-35" y="-65" width="65" height="52" rx="8" fill="#e4cfaa"/>
 <rect x="-49" y="-85" width="93" height="28" rx="8" fill="#fff8ec"/>
 <ellipse cx="-4" cy="113" rx="48" ry="51" fill="#fff5df"/>
 <text x="-4" y="120" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="24" fill="#794528">sweet</text>
 </g>
 <g transform="translate(150 975)"><path d="M-98 -55Q-75 68 -28 86Q41 100 94 40L99 -62Z" fill="#e9d4b7" stroke="#bd8a64" stroke-width="7"/>
 <ellipse cx="0" cy="-60" rx="99" ry="37" fill="#fff7e7" stroke="#bd8a64" stroke-width="7"/>
 <ellipse cx="0" cy="-60" rx="80" ry="26" fill="#e8e0ce"/>
 <path d="M-44-61L33-73M-30-49L54-53" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"/></g>
''' + small_burst(160,200,1.4,'#a56c45') + small_burst(890,760,.7,'#a56c45')
(OUT/'hero-illustration.svg').write_text(wrap(1000,1100,hero,'#e6c397'),encoding='utf8')

bodies = {}
bodies['concept-treat-box'] = '''<ellipse cx="450" cy="635" rx="310" ry="75" fill="#815344" opacity=".2" filter="url(#shadow)"/>
<g transform="rotate(-8 450 420)">
<path d="M212 281L590 221L739 349L348 419Z" fill="#eee0c3" stroke="#a8724f" stroke-width="9"/>
<path d="M212 281L348 419V671L218 527Z" fill="#ad734c" stroke="#8c573d" stroke-width="8"/>
<path d="M348 419L739 349L724 612L348 671Z" fill="#d1a679" stroke="#ae7856" stroke-width="9"/>
<path d="M420 269L491 255L624 375L557 389Z" fill="#ae604d" opacity=".7"/>
<path d="M323 418L367 413L368 669L323 640Z" fill="#a64f44"/>
<ellipse cx="554" cy="502" rx="79" ry="74" fill="#f8eedb" stroke="#986b50" stroke-width="4"/>
<text x="554" y="495" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="27" fill="#70432e">a little</text>
<text x="554" y="530" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="29" fill="#70432e">joy</text>
</g>
<path d="M445 251c-109 -115 -167 49 12 77c172-131 231-13 4 6" stroke="#914d45" stroke-width="26" stroke-linecap="round" fill="none"/>
<path d="M459 331q-20 -91 -43 -115m48 119q78 -74 115 -82" stroke="#f2d4b9" stroke-width="5" fill="none"/>
''' + small_burst(136,155,1.1,'#974e42')
(OUT/'concept-treat-box.svg').write_text(wrap(900,790,bodies['concept-treat-box'],'#eccfc8'),encoding='utf8')

bodies['concept-sharing-tray'] = '''<circle cx="470" cy="500" r="355" fill="#d5ad81" opacity=".15"/>
<g transform="translate(457 565) rotate(10)">
 <ellipse rx="345" ry="306" fill="#a07958" opacity=".19" filter="url(#shadow)"/>
 <ellipse rx="338" ry="286" fill="#e7dcc7" stroke="#b58b69" stroke-width="12"/>
 <ellipse rx="298" ry="249" fill="#f6ecd7" stroke="#d2ae8d" stroke-width="5"/>
</g>
''' + pastry(363,394,.82,-27) + pastry(559,425,.79,31) + pastry(285,600,.77,17) + pastry(492,615,.79,-14) + pastry(670,605,.65,-19) + pastry(450,792,.72,8) + '''
<circle cx="120" cy="160" r="64" fill="none" stroke="#ac7c52" stroke-width="2" opacity=".6"/>
<path d="M110 165q49 40 80 -9m-100 -28q-30 29 -3 65" stroke="#b8a184" fill="none" stroke-width="5" stroke-linecap="round"/>
''' + small_burst(770,220,.8,'#8f604b')
(OUT/'concept-sharing-tray.svg').write_text(wrap(900,1040,bodies['concept-sharing-tray'],'#ead9c3'),encoding='utf8')

bodies['concept-gifting'] = '''<ellipse cx="440" cy="710" rx="313" ry="58" fill="#160d0a" opacity=".27" filter="url(#shadow)"/>
<g transform="rotate(7 470 488)">
<rect x="211" y="306" width="511" height="395" rx="25" fill="#9b5b41" stroke="#d7ac8a" stroke-width="9"/>
<path d="M213 378h510" stroke="#b6745b" stroke-width="10"/>
<rect x="183" y="269" width="563" height="114" rx="17" fill="#c18a64" stroke="#edc19d" stroke-width="8"/>
<rect x="419" y="271" width="93" height="431" fill="#f0d8b6"/>
<rect x="184" y="300" width="559" height="43" fill="#f0d8b6"/>
<path d="M473 274c-163-165-213 14-6 41c218-103 196-225 6-41" fill="none" stroke="#eacaa6" stroke-width="33" stroke-linecap="round"/>
<path d="M464 300L370 544m118-241l108 247" stroke="#f5e4ca" stroke-width="10" fill="none"/>
<path d="M536 415l130 37-34 122-129-36Z" fill="#f8efe0" stroke="#d5b99d" stroke-width="5"/>
<text x="583" y="481" text-anchor="middle" fill="#6b4938" font-family="Georgia,serif" font-size="34" font-style="italic">for you</text>
</g>
''' + small_burst(140,140,1,'#f0c59c') + small_burst(782,756,.6,'#f0c59c')
(OUT/'concept-gifting.svg').write_text(wrap(900,880,bodies['concept-gifting'],'#a26f58'),encoding='utf8')

bodies['concept-weekend'] = '''<path d="M80 1180q60-450 460-700q169-80 300-235" fill="none" stroke="#5d6b50" stroke-width="30" opacity=".21"/>
<ellipse cx="500" cy="949" rx="302" ry="80" fill="#546047" opacity=".22" filter="url(#shadow)"/>
<g transform="translate(470 815) rotate(-6)">
<ellipse rx="292" ry="200" fill="#f5eee0" stroke="#c4b89b" stroke-width="13"/><ellipse rx="257" ry="165" fill="#fff8e9" stroke="#d9cdb5" stroke-width="5"/>
</g>
''' + pastry(390,755,.8,-14) + pastry(570,770,.8,21) + '''
<g transform="translate(223 370)">
 <ellipse cx="90" cy="265" rx="140" ry="45" fill="#456247" opacity=".22" filter="url(#shadow)"/>
 <path d="M-25 -25h234l-33 259q-14 55-83 64Q22 284 7 239Z" fill="#eee3c7" stroke="#c0b296" stroke-width="9"/>
 <ellipse cx="93" cy="-28" rx="121" ry="47" fill="#faf1db" stroke="#b2a78d" stroke-width="9"/>
 <ellipse cx="93" cy="-28" rx="97" ry="28" fill="#9f5938"/>
 <path d="M193 30q104-39 104 53q-3 94-112 100" fill="none" stroke="#d5c6a8" stroke-width="24"/>
 <path d="M55 24v179" stroke="#fff7e9" stroke-width="13" opacity=".5" stroke-linecap="round"/>
</g>
<path d="M722 490q-36-89 29-163m-15 87q58-80 108-40M724 450q-88-29-81-103" fill="none" stroke="#617256" stroke-width="13" stroke-linecap="round"/>
<ellipse cx="747" cy="330" rx="26" ry="63" transform="rotate(28 747 330)" fill="#829171"/>
<ellipse cx="824" cy="368" rx="29" ry="65" transform="rotate(60 824 368)" fill="#718761"/>
''' + small_burst(742,133,.65,'#678069')
(OUT/'concept-weekend.svg').write_text(wrap(900,1160,bodies['concept-weekend'],'#ced5c1'),encoding='utf8')

bodies['concept-surprise'] = '''<circle cx="453" cy="400" r="314" fill="#f9e9cd" opacity=".52"/>
<ellipse cx="450" cy="675" rx="245" ry="51" fill="#9a583c" opacity=".19" filter="url(#shadow)"/>
<g transform="translate(450 425) rotate(-5)">
<path d="M-211 -167L194 -209L245 212L-176 242Z" fill="#b97052" stroke="#8d523c" stroke-width="12"/>
<path d="M-211 -167L0 -236L194 -209L-23 -128Z" fill="#e6b47c" stroke="#a87554" stroke-width="8"/>
<path d="M-15 -132L-9 236" stroke="#f3d8ae" stroke-width="24"/>
<rect x="-110" y="-44" width="209" height="159" rx="90" fill="#f8e9ce"/>
<text x="-5" y="71" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="126" fill="#91533f">?</text>
</g>
''' + small_burst(164,139,1.1,'#ad6b47') + small_burst(770,618,.9,'#ad6b47') + '''
<path d="M94 498q46 -39 77-11m551-242q40-29 83 4" fill="none" stroke="#bf7955" stroke-width="6" stroke-linecap="round"/>
'''
(OUT/'concept-surprise.svg').write_text(wrap(900,820,bodies['concept-surprise'],'#f1cd9d'),encoding='utf8')
print('Generated 7 illustration assets.')
