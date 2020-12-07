$(document).ready(async function(){

// ---------------------------MENU---------------------------
let dataMenu = await fetch("http://localhost:4000/api/get-menu").then(res => res.json());

if (dataMenu.menu !== "Hech bir malumat tapilmadi") {
    dataMenu.menu.map(menuData => {
        $('.nav-menu').append(`<li><a href="${menuData.url}">${menuData.name}</a></li>`);
    })
}

// ---------------------------PROJECTS---------------------------
let dataProject = await fetch("http://localhost:4000/api/get-project").then(res => res.json());

if (dataProject.projects !== "Hech bir malumat tapilmadi") {
    dataProject.projects.map(projectsData => {
        if(projectsData.status!==0){
        $('.projects-container').append(`
            <div class="project">
                <img class="project-img" src="img/${projectsData.img}">
                <h1 class="project-name">${projectsData.head}</h1>
                <p class="project-date"><span>Tarix:</span> ${projectsData.time}</p>
                <p class="project-place"><span>Məkan:</span> ${projectsData.place}</p>
                <p class="project-support"><span>Dəstəkçi:</span> ${projectsData.support}</p>
                <p class="project-extra-text">${projectsData.hideContex}</p>
                <button type="submit" class="more-project">ƏTRAFLI</button>
            </div>
        `);
    }
    })
}

// ---------------------------ABOUT---------------------------
let dataAbout = await fetch("http://localhost:4000/api/get-about").then(res => res.json());

if (dataAbout.about !== "Hech bir malumat tapilmadi") {
    dataAbout.about.map(aboutData => {
        if(aboutData.direction==="left" && aboutData.status!==0){
            $('.about-container').append(`
                <div class="about about-left">
                    <div class="about-contex about-contex-right">
                        <h3 class="about-head">${aboutData.name}<br>${aboutData.job}</h3>
                        <p class="about-text">${aboutData.contex}</p>
                    </div>
                    <img class="about-img" src="img/${aboutData.img}" alt="">
                </div>
            `);
        }
        else if(aboutData.direction==="right" && aboutData.status!==0){
            $('.about-container').append(`
            <div class="about about-right">
            <img class="about-img" src="img/${aboutData.img}" alt="">
            <div class="about-contex about-contex-left">
                <h3 class="about-head">${aboutData.name}<br>${aboutData.job}</h3>
                <p class="about-text">${aboutData.contex}</p>
            </div>
        </div>
            `);
        }
    })
}

// ---------------------------EVENT---------------------------
let dataEvent = await fetch("http://localhost:4000/api/get-event").then(res => res.json());

if (dataEvent.event !== "Hech bir malumat tapilmadi") {
    dataEvent.event.map(eventData => {
        if(eventData.status!==0){
        $('.event-container').append(`
        <div class="event-card">
            <div class="event-front"><img class="event-front-img" src="img/${eventData.img}" alt=""></div>
            <div class="event-back">
                <div class="event-card-contex">
                    <h4 class="event-name">${eventData.head}</h4>
                    <p class="event-text">${eventData.time}</p>
                    <p class="event-extra-text">${eventData.contex}</p>
                    <a class="more-event" href="${eventData.url}">ƏTRAFLI<i class="fas fa-long-arrow-alt-right"></i></a>
                </div>
            </div>
        </div>
        `);
    }
    })
}

// ---------------------------NEWS---------------------------
let dataNews = await fetch("http://localhost:4000/api/get-news").then(res => res.json());

if (dataNews.news !== "Hech bir malumat tapilmadi") {
    const neww= dataNews.news.slice(dataNews.news.length-4, dataNews.news.length);
    neww.map(newsData => {
        if(newsData.status!==0){
            $('.news-container').prepend(`
        <article class="news-item" data-id="${newsData._id}">
        <div class="front-text"> 
        <img src="img/${newsData.img}" alt="" class="news-front-img">           
        </div>
        <div class="back-text">
            <h1 class="back-text-heading">${newsData.date}</h1>
            <p class="back-text-contex">${newsData.contex}</p>
            <a href="/news" class="news-button">ƏTRAFLI</a>
        </div>
        </article>
        `);
        }
    });
    dataNews.news.map(newsData => {
        if(newsData.direction==="right" && newsData.status!==0){        
        $(".news-page-container").prepend(`
        <div class="news-more">
            <div class="news-more-img"><img src="img/${newsData.img}" alt=""></div>
            <div class="news-more-container">
                <h1 class="news-more-container-head">${newsData.head}</h1>
                <p class="news-more-container-text">${newsData.hideContex}</p>
                <small class="news-more-container-date">${newsData.date}</small>
            </div>
        </div>
        `);
    }
    else if(newsData.direction==="left" && newsData.status!==0){
        $(".news-page-container").prepend(`
        <div class="news-more">
            <div class="news-more-container">
                <h1 class="news-more-container-head">${newsData.head}</h1>
                <p class="news-more-container-text">${newsData.hideContex}</p>
                <small class="news-more-container-date">${newsData.date}</small>
            </div>
            <div class="news-more-img"><img src="img/${newsData.img}" alt=""></div>
        </div>
        `);
    }
    })
    // $('.news-item:nth-last-child(1)').remove();
}

// -----------------------VOLUNTEER---------------------------
class BeVolunteer {
    constructor(){
        this.name=$('.volunteer-name').val();
        this.surname=$('.volunteer-surname').val();
        this.number=$('.volunteer-number').val();
        this.email=$('.volunteer-email').val();
        this.status=1;

        this.nameV=$('.volunteer-name');
        this.surnameV=$('.volunteer-surname');
        this.numberV=$('.volunteer-number');
        this.emailV=$('.volunteer-email');
    }
    checkVolunteer(){
        if(this.nameV[0].checkValidity()===true &&
        this.surnameV[0].checkValidity()===true &&
        this.numberV[0].checkValidity()===true &&
        this.emailV[0].checkValidity()===true ){
            return true;
        }
    }
}

$(document).on('click','.just-be', async function(){
let volClass= new BeVolunteer();
let b=true;
let dataVolunteer = await fetch("http://localhost:4000/api/get-volunteer").then(res => res.json());
if (dataVolunteer.volunteer !== "Hech bir malumat tapilmadi") {
    dataVolunteer.volunteer.map(volunteerData => {
        if(volunteerData.email===volClass.email){
            b=false;
        }
    })
}

if(volClass.checkVolunteer() && b===true){
await fetch("http://localhost:4000/api/add-volunteer", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(volClass)
})
.then(res => res.json());
alert("Qeydiyyat uğurla tamamlandı!");
}
else if(b===false){
    alert("Siz artıq qeydiyyatdan keçmisiz!");
}
})

// -----------------------SIGN-IN---------------------------
class SignIn {
    constructor(){
        this.name=$('.sign-in-name').val();
        this.gender=$("input[name='human']:checked").val();
        this.region=$('.sign-in-region').val();
        this.date=$('.sign-in-birth').val();
        this.number=$('.sign-in-number').val();
        this.email=$('.sign-in-email').val();
        this.password=$('.sign-in-password').val();
        this.where=$('.where-learn').val();
        this.status=1;

        this.nameV=$('.sign-in-name');
        this.regionV=$('.sign-in-region');
        this.numberV=$('.sign-in-number');
        this.emailV=$('.sign-in-email');
        this.passwordV=$('.sign-in-password');
    }
    checking(){
        if(this.nameV[0].checkValidity()===true &&
        this.regionV[0].checkValidity()===true &&
        this.numberV[0].checkValidity()===true &&
        this.emailV[0].checkValidity()===true &&
        this.passwordV[0].checkValidity()===true){
            return true;
        }
    }
}
$(document).on('click','.sign-in', async function(){    
    let signClass= new SignIn();

    let dataSign = await fetch("http://localhost:4000/api/get-sign").then(res => res.json());
    let b=true;
    if (dataSign.sign !== "Hech bir malumat tapilmadi") {
        dataSign.sign.map(signData => {
        if(signData.email===signClass.email){
            b=false;
        }
    })
}

if(signClass.checking() && b===true){
    await fetch("http://localhost:4000/api/add-sign", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(signClass)
    })
    .then(res => res.json());
    sessionStorage .setItem('email', signClass.email); 
    sessionStorage .setItem('parol', signClass.password); 
    sessionStorage .setItem('user', signClass.name); 
    $('.sign-in-contex').attr('action', "/game").submit();
}
else if(b===false){
    alert("Siz artıq qeydiyyatdan keçmisiz");
}  
})

class LogIn{
    constructor(){
        this.email=$('.log-in-email').val();
        this.password=$('.log-in-password').val();

        this.emailV=$('.log-in-email');
        this.passwordV=$('.log-in-password');

        this.logInAtrr=$('.log-in-contex');
    }
}
$(document).on('click','.log-in',async function(){
    let logClass=new LogIn();
    let dataSign = await fetch("http://localhost:4000/api/get-sign").then(res => res.json());
    if (dataSign.sign !== "Hech bir malumat tapilmadi") {
        dataSign.sign.map(signData => {    
            if(signData.email===logClass.email
            && signData.password===logClass.password
            && logClass.passwordV[0].checkValidity()===true
            && logClass.emailV[0].checkValidity()===true
            && signData.status!==0){
                sessionStorage.setItem('email', logClass.email); 
                sessionStorage.setItem('parol', logClass.password); 
                sessionStorage.setItem('user', signData.name);  
                $('.log-in-contex').attr('action', "/game").submit();
                return;
            }
            else if(signData.email===logClass.email
                && signData.password===logClass.password
                && logClass.passwordV[0].checkValidity()===true
                && logClass.emailV[0].checkValidity()===true
                && signData.status===0){
                alert('Hesabınız Silinib!');
                return;
            }
            else if((signData.email===logClass.email
                && signData.password!==logClass.password
                && logClass.passwordV[0].checkValidity()===true
                && logClass.emailV[0].checkValidity()===true
                && signData.status!==0) ||
                (signData.email!==logClass.email
                && signData.password===logClass.password
                && logClass.passwordV[0].checkValidity()===true
                && logClass.emailV[0].checkValidity()===true
                && signData.status!==0)){
                alert('Şifrə və ya Email ünvanı yalnışdır!');
                return;
            }
        })        
    }
})

// ---------------------------SEND MAIL---------------------------
let sendMail={};
$('.send-mail-btn').click(async function(){
    
    $('.message-box').show();
    $('.message-box').addClass('opa-message-box');

    sendMail.subject=$('#your-name').val();
    sendMail.from=$('#email').val();
    sendMail.text=$('.contact-textarea').val();

    let mail = await fetch("http://localhost:4000/mail/post-mail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sendMail)
    })
    .then(res => res.json());   
    $('.message-box p').remove();
    $('.message-box').append('<p>Mail Göndərildi!</p>');
    setTimeout(function(){
        $('.message-box').removeClass('opa-message-box');
    }, 1500);
    
    sendMail={};
})

// VOLUNTEER FORM
$('body').append(`
<fieldset class="volunteer-container" >
<legend>Hekayəmizin bir parçası ol!</legend>
<form>
    <i class="fas fa-times-circle volunteer-close"></i>
    <label for="" >Ad</label>
    <input type="text" class="volunteer-name" minlength="3" required>
    <label for="" >Soyad</label>
    <input type="text" class="volunteer-surname" minlength="6" required>
    <label for="" >Əlaqə nömrəsi</label>
    <input type="tel" class="volunteer-number" pattern="[0-9]{10}" title="Nömrə düzgün daxil edilməyib." placeholder="0501112233" required>
    <label for="" >E-mail ünvanı</label>
    <input type="email" class="volunteer-email" title="Email düzgün daxil edilməyib." required>
    <button type="submit" class="just-be">Könüllü Ol</button>
    </form>
</fieldset>
`);

// PLAY GAME FORM
$(document).on('click','.go-sign-in',function(){
    $('.log-in-contex').remove();
    $('.sign-in-container').append(`
    <form class="sign-in-contex" >
        <i class="fas fa-times-circle sign-in-close"></i>
        <label for="" >Ad və Soyad</label>
        <input type="text" class="sign-in-name" minlength="6" required>

        <div class='gender'>
        <label for="man">Kişi</label>
        <input type="radio" id="man" name="human" value="man" checked>
        <label for="woman">Qadın</label>
        <input type="radio" id="woman" name="human" value="woman">
        </div>

        <label for="" >Yaşadığınız bölgə</label>
        <input type="text" class="sign-in-region" required>
        <label for="" >Doğum tarixi</label>
        <input
            type="text" 
            class="sign-in-birth"
            placeholder="01.08.2011"
            onfocus="(this.type='date')"
            max="${new Date().getFullYear()-6}-12-31"
            required
        >
        <label for="" >Əlaqə nömrəsi</label>
        <input type="tel" pattern="[0-9]{10}" placeholder="0501112233" class="sign-in-number" required>
        <label for="" >E-mail ünvanı</label>
        <input type="email" class="sign-in-email" required>
        <label for="" >Şifrə</label>
        <input type="password" class="sign-in-password" minlength="8" required>
        <input type="checkbox" class='show-psw'>
        <label for="" >Bizim haqqımızda kimdən və ya hardan məlumat almısız?</label>
        <select class="where-learn">
        <option value="Sosial şəbəkə">Sosial şəbəkə</option>
        <option value="Tanış">Tanış</option>
        <option value="Reklam paneli">Reklam paneli</option>
        <option value="Digər">Digər</option>
        </select>
        <p class="go-log-in">Hesabına daxil ol</p>
        <button type="submit" class="sign-in" >Təsdiqlə</button>
        </form>
    `);
})
$(document).on('click', '.show-psw', function(){
  if ($('.sign-in-password').is(':password')) {
    $('.sign-in-password').prop('type', 'text');
  } else {
    $('.sign-in-password').prop('type', 'password');
  }
})

$(document).on('click','.go-log-in',function(){
    $('.sign-in-contex').remove();
    $('.sign-in-container').append(`
    <form class="log-in-contex" >
    <i class="fas fa-times-circle sign-in-close"></i>
    <label for="" >E-mail ünvanı</label>
    <input type="email" class="log-in-email" 
    ${sessionStorage .getItem('email')!==null ? `value=${sessionStorage .getItem('email')}` : `value=''`} required>
    <label for="" >Şifrə</label>
    <input type="password" class="log-in-password" 
    ${sessionStorage .getItem('parol')!==null ? `value=${sessionStorage .getItem('parol')}` : `value=''`} required>
    <p class="go-sign-in">Qeydiyyatdan keç</p>
    <button type="submit" class="log-in">Təstiqlə</button>
    </form> 
    `);
})

// when page scroll add class to navbar
$(document).scroll(function(){
    if($(document).scrollTop()!==0){
        $('.main-nav').addClass('scroll');
    }
    if($(document).scrollTop()===0){
        $('.main-nav').removeClass('scroll');
    }
})

// smooth scroll to menu elements
function scroll (link){
    $('.nav-menu a').removeClass('nav-menu-hover');
    link.preventDefault();
    let target=$(this).attr('href');
    $('html, body').stop().animate({
        scrollTop:$(target).offset().top
    },1200)
}

$(document).on('click','.nav-menu a', scroll);
$(document).on('click','.banner-btn', scroll);
$(document).on('click','.more-event', scroll);

// show the more information on PROJECT section
$('.more-project').click(function(){
    $(this).siblings('.project-extra-text').toggle(300);
})

// burger menu
$('.fa-bars').click(function(){
    $('.nav-menu').toggle();
})


// NEWS read more
$(document).on("click",".news-button",async function(){
    $('.news-more-info').addClass('news-more-info-show');
    let id=$(this).parent().parent().attr("data-id");

    dataNewsId = await fetch(`http://localhost:4000/api/get-news/${id}`).then(res => res.json());
    
})

// close NEWS read more
$(document).on("click",".news-more-info-close", async function(){
    $('.news-more-info').removeClass('news-more-info-show');
    $('.news-more-info').addClass('news-more-info-hide');
})

// volunteer btn
$(".volunteer").click(function(){
    $('body').css('background-color', "black");
    $('.volunteer-container').show(200);
    $('.volunteer-container').addClass("volunteer-container-opa");
    $(".container").css('opacity', '0.2');
})

$(document).on('click','.volunteer-close', function(){
    $('body').css('background-color', "white");
    $('.volunteer-container').hide(100);
    $('.volunteer-container').removeClass("volunteer-container-opa");
    $(".container").css('opacity', '1');
})

// PLAY GAME
$('.play').click(function(){
    $('.sign-in-contex').remove();
    $('.log-in-contex').remove();
    $('.sign-in-container').append(`
    <form class="log-in-contex" >
    <i class="fas fa-times-circle sign-in-close"></i>
    <label for="" >E-mail ünvanı</label>
    <input type="email" class="log-in-email" 
    ${sessionStorage .getItem('email')!==null ? `value=${sessionStorage .getItem('email')}` : `value=''`} required>
    <label for="" >Şifrə</label>
    <input type="password" class="log-in-password" 
    ${sessionStorage .getItem('parol')!==null ? `value=${sessionStorage .getItem('parol')}` : `value=''`} required>
    <p class="go-sign-in">Qeydiyyatdan keç</p>
    <button type="submit" class="log-in">Təsdiqlə</button>
    </form>
`);
    $('body').css('background-color', "black");
    $('.sign-in-container').show(200);
    $('.sign-in-container').addClass("sign-in-container-opa");
    $(".container").css('opacity', '0.2');
})

$(document).on('click','.sign-in-close', function(){
    $('body').css('background-color', "white");
    $('.sign-in-container').hide(100);
    $('.sign-in-container').removeClass("sign-in-container-opa");
    $(".container").css('opacity', '1');
})

$('.game-name').click(function(){
    $('.level-of-questions').hide();
    $(this).siblings('.level-of-questions').show();
})
$('.game-name').dblclick(function(){
    $('.level-of-questions').slideUp();
})


let count=1;
let checkNo=2;
let boo=0;
let passingTime=5;
let seconds = passingTime;
let setime;
let setin;
let sign;
let foo=true;
let daTa={};
function incrementSeconds() {
    if(seconds>=0){
        $('.timer').text(seconds);
        seconds -= 1;
    }
    else {return 0;}
}
function game(gameData){
    $('.questions-container').append(`
    <div class="question-contex" data-id='${gameData._id}'>
    <h3 class='level-name'>${gameData.level}</h3>
    <p class="question"><span>${count++}.</span>${gameData.question}</p>
    <textarea class="answer" placeholder='Cavab:'></textarea>
    <button type='button' class='confirm-answer'>Təsdiqlə</button>
    <small class='go-another-question ${gameData.clas}'>Növbəti Sual</small>
    <small class='timer'></small>
    </div>
    `)
}
function nameOfGame(name){
    $('.questions-container').append(`
    <p class='name-of-game'>${$(name).parent().siblings().text()}</p>`);
}
function questionsResult(data, no){
    $('.result-list').append(`
    <tr>
    <td class='result-no'>${--no}</td>
    <td class='result-question'>${data.question}</td>
    <td class='result-answer'>${data.answer}</td>
    <td class='result-result'>${data.sign}</td>
    </tr>
    `)
}
$(document).on('click', '.confirm-answer', async function(){    
    if($('.name-of-game').text()===$('.game-name.xamsa').text()){
        let dataXamsa = await fetch("http://localhost:4000/api/get-xamsa").then(res => res.json());
        if (dataXamsa.xamsa !== "Hech bir malumat tapilmadi") {
            dataXamsa.xamsa.map(xamsaData => {
                if(xamsaData.answer===$(this).siblings('.answer').val()
                && xamsaData._id===$(this).parent().data('id')){
                    daTa.sign='+';
                }
                else if(xamsaData.answer!==$(this).siblings('.answer').val()
                && xamsaData._id===$(this).parent().data('id')) daTa.sign='_';
            })
        }    
    }
    else if($('.name-of-game').text()===$('.game-name.brain').text()){
        let dataBrainRing = await fetch("http://localhost:4000/api/get-brainRing").then(res => res.json());
        if (dataBrainRing.brainRing !== "Hech bir malumat tapilmadi") {
            dataBrainRing.brainRing.map(brainRingData => {    
                if(brainRingData.answer===$(this).siblings('.answer').val()
                && brainRingData._id===$(this).parent().data('id')){
                    daTa.sign='+';
                }
                else if(brainRingData.answer!==$(this).siblings('.answer').val()
                && brainRingData._id===$(this).parent().data('id')) daTa.sign='_';
            })
        }    
    }
    else if($('.name-of-game').text()===$('.game-name.what').text()){
        let dataWhat = await fetch("http://localhost:4000/api/get-what").then(res => res.json());
        if (dataWhat.what !== "Hech bir malumat tapilmadi") {
            dataWhat.what.map(whatData => {   
                if(whatData.answer===$(this).siblings('.answer').val()
                && whatData._id===$(this).parent().data('id')){
                    daTa.sign='+';
                }
                else if(whatData.answer!==$(this).siblings('.answer').val()
                && whatData._id===$(this).parent().data('id')) daTa.sign='_';
            })
        }    
    }

    else if($('.name-of-game').text()===$('.game-name.clever').text()){
        let dataClever = await fetch("http://localhost:4000/api/get-clever").then(res => res.json());
        if (dataClever.clever !== "Hech bir malumat tapilmadi") {
            dataClever.clever.map(cleverData => {   
                if(cleverData.answer===$(this).siblings('.answer').val()
                && cleverData._id===$(this).parent().data('id')){
                    daTa.sign='+';
                }
                else if(cleverData.answer!==$(this).siblings('.answer').val()
                && cleverData._id===$(this).parent().data('id')) daTa.sign='_';
            })
        }    
    }

    daTa.question=$(this).siblings('.question').text();
    daTa.answer=$(this).siblings('.answer').val();
    $(this).css('background-color','green');
    $(this).css('color','white');
    questionsResult(daTa, count);
})
// XAMSA QUESTIONS
$('.xamsa-easy').click(async function(){   
    $('.result-list').hide();
    $('.result-list td').parent().remove();
    foo=true; 
    clearTimeout(setime);
    seconds=passingTime;
    clearInterval(setin);
    count=1;
    checkNo=2;
    $(this).parent().slideUp();
    let dataXamsa = await fetch("http://localhost:4000/api/get-xamsa").then(res => res.json());
    if (dataXamsa.xamsa !== "Hech bir malumat tapilmadi") {
        $('.question-contex').remove();
        dataXamsa.xamsa.map(xamsaData => {
            if(xamsaData.status!==0 && xamsaData.level==='məktəbli' && count===1){
                $('.name-of-game').remove();
                nameOfGame(this);
                game(xamsaData); 
                setin=setInterval(incrementSeconds, 1000); 
                setime=setTimeout(function(){
                    clearInterval(setin);
                    seconds=passingTime;
                    $(`.${xamsaData.clas}`).trigger("click");
                },(passingTime+1)*1000)
                return;  
            }
        })
    }
})
$('.xamsa-middle').click(async function(){
    $('.result-list').hide();
    $('.result-list td').parent().remove();
    foo=true;
    clearTimeout(setime);
    seconds=passingTime;
    clearInterval(setin);
    count=1;
    checkNo=2;
    $(this).parent().slideUp();
    let dataXamsa = await fetch("http://localhost:4000/api/get-xamsa").then(res => res.json());
    if (dataXamsa.xamsa !== "Hech bir malumat tapilmadi") {
        $('.question-contex').remove();
        dataXamsa.xamsa.map(xamsaData => {
            if(xamsaData.status!==0 && xamsaData.level==='tələbə' && count===1){
                $('.name-of-game').remove();
                nameOfGame(this);
                game(xamsaData);     
                setin=setInterval(incrementSeconds, 1000); 
                setime=setTimeout(function(){
                    clearInterval(setin);
                    seconds=passingTime;
                    $(`.${xamsaData.clas}`).trigger("click");
                },(passingTime+1)*1000)   
                return;
            }
        })
    }
})
$('.xamsa-difficult').click(async function(){
    $('.result-list').hide();
    $('.result-list td').parent().remove();
    foo=true;
    clearTimeout(setime);
    seconds=passingTime;
    clearInterval(setin);
    count=1;
    checkNo=2;
    $(this).parent().slideUp();
    let dataXamsa = await fetch("http://localhost:4000/api/get-xamsa").then(res => res.json());
    if (dataXamsa.xamsa !== "Hech bir malumat tapilmadi") {
        $('.question-contex').remove();
        dataXamsa.xamsa.map(xamsaData => {
            if(xamsaData.status!==0 && xamsaData.level==='digər' && count===1){
                $('.name-of-game').remove();
                nameOfGame(this);
                game(xamsaData);     
                setin=setInterval(incrementSeconds, 1000);
                setime=setTimeout(function(){
                    seconds=passingTime;
                    $(`.${xamsaData.clas}`).trigger("click");
                },(passingTime+1)*1000)   
                return;
            }
        })
    }
})
$(document).on('click','.go-another-xamsa-question',async function(){
    foo=true;
    clearTimeout(setime);
    seconds=passingTime;
    clearInterval(setin);
    let dataXamsa = await fetch("http://localhost:4000/api/get-xamsa").then(res => res.json()); 
    boo=0;    
    if (dataXamsa.xamsa !== "Hech bir malumat tapilmadi") {
        $('.question-contex').remove();
        dataXamsa.xamsa.map(xamsaData => {  
        if(xamsaData.status!==0 && xamsaData.level==='məktəbli' && count===checkNo 
        && xamsaData._id>$(this).parent().data('id') 
        && $(this).parent().children('.level-name').text()==='məktəbli'){
            game(xamsaData);      
            setin=setInterval(incrementSeconds, 1000);
            setime=setTimeout(function(){
                clearInterval(setin);
                seconds=passingTime;
                $(`.${xamsaData.clas}`).trigger("click");
            },(passingTime+1)*1000)    
            return;
        }
        else if(xamsaData.status!==0 && xamsaData.level==='tələbə' && count===checkNo 
        && xamsaData._id>$(this).parent().data('id')
        && $(this).parent().children('.level-name').text()==='tələbə'){
            game(xamsaData); 
            setin=setInterval(incrementSeconds, 1000);
            setime=setTimeout(function(){
                clearInterval(setin);
                seconds=passingTime;
                $(`.${xamsaData.clas}`).trigger("click");
            },(passingTime+1)*1000)          
            return;
        }
        else if(xamsaData.status!==0 && xamsaData.level==='digər' && count===checkNo 
        && xamsaData._id>$(this).parent().data('id')
        && $(this).parent().children('.level-name').text()==='digər'){
            game(xamsaData); 
            setin=setInterval(incrementSeconds, 1000);
            setime=setTimeout(function(){
                clearInterval(setin);
                seconds=passingTime;
                $(`.${xamsaData.clas}`).trigger("click");
            },(passingTime+1)*1000)          
            return;
        }
        else{boo++;}
    })
    checkNo++;
    }    
    if(boo===dataXamsa.xamsa.length){
        $('.result-list').show();
        $('.name-of-game').remove();
        count=1;
        checkNo=2;
        boo=0;
    }
});
// BRAIN-RING QUESTIONS
$('.brain-easy').click(async function(){  
    $('.result-list').hide();
    $('.result-list td').parent().remove();
    clearTimeout(setime);
    seconds=passingTime;
    clearInterval(setin);
    count=1;
    checkNo=2;
    $(this).parent().slideUp();
    let dataBrainRing = await fetch("http://localhost:4000/api/get-brainRing").then(res => res.json());
    if (dataBrainRing.brainRing !== "Hech bir malumat tapilmadi") {
        $('.question-contex').remove();
        dataBrainRing.brainRing.map(brainRingData => {
            if(brainRingData.status!==0 && brainRingData.level==='məktəbli' && count===1){
                $('.name-of-game').remove();
                nameOfGame(this);
                game(brainRingData);   
                setin=setInterval(incrementSeconds, 1000); 
                setime=setTimeout(function(){
                    clearInterval(setin);
                    seconds=passingTime;
                    $(`.${brainRingData.clas}`).trigger("click");
                },(passingTime+1)*1000)  
                return;  
            }
        })
    }
})
$('.brain-middle').click(async function(){
    $('.result-list').hide();
    $('.result-list td').parent().remove();
    clearTimeout(setime);
    seconds=passingTime;
    clearInterval(setin);
    count=1;
    checkNo=2;
    $(this).parent().slideUp();
    let dataBrainRing = await fetch("http://localhost:4000/api/get-brainRing").then(res => res.json());
    if (dataBrainRing.brainRing !== "Hech bir malumat tapilmadi") {
        $('.question-contex').remove();
        dataBrainRing.brainRing.map(brainRingData => {
            if(brainRingData.status!==0 && brainRingData.level==='tələbə' && count===1){
                $('.name-of-game').remove();
                nameOfGame(this);
                game(brainRingData);
                setin=setInterval(incrementSeconds, 1000); 
                setime=setTimeout(function(){
                    clearInterval(setin);
                    seconds=passingTime;
                    $(`.${brainRingData.clas}`).trigger("click");
                },(passingTime+1)*1000)      
                return;  
            }
        })
    }
})
$('.brain-difficult').click(async function(){
    $('.result-list').hide();
    $('.result-list td').parent().remove();
    clearTimeout(setime);
    seconds=passingTime;
    clearInterval(setin);
    count=1;
    checkNo=2;
    $(this).parent().slideUp();
    let dataBrainRing = await fetch("http://localhost:4000/api/get-brainRing").then(res => res.json());
    if (dataBrainRing.brainRing !== "Hech bir malumat tapilmadi") {
        $('.question-contex').remove();
        dataBrainRing.brainRing.map(brainRingData => {
            if(brainRingData.status!==0 && brainRingData.level==='digər' && count===1){
                $('.name-of-game').remove();
                nameOfGame(this);
                game(brainRingData);   
                setin=setInterval(incrementSeconds, 1000); 
                setime=setTimeout(function(){
                    clearInterval(setin);
                    seconds=passingTime;
                    $(`.${brainRingData.clas}`).trigger("click");
                },(passingTime+1)*1000)  
                return;  
            }
        })
    }
})
$(document).on('click','.go-another-brain-question',async function(){  
    clearTimeout(setime);
    seconds=passingTime;
    clearInterval(setin);  
    let dataBrainRing = await fetch("http://localhost:4000/api/get-brainRing").then(res => res.json()); 
    boo=0;    
    if (dataBrainRing.brainRing !== "Hech bir malumat tapilmadi") {
        $('.question-contex').remove();
        dataBrainRing.brainRing.map(brainRingData => {  
        if(brainRingData.status!==0 && brainRingData.level==='məktəbli' && count===checkNo 
        && brainRingData._id>$(this).parent().data('id') 
        && $(this).parent().children('.level-name').text()==='məktəbli'){
            game(brainRingData);   
            setin=setInterval(incrementSeconds, 1000); 
                setime=setTimeout(function(){
                    clearInterval(setin);
                    seconds=passingTime;
                    $(`.${brainRingData.clas}`).trigger("click");
                },(passingTime+1)*1000)   
            return;
        }
        else if(brainRingData.status!==0 && brainRingData.level==='tələbə' && count===checkNo 
        && brainRingData._id>$(this).parent().data('id')
        && $(this).parent().children('.level-name').text()==='tələbə'){
            game(brainRingData);   
            setin=setInterval(incrementSeconds, 1000); 
                setime=setTimeout(function(){
                    clearInterval(setin);
                    seconds=passingTime;
                    $(`.${brainRingData.clas}`).trigger("click");
                },(passingTime+1)*1000)  
            return;
        }
        else if(brainRingData.status!==0 && brainRingData.level==='digər' && count===checkNo 
        && brainRingData._id>$(this).parent().data('id')
        && $(this).parent().children('.level-name').text()==='digər'){
            game(brainRingData);        
            setin=setInterval(incrementSeconds, 1000); 
                setime=setTimeout(function(){
                    clearInterval(setin);
                    seconds=passingTime;
                    $(`.${brainRingData.clas}`).trigger("click");
                },(passingTime+1)*1000)
            return;
        }
        else{boo++;}
    })
    checkNo++;
    }    
    if(boo===dataBrainRing.brainRing.length){
        $('.result-list').show();
        $('.name-of-game').remove();
        count=1;
        checkNo=2;
        boo=0;
    }
})
// WHAT
$('.what-easy').click(async function(){    
    $('.result-list').hide();
    $('.result-list td').parent().remove();
    clearTimeout(setime);
    seconds=passingTime;
    clearInterval(setin);
    count=1;
    checkNo=2;
    $(this).parent().slideUp();
    let dataWhat = await fetch("http://localhost:4000/api/get-what").then(res => res.json());
    if (dataWhat.what !== "Hech bir malumat tapilmadi") {
        $('.question-contex').remove();
        dataWhat.what.map(whatData => {
            if(whatData.status!==0 && whatData.level==='məktəbli' && count===1){
                $('.name-of-game').remove();
                nameOfGame(this);
                game(whatData);      
                setin=setInterval(incrementSeconds, 1000); 
                setime=setTimeout(function(){
                    clearInterval(setin);
                    seconds=passingTime;
                    $(`.${whatData.clas}`).trigger("click");
                },(passingTime+1)*1000)
                return;  
            }
        })
    }
})
$('.what-middle').click(async function(){
    $('.result-list').hide();
    $('.result-list td').parent().remove();
    clearTimeout(setime);
    seconds=passingTime;
    clearInterval(setin);
    count=1;
    checkNo=2;
    $(this).parent().slideUp();
    let dataWhat = await fetch("http://localhost:4000/api/get-what").then(res => res.json());
    if (dataWhat.what !== "Hech bir malumat tapilmadi") {
        $('.question-contex').remove();
        dataWhat.what.map(whatData => {
            if(whatData.status!==0 && whatData.level==='tələbə' && count===1){
                $('.name-of-game').remove();
                nameOfGame(this);
                game(whatData);       
                setin=setInterval(incrementSeconds, 1000); 
                setime=setTimeout(function(){
                    clearInterval(setin);
                    seconds=passingTime;
                    $(`.${whatData.clas}`).trigger("click");
                },(passingTime+1)*1000)
                return;  
            }
        })
    }
})
$('.what-difficult').click(async function(){
    $('.result-list').hide();
    $('.result-list td').parent().remove();
    clearTimeout(setime);
    seconds=passingTime;
    clearInterval(setin);
    count=1;
    checkNo=2;
    $(this).parent().slideUp();
    let dataWhat = await fetch("http://localhost:4000/api/get-what").then(res => res.json());
    if (dataWhat.what !== "Hech bir malumat tapilmadi") {
        $('.question-contex').remove();
        dataWhat.what.map(whatData => {
            if(whatData.status!==0 && whatData.level==='digər' && count===1){
                $('.name-of-game').remove();
                nameOfGame(this);
                game(whatData);   
                setin=setInterval(incrementSeconds, 1000); 
                setime=setTimeout(function(){
                    clearInterval(setin);
                    seconds=passingTime;
                    $(`.${whatData.clas}`).trigger("click");
                },(passingTime+1)*1000)
                return;  
            }
        })
    }
})
$(document).on('click','.go-another-what-question',async function(){    
    clearTimeout(setime);
    seconds=passingTime;
    clearInterval(setin);
    let dataWhat = await fetch("http://localhost:4000/api/get-what").then(res => res.json()); 
    boo=0;    
    if (dataWhat.what !== "Hech bir malumat tapilmadi") {
        $('.question-contex').remove();
        dataWhat.what.map(whatData => {  
        if(whatData.status!==0 && whatData.level==='məktəbli' && count===checkNo 
        && whatData._id>$(this).parent().data('id') 
        && $(this).parent().children('.level-name').text()==='məktəbli'){
            game(whatData);     
            setin=setInterval(incrementSeconds, 1000); 
                setime=setTimeout(function(){
                    clearInterval(setin);
                    seconds=passingTime;
                    $(`.${whatData.clas}`).trigger("click");
                },(passingTime+1)*1000)
            return;
        }
        else if(whatData.status!==0 && whatData.level==='tələbə' && count===checkNo 
        && whatData._id>$(this).parent().data('id')
        && $(this).parent().children('.level-name').text()==='tələbə'){
            game(whatData);  
            setin=setInterval(incrementSeconds, 1000); 
                setime=setTimeout(function(){
                    clearInterval(setin);
                    seconds=passingTime;
                    $(`.${whatData.clas}`).trigger("click");
                },(passingTime+1)*1000)  
            return;
        }
        else if(whatData.status!==0 && whatData.level==='digər' && count===checkNo 
        && whatData._id>$(this).parent().data('id')
        && $(this).parent().children('.level-name').text()==='digər'){
            game(whatData);  
            setin=setInterval(incrementSeconds, 1000); 
                setime=setTimeout(function(){
                    clearInterval(setin);
                    seconds=passingTime;
                    $(`.${whatData.clas}`).trigger("click");
                },(passingTime+1)*1000)      
            return;
        }
        else{boo++;}
    })
    checkNo++;
    }    
    if(boo===dataWhat.what.length){
        $('.result-list').show();
        $('.name-of-game').remove();
        count=1;
        checkNo=2;
        boo=0;
    }
})

// CLEVER
$('.clever-easy').click(async function(){    
    $('.result-list').hide();
    $('.result-list td').parent().remove();
    clearTimeout(setime);
    seconds=passingTime;
    clearInterval(setin);
    count=1;
    checkNo=2;
    $(this).parent().slideUp();
    let dataClever = await fetch("http://localhost:4000/api/get-clever").then(res => res.json());
    if (dataClever.clever !== "Hech bir malumat tapilmadi") {
        $('.question-contex').remove();
        dataClever.clever.map(cleverData => {
            if(cleverData.status!==0 && cleverData.level==='məktəbli' && count===1){
                $('.name-of-game').remove();
                nameOfGame(this);
                game(cleverData);      
                setin=setInterval(incrementSeconds, 1000); 
                setime=setTimeout(function(){
                    clearInterval(setin);
                    seconds=passingTime;
                    $(`.${cleverData.clas}`).trigger("click");
                },(passingTime+1)*1000)
                return;  
            }
        })
    }
})
$('.clever-middle').click(async function(){
    $('.result-list').hide();
    $('.result-list td').parent().remove();
    clearTimeout(setime);
    seconds=passingTime;
    clearInterval(setin);
    count=1;
    checkNo=2;
    $(this).parent().slideUp();
    let dataClever = await fetch("http://localhost:4000/api/get-clever").then(res => res.json());
    if (dataClever.clever !== "Hech bir malumat tapilmadi") {
        $('.question-contex').remove();
        dataClever.clever.map(cleverData => {
            if(cleverData.status!==0 && cleverData.level==='tələbə' && count===1){
                $('.name-of-game').remove();
                nameOfGame(this);
                game(cleverData);       
                setin=setInterval(incrementSeconds, 1000); 
                setime=setTimeout(function(){
                    clearInterval(setin);
                    seconds=passingTime;
                    $(`.${cleverData.clas}`).trigger("click");
                },(passingTime+1)*1000)
                return;  
            }
        })
    }
})
$('.clever-difficult').click(async function(){
    $('.result-list').hide();
    $('.result-list td').parent().remove();
    clearTimeout(setime);
    seconds=passingTime;
    clearInterval(setin);
    count=1;
    checkNo=2;
    $(this).parent().slideUp();
    let dataClever = await fetch("http://localhost:4000/api/get-clever").then(res => res.json());
    if (dataClever.clever !== "Hech bir malumat tapilmadi") {
        $('.question-contex').remove();
        dataClever.clever.map(cleverData => {
            if(cleverData.status!==0 && cleverData.level==='digər' && count===1){
                $('.name-of-game').remove();
                nameOfGame(this);
                game(cleverData);   
                setin=setInterval(incrementSeconds, 1000); 
                setime=setTimeout(function(){
                    clearInterval(setin);
                    seconds=passingTime;
                    $(`.${cleverData.clas}`).trigger("click");
                },(passingTime+1)*1000)
                return;  
            }
        })
    }
})
$(document).on('click','.go-another-clever-question',async function(){    
    clearTimeout(setime);
    seconds=passingTime;
    clearInterval(setin);
    let dataClever = await fetch("http://localhost:4000/api/get-clever").then(res => res.json());
    boo=0;    
    if (dataClever.clever !== "Hech bir malumat tapilmadi") {
        $('.question-contex').remove();
        dataClever.clever.map(cleverData => { 
        if(cleverData.status!==0 && cleverData.level==='məktəbli' && count===checkNo 
        && cleverData._id>$(this).parent().data('id') 
        && $(this).parent().children('.level-name').text()==='məktəbli'){
            game(cleverData);     
            setin=setInterval(incrementSeconds, 1000); 
                setime=setTimeout(function(){
                    clearInterval(setin);
                    seconds=passingTime;
                    $(`.${cleverData.clas}`).trigger("click");
                },(passingTime+1)*1000)
            return;
        }
        else if(cleverData.status!==0 && cleverData.level==='tələbə' && count===checkNo 
        && cleverData._id>$(this).parent().data('id')
        && $(this).parent().children('.level-name').text()==='tələbə'){
            game(cleverData);  
            setin=setInterval(incrementSeconds, 1000); 
                setime=setTimeout(function(){
                    clearInterval(setin);
                    seconds=passingTime;
                    $(`.${cleverData.clas}`).trigger("click");
                },(passingTime+1)*1000)  
            return;
        }
        else if(cleverData.status!==0 && cleverData.level==='digər' && count===checkNo 
        && cleverData._id>$(this).parent().data('id')
        && $(this).parent().children('.level-name').text()==='digər'){
            game(cleverData);  
            setin=setInterval(incrementSeconds, 1000); 
                setime=setTimeout(function(){
                    clearInterval(setin);
                    seconds=passingTime;
                    $(`.${cleverData.clas}`).trigger("click");
                },(passingTime+1)*1000)      
            return;
        }
        else{boo++;}
    })
    checkNo++;
    }    
    if(boo===dataClever.clever.length){
        $('.result-list').show();
        $('.name-of-game').remove();
        count=1;
        checkNo=2;
        boo=0;
    }
})
})