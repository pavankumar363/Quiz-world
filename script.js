/* Quiz World — Professional client-side application layer
   HTML + CSS + JavaScript + localStorage. Backend-ready architecture.
*/
(function(){
  "use strict";
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const store={
    get(k,f){try{return JSON.parse(localStorage.getItem(k)) ?? f}catch{return f}},
    set(k,v){localStorage.setItem(k,JSON.stringify(v))}
  };
  const toast=(m)=>{
    const e=$("#toast"); if(!e)return;
    e.textContent=m;e.classList.add("show");clearTimeout(window.__qwt);
    window.__qwt=setTimeout(()=>e.classList.remove("show"),2800);
  };
  window.showToast=toast;
  const uid=(p="QW")=>p+"-"+Math.random().toString(36).slice(2,8).toUpperCase();
  const escapeHtml=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
  const defaultQuestions=[
    {id:"q1",type:"mcq",question:"Which technology is used to structure a web page?",options:["CSS","HTML","JavaScript","Python"],answer:[1],explanation:"HTML provides the structure and semantic content of web pages."},
    {id:"q2",type:"mcq",question:"Which language is primarily used to add interactivity to web pages?",options:["HTML","CSS","JavaScript","SQL"],answer:[2],explanation:"JavaScript is the primary browser language for interactive behaviour."},
    {id:"q3",type:"mcq",question:"Which CSS property changes text colour?",options:["font-style","background","color","text-decoration"],answer:[2],explanation:"The color property controls the foreground/text colour."},
    {id:"q4",type:"truefalse",question:"HTML is a programming language.",options:["True","False"],answer:[1],explanation:"HTML is a markup language, not a general-purpose programming language."},
    {id:"q5",type:"mcq",question:"Which symbol starts an ID selector in CSS?",options:[".","#","@",":"],answer:[1],explanation:"The # symbol selects an element by its id."},
    {id:"q6",type:"mcq",question:"Which keyword defines a function in Python?",options:["function","def","fun","define"],answer:[1],explanation:"Python uses the def keyword to define functions."},
    {id:"q7",type:"mcq",question:"Which data type stores True or False?",options:["String","Integer","Boolean","Array"],answer:[2],explanation:"Boolean values represent logical True or False states."},
    {id:"q8",type:"mcq",question:"What does AI stand for?",options:["Automated Internet","Artificial Intelligence","Applied Information","Advanced Interface"],answer:[1],explanation:"AI means Artificial Intelligence."},
    {id:"q9",type:"multiple",question:"Which are commonly used web technologies? Select all that apply.",options:["HTML","CSS","JavaScript","Photoshop"],answer:[0,1,2],explanation:"HTML, CSS and JavaScript are core web technologies."},
    {id:"q10",type:"mcq",question:"Which HTTP method is commonly used to retrieve data?",options:["POST","GET","PATCH","DELETE"],answer:[1],explanation:"GET requests are commonly used to retrieve resources."}
  ];

  // Shared navigation
  const menu=$("#menuToggle"), nav=$("#mainNav");
  if(menu&&nav)menu.addEventListener("click",()=>nav.classList.toggle("open"));
  $$("#mainNav a").forEach(a=>a.addEventListener("click",()=>nav?.classList.remove("open")));

  // Homepage interactions
  $("#challengeBtn")?.addEventListener("click",()=>location.href="quiz.html?quiz=daily");
  $("#leaderboardBtn")?.addEventListener("click",()=>location.href="leaderboard.html");
  $("#aiBtn")?.addEventListener("click",()=>location.href="ai-quiz.html");
  $("#loginBtn")?.addEventListener("click",()=>location.href="login.html");
  $$(".text-btn").forEach(b=>b.addEventListener("click",()=>location.href="quiz.html"));
  $$(".category-grid button").forEach(b=>b.addEventListener("click",()=>toast((b.textContent||"Category").trim()+" selected.")));
  $$(".options button").forEach(b=>b.addEventListener("click",()=>toast("Demo question — start a quiz for scored answers.")));

  // Faculty quiz creation
  const createForm=$("#quizBuilder");
  if(createForm){
    const questionList=$("#builderQuestions"), addBtn=$("#addQuestion");
    let questions=store.get("qw_draft_questions",[]);
    const render=()=>{
      if(!questionList)return;
      questionList.innerHTML=questions.map((q,i)=>`<div class="panel builder-question">
        <div class="builder-q-head"><b>Question ${i+1}</b><button type="button" class="text-btn remove-q" data-i="${i}">Remove</button></div>
        <label>Question<input class="q-text" data-i="${i}" value="${escapeHtml(q.question)}"></label>
        <div class="form-grid compact">
          ${q.options.map((o,j)=>`<label>Option ${String.fromCharCode(65+j)}<input class="q-opt" data-i="${i}" data-j="${j}" value="${escapeHtml(o)}"></label>`).join("")}
        </div>
        <label>Correct option<select class="q-answer" data-i="${i}">${q.options.map((o,j)=>`<option value="${j}" ${q.answer[0]===j?"selected":""}>${String.fromCharCode(65+j)}</option>`).join("")}</select></label>
      </div>`).join("");
      $$(".remove-q").forEach(b=>b.onclick=()=>{questions.splice(+b.dataset.i,1);render()});
      $$(".q-text").forEach(e=>e.oninput=()=>questions[+e.dataset.i].question=e.value);
      $$(".q-opt").forEach(e=>e.oninput=()=>questions[+e.dataset.i].options[+e.dataset.j]=e.value);
      $$(".q-answer").forEach(e=>e.onchange=()=>questions[+e.dataset.i].answer=[+e.value]);
    };
    if(!questions.length)questions=defaultQuestions.slice(0,5).map(q=>({...q,options:[...q.options],answer:[...q.answer]}));
    render();
    addBtn?.addEventListener("click",()=>{questions.push({id:uid("Q"),type:"mcq",question:"New question",options:["Option A","Option B","Option C","Option D"],answer:[0],explanation:""});render()});
    createForm.addEventListener("submit",e=>{
      e.preventDefault();
      const fd=new FormData(createForm);
      const quiz={
        id:uid("QUIZ"),code:Math.random().toString(36).slice(2,8).toUpperCase(),
        title:fd.get("title")||"Untitled Quiz",category:fd.get("category")||"General",
        time:Number(fd.get("time")||15),marks:Number(fd.get("marks")||1),
        negative:Number(fd.get("negative")||0),attempts:Number(fd.get("attempts")||1),
        questions,createdAt:new Date().toISOString(),published:true
      };
      const quizzes=store.get("qw_quizzes",[]);
      quizzes.push(quiz);store.set("qw_quizzes",quizzes);store.set("qw_draft_questions",questions);
      const box=$("#createdQuizInfo");
      if(box)box.innerHTML=`<div class="success-box"><strong>Quiz published successfully.</strong><br>Quiz Code: <b>${quiz.code}</b><br><a class="btn btn-primary" href="quiz.html?quiz=${quiz.id}">Preview Quiz →</a> <button class="btn btn-light" id="copyCode" type="button">Copy Code</button></div>`;
      $("#copyCode")?.addEventListener("click",async()=>{await navigator.clipboard?.writeText(quiz.code);toast("Quiz code copied.");});
      toast("Quiz published successfully 🎉");
    });
    const file=$("#material");
    file?.addEventListener("change",async e=>{
      const f=e.target.files[0];if(!f)return;
      const name=f.name.toLowerCase();
      if(name.endsWith(".txt")){
        const text=await f.text();
        const parsed=parseTextQuestions(text);if(parsed.length){questions=parsed;render();toast(parsed.length+" questions imported.");}
        else toast("TXT loaded. Use one question per block with A-D options.");
      }else toast("File selected. PDF/DOCX parsing is prepared for the next backend integration.");
    });
  }

  function parseTextQuestions(text){
    const blocks=text.split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean), out=[];
    blocks.forEach((b,i)=>{
      const lines=b.split("\n").map(x=>x.trim()).filter(Boolean);
      const qline=lines.find(x=>/^\d+[.)]/.test(x))||lines[0];
      const opts=lines.filter(x=>/^[A-D][.)]\s*/i.test(x)).map(x=>x.replace(/^[A-D][.)]\s*/i,"").trim());
      const ans=lines.find(x=>/^(answer|ans)\s*:/i.test(x));
      if(qline&&opts.length>=2)out.push({id:uid("Q"),type:"mcq",question:qline.replace(/^\d+[.)]\s*/,""),options:opts.slice(0,4),answer:[Math.max(0,(ans?.match(/[A-D]/i)?.[0]?.toUpperCase().charCodeAt(0)||65)-65)],explanation:"Imported from material."});
    }); return out;
  }

  // AI quiz generator — local intelligent template engine; backend AI can replace generateAIQuestions()
  const aiForm=$("#aiGenerator");
  if(aiForm){
    aiForm.addEventListener("submit",e=>{
      e.preventDefault();
      const topic=$("#aiTopic")?.value.trim()||"General Knowledge";
      const count=Number($("#aiCount")?.value||10);
      const difficulty=$("#aiDifficulty")?.value||"Medium";
      const qs=generateAIQuestions(topic,count,difficulty);
      const quiz={id:uid("AI"),code:Math.random().toString(36).slice(2,8).toUpperCase(),title:topic+" — AI Practice",category:"AI Practice",time:Math.max(5,Math.ceil(count*1.2)),marks:1,negative:0,attempts:1,questions:qs,createdAt:new Date().toISOString(),published:true};
      const quizzes=store.get("qw_quizzes",[]);quizzes.push(quiz);store.set("qw_quizzes",quizzes);
      toast("AI practice quiz generated.");
      setTimeout(()=>location.href="quiz.html?quiz="+quiz.id,350);
    });
  }
  function generateAIQuestions(topic,count,difficulty){
    const bank=[
      ["Which statement best describes "+topic+"?","A broad concept used for learning and problem solving","A type of computer cable","Only a database command","A file extension",[0]],
      ["Which approach is most useful when learning "+topic+"?","Practice, feedback and revision","Avoiding examples","Memorizing without understanding","Skipping difficult topics",[0]],
      ["What is an important skill when working with "+topic+"?","Critical thinking","Random guessing","Ignoring evidence","Copying answers",[0]],
      ["Which outcome suggests strong understanding of "+topic+"?","You can explain and apply the idea","You can only repeat a definition","You avoid practical questions","You never review mistakes",[0]],
      ["What should you do after making a mistake in "+topic+"?","Review the explanation and retry","Delete the result","Stop practicing","Guess the same answer",[0]]
    ];
    return Array.from({length:Math.max(1,count)},(_,i)=>{const b=bank[i%bank.length];return{id:uid("AIQ"),type:"mcq",question:(i+1)+". "+b[0],options:b.slice(1,5),answer:b[5],explanation:"AI practice explanation: compare each option with the core concept of "+topic+".";difficulty};});
  }

  // Quiz engine
  const engine=$("#quizEngine");
  if(engine){
    const params=new URLSearchParams(location.search), id=params.get("quiz");
    const quizzes=store.get("qw_quizzes",[]);
    let quiz=quizzes.find(q=>q.id===id)||quizzes[0];
    if(!quiz){quiz={id:"demo",title:"Web Development Basics",code:"WEB101",time:10,marks:1,negative:0,attempts:1,questions:defaultQuestions};}
    let questions=quiz.questions.map(q=>({...q,options:[...q.options],answer:[...q.answer]}));
    questions=questions.sort(()=>Math.random()-.5).map(q=>({...q,options:q.options.map((o,i)=>({o,i})).sort(()=>Math.random()-.5),answer:q.answer.map(a=>a)}));
    // preserve correct indexes after option shuffle
    questions.forEach(q=>{const pairs=q.options; q.options=pairs.map(x=>x.o);q.answer=[...pairs.map((x,i)=>q.answer.includes(x.i)?i:-1).filter(i=>i>=0)];});
    let idx=0,answers={},review={},started=Date.now(),remaining=quiz.time*60,interval;
    const title=$("#quizTitle"),timer=$("#quizTimer"),qtext=$("#questionText"),opts=$("#answerOptions"),count=$("#questionCount"),progress=$("#quizProgress"),grid=$("#questionGrid");
    if(title)title.textContent=quiz.title;
    const renderNav=()=>{if(!grid)return;grid.innerHTML=questions.map((q,i)=>`<button type="button" class="${i===idx?"current ":""}${answers[i]!==undefined?"answered ":""}${review[i]?"review":""}" data-i="${i}">${i+1}</button>`).join("");$$("button",grid).forEach(b=>b.onclick=()=>{idx=+b.dataset.i;render()})};
    const render=()=>{
      const q=questions[idx];if(!q)return;
      if(count)count.textContent=`Question ${idx+1} / ${questions.length}`;
      if(qtext)qtext.textContent=q.question;
      if(progress)progress.style.width=((idx+1)/questions.length*100)+"%";
      if(opts)opts.innerHTML=q.options.map((o,i)=>{const selected=q.type==="multiple"?(answers[idx]||[]).includes(i):answers[idx]===i;return`<button type="button" class="${selected?"selected":""}" data-i="${i}"><span class="answer-letter">${String.fromCharCode(65+i)}</span><span>${escapeHtml(o)}</span><b>${selected?"✓":""}</b></button>`}).join("");
      $$("button",opts).forEach(b=>b.onclick=()=>selectAnswer(+b.dataset.i,q.type==="multiple"));
      const mark=$("#reviewBtn");if(mark)mark.textContent=review[idx]?"★ Marked":"☆ Mark for Review";
      renderNav();
    };
    const selectAnswer=(choice,type)=>{
      if(type==="multiple"){const a=answers[idx]||[];answers[idx]=a.includes(choice)?a.filter(x=>x!==choice):[...a,choice];}
      else answers[idx]=choice;
      store.set("qw_live_"+quiz.id,{answers,idx,review,started});
      render();
    };
    $("#prevBtn")?.addEventListener("click",()=>{if(idx>0){idx--;render()}});
    $("#nextBtn")?.addEventListener("click",()=>{if(idx<questions.length-1){idx++;render()}else submit()});
    $("#reviewBtn")?.addEventListener("click",()=>{review[idx]=!review[idx];render()});
    $("#submitQuiz")?.addEventListener("click",()=>submit());
    function submit(){
      clearInterval(interval);
      let correct=0,wrong=0,unanswered=0,total=0;
      questions.forEach((q,i)=>{
        const a=answers[i]; if(a===undefined||(Array.isArray(a)&&!a.length)){unanswered++;return;}
        const aa=Array.isArray(a)?[...a].sort():[a], rr=[...q.answer].sort();
        if(JSON.stringify(aa)===JSON.stringify(rr)){correct++;total+=quiz.marks||1}else{wrong++;total-=quiz.negative||0}
      });
      const max=questions.length*(quiz.marks||1),score=Math.max(0,total),accuracy=questions.length?Math.round(correct/questions.length*100):0;
      const attempt={id:uid("ATT"),quizId:quiz.id,title:quiz.title,code:quiz.code,correct,wrong,unanswered,score,max,accuracy,time:Math.round((Date.now()-started)/1000),answers,questions,submittedAt:new Date().toISOString()};
      const history=store.get("qw_history",[]);history.unshift(attempt);store.set("qw_history",history.slice(0,100));store.set("qw_last_result",attempt);localStorage.removeItem("qw_live_"+quiz.id);
      location.href="results.html";
    }
    function tick(){remaining--;if(timer)timer.textContent=Math.max(0,Math.floor(remaining/60))+":"+String(Math.max(0,remaining%60)).padStart(2,"0");if(remaining<=0){toast("Time is up. Submitting…");submit()}}
    render();tick();interval=setInterval(tick,1000);
  }

  // Results
  const resultBox=$("#dynamicResult");
  if(resultBox){
    const a=store.get("qw_last_result",null);
    if(a){
      resultBox.innerHTML=`<div class="result-score"><strong>${a.max?Math.round(a.score/a.max*100):0}%</strong><span>${a.correct} / ${a.questions.length} correct</span><small>${a.accuracy>=80?"Excellent performance":a.accuracy>=60?"Good work — keep improving":"Keep practicing and review your mistakes."}</small></div>
      <div class="stat-grid"><div class="stat-card"><strong>${a.correct}</strong><small>Correct</small></div><div class="stat-card"><strong>${a.wrong}</strong><small>Incorrect</small></div><div class="stat-card"><strong>${a.unanswered}</strong><small>Unanswered</small></div><div class="stat-card"><strong>${a.time}s</strong><small>Time</small></div></div>
      <div class="panel review"><h2>Answer Review</h2>${a.questions.map((q,i)=>{const user=a.answers[i];const ok=Array.isArray(user)?JSON.stringify([...user].sort())===JSON.stringify([...q.answer].sort()):user!==undefined&&q.answer.includes(user);return`<div class="review-item ${ok?"correct":"wrong"}"><b>${String(i+1).padStart(2,"0")}.</b><span>${escapeHtml(q.question)}<small>Correct: ${escapeHtml(q.answer.map(x=>q.options[x]).join(", "))}</small></span><strong>${ok?"✓ Correct":"✗ Review"}</strong></div>`}).join("")}</div>`;
    }
  }

  // History dynamic data
  const historyBody=$("#historyBody");
  if(historyBody){
    const h=store.get("qw_history",[]);
    if(h.length)historyBody.innerHTML=h.map(a=>`<tr><td>${escapeHtml(a.title)}</td><td>${new Date(a.submittedAt).toLocaleDateString()}</td><td>${a.score}/${a.max}</td><td>${a.accuracy}%</td><td><span class="badge ${a.accuracy>=80?"success":""}">${a.accuracy>=80?"Excellent":"Completed"}</span></td></tr>`).join("");
  }

  // Join by code
  $("#joinQuizForm")?.addEventListener("submit",e=>{
    e.preventDefault();const code=$("#quizCode")?.value.trim().toUpperCase();
    const q=store.get("qw_quizzes",[]).find(x=>x.code===code);
    if(q)location.href="quiz.html?quiz="+q.id;else toast("Quiz code not found. Check the code and try again.");
  });

  // Student profile
  const profileForm=$("#profileForm");
  profileForm?.addEventListener("submit",e=>{e.preventDefault();const fd=new FormData(profileForm);store.set("qw_profile",Object.fromEntries(fd));toast("Profile saved.");});

  // Settings
  $("#darkMode")?.addEventListener("change",e=>{document.body.classList.toggle("dark",e.target.checked);store.set("qw_dark",e.target.checked)});
  if(store.get("qw_dark",false))document.body.classList.add("dark");

  // Expose reset helper for testing
  window.QuizWorld={store,defaultQuestions,generateAIQuestions};
})();