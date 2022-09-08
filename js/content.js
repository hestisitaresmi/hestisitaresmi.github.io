const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

function loadData() {
    $.getJSON("data.json", function(data) {
        //header
        header(data.header, data.social_medias);

        //about
        about(data.about);

        //profile
        profile(data.profile);

        //resume
        resume(data.resume);

        //portofolio
        portofolio(data.portofolio);

        //header
        footer(data.footer, data.social_medias);


    });
}

function header(obj, social_medias) {
    document.getElementById('header-title').innerHTML = obj.title;
    document.getElementById('header-description').innerHTML = obj.description;

    //skill
    var skills = "";

    obj.skills.forEach(x => {
        skills += "<span>" + x + "</span>"
    });

    document.getElementById('header-skills').innerHTML = skills;

    //social media
    var sms = "";

    social_medias.forEach(x => {
        sms += "<li><a href='" + x.link + "'><i class='" + x.icon + "'></i></a></li>";
    });

    document.getElementById('header-social-media').innerHTML = sms;
}

function about(obj) {
    document.getElementById('about-photo').src = obj.photo;
    document.getElementById('about-content').innerHTML = obj.content;
}

function profile(obj) {
    document.getElementById('profile-content').innerHTML = obj.content;
    document.getElementById('profile-name').innerHTML = obj.fullname;
    document.getElementById('profile-birthdate').innerHTML = obj.birthdate;
    document.getElementById('profile-birthdate').innerHTML = obj.birthdate;
    document.getElementById('profile-current-job').innerHTML = obj.current_job;
    document.getElementById('profile-website').innerHTML = "<a href='" + obj.website.link + "'>" + obj.website.alias + "</a>";
    document.getElementById('profile-email').innerHTML = "<a href='" + obj.email.link + "'>" + obj.email.alias + "</a>";
    document.getElementById('profile-cv').innerHTML = "<a href='" + obj.cv + "' title='Download CV' class='button button-primary'>Unduh CV</a>";
}

function resume(obj) {
    document.getElementById('resume-title').innerHTML = obj.title;
    document.getElementById('resume-description').innerHTML = obj.description;

    work_experience(obj.work_experience);
    education_history(obj.educations);
}

function work_experience(obj) {
    var experiences = "";

    obj.forEach(x => {
        var start_date_raw = new Date(x.start_date);
        var end_date_raw = (x.end_date == null) ? "Sekarang" : new Date(x.end_date);

        var start_date = monthNames[start_date_raw.getMonth()] + " " + start_date_raw.getFullYear();
        var end_date = (x.end_date == null) ? "Sekarang" : monthNames[end_date_raw.getMonth()] + " " + end_date_raw.getFullYear();

        experiences += "<div class='timeline-block'>" +
            "<div class='timeline-ico'>" +
            "<i class='fa fa-graduation-cap'></i>" +
            "</div>" +
            "<div class='timeline-header'>" +
            "<h3>" + x.division + "</h3>" +
            "<p>" + start_date + " - " + end_date + "</p>" +
            "</div>" +
            "<div class='timeline-content'>" +
            "<h4>" + x.company_name + "</h4>" +
            "<p>" + x.job_description + "</p>" +
            "</div>" +
            "</div>";
    });

    document.getElementById('resume-work-experiences').innerHTML = experiences;
}

function education_history(obj) {
    var educations = "";

    obj.forEach(x => {
        var start_date_raw = new Date(x.start_date);
        var end_date_raw = (x.end_date == null) ? "Sekarang" : new Date(x.end_date);

        var start_date = monthNames[start_date_raw.getMonth()] + " " + start_date_raw.getFullYear();
        var end_date = (x.end_date == null) ? "Sekarang" : monthNames[end_date_raw.getMonth()] + " " + end_date_raw.getFullYear();

        educations += "<div class='timeline-block'>" +
            "<div class='timeline-ico'>" +
            "<i class='fa fa-briefcase'></i>" +
            "</div>" +
            "<div class='timeline-header'>" +
            "<h3>" + x.study_program + "</h3>" +
            "<p>" + start_date + " - " + end_date + "</p>" +
            "</div>" +
            "<div class='timeline-content'>" +
            "<h4>" + x.university + "</h4>" +
            "<p>" + x.education_description + "</p>" +
            "</div>" +
            "</div>";
    });

    document.getElementById('resume-education-history').innerHTML = educations;
}

function portofolio(obj) {
    document.getElementById('portofolio-header').innerHTML = obj.header;
    document.getElementById('portofolio-content').innerHTML = obj.content;

    var datas = "";

    //box
    var increment = 1;

    obj.data.forEach(x => {
        datas += "<div class='bgrid folio-item'>" +
            "<div class='item-wrap'>" +
            "<img src='" + x.image + "'>" +
            "<a href='#modal-" + increment + "' class='overlay'>" +
            "<div class='folio-item-table'>" +
            "<div class='folio-item-cell'>" +
            "<h3 class='folio-title'>" + x.title + "</h3>" +
            "<span class='folio-types'>" +
            x.tag +
            "</span>" +
            "</div>" +
            "</div>" +
            "</a>" +
            "</div>" +
            "</div>";

        increment++;
    });

    //modals
    var incrementModals = 1;

    obj.data.forEach(x => {
        datas += "<div id='modal-" + incrementModals + "' class='popup-modal slider mfp-hide'>" +
            "<div class='media'>" +
            "<img src='" + x.modals_image + "'" +
            "</div>" +
            "<div class='description-box'>" +
            "<h4>" + x.title + "</h4>" +
            "<p>" + x.description + "</p>" +
            "<div class='categories'>" + x.tag + "</div>" +
            "</div>" +
            "<div class='link-box'>" +
            "<a href='" + x.preview_url + "'>Details</a>" +
            "<a href='#' class='popup-modal-dismiss'>Close</a>" +
            "</div>" +
            "</div>";

        incrementModals++;
    });

    document.getElementById('folio-wrapper').innerHTML = datas;

    //modal popup
    $('.item-wrap a').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        removalDelay: 200,
        showCloseBtn: false,
        mainClass: 'mfp-fade'
    });

    $(document).on('click', '.popup-modal-dismiss', function(e) {
        e.preventDefault();
        $.magnificPopup.close();
    });
}

function footer(obj, social_medias) {
    document.getElementById('footer-title').innerHTML = obj.title;
    document.getElementById('footer-description').innerHTML = obj.description;
    document.getElementById('footer-address').innerHTML = obj.address;
    document.getElementById('footer-email').innerHTML = "<a style='color:white;' href='" + obj.email.link + "'>" + obj.email.alias + "</a>";
    document.getElementById('footer-telephone').innerHTML = "<a style='color:white;' href='" + obj.phone.link + "' target='_blank'>" + obj.phone.alias + "</a>";

    //social media
    var sms = "";

    social_medias.forEach(x => {
        sms += "<li><a href='" + x.link + "'><i class='" + x.icon + "'></i></a></li>";
    });

    document.getElementById('footer-social-media').innerHTML = sms;
}