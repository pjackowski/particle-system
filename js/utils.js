function getMousePosition(event, canvas) {

    //that was confusing, as I forgot about this incompatibility
    //it is good to have stackoverflow so close:
    //stackoverflow.com/questions/12704686/html5-with-jquery-e-offsetx-is-undefined-in-firefox

    if(_.isUndefined(event.offsetX)) {

        //works for Firefox

        return {
            x: event.pageX - $(canvas).offset().left,
            y: event.pageY - $(canvas).offset().top
        };

    } else {

        //works in Chrome

        return {
            x: event.offsetX,
            y: event.offsetY
        };

    }

};
