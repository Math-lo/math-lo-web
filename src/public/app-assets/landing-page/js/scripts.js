! function(e) {
    "use strict";
    var t, r, o, a, n, i, s, l, f, c, d, g = {},
        p = { form_name: "required", form_email: { required: !0, email: !0 }, form_subject: "required", form_message: "required", form_comment: "required", form_bmi_weight: { required: !0, number: !0, minlength: 1, maxlength: 5 }, form_bmi_height: { required: !0, number: !0, minlength: 1, maxlength: 5 }, form_select: "required", form_phone: { required: !0, digits: !0, minlength: 10, maxlength: 10 }, form_choose_car: "required", form_pickup_location: "required", form_dropoff_location: "required", form_pickup_date: { required: !0, date: !0 }, form_dropoff_date: { required: !0, date: !0 } },
        m = { form_name: "Your name is required.", form_email: { required: "Your email address is required.", email: "Please enter a valid email address." }, form_subject: "Your subject is required.", form_message: "Don't you want to say something?.", form_comment: "Don't you want to say something?.", form_bmi_weight: { required: "This field is required.", min: "Please enter a valid number.", minlength: "Please enter a valid number.", maxlength: "Please enter a valid number." }, form_bmi_height: { required: "This field is required.", min: "Please enter a valid number.", minlength: "Please enter a valid number.", maxlength: "Please enter a valid number." }, form_select: { required: "This field is required." }, form_phone: { required: "Please provide a phone number.", digits: "Please enter digits only", minlength: "Phone number must be 10 digits.", maxlength: "Phone number must be 10 digits." }, form_choose_car: { required: "Please select a car." }, form_pickup_location: { required: "Please select pickup location." }, form_dropoff_location: { required: "Please select dropoff location." }, form_pickup_date: { required: "Please select pickup date." }, form_dropoff_date: { required: "Please select dropoff date." } };
    r = { Android: function() { return navigator.userAgent.match(/Android/i) }, BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i) }, iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i) }, Opera: function() { return navigator.userAgent.match(/Opera\ Mini/i) }, Windows: function() { return navigator.userAgent.match(/IEMobile/i) }, any: function() { return r.Android() || r.BlackBerry() || r.iOS() || r.Opera() || r.Windows() } }, (o = document.createElement("div")).className = "scrollbar-div", document.body.appendChild(o), a = o.offsetWidth - o.clientWidth, document.body.removeChild(o), g.bootstrapfn = {
        init: function() {
            if (e().tooltip && e("body").tooltip({ container: "body", trigger: "hover", selector: '[data-toggle="tooltip"]' }), e().scrollspy) {
                var t = 0;
                e(".gfort-section-header").hasClass("gfort-section-header-fixed") && (t = parseInt(e(".gfort-section-header-fixed").height() + 2, 10)), e("body").scrollspy({ target: ".gfort-navbar", offset: t })
            }
        }
    }, g.pageFadeEffectfn = { init: function() { e().animsition && e("#gfort-main-container").animsition({ inClass: "gfort-fade-in", outClass: "gfort-fade-out", inDuration: 1500, outDuration: 800, loading: !1, linkElement: 'a:not([target="_blank"]):not([href^="#"])' }) } }, g.pagePreLoaderfn = {
        init: function() {
            var t = parseInt(e("#gfort-page-preloader").attr("data-gfort-preloader-layout"), 10);
            t = t || 1, e("body").addClass("page-preloader-layout-" + t)
        }
    }, g.headerSectionfn = {
        init: function() { e(".gfort-navbar-nav").find("ul").parent("li").addClass("menu-item-has-children"), e("body").on("click", ".gfort-navbar-toggler", function() { e(this).toggleClass("toggle") }), e(".gfort-navbar-nav .menu-item-has-children").on({ click: function() { e(this).addClass("gfort-collapse-menu-open-close") }, mouseleave: function() { e(this).removeClass("gfort-collapse-menu-open-close") } }), e("body").on("click", ".gfort-btn-collapse-menu > a", function(t) { var r = e(this); if (r.hasClass("menu-opened") ? ("#" === r.attr("href") && t.preventDefault(), r.removeClass("menu-opened"), r.next("ul").slideUp(), r.next("ul").find("ul").slideUp()) : (r.parent("li").hasClass("megamenu-without-title") && r.next("ul").find("ul").slideDown(), r.next("ul").slideDown(), r.addClass("menu-opened"), e(".gfort-navbar-nav .menu-item-has-children").each(function() { e(this).hasClass("gfort-collapse-menu-open-close") || (e("> a", this).removeClass("menu-opened"), e("> ul", this).slideUp()) })), r.hasClass("menu-opened")) return !1 }) },
        mobileMenu: function() { i = e(".gfort-navbar > .container").attr("class"), e(".gfort-navbar-collapse-desktop-menu").clone().attr({ class: i }).appendTo(e(".gfort-navbar-collapse-mobile-menu")) },
        collapseMenu: function() { e(".gfort-navbar-collapse-mobile-menu .gfort-navbar-nav .menu-item-has-children").each(function() { e(this).addClass("gfort-btn-collapse-menu") }) },
        subMenu: function() {
            clearTimeout(s), e(".gfort-navbar-collapse-desktop-menu .gfort-navbar-nav > .menu-item-has-children:not(.megamenu)").each(function() {
                var t, r, o = e(this),
                    n = e(window).width() + a;
                if (o.removeClass("submenu-correct-position"), o.children("ul").length) {
                    for (r = t = o.children("ul"); r.length;) t = r, r = r.children("li").children("ul");
                    t.offset().left < 0 && o.addClass("submenu-correct-position"), n < parseInt(t.width() + t.offset().left, 10) ? o.addClass("submenu-correct-position") : o.removeClass("submenu-correct-position")
                }
            })
        },
        megaMenu: function() {
            clearTimeout(l), e(".gfort-navbar-collapse-desktop-menu .gfort-navbar-nav > .megamenu-col-2").each(function() {
                var t = e(this),
                    r = e("> ul", t),
                    o = e(window).width() + a;
                t.removeClass("megamenu-correct-position"), r.length && (r.offset().left < 0 && t.addClass("megamenu-correct-position"), o < parseInt(r.width() + r.offset().left, 10) ? t.addClass("megamenu-correct-position") : t.removeClass("megamenu-correct-position"))
            })
        },
        searchForm: function() { e(".gfort-nav-link-search-btn-open").on("click", function() { return e(".gfort-section-header-menu").addClass("gfort-form-block-header-search-open"), f = setTimeout(function() { e(".gfort-form-block-header-search-desktop input").focus() }, 100), !1 }), e(".gfort-nav-link-search-btn-close").on("click", function() { return g.headerSectionfn.closeSearchFform(), !1 }), e(".gfort-form-block-header-search-desktop input").on("focusout", function() { g.headerSectionfn.closeSearchFform() }) },
        closeSearchFform: function() { clearTimeout(f), e(".gfort-form-block-header-search-open").removeClass("gfort-form-block-header-search-open") },
        fixedHeader: function(t) {
            if (!r.any()) {
                var o = e(".gfort-section-header-fixed .gfort-section-header-menu-container"),
                    a = o.height(),
                    n = e(".gfort-section-header-menu"),
                    i = n.offset().top;
                parseInt(t, 10) > parseInt(i, 10) ? (o.addClass("gfort-section-header-menu-stuck"), n.css({ height: a })) : (o.removeClass("gfort-section-header-menu-stuck"), n.css({ height: "auto" }))
            }
        },
        middleSection: function() { e(".gfort-section-header-middle .container").addClass(e(".gfort-section-header-menu .gfort-navbar .container").attr("class").replace("container", "")).addClass(e(".gfort-section-header-menu .gfort-navbar").attr("class").replace("gfort-navbar", "")) },
        perfectScrollbar: function() {
            try { e("#gfort-section-header-off-canvas-menu-container").perfectScrollbar(), e("body").on("click", "#gfort-section-header-off-canvas-menu-container .menu-item-has-children > a", function() { c = setTimeout(function() { e("#gfort-section-header-off-canvas-menu-container").perfectScrollbar("update") }, 400) }), e("#gfort-section-header-off-canvas-menu-container").on("mouseleave", function() { clearTimeout(c) }) } catch (e) { if (e.toString().indexOf("PerfectScrollbar")) return !1 }
            e(".gfort-navbar-toggler").on("click", function() { e("body").toggleClass("gfort-navbar-toggler-off-canvas-menu-open"), e(".gfort-section-header-fixed").length && (n = e(window).scrollTop(), e(".gfort-section-header-fixed").css({ transform: "translateY(" + n + "px)" })) }), e(".gfort-section-header-off-canvas-menu-overlay").on("click", function() { e("body").removeClass("gfort-navbar-toggler-off-canvas-menu-open"), e(".gfort-navbar-toggler").removeClass("toggle") }), e(".gfort-section-header-off-canvas-menu").on("scroll touchmove mousewheel", function(e) { return e.preventDefault(), e.stopPropagation(), !1 })
        },
        transparent: function() {
            var t = 0;
            e("[data-gfort-section-padding]").length && (t = parseInt(e("[data-gfort-section-padding]").attr("data-gfort-section-padding"), 10)), e(window).width() + a >= 1200 ? (e(".gfort-section-breadcrumb").css({ paddingTop: e(".gfort-section-header").outerHeight(!0) }), e("[data-gfort-section-padding]").css({ paddingTop: t + e(".gfort-section-header").outerHeight(!0) })) : (e(".gfort-section-breadcrumb").css({ paddingTop: 0 }), e("[data-gfort-section-padding]").css({ paddingTop: t }))
        }
    }, g.fitVidsfn = { init: function() { e().fitVids && e("body").fitVids({ customSelector: 'iframe[src*="soundcloud.com"], iframe[src*="videopress.com"], iframe[src*="player.twitch.tv"], iframe[src*="maps.google.com"], iframe[src*="google.com/maps"], iframe[src*="dailymotion.com"]' }) } }, g.mediaElementPlayerfn = { init: function() { e().mediaelementplayer && e("video, audio").each(function() { e(this).mediaelementplayer({ stretching: "responsive" }) }) } }, g.mailchimpfn = {
        init: function() {
            e(".gfort-form-block-mailchimp").each(function() { e("form", this).attr("action", "https://GraphicFort.us11.list-manage.com/subscribe/post?u=dffe9a5d2b472dbe0cc471e1b&amp;id=4150cd2f12".replace("/post?", "/post-json?").concat("&c=?")) }), e("body").on("submit", ".gfort-form-block-mailchimp form", function() {
                var t = e(this),
                    r = t.find("button"),
                    o = t.attr("action"),
                    a = t.serialize();
                return t.find(".gfort-form-message").remove(), e.ajax({ type: "POST", url: o, data: a, dataType: "jsonp", cache: !0, beforeSend: function() { r.addClass("show-spinner").attr("disabled", "") }, success: function(o) { "error" === o.result ? (t.append('<div class="gfort-form-message col-lg-12"><div class="alert gfort-alert gfort-alert-danger">' + o.msg + "</div></div>"), t.find('input[type="email"]').addClass("error")) : (t.append('<div class="gfort-form-message col-lg-12"><div class="alert gfort-alert gfort-alert-success">' + o.msg + "</div></div>"), t.find("input").each(function() { e(this).val("") }), t.find('input[type="email"]').removeClass("error")), r.removeClass("show-spinner").removeAttr("disabled") } }), !1
            })
        }
    }, g.instagramfn = {
        init: function() {
            e().gfortInsta && e(".gfort-instagram-feed-block").each(function() {
                var t = e(this),
                    r = parseInt(t.attr("data-gfort-instagram-images-count"), 10),
                    o = t.attr("data-gfort-instagram-images-size"),
                    a = t.attr("data-gfort-instagram-link-class"),
                    n = t.attr("data-gfort-instagram-show-text"),
                    i = t.attr("data-gfort-instagram-text"),
                    s = parseInt(t.attr("data-gfort-instagram-columns-gutter"), 10),
                    l = t.attr("data-gfort-instagram-xl-column-class"),
                    f = t.attr("data-gfort-instagram-lg-column-class"),
                    c = t.attr("data-gfort-instagram-md-column-class"),
                    d = t.attr("data-gfort-instagram-sm-column-class"),
                    g = t.attr("data-gfort-instagram-xs-column-class"),
                    p = t.attr("data-gfort-instagram-slider");
                0 !== (s = s || 0) && 2 !== s && 6 !== s && 12 !== s && 18 !== s && 36 !== s && (s = 0), r = r || 1, "yes" === p ? (p = !0, requirejs(["owl"])) : p = !1, t.gfortInsta({ count: r, imagesSize: o, userID: "2546719702", accessToken: "2546719702.d9ac2e9.d35b2fa3fd0b41048d0717d100e21964", linkClass: a, showText: n, text: i, gridGutter: "gfort-grid-gutter-" + s, colXL: l, colLG: f, colMD: c, colSM: d, colXS: g, slider: p })
            })
        }
    }, g.twitterfn = {
        init: function() {
            e().tweetie && e(".gfort-twitter-feed-block").each(function() {
                var t = e(this),
                    r = parseInt(t.attr("data-gfort-twitter-tweets-count"), 10),
                    o = t.attr("data-gfort-twitter-screen-name"),
                    a = t.attr("data-gfort-twitter-slider"),
                    n = t.attr("data-gfort-twitter-xl-column-class"),
                    i = t.attr("data-gfort-twitter-lg-column-class"),
                    s = t.attr("data-gfort-twitter-md-column-class"),
                    l = t.attr("data-gfort-twitter-sm-column-class"),
                    f = t.attr("data-gfort-twitter-xs-column-class"),
                    c = "",
                    d = "";
                "yes" === a && (c = "gfort-owl-slider-item"), "yes" !== a && t.hasClass("gfort-twitter-feed-layout-3") && (d += '<div class="' + n + " " + i + " " + s + " " + l + " " + f + '">'), d += '<div class="gfort-block gfort-twitter-feed-item ' + c + '">', d += '<div class="gfort-block-container gfort-twitter-feed-item-container">', "yes" === a && t.hasClass("gfort-twitter-feed-layout-1") || t.hasClass("gfort-twitter-feed-layout-2") || (d += '<div class="gfort-block-head gfort-twitter-feed-item-head">', d += '<div class="gfort-twitter-feed-user-avatar"><a href="https://twitter.com/{{tweet.user.screen_name}}/" target="_blank" rel="noopener"><img src="{{tweet.user.profile_image_url_https}}" alt="{{tweet.user.screen_name}}" /></a></div>', d += '<div class="gfort-twitter-feed-user-info"><h6 class="gfort-twitter-feed-user-name"><a href="https://twitter.com/{{tweet.user.screen_name}}/" target="_blank" rel="noopener">{{tweet.user.name}}</a><a title="{{tweet.user.name}}" class="twitter-bird" href="https://twitter.com/{{tweet.user.screen_name}}/" target="_blank" rel="noopener"><i class="fab fa-twitter"></i></a></h6><h6 class="gfort-twitter-feed-screen-name font-size-13"><a href="https://twitter.com/{{tweet.user.screen_name}}/" target="_blank" rel="noopener">&commat;{{tweet.user.screen_name}}</a></h6></div>', d += "</div>"), "yes" === a && t.hasClass("gfort-twitter-feed-layout-1") && (d += '<div class="gfort-block-head gfort-twitter-feed-item-head">', d += '<div class="gfort-twitter-feed-user-info"><h6 class="gfort-twitter-feed-user-name"><a title="{{tweet.user.name}}" class="twitter-bird" href="https://twitter.com/{{tweet.user.screen_name}}/" target="_blank" rel="noopener"><i class="fab fa-twitter"></i></a></h6></div>', d += "</div>"), d += '<div class="gfort-block-body gfort-twitter-feed-item-body">', d += '<div class="gfort-block-content"><p>', t.hasClass("gfort-twitter-feed-layout-2") && (d += '<a title="{{tweet.user.name}}" class="twitter-bird" href="https://twitter.com/{{tweet.user.screen_name}}/" target="_blank" rel="noopener"><i class="fab fa-twitter"></i></a> '), d += "{{tweet.text}}</p></div>", d += '<div class="gfort-block-footer gfort-twitter-feed-item-footer font-size-13 secondary-font-family">', d += '<div class="gfort-twitter-feed-item-date"><a href="https://twitter.com/{{tweet.user.screen_name}}/status/{{tweet.id_str}}" target="_blank" rel="noopener">{{tweet.created_at}}</a></div>', "yes" === a && t.hasClass("gfort-twitter-feed-layout-1") || (d += '<div class="gfort-twitter-feed-item-action-buttons">', d += '<a class="gfort-twitter-feed-item-action-buttons-reply" href="https://twitter.com/intent/tweet?in_reply_to={{tweet.id_str}}" target="_blank" rel="noopener" title="Reply" data-toggle="tooltip" data-original-title="Reply"><i class="far fa-comment-alt"></i></a>', d += '<a class="gfort-twitter-feed-item-action-buttons-retweet" href="https://twitter.com/intent/retweet?tweet_id={{tweet.id_str}}" target="_blank" rel="noopener" title="Retweet" data-toggle="tooltip" data-original-title="Retweet"><i class="fas fa-retweet"></i></a>', d += '<a class="gfort-twitter-feed-item-action-buttons-favorite" href="https://twitter.com/intent/favorite?tweet_id={{tweet.id_str}}" target="_blank" rel="noopener" title="Like" data-toggle="tooltip" data-original-title="Like"><i class="far fa-heart"></i></a>', d += "</div>"), d += "</div>", d += "</div>", d += "</div>", d += "</div>", "yes" !== a && t.hasClass("gfort-twitter-feed-layout-3") && (d += "</div>"), r = r || 1, t.tweetie({ url: "assets/js/plugins/tweetie/api/server.php", type: "timeline", dateFormat: "%b %d, %Y", params: { count: r, screen_name: o }, template: d }, function() { "yes" === a && (t.addClass("gfort-owl-slider owl-carousel"), requirejs(["owl"], function() { g.owlSliderfn.init() })), "yes" !== a && t.hasClass("gfort-twitter-feed-layout-3") && t.wrapInner('<div class="row"></div>') })
            })
        }
    }, g.fancyboxfn = {
        init: function() {
            e("[data-gfort-lightbox]").each(function() {
                var t = e(this);
                t.attr("href").indexOf("soundcloud.com") > -1 && e.ajax({ type: "GET", url: "https://soundcloud.com/oembed?url=" + t.attr("href") + "&format=json", cache: !0 }).done(function(e) { t.attr("href", e.html.split('src="')[1].split('">')[0] + "&auto_play=true") })
            }), e().fancybox && e("body").on("click", "[data-gfort-lightbox]", function() {
                var t, r, o = e(this),
                    n = {},
                    i = o.attr("href"),
                    s = [],
                    l = o.attr("data-gfort-lightbox-type");
                return '<span class="screen-reader-text">Left</span><i class="fas fa-chevron-left"></i>', '<span class="screen-reader-text">Right</span><i class="fas fa-chevron-right"></i>', l || (l = ""), "" === o.attr("data-gfort-lightbox") ? (t = 0, n = { src: i, opts: { caption: o.attr("data-gfort-lightbox-caption"), thumb: o.attr("data-gfort-lightbox-thumb") } }, s.push(n)) : (t = o.index('[data-gfort-lightbox="' + o.attr("data-gfort-lightbox") + '"]'), e('[data-gfort-lightbox="' + o.attr("data-gfort-lightbox") + '"]').each(function() { r = e(this), i = r.attr("href"), n = { src: i, opts: { caption: r.attr("data-gfort-lightbox-caption"), thumb: r.attr("data-gfort-lightbox-thumb") } }, s.push(n) })), e.fancybox.open(s, { loop: !1, arrows: !0, infobar: !0, margin: [48, 0], buttons: ["slideShow", "fullScreen", "thumbs", "close"], thumbs: { autoStart: !1, hideOnClose: !0 }, slideShow: { autoStart: !1, speed: 4e3 }, iframe: { preload: !1 }, smallBtn: !1, autoFocus: !1, backFocus: !1, transitionEffect: "slide", animationEffect: "zoom-in-out", baseClass: "gfort-lightbox-wrapper", btnTpl: { arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><span class="screen-reader-text">Left</span><i class="fas fa-chevron-left"></i></button>', arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><span class="screen-reader-text">Right</span><i class="fas fa-chevron-right"></i></button>' }, onInit: function() { e("#gfort-btn-back-to-top").addClass("gfort-no-transition"), e(".gfort-section-header-menu-stuck").addClass("gfort-no-transition"), e("#gfort-btn-back-to-top").css({ marginRight: a }), e(".gfort-section-header-menu-stuck").css({ paddingRight: a }), e(".gfort-page-boxed .gfort-section-header-menu-stuck").css({ paddingRight: 0, right: a }) }, afterShow: function() { requirejs(["mediaElementPlayer"], function() { e(".fancybox-slide video").length && e(".fancybox-slide video").each(function() { e(this).mediaelementplayer({ stretching: "responsive" }) }) }) }, afterClose: function() { e("#gfort-btn-back-to-top").css({ marginRight: 0 }), e(".gfort-section-header-menu-stuck").css({ paddingRight: 0 }), e(".gfort-page-boxed .gfort-section-header-menu-stuck").css({ paddingRight: 0, right: 0 }) } }, t), s = [], n = {}, !1
            })
        }
    }, g.shareButtonfn = {
        init: function() {
            var t = e(location).attr("href"),
                r = e(document).attr("title");
            e(".gfort-share-facebook a").attr("href", "https://www.facebook.com/sharer.php?u=" + t), e(".gfort-share-twitter a").attr("href", "https://twitter.com/intent/tweet?text=" + r + "&amp;url=" + t), e(".gfort-share-linkedin a").attr("href", "https://www.linkedin.com/shareArticle?mini=true&amp;url=" + t + "&amp;title=" + r), e(".gfort-share-tumblr a").attr("href", "https://www.tumblr.com/share/link?url=" + t + "&amp;name=" + r), e(".gfort-share-reddit a").attr("href", "https://reddit.com/submit?url=" + t + "&amp;title=" + r), e(".gfort-share-vk a").attr("href", "https://vk.com/share.php?url=" + t), e(".gfort-share-pocket a").attr("href", "https://getpocket.com/save?title=" + r + "&amp;url=" + t), e(".gfort-share-stumbleupon a").attr("href", "https://www.stumbleupon.com/submit?url=" + t + "&amp;title=" + r), e("body").on("click", ".gfort-btn-share a", function() { window.open(e(this).attr("href"), "popupWindow", "width=600, height=600, scrollbars=yes") })
        }
    }, g.owlSliderfn = {
        init: function() {
            e().owlCarousel && e(".gfort-owl-slider").each(function() {
                var t, r, o, a, n = e(this),
                    i = parseInt(n.attr("data-gfort-owl-slider-items-margin"), 10),
                    s = n.attr("data-gfort-owl-slider-loop"),
                    l = n.attr("data-gfort-owl-slider-center"),
                    f = n.attr("data-gfort-owl-slider-arrows"),
                    c = n.attr("data-gfort-owl-slider-dots"),
                    d = n.attr("data-gfort-owl-slider-autoplay"),
                    g = n.attr("data-gfort-owl-slider-auto-height"),
                    p = !1,
                    m = n.attr("data-gfort-page-direction"),
                    u = parseInt(n.attr("data-gfort-owl-slider-items-xl"), 10),
                    h = parseInt(n.attr("data-gfort-owl-slider-items-lg"), 10),
                    y = parseInt(n.attr("data-gfort-owl-slider-items-md"), 10),
                    b = parseInt(n.attr("data-gfort-owl-slider-items-sm"), 10),
                    v = parseInt(n.attr("data-gfort-owl-slider-items-xs"), 10),
                    w = n.attr("data-gfort-owl-slider-animateIn"),
                    T = n.attr("data-gfort-owl-slider-animateOut"),
                    k = n.attr("data-gfort-owl-slider-mouseDrag"),
                    x = n.attr("data-gfort-owl-slider-touchDrag"),
                    C = n.attr("data-gfort-owl-slider-thumbnail");
                i = i || 0, s = "yes" === s, l = "yes" === l, f = "yes" === f, "rtl" === m ? (p = !0, t = '<span class="screen-reader-text">Right</span><i class="fas fa-chevron-right"></i>', r = '<span class="screen-reader-text">Left</span><i class="fas fa-chevron-left"></i>') : (t = '<span class="screen-reader-text">Left</span><i class="fas fa-chevron-left"></i>', r = '<span class="screen-reader-text">Right</span><i class="fas fa-chevron-right"></i>'), c = "yes" === c, d = "yes" === d, o = !n.parent().hasClass("gfort-section-slider-media"), g = "no" !== g, u = u || 1, h = h || 1, y = y || 1, b = b || 1, v = v || 1, w = w || "", T = T || "", k = "no" !== k, x = "no" !== x, "yes" === C && (n.next(".gfort-owl-slider-thumbnail").find(".gfort-owl-slider-item").each(function(t) { e(this).attr("data-gfort-owl-slider-jump-to", t) }), n.next(".gfort-owl-slider-thumbnail").find("[data-gfort-owl-slider-jump-to=0]").addClass("gfort-owl-slider-active-item")), n.on("initialized.owl.carousel", function() {
                    if (!1 === g) {
                        var t = 0;
                        n.find(".owl-item").each(function() { t = e(this).height() > t ? e(this).height() : t }), n.find(".owl-item").css({ minHeight: t + "px" }), n.find(".owl-item").css({ height: t + "px" })
                    }
                }), n.owlCarousel({
                    navSpeed: 600,
                    dotsSpeed: 600,
                    lazyLoad: !0,
                    responsiveClass: !0,
                    loop: s,
                    autoplaySpeed: 600,
                    autoplay: d,
                    autoplayHoverPause: o,
                    margin: i,
                    autoHeight: g,
                    mouseDrag: k,
                    touchDrag: x,
                    rtl: p,
                    dots: c,
                    nav: f,
                    center: l,
                    navText: [t, r],
                    animateIn: w,
                    animateOut: T,
                    responsive: { 0: { items: parseInt(v, 10) }, 576: { items: parseInt(b, 10) }, 768: { items: parseInt(y, 10) }, 992: { items: parseInt(h, 10) }, 1200: { items: parseInt(u, 10) } },
                    onTranslate: function(e) { "yes" === C && (n.next(".gfort-owl-slider-thumbnail").find(".gfort-owl-slider-active-item").removeClass("gfort-owl-slider-active-item"), -1 === (a = e.item.index - n.find(".owl-item.cloned").length / 2) ? a = n.find(".owl-item").length - n.find(".owl-item.cloned").length - 1 : a === e.item.count && (a = 0), n.next(".gfort-owl-slider-thumbnail").trigger("to.owl.carousel", [a, 300, !0]), n.next(".gfort-owl-slider-thumbnail").find('[data-gfort-owl-slider-jump-to="' + a + '"]').addClass("gfort-owl-slider-active-item")) },
                    onResized: function() {
                        if (!1 === g) {
                            var t = 0;
                            n.find(".owl-item").css({ minHeight: "0" }), n.find(".owl-item").css({ height: "auto" }), n.find(".owl-item").each(function() { t = e(this).height() > t ? e(this).height() : t }), n.find(".owl-item").css({ minHeight: t + "px" }), n.find(".owl-item").css({ height: t + "px" })
                        }
                    }
                }), n.on({ mouseenter: function() { n.attr("data-gfort-owl-slider-mouse-enter", "true") }, mouseleave: function() { n.attr("data-gfort-owl-slider-mouse-enter", "false") } }), e(document).keyup(function(e) { 37 === e.keyCode ? "true" === n.attr("data-gfort-owl-slider-mouse-enter") && n.trigger("prev.owl.carousel") : 39 === e.keyCode && "true" === n.attr("data-gfort-owl-slider-mouse-enter") && n.trigger("next.owl.carousel") }), e("body").on("click", "[data-gfort-owl-slider-jump-to]", function(t) { t.preventDefault(), e(this).parents(".gfort-block-wrapper").find(".gfort-owl-slider-active-item").removeClass("gfort-owl-slider-active-item"), e(this).addClass("gfort-owl-slider-active-item"), e(this).parents(".gfort-block-wrapper").prev(".gfort-owl-slider").trigger("to.owl.carousel", [e(this).attr("data-gfort-owl-slider-jump-to"), 600, !0]) })
            })
        }
    }, g.isotopefn = {
        init: function() {
            e().isotope && e(".gfort-isotope").each(function() {
                var t = e(this),
                    r = !0,
                    o = t.attr("data-gfort-page-direction"),
                    a = t.attr("data-gfort-filter"),
                    n = parseInt(t.attr("data-transition-duration"), 10);
                n = n || 0 === n ? n : .4, n += "s", "rtl" === o && (r = !1), t.isotope({ filter: a, layoutMode: "masonry", percentPosition: !0, itemSelector: ".gfort-isotope-item", originLeft: r, animationOptions: { queue: !1, duration: 850, easing: "linear" }, transitionDuration: n })
            })
        }
    }, g.isotopefnFilterfn = {
        init: function() {
            e().isotope && (e("body").on("click", ".gfort-isotope-filter a", function(t) {
                t.preventDefault();
                var r = e(this),
                    o = r.parents(".gfort-isotope-filter"),
                    a = r.attr("data-filter"),
                    n = o.next(".gfort-isotope");
                i = e("> .gfort-form-control", o);
                e(n).length && (o.find(".active").removeClass("active"), r.addClass("active"), n.isotope({ filter: a })), e(i).length && i.val(r.attr("data-filter"))
            }), e(".gfort-isotope-filter-select").length && e(".gfort-isotope-filter").each(function() {
                var t = e(this),
                    r = e("> .gfort-isotope-filter-container", t),
                    o = "",
                    a = parseInt(t.attr("data-gfort-isotope-filter-select-width"), 10);
                o = '<select class="gfort-form-control secondary-font-family" aria-label="Filter" ' + (a = a > 0 ? 'style="max-width: ' + a + 'px"' : "") + ">", e("> a", r).each(function() { o += '<option value="' + e(this).attr("data-filter") + '">' + e(this).text() + "</option>" }), o += "</select>", t.prepend(o)
            }), e("body").on("change", ".gfort-isotope-filter-select .gfort-form-control", function() {
                var t = e(this),
                    r = t.parents(".gfort-isotope-filter-select"),
                    o = r.next(".gfort-isotope");
                r.find(".active").removeClass("active"), r.find('a[data-filter="' + t.val() + '"]').addClass("active"), e(o).length && o.isotope({ filter: t.val() })
            }))
        }
    }, g.reCaptchafn = {
        init: function(t) {
            var r = e(t).attr("id");
            e.ajax({ type: "GET", url: "https://www.google.com/recaptcha/api.js?render=6LebZIAUAAAAAOiAsdsLtEilLIYGem_vh7o7FrDx", dataType: "script", cache: !0 }).done(function() { grecaptcha.ready(function() { grecaptcha.execute("6LebZIAUAAAAAOiAsdsLtEilLIYGem_vh7o7FrDx", { action: "homepage" }).then(function(e) { document.getElementById(r).value = e }) }) })
        }
    }, g.formBackBtnfn = { init: function() { e(".gfort-btn-form-back").on("click", function() { var t = e(this); return t.parents(".gfort-form-block-step").css({ display: "none" }), t.parents(".gfort-form-block-step").prev(".gfort-form-block-step").css({ display: "block" }), !1 }) } }, g.formNextBtnfn = {
        init: function() {
            e(".gfort-btn-form-next").on("click", function() {
                var t = e(this),
                    r = t.parents(".gfort-form-block-validation").find("form");
                if (e().validate) return e(r).validate({ rules: p, messages: m, errorElement: "span", errorClass: "gfort-form-error" }), !0 === r.valid() && (t.parents(".gfort-form-block-step").css({ display: "none" }), t.parents(".gfort-form-block-step").next(".gfort-form-block-step").css({ display: "block" }), !1)
            })
        }
    }, g.formValidationfn = {
        init: function() {
            e(".gfort-form-block-validation").each(function() {
                var t = e(this),
                    r = t.attr("data-gfort-contact-form-redirect-url"),
                    o = t.find('button[type="submit"]'),
                    a = t.find("form");
                t.hasClass("gfort-form-block-multi-step") && e(a).on("keyup keypress", function(e) { if (13 === (e.keyCode || e.which)) return e.preventDefault(), !1 }), t.find(".gfort-form-check-must-accept").length && o.attr("disabled", ""), t.hasClass("gfort-form-block-contact") && a.prepend('<input type="hidden" class="form_domain" name="form_domain" value="' + document.location.hostname + '">'), e(o).on("click", function() { a.find(".gfort-form-message").remove() }), e().validate && (e(a).validate({ rules: p, messages: m, errorElement: "span", errorClass: "gfort-form-error", submitHandler: function() { a.find(".gfort-form-message").remove(), o.addClass("show-spinner").attr("disabled", ""), e.ajax({ type: "POST", url: a.attr("action"), data: a.serialize() }).done(function(n) { null !== n.match("success-message") && (r ? window.location = r : a.append('<div class="gfort-form-message col-lg-12"><div class="alert gfort-alert gfort-alert-success">' + n + "</div></div>"), t.hasClass("gfort-form-block-multi-step") && o.parents(".gfort-form-block-step").css({ display: "none" }), a.find("input").val(""), a.find(".form_domain").val(document.location.hostname), a.find("textarea").val(""), a.find('input[type="checkbox"]').prop("checked", !1)), null !== n.match("error-message") && a.append('<div class="gfort-form-message col-lg-12"><div class="alert gfort-alert gfort-alert-danger">' + n + "</div></div>"), a.find(".g-recaptcha-response").length && g.reCaptchafn.init(e("#" + a.find(".g-recaptcha-response").attr("id"))), o.removeClass("show-spinner").removeAttr("disabled") }) } }), e.validator.methods.email = function(e, t) { return this.optional(t) || /\S+@\S+\.\S+/.test(e) })
            })
        }
    }, g.formCheckboxAcceptfn = {
        init: function() {
            e(".gfort-form-check-must-accept").on("change", function() {
                var t = e(this).parents(".gfort-form-block"),
                    r = t.find("[type=submit]"),
                    o = [];
                e(t).find(".gfort-form-check-must-accept").each(function() {!1 === e(this)[0].checked ? o.push("false") : o.push("true") }), (o = o.filter(function(e, t, r) { return t === r.indexOf(e) })).length > 1 ? r.attr("disabled", "") : "false" === o[0] ? r.attr("disabled", "") : r.removeAttr("disabled")
            })
        }
    }, g.formMinDateTodayfn = {
        init: function() {
            e(".gfort-min-date-today").each(function() {
                var t, r = e(this),
                    o = new Date;
                t = o.getFullYear() + "-" + String(o.getMonth() + 1).padStart(2, "0") + "-" + String(o.getDate()).padStart(2, "0"), r.attr("min", t)
            })
        }
    }, g.modalfn = { init: function() { e(".modal").on("show.bs.modal", function() { e(".gfort-section-header-menu-stuck").css({ paddingRight: a }), e(".gfort-page-boxed .gfort-section-header-menu-stuck").css({ paddingRight: 0, right: a }), e(".gfort-section-header-menu-stuck").addClass("gfort-no-transition"), e(this).find("iframe").each(function() { e(this).attr("data-gfort-temp-src", e(this).attr("src")), e(this).attr("src", e(this).attr("data-gfort-temp-src")) }), e("#gfort-btn-back-to-top").addClass("gfort-no-transition"), e("#gfort-btn-back-to-top").css({ marginRight: a }) }), e(".modal").on("hidden.bs.modal", function() { e(".gfort-section-header-menu-stuck").css({ paddingRight: 0 }), e(".gfort-page-boxed .gfort-section-header-menu-stuck").css({ paddingRight: 0, right: 0 }), e(this).find("iframe").each(function() { e(this).attr("src", e(this).attr("data-gfort-temp-src")) }), e(this).find(".mejs__container video").each(function() { this.player.pause() }), e(this).find(".mejs__container audio").each(function() { this.player.pause() }), e("#gfort-btn-back-to-top").css({ marginRight: 0 }) }) } }, g.cookiefn = {
        setCookie: function(e, t, r) {
            var o, a = new Date;
            a.setTime(a.getTime() + 24 * r * 60 * 60 * 1e3), o = "expires=" + a.toGMTString(), document.cookie = e + "=" + t + ";" + o + ";path=/"
        },
        getCookie: function(e) {
            e += "=";
            var t, r, o = decodeURIComponent(document.cookie).split(";");
            for (t = 0; t < o.length; t += 1) {
                for (r = o[t];
                    " " === r.charAt(0);) r = r.substring(1);
                if (0 === r.indexOf(e)) return r.substring(e.length, r.length)
            }
            return "0"
        }
    }, g.notificationsfn = {
        init: function() {
            e(".gfort-block-notification").each(function() {
                var t = e(this),
                    r = t.attr("data-gfort-cookie-name");
                r = r || "GRAPHICFORT", "0" === g.cookiefn.getCookie(r) && (e("#gfort-page-preloader").length ? t.addClass("notification-preloader-show") : t.addClass("show"))
            }), e(".gfort-notification-dismiss").on("click", function() {
                e("body").removeClass("gfort-block-notification-layout-3-stop-scroll");
                var t = e(this),
                    r = t.parents(".gfort-block-notification").attr("data-gfort-cookie-name"),
                    o = parseInt(t.parents(".gfort-block-notification").attr("data-gfort-cookie-expire"), 10);
                r = r || "GRAPHICFORT", o = o || 0, e(this).parents(".gfort-block-notification").removeClass("show"), e(this).parents(".gfort-block-notification").removeClass("notification-preloader-show"), g.cookiefn.setCookie(r, "1", o), clearTimeout(d)
            })
        },
        perfectScrollbar: function() { e(".gfort-block-notification-layout-3").length && e("body").addClass("gfort-block-notification-layout-3-stop-scroll"); try { e(".gfort-block-notification-scrollbar").perfectScrollbar() } catch (e) { if (e.toString().indexOf("PerfectScrollbar")) return !1 } }
    }, g.parallaxfn = { init: function() { e(".gfort-section-parallax").each(function() { e(this).parallax("50%", .3) }) } }, g.countTofn = {
        init: function() {
            e().countTo && e("[data-gfort-count-to]").each(function() {
                var t = e(this),
                    r = parseFloat(t.attr("data-gfort-count-from")),
                    o = parseFloat(t.attr("data-gfort-count-to")),
                    a = parseInt(t.attr("data-gfort-count-speed"), 10),
                    n = parseFloat(t.attr("data-gfort-count-interval")),
                    i = parseInt(t.attr("data-gfort-count-decimals"), 10);
                0 === (r = r || 0) && t.html("0"), o = o || 100, a = a || 1e3, n = n || 50, i = i || 0, e().appear ? t.appear(function() { t.countTo({ from: r, to: o, speed: a, refreshInterval: n, decimals: i }) }, { accX: 0, accY: -108 }) : t.countTo({ from: r, to: o, speed: a, refreshInterval: n, decimals: i })
            })
        }
    }, g.bgVideofn = {
        init: function(e) {
            var t, o, a, n, i = e,
                s = i.parent(),
                l = parseInt(s.outerWidth(!0), 10),
                f = parseInt(s.outerHeight(!0), 10);
            r.any() || ((t = parseInt(16 * f / 9, 10)) > l ? (t = parseInt(16 * f / 9, 10), o = parseInt(f, 10), a = 0, n = parseInt((l - t) / 2, 10)) : (t = parseInt(l, 10), o = parseInt(9 * l / 16, 10), a = parseInt((f - o) / 2, 10), n = 0), i.css({ width: t, height: o, marginTop: a, marginLeft: n }))
        }
    }, g.youtubeBGVideofn = {
        init: function() {
            e(".gfort-youtube-bg-video").each(function(t) {
                var o, a = e(this),
                    n = a.attr("data-gfort-youtube-bg-video-url"),
                    i = n.split("?v=")[1],
                    s = a.attr("data-gfort-youtube-bg-video-autoplay"),
                    l = a.attr("data-gfort-youtube-bg-video-mute");
                r.any() || (o = "https://www.youtube.com/embed/" + i + "?enablejsapi=1&iv_load_policy=3&enablejsapi=1&disablekb=1&controls=0&widgetid=1&showinfo=0&loop=1&&playlist=" + i + "&rel=0" + (l = "no" === l ? "&mute=0" : "&mute=1") + (s = "no" === s ? "&autoplay=0" : "&autoplay=1"), a.append('<iframe src="' + o + '" id="gfort-youtube-iframe-bg-video-' + t + '" class="gfort-youtube-iframe-bg-video"></iframe>'), g.bgVideofn.init(a)), a.parent(".gfort-section-bg-video").after('<a class="gfort-btn-youtube-bg-video" href="' + n + '" data-gfort-lightbox title="Play"></a>'), requirejs(["fancybox"], function() { g.fancyboxfn.init() })
            })
        }
    }, g.googleMapfn = {
        init: function() {
            var t = [];
            e(".gfort-block-gmap").each(function() {
                var r, o = e(this),
                    a = o.attr("id"),
                    n = parseInt(o.attr("data-gfort-map-zoom"), 10),
                    i = parseFloat(o.attr("data-gfort-map-latitude")),
                    s = parseFloat(o.attr("data-gfort-map-longitude")),
                    l = o.attr("data-gfort-map-height"),
                    f = o.attr("data-gfort-map-style");
                "responsive" === l ? o.wrap('<div class="fluid-width-video-wrapper"></div>') : "bg" === l ? o.css({ height: o.parent().height() }) : (l = (l = parseInt(l, 10)) || 300, o.css({ height: l })), n = (n = n || 16) < 0 || n > 22 ? 16 : n, i = i || 0, s = s || 0, f = "silver" === f ? [{ elementType: "geometry", stylers: [{ color: "#f5f5f5" }] }, { elementType: "labels.icon", stylers: [{ visibility: "off" }] }, { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] }, { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] }, { featureType: "administrative.land_parcel", elementType: "labels.text.fill", stylers: [{ color: "#bdbdbd" }] }, { featureType: "poi", elementType: "geometry", stylers: [{ color: "#eeeeee" }] }, { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] }, { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] }, { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] }, { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] }, { featureType: "road.arterial", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] }, { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#dadada" }] }, { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] }, { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] }, { featureType: "transit.line", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] }, { featureType: "transit.station", elementType: "geometry", stylers: [{ color: "#eeeeee" }] }, { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9c9c9" }] }, { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] }] : "retro" === f ? [{ elementType: "geometry", stylers: [{ color: "#ebe3cd" }] }, { elementType: "labels.icon", stylers: [{ visibility: "off" }] }, { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] }, { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] }, { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#c9b2a6" }] }, { featureType: "administrative.land_parcel", elementType: "geometry.stroke", stylers: [{ color: "#dcd2be" }] }, { featureType: "administrative.land_parcel", elementType: "labels.text.fill", stylers: [{ color: "#ae9e90" }] }, { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#dfd2ae" }] }, { featureType: "poi", elementType: "geometry", stylers: [{ color: "#dfd2ae" }] }, { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#93817c" }] }, { featureType: "poi.park", elementType: "geometry.fill", stylers: [{ color: "#a5b076" }] }, { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#447530" }] }, { featureType: "road", elementType: "geometry", stylers: [{ color: "#f5f1e6" }] }, { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#fdfcf8" }] }, { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#f8c967" }] }, { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#e9bc62" }] }, { featureType: "road.highway.controlled_access", elementType: "geometry", stylers: [{ color: "#e98d58" }] }, { featureType: "road.highway.controlled_access", elementType: "geometry.stroke", stylers: [{ color: "#db8555" }] }, { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#806b63" }] }, { featureType: "transit.line", elementType: "geometry", stylers: [{ color: "#dfd2ae" }] }, { featureType: "transit.line", elementType: "labels.text.fill", stylers: [{ color: "#8f7d77" }] }, { featureType: "transit.line", elementType: "labels.text.stroke", stylers: [{ color: "#ebe3cd" }] }, { featureType: "transit.station", elementType: "geometry", stylers: [{ color: "#dfd2ae" }] }, { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#b9d3c2" }] }, { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#92998d" }] }] : "dark" === f ? [{ elementType: "geometry", stylers: [{ color: "#212121" }] }, { elementType: "labels.icon", stylers: [{ visibility: "off" }] }, { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] }, { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] }, { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#757575" }] }, { featureType: "administrative.country", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] }, { featureType: "administrative.land_parcel", stylers: [{ visibility: "off" }] }, { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#bdbdbd" }] }, { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] }, { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#181818" }] }, { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] }, { featureType: "poi.park", elementType: "labels.text.stroke", stylers: [{ color: "#1b1b1b" }] }, { featureType: "road", elementType: "geometry.fill", stylers: [{ color: "#2c2c2c" }] }, { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] }, { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#373737" }] }, { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#3c3c3c" }] }, { featureType: "road.highway.controlled_access", elementType: "geometry", stylers: [{ color: "#4e4e4e" }] }, { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] }, { featureType: "transit", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] }, { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }] }, { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#3d3d3d" }] }] : "night" === f ? [{ elementType: "geometry", stylers: [{ color: "#242f3e" }] }, { elementType: "labels.icon", stylers: [{ visibility: "off" }] }, { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] }, { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] }, { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] }, { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] }, { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#263c3f" }] }, { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#6b9a76" }] }, { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] }, { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] }, { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] }, { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#746855" }] }, { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#1f2835" }] }, { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#f3d19c" }] }, { featureType: "transit", elementType: "geometry", stylers: [{ color: "#2f3948" }] }, { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] }, { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] }, { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] }, { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#17263c" }] }] : "aubergine" === f ? [{ elementType: "geometry", stylers: [{ color: "#1d2c4d" }] }, { elementType: "labels.icon", stylers: [{ visibility: "off" }] }, { elementType: "labels.text.fill", stylers: [{ color: "#8ec3b9" }] }, { elementType: "labels.text.stroke", stylers: [{ color: "#1a3646" }] }, { featureType: "administrative.country", elementType: "geometry.stroke", stylers: [{ color: "#4b6878" }] }, { featureType: "administrative.land_parcel", elementType: "labels.text.fill", stylers: [{ color: "#64779e" }] }, { featureType: "administrative.province", elementType: "geometry.stroke", stylers: [{ color: "#4b6878" }] }, { featureType: "landscape.man_made", elementType: "geometry.stroke", stylers: [{ color: "#334e87" }] }, { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#023e58" }] }, { featureType: "poi", elementType: "geometry", stylers: [{ color: "#283d6a" }] }, { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#6f9ba5" }] }, { featureType: "poi", elementType: "labels.text.stroke", stylers: [{ color: "#1d2c4d" }] }, { featureType: "poi.park", elementType: "geometry.fill", stylers: [{ color: "#023e58" }] }, { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#3C7680" }] }, { featureType: "road", elementType: "geometry", stylers: [{ color: "#304a7d" }] }, { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#98a5be" }] }, { featureType: "road", elementType: "labels.text.stroke", stylers: [{ color: "#1d2c4d" }] }, { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#2c6675" }] }, { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#255763" }] }, { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#b0d5ce" }] }, { featureType: "road.highway", elementType: "labels.text.stroke", stylers: [{ color: "#023e58" }] }, { featureType: "transit", elementType: "labels.text.fill", stylers: [{ color: "#98a5be" }] }, { featureType: "transit", elementType: "labels.text.stroke", stylers: [{ color: "#1d2c4d" }] }, { featureType: "transit.line", elementType: "geometry.fill", stylers: [{ color: "#283d6a" }] }, { featureType: "transit.station", elementType: "geometry", stylers: [{ color: "#3a4762" }] }, { featureType: "water", elementType: "geometry", stylers: [{ color: "#0e1626" }] }, { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#4e6d70" }] }] : [];
                try { r = { zoom: n, center: new google.maps.LatLng(i, s), styles: f, scrollwheel: !1, mapTypeControl: !1, streetViewControl: !1 }, t[a] = new google.maps.Map(document.getElementById(a), r), g.googleMapfn.markers(a, t) } catch (e) { if (e.toString().indexOf("google")) return !1 }
            })
        },
        markers: function(t, r) {
            var o = [],
                a = [];
            e("#" + t).parents(".gfort-block-gmap-wrapper").find(".gfort-block-gmap-marker").each(function(n) {
                var i = e(this),
                    s = parseFloat(i.attr("data-gfort-marker-latitude")),
                    l = parseFloat(i.attr("data-gfort-marker-longitude")),
                    f = i.attr("data-gfort-marker-image"),
                    c = '<div class="gfort-block-gmap-infowindow">' + i.html() + "</div>";
                s = s || 0, l = l || 0, a[n] = new google.maps.InfoWindow({ content: c }), o[n] = new google.maps.Marker({ icon: f, position: new google.maps.LatLng(s, l), animation: google.maps.Animation.DROP }), o[n].setMap(r[t]), o[n].addListener("click", function() { a[n].open(t, o[n]) })
            })
        }
    }, g.tabsfn = {
        init: function() {
            e(".gfort-block-tabs-select").each(function() {
                var t = e(this),
                    r = e("> .gfort-nav-tabs", t),
                    o = "",
                    a = parseInt(t.attr("data-gfort-block-tabs-select-width"), 10);
                a = a > 0 ? 'style="max-width: ' + a + 'px"' : "", t.hasClass("gfort-block-tabs-vertical") && (r = e("> .gfort-nav-tabs-wrapper .gfort-nav-tabs", t)), o = '<select class="gfort-tabs-select gfort-form-control secondary-font-family" aria-label="Select" ' + a + ">", e("> .gfort-nav-item", r).each(function() { o += '<option value="' + e("> a", this).attr("href") + '">' + e("> a", this).text() + "</option>" }), o += "</select>", t.prepend(o)
            }), e(".gfort-block-tabs-select .gfort-nav-item .gfort-nav-link").on("click", function() { e(this).parents(".gfort-block-tabs-select").find(".gfort-tabs-select").val(e(this).attr("href")) }), e("body").on("change", ".gfort-tabs-select", function() {
                var t = e(this).parents(".gfort-block-tabs-select");
                t.find(".active").removeClass("active"), t.find('a[href="' + e(this).val() + '"]').addClass("active"), t.find(e(this).val()).addClass("active")
            })
        }
    }, g.typedfn = {
        init: function() {
            e().typed && e(".gfort-text-animation").each(function() {
                var t = e(this),
                    r = [],
                    o = t.next().attr("id");
                t.children().each(function() { r.push(e(this).text()) }), e("#" + o).typed({ loop: !0, typeSpeed: 30, backDelay: 2e3, strings: r })
            })
        }
    }, g.gfortBGImageGrid = {
        init: function() {
            e().gridrotator && e(".gfort-section-bg-images-grid").each(function() {
                var t = e(this),
                    r = parseInt(t.attr("data-gfort-row-xl"), 10),
                    o = parseInt(t.attr("data-gfort-col-xl"), 10),
                    a = parseInt(t.attr("data-gfort-row-lg"), 10),
                    n = parseInt(t.attr("data-gfort-col-lg"), 10),
                    i = parseInt(t.attr("data-gfort-row-md"), 10),
                    s = parseInt(t.attr("data-gfort-col-md"), 10),
                    l = parseInt(t.attr("data-gfort-row-sm"), 10),
                    f = parseInt(t.attr("data-gfort-col-sm"), 10),
                    c = parseInt(t.attr("data-gfort-row-xs"), 10),
                    d = parseInt(t.attr("data-gfort-col-xs"), 10),
                    g = t.attr("data-gfort-animation"),
                    p = parseInt(t.attr("data-gfort-animation-speed"), 10),
                    m = parseInt(t.attr("data-gfort-animation-interval"), 10);
                r = r || 1, a = a || 1, i = i || 1, l = l || 1, c = c || 1, o = o || 1, n = n || 1, s = s || 1, f = f || 1, d = d || 1, t.gridrotator({ rows: r, columns: o, wLG: { rows: a, columns: n }, wMD: { rows: i, columns: s }, wSM: { rows: l, columns: f }, wXS: { rows: c, columns: d }, animType: g, animSpeed: p, interval: m })
            })
        }
    }, g.downCountfn = {
        init: function() {
            e().downCount && e(".gfort-block-downcount").each(function() {
                var t = e(this),
                    r = t.attr("data-gfort-downcount-year"),
                    o = t.attr("data-gfort-downcount-month"),
                    a = t.attr("data-gfort-downcount-day"),
                    n = t.attr("data-gfort-downcount-hour"),
                    i = t.attr("data-gfort-downcount-min"),
                    s = t.attr("data-gfort-downcount-utc"),
                    l = t.attr("data-gfort-downcount-message");
                t.downCount({ date: o + "/" + a + "/" + r + " " + n + ":" + i + ":00", offset: s }, function() { t.html('<div class="downcount-col-100"><h2>' + l + "</h2></div>") })
            })
        }
    }, g.easyPieChartfn = {
        init: function() {
            e().easyPieChart && e(".gfort-block-pie").each(function() {
                var t, r = e(this),
                    o = e("> .gfort-block-container", r),
                    a = parseFloat(r.attr("data-gfort-pie-percent")),
                    n = r.attr("data-gfort-pie-bar-color"),
                    i = r.attr("data-gfort-pie-track-color"),
                    s = 156;
                a = a || 100, r.width() < 156 && (s = Math.ceil(r.width() - 2)), o.prepend('<div class="gfort-block-head gfort-block-pie-head"><div class="gfort-block-pie-circle"></div><h3 class="gfort-block-pie-percent" style="color: ' + n + '"><span data-gfort-count-from="0" data-gfort-count-to="' + a + '" data-gfort-count-speed="1000" data-gfort-count-interval="50">' + a + "</span><span>%</span></h3></div>"), t = r.find(".gfort-block-pie-circle"), e().appear ? t.appear(function() { t.easyPieChart({ size: s, scaleLength: 0, lineWidth: "3", scaleColor: !1, lineCap: "square", barColor: n, trackColor: i, animate: { duration: 1500, enabled: !0 } }), t.data("easyPieChart").update(Math.ceil(a)) }, { accX: 0, accY: -108 }) : (t.easyPieChart({ size: s, scaleLength: 0, lineWidth: "3", scaleColor: !1, lineCap: "square", barColor: n, trackColor: i, animate: { duration: 1500, enabled: !0 } }), t.data("easyPieChart").update(Math.ceil(a))), g.countTofn.init()
            })
        }
    }, g.progressBarfn = {
        init: function() {
            e(".gfort-progress").each(function() {
                var t = e(this),
                    r = parseFloat(t.attr("data-gfort-progress-percent")) + "%",
                    o = t.attr("data-gfort-progress-title"),
                    a = t.attr("class"),
                    n = e("> .gfort-progress-bar", t);
                a = a.indexOf("light-color") > -1 ? "light-color" : "", t.before('<div class="gfort-progress-title-percent ' + a + '"><h6 class="font-size-13"><span>' + o + "</span><span>" + r + "</span></h6></div>"), e().appear ? n.appear(function() { n.animate({ width: r }, 800) }, { accX: 0, accY: -108 }) : n.animate({ width: r }, 800)
            })
        }
    }, g.documentOnReady = {
        init: function() {
            r.any() || e("body").addClass("gfort-desktop-device"), requirejs(["jquery", "bootstrap"], function() { g.bootstrapfn.init() }), e("#gfort-page-preloader").length && requirejs(["gfortpace"], function() { gfortPace.start(), g.pagePreLoaderfn.init() }), e(".gfort-btn-back-to-top").on("click", function() { return e("html, body").animate({ scrollTop: "0" }, 800), !1 }), t = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1), e(".gfort-section-header .gfort-nav-link").each(function() {
                var r = e(this);
                r.attr("href") === t && r.addClass("active").parentsUntil(".gfort-navbar-nav").addClass("active")
            }), g.headerSectionfn.mobileMenu(), g.headerSectionfn.init(), g.headerSectionfn.collapseMenu(), g.headerSectionfn.subMenu(), g.headerSectionfn.megaMenu(), g.headerSectionfn.searchForm(), e(".gfort-section-header-middle").length && g.headerSectionfn.middleSection(), e(".gfort-section-header-layout-5").length && requirejs(["perfectScrollbar"], function() { g.headerSectionfn.perfectScrollbar() }), (e(".gfort-section-header-transparent").length || e(".gfort-section-header-layout-2").length) && g.headerSectionfn.transparent(), requirejs(["fitVids"], function() { g.fitVidsfn.init() }), (e("video").length || e("audio").length) && requirejs(["mediaElementPlayer"], function() { g.mediaElementPlayerfn.init() }), e(".gfort-form-block-mailchimp").length && g.mailchimpfn.init(), e(".gfort-instagram-feed-block").length && requirejs(["gfortInsta"], function() { g.instagramfn.init() }), e(".gfort-twitter-feed-block").length && requirejs(["tweetie"], function() { g.twitterfn.init() }), e("[data-gfort-lightbox]").length && requirejs(["fancybox"], function() { g.fancyboxfn.init() }), e(".gfort-current-year").length && e(".gfort-current-year").html((new Date).getFullYear()), e(".gfort-block-share").length && g.shareButtonfn.init(), e(".gfort-owl-slider").length && requirejs(["owl"], function() { g.owlSliderfn.init() }), e("body").on("click", ".data-gfort-scroll", function() { if (e(this.hash).length) { var t = e(this).attr("href"); return e(".gfort-navbar-collapse").hasClass("show") && (e("body").removeClass("gfort-navbar-toggler-off-canvas-menu-open"), e(".gfort-navbar-toggler").removeClass("toggle"), e(".gfort-navbar-collapse").removeClass("show").addClass("collapse")), e(".gfort-section-header-layout-5").length && (e("body").removeClass("gfort-navbar-toggler-off-canvas-menu-open"), e(".gfort-navbar-toggler").removeClass("toggle")), e(".gfort-section-header").hasClass("gfort-section-header-fixed") && parseInt(e(window).width() + a, 10) > 1199 ? e("html, body").animate({ scrollTop: e(t).offset().top - e(".gfort-section-header-fixed .gfort-section-header-menu-container").height() + 2 }, 800) : e("html, body").animate({ scrollTop: e(t).offset().top }, 800), !1 } }), e(".gfort-isotope").length && requirejs(["require", "jquery", "isotope"], function(e, t, r) { e(["jquery-bridget/jquery-bridget"], function(e) { e("isotope", r, t), g.isotopefn.init() }) }), e(".gfort-isotope-filter").length && requirejs(["require", "jquery", "isotope"], function(e, t, r) { e(["jquery-bridget/jquery-bridget"], function(e) { e("isotope", r, t), g.isotopefnFilterfn.init() }) }), e(".g-recaptcha-response").length && e(".g-recaptcha-response").each(function(t) { e(this).attr("id", e(this).attr("class") + "-" + t), g.reCaptchafn.init(e(this)) });
        }
    }, e(document).ready(g.documentOnReady.init), g.windowOnScroll = { init: function() { n = e(window).scrollTop(), e("#gfort-btn-back-to-top").length && (n >= 300 ? e("#gfort-btn-back-to-top").addClass("show") : e("#gfort-btn-back-to-top").removeClass("show")), e(".gfort-section-header-fixed").length && g.headerSectionfn.fixedHeader(n), g.headerSectionfn.closeSearchFform(), e(".gfort-section-header-fixed").length && (n >= 72 ? e(".gfort-section-header-menu-container").addClass("scroll") : e(".gfort-section-header-menu-container").removeClass("scroll")), e(".gfort-section-header-layout-5.gfort-section-header-fixed").length && e(".gfort-section-header-fixed").css({ transform: "none" }), e("#gfort-btn-back-to-top").removeClass("gfort-no-transition"), e(".gfort-section-header-menu-stuck").removeClass("gfort-no-transition") } }, e(window).on("scroll", g.windowOnScroll.init), g.windowOnResize = { init: function() { s = setTimeout(function() { g.headerSectionfn.subMenu() }, 400), l = setTimeout(function() { g.headerSectionfn.megaMenu() }, 400), (e(".gfort-section-header-transparent").length || e(".gfort-section-header-layout-2").length) && g.headerSectionfn.transparent(), e().scrollspy && e('[data-spy="scroll"]').each(function() { e(this).scrollspy("refresh") }), e(".gfort-youtube-bg-video").length && e(".gfort-youtube-bg-video").each(function() { g.bgVideofn.init(e(this)) }) } }, e(window).on("resize", g.windowOnResize.init)
}(jQuery);