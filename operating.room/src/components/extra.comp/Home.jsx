import { useEffect } from "react"
import registerRequestService from "../../services/api/registerRequestService";
export default function Home() {
    const {createRequestMutation} = registerRequestService();
    useEffect(() => {
         /* نسخه 1.10.0 - تغییرات اخیر
       - حذف کامل اسکرول افقی از صفحه اصلی و کانتینر برد (board-wrap).
       - اضافه شدن دکمه "مدیریت پزشکان" در هدر و مودال مدیریت پزشکان (افزودن و حذف ستون).
       - اضافه شدن دکمه "چاپ بیمار" در هدر و منطق تولید خروجی چاپی شکیل A4 از جزئیات بیمار فعال.
    */

    const board = document.getElementById('board');
    const modalBack = document.getElementById('modalBack');
    const createBtn = document.getElementById('createBtn');
    const cancelModal = document.getElementById('cancelModal');
    const savePatientBtn = document.getElementById('savePatientBtn');
    const printBtn = document.getElementById('printBtn'); 
    
    const fullName = document.getElementById('fullName');
    const phone = document.getElementById('phone');
    const nationalId = document.getElementById('nationalId');
    const province = document.getElementById('province');
    const city = document.getElementById('city');
    const birthday = document.getElementById('birthday');

    const daysGrid = document.getElementById('daysGrid');
    const medList = document.getElementById('medList');
    const addMedBtn = document.getElementById('addMedBtn');
    const notes = document.getElementById('notes');
    const presetMedsWrap = document.getElementById('presetMedsWrap');

    const searchInput = document.getElementById('searchInput');
    const searchClearBox = document.getElementById('searchClearBox');
    const themeSwitchWrap = document.getElementById('themeSwitchWrap'); 
    
    // Doctor Management Elements
    const manageDoctorsBtn = document.getElementById('manageDoctorsBtn');
    const doctorsModalBack = document.getElementById('doctorsModalBack');
    const closeDoctorsModal = document.getElementById('closeDoctorsModal');
    const newDoctorName = document.getElementById('newDoctorName');
    const addDoctorBtn = document.getElementById('addDoctorBtn');
    const doctorsList = document.getElementById('doctorsList');

    const STORAGE_KEY = 'tododr_data_right_v3';
    const THEME_KEY = 'tododr_theme_v1';
    let state = { columns: [] };
    let editingPatientId = null;
    let currentSearch = '';
    let savedScroll = { top:0 }; // REMOVED savedScroll.left

    function uid(prefix='id'){ return prefix + '_' + Math.random().toString(36).slice(2,9); }

    function loadState(){
      const raw = localStorage.getItem(STORAGE_KEY);
      if(raw){
        try{ 
          state = JSON.parse(raw); 
          // Ensure 'بیماران' column exists and is the first one
          if(!state.columns[0] || state.columns[0].name !== 'بیماران'){
            const patientCol = state.columns.find(c => c.name === 'بیماران');
            if(patientCol){
              state.columns = state.columns.filter(c => c.name !== 'بیماران');
              state.columns.unshift(patientCol);
            } else {
              initDefault();
            }
          }
        } catch(e){ initDefault(); }
      } else initDefault();
    }
    
    function initDefault(){
      const defaultDoctors = ["بیماران","محمد نظری نسب","امیر آخشی","داریوش بهرامی","امیر حسنوند","مصطفی حسینیان"];
      state = { columns: defaultDoctors.map(d => ({ id: uid('col'), name: d, patients: [] })) };
      saveState();
    }

    function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

    function applyTheme(t){
      document.documentElement.setAttribute('data-theme', t);
      localStorage.setItem(THEME_KEY, t);
    }
    const savedTheme = localStorage.getItem(THEME_KEY) || 'semi-dark';
    applyTheme(savedTheme);

    // Theme Switch Logic
    themeSwitchWrap.addEventListener('click', (e) => {
        const target = e.target.closest('.switch-option');
        if(target){
            const newTheme = target.dataset.themeVal;
            applyTheme(newTheme);
        }
    });

    // Jalali conversion
    function gregorianToJalali(gy, gm, gd){
      const g_d_m = [0,31,59,90,120,151,181,212,243,273,304,334];
      let jy, jm, jd;
      let gy2 = (gm > 2) ? (gy + 1) : gy;
      let days = 355666 + (365 * gy) + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) + gd + g_d_m[gm-1];
      jy = -1595 + (33 * Math.floor(days / 12053));
      days = days % 12053;
      jy += 4 * Math.floor(days / 1461);
      days = days % 1461;
      if(days > 365){
        jy += Math.floor((days - 1) / 365);
        days = (days - 1) % 365;
      }
      if(days < 186){
        jm = 1 + Math.floor(days / 31);
        jd = 1 + (days % 31);
      } else {
        jm = 7 + Math.floor((days - 186) / 30);
        jd = 1 + ((days - 186) % 30);
      }
      return [jy, jm, jd];
    }
    const persianMonths = ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
    const persianWeekdays = ['یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه','جمعه','شنبه'];
    function formatHeaderDateShamsi(){
      const now = new Date();
      const [jy,jm,jd] = gregorianToJalali(now.getFullYear(), now.getMonth()+1, now.getDate());
      const wd = persianWeekdays[now.getDay()];
      return `امروز ${wd} ${jd} ${persianMonths[jm-1]} ${jy}`;
    }
    document.getElementById('headerDate').innerText = formatHeaderDateShamsi();

    // build days and presets
    function buildFormControls(){
      daysGrid.innerHTML = '';
      for(let i=1;i<=30;i++){
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'day-btn';
        b.innerText = i;
        b.dataset.days = i;
        b.addEventListener('click', () => {
          daysGrid.querySelectorAll('.day-btn').forEach(x=>x.classList.remove('active'));
          b.classList.add('active');
        });
        daysGrid.appendChild(b);
      }

      const presets = [
        {id:'p_cefalexin', name:'سفالکسین', doseOptions:[500,250], defaultDose:500, count:40, freq:4},
        {id:'p_cipro', name:'سیپروفلوکساسین', doseOptions:[500,250], defaultDose:500, count:30, freq:2},
        {id:'p_naproxen', name:'ناپروکسن', doseOptions:[500], defaultDose:500, count:30, freq:2},
        {id:'p_piroxicam', name:'آمپول پیروکسیکام 20mg', doseOptions:[20], defaultDose:20, count:3, freqLabel:'یک روز در میان'}
      ];
      presetMedsWrap.innerHTML = '';
      presets.forEach(p => {
        const el = document.createElement('div');
        el.className = 'preset-med';
        el.innerText = p.name;
        el.title = `${p.name} — پیش‌فرض دوز ${p.defaultDose}`;
        el.dataset.presetId = p.id;
        el.dataset.presetJson = JSON.stringify(p);
        el.addEventListener('click', () => {
          const pj = JSON.parse(el.dataset.presetJson);
          medList.appendChild(createMedRow({
            name: pj.name,
            doseOptions: pj.doseOptions,
            dose: pj.defaultDose,
            count: pj.count,
            freq: pj.freq || 1,
            presetId: pj.id
          }));
          el.classList.add('disabled');
          const mb = document.getElementById('modalBody');
          setTimeout(()=> mb.scrollTop = mb.scrollHeight, 50);
        });
        presetMedsWrap.appendChild(el);
      });
    }

    function createMedRow(med = {name:'',dose:'',count:1,freq:1, doseOptions:null, presetId:null}) {
      const row = document.createElement('div');
      row.className = 'med-row';
      if(med.presetId) row.dataset.presetId = med.presetId;

      const nameInput = document.createElement('input');
      nameInput.placeholder = 'نام دارو';
      nameInput.className = 'med-name';
      nameInput.value = med.name || '';

      let doseEl;
      if(Array.isArray(med.doseOptions) && med.doseOptions.length){
        doseEl = document.createElement('select');
        doseEl.className = 'med-dose';
        doseEl.style.width = '160px';
        med.doseOptions.forEach(opt => {
          const o = document.createElement('option');
          o.value = String(opt);
          o.innerText = `${opt} میلی گرم`;
          doseEl.appendChild(o);
        });
        doseEl.value = String(med.dose || med.doseOptions[0]);
      } else {
        doseEl = document.createElement('input');
        doseEl.placeholder = 'دوز (مثال: 500 میلی گرم)';
        doseEl.className = 'med-dose';
        doseEl.style.width = '160px';
        doseEl.value = med.dose || '';
      }

      const countInput = document.createElement('input');
      countInput.placeholder = 'تعداد';
      countInput.type = 'number';
      countInput.min = '1';
      countInput.className = 'med-count';
      countInput.style.width = '100px';
      countInput.value = med.count || 1;

      const freqSelect = document.createElement('select');
      freqSelect.className = 'med-freq';
      freqSelect.style.width = '180px';
      const freqOptions = [
        {v:'1', t:'1 — یک‌بار در روز'},
        {v:'2', t:'2 — دو بار در روز'},
        {v:'3', t:'3 — سه بار در روز'},
        {v:'4', t:'4 — چهار بار در روز'},
        {v:'0.5', t:'0.5 — یک روز در میان'}
      ];
      freqOptions.forEach(o => {
        const opt = document.createElement('option');
        opt.value = o.v; opt.innerText = o.t;
        freqSelect.appendChild(opt);
      });
      freqSelect.value = med.freq ? String(med.freq) : '1';

      const delBtn = document.createElement('button');
      delBtn.className = 'del-med-btn';
      delBtn.type = 'button';
      delBtn.title = 'حذف دارو';
      delBtn.innerText = '✕';
      
      delBtn.addEventListener('click', () => {
        const pid = row.dataset.presetId;
        if(pid){
          const presetEl = document.querySelector(`.preset-med[data-preset-id="${pid}"]`);
          if(presetEl) presetEl.classList.remove('disabled');
        }
        row.remove();
      });

      row.appendChild(nameInput);
      row.appendChild(doseEl);
      row.appendChild(countInput);
      row.appendChild(freqSelect);
      row.appendChild(delBtn);

      return row;
    }

    addMedBtn.addEventListener('click', () => {
      medList.appendChild(createMedRow());
      const mb = document.getElementById('modalBody');
      setTimeout(()=> mb.scrollTop = mb.scrollHeight, 50);
    });

    // search behavior
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim();
      searchClearBox.classList.toggle('hidden', currentSearch.length === 0);
      renderBoard();
    });
    searchClearBox.addEventListener('click', () => {
      searchInput.value = '';
      currentSearch = '';
      searchClearBox.classList.add('hidden');
      renderBoard();
      searchInput.focus();
    });

    function norm(s){ return (s||'').toString().trim().toLowerCase(); }

    // Column dragging
    let draggingColId = null;
    let colPlaceholder = null;

    function renderBoard(){
      board.innerHTML = '';
      const q = norm(currentSearch);

      state.columns.forEach(col => {
        const columnEl = document.createElement('div');
        columnEl.className = 'column';
        columnEl.dataset.colId = col.id;

        // header
        const header = document.createElement('div');
        header.className = 'col-header';
        
        const filteredPatients = col.patients.filter(p => patientMatchesQuery(p, q));
        
        header.innerHTML = `
          <div class="col-title">
            <strong>${col.name}</strong>
            <span class="count">${filteredPatients.length} بیمار</span>
          </div>
        `;

        if (col.name !== 'بیماران') {
          const dragBtn = document.createElement('div');
          dragBtn.className = 'col-drag-btn';
          dragBtn.innerText = '≡'; 
          dragBtn.title = 'جابجایی ستون';
          dragBtn.setAttribute('draggable','true');

          dragBtn.addEventListener('dragstart', (e) => {
            draggingColId = col.id;
            columnEl.classList.add('dragging-col');
            e.dataTransfer.setData('text/col', col.id);
            e.dataTransfer.effectAllowed = 'move';
            
            if(!colPlaceholder){
              colPlaceholder = document.createElement('div');
              colPlaceholder.className = 'col-placeholder';
            }
            const img = document.createElement('canvas'); img.width=1; img.height=1;
            e.dataTransfer.setDragImage(img,0,0);
          });
          dragBtn.addEventListener('dragend', (e) => {
            draggingColId = null;
            columnEl.classList.remove('dragging-col');
            if(colPlaceholder && colPlaceholder.parentNode) colPlaceholder.parentNode.removeChild(colPlaceholder);
            colPlaceholder = null;
          });
          header.appendChild(dragBtn);
        }

        const patientsWrap = document.createElement('div');
        patientsWrap.className = 'patients';
        patientsWrap.dataset.colId = col.id;

        // Card Drop Handlers
        patientsWrap.addEventListener('dragenter', (e) => {
          if(e.dataTransfer.types.includes('text/card')) columnEl.classList.add('drop-highlight');
        });
        patientsWrap.addEventListener('dragleave', (e) => {
          columnEl.classList.remove('drop-highlight');
        });
        patientsWrap.addEventListener('dragover', (e) => {
          if(e.dataTransfer.types.includes('text/card')){
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            patientsWrap.classList.add('drop-over');
            const afterEl = getDragAfterElement(patientsWrap, e.clientY);
            patientsWrap.querySelectorAll('.insert-marker').forEach(m => m.remove());
            const marker = document.createElement('div');
            marker.className = 'insert-marker';
            marker.style.height = '8px';
            marker.style.margin = '6px 0';
            marker.style.borderRadius = '6px';
            marker.style.background = 'rgba(6,182,212,0.18)';
            if(afterEl == null) patientsWrap.appendChild(marker);
            else patientsWrap.insertBefore(marker, afterEl);
          }
        });
        patientsWrap.addEventListener('drop', (e) => {
          const cardId = e.dataTransfer.getData('text/card');
          if(cardId) {
            e.preventDefault();
            patientsWrap.classList.remove('drop-over');
            columnEl.classList.remove('drop-highlight');
            const marker = patientsWrap.querySelector('.insert-marker');
            let insertBeforeId = null;
            if(marker){
              const next = marker.nextElementSibling;
              if(next && next.dataset && next.dataset.cardId) insertBeforeId = next.dataset.cardId;
              marker.remove();
            }
            moveCardToColumnAtPosition(cardId, col.id, insertBeforeId);
          }
        });

        // Cards
        filteredPatients.forEach(p => {
          patientsWrap.appendChild(createPatientCard(p));
        });

        columnEl.appendChild(header);
        columnEl.appendChild(patientsWrap);
        board.appendChild(columnEl);

        // COLUMN DROP Handlers 
        columnEl.addEventListener('dragover', (e) => {
          if(draggingColId && col.name !== 'بیماران') {
             e.preventDefault();
             const rect = columnEl.getBoundingClientRect();
             const mid = rect.left + rect.width / 2;
             
             if(!colPlaceholder) {
                colPlaceholder = document.createElement('div');
                colPlaceholder.className = 'col-placeholder';
             }

             if(e.clientX > mid){
                if(columnEl.previousSibling !== colPlaceholder){
                   columnEl.parentNode.insertBefore(colPlaceholder, columnEl);
                }
             } else {
                if(columnEl.nextSibling !== colPlaceholder) {
                   columnEl.parentNode.insertBefore(colPlaceholder, columnEl.nextSibling);
                }
             }
          }
        });
        
        columnEl.addEventListener('drop', (e) => {
           const colId = e.dataTransfer.getData('text/col');
           if(colId && colId !== col.id){
             e.preventDefault();
             finishColumnMove();
           }
        });

      }); 
    }

    function finishColumnMove(){
       if(!draggingColId || !colPlaceholder || !colPlaceholder.parentNode) return;
       
       const allNodes = Array.from(board.children);
       const placeholderIdx = allNodes.indexOf(colPlaceholder);
       
       const fromIdx = state.columns.findIndex(c => c.id === draggingColId);
       const [movedCol] = state.columns.splice(fromIdx, 1);
       
       let insertIndex = 0;
       for(let i=0; i<placeholderIdx; i++){
          if(allNodes[i].classList.contains('column') && allNodes[i].dataset.colId !== draggingColId){
             insertIndex++;
          }
       }
       
       state.columns.splice(insertIndex, 0, movedCol);
       saveState();
       renderBoard();
    }
    
    board.addEventListener('drop', (e) => {
       if(e.dataTransfer.types.includes('text/col')){
          e.preventDefault();
          finishColumnMove();
       }
    });
    board.addEventListener('dragover', (e) => {
       if(e.dataTransfer.types.includes('text/col')) e.preventDefault(); 
    });


    function getDragAfterElement(container, y) {
      const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')];
      return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      }, { offset: Number.NEGATIVE_INFINITY }).element || null;
    }

    function patientMatchesQuery(p, q){
      if(!q) return true;
      if(norm(p.name).includes(q)) return true;
      if(norm(p.phone).includes(q)) return true;
      if(norm(p.nationalId).includes(q)) return true;
      if(norm(p.province).includes(q)) return true;
      if(norm(p.city).includes(q)) return true;
      return false;
    }

    function createPatientCard(p){
      const card = document.createElement('div');
      card.className = 'card';
      card.draggable = true; 
      card.dataset.cardId = p.id;

      const del = document.createElement('div');
      del.className = 'delete-x';
      del.innerText = '✕';
      del.title = 'حذف بیمار';
      del.addEventListener('click', (e) => {
        e.stopPropagation();
        if(confirm('آیا مطمئن هستید که می‌خواهید این بیمار حذف شود؟')) deletePatient(p.id);
      });

      const meta = document.createElement('div');
      meta.className = 'meta';

      const nameEl = document.createElement('div');
      nameEl.className = 'name';
      nameEl.innerText = p.name || 'بدون نام';

      const phoneEl = document.createElement('div');
      phoneEl.className = 'small';
      phoneEl.innerHTML = `تلفن: <span>${p.phone||''}</span>`;

      const nidEl = document.createElement('div');
      nidEl.className = 'small';
      nidEl.innerHTML = `کد ملی: <span>${p.nationalId||''}</span>`;

      const provinceEl = document.createElement('div');
      provinceEl.className = 'small';
      provinceEl.innerHTML = `استان: <span>${p.province||''}</span>`;

      const cityEl = document.createElement('div');
      cityEl.className = 'small';
      cityEl.innerHTML = `شهر: <span>${p.city||''}</span>`;

      const birthdayEl = document.createElement('div');
      birthdayEl.className = 'small';
      birthdayEl.innerHTML = `شهر: <span>${p.birthday||''}</span>`;

      const visitEl = document.createElement('div');
      visitEl.className = 'small';
      visitEl.innerHTML = `تاریخ مراجعه: <span>${formatDateForDisplay(p.nextVisit)||''}</span>`;

      const medsEl = document.createElement('div');
      medsEl.className = 'small';
      const medsLabel = document.createElement('div');
      medsLabel.innerText = 'داروها:';
      const medsListDiv = document.createElement('div');
      medsListDiv.className = 'meds-list';
      if(p.meds && p.meds.length){
        p.meds.forEach(m => {
          const mi = document.createElement('div');
          mi.className = 'med-item';
          mi.innerText = `${m.name} — ${m.dose} — ${m.count} عدد — ${m.freqLabel || (m.freq == 0.5 ? 'یک روز در میان' : (m.freq + ' بار در روز'))}`;
          medsListDiv.appendChild(mi);
        });
      }

      medsEl.appendChild(medsLabel);
      medsEl.appendChild(medsListDiv);

      meta.appendChild(nameEl);
      meta.appendChild(phoneEl);
      meta.appendChild(nidEl);
      meta.appendChild(provinceEl);
      meta.appendChild(cityEl);
      meta.appendChild(birthdayEl);
      // meta.appendChild(visitEl);
      // meta.appendChild(medsEl);
      
      if(p.notes && p.notes.trim()){
          const notesWrap = document.createElement('div');
          notesWrap.className = 'small';
          notesWrap.style.marginTop = '6px';
          notesWrap.style.paddingTop = '6px';
          notesWrap.style.borderTop = '1px dashed var(--card-border)';
          const displayNote = p.notes.trim().length > 100 ? p.notes.trim().substring(0, 100) + '...' : p.notes.trim();
          notesWrap.innerHTML = `<strong>توضیحات:</strong> <span>${displayNote}</span>`;
          meta.appendChild(notesWrap);
      }

      card.appendChild(del);
      card.appendChild(meta);

      card.addEventListener('dragstart', (e) => {
        savedScroll.top = document.documentElement.scrollTop || document.body.scrollTop;
        e.dataTransfer.setData('text/card', p.id);
        e.dataTransfer.effectAllowed = 'move';
        card.classList.add('dragging');
        const img = document.createElement('canvas'); img.width=1; img.height=1;
        e.dataTransfer.setDragImage(img,0,0);
        document.documentElement.style.scrollBehavior = 'auto';
      });
      card.addEventListener('dragend', (e) => {
        card.classList.remove('dragging');
        document.querySelectorAll('.insert-marker').forEach(m => m.remove());
        document.querySelectorAll('.column.drop-highlight').forEach(c => c.classList.remove('drop-highlight'));
        setTimeout(()=> {
          document.documentElement.style.scrollBehavior = 'smooth';
          window.scrollTo(window.scrollX, savedScroll.top); 
        }, 10);
        console.log('dragend', JSON.parse(localStorage.getItem('tododr_data_right_v3')))
      });

      card.addEventListener('click', (e) => {
        if(e.target.closest('.delete-x')) return;
        console.log(p)
        openEditModal(p.id);
      });

      return card;
    }

    function formatDateForDisplay(ts){
      if(!ts) return '';
      try{
        const d = new Date(ts);
        const [jy,jm,jd] = gregorianToJalali(d.getFullYear(), d.getMonth()+1, d.getDate());
        const wd = persianWeekdays[d.getDay()];
        return `${jd}/${jm}/${jy} ${wd}`;
      }catch(e){ return ts; }
    }

    function moveCardToColumnAtPosition(cardId, colId, beforeCardId){
      let patient = null;
      state.columns.forEach(col => {
        const idx = col.patients.findIndex(p => p.id === cardId);
        if(idx >= 0) patient = col.patients.splice(idx,1)[0];
      });
      if(!patient) return;
      const targetCol = state.columns.find(c => c.id === colId);
      if(!targetCol) return;
      if(beforeCardId){
        const idx = targetCol.patients.findIndex(p => p.id === beforeCardId);
        if(idx >= 0) targetCol.patients.splice(idx,0,patient);
        else targetCol.patients.push(patient);
      } else {
        targetCol.patients.push(patient);
      }
      saveState();
      renderBoard();
    }

    function deletePatient(id){
      state.columns.forEach(col => {
        const idx = col.patients.findIndex(p => p.id === id);
        if(idx >= 0) col.patients.splice(idx,1);
      });
      saveState();
      renderBoard();
    }

    // Modal
    function openCreateModal(){
      editingPatientId = null;
      document.getElementById('modalTitle').innerText = 'ایجاد بیمار جدید';
      fullName.value = '';
      phone.value = '';
      nationalId.value = '';
      province.value = '';
      city.value = '';
      birthday.value = '';
      notes.value = '';
      medList.innerHTML = '';
      document.querySelectorAll('.preset-med').forEach(el => el.classList.remove('disabled'));
      daysGrid.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
      modalBack.style.display = 'flex';
      modalBack.setAttribute('aria-hidden','false');
      // Hide print button when creating a new patient
      printBtn.style.display = 'none';
    }

    function openEditModal(patientId){
      const p = findPatientById(patientId);
      if(!p) return;
      editingPatientId = patientId;
      document.getElementById('modalTitle').innerText = 'ویرایش بیمار';
      fullName.value = p.name || '';
      phone.value = p.phone || '';
      nationalId.value = p.nationalId || '';
      province.value = p.province || '';
      city.value = p.city || '';
      birthday.value = p.birthday || '';
      notes.value = p.notes || '';
      medList.innerHTML = '';
      if(p.meds && p.meds.length){
        p.meds.forEach(m => medList.appendChild(createMedRow({
          name: m.name, dose: m.dose, count: m.count, freq: m.freq, doseOptions: null, presetId: m.presetId || null
        })));
      }
      daysGrid.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
      if(p.nextVisit){
        const days = Math.round((new Date(p.nextVisit) - new Date()) / (1000*60*60*24));
        if(days >= 1 && days <= 30){
          const btn = daysGrid.querySelector(`.day-btn[data-days="${days}"]`);
          if(btn) btn.classList.add('active');
        }
      }
      document.querySelectorAll('.preset-med').forEach(el => el.classList.remove('disabled'));
      if(p.meds && p.meds.length){
        p.meds.forEach(m => {
          document.querySelectorAll('.preset-med').forEach(el => {
            if(el.innerText === m.name) el.classList.add('disabled');
          });
        });
      }
      modalBack.style.display = 'flex';
      modalBack.setAttribute('aria-hidden','false');
      // Show print button when editing
      printBtn.style.display = 'flex'; 
    }

    function findPatientById(id){
      for(const col of state.columns){
        for(const p of col.patients) if(p.id === id) return p;
      }
      return null;
    }

    cancelModal.addEventListener('click', () => {
      modalBack.style.display = 'none';
      modalBack.setAttribute('aria-hidden','true');
      printBtn.style.display = 'none'; 
    });

    createBtn.addEventListener('click', openCreateModal);

    savePatientBtn.addEventListener('click', () => {
      const name = fullName.value.trim();
      const ph = phone.value.trim(); 
      const nid = nationalId.value.trim();
      const prov = province.value.trim();
      const cit = city.value.trim();
      const bday = birthday.value.trim();
      const note = notes.value.trim();
      const dayBtn = daysGrid.querySelector('.day-btn.active');
      
      let nextVisit = null;
      if(dayBtn){
        const days = parseInt(dayBtn.dataset.days,10);
        const d = new Date();
        d.setDate(d.getDate() + days);
        nextVisit = d.toISOString();
      }
      const meds = [];
      medList.querySelectorAll('.med-row').forEach(r => {
        const name = r.querySelector('.med-name').value.trim();
        let dose = '';
        const doseEl = r.querySelector('.med-dose');
        if(doseEl){
          if(doseEl.tagName.toLowerCase() === 'select') dose = doseEl.value + ' میلی گرم';
          else dose = doseEl.value.trim();
        }
        const count = Number(r.querySelector('.med-count').value) || 1;
        const freqVal = r.querySelector('.med-freq').value;
        const freq = Number(freqVal);
        const freqLabel = freq === 0.5 ? 'یک روز در میان' : '';
        const presetId = r.dataset.presetId || null;
        if(name) meds.push({ name, dose, count, freq, freqLabel, presetId });
      });

      if(editingPatientId){
        const p = findPatientById(editingPatientId);
        if(p){
          p.name = name || p.name;
          p.phone = ph;
          p.nationalId = nid;
          p.prov = prov || p.prov;
          p.city = p.cit;
          p.birthday = p.bday;
          p.notes = note;
          p.nextVisit = nextVisit;
          p.meds = meds;
        }
      } else {
        const newP = {
          id: uid('pat'),
          name: name || 'بدون نام',
          phone: ph,
          nationalId: nid,
          province: prov,
          city: cit,
          birthday: bday,
          notes: note,
          nextVisit,
          meds
        };
        state.columns[0].patients.unshift(newP);
      }
      saveState();
      modalBack.style.display = 'none';
      modalBack.setAttribute('aria-hidden','true');
      printBtn.style.display = 'none';
      renderBoard();
    });

    // ----------------------------------------------------------------------------------
    // NEW: Print Functionality (Print Patient Detail)
    // ----------------------------------------------------------------------------------
    
    printBtn.addEventListener('click', () => {
      if(!editingPatientId) return alert('ابتدا باید یک بیمار را برای ویرایش انتخاب کنید تا بتوانید جزئیات او را چاپ کنید!');
      const patient = findPatientById(editingPatientId);
      if(patient) printPatientDetails(patient);
    });
    
    function printPatientDetails(p){
      const visitDate = formatDateForDisplay(p.nextVisit);
      const medsHtml = (p.meds && p.meds.length) ? p.meds.map(m => `
        <li classname="my-[5px] py-2 px-3 bg-[#f0f7ff] rounded-[6px] border-r-[4px] border-r-[#0ea5e9] text-sm flex justify-center text-center">
          <span style={{fontWeight: "700"}}>${m.name}</span>
          <span>دوز: ${m.dose || '-'}</span>
          <span>تعداد: ${m.count}</span>
          <span style={{color:"#1d4ed8;"}}>${m.freqLabel || (m.freq == 0.5 ? 'یک روز در میان' : (m.freq + ' بار در روز'))}</span>
        </li>
      `).join('') : '<li style={{color:"#94a3b8", listStyle:"none"}}> دارویی ثبت نشده است. </li>';
      
      const printContent = `
        <!doctype html>
        <html lang="fa" dir="rtl">
        <head>
          <meta charset="utf-8" />
          <title>نسخه چاپی بیمار: ${p.name}</title>
          <style>
            @page { size: A4; margin: 15mm; }
            body { font-family: 'Vazirmatn', Tahoma, Arial, sans-serif; margin: 0; padding: 20px; color: #1f2937; }
            .container { max-width: 800px; margin: 0 auto; border: 1px solid #e5e7eb; padding: 30px; border-radius: 8px; }
            h2 { color: #0ea5e9; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px; marginTop: 0; fontSize: 24px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
            .info-item { padding: 10px; border-bottom: 1px dashed #e5e7eb; }
            .info-item strong { display: block; color: #6b7280; fontSize: 13px; margin-bottom: 4px; }
            .notes-section { border: 1px solid #e5e7eb; padding: 15px; border-radius: 6px; background: #f9fafb; marginTop: 20px; }
            .notes-section p { margin: 0; white-space: pre-wrap; fontSize: 14px; line-height: 1.6; }
            .meds-list { list-style: none; padding: 0; margin: 10px 0 0 0; }
            .header-info { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header-info">
              <h2 style={{border:'none', marginBottom:0, color:'#1f2937'}}>گزارش بیمار: ${p.name}</h2>
              <div style={{fontSize: '14px', color:'#6b7280'}}>تاریخ چاپ: ${formatHeaderDateShamsi()}</div>
            </div>
            <h2 style={{fontSize:'18px'}}>جزئیات اصلی</h2>
            <div class="info-grid">
              <div class="info-item"><strong>نام و نام خانوادگی</strong> ${p.name}</div>
              <div class="info-item"><strong>تاریخ مراجعه بعدی</strong> ${visitDate || 'نامشخص'}</div>
              <div class="info-item"><strong>شماره تماس</strong> ${p.phone || '-'}</div>
              <div class="info-item"><strong>کد ملی</strong> ${p.nationalId || '-'}</div>
            </div>

            <h2 style={{fontSize:'18px', borderColor:'#22c55e', color:'#22c55e',}}>داروهای تجویز شده</h2>
            <ul class="meds-list">${medsHtml}</ul>

            <h2 style={{fontSize:'18px', borderColor:'#f59e0b', color:'#f59e0b', marginTop:'30px',}}>توضیحات و سوابق</h2>
            <div class="notes-section">
              <p>${p.notes || 'توضیحات خاصی ثبت نشده است.'}</p>
            </div>
            <div style={{marginTop:'40px', textAlign:center, color:'#94a3b8', fontSize: '12px',}}>سیستم نوبت‌دهی بیماران TODODR</div>
          </div>
        </body>
        </html>
      `;
      
      const printWindow = window.open('', '_blank', 'width=800,height=600');
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => printWindow.print(), 500);
    }
    
    // ----------------------------------------------------------------------------------
    // NEW: Doctor Management Logic
    // ----------------------------------------------------------------------------------
    
    manageDoctorsBtn.addEventListener('click', () => {
      renderDoctorsList();
      doctorsModalBack.style.display = 'flex';
      doctorsModalBack.setAttribute('aria-hidden','false');
    });
    
    closeDoctorsModal.addEventListener('click', () => {
      doctorsModalBack.style.display = 'none';
      doctorsModalBack.setAttribute('aria-hidden','true');
      renderBoard();
    });
    
    addDoctorBtn.addEventListener('click', () => {
      const name = newDoctorName.value.trim();
      if(name && !state.columns.some(c => c.name === name)){
        state.columns.push({ id: uid('col'), name: name, patients: [] });
        newDoctorName.value = '';
        saveState();
        renderDoctorsList();
      } else if(name) {
        alert('این نام پزشک قبلاً اضافه شده است.');
      }
    });

    function renderDoctorsList(){
      doctorsList.innerHTML = '';
      state.columns.forEach((col, index) => {
        const item = document.createElement('div');
        item.className = 'med-item';
        item.dataset.colId = col.id;
        item.style.display = 'flex';
        item.style.justifyContent = 'space-between';
        item.style.alignItems = 'center';
        
        let actionsHtml = '';
        if(col.name !== 'بیماران'){
          actionsHtml = `
            <div clasName={flex gap-2}>
              <button class="btn delete-doctor-btn" data-id="${col.id}" style={{padding:'4px 8px', fontSize: '12px', height:'auto', background:"#fee2e2", border-color:"#fca5a5", color:"#dc2626", fontWeight:700,}} title="حذف پزشک و انتقال بیماران">حذف</button>
            </div>
          `;
        } else {
          actionsHtml = `<span style={color:'#94a3b8'}>(ستون اصلی)</span>`;
        }
        
        item.innerHTML = `
          <span className='font-bold'>${col.name}</span>
          ${actionsHtml}
        `;
        doctorsList.appendChild(item);
      });
      
      doctorsList.querySelectorAll('.delete-doctor-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const colId = e.target.dataset.id;
          deleteDoctor(colId);
        });
      });
    }

    function deleteDoctor(colId){
      const index = state.columns.findIndex(c => c.id === colId);
      if(index < 0 || state.columns[index].name === 'بیماران') return;
      
      const doctorName = state.columns[index].name;
      const patientsCount = state.columns[index].patients.length;
      
      if(!confirm(`آیا مطمئن هستید که می‌خواهید ستون پزشک ${doctorName} حذف شود؟\n${patientsCount} بیمار به ستون "بیماران" منتقل خواهند شد.`)) return;
      
      const [deletedCol] = state.columns.splice(index, 1);
      
      if(state.columns.length > 0 && deletedCol.patients.length > 0){
        state.columns[0].patients = deletedCol.patients.concat(state.columns[0].patients);
      }
      
      saveState();
      renderDoctorsList();
    }


    loadState();
    buildFormControls();
    renderBoard();

    modalBack.addEventListener('click', (e) => {
      if(e.target === modalBack){
        modalBack.style.display = 'none';
        modalBack.setAttribute('aria-hidden','true');
        printBtn.style.display = 'none';
      }
    });
    
    doctorsModalBack.addEventListener('click', (e) => {
      if(e.target === doctorsModalBack){
        doctorsModalBack.style.display = 'none';
        doctorsModalBack.setAttribute('aria-hidden','true');
        renderBoard();
      }
    });

    }, []);
    const clickHandler = () => {
        const dataLocal = JSON.parse(localStorage.getItem('tododr_data_right_v3')); 
        console.log(dataLocal);
        const {data} = dataLocal.columns.find(item => item.name == 'بیماران').patients[0]
        createRequestMutation.mutate({
          user: {fullName: data.name, nationalCode: data.nationalId, phoneNumber: data.phone, province: data.province, city: data.city, birthday: data.birthday}, 
          request:{service: 'ویزیت پزشک', type: 'recovery'}})
        console.log(dataLocal.columns.find(item => item.name == 'بیماران').patients[0])
    }
    return (
        <>
            <header>
              <div className="header-left">
                <div className="logo-wrapper" title="لوگو"><img src="12.png" alt="logo" /></div>
                <div className="brand" style={{minWidth: 0}}>
                  <h1>TODODR</h1>
                  <div className="subtitle">سیستم نوبت‌دهی بیماران</div>
                </div>
                <div style={{width: "12px"}}></div>
                <div className="search-area">
                  <div className="search-wrap" role="search" aria-label="جستجوی بیماران">
                    <input id="searchInput" className="search-input" placeholder="جستجو با نام / تلفن / کد ملی" aria-label="جستجو" />
                  </div>
                  <div id="searchClearBox" className="search-clear-box hidden" title="پاک کردن جستجو">✕</div>
                </div>
              </div>
                
              <div className="header-center"><div className="header-date" id="headerDate">—</div></div>
                
              <div className="header-right">
                <button id="manageDoctorsBtn" className="btn big font-bold" title="افزودن، حذف یا جابجایی پزشکان/ستون‌ها">مدیریت پزشکان</button>
                
                <button id="printBtn" className="btn primary big" title="چاپ جزئیات بیمار انتخاب‌شده">چاپ بیمار</button>
                
                <button id="createBtn" className="btn primary big">ایجاد بیمار جدید</button>
                
                <div className="theme-switch-wrap" id="themeSwitchWrap">
                    <div id="themeSlider" className="theme-slider"></div>
                    <div className="switch-option" data-theme-val="light" id="lightOption">روشن</div>
                    <div className="switch-option" data-theme-val="semi-dark" id="semiDarkOption">تاریک</div>
                </div>
              </div>
            </header>
                
            <main>
              <div className="mt-3">
                <div className="small-muted text-[15px]">
                  <strong>ستون بیماران در سمت راست ثابت است. ستون پزشکان (باقی ستون‌ها) و کارت‌های بیمار قابل جابجایی هستند.</strong>
                </div>
              </div>
              <div className="board-wrap" id="board" tabIndex="0" aria-label="تابلو نوبت‌ها"></div>
            </main>
                
            <div className="modal-back" id="modalBack" aria-hidden="true">
              <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
                <h2 id="modalTitle">ایجاد بیمار جدید</h2>
                <div className="modal-body" id="modalBody">
                  <div className="form-grid mt-[10px]">
                    <div style={{gridColumn:"1 / -1"}}>
                      <div className="row-three">
                        <div><label>نام و نام خانوادگی</label><input type="text" id="fullName" placeholder="مثال: علی رضایی" /></div>
                        <div><label>شماره تماس</label><input type="number" id="phone" maxLength={11} placeholder="09xxxxxxxx" inputMode="numeric" pattern="[0-9]*" /></div>
                        <div><label>کد ملی</label><input type="number" maxLength={10} id="nationalId" placeholder="کد ملی" inputMode="numeric" pattern="[0-9]*" /></div>
                        <div><label>استان</label><input type="text" id="province" placeholder="استان" /></div>
                        <div><label>شهر</label><input type="text" id="city" placeholder="شهر" /></div>
                        <div><label>تاریخ تولد</label><input type="text" id="birthday" placeholder="تاریخ تولد" /></div>
                      </div>
                    </div>
                
                    <div style={{gridColumn: "1 / -1"}}>
                      <label>تاریخ مراجعه (انتخاب با دکمه عددی: تعداد روز بعد)</label>
                      <div className="days-grid" id="daysGrid"></div>
                      <div className="small-muted mt-2">مثال: انتخاب 3 یعنی مراجعه 3 روز بعد از امروز</div>
                    </div>
                
                    <div style={{gridColumn: "1 / -1"}}>
                      <label>داروها (پیش‌فرض‌های ارتوپدی؛ کلیک کن تا پارامترها سریع اعمال شوند)</label>
                      <div style={{display:' flex',gap:'8px',flexWrap: 'wrap',marginBottom:'8px'}} id="presetMedsWrap"></div>
                      <div style={{display:' flex',gap:'8px',alignItems:'center',margiBottom:'8px'}}>
                        <button className="btn primary" id="addMedBtn" type="button">+ افزودن دارو</button>
                        <div className="small-muted">برای هر دارو: نام، دوز (انتخابی)، تعداد، روش مصرف (یک‌بار/دو بار/سه بار/چهار بار/یک روز در میان)</div>
                      </div>
                      <div className="med-list" id="medList"></div>
                    </div>
                
                    <div style={{gridColumn: "1 / -1"}}>
                      <label>توضیحات</label>
                      <textarea id="notes" placeholder="توضیحات..."></textarea>
                    </div>
                  </div>
                </div>
                
                <div className="modal-actions">
                  <button className="btn" id="cancelModal">انصراف</button>
                  <button className="btn primary" id="savePatientBtn" onClick={() => clickHandler()}>ذخیره</button>
                </div>
              </div>
            </div>
                
            <div className="modal-back" id="doctorsModalBack" aria-hidden="true">
              <div className="modal" role="dialog" aria-modal="true" aria-labelledby="doctorsModalTitle" style={{width: "520px"}}>
                <h2 id="doctorsModalTitle">🧑‍⚕️ مدیریت ستون‌های پزشکان</h2>
                <div className="modal-body" id="doctorsModalBody">
                  <div className="mb-[15px] flex gap-[10px]">
                    <input type="text" id="newDoctorName" placeholder="نام پزشک جدید" style={{flex: 1}} />
                    <button className="btn primary" id="addDoctorBtn" style={{minWidth: '120px', height: '40px', padding: '6px 10px', fontWeight: 700}}>+ افزودن</button>
                  </div>
                  <div id="doctorsList" className="meds-list" style={{marginTop: 0, border:'1px solid var(--card-border)', padding:'10px', borderRadius:'8px'}}>
                    </div>'
                  <div className="small-muted" style={{marginTop:"10px"}}>ستون **بیماران** (ردیف اول) قابلیت حذف و جابجایی ندارد.</div>
                </div>
                <div className="modal-actions">
                  <button className="btn primary" id="closeDoctorsModal" style={{minWidth:'160px'}}>ذخیره و بستن</button>
                </div>
              </div>
            </div>
                
            <footer className="version">ویرایش: 1.10.0</footer>

        </>
    )
}