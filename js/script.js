let cards = Array.from(document.querySelectorAll('.card'));
let filters = Array.from(document.querySelectorAll('.filter'));
let transform = document.getElementById("transformGrad");
let currentFilters = [];

function onFilterUpdate(id) {
    if (id != null) {
        let item = document.getElementById("filter-" + id);
        item.classList.toggle("active");
    
        if (item.classList.contains("active")) {
            currentFilters.push(id);
        } else {
            let index = currentFilters.indexOf(id);
            if (index > -1) {
                currentFilters.splice(index, 1);
            }
        }
    } else {
        currentFilters.forEach(filter => {
            let item = document.getElementById("filter-" + filter);
            item.classList.toggle("active")
        })
        currentFilters=[]
    }
    

    transform.classList.remove("animate");
    void transform.offsetWidth; // Trigger reflow
    transform.classList.add("animate");

    // Update card visibility based on current filters
    cards.forEach(card => {
        let cardClasses = Array.from(card.classList);
        let isVisible = currentFilters.every(filter => cardClasses.includes(filter));
        card.classList.toggle("hide", !isVisible);
    });

    // Update filter visibility based on card visibility
    filters.forEach(filter => {
        let tempCurrentFilters = [...currentFilters, filter.id.slice(7)];
        let isFilterVisible = cards.some(card => {
            let cardClasses = Array.from(card.classList);
            return tempCurrentFilters.every(filter => cardClasses.includes(filter));
        });
        filter.classList.toggle("hide", !isFilterVisible);
    });
}

function toggleForceActive() {
    let button = document.getElementById("ForceActive");
    button.classList.toggle("active");
    cards.forEach(card => {
        card.classList.toggle("active");
    });
}

function clearFilters() {
    onFilterUpdate()
}