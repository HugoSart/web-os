class View {
    
    constructor() {
        this.parser = new DOMParser();
    }

    createUI() { }
    destroyUI() { }
}

var taskbarContainer = null;
var screen = null;

// ========================================================================================
// TASK
// ========================================================================================
var selectedTask = null;

class Task extends View {
    constructor(icon, name) {
        super();
        this.icon = icon;
        this.name = name;
        this.window = new Window(icon, name, true, 800, 600, 64, 64);
    }

    createUI() {
        const elHtml = '\
        <div class="task" id="' + name + '" onclick="select(this)"> \
                    <i class="' + this.icon + '"></i> \
                    <div class="task-border"></div> \
                </div> \
        ';
        taskbarContainer.innerHTML += elHtml;
    }

    destroyUI() {
        const doc = document.getElementById(name);
        doc.parentNode.removeChild(name);
    }

}

function getSelectedTask() {
    return selectedTask;
}

function select(task) {
    if (selectedTask != null)
        selectedTask.classList.remove('task-selected');

    selectedTask = task;
    selectedTask.classList.add('task-selected');
    tasks['Google Chrome'].window.createUI();
}



// ========================================================================================
// WINDOW
// ========================================================================================
var focusedWindow = null;

class Window extends View {
    constructor(icon, title, canExpand, width, height, x, y) {
        super();
        this.icon = icon;
        this.title = title;
        this.canExpand = canExpand;
        this.hidden = false;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }

    createUI() {
        this.id = 'window-' + this.name;
        const elHtml = '<div class="window" id="' + this.id + '"> \
            <div class="window-bar" onclick="focus(this)"> \
                <span class="window-bar-title"> \
                    <i class="' + this.icon + '"></i> \
                    ' + this.title + ' \
                </span> \
                <div class="window-control-container"> \
                    <div class="window-control window-control-close" onclick="closeFocused()"> \
                        <i class="window-control-close fas fa-times"></i> \
                    </div> \
                    <div class="window-control" onclick="expandFocused();"> \
                        <i class="window-control far fa-square"></i> \
                    </div> \
                    <div class="window-control" onclick="hideFocused()"> \
                        <i class="window-control fas fa-minus"></i> \
                    </div> \
                </div> \
            </div> \
        </div>';

        screen.innerHTML += elHtml;
        windowCount++;
        focusedWindow = document.getElementById(this.id);

    }

    destroyUI() {
        const doc = document.getElementById(this.id);
        doc.parentNode.removeChild(this.id);
    }
    
}

function getFocusedWindow() {
    return focusedWindow;
}

function isExpanded(window) {
    return window.classList.contains('window-expanded');
}

function expand(window) {
    if (isExpanded(window)) {
        window.classList.remove('window-expanded');
        console.log('Window windowned');
    } else {
        window.classList.add('window-expanded');
        console.log('Window expanded');
    }
}

function close(window) {
    window.parentNode.removeChild(window);
}

function hide(window) {
    window.parentNode.removeChild(window);
}

function expandFocused() {
    expand(getFocusedWindow());
}

function closeFocused() {
    close(getFocusedWindow());
}

function hideFocused() {
    hide(getFocusedWindow());
}



// ========================================================================================
// GENERAL
// ========================================================================================
var tasks = {
    "Google Chrome": new Task('fab fa-chrome', 'Google Chrome'),
    "Battle.net": new Task('fab fa-battle-net', 'Battle.net')
};

function constructPage() {
    // Get element references
    taskbarContainer = document.getElementById('taskbarContainer');
    screen = document.getElementById('screen');

    // Create UIs
    for (var key in tasks) {
        tasks[key].createUI();    
    }
}

window.addEventListener("load", function (event) {
    constructPage();
});