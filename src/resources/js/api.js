/*****************************************************/
/*                    Global                         */
/*****************************************************/
var Global =
{
    "Init": function () {
        this.Navigation();
    },
    "Navigation": function () {
        $.slidebars();
    }
};

/*****************************************************/
/*                    Utils                          */
/*****************************************************/
var Utils =
{

};

/*****************************************************/
/*                   Homepage                        */
/*****************************************************/
var Homepage =
{
    "Init": function () {
        this.BorderFade();
    },
    "BorderFade": function () {
        setTimeout(function () {
            $("body").addClass("padding-active");
        }, 2000);
    }
};

$(document).ready(function () {
    Global.Init();
});