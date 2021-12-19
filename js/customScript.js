$(document).ready(function() {

    // cart
    var cartCountValue = 0;
    var cartCount = $('.cart .count');
    $(cartCount).text(cartCountValue);

    $('.random-btn').on('click', function() {
        $('.cart').offset({
            top: getRndInteger(0, window.innerHeight - 100),
            left: getRndInteger(0, window.innerWidth - 100)
        });
    });

    $('.cart-btn').on('click', function() {
        var cartBtn = this;
        var cartCountPosition = $(cartCount).offset();
        var btnPosition = $(this).offset();
        var leftPos =
            cartCountPosition.left < btnPosition.left ?
            btnPosition.left - (btnPosition.left - cartCountPosition.left) :
            cartCountPosition.left;
        var topPos =
            cartCountPosition.top < btnPosition.top ?
            cartCountPosition.top :
            cartCountPosition.top;
        $(cartBtn)
            .append("<span class='count'>1</span>");

        $(cartBtn).find(".count").each(function(i, count) {
            $(count).offset({
                    left: leftPos,
                    top: topPos
                })
                .animate({
                        opacity: 0
                    },
                    function() {
                        $(this).remove();
                        cartCountValue++;
                        $(cartCount).text(cartCountValue);
                    }
                );
        });
    });

    /* Navbar toggler */
    const toggleBtn = document.querySelector(".navbar-toggler");
    const navbarNav = document.querySelector(".navbar-nav");
    const navCloseBtn = document.querySelector(".btn-nav-close");

    toggleBtn.addEventListener("click", () => {
        navbarNav.classList.toggle("active");
    });
    navCloseBtn.addEventListener("click", () => {
        navbarNav.classList.remove("active");
    });


    $('.form-group .label').click(function() {
        $('.label').removeClass("active");
        $(this).addClass("active");
    });




});

$(window).on('scroll', function() {
    const scrollValue = $(window).scrollTop();

    if (scrollValue > 140 && scrollValue < 200) {
        $('header').addClass('scrolled');
    } else if (scrollValue >= 200) {
        $('header').addClass('fixed');
    } else {
        $('header').removeClass('scrolled').removeClass('fixed');
    }
});

function switchVisible() {
    if (document.getElementById('Div1')) {

        if (document.getElementById('Div1').style.display == 'none') {
            document.getElementById('Div1').style.display = 'block';
            document.getElementById('Div2').style.display = 'none';
        } else {
            document.getElementById('Div1').style.display = 'none';
            document.getElementById('Div2').style.display = 'block';
        }
    }
}

function switchElements() {
    if (document.getElementById('Div3')) {

        if (document.getElementById('Div3').style.display == 'none') {
            document.getElementById('Div3').style.display = 'block';
            document.getElementById('Div4').style.display = 'none';
        } else {
            document.getElementById('Div3').style.display = 'none';
            document.getElementById('Div4').style.display = 'block';
        }
    }
}

//pop-up
$(".open_popup").click(function() {
    $(this).parent(".popup_main").children(".popup_body").addClass("popup_body_show");
});
$(".popup_close").click(function() {
    $(".popup_body").removeClass("popup_body_show");
});
$(".popup_back").click(function() {
    $(".popup_body").removeClass("popup_body_show");
});

$(".open_popup").click(function() {
    $("body").addClass("overlay");
});
$(".popup_close").click(function() {
    $("body").removeClass("overlay");
});
$(".popup_back").click(function() {
    $("body").removeClass("overlay");
});

// Accordion fillter
$('.accordion .title').each(function() {
    const el = $(this);
    el.on('click', function() {
        const elParent = el.closest('.accordion-section');
        const accordionContainer = elParent.closest('.accordion');
        const targetContent = elParent.find(' > .content');
        if (el.hasClass('active')) {
            targetContent.slideUp();
            el.removeClass('active');
            return;
        }

        if (accordionContainer.hasClass('all-open')) {
            targetContent.slideDown();
            el.addClass('active');
            return;
        }

        accordionContainer.find('> .accordion-section > .title').removeClass('active');
        accordionContainer.find('> .accordion-section > .content').slideUp();
        targetContent.slideDown();
        el.addClass('active');
    });
});

$('.accordion  input[type="checkbox"]').on('click', function(e) {
    e.stopPropagation();
})


// Accordion
$('.accordion .title').click(function() {
    const el = $(this);
    const elParent = el.closest('.accordion-card');
    const targetContent = elParent.find('.content');
    $('.accordion .title').removeClass('active');
    $('.accordion .accordion-card .content').slideUp();
    targetContent.slideDown();
    el.addClass('active');
});


//Quantity

const QtyInput = (function() {
    var $qtyInputs = $(".qty-input");

    if (!$qtyInputs.length) {
        return;
    }

    var $inputs = $qtyInputs.find(".product-qty");
    var $countBtn = $qtyInputs.find(".qty-count");
    var qtyMin = parseInt($inputs.attr("min"));
    var qtyMax = parseInt($inputs.attr("max"));

    $inputs.change(function() {
        var $this = $(this);
        var $minusBtn = $this.siblings(".qty-count--minus");
        var $addBtn = $this.siblings(".qty-count--add");
        var qty = parseInt($this.val());

        if (isNaN(qty) || qty <= qtyMin) {
            $this.val(qtyMin);
            $minusBtn.attr("disabled", true);
        } else {
            $minusBtn.attr("disabled", false);

            if (qty >= qtyMax) {
                $this.val(qtyMax);
                $addBtn.attr('disabled', true);
            } else {
                $this.val(qty);
                $addBtn.attr('disabled', false);
            }
        }
    });

    $countBtn.click(function() {
        var operator = this.dataset.action;
        var $this = $(this);
        var $input = $this.siblings(".product-qty");
        var qty = parseInt($input.val());

        if (operator == "add") {
            qty += 1;
            if (qty >= qtyMin + 1) {
                $this.siblings(".qty-count--minus").attr("disabled", false);
            }

            if (qty >= qtyMax) {
                $this.attr("disabled", true);
            }
        } else {
            qty = qty <= qtyMin ? qtyMin : (qty -= 1);

            if (qty == qtyMin) {
                $this.attr("disabled", true);
            }

            if (qty < qtyMax) {
                $this.siblings(".qty-count--add").attr("disabled", false);
            }
        }

        $input.val(qty);
    });
})();
const inputLeft = document.getElementById("input-left");
const inputRight = document.getElementById("input-right");

const thumbLeft = document.querySelector(".slider > .thumb.left");
const thumbRight = document.querySelector(".slider > .thumb.right");
const range = document.querySelector(".slider > .range");

function setLeftValue() {
    const _this = inputLeft,
        min = parseInt(_this.min),
        max = parseInt(_this.max);

    _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);

    const percent = ((_this.value - min) / (max - min)) * 100;

    thumbLeft.style.left = percent + "%";
    range.style.left = percent + "%";
    $('#input-left-value').text(max - _this.value);
}
setLeftValue();

function setRightValue() {
    const _this = inputRight,
        min = parseInt(_this.min),
        max = parseInt(_this.max);

    _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1);

    const percent = ((_this.value - min) / (max - min)) * 100;

    thumbRight.style.right = (100 - percent) + "%";
    range.style.right = (100 - percent) + "%";
    $('#input-right-value').text(_this.value);
}
setRightValue();

inputLeft.addEventListener("input", setLeftValue);
inputRight.addEventListener("input", setRightValue);