$(document).ready(async function(){
let formData={};
let volunteerCount=1;
// --------------------------VOLUNTEERS-------------------------
let dataVolunteer = await fetch("http://localhost:4000/api/get-volunteer").then(res => res.json());

  if (dataVolunteer.volunteer !== "Hech bir malumat tapilmadi") {
    dataVolunteer.volunteer.map(volunteerData => {
      if(volunteerData.status!==0){
        $('.volunteer-list').append(`
        <tr>
          <td class='volunteer-td' data-id="${volunteerData._id}">${volunteerCount++}</td>
          <td class='volunteer-td' data-id="${volunteerData._id}">${volunteerData.name}</td>
          <td class='volunteer-td' data-id="${volunteerData._id}">${volunteerData.surname}</td>
          <td class='volunteer-td' data-id="${volunteerData._id}">${volunteerData.number}</td>
          <td class='volunteer-td' data-id="${volunteerData._id}">${volunteerData.email}</td>
        </tr>
        `)
      }
    })
  }

  $(document).on('click','.volunteer-td',async function(){
    $('tr').css('background-color','');
    $(this).parent().css('background-color','grey');
    let that=this;
  $('.delete-volunteer').click(async function(){
    formData.id=$(that).attr('data-id');
    formData.status=0;
    
    let menu = await fetch("http://localhost:4000/api/delete-volunteer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json());
    $(that).parent().toggle(200);
    formData={};
  })
})

// --------------------------GAMERS-------------------------
let gamerCount=1;
let dataSign = await fetch("http://localhost:4000/api/get-sign").then(res => res.json());

  if (dataSign.sign !== "Hech bir malumat tapilmadi") {
    dataSign.sign.map(signData => {
      if(signData.status!==0){
        $('.gamers-list').append(`
        <tr>
          <td class='sign-td' data-id="${signData._id}">${gamerCount++}</td>
          <td class='sign-td' data-id="${signData._id}">${signData.name}</td>
          <td class='sign-td' data-id="${signData._id}">${signData.gender}</td>
          <td class='sign-td' data-id="${signData._id}">${signData.region}</td>
          <td class='sign-td' data-id="${signData._id}">${signData.date}</td>
          <td class='sign-td' data-id="${signData._id}">${signData.number}</td>
          <td class='sign-td' data-id="${signData._id}">${signData.email}</td>
          <td class='sign-td' data-id="${signData._id}">${signData.where}</td>
        </tr>
        `)
      }
    })

  }

  $(document).on('click','.sign-td',async function(){
    $('tr').css('background-color','');
    $(this).parent().css('background-color','grey');
    let that=this;
  $('.delete-gamers').click(async function(){
    formData.id=$(that).attr('data-id');
    formData.status=0;
    
    let menu = await fetch("http://localhost:4000/api/delete-sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json());
    $(that).parent().toggle(200);
    formData={};
  })
})

// XAMSA GAMERS
let xamsaId;
let clickedXamsa;
let xamsaGamersCount=1;
let dataXamsa = await fetch("http://localhost:4000/api/get-xamsa").then(res => res.json());
if (dataXamsa.xamsa !== "Hech bir malumat tapilmadi") {
  dataXamsa.xamsa.map(xamsaData => {
    if(xamsaData.status!==0){
      $('.xamsaGamers-list').append(`
      <tr>
        <td class='xamsaGamers-td' data-id="${xamsaData._id}">${xamsaGamersCount++}</td>
        <td class='xamsaGamers-td xamsaGamers-question' data-id="${xamsaData._id}">${xamsaData.question}</td>
        <td class='xamsaGamers-td xamsaGamers-answer' data-id="${xamsaData._id}">${xamsaData.answer}</td>
        <td class='xamsaGamers-td xamsaGamers-level' data-id="${xamsaData._id}">${xamsaData.level}</td>
      </tr>
      `)
    }
  })
}

$('.add-xamsa').click(async function(){
  formData.question=$('.xamsa-question').val();
  formData.answer=$('.xamsa-answer').val();
  formData.level=$('.xamsa-level').val();
  formData.clas='go-another-xamsa-question';
  formData.status=1;

  let menu = await fetch("http://localhost:4000/api/add-xamsa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
  })
  .then(res => res.json());
  alert('Sual əlavə olundu.');
  formData={};
})

$(document).on('click','.xamsaGamers-td',async function(){
  $('tr').css('background-color','');
  $(this).parent().css('background-color','grey');
  $('.xamsa-question').val(`${$(this).parent().children('.xamsaGamers-question').text()}`);
  $('.xamsa-answer').val(`${$(this).parent().children('.xamsaGamers-answer').text()}`);
  $('.xamsa-level').val(`${$(this).parent().children('.xamsaGamers-level').text()}`)
  xamsaId=$(this).data("id");
  clickedXamsa=$(this);
})

$('.delete-xamsa').click(async function(){
  formData.id=xamsaId;
  formData.status=0;
  
  let menu = await fetch("http://localhost:4000/api/delete-xamsa", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
  .then(res => res.json());
  $(clickedXamsa).parent().toggle(200);
  alert('Sual silindi.');
  formData={};
})

$('.edit-xamsa').click(async function(){
  formData.question=$('.xamsa-question').val();
  formData.answer=$('.xamsa-answer').val();
  formData.level=$('.xamsa-level').val();
  formData.id=xamsaId;
  let menu = await fetch(`http://localhost:4000/api/change-xamsa/${formData.id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(formData)
  })
  .then(res => res.json());
  alert('Sualda dəyişiklik edildi.');
  formData={};
})
// BRAIN-RING GAMERS
let brainRingId;
let clickedBrainRing;
let brainRingGamersCount=1;
let dataBrainRing = await fetch("http://localhost:4000/api/get-brainRing").then(res => res.json());
if (dataBrainRing.brainRing !== "Hech bir malumat tapilmadi") {
  dataBrainRing.brainRing.map(brainRingData => {
    if(brainRingData.status!==0){
      $('.brainRing-list').append(`
      <tr>
        <td class='brainRing-td' data-id="${brainRingData._id}">${brainRingGamersCount++}</td>
        <td class='brainRing-td brainRingGamers-question' data-id="${brainRingData._id}">${brainRingData.question}</td>
        <td class='brainRing-td brainRingGamers-answer' data-id="${brainRingData._id}">${brainRingData.answer}</td>
        <td class='brainRing-td brainRingGamers-level' data-id="${brainRingData._id}">${brainRingData.level}</td>
      </tr>
      `)
    }
  })
}

$('.add-brainRing').click(async function(){
  formData.question=$('.brainRing-question').val();
  formData.answer=$('.brainRing-answer').val();
  formData.level=$('.brainRing-level').val();
  formData.clas='go-another-brain-question';
  formData.status=1;

  let menu = await fetch("http://localhost:4000/api/add-brainRing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
  })
  .then(res => res.json());
  alert('Sual əlavə olundu.');
  formData={};
})

$(document).on('click','.brainRing-td',async function(){
  $('tr').css('background-color','');
  $(this).parent().css('background-color','grey');
  $('.brainRing-question').val(`${$(this).parent().children('.brainRingGamers-question').text()}`);
  $('.brainRing-answer').val(`${$(this).parent().children('.brainRingGamers-answer').text()}`);
  $('.brainRing-level').val(`${$(this).parent().children('.brainRingGamers-level').text()}`)
  brainRingId=$(this).data("id");
  clickedBrainRing=$(this);
})

$('.delete-brainRing').click(async function(){
  formData.id=brainRingId;
  formData.status=0;
  
  let menu = await fetch("http://localhost:4000/api/delete-brainRing", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
  .then(res => res.json());
  $(clickedBrainRing).parent().toggle(200);
  alert('Sual silindi.');
  formData={};
})

$('.edit-brainRing').click(async function(){
  formData.question=$('.brainRing-question').val();
  formData.answer=$('.brainRing-answer').val();
  formData.level=$('.brainRing-level').val();
  formData.id=brainRingId;
  let menu = await fetch(`http://localhost:4000/api/change-brainRing/${formData.id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(formData)
  })
  .then(res => res.json());
  alert('Sualda dəyişiklik edildi.');
  formData={};
})
// WHAT GAMERS
let whatId;
let clickedWhat;
let whatGamersCount=1;
let dataWhat = await fetch("http://localhost:4000/api/get-what").then(res => res.json());
if (dataWhat.what !== "Hech bir malumat tapilmadi") {
  dataWhat.what.map(whatData => {
    if(whatData.status!==0){
      $('.what-list').append(`
      <tr>
        <td class='what-td' data-id="${whatData._id}">${whatGamersCount++}</td>
        <td class='what-td whatGamers-question' data-id="${whatData._id}">${whatData.question}</td>
        <td class='what-td whatGamers-answer' data-id="${whatData._id}">${whatData.answer}</td>
        <td class='what-td whatGamers-level' data-id="${whatData._id}">${whatData.level}</td>
      </tr>
      `)
    }
  })
}

$('.add-what').click(async function(){
  formData.question=$('.what-question').val();
  formData.answer=$('.what-answer').val();
  formData.level=$('.what-level').val();
  formData.clas='go-another-what-question';
  formData.status=1;

  let menu = await fetch("http://localhost:4000/api/add-what", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
  })
  .then(res => res.json());
  alert('Sual əlavə olundu.');
  formData={};
})

$(document).on('click','.what-td',async function(){
  $('tr').css('background-color','');
  $(this).parent().css('background-color','grey');
  $('.what-question').val(`${$(this).parent().children('.whatGamers-question').text()}`);
  $('.what-answer').val(`${$(this).parent().children('.whatGamers-answer').text()}`);
  $('.what-level').val(`${$(this).parent().children('.whatGamers-level').text()}`)
  whatId=$(this).data("id");
  clickedWhat=$(this);
})

$('.delete-what').click(async function(){
  formData.id=whatId;
  formData.status=0;
  
  let menu = await fetch("http://localhost:4000/api/delete-what", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
  .then(res => res.json());
  $(clickedWhat).parent().toggle(200);
  alert('Sual silindi.');
  formData={};
})

$('.edit-what').click(async function(){
  formData.question=$('.what-question').val();
  formData.answer=$('.what-answer').val();
  formData.level=$('.what-level').val();
  formData.id=whatId;
  let menu = await fetch(`http://localhost:4000/api/change-what/${formData.id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(formData)
  })
  .then(res => res.json());
  alert('Sualda dəyişiklik edildi.');
  formData={};
})

// CLEVER GAMERS
let cleverId;
let clickedClever;
let cleverGamersCount=1;
let dataClever = await fetch("http://localhost:4000/api/get-clever").then(res => res.json());
if (dataClever.clever !== "Hech bir malumat tapilmadi") {
  dataClever.clever.map(cleverData => {
    if(cleverData.status!==0){
      $('.clever-list').append(`
      <tr>
        <td class='clever-td' data-id="${cleverData._id}">${cleverGamersCount++}</td>
        <td class='clever-td cleverGamers-question' data-id="${cleverData._id}">${cleverData.question}</td>
        <td class='clever-td cleverGamers-answer' data-id="${cleverData._id}">${cleverData.answer}</td>
        <td class='clever-td cleverGamers-level' data-id="${cleverData._id}">${cleverData.level}</td>
      </tr>
      `)
    }
  })
}

$('.add-clever').click(async function(){
  formData.question=$('.clever-question').val();
  formData.answer=$('.clever-answer').val();
  formData.level=$('.clever-level').val();
  formData.clas='go-another-clever-question';
  formData.status=1;

  let menu = await fetch("http://localhost:4000/api/add-clever", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
  })
  .then(res => res.json());
  alert('Sual əlavə olundu.');
  formData={};
})

$(document).on('click','.clever-td',async function(){
  $('tr').css('background-color','');
  $(this).parent().css('background-color','grey');
  $('.clever-question').val(`${$(this).parent().children('.cleverGamers-question').text()}`);
  $('.clever-answer').val(`${$(this).parent().children('.cleverGamers-answer').text()}`);
  $('.clever-level').val(`${$(this).parent().children('.cleverGamers-level').text()}`)
  cleverId=$(this).data("id");
  clickedClever=$(this);
})

$('.delete-clever').click(async function(){
  formData.id=cleverId;
  formData.status=0;
  
  let menu = await fetch("http://localhost:4000/api/delete-clever", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
  .then(res => res.json());
  $(clickedClever).parent().toggle(200);
  alert('Sual silindi.');
  formData={};
})

$('.edit-clever').click(async function(){
  formData.question=$('.clever-question').val();
  formData.answer=$('.clever-answer').val();
  formData.level=$('.clever-level').val();
  formData.id=cleverId;
  let clever = await fetch(`http://localhost:4000/api/change-clever/${formData.id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(formData)
  })
  .then(res => res.json());
  if(clever.question!=='question not found.' && 
  clever.question!=='Data is null or undefined.'){
    alert('Sualda dəyişiklik edildi.');
  }
  formData={};
})

// ---------------------------PROJECTS---------------------------
$('.project-add-btn').click(async function(){
  formData.head=$('.project-head').val();
  formData.time=$('.project-when').val();
  formData.place=$('.project-where').val();
  formData.support=$('.project-who').val();
  formData.img=$('.project-picture').val().match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
  formData.hideContex=$('.project-hide-contex').val();
  formData.status=1;

  let menu = await fetch("http://localhost:4000/api/add-project", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
  .then(res => res.json());
  formData={};
    
})

$('.project-find-btn').click(async function(){
  formData.head=$('.project-head').val();

  let dataProject = await fetch(`http://localhost:4000/api/get-project/${formData.head}`).then(res => res.json());   
  if (dataProject.project !== "Hech bir malumat tapilmadi"){
    formData.id=dataProject.project._id        
    alert("Melumat tapildi")
    $('.project-change-btn').click(async function(){
      formData.head=$('.project-head').val();
      formData.time=$('.project-when').val();
      formData.place=$('.project-where').val();
      formData.support=$('.project-who').val();
      if($('.project-picture').val().length!==0){
        formData.img=$('.project-picture').val().match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
      }
      formData.hideContex=$('.project-hide-contex').val();
      let menu = await fetch(`http://localhost:4000/api/change-project/${formData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
      })
      .then(res => res.json());
      formData={};
    })
  }
})  

$('.project-delete-btn').click(async function(){
  formData.head=$('.project-head').val();
  formData.status=0;

  let menu = await fetch("http://localhost:4000/api/delete-project", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
  .then(res => res.json());
  
  formData={};
})

// -----------------------ABOUT---------------------------
$('.about-add-left').click(async function(){
    formData.name=$('.about-name').val();
    formData.img=$('.about-picture').val().match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
    formData.contex=$('.about-contex').val();
    formData.job=$('.about-job').val();
    formData.status=1;
    formData.direction='left';

    let menu = await fetch("http://localhost:4000/api/add-about", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(res => res.json());
    formData={};
})

$('.about-add-right').click(async function(){
    formData.name=$('.about-name').val();
    formData.img=$('.about-picture').val().match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
    formData.contex=$('.about-contex').val();
    formData.job=$('.about-job').val();
    formData.status=1;
    formData.direction='right';

    let menu = await fetch("http://localhost:4000/api/add-about", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(res => res.json());
    
    formData={};
})

$('.about-delete-btn').click(async function(){
    formData.name=$('.about-name').val();
    formData.status=0;

    let menu = await fetch("http://localhost:4000/api/delete-about", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(res => res.json());
    alert("Silinme uqurla basha chatdi")
    formData={};
})

$('.about-find-btn').click(async function(){
  formData.name=$('.about-name').val();

  let dataAbout = await fetch(`http://localhost:4000/api/get-about/${formData.name}`).then(res => res.json());   
  if (dataAbout.about !== "Hech bir malumat tapilmadi"){
    formData.id=dataAbout.about._id;     
    alert("Melumat tapildi")
    $('.about-change-btn').click(async function(){
      formData.name=$('.about-name').val();
      formData.contex=$('.about-contex').val();
      formData.job=$('.about-job').val();
      if($('.about-picture').val().length!==0){
        formData.img=$('.about-picture').val().match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
      }
      let menu = await fetch(`http://localhost:4000/api/change-about/${formData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
      })
      .then(res => res.json());
      formData={};
    })
  }
})

// -----------------------EVENT---------------------------
$('.event-add-btn').click(async function(){
    
    formData.head=$('.event-head').val();
    formData.contex=$('.event-contex').val();
    formData.time=$('.event-time').val();
    formData.url='#news';
    formData.img=$('.event-picture').val().match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
    formData.status=1;

    let menu = await fetch("http://localhost:4000/api/add-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(res => res.json());
    formData={};  
})

$('.event-find-btn').click(async function(){
  formData.head=$('.event-head').val();

  let dataEvent = await fetch(`http://localhost:4000/api/get-event/${formData.head}`).then(res => res.json());   
  if (dataEvent.event !== "Hech bir malumat tapilmadi"){
    formData.id=dataEvent.event._id        
    alert("Melumat tapildi")
    $('.event-change-btn').click(async function(){
      formData.head=$('.event-head').val();
      formData.contex=$('.event-contex').val();
      formData.time=$('.event-time').val();
      if($('.event-picture').val().length!==0){
        formData.img=$('.event-picture').val().match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
      }
      let menu = await fetch(`http://localhost:4000/api/change-event/${formData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
      })
      .then(res => res.json());
      formData={};
    })
  }
})

$('.event-delete-btn').click(async function(){
  formData.head=$('.event-head').val();
  formData.status=0;

  let menu = await fetch("http://localhost:4000/api/delete-event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
  .then(res => res.json());
  
  formData={};
})

// -----------------------NEWS---------------------------
$('.news-add-left').click(async function(){
    formData.head=$('.news-head').val();
    formData.contex=$('.news-contex').val();
    formData.hideContex=$('.news-hide-contex').val();
    formData.date=$('.news-date').val();
    formData.img=$('.news-picture').val().match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
    formData.status=1;
    formData.direction='left';

    let menu = await fetch("http://localhost:4000/api/add-news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(res => res.json());
    formData={};
})

$('.news-find-btn').click(async function(){
  formData.head=$('.news-head').val();

  let dataNews = await fetch(`http://localhost:4000/api/get-news/${formData.head}`).then(res => res.json());   
  if (dataNews.news !== "Hech bir malumat tapilmadi"){
    formData.id=dataNews.news._id        
    alert("Melumat tapildi")
    $('.news-change-btn').click(async function(){
      formData.head=$('.news-head').val();
      formData.contex=$('.news-contex').val();
      formData.hideContex=$('.news-hide-contex').val();
      formData.date=$('.news-date').val();
      if($('.news-picture').val().length!==0){
        formData.img=$('.news-picture').val().match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
      }
      let menu = await fetch(`http://localhost:4000/api/change-news/${formData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
      })
      .then(res => res.json());
      formData={};
    })
  }
})

$('.news-add-right').click(async function(){
    formData.head=$('.news-head').val();
    formData.contex=$('.news-contex').val();
    formData.hideContex=$('.news-hide-contex').val();
    formData.date=$('.news-date').val();
    formData.img=$('.news-picture').val().match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
    formData.status=1;
    formData.direction='right';

    let menu = await fetch("http://localhost:4000/api/add-news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(res => res.json());
    
    formData={};
})

$('.news-delete-btn').click(async function(){
  formData.head=$('.news-head').val();
  formData.status=0;

  let menu = await fetch("http://localhost:4000/api/delete-news", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
  .then(res => res.json());
  
  formData={};
})

  // log in page
  $("#logIn").on("click", async function() {
  let some=await fetch(`http://localhost:4000/api/get-parol`).then(res=>res.json());  
  if (some.password !== "There is no any parol"){
    some.password.map(pass => {
      if (pass.password === $("input[name=logInParol]").val() &&
          pass.user===$('input[name=logInEmail]').val()) {
        $('.parol-container').remove();
        window.location.href = "http://localhost:4000/adminMain";
      } 
      if(pass.password !== $("input[name=logInParol]").val()){
          $("input[name=logInParol]").addClass('shake');
          $("input[name=logInParol]").val('');
          setTimeout(function(){
            $("input[name=logInParol]").removeClass('shake');
          },500)
      }
      if (pass.user!==$('input[name=logInEmail]').val()){
        $("input[name=logInEmail]").addClass('shake');
        $("input[name=logInEmail]").val('');
          setTimeout(function(){
            $("input[name=logInEmail]").removeClass('shake');
          },500)
      }
    }) 
  }
  });

  $(window).on('keypress' ,async function(event){
    if(event.which == 13){
    let some=await fetch(`http://localhost:4000/api/get-parol`).then(res=>res.json());  
    if (some.password !== "There is no any parol"){
      some.password.map(pass => {
        if (pass.password === $("input[name=logInParol]").val() &&
            pass.user===$('input[name=logInEmail]').val()) {
          $('.parol-container').remove();
          window.location.href = "http://localhost:4000/adminMain";
        } 
        if(pass.password !== $("input[name=logInParol]").val()){
            $("input[name=logInParol]").addClass('shake');
            $("input[name=logInParol]").val('');
            setTimeout(function(){
              $("input[name=logInParol]").removeClass('shake');
            },500)
        }
        if (pass.user!==$('input[name=logInEmail]').val()){
          $("input[name=logInEmail]").addClass('shake');
          $("input[name=logInEmail]").val('');
            setTimeout(function(){
              $("input[name=logInEmail]").removeClass('shake');
            },500)
        }
      }) 
    }
  }
})

// CHANGE PASSWORD
$('.change-password p').click(async function(){
  // let some=await fetch(`http://localhost:4000/api/get-parol`).then(res=>res.json());  
  $('.parol-box').css('display', 'flex');
  // $('.parol-box').css('display', 'none');
  // else if($('.parol-box').css('display', 'none'))
  // $('.parol-box').css('display', 'flex');
})

$('.parol-box').mouseleave(()=>{
  $('.parol-box').css('display', 'none');
})

$('.change-pass-btn').click(async function (){
  formData.pass=$('.current-password').val();
  formData.password=$('.new-password').val();
  formData.reNewPass=$('.reNew-password').val();
  let some=await fetch(`http://localhost:4000/api/get-parol`).then(res=>res.json());  
  some.password.map(async pass=>{
    if(pass!=='There is no any parol'){
    if(pass.password===formData.pass &&
    formData.password===formData.reNewPass){
      await fetch(`http://localhost:4000/api/change-parol/${pass._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
      })
      .then(res => res.json());
      alert('Şifrə dəyişdirildi.');
      formData={};
    }
    else if(formData.password!==formData.reNewPass){
      alert('Yeni şifrə təkrarı ilə üst-üstə düşmür.');
    }
    else if(pass.password!==formData.pass){
      alert('Hal hazırki şifrə düzgün daxil edilməyib.');
    }
  }
  })
})
})
