$(function() {

  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $("#togglerCollapse").click();
        $("#component").click();
        $('html, body').animate({
          scrollTop: (target.offset().top - 60)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });




  $.fn.scrollToTop = function() {
    $(this).hide().removeAttr("href");
    if ($(window).scrollTop() > "250") $(this).fadeIn("slow")
    var scrollDiv = $(this);
    $(window).scroll(function() {
      if ($(window).scrollTop() <= "250") $(scrollDiv).fadeOut("slow")
      else $(scrollDiv).fadeIn("slow")
    });
    $(this).click(function() {
      $("html, body").animate({ scrollTop: 0 }, "slow")
    })
  }

});


$(function() {
  $('#themes').click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow")
  })
});
$(function() {
  $("#go-top").scrollToTop();
});

$(function() {

  var $button = $("<div id='source-button' class='btn btn-primary btn-xs' data-toggle='tooltip' data-placement='top' title='Исходники jQuery'>&lt; &gt;</div>").click(function() {
    var html = $(this).parent().html();
    html = cleanSource(html);
    $("#source-modal pre").text(html);
    $("#source-modal").modal();
    copyButtom();
  });


  $(".bs-component").hover(function() {
    //console.log('bs-component.hover');
    $(this).append($button);
    $button.show();
    $('#source-button [data-toggle="tooltip"]').tooltip();

  }, function() {
    $button.hide();
  });

  function cleanSource(html) {
    html = html.replace(/×/g, "&times;")
      .replace(/«/g, "&laquo;")
      .replace(/»/g, "&raquo;")
      .replace(/←/g, "&larr;")
      .replace(/ _ngcontent-c[\d]*=\"\"/g, "")
      .replace(/ ng-reflect-[a-z-]*="[a-zA-Z\[\] -]*"/g, "")
      .replace(/→/g, "&rarr;");

    var lines = html.split(/\n/);

    lines.shift();
    lines.splice(-1, 1);

    var indentSize = lines[0].length - lines[0].trim().length,
      re = new RegExp(" {" + indentSize + "}");

    lines = lines.map(function(line) {
      if (line.match(re)) {
        line = line.substring(indentSize);
      }

      return line;
    });

    lines = lines.join("\n");

    return lines;
  }
  $('[data-toggle="popover"]').popover({ trigger: 'focus' });
  $('[data-toggle="tooltip"]').tooltip()

  function copyButtom() {
    var button = document.getElementById('copyButton');
    button.addEventListener('click', function() {
      var ta = document.getElementById('pre');
      var range = document.createRange();
      range.selectNode(ta);
      window.getSelection().addRange(range);
      try {
        document.execCommand('copy');
      } catch (err) {
        console.log('Can`t copy, boss');
      }
      window.getSelection().removeAllRanges();
    });
  }
});
