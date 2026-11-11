const nav=document.getElementById('nav');
document.getElementById('menuToggle').addEventListener('click',()=>nav.classList.toggle('show'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('show')));
document.getElementById('year').textContent=new Date().getFullYear();
const modal=document.getElementById('adminModal');
const openModal=()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false')};
const closeModal=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true')};
document.getElementById('adminTrigger').addEventListener('click',openModal);
document.getElementById('closeAdmin').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
const loginArea=document.getElementById('loginArea'),editorArea=document.getElementById('editorArea');
document.getElementById('loginBtn').addEventListener('click',()=>{
  if(document.getElementById('adminPassword').value==='445596'){
    loginArea.hidden=true;editorArea.hidden=false;
    document.getElementById('editTitle').value=document.querySelector('.hero h1').innerText.replace(/\n/g,' ');
    document.getElementById('editDesc').value=document.querySelector('.hero-desc').innerText;
    document.getElementById('editWa').value='087840507473';
    document.getElementById('loginError').textContent='';
  }else document.getElementById('loginError').textContent='Password tidak sesuai.';
});
document.getElementById('saveSettings').addEventListener('click',()=>{
  const title=document.getElementById('editTitle').value.trim();
  const desc=document.getElementById('editDesc').value.trim();
  const wa=document.getElementById('editWa').value.replace(/\D/g,'');
  if(title) document.querySelector('.hero h1').textContent=title;
  if(desc) document.querySelector('.hero-desc').textContent=desc;
  if(wa){
    const normalized=wa.startsWith('0')?'62'+wa.slice(1):wa;
    document.querySelectorAll('a[href*="wa.me/"]').forEach(a=>{
      const url=new URL(a.href);url.pathname='/'+normalized;a.href=url.toString();
    });
  }
  localStorage.setItem('ta-preview-settings',JSON.stringify({title,desc,wa}));
  alert('Perubahan diterapkan pada tampilan browser ini. Untuk menerbitkan ke GitHub, edit file index.html lalu commit perubahan.');
});
document.getElementById('logoutBtn').addEventListener('click',()=>{
  editorArea.hidden=true;loginArea.hidden=false;document.getElementById('adminPassword').value='';
});
const saved=localStorage.getItem('ta-preview-settings');
if(saved){try{const s=JSON.parse(saved);if(s.title)document.querySelector('.hero h1').textContent=s.title;if(s.desc)document.querySelector('.hero-desc').textContent=s.desc;}catch(e){}}
