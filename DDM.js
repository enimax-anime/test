class Toggle {
    constructor(element) {
        this.element = element;
    }

    turnOn() {
        if (!this.isOn()) {
            this.element.click();
        }
    }

    turnOff() {
        if (this.isOn()) {
            this.element.click();
        }
    }

    isOn() {
        return this.element.classList.contains("active");
    }

    toggle() {
        if (this.isOn()) {
            this.turnOff();
        } else {
            this.turnOn();
        }
    }
}

class Selectables {
    constructor(element) {
        this.element = element;
    }

    select() {
        this.element.click();
    }
}

class Scene {
    constructor(config, dropDownMenuInstance) {
        this.data = config;
        this.DDMinstance = dropDownMenuInstance;
    }

    addItem(config, isHeading = false) {
        this.element.querySelector(".scene").append(this.DDMinstance.makeItem(config, isHeading, this.data.id));

        if (this.element.classList.contains("active")) {
            this.DDMinstance.menuCon.style.height = this.element.querySelector(".scene").offsetHeight + "px";
        }
    }

    delete() {
        this.deleteItems();
        this.data = null;
        this.DDMinstance = null;
        this.element.remove();
    }

    deleteItems() {
        this.element.querySelector(".scene").innerHTML = "";

        if (this.data.id in this.DDMinstance.selectedValues) {
            this.DDMinstance.selectedValues[this.data.id] = "";
        }

        this.DDMinstance.updateSelectVals(this.data.id);
        this.DDMinstance.deleteSceneFromHistory(this.data.id);

        for (let item of this.data.items) {
            this.DDMinstance.deleteItem(item);
        }
        this.data.items = [];
    }
}

class dropDownMenu {
    constructor(scenes, menuCon) {
        this.scenes = {};
        this.menuCon = menuCon;
        this.history = [];
        this.toggles = {};
        this.selections = {};
        this.selectedValues = {};
        this.selectedValuesDOM = {};
        for (let scene of scenes) {
            this.scenes[scene.id] = new Scene(scene, this);
        }

        for (let scene of scenes) {
            if (!this.scenes[scene.id].element) {
                this.makeScene(scene);
            }
        }

        menuCon.onscroll = function () {
            menuCon.scrollLeft = 0;
        };



    }

    open(id) {
        if (id in this.scenes) {

            if (!this.history.length || (this.history.length && this.history[this.history.length - 1] != id)) {
                this.history.push(id);
            }

            for (let sceneID in this.scenes) {
                if (sceneID === id) {
                    this.scenes[sceneID].element.classList.add("active");
                    this.menuCon.style.height = this.scenes[sceneID].element.querySelector(".scene").offsetHeight + "px";
                } else {
                    this.scenes[sceneID].element.classList.remove("active");
                }
            }

        }
    }

    back() {
        if (this.history.length > 1) {
            let lastHistory = this.history.pop();
            this.open(this.history.pop());
        }else{
            this.closeMenu();
        }
    }


    openMenu(){
        this.menuCon.style.display = "block";
    }

    closeMenu(){
        this.menuCon.style.display = "none";
    }


    makeItem(item, isHeading = false, sceneID) {

        item.selectedValue = this.selectedValues[item.open];


        let shouldShowValue = false;
        if(this.scenes[item.open] instanceof Scene){
            shouldShowValue = this.scenes[item.open].data.selectableScene === true
        }


        let menuItem = createElement({
            "class": isHeading ? "menuHeading" : "menuItem",
            "attributes": item.attributes ? item.attributes : {},
        })

        if (!isHeading && "iconID" in item) {
            let menuItemIcon = createElement({
                "class": "menuItemIcon",
                "id": item.iconID
            });

            menuItem.append(menuItemIcon);
        }

        if (item.open) {
            menuItem.addEventListener("click", () => {
                this.open(item.open);
            });
        }



        if (isHeading && item.hideArrow !== true) {
            let menuItemIcon = createElement({
                "class": "menuItemIcon menuItemIconBack",
            });

            menuItem.addEventListener("click", () => {
                this.back();
            });

            menuItem.append(menuItemIcon);
        }

        let self = this;

        if (item.callback) {
            menuItem.addEventListener("click", () => {
                item.callback.bind(menuItem)();
            });
        }

        if (item.selected) {
            menuItem.classList.add("selected");
            if (sceneID) {
                this.selectedValues[sceneID] = item.text;
                this.updateSelectVals(sceneID);
            }
        }


        if (item.highlightable) {

            if (item.id) {
                this.selections[item.id] = new Selectables(menuItem);
            }

            menuItem.setAttribute("highlightable", "true");
            menuItem.addEventListener("click", function () {
                let siblings = menuItem.parentElement.children;

                for (let child of siblings) {
                    if (child.getAttribute("highlightable") === "true") {
                        child.classList.remove("selected");
                    }
                }

                menuItem.classList.add("selected");

                if (sceneID) {
                    self.selectedValues[sceneID] = menuItem.innerText;
                    self.updateSelectVals(sceneID);

                }

            });
        }


        let menuItemText = createElement({
            "class": "menuItemText",
            "innerText": item.text
        });


        menuItem.append(menuItemText);

        if (item.textBox) {
            let textBox = createElement({
                "element": "input",
                "class": "textBox",
                "attributes": {
                    "type": "text"
                }
            });

            if (item.value) {
                textBox.value = item.value;
            }
            textBox.addEventListener("input", item.onInput);

            // if(item.id){
            //     this.toggles[item.id] = new Toggle(toggle);
            // }
            menuItem.append(textBox);
        }


        if (shouldShowValue) {
            // menuItem.classList.add("menuItemToggle");

            let valueDOM = createElement({
                "innerText": item.selectedValue,
                "class": "menuItemValue"
            });
            menuItem.append(valueDOM);

            item.valueDOM = valueDOM;
            if (!this.selectedValuesDOM[item.open]) {
                this.selectedValuesDOM[item.open] = {};
            }

            let sValue = this.selectedValuesDOM[item.open];


            if (sValue.elements) {
                sValue.elements.push(valueDOM);
            } else {
                sValue.elements = [valueDOM];
            }
        }


        if (item.open) {
            menuItem.append(createElement({
                "class": "menuItemIcon menuItemIconSub",
                "style": {
                    "marginLeft": item.selectedValue ? "3px" : "auto"
                }
            }))
        }
        if (item.toggle) {
            menuItem.classList.add("menuItemToggle");
            let toggle = createElement({
                "class": `toggle ${item.on ? " active" : ""}`,
                "listeners": {
                    "click": function () {
                        this.classList.toggle("active");
                        if (this.classList.contains("active")) {
                            item.toggleOn();
                        } else {
                            item.toggleOff();
                        }
                    },
                }
            });

            if (item.id) {
                this.toggles[item.id] = new Toggle(toggle);
            }
            menuItem.append(toggle);
        }

        return menuItem;
    }

    updateSelectVals(sceneID) {
        if (this.selectedValuesDOM[sceneID]) {
            for (let elems of this.selectedValuesDOM[sceneID].elements) {
                elems.innerText = this.selectedValues[sceneID];
            }
        }
    }
    makeScene(config) {
        let scene = createElement({
            "class": "scene"
        });

        let sceneCon = createElement({
            "class": "sceneCon"
        });


        let openScene = this.scenes[config.id];
        if (openScene.element) {
            return;
        }

        if(config.heading){
            scene.append(this.makeItem(config.heading, true));
        }
        for (let item of config.items) {
            if (item.open) {
                let openScene = this.scenes[item.open];
                if (!openScene.element && openScene.data.selectableScene) {
                    this.makeScene(this.scenes[item.open].data);
                }
            }

            scene.append(this.makeItem(item, false, config.id));
        }

        sceneCon.append(scene);
        this.scenes[config.id].element = sceneCon;
        this.menuCon.append(sceneCon);

        return sceneCon;
    }

    addScene(config) {
        let sceneDIV = this.makeScene(config);
        this.menuCon.append(sceneDIV);
        config.element = sceneDIV;
        this.scenes[config.id] = config;
    }

    deleteScene(id) {
        if (id in this.scenes) {
            this.scenes[id].delete();
            delete this.scenes[id];
        }
    }

    deleteItem(item) {
        if (item.id in this.selections) {
            delete this.selections[item.id];
        }

        if (item.id in this.toggles) {
            delete this.toggles[item.id];
        }

        if (item.open) {
            let elem = this.selectedValuesDOM[item.open];
            if (elem) {
                let elements = elem.elements;
                let idx = elements.indexOf(item.valueDOM);
                if (idx > -1) {
                    elements.splice(idx, 1);
                }
            }
        }
    }

    deleteSceneFromHistory(val) {
        for (var i = this.history.length - 1; i >= 0; i--) {
            if (this.history[i] == val) {
                this.history.splice(i, 1);
            }
        }
    }


    getToggle(id) {
        if (id in this.toggles) {
            return this.toggles[id];
        }

        return null;
    }

    getScene(id) {
        if (id in this.scenes) {
            return this.scenes[id];
        }

        return null;
    }
}
