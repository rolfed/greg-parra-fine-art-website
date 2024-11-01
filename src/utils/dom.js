export const getElement = (selector) => {
    const element = document.querySelector(selector);
    return element;
};

export const removeElement = (element) => {
    if (element) {
        element.remove();
    }
};
