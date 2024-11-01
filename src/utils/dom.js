export const getElement = (selector) => {
    const element = document.querySelector(selector);
    console.log('got ', element);
    return element;
};

export const removeElement = (element) => {
    if (element) {
        element.remove();
    }
};
