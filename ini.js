let DMenu = new dropDownMenu(
        [
            {
                "id": "initial",
                "items": [
                    {
                        "text": "Quality",
                        "iconID": "qualIcon",
                        "open": "quality",
                    },

                    {
                        "text": "Sources",
                        "iconID": "sourceIcon",
                        "open": "source"
                    },
                    {
                        "text": "Fill Mode",
                        "iconID": "fillIcon",
                        "open": "fillmode"
                    },
                    {
                        "text": "Config",
                        "iconID": "configIcon",
                        "open": "config"
                    }
                ]
            },
            {
                "id": "quality",
                "selectableScene": true,
                "heading": {
                    "text": "Quality",
                },
                "items": [
                    {
                        "text": "1080p",
                        "callback": () => console.log("1080p!"),
                        "highlightable": true,
                        "selected": true,
                    },
                    {
                        "text": "720p",
                        "callback": () => console.log("720p!"),
                        "highlightable": true,
                        "id": "720",
                    },
                    {
                        "text": "480p",
                        "callback": () => console.log("480p!"),
                        "highlightable": true,
                        "id": "480",
                    },
                    {
                        "text": "Auto",
                        "id": "auto",
                        "open": "initial"
                    }
                ]
            },

            {
                "id": "source",
                "selectableScene": true,
                "heading": {
                    "text": "Sources",
                },
                "items": [
                    {
                        "text": "HLS#sub",
                        "highlightable": true,
                        "selected": true,
                    },
                    {
                        "text": "HLS#dub",
                        "highlightable": true
                    }
                ]
            },

            {
                "id": "fillmode",
                "heading": {
                    "text": "Fill Mode",
                },
                "items": [
                    {
                        "text": "Normal",
                        "highlightable": true,
                        "selected": true,
                    },
                    {
                        "text": "Stretch",
                        "highlightable": true
                    },
                    {
                        "text": "Subtitles",
                        "highlightable": true
                    },
                    {
                        "text": "Fill",
                        "open": "quality"
                        // "highlightable": true
                    }
                ]
            },

            {
                "id": "config",
                "heading": {
                    "text": "Configuration",
                    "back": true
                },
                "items": [

                    {
                        "text": "Fill Mode",
                        "iconID": "fillIcon",
                        "open": "fillmode"
                    },
                    {
                        "text": "Autoplay",
                        "toggle": true,
                        "toggleOn": () => console.log("Toggle on"),
                        "toggleOff": () => console.log("Toggle off"),
                    },
                    {
                        "text": "Rewatch Mode",
                        "toggle": true,
                        "toggleOn": () => console.log("Toggle on"),
                        "toggleOff": () => console.log("Toggle off"),
                    },
                    {
                        "text": "Hide Skip Intro",
                        "toggle": true,
                        "toggleOn": () => console.log("Toggle on"),
                        "toggleOff": () => console.log("Toggle off"),
                    },
                    {
                        "text": "Automatically Skip Intro",
                        "toggle": true,
                        "toggleOn": () => console.log("Toggle on"),
                        "toggleOff": () => console.log("Toggle off"),
                    },
                    {
                        "text": "Double Tap Time",
                        "textBox": true,
                        "onInput": function (value) {
                            console.log(value.target.value);
                        }
                    },
                    {
                        "text": "Skip Tutton Time",
                        "textBox": true,
                        "value": "hi",
                        "onInput": function (value) {
                            console.log(value.target.value);
                        }
                    }
                ]
            }
        ], menuCon);


    DMenu.open("initial");
