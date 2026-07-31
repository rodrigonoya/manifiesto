const sections = {
  'motivacion-1': { kicker:'Motivación I', title:'El tótem nunca fue un objeto, sino una frontera.', paragraphs:[
    'El tótem original no decoraba el espacio; lo fundaba. Era un mojón de piedra o madera que delimitaba lo sagrado de lo profano, lo posible de lo prohibido, la civilización de la barbarie.',
    'Todo tótem es un aviso. Una marca vertical que recuerda a la comunidad los riesgos a los que está expuesta.',
    'La función del tótem era la veneración y el respeto. Un pacto visual con lo invisible.' ] },
  'motivacion-2': { kicker:'Motivación II', title:'La propagación del control: el tótem que observa.', paragraphs:[
    'Las columnas de control y vigilancia en nuestras ciudades no son mobiliario urbano; son los nuevos tótems de una religión represiva.',
    'El dispositivo tecnológico ya no espera ser contemplado. Ahora el tótem es el ojo. La verticalidad hoy es una estructura de captura de información y de cuerpos: cámaras, sensores, entradas y salidas de datos.',
    'En la ciudad contemporánea, la red de vigilancia es el nuevo dios invisible. El “riesgo” ya no está afuera: nosotros somos el riesgo. Encarnamos lo prohibido en vías de ser procesado.' ] },
  'motivacion-3': { kicker:'Motivación III', title:'El retorno de la máquina anarca // neoludismo soft.', paragraphs:[
    'El ludismo no fue un odio a la herramienta, sino una defensa de una forma de vida. Romper el telar era salvar el cuerpo del artesano.',
    'Proponemos una práctica de “Neoludismo Soft”: no destruir la máquina, sino profanar su ontología. Usar el microprocesador contra la eficiencia; usar el sensor contra la vigilancia.',
    'Nuestras instalaciones no son objetos de arte; son estructuras robóticas de interferencia poética.' ] },
  intencion: { kicker:'Intención', title:'Construcción de tótems oblicuos.', paragraphs:[
    '<strong>Reapropiación material:</strong> Utilizar desarrollos mecánicos, electrónicos y microprocesadores para producir efectos de disminución de la dominación maquínica y aumento de la potencia humana.',
    '<strong>Estética de lo invertido:</strong> La máquina debe funcionar para señalar su propia inutilidad o su propia amenaza. Un sistema complejo puesto al servicio de una resistencia.',
    '<strong>El giro de la mirada:</strong> Invertir la lógica de la captura. Que el hecho de observar el tótem lo active. Que la presencia humana sea el combustible que ponga en marcha el sistema poético-mecánico.',
    '<strong>Deserción tecnológica:</strong> Frente a las tecnologías que precarizan la existencia, oponemos máquinas que detienen el tiempo actual, interrumpen el flujo de datos y devuelven la mirada al vigilante.' ] },
  deseo: { kicker:'Deseo', title:'Aún podemos desertar.', paragraphs:[
    'No buscamos optimizar el mundo. Buscamos crear máquinas que planteen la situación de nuestra propia esclavitud por su simple puesta en marcha.',
    'Si el tótem actual nos vigila para controlarnos, nuestros tótems nos observarán para recordarnos que aún podemos desertar.' ] }
};

const canvas = document.querySelector('#firmament');
const ctx = canvas.getContext('2d');
const nodes = Array.from({ length: 105 }, () => ({ x:Math.random(), y:Math.random(), r:Math.random()*1.3+.15, vx:(Math.random()-.5)*.00012, vy:(Math.random()-.5)*.00012, a:Math.random()*.65+.15 }));
function resize() { const dpr=Math.min(devicePixelRatio,2); canvas.width=innerWidth*dpr; canvas.height=innerHeight*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); }
function animate() { ctx.clearRect(0,0,innerWidth,innerHeight); nodes.forEach(n => { n.x=(n.x+n.vx+1)%1; n.y=(n.y+n.vy+1)%1; const x=n.x*innerWidth,y=n.y*innerHeight; ctx.beginPath(); ctx.fillStyle=`rgba(210,165,107,${n.a})`; ctx.arc(x,y,n.r,0,Math.PI*2); ctx.fill(); }); requestAnimationFrame(animate); }
resize(); addEventListener('resize',resize); animate();

const dialog=document.querySelector('#manifesto-dialog');
document.querySelectorAll('.totem-node').forEach(button => button.addEventListener('click', () => { const section=sections[button.dataset.section]; document.querySelector('#dialog-kicker').textContent=section.kicker; document.querySelector('#dialog-title').textContent=section.title; document.querySelector('#dialog-copy').innerHTML=section.paragraphs.map(p=>`<p>${p}</p>`).join(''); dialog.showModal(); }));
document.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{ if(event.target===dialog) dialog.close(); });

const audio=document.querySelector('#ambient-audio'); const soundToggle=document.querySelector('#sound-toggle'); const soundLabel=document.querySelector('#sound-label');
soundToggle.addEventListener('click', async () => { if(audio.paused) { try { await audio.play(); soundToggle.setAttribute('aria-pressed','true'); soundLabel.textContent='Silenciar ambiente'; } catch { soundLabel.textContent='Audio no disponible'; } } else { audio.pause(); soundToggle.setAttribute('aria-pressed','false'); soundLabel.textContent='Activar ambiente'; } });
