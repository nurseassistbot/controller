// initial setting of databases : 

$('#startstop').text('START');
$('.btndenoter').css('background-color','red');

firebase.database().ref('agv/').set({
        left : 0,
        right : 0,
        top : 0,
        bottom : 0,
        topleft : 0,
        topright : 0,
        startstop : "stop",
        bottomleft : 0,
        bottomright : 0
}); 

firebase.database().ref('move/').set({
    val : 0,
    str : "stop"
});

// Continuous monitoring of changes occuring in databases : 

firebase.database().ref('agv/').on('value', (snap)=> {
    
    let snapval = snap.val();
    let topleft         = snapval.topleft;
    let top             = snapval.top;
    let topright        = snapval.topright;
    let left            = snapval.left;
    let startstop       = snapval.startstop;
    let right           = snapval.right;
    let bottomleft      = snapval.bottomleft;
    let bottom          = snapval.bottom;
    let bottomright     = snapval.bottomright;

    let val = "";
    let numVal = 0;

    switch (startstop)
    {
        case "start" :
                if      ( topleft     ) { val = "topleft"     ; numVal = 1 }
                else if ( top         ) { val = "top"         ; numVal = 2 }
                else if ( topright    ) { val = "topright"    ; numVal = 3 }
                else if ( left        ) { val = "left"        ; numVal = 8 }
                else if ( right       ) { val = "right"       ; numVal = 4 }
                else if ( bottomleft  ) { val = "bottomleft"  ; numVal = 7 }
                else if ( bottom      ) { val = "bottom"      ; numVal = 6 }
                else if ( bottomright ) { val = "bottomright" ; numVal = 5 }
                else                    { val = "start"       ; numVal = 0 }
                break;
        default : console.log("start the vehicle first and then try to move?...");
                  firebase.database().ref('move/').update({
                        val : 0,
                        str : "stop"
                  });
    }

    if ( val != '' ) {

        console.log(val);
        firebase.database().ref('move/').update({
            val : numVal,
            str : val
        });

    }

});

// button activities : 

$('.topleft').on('click', ()=> {
    const newdata = {
        left : 0,
        right : 0,
        top : 0,
        bottom : 0,
        topleft : 1,
        topright : 0,
        bottomleft : 0,
        bottomright : 0    
    };
    firebase.database().ref('agv/').update( newdata );

});

$('.top').on('click', ()=> {
    const newdata = {
        left : 0,
        right : 0,
        top : 1,
        bottom : 0,
        topleft : 0,
        topright : 0,
        bottomleft : 0,
        bottomright : 0
    };
    firebase.database().ref('agv/').update( newdata );

});

$('.topright').on('click', ()=> {
    const newdata = {
        left : 0,
        right : 0,
        top : 0,
        bottom : 0,
        topleft : 0,
        topright : 1,
        bottomleft : 0,
        bottomright : 0
    };
    firebase.database().ref('agv/').update( newdata );

});

$('.left').on('click', ()=> {
    const newdata = {
        left : 1,
        right : 0,
        top : 0,
        bottom : 0,
        topleft : 0,
        topright : 0,
        bottomleft : 0,
        bottomright : 0
    };
    firebase.database().ref('agv/').update( newdata );
    
});

$('.startstop').on('click', ()=> {

    val = "start";
    firebase.database().ref('agv/').on('value', (snap)=>{
        val = snap.val().startstop;
    });
    if ( val == "start" ){
        val = "stop";
        $('#startstop').text('START');
        $('.btndenoter').css('background-color','red');
    }
    else {
        val = "start";
        $('#startstop').text('STOP');
        $('.btndenoter').css('background','aquamarine');
    }

    const newdata = {
        left : 0,
        right : 0,
        top : 0,
        bottom : 0,
        topleft : 0,
        topright : 0,
        startstop : val,
        bottomleft : 0,
        bottomright : 0
    };

    firebase.database().ref('agv/').update( newdata );


});

$('.right').on('click', ()=> {
    const newdata = {
        left : 0,
        right : 1,
        top : 0,
        bottom : 0,
        topleft : 0,
        topright : 0,
        bottomleft : 0,
        bottomright : 0

    };
    firebase.database().ref('agv/').update( newdata );

});

$('.bottomleft').on('click', ()=> {
    const newdata = {
        left : 0,
        right : 0,
        top : 0,
        bottom : 0,
        topleft : 0,
        topright : 0,
        bottomleft : 1,
        bottomright : 0
    };
    firebase.database().ref('agv/').update( newdata );

});

$('.bottom').on('click', ()=> {
    const newdata = {
        left : 0,
        right : 0,
        top : 0,
        bottom : 1,
        topleft : 0,
        topright : 0,
        bottomleft : 0,
        bottomright : 0
    };
    firebase.database().ref('agv/').update( newdata );

});

$('.bottomright').on('click', ()=> {
    const newdata = {
        left : 0,
        right : 0,
        top : 0,
        bottom : 0,
        topleft : 0,
        topright : 0,
        bottomleft : 0,
        bottomright : 1
    };
    firebase.database().ref('agv/').update( newdata );

});