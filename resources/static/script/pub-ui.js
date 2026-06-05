
// 얼럿
function customAlert(title = "", message, type) {
  return new Promise((resolve) => {
    $(".alert-popup").remove();

    const $popup = $(`
      <section class="alert-popup" role="alertdialog" style="display: block;">
        <div class="dim"></div>
        <div class="popup" role="document" tabindex="-1" aria-modal="true" aria-labelledby="alert-title" aria-describedby="alert-desc">
          ${title ? `<div class="pop-header">
            <h2 class="alert-title">${title}</h2>
            <button type="button" class="btn-close" aria-label="닫기"></button>
          </div>
          ` : ''}
          <div class="pop-body">
            
            <div class="alert-txt">
              <p id="alert-desc">${message}</p>
            </div>
          </div>
          <div class="pop-footer">
            <div class="btn-wrap">
              ${
                type === "confirm"
                ? `<button type="button" class="btn-alert btn-white btn-cancel">취소</button>
                   <button type="button" class="btn-alert btn-blue btn-yes">확인</button>`
                : `<button type="button" class="btn-alert btn-blue btn-yes">확인</button>`
              }
            </div>
          </div>
        </div>
      </section>
    `); 

    $("body").append($popup);
    $popup.find(".popup").focus();

    $popup.on("click", ".btn-close, .btn-cancel", function () {
      $popup.remove();
      resolve(false);
    });

    $popup.on("click", ".btn-yes", function () {
      $popup.remove();
      resolve(true);
    });
  });
}


function gnbMenu(){

	if($('.gnb-menu-sub .wrapper .member-menu').length <= 0) $('.gnb-menu-sub .wrapper').append($('.header-menu .member-menu').clone())
	if($('.gnb-menu-sub .wrapper .gnb-menu').length <= 0) $('.gnb-menu-sub .wrapper').append($('.gnb-menu-wrap .gnb-menu').clone())
		$('.gnb-menu-sub .gnb-menu li').each(function(){
			if($(this).find('ul').length > 0 ) $(this).addClass('has-menu');
		});

	var webLoad = false;

	// gnbMenu
	var toggling = false;
	var obj = $('.gnb-menu-wrap .gnb-menu > li > .depth-wrap, .gnb-menu-sub .wrapper');
	var objShow = $('.gnb-menu-sub .wrapper');

	function slidein(){
		$(objShow).show();
	}
	function slideout(){
		$(obj).attr('style', '');
		$(obj).hide();
		$('.gnb-menu-wrap .gnb-menu > li').find('.on').removeClass('on');
	}

	function over(){
		//web - gnbOver
		$('.header').on('mouseover', function(e) {
      // obj = $('.gnb-menu-wrap .gnb-menu li ul');
			if($('.header .gnb-menu-wrap, .gnb-menu-sub ').has(e.target).length){
				clearTimeout(toggling);
				toggling = setTimeout(slidein, 300);
			}else{
				clearTimeout(toggling);
				toggling = setTimeout(slideout, 300);
			}
		});
		$('.header').on('mouseleave', function(e) {
			clearTimeout(toggling);
			toggling = setTimeout(slideout, 300);
		});
		$('.header .gnb-menu-wrap .gnb-menu > li > a').on('focus', function(e) {
			clearTimeout(toggling);
			toggling = setTimeout(slidein, 300);
		});
		$('.header .gnb-menu-wrap .gnb-menu > li:last-child .depth-wrap li:last-child a ').on('focusout', function(e) {
			clearTimeout(toggling);
			setTimeout(slideout, 300);
		});
		$('.main-search-wrap .main-search .search select ').on('keydown', function(e) {
			if(e.shiftKey && e.key == 'Tab') {
				slidein();
				setTimeout(function(){
					$('.header .gnb-menu-wrap .gnb-menu > li:last-child .depth-wrap li:last-child a ').focus()
				})
			}
		});

		var gnbItemTimer = null;
		$('.header .gnb-menu-wrap .gnb-menu > li > a').off('mouseover.gnbItem mouseleave.gnbItem focus.gnbItem');
		$('.header .gnb-menu-wrap .gnb-menu > li > a').on('mouseover.gnbItem focus.gnbItem', function(){
			clearTimeout(toggling);
			clearTimeout(gnbItemTimer);
			var $li = $(this).parent();
			gnbItemTimer = setTimeout(function(){
				$('.header .gnb-menu-wrap .gnb-menu > li > .depth-wrap').hide();
				$li.children('.depth-wrap').show();
			}, 200);
		});
		$('.header .gnb-menu-wrap .gnb-menu > li > a').on('mouseleave.gnbItem', function(){
			clearTimeout(gnbItemTimer);
		});
	}

	function init(){
    $('.header .gnb-menu-sub .gnb-menu li').removeClass('on');
    $('.header .gnb-menu-sub .gnb-menu .depth-wrap').removeAttr('style');
    $('.header .gnb-menu-sub .gnb-menu .depth-wrap ul').removeAttr('style');
    $('.header .gnb-menu-sub .wrapper').removeAttr('style');
		$('.header .gnb-menu-sub .menu-header .btn-close').click();
	}

	function webInit(){
		over();
		$('.gnb-menu-sub .has-menu').off('click');
		$('.gnb-menu-sub .gnb-menu .depth-wrap ul > li > ul').show();
		webLoad = true;
	}
	function mobileInit(){
		$('.header').off('mouseover');
		$('.header').off('mouseleave');
		$('.gnb-menu-sub .gnb-menu .depth-wrap').hide();
		//mobile sub menu
		$('.gnb-menu-sub .has-menu').off('click');
		$('.gnb-menu-sub .has-menu').on('click', function(e){
			e.stopPropagation();
			let $menu = $(this).children('.depth-wrap').length > 0 ? $(this).children('.depth-wrap') : $(this).children('ul')
			if($menu.is(':hidden')){
				$menu.stop().slideDown();
				$(this).addClass('on');
			}else{
				$menu.stop().slideUp(function(){
					$menu.find('ul').removeAttr('style');
					$menu.find('.on').removeClass('on');
				});
				$(this).removeClass('on');
			}
		});
	}


	if($(window).width() > 1023){
		webInit();
	}else{
		mobileInit();
	}

	 //mobile - left menu
	  $('.header .btn-m-menu').off();
		$('.header .btn-m-menu').on('click', function(){
      $('body, html').scrollTop(0);
      $('body, .wrap').css('overflow', 'hidden');
      $('.wrap').css('position', 'relative');
      $('.gnb-menu-sub').show();
      // $('.gnb-menu-wrap .menu-body').scrollTop(0);
      $('.gnb-menu-sub').stop().animate({
        left: "0",
      }, 250);
    });
  // close
  $('.gnb-menu-sub .btn-close').on('click', function(){
      $('.gnb-menu-sub').stop().animate({
        left: "-100%",
      }, 250, function() {
        setTimeout(function(){
          $('.gnb-menu-sub').hide();
          $('body, .wrap').css('overflow', '');
          // $('.wrap').attr('style', wrapstyle);
					$('.header .gnb-menu-sub').attr('style', '');
        }, 100)
      });

    });

	  var width = $(window).width(), height = $(window).height();
	  var resizeTimer;
	  $(window).resize(function(){
		if($(window).width() != width){
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function() {
				init();
				if($(window).width() > 1024){
					webInit();
				}else{
					mobileInit();
				}
			}, 100);
		}
		width = $(window).width(), height = $(window).height();
	  });
}

// loading
function loading(){
  const loadingHtml = `<div class="loading-bar">
		<div class="three-bounce">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
  </div>`

  const $loading = $(loadingHtml);  
  $('body').append($loading);  
  $('body, html').css('overflow', 'hidden');
}


function footerSite(){
  $(document).on('click', '.footer-site .site-toggle', function(){
    var $item = $(this).closest('.site-item');
    var $panel = $item.find('.site-panel');
    if($panel.is(':visible')){
      $panel.slideUp();
      $item.removeClass('on');
    }else{
      $('.footer-site .site-panel').slideUp();
      $('.footer-site .site-item').removeClass('on');
      $panel.slideDown(function(){
        if($(window).width() <= 1024){
          $('html, body').animate({ scrollTop: $panel.offset().top }, 300);
        }
      });
      $item.addClass('on');
    }
  });
  $(document).on('click', '.footer-site .site-panel .btn-close', function(){
    var $item = $(this).closest('.site-item');
    $item.find('.site-panel').slideUp();
    $item.removeClass('on');
  });

  $(window).on('resize.footerSite', function(){
    $('.footer-site .site-panel').removeAttr('style');
    $('.footer-site .site-item').removeClass('on');
  });
}

function lnbMenu(){
  $('.lnb-menu > li').each(function(){
    if($(this).find('ul').length > 0) $(this).addClass('has-menu');
  });

  $(document).off('click.lnbMenu').on('click.lnbMenu', '.lnb-menu > li > a', function(e){
    e.preventDefault();
    var $li = $(this).parent();
    var $sub = $li.find('.lnb-sub');
    if($sub.length){
      if($li.hasClass('on')){
        $sub.stop(true, false).slideUp(300, function(){
          $li.removeClass('on');
        });
      }else{
        $('.lnb-menu > li.on').each(function(){
          var $otherLi = $(this);
          $otherLi.find('.lnb-sub').stop(true, false).slideUp(300, function(){
            $otherLi.removeClass('on');
          });
        });
        $li.addClass('on');
        $sub.stop(true, false).slideDown(300);
      }
    }
  });
}

function snbMenu(){
  if($('.snb-menu').length === 0) return;

  // 자식 ul 이 있는 항목에 has-menu 자동 부여 (안전장치)
  $('.snb-menu > li').each(function(){
    if($(this).children('.lnb-sub').length > 0) $(this).addClass('has-menu');
  });

  // 초기 상태: .on 이 아닌 has-menu 의 서브는 닫힘 / .on 인 경우는 노출
  $('.snb-menu > li.has-menu').each(function(){
    if($(this).hasClass('on')){
      $(this).children('.lnb-sub').show();
    } else {
      $(this).children('.lnb-sub').hide();
    }
  });

  // 다른 1뎁스 li.on 닫기 헬퍼 (has-menu/leaf 모두 처리)
  function closeOthers($keep){
    $('.snb-menu > li.on').not($keep).each(function(){
      var $otherLi = $(this);
      var $otherSub = $otherLi.children('.lnb-sub');
      if($otherSub.length){
        $otherSub.stop(true, false).slideUp(300, function(){
          $otherLi.removeClass('on');
        });
      } else {
        $otherLi.removeClass('on');
      }
    });
  }

  // 1뎁스 has-menu 클릭: 아코디언 토글 (자기 자신 토글, 다른 메뉴 닫기)
  $(document).off('click.snbMenu').on('click.snbMenu', '.snb-menu > li.has-menu > a', function(e){
    e.preventDefault();
    var $li = $(this).parent();
    var $sub = $li.children('.lnb-sub');

    if($li.hasClass('on')){
      $sub.stop(true, false).slideUp(300, function(){
        $li.removeClass('on');
      });
    } else {
      closeOthers($li);
      $li.addClass('on');
      $sub.stop(true, false).slideDown(300);
    }
  });

  // 1뎁스 leaf(서브 없음) 클릭: 부모 li 에 on 이동
  $(document).off('click.snbMenuLeaf').on('click.snbMenuLeaf', '.snb-menu > li:not(.has-menu) > a', function(e){
    e.preventDefault();
    var $li = $(this).parent();
    if(!$li.hasClass('on')){
      closeOthers($li);
      $li.addClass('on');
    }
  });

  // 콘텐츠 패널 초기 상태: .on(1뎁스) 우선 → 그 안 .active(2뎁스) → 폴백 순서로 결정
  function getInitTabId(){
    var $onLi = $('.snb-menu > li.on').first();
    if($onLi.length){
      if($onLi.hasClass('has-menu')){
        // has-menu: 자식 .lnb-sub 안의 active 항목, 없으면 첫 항목
        var $subActive = $onLi.find('> .lnb-sub > li.active > a[data-tab-id]');
        if($subActive.length) return $subActive.data('tab-id');
        var $subFirst = $onLi.find('> .lnb-sub > li > a[data-tab-id]').first();
        if($subFirst.length) return $subFirst.data('tab-id');
      } else {
        // leaf: 자기 자신의 data-tab-id
        var $leafA = $onLi.children('a[data-tab-id]');
        if($leafA.length) return $leafA.data('tab-id');
      }
    }
    // 폴백: 전역 .active 또는 첫 번째 항목
    var $globalActive = $('.snb-menu .active > a[data-tab-id]');
    if($globalActive.length) return $globalActive.data('tab-id');
    return $('.snb-menu a[data-tab-id]').first().data('tab-id');
  }

  var initTabId = getInitTabId();
  if(initTabId){
    $('.snb-content-wrap .snb-content').hide();
    $('#' + initTabId).show();
  }

  // [data-tab-id] 클릭 시 active 갱신 + 매칭되는 .snb-content 전환
  $(document).off('click.snbTab').on('click.snbTab', '.snb-menu a[data-tab-id]', function(e){
    e.preventDefault();
    var tabId = $(this).data('tab-id');
    if(!tabId) return;

    // 메뉴 active 갱신 (전역에서 1개만 active)
    $('.snb-menu .active').removeClass('active');
    $(this).parent().addClass('active');

    // 콘텐츠 패널 토글
    $('.snb-content-wrap .snb-content').hide();
    $('#' + tabId).show();
  });

  // 모바일: .mo-snb-menu-btn 클릭 시 .snb-menu 토글
  $(document).off('click.snbMenuMo').on('click.snbMenuMo', '.mo-snb-menu-btn', function(e){
    e.preventDefault();
    var $btn = $(this);
    var $menu = $btn.closest('.snb-menu-wrap').find('> .snb-menu');
    if(!$menu.length) $menu = $btn.siblings('.snb-menu');
    if(!$menu.length) return;

    $btn.toggleClass('on');
    $menu.stop(true, false).slideToggle(250);
  });
}

// [data-toggle="targetId"] 버튼 클릭 시 #targetId 슬라이드 토글 + 버튼 on 클래스 토글
function dataToggle(){
  $(document).off('click.dataToggle').on('click.dataToggle', '[data-toggle]', function(e){
    e.preventDefault();
    var $btn = $(this);
    var targetId = $btn.attr('data-toggle');
    if(!targetId) return;
    var $target = $('#' + targetId);
    if(!$target.length) return;

    $btn.toggleClass('on');
    $target.stop(true, false).slideToggle(250);
  });
}

function drowmDown(){

  $(document).off('.dropdown');

  function closeLayer(){
    $('.menu-layer-open').remove();
  }

  function openLayer($dropdown){
    closeLayer();

    var $layer = $dropdown.find('.menu-layer');
    var $clone = $layer.clone(true).addClass('menu-layer-open').appendTo('body').show();
    $clone.data('dropdown', $dropdown);

    var offset = $dropdown.offset();
    var ddW = $dropdown.outerWidth();
    var ddH = $dropdown.outerHeight();
    var layerW = $clone.outerWidth();
    $clone.css({
      position: 'absolute',
      top: offset.top + ddH + 4,
      left: offset.left + (ddW / 2) - (layerW / 2),
      zIndex: 9999
    });
  }

  $(document).on('click.dropdown', '.dropdown > button.selected', function (e) {
    e.stopPropagation();
    var $dropdown = $(this).closest('.dropdown');

    if($('.menu-layer-open').length && $('.menu-layer-open').data('dropdown')[0] === $dropdown[0]){
      closeLayer();
    }else{
      openLayer($dropdown);
    }
  });

  $(document).on('click.dropdown', '.menu-layer-open button', function () {
    var $clone = $(this).closest('.menu-layer-open');
    var $dropdown = $clone.data('dropdown');
    var value = $(this).html();

    // 원본 menu-layer의 li에도 selected 반영
    var idx = $(this).closest('li').index();
    $dropdown.find('.menu-layer li').removeClass('selected');
    $dropdown.find('.menu-layer li').eq(idx).addClass('selected');

    $dropdown.find('.value').html(value);
    closeLayer();
  });

  $(document).on('click.dropdown', function (e) {
    if(!$(e.target).closest('.dropdown').length && !$(e.target).closest('.menu-layer-open').length){
      closeLayer();
    }
  });

  $(window).on('resize.dropdown scroll.dropdown', function(){
    var $clone = $('.menu-layer-open');
    if($clone.length){
      var $dropdown = $clone.data('dropdown');
      if($dropdown){
        var offset = $dropdown.offset();
        var ddW = $dropdown.outerWidth();
        var ddH = $dropdown.outerHeight();
        var layerW = $clone.outerWidth();
        $clone.css({
          top: offset.top + ddH + 4,
          left: offset.left + (ddW / 2) - (layerW / 2)
        });
      }
    }
  });

}

function dsToggle(){
    $(document).off('click.dsToggle').on('click.dsToggle', '.detail-search-wrap .ds-toggle', function(){
        var $toggle = $(this);
        var $body = $toggle.closest('.detail-search-wrap').find('.ds-body');
        var isOn = $toggle.hasClass('on');
        $toggle.toggleClass('on', !isOn);
        $toggle.attr('aria-expanded', !isOn);
        if(isOn){
            $body.stop(true, false).slideUp(250);
        }else{
            $body.stop(true, false).slideDown(250);
        }
    });
}

  function fileAdd(){
    let $wrap;
    $('.input-upload [data-id=file-upload]').on('click', function(){
      $wrap = $(this).parents('.input-upload');
      $wrap.find('input[type=file]').click();
    });
    $('.input-upload input[type=file]').on('change', function(){
      let v = $(this).val();
      $wrap.find('input[type=text]').val(v.split('fakepath\\')[1]);
      if(v) $wrap.find('.btn-del').show();
    });
  }

  // fileFind: .file-wrap 내부 <input type="file"> 의 onchange 로 호출
  //   선택된 파일명을 .file-list 의 <li> 로 추가
  function addFile(obj){
    let val = obj.value;
    let $list = $(obj).parents('.file-wrap').find('.file-list');
    let fileName = (val.split('fakepath\\')[1]) || val;
    $('<li>'+
      '<p>'+ fileName +'</p>'+
      '<button type="button" class="del" onclick="fileDel(this)" aria-label="파일 삭제"></button>'+
    '</li>').prependTo($list);
  }

  function fileDel(obj){
    $(obj).parents('li').remove();
  }

  // 전역 노출 (인라인 onclick/onchange 에서 접근 가능하도록)
  window.addFile = addFile;
  window.fileDel = fileDel;


  function inputDel(){
    if($('.inp-del').length <= 0) return;
    function f($self){
      let $input = $self.find('input');
      let $del = $('<a href="javascript:void(0);" style="display:none;" class="btn-del"></a>');
      $self.append($del);

      if($input.val()) $del.show();
      $input.on('keyup', function(){
        if($input.val().length > 0) $del.show()
        else $del.hide()
      });
      $del.on('click', function(){
        $input.val('');
        $del.hide();
      });
    }
    $('.inp-del').each(function(){
      f($(this));
    })
  }

  function tabEvt(){
    let tabs = [];
    $('[data-tab-id]').on('click', function(e){
      e.stopPropagation();
      let tabid = $(this).data('tab-id');

      tabs = [];
      tabs.push(tabid);

      $(this).parents('li').addClass('on');
      $(this).parents('li').siblings().find('[data-tab-id]').each(function(){
        $(this).parents('li').removeClass('on');
        tabs.push($(this).data('tab-id'));
      });

      tabs.forEach(function(v){
        $('#'+v).hide();
      });
      $('#'+tabid).show();

      if($(this).parents('.tab-condition').length > 0){
        let $selectd = $(this).parents('.tab-condition').find('.selected');
        $selectd.find('button').text($(this).text())
      }
    })

  }



// 팝업
let lastFocusedElement = null;

function popClose(popup){
  let $popup = $(popup);
  $popup.fadeOut();
  $('body, html').css('overflow', '');
  $('body').removeClass('pop-open');
  
  // 팝업을 닫을 때 원래 포커스 위치로 복귀
  if(lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

function popOpen(popup, callback){
  let $popup = $(popup);
  scrollPosition = $(window).scrollTop();
  
  // 팝업을 연 버튼 저장
  lastFocusedElement = document.activeElement;

  $popup.removeAttr('style');
  $popup.fadeIn();
  $('body, html').css('overflow', 'hidden');
  $('body').addClass('pop-open');
  
  // 팝업이 열린 후 첫 번째 포커스 가능한 요소로 포커스 이동
  setTimeout(() => {
    const focusableElements = $popup.find(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ).filter(':visible');
    if(focusableElements.length > 0) {
      focusableElements.first().focus();
    }
  }, 100);
  
  $popup.find('.btn-close').on('click', function(){
    popClose(popup);
  });

  // 포커스 트랩 설정
  setupFocusTrap($popup);

  if(callback) callback();
}

function setupFocusTrap($popup) {
  // 팝업 내부의 포커스 가능한 모든 요소 찾기
  const focusableElements = $popup.find(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ).filter(':visible');
  
  if(focusableElements.length === 0) return;
  
  const firstElement = focusableElements.first()[0];
  const lastElement = focusableElements.last()[0];
  
  // 기존 이벤트 제거 (중복 방지)
  $popup.off('keydown.focustrap');
  
  // 탭 키 이벤트 처리
  $popup.on('keydown.focustrap', function(e) {
    // Tab 키가 아니면 무시
    if(e.key !== 'Tab') return;
    
    // Shift + Tab (역방향)
    if(e.shiftKey) {
      if(document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } 
    // Tab (정방향)
    else {
      if(document.activeElement === lastElement) {
        e.preventDefault();
        // 마지막 요소에서 Tab을 누르면 팝업 닫기
        popClose('#' + $popup.attr('id'));
      }
    }
  });
  
  // ESC 키로 팝업 닫기
  $popup.off('keydown.escape');
  $popup.on('keydown.escape', function(e) {
    if(e.key === 'Escape') {
      popClose('#' + $popup.attr('id'));
    }
  });
}


function thumbProductEvt(){
	if($(window).width() <= 1024) return;
	if($(".product-description .product-images .images").length <= 0) return;
	let swiper = new Swiper('[data-evt=thumb-slider] .img-list', {
		speed:800,
		navigation: {
			nextEl: "[data-evt=thumb-slider] .swiper-button-next",
			prevEl: "[data-evt=thumb-slider] .swiper-button-prev",
		},
		slidesPerView: 'auto',
	});
	$(".product-description .product-images .images > img").imagezoomsl({
		zoomrange: [3, 3],
	});

	$('.product-description .product-images .img-list .swiper-slide a').on('click', function(){
		let $img = $(this).parents('.product-images').find('.images > img');
		$img.attr('src', $(this).find('img').attr('src'))
		$('.product-description .product-images .img-list .swiper-slide').removeClass('on');
		$(this).parents('.swiper-slide').addClass('on');
	});
}

function productSlider(){
	if($("[ data-evt=product-slider] .swiper-slide").length <= 0) return;
	let swiper = new Swiper('[data-evt=product-slider] .product-list', {
		speed:800,
		spaceBetween:16,
		navigation: {
			nextEl: "[data-evt=product-slider] .swiper-button-next",
			prevEl: "[data-evt=product-slider] .swiper-button-prev",
		},
		slidesPerView:1,
		slidesPerGroup:1,
		pagination: {
			el: "[data-evt=product-slider] .swiper-pagination",
			type: "fraction",
		},
		breakpoints: {
			641: {
				slidesPerView:2,
				slidesPerGroup:2,
			},
			1025: {
				slidesPerView:3,
				slidesPerGroup:3,
			}
		}
	});
}


  // DATE
  function datepicker(){
    if($(".datepicker").length <= 0) return;
    $(".datepicker").datepicker({
      showOn: 'focus', 
      dateFormat:"yy.mm.dd",
      changeYear:true,
      changeMonth:true,
      showMonthAfterYear:true,
      monthNames:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
      monthNamesShort:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
      dayNames:['일','월','화','수','목','금','토'],
      dayNamesShort:['일','월','화','수','목','금','토'],
      dayNamesMin:['일','월','화','수','목','금','토'],
      minDate: '',
      maxDate: '',
      // yearSuffix: '년',
      onClose: function( selectedDate ) {
        //add on event 
      }	,
      beforeShow: function(input, inst) {
        
        if($(input).data('min')) $(input).datepicker('option', 'minDate', $(input).data('min'));
        if($(input).data('max')) $(input).datepicker('option', 'maxDate', $(input).data('max'));
  
        setTimeout(function(){
          if($('.ui-datepicker-year option').text().indexOf('년') == -1) $('.ui-datepicker-year option').append('년')
        }, 10)
        },
        onChangeMonthYear: function(input, inst) {
        setTimeout(function(){
          if($('.ui-datepicker-year option').text().indexOf('년') == -1) $('.ui-datepicker-year option').append('년')
        }, 10)
        },
    });
  }


// ico-tooltip : $('.ico-tooltip').tooltip('내용')
function initTooltip() {
  $.fn.tooltip = function(msg) {
    return this.each(function() {
      $(this).data('tooltip', msg);
    });
  };

  $(document).on('click', '.ico-tooltip', function(e) {
    e.stopPropagation();
    $('.tooltip-box').remove();
    var msg = $(this).data('tooltip')
           || $(this).find('.sr-only').html()
           || $(this).closest('.tooltip-wrap').find('.sr-only').html();
    if (!msg) return;
    var offset = $(this).offset();
    var $box = $('<div class="tooltip-box on">'
      + '<button type="button" class="btn-tooltip-close"></button>'
      + '<p>' + msg + '</p>'
      + '</div>');
    $('body').append($box);
    var boxW = $box.outerWidth();
    var btnW = $(this).outerWidth();
    $box.css({
      top: offset.top + $(this).outerHeight() + 14,
      left: offset.left + (btnW / 2) - (boxW / 2)
    });
  });

  $(document).on('click', '.btn-tooltip-close', function(e) {
    e.stopPropagation();
    $(this).closest('.tooltip-box').remove();
  });

  $(document).on('click', function() {
    $('.tooltip-box').remove();
  });

  $(document).on('mouseenter', '.tooltip-wrap.st-hover', function() {
    $('.tooltip-box').remove();
    var msg = $(this).find('.sr-only').html();
    if (!msg) return;
    var $trigger = $(this);
    var offset = $trigger.offset();
    var $box = $('<div class="tooltip-box on"><p>' + msg + '</p></div>');
    $('body').append($box);
    var boxW = $box.outerWidth();
    var trigW = $trigger.outerWidth();
    $box.css({
      top: offset.top + $trigger.outerHeight() + 14,
      left: offset.left + (trigW / 2) - (boxW / 2)
    });
  });

  $(document).on('mouseleave', '.tooltip-wrap.st-hover', function() {
    $('.tooltip-box').remove();
  });
}


// 테이블 컬럼 정렬·필터 팝업 공통 처리
function initTableFilter() {
  // 팝업이 이미 생성된 경우 중복 방지
  if (document.getElementById('tbl-filter-popup')) return;

  var popup = document.createElement('div');
  popup.id = 'tbl-filter-popup';
  popup.className = 'tbl-filter-popup';
  popup.hidden = true;
  popup.innerHTML =
    '<p class="filter-popup-label">다음과 같음</p>' +
    '<input type="text" class="filter-popup-input" id="tbl-filter-input" placeholder="값 입력">' +
    '<div class="filter-popup-logic">' +
      '<label><input type="radio" name="filter-logic" value="none" checked> none</label>' +
      '<label><input type="radio" name="filter-logic" value="and"> and</label>' +
      '<label><input type="radio" name="filter-logic" value="or"> or</label>' +
    '</div>' +
    '<div class="filter-popup-btns">' +
      '<button type="button" class="btn-xsm btn-blue" id="btn-filter-apply">적용</button>' +
      '<button type="button" class="btn-xsm btn-white" id="btn-filter-clear">해제</button>' +
    '</div>';
  document.body.appendChild(popup);

  var activeBtn = null;

  function closePopup() {
    popup.hidden = true;
    if (activeBtn) { activeBtn.classList.remove('is-open'); activeBtn = null; }
  }

  document.addEventListener('click', function(e) {
    var filterBtn = e.target.closest('.btn-th-filter');
    if (filterBtn) {
      e.stopPropagation();
      if (activeBtn === filterBtn && !popup.hidden) { closePopup(); return; }
      closePopup();
      activeBtn = filterBtn;
      activeBtn.classList.add('is-open');
      popup.hidden = false;
      popup.dataset.field = filterBtn.dataset.field || '';
      document.getElementById('tbl-filter-input').value = filterBtn.dataset.filterValue || '';
      document.querySelector('input[name="filter-logic"][value="none"]').checked = true;
      var rect = filterBtn.getBoundingClientRect();
      popup.style.position = 'fixed';
      popup.style.top  = (rect.bottom + 4) + 'px';
      popup.style.left = rect.left + 'px';
      popup.style.zIndex = 1000;
      return;
    }
    if (!e.target.closest('#tbl-filter-popup')) closePopup();
  }, true);

  document.getElementById('btn-filter-apply').addEventListener('click', function() {
    if (!activeBtn) return;
    var val = document.getElementById('tbl-filter-input').value.trim();
    activeBtn.dataset.filterValue = val;
    activeBtn.classList.toggle('is-active', !!val);
    activeBtn.dispatchEvent(new CustomEvent('tablefilter:apply', {
      bubbles: true,
      detail: { field: popup.dataset.field, value: val }
    }));
    closePopup();
  });

  document.getElementById('btn-filter-clear').addEventListener('click', function() {
    if (!activeBtn) return;
    activeBtn.dataset.filterValue = '';
    activeBtn.classList.remove('is-active');
    activeBtn.dispatchEvent(new CustomEvent('tablefilter:clear', {
      bubbles: true,
      detail: { field: popup.dataset.field }
    }));
    closePopup();
  });
}


// btn-th-sort 가 있는 테이블은 자동으로 화살표 토글 처리
document.addEventListener('click', function (e) {
  var btn = e.target.closest('.btn-th-sort');
  if (!btn) return;
  var table = btn.closest('table');
  if (!table) return;
  var wasAsc  = btn.classList.contains('is-asc');
  var wasDesc = btn.classList.contains('is-desc');
  table.querySelectorAll('.btn-th-sort').forEach(function (b) {
    b.classList.remove('is-asc', 'is-desc');
  });
  if (!wasAsc && !wasDesc) btn.classList.add('is-asc');
  else if (wasAsc)          btn.classList.add('is-desc');
});


// ready
$(function(){
  function tryGnbMenu() {
    if ($('.gnb-menu-wrap').length) {
      gnbMenu();
    } else {
      setTimeout(tryGnbMenu, 50);
    }
  }
  tryGnbMenu();


  drowmDown();
  lnbMenu();
  snbMenu();
  dsToggle();
  dataToggle();
  tabEvt();
  inputDel();
  datepicker();
  initTooltip();
  initTableFilter();

  thumbProductEvt();
  productSlider();
  
});