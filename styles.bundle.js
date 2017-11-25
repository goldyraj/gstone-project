webpackJsonp(["styles"],{

/***/ "../../../../../src/styles.css":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("../../node_modules/css-loader/index.js?{\"sourceMap\":false,\"importLoaders\":1}!../../node_modules/postcss-loader/index.js?{\"ident\":\"postcss\"}!../../../../../src/styles.css");
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__("../../node_modules/style-loader/addStyles.js")(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/@angular/cli/node_modules/css-loader/index.js??ref--8-1!../node_modules/@angular/cli/node_modules/postcss-loader/index.js??postcss!./styles.css", function() {
			var newContent = require("!!../node_modules/@angular/cli/node_modules/css-loader/index.js??ref--8-1!../node_modules/@angular/cli/node_modules/postcss-loader/index.js??postcss!./styles.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "../../node_modules/css-loader/index.js?{\"sourceMap\":false,\"importLoaders\":1}!../../node_modules/postcss-loader/index.js?{\"ident\":\"postcss\"}!../../../../../src/styles.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "body, html {\r\n    height: 100%;\r\n    margin: 0;\r\n}\r\nbody {\r\n    font-family: 'Open Sans', sans-serif;\r\n    font-weight: 400;\r\n    color: #727272;\r\n    font-size: 14px;\r\n    line-height: 24px;\r\n    background-color: #ffffff;\r\n    overflow-x: hidden;\r\n    max-width: 100%;\r\n    height: 635px!important;\r\n}\r\nimg {\r\n    max-width: 100%;\r\n    width: 100%;\r\n    height: auto;\r\n}\r\np {\r\n    font-size: 14px;\r\n    line-height: 24px;\r\n    margin: 0 auto;\r\n    color: #A1ACB5;\r\n}\r\nul,\r\nol {\r\n    list-style: none;\r\n    margin: 0 auto;\r\n    padding: 0 auto;\r\n}\r\na { \r\n    color: #2A363F;\r\n    text-decoration: none;\r\n}\r\n\r\na:hover,\r\na:focus {\r\n    color: #595959;\r\n    text-decoration: none;\r\n}\r\na:hover,\r\na:focus {\r\n    outline: none !important;\r\n}\r\na img {\r\n    border: none;\r\n}\r\n\r\n/* Heading Font Size */\r\nh1 {\r\n    font-size: 36px;\r\n}\r\nh2 {\r\n    font-size: 30px;\r\n}\r\nh3 {\r\n    font-size: 18px;\r\n}\r\nh4 {\r\n    font-size: 16px;\r\n}\r\nh5 {\r\n    font-size: 14px;\r\n}\r\nh6 {\r\n    font-size: 12px;\r\n}\r\nh1,\r\nh2,\r\nh3,\r\nh4,\r\nh5,\r\nh6 {\r\n    font-family: 'Raleway', sans-serif;\r\n    font-weight: 400;\r\n    line-height: 1.2;\r\n    color: #ffffff;\r\n    margin-top: 0;\r\n    margin-bottom: 10px;\r\n}\r\nspan {\r\n    color: #a4aeb7;\r\n}\r\n.preloader-dot-loading .cssload-loading i {\r\n    background: #488fe1 !important;\r\n}\r\n/* section-title */\r\n.navbar{\r\n    border-radius: 0px !important;\r\n}\r\n.navbar-inverse .navbar-nav > li > a{ color: #ffffff;}\r\n.navbar-nav li a span{\r\n  display:block;\r\n  font-size:10px;\r\n  color:#FFFFFF;\r\n  position:absolute;\r\n  top:30px;\r\n  left: 15px;\r\n  bottom:0px;\r\n}\r\n.navbar-ex1-collapse ul li a:hover{color: #ffffff!important;}\r\n.navbar-brand{\r\n    padding: 8px 0px 0px 14px;\r\n}\r\n.navbar-default .navbar-toggle:hover, .navbar-default .navbar-toggle:focus{ background: #2c398f;}\r\n/* section-title */\r\n.unicod-section {\r\n    padding: 100px 0 10px;\r\n}\r\n.unicod-section-title {\r\n    margin-bottom: 30px;\r\n    text-align: center;\r\n}\r\n.unicod-section-title p {\r\n    margin-top: 20px;\r\n    font-size: 16px;\r\n    line-height: 27px;\r\n    font-style: italic;\r\n    color: #fff;\r\n    font-weight: normal;\r\n}\r\n\r\n.unicod-section-title-one {\r\n    margin-bottom: 20px;\r\n    /*text-align: center;*/\r\n}\r\n.unicod-section-title-one h4{\r\n color: #4c4545;\r\n    padding-top: 18px;\r\n    font-size: 20px;\r\n    font-weight: 600;\r\n}\r\n.hsn-section-title-one {\r\n    margin-bottom: 20px;\r\n    /*text-align: center;*/\r\n}\r\n.hsn-section-title-one > h2 {\r\n  \r\n  font-size: 31px;\r\n  text-transform: uppercase;\r\n  border-bottom: 1px solid #ffffff;\r\n  color: #0FB4E0;\r\n  padding-bottom: 15px;\r\n  font-weight: bold;\r\n}\r\n.unicod-section-title-one  p {\r\n   color: #2A363F;\r\n    margin-top: 20px;\r\n    font-size: 16px;\r\n    line-height: 27px;\r\n    font-style: italic;\r\n    font-weight: normal;\r\n}\r\n.padding_les {\r\n    padding: 0 !important;\r\n}\r\n.unicod-section-title > h2 { \r\n   border-bottom: 1px solid #1d262c;\r\n  color: #a4aeb7;\r\n  padding-bottom: 15px;\r\n  font-size: 31px;\r\n  text-transform: uppercase;\r\n  font-weight: bold;\r\n}\r\n.unicod-section-title-one > h2 {\r\n  \r\n  font-size: 31px;\r\n  text-transform: uppercase;\r\n  border-bottom: 1px solid #ffffff;\r\n  color: #0FB4E0;\r\n  padding-bottom: 15px;\r\n  font-weight: bold;\r\n}\r\n\r\n.unicod-margin-bottom-none {\r\n  margin-bottom: 0 !important;\r\n}\r\n\r\n/* layer */\r\n.unicod-layer-black {\r\n    position: relative;\r\n}\r\n.unicod-layer-black:before {\r\n    content: \" \";\r\n    height: 100%;\r\n    left: 0;\r\n    position: absolute;\r\n    top: 0;\r\n    width: 100%;\r\n    z-index: 0;\r\n    background: rgba(0, 0, 0, 0.85);\r\n}\r\n\r\n.collor-bottom {\r\n    position: relative;\r\n}\r\n.collor-bottom:before {\r\n    content: \" \";\r\n    width: 1px;\r\n    left: 0;\r\n    position: absolute;\r\n    top: -10px;\r\n    width: 100%;\r\n    z-index: 0;\r\n    border-bottom: 1px solid #354049;\r\n}\r\n.collor-bottom-smal {\r\n    position: relative;\r\n}\r\n.collor-bottom-smal:before {\r\n    content: \" \";\r\n    width: 1px;\r\n    left: 0;\r\n    position: absolute;\r\n    top: -10px;\r\n    width: 185px;\r\n    z-index: 0;\r\n    border-bottom: 1px solid #354049;\r\n}\r\n.collor-border {\r\n    position: relative;\r\n    margin-bottom: 10px;\r\n}\r\n.collor-border:before {\r\n    content: \" \";\r\n    width: 0;\r\n    left: 0;\r\n    position: absolute;\r\n    top: 35px;\r\n    width: 100%;\r\n    z-index: 0;\r\n    border-bottom: 1px solid #354049;\r\n}\r\n.collor-bottom-one {\r\n    position: relative;\r\n}\r\n.collor-bottom-one:before {\r\n    content: \" \";\r\n    width: 1px;\r\n    left: 0;\r\n    position: absolute;\r\n    top: -12px;\r\n    width: 100%;\r\n    z-index: 0;\r\n    border-bottom: 1px solid #dedddd;\r\n}\r\n.collor-bottom-two {\r\n    position: relative;\r\n}\r\n.collor-bottom-two:before {    \r\n    content: \" \";\r\n    width: 1px;\r\n    left: 0;\r\n    position: absolute;\r\n    top: -16px;\r\n    width: 100%;\r\n    z-index: 0;\r\n    border-bottom: 1px solid #EEEEEE;\r\n}\r\n/* Button */ \r\n\r\n.btn-default:hover {\r\n     background-color: #0fb4e0;\r\n    transition-duration: 0.5s;\r\n}\r\n.unicod-btn {\r\n    color: #ffffff;\r\n    padding: 8px 30px;\r\n    background: #F5F7F9;\r\n    font-weight: 500;\r\n    border: none;\r\n    text-transform: uppercase;\r\n    text-shadow: none;\r\n    transition-duration: 0.5s;\r\n}\r\n.scroll {\r\n    height: 370px;\r\n    overflow: scroll;\r\n    overflow-x: hidden;\r\n}\r\n.nav-tabs-custom>.nav-tabs>li.active>a, .nav-tabs-custom>.nav-tabs>li.active:hover>a{background-color: #1f4d6b; color: #fff;}\r\n.nav-tabs-custom>.nav-tabs>li{    border-top: 0px solid transparent;}\r\n.nav-tabs-custom {   box-shadow: 0px 0px; background:none;     border-radius: 3px;}\r\n.nav-tabs-custom>.tab-content{background: none;}\r\n\r\n.more-less {\r\n    float: right;\r\n    color: #212121;\r\n}\r\n/* Scroll To Top */\r\n#scrollUp {\r\n    bottom: 10px;\r\n    right: 10px;\r\n    padding: 8px 10px;\r\n    background-color: #0FB4E0;\r\n}\r\n#scrollUp:before {\r\n    content: \"\\F01B\";\r\n    font-family: FontAwesome;\r\n    font-size: 24px;\r\n    color: #ffffff;\r\n    padding-top: 7px;\r\n}\r\n\r\n/* ========== 4.  Header css ========== */\r\n\r\n.navbar-default {\r\n  background-color: #084C61;\r\n  border-color: #084C61;\r\n}\r\n.navbar-inverse {\r\n  background-color: #084C61;\r\n  border-color: #084C61;\r\n}\r\n.main-header .navbar-default .navbar-nav>li>a:focus, \r\n.main-header .navbar-default .navbar-nav>li>a:hover {\r\n    /*color: #0FB4E0;*/\r\n    border-radius: 5px;\r\n    transition-duration: 0.5s;\r\n}\r\n.navbar-default .navbar-nav > li > a {\r\n    color: #ffffff;\r\n    font-weight: 600;\r\n    font-size: 15px;\r\n    line-height: 26px;\r\n}\r\n\r\n\r\n/*============= 5.  Main slider css =================*/ \r\n#unicod-slider {\r\n  position: relative;\r\n  overflow: hidden;\r\n  height:400px;\r\n}\r\n#unicod-slider .single-slider {\r\n  background-size: cover;\r\n  background-position: center center;\r\n  background-repeat: no-repeat;\r\n  position: relative;\r\n  height:400px;\r\n}\r\n\r\n.single-slider:before {\r\n    content: \"\";\r\n    position: absolute;\r\n    left: 0;\r\n    top: 0;\r\n    z-index: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background: rgba(0, 0, 0, 0.5);\r\n  }\r\n#unicod-slider .slide-text {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flax;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n  -ms-flex-direction: column;\r\n  flex-direction: column;\r\n  -webkit-box-pack: center;\r\n  -ms-flex-pack: center;\r\n  justify-content: center;\r\n  width: 100%;\r\n  height:400px;\r\n}\r\n#unicod-slider .slide-text .slider-inner {\r\n  padding: 20px;\r\n  border-radius: 10px;\r\n  vertical-align: middle;\r\n  margin-top: 83px; \r\n}\r\n#unicod-slider .slide-text span {\r\n  color: #ffffff;\r\n  display: block;\r\n  font-size: 18px;\r\n  font-weight: 400;\r\n  letter-spacing: 10px;\r\n  line-height: 30px;\r\n  padding-bottom: 10px;\r\n  position: relative;\r\n  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.75);\r\n  text-transform: uppercase;\r\n}\r\n#unicod-slider .slide-text h1 {\r\n    color: #fff;\r\n    font-size: 38px;\r\n    font-weight: 600;\r\n    line-height: 65px;\r\n    text-transform: uppercase;\r\n    letter-spacing: 1px;\r\n}\r\n#unicod-slider .slide-text strong {\r\n  color: #0fb4e0;\r\n  font-weight: 600;\r\n  font-size: 48px;\r\n}\r\n#unicod-slider .slide-text p {\r\n  color: #ffffff;\r\n  font-size: 17px;\r\n  margin-bottom: 35px;\r\n  line-height: 29px;\r\n  text-shadow : 1px 1px 0 rgba(0,0,0,.75);\r\n}\r\n#unicod-slider .slide-button .button {\r\n  color: #fff;\r\n  margin: 0 10px 0 0;\r\n  position: relative;\r\n  background: #0FB4E0;\r\n  padding: 8px 30px;\r\n  overflow: hidden;\r\n  font-size:16px;\r\n  font-weight: 400;\r\n  z-index: 3;\r\n  border-radius: 3px;\r\n  text-transform:capitalize;\r\n  transition-duration: 0.5s;\r\n}\r\n#unicod-slider .slide-button .button.primary {\r\n  background: rgba(29, 38, 44, 0.42);\r\n  border: 1px solid #ddd;\r\n  transition-duration: 0.5s;\r\n}\r\n#unicod-slider .slide-button .button.primary:before {\r\n  background:#252525;\r\n  transition-duration: 0.5s;\r\n}\r\n#unicod-slider .slide-button .button.primary:hover {\r\n  border-color: transparent;\r\n  background:#2A363F;\r\n  transition-duration: 0.5s;\r\n}\r\n#unicod-slider .slide-button .button:last-child {\r\n  margin-right:0px;\r\n}\r\n\r\n/*-- Slider Button --*/\r\n#unicod-slider .owl-nav div {\r\n  position: absolute;\r\n  top: 55%;\r\n  background: transparent;\r\n  color: #ffffff;\r\n  width: 42px;\r\n  height: 42px;\r\n  line-height: 38px;\r\n  padding: 0;\r\n  border-radius:0px;\r\n  opacity: 1;\r\n  margin: -18px 0 0;\r\n  font-size: 30px;\r\n  background: #0FB4E0;\r\n  transition-duration: 0.5s;\r\n}\r\n#unicod-slider .owl-nav div:hover {\r\n  border-color:transparent;\r\n  opacity:1;\r\n}\r\n#unicod-slider .owl-nav .owl-prev {\r\n  left: -100px;\r\n}\r\n#unicod-slider:hover .owl-nav .owl-prev {\r\n  left:0px;\r\n}\r\n#unicod-slider .owl-nav .owl-next {\r\n  right:-100px;\r\n}\r\n#unicod-slider:hover .owl-nav .owl-next {\r\n  right:0px;\r\n}\r\n\r\n/*-- Slider Dots --*/\r\n#unicod-slider .owl-dots {\r\n  position: absolute;\r\n  left: 50%;\r\n  margin-left: -25px;\r\n  bottom: 0px;\r\n}\r\n#unicod-slider .owl-dots .owl-dot {\r\n  display: inline-block;\r\n  margin-bottom: 10px;\r\n}\r\n#unicod-slider .owl-dots .owl-dot span {\r\n  width: 12px;\r\n  height: 12px;\r\n  display: block;\r\n  border-radius: 50%;\r\n  transition-duration: 0.5s;\r\n}\r\n#unicod-slider .owl-dots .owl-dot.active span {\r\n  position:relative;\r\n  transition-duration: 0.5s;\r\n}\r\n#unicod-slider .owl-dots .owl-dot.active span::before {\r\n  position: absolute;\r\n  left: 50%;\r\n  content: \"\";\r\n  bottom: 0px;\r\n  border-bottom: 20px solid #2A363F;\r\n  border-right: 20px solid transparent;\r\n  z-index: 4;\r\n  border-left: 20px solid transparent;\r\n  margin-left: -20px;\r\n  bottom: -24px;\r\n  transition-duration: 0.5s;\r\n}\r\n#unicod-slider .owl-dots .owl-dot:hover span{\r\n  border-color:transparent;\r\n} \r\n#unicod-slider .owl-dots .owl-dot.active span{\r\n  border-color:transparent;\r\n}\r\n/*-- Slider Animation --*/\r\n#unicod-slider .slide-text{ \r\n  -webkit-animation-duration: 0.7s; \r\n          animation-duration: 0.7s;\r\n  -webkit-animation-delay: 0.2s;\r\n          animation-delay: 0.2s;\r\n  \r\n}\r\n\r\n.unicod-pricing-fild {\r\n    background-color: #f5f7f9;\r\n    padding: 60px 0 70px !important;\r\n}\r\n.unicod-section-title-one > h3 {\r\n   color: #2a363f;\r\n    margin-top: 20px;\r\n    font-style: italic;\r\n}\r\n.unicod-pricing-fild .pricing-tabile {\r\n    background: #ffffff none repeat scroll 0 0;\r\n    margin-bottom: 30px;\r\n    position: relative;\r\n    border: 1px solid #2a363f;\r\n}\r\n.pricing-tabile img {\r\n  border-bottom: 1px solid;\r\n  height: 50px;\r\n  margin-top: 37px;\r\n}\r\n.pricing-tabile-col.pull_center {\r\n    padding-bottom: 15px;\r\n}\r\n.tabile {\r\n    padding: 0 !important;\r\n  }  \r\n  .unicod-pricing-fild .pricing-tabile h2 {\r\n    color: #ffffff;\r\n    font-size: 26px;\r\n    padding: 5px 0 15px;\r\n    text-transform: capitalize;\r\n  }\r\n  .unicod-pricing-fild .pricing-tabile h4 {\r\n    border-top: 1px solid #eeeeee;\r\n    color: #2a363f;\r\n    font-weight: 500;\r\n    padding-top: 13px;\r\n    text-transform: capitalize;\r\n  }\r\n  .unicod-pricing-fild .pricing-tabile .icon {\r\n      padding: 20px 0;\r\n      background-color: red;\r\n      color: #ffffff;\r\n  }\r\n  .unicod-pricing-fild .pricing-tabile span {\r\n    color: #2a363f;\r\n    font-size: 50px;\r\n    margin-bottom: 10px;\r\n  }\r\n  .unicod-pricing-fild .pricing-tabile ul {\r\n      margin-bottom: 20px;\r\n  }\r\n  .unicod-pricing-fild .pricing-tabile ul li {\r\n      border-bottom: 1px solid #aeafbb;\r\n      color: ##292a2d;\r\n      padding: 8px 20px;\r\n      font-size: 15px;\r\n      line-height: 27px;\r\n      font-weight: 300;\r\n  }\r\n.unicod-pricing-fild .pricing-tabile ul li:last-child {\r\n    border-bottom: 0px;\r\n}\r\n  /*=========== 18. Footer css ============*/\r\n.unicod-footer {\r\n   position: relative;\r\n  right: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  padding: 1rem;\r\n  background-color: #efefef;\r\n}\r\n.login-service{ padding:10% 0px;}\r\n.unicod-footer.bg-style {\r\n  background: #084C61 none repeat scroll 0 0;\r\n  padding: 2px 0;\r\n  border-top:1px solid #084C61;\r\n}\r\n\r\n/* padding */\r\n.unicod-footer-col {\r\n    margin-bottom: 30px !important;\r\n}\r\n.unicod-footer-col-tag {\r\n  margin-bottom: 30px !important;\r\n}\r\n.unicod-footer .unicod-footer-col img {\r\n  height: 50px;\r\n  width: 170px;\r\n}\r\n.unicod-footer .unicod-footer-col h3 {\r\n  color: #fff;\r\n  font-weight: 700;\r\n  margin-bottom: 40px;\r\n  text-transform: capitalize;\r\n  font-size: 24px;\r\n}\r\n.unicod-footer .unicod-footer-socila-col p {\r\n  color: #a1acb5;\r\n  margin-bottom: 15px;\r\n  margin-top: 10px;\r\n  padding-bottom: 22px;\r\n}\r\n.unicod-footer .unicod-footer-col h4 {\r\n    color: #758590;\r\n}\r\n\r\n.unicod-footer-social a i {\r\n  border: 1px solid #a1acb5;\r\n  border-radius: 5px;\r\n  color: #a1acb5;\r\n  font-size: 16px;\r\n  height: 35px;\r\n  line-height: 35px;\r\n  text-align: center;\r\n  width: 35px;\r\n  margin-right: 10px;\r\n    transition-duration: 0.5s;\r\n}\r\n.unicod-footer-social a i:hover {\r\n    color: #fff;\r\n    background: #191919;\r\n    transition-duration: 0.5s;\r\n\r\n}\r\n.unicod-footer-social a {\r\n  color: #ffffff;\r\n  }\r\n\r\n.unicod-footer-col-tag > h3 {\r\n  color: #fff;\r\n  font-weight: 700;\r\n  margin-bottom: 40px;\r\n  font-size: 24px;\r\n}\r\n.unicod-footer-link.clearfix > ul {\r\n  padding: 0;\r\n}\r\n.unicod-footer-col-tag a {\r\n    float: left;\r\n    border-radius: 5px;\r\n    border: 1px solid #a1acb5;\r\n    margin-right: 5px;\r\n    margin-bottom: 5px;\r\n    color: #a1acb5;\r\n    transition-duration: 0.5s;\r\n}\r\n.unicod-footer-col-tag a:hover {\r\n    color: #fff;\r\n    background: #191919;\r\n    transition-duration: 0.5s;\r\n\r\n}\r\n.unicod-footer-col-tag .unicod-btn-hov-right {\r\n    padding: 5px 20px;\r\n}\r\n.unicod-footer-col-tag .unicod-btn-hov-right:before {\r\n    background: #CC935C;\r\n}\r\n.tag-group.clearfix {\r\n  margin-bottom: 30px;\r\n}\r\n.unicod-footer-link h4 {\r\n    color: #ffffff !important;\r\n    font-size: 22px;\r\n    font-weight: 400;\r\n    line-height: 33px;\r\n    margin-bottom: 18px;\r\n}\r\n.unicod-footer-link ul li {\r\n  border-bottom: 1px solid #a1acb5;\r\n  margin-bottom: 12px;\r\n  padding-bottom: 7px;\r\n}\r\n.unicod-footer-link ul li a {\r\n    color: #a1acb5;\r\n    font-weight: 300;\r\n    transition: all 0.3s ease-in-out;\r\n}\r\n.unicod-footer-link ul li a:hover {\r\n    color:#b7c1cb;\r\n    transition: all 0.3s ease-in-out;\r\n}\r\n\r\n.unicod-flickr {\r\n    margin-bottom: 15px;\r\n}\r\n.unicod-flickr .thumb img {\r\n    border-radius: 5px;\r\n    width: 75px;\r\n    height: 75px;\r\n    border: 1px solid #a1acb5;\r\n}\r\n.unicod-flickr .thumb {\r\n    position: relative;\r\n    float: left;\r\n    margin-bottom: 10px;\r\n    margin-right: 10px;\r\n}\r\n\r\n.unicod-flickr .unicod-mar-l10 {\r\n    margin-left: 0;\r\n}\r\n.unicod-flickr .unicod-mar-r10 {\r\n    margin-right: 10px;\r\n}\r\n.unicod-flickr .thumb .overlay {\r\n  background-color: rgba(0, 0, 0, 0.8);\r\n  bottom: 0;\r\n  border-radius: 5px;\r\n  left: 0;\r\n  position: absolute;\r\n  right: 0;\r\n  text-align: center;\r\n  top: 0;\r\n  -webkit-transform: scale(0);\r\n          transform: scale(0);\r\n   transition: all 0.4s ease-in-out 0s;\r\n}\r\n.unicod-flickr .thumb:hover .overlay {\r\n    -webkit-transform: scale(1);\r\n            transform: scale(1);\r\n}\r\n.unicod-flickr .thumb .overlay i {\r\n    color: #ffffff;\r\n    font-size: 20px;\r\n    margin-top: 40%;\r\n}\r\n.upper {\r\n    color: #FFFFFF;\r\n    margin: 0;\r\n}\r\n/*copy right start*/\r\n\r\n.form-control{\r\n  border-radius:0px !important;\r\n  font-size:13px;\r\n}\r\n.table_text tr td{\r\n    border: 1px solid #ccc;\r\n\theight:45px;\r\n\ttext-align:center;\r\n}\r\n.table_form .form-control{\r\n  border-radius:0px !important;\r\n  border:0px;\r\n}\r\n.table_form tr td input:focus{\r\n  outline: 1px solid #0099e5!important;\r\n  \r\n}\r\n.gsttable .table-condensed>tbody>tr>td, .table-condensed>tbody>tr>th, .gsttable .table-condensed>tfoot>tr>td, .gsttable .table-condensed>tfoot>tr>th { padding:0px!important;}\r\n.tbbgcolor input.form-control{ background:#e4e40a6b;}\r\n.table-condensed>thead>tr>th{\r\n  color:#161616;\r\n  font-size:13px;\r\n  padding:8px 13px;\r\n  font-weight:600;}\r\n.modal-header{\r\n  border-bottom:0px;\r\n}\r\n.headsummary{color:#333; padding:10px 0px 1px 0px;  font-weight:bold;}\r\n.modal-text{\r\n color:#0e4d6c !important;\r\n}\r\n\r\n\r\n.section-salect{\r\n padding:60px 0px 50px 0px;\r\n}\r\n.section-form{\r\n padding:8px 0px 5px 0px;\r\n}\r\n\r\n\r\n.btn-link:hover {\r\n text-decoration:none;\r\n}\r\n\r\n\r\n.section-user{\r\n  padding:5px 0px 10px 0px;\r\n}\r\n.section-table{\r\n  padding:0px 0px 40px 0px;\r\n}\r\n.btn{border-radius: 0px;}\r\n\r\n.unicod-copyright p {\r\n    color: #ffffff;\r\n    padding: 10px;\r\n}\r\n.unicod-copyright ul {\r\n    float:right;\r\n}\r\n.unicod-copyright ul li {\r\n    float:left;\r\n    padding: 10px;\r\n}\r\n.unicod-copyright ul li a {\r\n    color: #ffffff;\r\n}\r\n.Copyright span {\r\n  color: #0FB4E0;\r\n  margin-bottom: 10px;\r\n}\r\n.btn-primary{\r\n    background: #0e4d6c!important;\r\n    color: #ffffff;\r\n    border-color:  #0e4d6c!important;\r\n}\r\n/* .preloader-dot-loading .cssload-loading i {\r\n    background: #488fe1 !important;\r\n} */\r\n\r\n.modal-dialog{\r\n margin:14% auto;\r\n}\r\n\r\n.section-top-10{\r\n  margin-top:10px;\r\n}\r\n.section-top-20{\r\n  margin-top:20px;\r\n}\r\n.section-top-30{\r\n  margin-top:30px;\r\n}\r\n.section-top-40{\r\n  margin-top:40px;\r\n}\r\n.section-top-50{\r\n  margin-top:50px;\r\n}\r\n.section-top-60{\r\n  margin-top:60px;\r\n}\r\n.section-top-70{\r\n  margin-top:70px;\r\n}\r\n.section-top-80{\r\n  margin-top:80px;\r\n}\r\n.section-top-90{\r\n  margin-top:90px;\r\n}\r\n.section-top-100{\r\n  margin-top:100px;\r\n}\r\n\r\n.section-bottom-10{\r\n  margin-bottom:10px;\r\n}\r\n.section-bottom-20{\r\n  margin-bottom:20px;\r\n}\r\n.section-bottom-30{\r\n  margin-bottom:30px;\r\n}\r\n.section-bottom-40{\r\n  margin-bottom:40px;\r\n}\r\n.section-bottom-50{\r\n  margin-bottom:50px;\r\n}\r\n.section-bottom-60{\r\n  margin-bottom:60px;\r\n}\r\n.section-bottom-70{\r\n  margin-bottom:70px;\r\n}\r\n.section-bottom-80{\r\n  margin-bottom:80px;\r\n}\r\n.section-bottom-90{\r\n  margin-bottom:90px;\r\n}\r\n.section-bottom-100{\r\n  margin-bottom:100px;\r\n}\r\n.gst_logo{\r\n color:#333333;\r\n font-size:36px;\r\n font-weight:bold;\r\n}\r\n.user_profile{\r\n padding-top:10px;\r\n}\r\n.user_profile label{\r\n padding-top:5px;\r\n font-size:16px;\r\n}\r\n.user_profile div ul li a i{\r\n padding:0px 15px 0px 5px;\r\n}\r\n/* changes in css */\r\n.unicod-copyright {\r\n}\r\n.Copyright span {\r\n  color: #0FB4E0;\r\n  margin-bottom: 10px;\r\n}\r\n.preloader-dot-loading .cssload-loading i {\r\n    background: #488fe1 !important;\r\n}\r\n.navbar{\r\n    border-radius: 0px !important;\r\n}\r\n.nav-tabs > li.active > a, .nav-tabs > li.active > a:focus, .nav-tabs > li.active > a:hover{ border-bottom:solid 3px #0e4d6c;}\r\n.work-border-right{border-right:solid 1px #999999; }\r\n.well-work{ padding:30px 0px 30px 0px;}\r\n.well-work-in{ padding:20px 0px 20px 0px;}\r\n.work-success{ background:#0e4d6c; color:#FFFFFF;}\r\n/*.dropdown-menu>li>a{\r\n   border-bottom:1px #666666 solid;\r\n}*/\r\n    /*table body */\r\n\r\n.text-invoice{\r\n  color:#080808;\r\n  font-size:22px;\r\n  font-weight:600;\r\n}\r\n.fixed-column{\r\n\twidth: 100px;\r\n    position: absolute;\r\n    /*top: 0;*/\r\n    right: 90px;\r\n    margin-right:15px;\r\n}\r\n\r\n.table-wrapper{\r\n    overflow-x: auto;\r\n    overflow-y: hidden;\r\n    margin: 0;\r\n    width: calc(100% - 98px);\r\n}\r\n.table_form tr td input:focus{\r\n\toutline: 1px solid #0099e5!important;\r\n}\r\n.modal-sm{\r\n    width: 24%!important;\r\n}.modal-lg{\r\n    width: 68%!important;\r\n}\r\n.main-header .logo{height: 55px;}\r\n.text-gst h3{ color:#0e4d6c; font-weight:bold;}\r\n.text-gst p{ color:#000000; padding-top:30px;}\r\n.text-gst ul li{ color:#000000; font-size:13px;}\r\n.table{ margin-bottom: 0px;}\r\n.table>thead>tr>th{ background:#475f82; color: #ffffff; text-align: center;}\r\n.dropdown-menu > li > a{ padding:6px 12px;}\r\n.dropdown-menu > li > a:focus, .dropdown-menu > li > a:hover{ background:#acb9c4;}\r\n.dropdown-menu {\r\n    background-clip: padding-box;\r\n    background-color: #fff;\r\n    display: none;\r\n  padding:0px 0px;\r\n    float: left;\r\n    font-size: 14px;\r\n    left: 16px;\r\n    list-style: outside none none;\r\n    margin: 2px 0 0;\r\n    min-width: 100%;\r\n    position: absolute;\r\n    text-align: left;\r\n    top: 100%;\r\n    z-index: 1000;\r\n}\r\n.modal-header{\r\n    padding: 15px 15px 0px 15px;\r\n}\r\n.invoice label{color:#080808; font-size: 14px; font-weight:500;}\r\n\r\n.fixhr{ border-bottom:1px solid #999999; margin:0 2% 20px 2%;}\r\n.alert-success {\r\n    color: #000000;\r\n    background-color: rgba(67, 77, 95, 0.15);\r\n    border-color: #d6e9c6;\r\n}\r\n.color-1{ background:#8fa6cc; color:#FFFFFF;}\r\n.color-2{ background:#21c2f8; color:#FFFFFF;}\r\n.color-3{ background:#ff6569; color:#FFFFFF;}\r\n.color-4{ background:#2c4653; color:#FFFFFF;}\r\n.nav>li{ text-align: center;}\r\n.tabcolor{background:#8fa6cc; color:#FFFFFF;padding:11px 0px 3px 0px; font-weight: 600px; text-align: center; margin-bottom: 10px;}\r\n.navbar-default {\r\n    padding: 5px 14px 0px 14px;}\r\n.navbar-nav li a{ margin-bottom:1px!important;}\r\n.nav-tabs-custom>.nav-tabs>li.active>a, .nav-tabs-custom>.nav-tabs>li.active:hover>a{background-color: #1f4d6b; color: #fff;}\r\n.nav-tabs-custom>.nav-tabs>li{    border-top: 0px solid transparent;}\r\n.nav-tabs-custom {   box-shadow: 0px 0px;     border-radius: 3px;}\r\n.admintext{ font-size: 16px!important; font-weight: bold; padding-top: 10px;}\r\n.navuser{ margin-top: 12px;}\r\n.text-primary{font-size: 25px;vertical-align:middle; padding-top: 5px;}\r\n\r\n.navbar-default .navbar-nav>li>a{ color: #ffffff!important;}\r\n.navbar-header-gst .navbar-nav>li>a{ line-height: 12px!important;}\r\n.gstlogout{ color: #ffffff; cursor: pointer; padding: 20px;}\r\n.gstlogout i{margin-top: 15px;}\r\n.gstlogout:hover{color: #ffffff;}\r\n.user_profile b{text-align: right!important;}\r\n\r\n\r\n#accordion .panel-heading { padding: 0;}\r\n#accordion .panel-title > a {\r\n\tdisplay: block;\r\n\tpadding: 0.4em 0.6em;\r\n    outline: none;\r\n    /*font-weight:bold;*/\r\n    text-decoration: none;\r\n}\r\n\r\n#accordion .panel-title > a.accordion-toggle::before, #accordion a[data-toggle=\"collapse\"]::before  {\r\n    content:\"\\E113\";\r\n    float: right;\r\n    font-family: 'Glyphicons Halflings';\r\n\t/*margin-right :1em;*/\r\n}\r\n#accordion .panel-title > a.accordion-toggle.collapsed::before, #accordion a.collapsed[data-toggle=\"collapse\"]::before  {\r\n    content:\"\\E114\";\r\n}\r\n\r\n@media screen and (max-width 768px){\r\n.navbar-nav li a span{\r\n  display:block;\r\n  font-size:10px;\r\n  color:#FFFFFF;\r\n  position:relative!important;\r\n  text-align: center!important;\r\n  bottom:0px;\r\n}\r\n}\r\n\r\n@media(min-width:767px) {\r\n    .navbar {\r\n        padding: 1px 0;\r\n        transition: background .5s ease-in-out,padding .5s ease-in-out;\r\n    }\r\n\r\n    .top-nav-collapse {\r\n        padding: 5px;\r\n    }\r\n    .header_top_nav{ width:100%; margin-left:none;}\r\n  .table-responsive{ width:100%; border:none;}\r\n\r\n    /* Registration start*/\r\n  \r\n\r\n/* .img\r\n{\r\n    transition-delay: 500s;\r\n    visibility: hidden;\r\n} */\r\n\r\n\r\n\r\n}", ""]);

// exports


/***/ }),

/***/ "../../node_modules/css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "../../node_modules/style-loader/addStyles.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/styles.css");


/***/ })

},[5]);
//# sourceMappingURL=styles.bundle.js.map