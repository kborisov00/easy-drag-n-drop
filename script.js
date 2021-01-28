const container = document.getElementById('container'); // container node
const draggables = [...container.children]; // array of container's children elements
const emptyElement = '<p class="draggable draggable--empty"></p>'; // empty draggable node markup
let currentDraggable = null; // current dragged element

// run on dragstart event
const dragstartHandler = (e) => {
  currentDraggable = e.target; // set current draggable to the dragged item
  e.target.classList.add('draggable--dragging'); // set style to "dragging" state
};

// run on dragend event
const dragendHandler = (e) => {
  // empty draggable node
  const emptyelement = container.getelementsbyclassname('draggable--empty')[0];
  
  // check for empty draggable in the container
  if (emptyelement) {
    // insert the currently dragged node before the
    // empty element and remove the empty element
    currentdraggable.parentnode.insertbefore(currentdraggable, emptyelement);
    emptyelement.remove();
  }

  // set style to not dragging state and reset the variable
  currentdraggable.classlist.remove('draggable--dragging');
  currentdraggable = null;
};

// run on drag over event
const dragoverhandler = (e) => {
  const element = e.target; // target element
  const elementy = element.getboundingclientrect().y;
  const elementheight = element.getboundingclientrect().height;
  const mousey = e.clienty;
  
  // every node associated with the currentdraggable
  const currentfamily = [
    currentdraggable,
    currentdraggable.previouselementsibling,
    currentdraggable.nextelementsibling,
  ];
  
  // every possible draggable case
  const cases = {
    isnotelementfamily: !currentfamily.includes(element),
    iselementprevsibling: element === currentdraggable.previouselementsibling,
    iselementnextsibling: element === currentdraggable.nextelementsibling,
  };
  
  // run if, 1 of the 3 draggable cases is true
  if (object.values(cases).includes(true)) {
    // if there is an empty draggable element in the container, remove it
    if (container.getelementsbyclassname('draggable--empty')[0]) {
      container.getelementsbyclassname('draggable--empty')[0].remove();
    }
  }
  
  // every case logic
  if (cases.isNotElementFamily) {
    // mouse is over target element / mouse is under target element
    if (mouseY < elementY + (elementHeight / 2)) {
      element.insertAdjacentHTML('beforebegin', emptyElement); // insert before target element
    } else {
      element.insertAdjacentHTML('afterend', emptyElement); // insert after target element
    }
  } else if (cases.isElementPrevSibling) {
    // check if mouse is above target element and
    // insert empty element before target element
    if (mouseY < elementY + (elementHeight / 2)) {
      element.insertAdjacentHTML('beforebegin', emptyElement);
    }
  } else if (cases.isElementNextSibling) {
    // check if mouse is below target element and
    // insert empty element after target element
    if (mouseY > elementY + (elementHeight / 2)) {
      element.insertAdjacentHTML('afterend', emptyElement);
    }
  }
};

// set event listeners to every draggable node
const eventAttachHandler = (draggable) => {
  draggable.addEventListener('dragstart', dragstartHandler);
  draggable.addEventListener('dragend', dragendHandler);
  draggable.addEventListener('dragover', dragoverHandler);
};

// run when document is loaded and parsed
window.addEventListener('DOMContentLoaded', () => {
  draggables.forEach(eventAttachHandler);
});
